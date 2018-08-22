import { _ISharedLockable } from "../base/threads/_ISharedLockable";

import { Queue } from "../containers/Queue";
import { Pair } from "../utilities/Pair";
import { AccessType } from "../base/threads/enums";
import { RangeError } from "../exceptions/RuntimeError";

/**
 * Shared mutex.
 * 
 * @author Jeongho Nam <http://samchon.org>
 */
export class SharedMutex implements _ISharedLockable
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
	private resolvers_: Queue<Pair<AccessType, IListener>>;

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

		this.resolvers_ = new Queue();
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
				this.resolvers_.push(new Pair(AccessType.WRITE, resolve));
		});
	}

	/**
	 * @inheritDoc
	 */
	public async try_lock(): Promise<boolean>
	{
		if (this.write_lock_count_ !== 0 || this.read_lock_count_ !== 0)
			return false;

		this.write_lock_count_++;
		return true;
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
			let access: AccessType = this.resolvers_.front().first;
			let fn: IListener = this.resolvers_.front().second;

			this.resolvers_.pop(); // POP FIRST
			fn(); // AND CALL LATER

			// UNTIL MEET THE WRITE LOCK
			if (access === AccessType.WRITE)
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
				this.resolvers_.push(new Pair(AccessType.READ, resolve));
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
	 * @inheritDoc
	 */
	public async unlock_shared(): Promise<void>
	{
		if (this.read_lock_count_ === 0)
			throw new RangeError("This mutex is free on the shared lock.");

		--this.read_lock_count_;

		if (this.resolvers_.empty() === false)
		{ 
			// MUST BE WRITE LOCK
			let fn: IListener = this.resolvers_.front().second;

			this.resolvers_.pop(); // POP FIRST
			fn(); // AND CALL LATER
		}
	}
}

/**
 * @hidden
 */
interface IListener
{
	(): void;
}

export type shared_mutex = SharedMutex;
export const shared_mutex = SharedMutex;