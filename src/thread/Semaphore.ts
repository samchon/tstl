//================================================================ 
/**
 * @packageDocumentation
 * @module std  
 */
//================================================================
import { List } from "../container/List";
import { OutOfRange } from "../exception/OutOfRange";

import { ITimedLockable } from "../internal/thread/ITimedLockable";
import { LockType } from "../internal/thread/LockType";
import { sleep_for } from "./global";

/**
 * Counting semaphore.
 * 
 * @author Jeongho Nam - https://github.com/samchon
 */
export class Semaphore<Max extends number = number>
{
    private max_: Max;
    private acquiring_: number;

    private queue_: List<IResolver>;

    /* ---------------------------------------------------------
        CONSTRUCTORS
    --------------------------------------------------------- */
    /**
     * Initializer Constructor.
     * 
     * @param max Number of maximum sections lockable.
     */
    public constructor(max: Max)
    {
        this.max_ = max;
        this.acquiring_ = 0;
        this.queue_ = new List();
    }

    /**
     * Number of maximum sections lockable.
     */
    public max(): Max
    {
        return this.max_;
    }

    public get_lockable(): ITimedLockable
    {
        return new Semaphore.Lockable(this);
    }

    /* ---------------------------------------------------------
        ACQURE & RELEASE
    --------------------------------------------------------- */
    /**
	 * Acquire a section until be released.
	 */
    public acquire(): Promise<void>
    {
        return new Promise<void>(resolve =>
        {
            if (this.acquiring_ < this.max_)
            {
                ++this.acquiring_;
                resolve();
            }
            else
            {
                this.queue_.push_back({
                    handler: resolve,
                    type: LockType.HOLD
                });
            }
        });
    }

    /**
	 * Try acquire a section.
	 * 
	 * @return Whether succeeded to acquire or not.
	 */
    public async try_acquire(): Promise<boolean>
    {
        // ALL OR NOTHING
        if (this.acquiring_ < this.max_)
        {
            ++this.acquiring_;
            return true;
        }
        else
            return false;
    }

    /**
     * @inheritDoc
     */
    public async release(count: number = 1): Promise<void>
    {
        // VALIDATE COUNT
        if (count < 1)
            throw new OutOfRange(`Bug on std.Semaphore.release(): parametric count is less than 1 -> (count = ${count}).`);
        else if (count > this.max_)
            throw new OutOfRange(`Bug on std.Semaphore.release(): parametric count is greater than max -> (count = ${count}, max = ${this.max_}).`);
        else if (count > this.acquiring_)
            throw new OutOfRange(`Bug on std.Semaphore.release(): parametric count is greater than acquiring -> (count = ${count}, acquiring = ${this.acquiring_}).`);

        // DO RELEASE
        this.acquiring_ -= count;
        this._Release(count);
    }

    private _Release(count: number): void
    {
        for (let it = this.queue_.begin(); !it.equals(this.queue_.end()); it = it.next())
        {
            // DO RESOLVE
            this.queue_.erase(it);
            if (it.value.type === LockType.HOLD)
                it.value.handler!();
            else
            {
                it.value.handler!(true);
                it.value.handler = null;
            }

            // BREAK CONDITION
            if (++this.acquiring_ >= this.max_ || --count === 0)
                break;
        }
    }

    private _Cancel(it: List.Iterator<IResolver>): void
    {
        // POP THE LISTENER
        --this.acquiring_;
        this.queue_.erase(it);

        let handler: Function = it.value.handler!;
        it.value.handler = null;

        // RELEASE IF LASTEST RESOLVER
        let prev: List.Iterator<IResolver> = it.prev();
        if (prev.equals(this.queue_.end()) === false && prev.value.handler === null)
            this._Release(1);
        
        // RETURNS FAILURE
        handler(false);
    }

    /* ---------------------------------------------------------
        TIMED ACQUIRE
    --------------------------------------------------------- */
    /**
     * Try acquire a section until timeout.
     * 
     * @param ms The maximum miliseconds for waiting.
     * @return Whether succeded to acquire or not.
     */
    public async try_acquire_for(ms: number): Promise<boolean>
    {
        return new Promise<boolean>(resolve =>
        {
            if (this.acquiring_++ < this.max_)
                resolve(true);
            else
            {
                // RESERVE ACQUIRE
                let it: List.Iterator<IResolver> = this.queue_.insert(this.queue_.end(), 
                {
                    handler: resolve,
                    type: LockType.KNOCK
                });

                // AUTOMATIC RELEASE AFTER TIMEOUT
                sleep_for(ms).then(() =>
                {
                    // NOT YET, THEN DO RELEASE
                    if (it.value.handler !== null)
                        this._Cancel(it);
                });
            }
        });
    }

    /**
     * Try acquire a section until time expiration.
     * 
     * @param at The maximum time point to wait.
     * @return Whether succeded to acquire or not.
     */
    public try_acquire_until(at: Date): Promise<boolean>
    {
        // COMPUTE MILLISECONDS TO WAIT
        let now: Date = new Date();
        let ms: number = at.getTime() - now.getTime();

        return this.try_acquire_for(ms);
    }
}

export namespace Semaphore
{
    /**
     * @internal
     */
    export class Lockable implements ITimedLockable
    {
        private semahpore_: Semaphore;

        public constructor(semaphore: Semaphore)
        {
            this.semahpore_ = semaphore;
        }
        public lock(): Promise<void>
        {
            return this.semahpore_.acquire();
        }
        public unlock(): Promise<void>
        {
            return this.semahpore_.release();
        }

        public try_lock(): Promise<boolean>
        {
            return this.semahpore_.try_acquire();
        }
        public try_lock_for(ms: number): Promise<boolean>
        {
            return this.semahpore_.try_acquire_for(ms);
        }
        public try_lock_until(at: Date): Promise<boolean>
        {
            return this.semahpore_.try_acquire_until(at);
        }
    }
}

interface IResolver
{
    handler: Function | null;
    type: LockType;
}