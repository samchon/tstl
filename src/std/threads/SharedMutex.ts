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
		private resolvers_: Queue<Pair<boolean, IListener>>;

		/* ---------------------------------------------------------
			CONSTRUCTORS
		--------------------------------------------------------- */
		public constructor()
		{
			this.read_lock_count_ = 0;
			this.write_lock_count_ = 0;

			this.resolvers_ = new Queue<Pair<boolean, IListener>>();
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
					this.resolvers_.push(make_pair(base._LockType.WRITE, resolve));
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

			while (this.resolvers_.empty() == false)
			{
				let access: boolean = this.resolvers_.front().first;
				let fn: IListener = this.resolvers_.front().second;

				this.resolvers_.pop(); // POP FIRST
				fn(); // AND CALL LATER

				// UNTIL MEET THE WRITE LOCK
				if (access == base._LockType.WRITE)
					break;
			}
			--this.write_lock_count_;
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
					this.resolvers_.push(make_pair(base._LockType.READ, resolve));
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

			if (this.resolvers_.empty() == false)
			{ 
				// MUST BE WRITE LOCK
				let fn: IListener = this.resolvers_.front().second;

				this.resolvers_.pop(); // POP FIRST
				fn(); // AND CALL LATER
			}
		}
	}

	interface IListener
	{
		(): void;
	}
}
