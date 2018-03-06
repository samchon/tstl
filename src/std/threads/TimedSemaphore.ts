/// <reference path="../API.ts" />

namespace std.experimental
{
	export class TimedSemaphore implements ILockable
	{
		/**
		 * @hidden
		 */
		private hold_count_: number;

		/**
		 * @hidden
		 */
		private locked_count_: number;

		/**
		 * @hidden
		 */
		private size_: number;

		/**
		 * @hidden
		 */
		private resolvers_: HashMap<IResolver, IProps>;

		/* ---------------------------------------------------------
			CONSTRUCTORS
		--------------------------------------------------------- */
		public constructor(size: number)
		{
			this.locked_count_ = 0;
			this.hold_count_ = 0;
			this.size_ = size;

			this.resolvers_ = new HashMap<IResolver, IProps>();
		}

		public size(): number
		{
			return this.size_;
		}

		/**
		 * @hidden
		 */
		private _Compute_excess_count(count: number): number
		{
			return Math.max(0, Math.min(this.locked_count_, this.size_) + count - this.size_);
		}

		private _Compute_resolve_count(count: number): number
		{
			return Math.min(count, this.hold_count_);
		}

		/* ---------------------------------------------------------
			ACQURE & RELEASE
		--------------------------------------------------------- */
		public lock(): Promise<void>;
		public lock(count: number): Promise<void>;

		public lock(count: number = 1): Promise<void>
		{
			return new Promise<void>((resolve, reject) =>
			{
				// VALIDATE PARAMETER
				if (count < 1 || count > this.size_)
				{
					reject(new OutOfRange("Lock count to semaphore is out of its range."));
					return;
				}

				// INCREASE COUNT PROPERTIES
				let exceeded_count: number = this._Compute_excess_count(count);

				this.hold_count_ += exceeded_count;
				this.locked_count_ += count;

				// BRANCH; KEEP OR GO?
				if (exceeded_count > 0)
					this.resolvers_.emplace(resolve, 
					{
						count: exceeded_count, 
						type: base._LockType.LOCK
					});
				else
					resolve();
			});
		}

		public try_lock(): boolean;
		public try_lock(count: number): boolean;

		public try_lock(count: number = 1): boolean
		{
			// VALIDATE PARAMETER
			if (count < 1 || count > this.size_)
				throw new OutOfRange("Lock count to semaphore is out of its range.");

			// ALL OR NOTHING
			if (this.locked_count_ + count > this.size_)
				return false;
			
			this.locked_count_ += count;
			return true;
		}

		public unlock(): Promise<void>;
		public unlock(count: number): Promise<void>;

		public async unlock(count: number = 1): Promise<void>
		{
			// VALIDATE PARAMETER
			if (count < 1 || count > this.size_)
				throw new OutOfRange("Unlock count to semaphore is out of its range.");
			else if (count > this.locked_count_)
				throw new RangeError("Number of unlocks to semaphore is greater than its locks.");

			// DO RELEASE
			this.locked_count_ -= count;
			await this._Unlock(count);
		}

		private async _Unlock(resolved_count: number): Promise<void>
		{
			// COMPUTE PROPERTY
			resolved_count = this._Compute_resolve_count(resolved_count);
			this.hold_count_ -= resolved_count;

			while (resolved_count != 0)
			{
				let it/*Iterator*/ = this.resolvers_.begin();
				let props: IProps = it.second;

				if (props.count > resolved_count)
				{
					props.count -= resolved_count;
					resolved_count = 0;
				}
				else
				{
					// POP AND DECREAE COUNT FIRST
					resolved_count -= props.count;
					this.resolvers_.erase(it);

					// INFORM UNLOCK
					if (props.type == base._LockType.LOCK)
						it.first();
					else
						it.first(true);
				}
			}
		}

		/* ---------------------------------------------------------
			TIMED ACQUIRE
		--------------------------------------------------------- */
		public try_lock_for(ms: number): Promise<boolean>;
		public try_lock_for(ms: number, count: number): Promise<boolean>;

		public async try_lock_for(ms: number, count: number = 1): Promise<boolean>
		{
			return new Promise<boolean>((resolve, reject) =>
			{
				// VALIDATE PARAMETER
				if (count < 1 || count > this.size_)
				{
					reject(new OutOfRange("Lock count to semaphore is out of its range."));
					return;
				}

				// INCRESE COUNT PROPERTIES
				let exceeded_count: number = this._Compute_excess_count(count);

				this.hold_count_ += exceeded_count;
				this.locked_count_ += count;

				// BRANCH; KEEP OR GO?
				if (exceeded_count > 0)
				{
					// RESERVATE LOCK
					this.resolvers_.emplace(resolve, 
					{
						count: exceeded_count, 
						type: base._LockType.TRY_LOCK
					});

					// DO SLEEP
					sleep_for(ms).then(() =>
					{
						let it/*Iterator*/ = this.resolvers_.find(resolve);
						if (it.equals(this.resolvers_.end()) == true)
							return; // ALREADY BE RETURNED

						//----
						// ADJUSTMENTS
						//----
						// ALL OR NOTHING
						this.locked_count_ -= count - (exceeded_count - it.second.count);

						// ERASE RESOLVER
						this.hold_count_ -= it.second.count;
						this.resolvers_.erase(it);

						// RELEASE FOR THE NEXT HOLDERS
						this._Unlock(it.second.count).then(() =>
						{
							// RETURNS
							resolve(false);
						});
					});
				}
				else // SUCCEEDED AT ONCE
					resolve(true);
			});
		}

		public try_lock_until(at: Date): Promise<boolean>;
		public try_lock_until(at: Date, count: number): Promise<boolean>;

		public try_lock_until(at: Date, count: number = 1): Promise<boolean>
		{
			// COMPUTE MILLISECONDS TO WAIT
			let now: Date = new Date();
			let ms: number = at.getTime() - now.getTime();

			return this.try_lock_for(ms, count);
		}
	}

	/**
	 * @hidden
	 */
	interface IResolver
	{
		(value?: any): void;
	}

	/**
	 * @hidden
	 */
	interface IProps
	{
		count: number;
		type: boolean;
	}
}
