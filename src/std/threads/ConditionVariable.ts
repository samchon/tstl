/// <reference path="../API.ts" />

namespace std
{
	export class ConditionVariable
	{
		/**
		 * @hidden
		 */
		private resolvers_: HashMap<IResolver, boolean>;

		/* ---------------------------------------------------------
			CONSTRUCTORS
		--------------------------------------------------------- */
		public constructor()
		{
			this.resolvers_ = new HashMap<IResolver, boolean>();
		}

		/* ---------------------------------------------------------
			WAITERS
		--------------------------------------------------------- */
		public wait(): Promise<void>
		{
			return new Promise<void>(resolve => 
			{
				this.resolvers_.emplace(resolve, base._LockType.LOCK);
			});
		}

		public wait_for(ms: number): Promise<boolean>
		{
			return new Promise<boolean>(resolve =>
			{
				this.resolvers_.emplace(resolve, base._LockType.TRY_LOCK);

				// AUTOMATIC UNLOCK
				sleep_for(ms).then(() =>
				{
					if (this.resolvers_.has(resolve) == false)
						return;

					// DO UNLOCK
					this.resolvers_.erase(resolve); // POP THE LISTENER
					resolve(false); // RETURN FAILURE
				});
			});
		}

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
		public async notify_one(): Promise<void>
		{
			// NOTHING TO NOTIFY
			if (this.resolvers_.empty())
				return;

			// THE 1ST RESOLVER
			let it = this.resolvers_.begin();
			if (it.second == base._LockType.LOCK)
				it.first();
			else
				it.first(true);

			// ERASE IT
			this.resolvers_.erase(it);	
		}

		public async notify_all(): Promise<void>
		{
			// NOTHING TO NOTIFY
			if (this.resolvers_.empty())
				return;

			// ITERATE RESOLVERS
			for (let pair of this.resolvers_)
				if (pair.second == base._LockType.LOCK)
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