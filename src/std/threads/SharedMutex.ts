/// <reference path="../API.ts" />

namespace std
{
	export class SharedMutex
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
		private listeners_: Queue<Pair<boolean, ()=>void>>;

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

			this.listeners_ = new Queue<Pair<boolean, ()=>void>>();
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
				if (this.write_lock_count_++ == 0 && this.read_lock_count_ == 0)
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

			this.write_lock_count_--;
			while (this.listeners_.empty() == false)
			{
				let is_write_lock: boolean = this.listeners_.front().first;

				this.listeners_.front().second();
				this.listeners_.pop();

				// UNTIL MEET THE WRITE LOCK
				if (is_write_lock)
					break;
			}
		}

		/* ---------------------------------------------------------
			READ LOCK
		--------------------------------------------------------- */
		public lock_shared(): Promise<void>
		{
			this.read_lock_count_++;

			return new Promise<void>(resolve =>
			{
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
			
			this.read_lock_count_++;
			return true;
		}

		public unlock_shared(): void
		{
			if (this.read_lock_count_ == 0)
				throw new RangeError("This mutex is free on the shared lock.");

			this.read_lock_count_--;

			if (this.listeners_.empty() == false)
			{	
				// WRITE LOCK
				this.listeners_.front().second();
				this.listeners_.pop();
			}
		}
	}
}
