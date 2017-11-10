/// <reference path="../API.ts" />

namespace std.experiments
{
	export class TimedSemaphore implements ILockable
	{
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
			return this.locked_count_ + count - this.size_;
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
				let exceeded_count: number = this._Compute_excess_count(count);
				this.locked_count_ += count;

				if (exceeded_count <= 0)
					resolve();
				else
					this.resolvers_.emplace(resolve, 
					{
						count: exceeded_count, 
						type: base._LockType.LOCK
					});
			});
		}

		public try_lock(): boolean;
		public try_lock(count: number): boolean;

		public try_lock(count: number = 1): boolean
		{
			// ALL OR NOTHING
			if (this.locked_count_ + count > this.size_)
				return false;
			
			this.locked_count_ += count;
			return true;
		}

		public unlock(): void;
		public unlock(count: number): void;

		public unlock(count: number = 1): void
		{
			this.locked_count_ -= count;

			while (count != 0)
			{
				let it/*Iterator*/ = this.resolvers_.begin();
				let props: IProps = it.second;

				if (props.count > count)
				{
					props.count -= count;
					count = 0;
				}
				else
				{
					// POP AND DECREAE COUNT FIRST
					count -= props.count;
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

		public try_lock_for(ms: number, count: number = 1): Promise<boolean>
		{
			return new Promise<boolean>(resolve =>
			{
				// INCRESE LOCKED COUNT
				let exceeded_count: number = this._Compute_excess_count(count);
				this.locked_count_ += count;

				if (exceeded_count <= 0)
					resolve(true); // SUCCEEDED AT ONCE
				else
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

						// UNLOCK REMAINDER
						this.locked_count_ -= it.second.count;
						this.resolvers_.erase(it);

						this.unlock(it.second.count);

						// RETURNS
						resolve(false);
					});
				}
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

	interface IResolver
	{
		(value?: any): void;
	}
	interface IProps
	{
		count: number;
		type: boolean;
	}
}