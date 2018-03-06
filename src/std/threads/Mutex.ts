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
		private resolvers_: Queue<IResolver>;

		/* ---------------------------------------------------------
			CONSTRUCTORS
		--------------------------------------------------------- */
		public constructor()
		{
			this.lock_count_ = 0;
			this.resolvers_ = new Queue<IResolver>();
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
					this.resolvers_.push(resolve);
			});
		}

		public try_lock(): boolean
		{
			if (this.lock_count_ != 0)
				return false; // HAVE LOCKED
			
			++this.lock_count_;
			return true;			
		}

		public async unlock(): Promise<void>
		{
			if (this.lock_count_ == 0)
				throw new RangeError("This mutex is free.");

			--this.lock_count_; // DECREASE LOCKED COUNT
			if (this.resolvers_.empty() == false)
			{
				let fn: IResolver = this.resolvers_.front();
				
				this.resolvers_.pop(); // POP FIRST
				fn(); // AND CALL LATER
			}
		}
	}

	/**
	 * @hidden
	 */
	interface IResolver
	{
		(): void;
	}
}
