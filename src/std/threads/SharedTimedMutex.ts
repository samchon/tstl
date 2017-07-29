/// <reference path="../API.ts" />

namespace std
{
	export class SharedTimedMutex implements ILockable
	{
		/**
		 * @hidden
		 */
		private read_lock_count_: number;

		/**
		 * @hidden
		 */
		private write_lock_count_: number;

		/**
		 * @hidden
		 */
		private listeners_: HashMap<IListener, boolean>;

		/* ---------------------------------------------------------
			CONSTRUCTORS
		--------------------------------------------------------- */
		/**
		 * Default Constructor.
		 */
		public constructor()
		{
			this.read_lock_count_ = 0;
			this.write_lock_count_ = 0;

			this.listeners_ = new HashMap<IListener, boolean>();
		}

		/* =========================================================
			LOCK & UNLOCK
				- WRITE LOCK
				- READ LOCK
		============================================================
			WRITE LOCK
		--------------------------------------------------------- */
		public lock(): Promise<void>
		{
			return new Promise<void>(resolve =>
			{
				if (this.read_lock_count_ == 0 && this.write_lock_count_++ == 0)
					resolve();
				else
					this.listeners_.push(make_pair(resolve, false));
			});
		}

		public try_lock(): boolean
		{
			if (this.write_lock_count_ != 0 || this.read_lock_count_ != 0)
				return false;

			this.write_lock_count_++;
			return true;
		}

		public try_lock_for(ms: number): Promise<boolean>
		{
			return new Promise<boolean>(resolve =>
			{
				if (this.read_lock_count_ == 0 && this.write_lock_count_++ == 0)
					resolve(true);
				else
				{
					// DO LOCK
					this.listeners_.push(make_pair(resolve, false));

					// AUTOMATIC UNLOCK
					sleep_for(ms).then(() =>
					{
						if (this.listeners_.has(resolve) == false)
							return;

						// DO UNLOCK
						this.listeners_.erase(resolve); // POP THE LISTENER
						--this.write_lock_count_; // DECREAE LOCEKD COUNT

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

		public unlock(): void
		{
			if (this.write_lock_count_ == 0)
				throw new RangeError("This mutex is free on the unique lock.");

			while (this.listeners_.empty() == false)
			{
				let fn: IListener = this.listeners_.begin().first;
				let is_write_lock: boolean = this.listeners_.begin().second;

				this.listeners_.erase(this.listeners_.begin()); // POP FIRST
				fn(); // AND CALL LATER

				// UNTIL MEET THE WRITE LOCK
				if (is_write_lock)
					break;
			}
			this.write_lock_count_--;
		}

		/* ---------------------------------------------------------
			READ LOCK
		--------------------------------------------------------- */
		public lock_shared(): Promise<void>
		{
			return new Promise<void>(resolve =>
			{
				++this.read_lock_count_;
				
				if (this.write_lock_count_ == 0)
					resolve();
				else
					this.listeners_.push(make_pair(resolve, true));
			});
		}

		public try_lock_shared(): boolean
		{
			if (this.write_lock_count_ != 0)
				return false;
			
			++this.read_lock_count_;
			return true;
		}

		public try_lock_shared_for(ms: number): Promise<boolean>
		{
			return new Promise<boolean>(resolve =>
			{
				++this.read_lock_count_;
				
				if (this.write_lock_count_ == 0)
					resolve(true);
				else
				{
					// DO LOCK
					this.listeners_.push(make_pair(resolve, true));

					// AUTOMATIC UNLOCK
					sleep_for(ms).then(() =>
					{
						if (this.listeners_.has(resolve) == false)
							return;

						// DO UNLOCK
						this.listeners_.erase(resolve); // POP THE LISTENER
						--this.read_lock_count_; // DECREASE LOCKED COUNT

						resolve(false); // RETURN FAILURE
					});
				}
			});
		}

		public try_lock_shared_until(at: Date): Promise<boolean>
		{
			let now: Date = new Date();
			let ms: number = at.getTime() - now.getTime(); // MILLISECONDS TO WAIT

			return this.try_lock_shared_for(ms);
		}

		public unlock_shared(): void
		{
			if (this.read_lock_count_ == 0)
				throw new RangeError("This mutex is free on the shared lock.");

			--this.read_lock_count_;

			if (this.listeners_.empty() == false)
			{ 
				// MUST BE WRITE LOCK
				let fn: IListener = this.listeners_.begin().first;

				this.listeners_.erase(this.listeners_.begin()); // POP FIRST
				fn(); // AND CALL LATER
			}
		}
	}

	interface IListener
	{
		(): void | boolean;
	}
}
