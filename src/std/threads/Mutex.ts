/// <reference path="../API.ts" />

namespace std
{
	export class Mutex implements ILockable
	{
		/**
		 * @hidden
		 */
		private lock_count_: number;

		/**
		 * @hidden
		 */
		private listeners_: Queue<IResolver>;

		/* ---------------------------------------------------------
			CONSTRUCTORS
		--------------------------------------------------------- */
		/**
		 * Default Constructor.
		 */
		public constructor()
		{
			this.lock_count_ = 0;
			this.listeners_ = new Queue<IResolver>();
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
				return false; // HAVE LOCKED
			
			++this.lock_count_;
			return true;			
		}

		public unlock(): void
		{
			if (this.lock_count_ == 0)
				throw new RangeError("This mutex is free.");

			--this.lock_count_; // DECREASE LOCKED COUNT
			if (this.listeners_.empty() == false)
			{
				let fn: IResolver = this.listeners_.front();
				
				this.listeners_.pop(); // POP FIRST
				fn(); // AND CALL LATER
			}
		}
	}

	interface IResolver
	{
		(): void;
	}
}
