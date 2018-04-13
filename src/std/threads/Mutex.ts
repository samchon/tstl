/// <reference path="../API.ts" />

namespace std
{
	/**
	 * Mutex.
	 * 
	 * @author Jeongho Nam <http://samchon.org>
	 */
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
		/**
		 * Default Constructor.
		 */
		public constructor()
		{
			this.lock_count_ = 0;
			this.resolvers_ = new Queue();
		}

		/* ---------------------------------------------------------
			LOCK & UNLOCK
		--------------------------------------------------------- */
		/**
		 * @inheritDoc
		 */
		public lock(): Promise<void>
		{
			return new Promise<void>(resolve =>
			{
				if (this.lock_count_++ === 0)
					resolve();
				else
					this.resolvers_.push(resolve);
			});
		}

		/**
		 * @inheritDoc
		 */
		public async try_lock(): Promise<boolean>
		{
			if (this.lock_count_ !== 0)
				return false; // HAVE LOCKED
			
			++this.lock_count_;
			return true;
		}

		/**
		 * @inheritDoc
		 */
		public async unlock(): Promise<void>
		{
			if (this.lock_count_ === 0)
				throw new RangeError("This mutex is free.");

			--this.lock_count_; // DECREASE LOCKED COUNT
			if (this.resolvers_.empty() === false)
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
