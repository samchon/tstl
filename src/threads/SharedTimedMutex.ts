import { _ISharedLockable } from "../base/threads/_ISharedLockable";
import { _ITimedLockable } from "../base/threads/_ITimedLockable";

import { HashMap } from "../containers/HashMap";
import { _LockType } from "../base/threads/_LockType";
import { RangeError } from "../exceptions/RuntimeError";
import { sleep_for } from "../thread";

/**
 * Shared timed mutex.
 * 
 * @author Jeongho Nam <http://samchon.org>
 */
export class SharedTimedMutex 
	implements _ISharedLockable, _ITimedLockable
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
	private resolvers_: HashMap<IResolver, ILockType>;

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

		this.resolvers_ = new HashMap();
	}

	/* =========================================================
		LOCK & UNLOCK
			- WRITE LOCK
			- READ LOCK
	============================================================
		WRITE LOCK
	--------------------------------------------------------- */
	/**
	 * @inheritDoc
	 */
	public lock(): Promise<void>
	{
		return new Promise<void>(resolve =>
		{
			if (this.write_lock_count_++ === 0 && this.read_lock_count_ === 0)
				resolve();
			else
				this.resolvers_.emplace(resolve, 
				{
					access: _LockType.WRITE, 
					lock: _LockType.LOCK
				});
		});
	}

	/**
	 * @inheritDoc
	 */
	public async try_lock(): Promise<boolean>
	{
		if (this.write_lock_count_ !== 0 || this.read_lock_count_ !== 0)
			return false;

		++this.write_lock_count_;
		return true;
	}

	/**
	 * @inheritDoc
	 */
	public try_lock_for(ms: number): Promise<boolean>
	{
		return new Promise<boolean>(resolve =>
		{
			if (this.write_lock_count_++ === 0 && this.read_lock_count_ === 0)
				resolve(true);
			else
			{
				// DO LOCK
				this.resolvers_.emplace(resolve, 
				{
					access: _LockType.WRITE, 
					lock: _LockType.TRY_LOCK
				});

				// AUTOMATIC UNLOCK
				sleep_for(ms).then(() =>
				{
					if (this.resolvers_.has(resolve) === false)
						return;

					// DO UNLOCK
					this.resolvers_.erase(resolve); // POP THE LISTENER
					--this.write_lock_count_; // DECREAE LOCEKD COUNT

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

	/**
	 * @inheritDoc
	 */
	public async unlock(): Promise<void>
	{
		if (this.write_lock_count_ === 0)
			throw new RangeError("This mutex is free on the unique lock.");

		while (this.resolvers_.empty() === false)
		{
			// PICK A LISTENER
			let it = this.resolvers_.begin();
			let listener: IResolver = it.first;
			let type: ILockType = it.second;

			this.resolvers_.erase(it); // POP FIRST

			// AND CALL LATER
			if (type.lock === _LockType.LOCK)
				listener();
			else
				listener(true);

			// UNTIL MEET THE WRITE LOCK
			if (type.access === _LockType.WRITE)
				break;
		}
		--this.write_lock_count_;
	}

	/* ---------------------------------------------------------
		READ LOCK
	--------------------------------------------------------- */
	/**
	 * @inheritDoc
	 */
	public lock_shared(): Promise<void>
	{
		return new Promise<void>(resolve =>
		{
			++this.read_lock_count_;
			
			if (this.write_lock_count_ === 0)
				resolve();
			else
				this.resolvers_.emplace(resolve, 
				{
					access: _LockType.READ, 
					lock: _LockType.LOCK
				});
		});
	}

	/**
	 * @inheritDoc
	 */
	public async try_lock_shared(): Promise<boolean>
	{
		if (this.write_lock_count_ !== 0)
			return false;
		
		++this.read_lock_count_;
		return true;
	}

	/**
	 * Try lock shared until timeout.
	 * 
	 * @param ms The maximum miliseconds for waiting.
	 * @return Whether succeded to lock or not.
	 */
	public try_lock_shared_for(ms: number): Promise<boolean>
	{
		return new Promise<boolean>(resolve =>
		{
			++this.read_lock_count_;
			
			if (this.write_lock_count_ === 0)
				resolve(true);
			else
			{
				// DO LOCK
				this.resolvers_.emplace(resolve, 
				{
					access: _LockType.READ, 
					lock: _LockType.TRY_LOCK
				});

				// AUTOMATIC UNLOCK
				sleep_for(ms).then(() =>
				{
					if (this.resolvers_.has(resolve) === false)
						return;

					// DO UNLOCK
					this.resolvers_.erase(resolve); // POP THE LISTENER
					--this.read_lock_count_; // DECREASE LOCKED COUNT

					resolve(false); // RETURN FAILURE
				});
			}
		});
	}

	/**
	 * Try lock shared until time expiration.
	 * 
	 * @param at The maximum time point to wait.
	 * @return Whether succeded to lock or not.
	 */
	public try_lock_shared_until(at: Date): Promise<boolean>
	{
		// COMPUTE MILLISECONDS TO WAIT
		let now: Date = new Date();
		let ms: number = at.getTime() - now.getTime();

		return this.try_lock_shared_for(ms);
	}

	/**
	 * @inheritDoc
	 */
	public async unlock_shared(): Promise<void>
	{
		if (this.read_lock_count_ === 0)
			throw new RangeError("This mutex is free on the shared lock.");

		--this.read_lock_count_;

		if (this.resolvers_.empty() === false)
		{ 
			// PICK A LISTENER
			let it = this.resolvers_.begin();
			let listener: IResolver = it.first;
			let type: ILockType = it.second;

			this.resolvers_.erase(it); // POP FIRST
			
			// AND CALL LATER
			if (type.lock === _LockType.LOCK)
				listener();
			else
				listener(true);
		}
	}
}

/**
 * @hidden
 */
interface IResolver
{
	(value?: any): void;
}

/**
 * @hidden
 */
interface ILockType
{
	access: boolean; // read or write
	lock: boolean; // void or boolean
}

export type shared_timed_mutex = SharedTimedMutex;
export const shared_timed_mutex = SharedTimedMutex;