//================================================================ 
/** @module std */
//================================================================
import { ITimedLockable } from "./ITimedLockable";
import { _ISharedTimedLockable } from "../base/thread/_ISharedTimedLockable";

import { AccessType, LockType } from "../base/thread/enums";
import { RangeError } from "../exception/RuntimeError";
import { sleep_for } from "./global";
import { List } from "../container/List";

/**
 * Shared timed mutex.
 * 
 * @author Jeongho Nam <http://samchon.org>
 */
export class SharedTimedMutex implements ITimedLockable, _ISharedTimedLockable
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
    private resolvers_: List<IResolver>;

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

        this.resolvers_ = new List();
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
			let resolver: IResolver = {
				handler: (this.write_lock_count_++ === 0 && this.read_lock_count_ === 0)
					? null
					: resolve,
				accessType: AccessType.WRITE,
				lockType: LockType.HOLD
			};
			this.resolvers_.push_back(resolver);

			if (resolver.handler === null)
				resolve();
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
		this.resolvers_.push({
			handler: null,
			accessType: AccessType.WRITE,
			lockType: LockType.KNOCK
		});
        return true;
    }

    /**
     * @inheritDoc
     */
    public try_lock_for(ms: number): Promise<boolean>
    {
        return new Promise<boolean>(resolve =>
        {
			let resolver: IResolver = {
				handler: (this.write_lock_count_++ === 0 && this.read_lock_count_ === 0)
					? null
					: resolve,
				accessType: AccessType.WRITE,
				lockType: LockType.KNOCK
			};
			this.resolvers_.push_back(resolver);

			if (resolver.handler === null)
				resolve(true);
			else
			{
				// AUTOMATIC UNLOCK AFTER TIMEOUT
				let it: List.Iterator<IResolver> = this.resolvers_.end().prev();
				sleep_for(ms).then(() =>
				{
					// HAVE UNLOCKED YET
					if (it.value.handler === null)
						return;

					// NOT YET, THEN DO UNLOCK
                    this.resolvers_.erase(it); // POP THE LISTENER
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
            let it: List.Iterator<IResolver> = this.resolvers_.begin();
            this.resolvers_.erase(it); // POP FIRST

            // AND CALL LATER
            if (it.value.handler !== null)
                if (it.value.lockType === LockType.HOLD)
                    it.value.handler();
                else
                    it.value.handler(true);

            // UNTIL MEET THE WRITE LOCK
            if (it.value.accessType === AccessType.WRITE)
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
            
            let resolver: IResolver = {
                handler: (this.write_lock_count_ === 0)
                ? null
                : resolve,
				accessType: AccessType.READ,
				lockType: LockType.HOLD
			}
			this.resolvers_.push_back(resolver);
			
            ++this.read_lock_count_;
			if (resolver.handler === null)
                resolve();
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
		this.resolvers_.push_back({
			handler: null,
			accessType: AccessType.READ,
			lockType: LockType.KNOCK
		});
        return true;
    }

    /**
     * @inheritDoc
     */
    public try_lock_shared_for(ms: number): Promise<boolean>
    {
        return new Promise<boolean>(resolve =>
        {
			++this.read_lock_count_;

			let resolver: IResolver = {
				handler: (this.write_lock_count_ === 0)
					? null
					: resolve,
				accessType: AccessType.READ,
				lockType: LockType.KNOCK
			};
			this.resolvers_.push_back(resolver);

			if (resolver.handler === null)
				resolve(true);
			else
			{
				// AUTOMATIC UNLOCK AFTER TIMEOUT
				let it: List.Iterator<IResolver> = this.resolvers_.end().prev();
				sleep_for(ms).then(() =>
				{
					if (it.value.accessType === null)
                        return;

                    // DO UNLOCK
                    this.resolvers_.erase(it); // POP THE LISTENER
                    --this.read_lock_count_; // DECREASE LOCKED COUNT

                    resolve(false); // RETURN FAILURE
				});
			}
        });
    }

    /**
     * @inheritDoc
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

        while (this.resolvers_.empty() === false)
        { 
            // PICK A LISTENER
            let it: List.Iterator<IResolver> = this.resolvers_.begin();
            this.resolvers_.erase(it); // POP FIRST
            
			if (it.value.handler === null)
				continue; // ANOTHER READ-LOCKS
			
            // AND CALL LATER (WRITE-LOCK)
            if (it.value.lockType === LockType.HOLD)
                it.value.handler();
            else
				it.value.handler(true);
			break;
        }
    }
}
export type shared_timed_mutex = SharedTimedMutex;
export const shared_timed_mutex = SharedTimedMutex;

/**
 * @hidden
 */
interface IResolver
{
    handler: Function | null;
    accessType: AccessType; // read or write
    lockType: LockType; // void or boolean
}