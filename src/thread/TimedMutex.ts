import { _ITimedLockable } from "../base/thread/_ITimedLockable";

import { HashMap } from "../container/HashMap";
import { LockType } from "../base/thread/enums";
import { RangeError } from "../exception/RuntimeError";
import { sleep_for } from "../thread";

/**
 * Timed mutex.
 * 
 * @author Jeongho Nam <http://samchon.org>
 */
export class TimedMutex implements _ITimedLockable
{
	/**
	 * @hidden
	 */
	private lock_count_: number;

	/**
	 * @hidden
	 */
	private resolvers_: HashMap<IResolver, LockType>;

	/* ---------------------------------------------------------
		CONSTRUCTORS
	--------------------------------------------------------- */
	/**
	 * Default Constructor.
	 */
	public constructor()
	{
		this.lock_count_ = 0;
		this.resolvers_ = new HashMap();
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
				this.resolvers_.emplace(resolve, LockType.HOLD);
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
			// PICK A LISTENER
			let it = this.resolvers_.begin();
			let listener: IResolver = it.first;
			
			this.resolvers_.erase(it); // POP FIRST
			
			// AND CALL LATER
			if (it.second === LockType.HOLD)
				listener();
			else
				listener(true);
		}
	}

	/* ---------------------------------------------------------
		TIMED LOCK
	--------------------------------------------------------- */
	/**
	 * @inheritDoc
	 */
	public try_lock_for(ms: number): Promise<boolean>
	{
		return new Promise<boolean>(resolve =>
		{
			if (this.lock_count_++ === 0)
				resolve(true);
			else
			{
				// DO LOCK
				this.resolvers_.emplace(resolve, LockType.KNOCK);

				// AUTOMATIC UNLOCK
				sleep_for(ms).then(() =>
				{
					if (this.resolvers_.has(resolve) === false)
						return;

					// DO UNLOCK
					this.resolvers_.erase(resolve); // POP THE LISTENER
					--this.lock_count_; // DECREASE LOCKED COUNT

					resolve(false); // RETURN FAILURE
				});
			}
		});
	}
	
	/**
	 * @inheritDoc
	 */
	public try_lock_until(at: Date): Promise<boolean>
	{
		// COMPUTE MILLISECONDS TO WAIT
		let now: Date = new Date();
		let ms: number = at.getTime() - now.getTime();

		return this.try_lock_for(ms);
	}
}

/**
 * @hidden
 */
interface IResolver
{
	(value?: any): void;
}

export type timed_mutex = TimedMutex;
export const timed_mutex = TimedMutex;