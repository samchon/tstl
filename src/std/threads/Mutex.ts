/// <reference path="../API.ts" />

namespace std
{
	export class Mutex
	{
		/**
		 * @hidden
		 */
		private lock_count_: number;

		/**
		 * @hidden
		 */
		private listeners_: Queue<()=>void>;

		/* ---------------------------------------------------------
			CONSTRUCTORS
		--------------------------------------------------------- */
		/**
		 * Default Constructor.
		 */
		public constructor()
		{
			this.lock_count_ = 0;
			this.listeners_ = new Queue<()=>void>();
		}

		/* ---------------------------------------------------------
			LOCK & UNLOCK
		--------------------------------------------------------- */
		public lock(): Promise<void>
		{
			return new Promise<void>(resolve =>
			{
				if (this.lock_count_++ == 0)
					resolve();
				else
					this.listeners_.push(resolve);
			});
		}

		/**
		 * Lock mutex if not locked.
		 * 
		 * Attempts to lock the {@link Mutex}, without blocking:
		 */
		public try_lock(): boolean
		{
			if (this.lock_count_ != 0)
				return false;
			
			this.lock_count_++;
			return true;			
		}

		public unlock(): void
		{
			if (this.lock_count_ == 0)
				throw new RangeError("This mutex is free.");

			this.lock_count_--;
			
			if (this.listeners_.empty() == false)
			{
				this.listeners_.front()();
				this.listeners_.pop();
			}
		}
	}
}
