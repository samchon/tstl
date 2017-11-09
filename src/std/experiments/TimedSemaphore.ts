/// <reference path="../API.ts" />

namespace std.experiments
{
	export class TimedSemaphore implements ILockable
	{
		/**
		 * @hidden
		 */
		private acquired_count_: number;

		/**
		 * @hidden
		 */
		private size_: number;

		/**
		 * @hidden
		 */
		private listeners_: HashMap<IResolver, IProps>;

		/* ---------------------------------------------------------
			CONSTRUCTORS
		--------------------------------------------------------- */
		public constructor(size: number)
		{
			this.acquired_count_ = 0;
			this.size_ = size;

			this.listeners_ = new HashMap<IResolver, IProps>();
		}

		public size(): number
		{
			return this.size_;
		}

		private _Compute_exceeded_count(count: number): number
		{
			return this.acquired_count_ + count - this.size_;
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
				let prev_acqured_count: number = this.acquired_count_;
				this.acquired_count_ += count;

				if (prev_acqured_count + count <= this.size_)
					resolve();
				else
					this.listeners_.emplace(resolve, 
					{
						count: this._Compute_exceeded_count(count), 
						type: base._LockType.LOCK
					});
			});
		}

		public try_lock(): boolean;
		public try_lock(count: number): boolean;

		public try_lock(count: number = 1): boolean
		{
			// ALL OR NOTHING
			if (this.acquired_count_ + count > this.size_)
				return false;
			
			this.acquired_count_ += count;
			return true;
		}

		public unlock(): void;
		public unlock(count: number): void;

		public unlock(count: number = 1): void
		{
			this.acquired_count_ -= count;

			while (count != 0)
			{
				let it = this.listeners_.begin();
				let property = it.second;

				if (property.count > count)
				{
					property.count -= count;
					count = 0;
				}
				else
				{
					// POP AND DECREAE COUNT FIRST
					count -= property.count;
					this.listeners_.erase(it);

					// INFORM UNLOCK
					if (property.type == base._LockType.LOCK)
						it.first();
					else
						it.first(true);
				}
			}
		}

		/* ---------------------------------------------------------
			TIMED ACQUIRE
		--------------------------------------------------------- */
		public try_lock_for(ms: number, count: number = 1): Promise<boolean>
		{
			return new Promise<boolean>(resolve =>
			{
				if (this.acquired_count_ + count > this.size_)
				{
					this.acquired_count_ += count;
					resolve(true); // SUCCEEDED AT ONCE
				}
				else
				{
					this.acquired_count_ += count;

					// RESERVATE LOCK
					this.listeners_.emplace(resolve, 
					{
						count: this._Compute_exceeded_count(count), 
						type: base._LockType.TRY_LOCK
					});

					// DO SLEEP
					sleep_for(ms).then(() =>
					{
						let it = this.listeners_.find(resolve);
						if (it.equals(this.listeners_.end()) == true)
							return; // ALREADY BE RETURNED

						// UNLOCK REMAINDER
						this.acquired_count_ -= it.second.count;
						this.listeners_.erase(it);

						this.unlock(it.second.count);

						// RETURNS
						resolve(false);
					});
				}
			});
		}

		public try_lock_until(at: Date): Promise<boolean>
		{
			// COMPUTE MILLISECONDS TO WAIT
			let now: Date = new Date();
			let ms: number = at.getTime() - now.getTime();

			return this.try_lock_for(ms);
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