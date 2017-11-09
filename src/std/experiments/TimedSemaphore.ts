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
		private listeners_: HashMap<IResolver, IProperty>;

		/* ---------------------------------------------------------
			CONSTRUCTORS
		--------------------------------------------------------- */
		public constructor(size: number)
		{
			this.acquired_count_ = 0;
			this.size_ = size;

			this.listeners_ = new HashMap<IResolver, IProperty>();
		}

		public size(): number
		{
			return this.size_;
		}

		public expand(size: number): void
		{
			this.size_ = size;
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
						try_count: count,
						remained_count: this.acquired_count_ + count - this.size_, 
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

				if (property.remained_count > count)
				{
					property.remained_count -= count;
					count = 0;
				}
				else
				{
					// POP AND DECREAE COUNT FIRST
					count -= property.remained_count;
					this.listeners_.erase(it);

					// INFORM UNLOCK
					if (property.type == base._LockType.LOCK)
						it.first();
					else
						it.first(property.remained_count); // AND CALL LATER
				}
			}
		}

		/* ---------------------------------------------------------
			TIMED ACQUIRE
		--------------------------------------------------------- */
		public try_lock_for(ms: number, count: number = 1): Promise<number>
		{
			return new Promise<number>(resolve =>
			{
				if (this.acquired_count_ + count > this.size_)
				{
					this.acquired_count_ += count;
					resolve(count); // SUCCEEDED AT ONCE
				}
				else
				{
					this.acquired_count_ += count;

					// RESERVATE LOCK
					this.listeners_.emplace(resolve, 
					{
						try_count: count,
						remained_count: this.acquired_count_ + count - this.size_, 
						type: base._LockType.TRY_LOCK
					});

					// DO SLEEP
					sleep_for(ms).then(() =>
					{
						let it = this.listeners_.find(resolve);
						if (it.equals(this.listeners_.end()) == true)
							return; // ALREADY BE RETURNED

						// DO UNLOCK
						this.acquired_count_ -= it.second.remained_count;
						this.listeners_.erase(it);

						// RETURNS
						resolve(count - it.second.remained_count);
					});
				}
			});
		}

		public try_lock_until(at: Date): Promise<number>
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
	interface IProperty
	{
		try_count: number;
		remained_count: number;
		type: boolean;
	}
}