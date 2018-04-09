/// <reference path="../API.ts" />

namespace std
{
	/**
	 * Condition variable.
	 * 
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export class ConditionVariable
	{
		/**
		 * @hidden
		 */
		private resolvers_: HashMap<IResolver, boolean>;

		/* ---------------------------------------------------------
			CONSTRUCTORS
		--------------------------------------------------------- */
		/**
		 * Default Constructor.
		 */
		public constructor()
		{
			this.resolvers_ = new HashMap();
		}

		/* ---------------------------------------------------------
			WAITERS
		--------------------------------------------------------- */
		/**
		 * Wait until notified.
		 */
		public wait(): Promise<void>
		{
			return new Promise<void>(resolve => 
			{
				this.resolvers_.emplace(resolve, base._LockType.LOCK);
			});
		}

		/**
		 * Wait for timeout or until notified.
		 * 
		 * @param ms The maximum miliseconds for waiting.
		 * @return Whether awaken by notification or timeout.
		 */
		public wait_for(ms: number): Promise<boolean>
		{
			return new Promise<boolean>(resolve =>
			{
				this.resolvers_.emplace(resolve, base._LockType.TRY_LOCK);

				// AUTOMATIC UNLOCK
				sleep_for(ms).then(() =>
				{
					if (this.resolvers_.has(resolve) === false)
						return;

					// DO UNLOCK
					this.resolvers_.erase(resolve); // POP THE LISTENER
					resolve(false); // RETURN FAILURE
				});
			});
		}

		/**
		 * Wait until notified or time expiration.
		 * 
		 * @param at The maximum time point to wait.
		 * @return Whether awaken by notification or time expiration.
		 */
		public wait_until(at: Date): Promise<boolean>
		{
			// COMPUTE MILLISECONDS TO WAIT
			let now: Date = new Date();
			let ms: number = at.getTime() - now.getTime();

			return this.wait_for(ms);
		}

		/* ---------------------------------------------------------
			NOTIFIERS
		--------------------------------------------------------- */
		/**
		 * Notify, wake one.
		 */
		public async notify_one(): Promise<void>
		{
			// NOTHING TO NOTIFY
			if (this.resolvers_.empty())
				return;

			// THE 1ST RESOLVER
			let it = this.resolvers_.begin();
			if (it.second === base._LockType.LOCK)
				it.first();
			else
				it.first(true);

			// ERASE IT
			this.resolvers_.erase(it);	
		}

		/**
		 * Notify, wake all
		 */
		public async notify_all(): Promise<void>
		{
			// NOTHING TO NOTIFY
			if (this.resolvers_.empty())
				return;

			// ITERATE RESOLVERS
			for (let pair of this.resolvers_)
				if (pair.second === base._LockType.LOCK)
					pair.first();
				else
					pair.first(true);
			
			// ERASE THEM ALL
			this.resolvers_.clear();
		}
	}

	/**
	 * @hidden
	 */
	interface IResolver
	{
		(value?: any): void;
	}
}