//================================================================ 
/** @module std */
//================================================================
import { ITimedLockable } from "./ITimedLockable";
import { _ISharedTimedLockable } from "../base/thread/_ISharedTimedLockable";

import { List } from "../container/List";

import { AccessType, LockType } from "../base/thread/enums";
import { RangeError } from "../exception/RuntimeError";
import { sleep_for } from "./global";

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
    private queue_: List<IResolver>;

    /**
     * @hidden
     */
    private it_: List.Iterator<IResolver>;

    /**
     * @hidden
     */
    private writing_: number;

    /**
     * @hidden
     */
    private reading_: number;

    /* ---------------------------------------------------------
        CONSTRUCTORS
    --------------------------------------------------------- */
    /**
     * Default Constructor.
     */
    public constructor()
    {
        this.queue_ = new List();
        this.it_ = this.queue_.end();

        this.writing_ = 0;
        this.reading_ = 0;
    }

    /**
     * @hidden
     */
    private _Current_access_type(): AccessType | null
    {
        return this.queue_.empty()
            ? null
            : this.queue_.front().accessType;
    }

    /**
     * @hidden
     */
    private _Emplace(resolver: IResolver): void
    {
        this.queue_.push_back(resolver);
        if (this.it_.equals(this.queue_.end()) === true)
            this.it_ = this.queue_.end().prev();
    }

    /**
     * @hidden
     */
    private _Release(): void
    {
        // STEP TO THE NEXT LOCKS
        let last: IResolver | null = null;
        let it: List.Iterator<IResolver> = this.it_;

        for (; !it.equals(this.queue_.end()); it = it.next())
        {
            let resolver: IResolver = it.value;

            // DIFFERENT ACCESS TYPE COMES ?
            if (last !== null && last.accessType !== resolver.accessType)
                break;
            last = resolver;

            //----
            // DO RESOLVE
            //-----
            // NOT RESOLVED YET
            if (resolver.handler !== null)
            {
                // CALL RESOLVER
                if (resolver.lockType === LockType.HOLD)
                    resolver.handler();
                else
                    resolver.handler(true);
                
                // CLEAR RESOLVER
                resolver.handler = null;                
            }

            // STOP AFTER WRITE LOCK
            if (resolver.accessType === AccessType.WRITE)
                break;
        }
        this.it_ = it;
    }

    /**
     * @hidden
     */
    private _Cancel(it: List.Iterator<IResolver>): void
    {
        // POP THE LISTENER
        this.queue_.erase(it);

        // RELEASE IF LASTEST RESOLVER
        let prev: List.Iterator<IResolver> = it.prev();
        if (prev.equals(this.queue_.end()) || prev.value.handler === null)
        {
            this.it_ = prev;
            this._Release();
        }

        // RETURN FAILURE
        it.value.handler!(false);
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
    public async lock(): Promise<void>
    {
        return new Promise<void>(resolve =>
        {
            let resolver: IResolver = {
                handler: (this.writing_++ === 0 && this.reading_ === 0)
                    ? null
                    : resolve,
                accessType: AccessType.WRITE,
                lockType: LockType.HOLD
            };
            this._Emplace(resolver);

            if (resolver.handler === null)
                resolve();
        });
    }

    /**
     * @inheritDoc
     */
    public async try_lock(): Promise<boolean>
    {
        if (this.writing_ !== 0 || this.reading_ !== 0)
            return false;

        ++this.writing_;
        this._Emplace({
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
                handler: (this.writing_++ === 0 && this.reading_ === 0)
                    ? null
                    : resolve,
                accessType: AccessType.WRITE,
                lockType: LockType.KNOCK
            };
            this._Emplace(resolver);

            if (resolver.handler === null)
                resolve(true);
            else
            {
                // AUTOMATIC UNLOCK AFTER TIMEOUT
                let it: List.Iterator<IResolver> = this.queue_.end().prev();
                sleep_for(ms).then(() =>
                {
                    // HAVE UNLOCKED YET
                    if (it.value.handler === null)
                        return;

                    // NOT YET, THEN DO UNLOCK
                    --this.writing_;
                    this._Cancel(it);

                    // RETURN FAILURE
                    resolve(false);
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
        if (this._Current_access_type() !== AccessType.WRITE)
            throw new RangeError("This mutex is free on the unique lock.");

        --this.writing_;
        this.queue_.pop_front();

        this._Release();
    }

    /* ---------------------------------------------------------
        READ LOCK
    --------------------------------------------------------- */
    /**
     * @inheritDoc
     */
    public async lock_shared(): Promise<void>
    {
        return new Promise<void>(resolve =>
        {
            let resolver: IResolver = {
                handler: (this.writing_ === 0)
                    ? null
                    : resolve,
                accessType: AccessType.READ,
                lockType: LockType.HOLD
            }
            this._Emplace(resolver);
            
            ++this.reading_;
            if (resolver.handler === null)
                resolve();
        });
    }

    /**
     * @inheritDoc
     */
    public async try_lock_shared(): Promise<boolean>
    {
        if (this.writing_ !== 0)
            return false;
        
        ++this.reading_;
        this._Emplace({
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
            let resolver: IResolver = {
                handler: (this.writing_ === 0)
                    ? null
                    : resolve,
                accessType: AccessType.READ,
                lockType: LockType.KNOCK
            };
            
            ++this.reading_;
            this._Emplace(resolver);

            if (resolver.handler === null)
                resolve(true);
            else
            {
                // AUTOMATIC UNLOCK AFTER TIMEOUT
                let it: List.Iterator<IResolver> = this.queue_.end().prev();
                sleep_for(ms).then(() =>
                {
                    if (it.value.accessType === null)
                        return;

                    // DO UNLOCK
                    --this.reading_;
                    this._Cancel(it);

                    // RETURN FAILURE
                    resolve(false);
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
        if (this._Current_access_type() !== AccessType.READ)
            throw new RangeError("This mutex is free on the shared lock.");

        --this.reading_;
        this.queue_.pop_front();

        this._Release();
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