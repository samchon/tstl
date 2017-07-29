/// <reference path="../API.ts" />

namespace std
{
	export class SharedMutex implements ILockable
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
		private listeners_: Queue<Pair<boolean, IListener>>;

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

			this.listeners_ = new Queue<Pair<boolean, IListener>>();
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
					this.listeners_.push(make_pair(false, resolve));
			});
		}

		public try_lock(): boolean
		{
			if (this.write_lock_count_ != 0 || this.read_lock_count_ != 0)
				return false;

			this.write_lock_count_++;
			return true;
		}

		public unlock(): void
		{
			if (this.write_lock_count_ == 0)
				throw new RangeError("This mutex is free on the unique lock.");

			while (this.listeners_.empty() == false)
			{
				let is_write_lock: boolean = this.listeners_.front().first;
				let fn: IListener = this.listeners_.front().second;

				this.listeners_.pop(); // POP FIRST
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
					this.listeners_.push(make_pair(true, resolve));
			});
		}

		public try_lock_shared(): boolean
		{
			if (this.write_lock_count_ != 0)
				return false;
			
			++this.read_lock_count_;
			return true;
		}

		public unlock_shared(): void
		{
			if (this.read_lock_count_ == 0)
				throw new RangeError("This mutex is free on the shared lock.");

			--this.read_lock_count_;

			if (this.listeners_.empty() == false)
			{ 
				// MUST BE WRITE LOCK
				let fn: IListener = this.listeners_.front().second;

				this.listeners_.pop(); // POP FIRST
				fn(); // AND CALL LATER
			}
		}
	}

	interface IListener
	{
		(): void;
	}
}
