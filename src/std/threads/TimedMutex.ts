/// <reference path="../API.ts" />

namespace std
{
	export class TimedMutex implements ILockable
	{
		/**
		 * @hidden
		 */
		private lock_count_: number;

		/**
		 * @hidden
		 */
		private listeners_: HashMap<IResolver, boolean>;

		/* ---------------------------------------------------------
			CONSTRUCTORS
		--------------------------------------------------------- */
		/**
		 * Default Constructor.
		 */
		public constructor()
		{
			this.lock_count_ = 0;
			this.listeners_ = new HashMap<IResolver, boolean>();
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
					this.listeners_.emplace(resolve, base._LockType.LOCK);
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
				// PICK A LISTENER
				let it = this.listeners_.begin();
				let listener: IResolver = it.first;
				
				this.listeners_.erase(it); // POP FIRST
				
				// AND CALL LATER
				if (it.second == base._LockType.LOCK)
					listener();
				else
					listener(true);
			}
		}

		/* ---------------------------------------------------------
			TIMED LOCK
		--------------------------------------------------------- */
		public try_lock_for(ms: number): Promise<boolean>
		{
			return new Promise<boolean>(resolve =>
			{
				if (this.lock_count_++ == 0)
					resolve(true);
				else
				{
					// DO LOCK
					this.listeners_.emplace(resolve, base._LockType.TRY_LOCK);

					// AUTOMATIC UNLOCK
					sleep_for(ms).then(() =>
					{
						if (this.listeners_.has(resolve) == false)
							return;

						// DO UNLOCK
						this.listeners_.erase(resolve); // POP THE LISTENER
						--this.lock_count_; // DECREASE LOCKED COUNT

						resolve(false); // RETURN FAILURE
					});
				}
			});
		}
		
		public try_lock_until(at: Date): Promise<boolean>
		{
			let now: Date = new Date();
			let ms: number = at.getTime() - now.getTime(); // MILLISECONDS TO WAIT

			return this.try_lock_for(ms);
		}
	}

	interface IResolver
	{
		(value?: any): void;
	}
}
