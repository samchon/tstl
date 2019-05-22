//================================================================ 
/** @module std.experimental */
//================================================================
import { List } from "../../container/List";
import { OutOfRange } from "../../exception/LogicError";
import { RangeError } from "../../exception/RuntimeError";

import { LockType } from "../../base/thread/enums";
import { sleep_for } from "../../thread/global";

/**
 * Counting semaphore.
 * 
 * @author Jeongho Nam <http://samchon.org>
 */
export class Semaphore<Max extends number = number>
{
    /**
     * @hidden
     */
    private max_: Max;

    /**
     * @hidden
     */
    private locking_: number;

    /**
     * @hidden
     */
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
        this.locking_ = 0;
        this.queue_ = new List();
    }

    /**
     * Number of maximum sections lockable.
     */
    public max(): Max
    {
        return this.max_;
    }

    /* ---------------------------------------------------------
        ACQURE & RELEASE
    --------------------------------------------------------- */
    /**
     * @inheritDoc
     */
    public acquire(): Promise<void>
    {
        return new Promise<void>(resolve =>
        {
            if (this.locking_ < this.max_)
            {
                ++this.locking_;
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
     * @inheritDoc
     */
    public async try_acquire(): Promise<boolean>
    {
        // ALL OR NOTHING
        if (this.locking_ < this.max_)
        {
            ++this.locking_;
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
        // VALIDATE PARAMETER
        if (count < 1 || count > this.max_)
            throw new OutOfRange("Unlock count to semaphore is out of its range.");
        else if (count > this.locking_)
            throw new RangeError("Number of releases to semaphore is greater than its acquring count.");

        // DO RELEASE
        this.locking_ -= count;
        await this._Release(count);
    }

    /**
     * @hidden
     */
    private async _Release(count: number): Promise<void>
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
            if (++this.locking_ >= this.max_ || --count === 0)
                break;
        }
    }

    /* ---------------------------------------------------------
        TIMED ACQUIRE
    --------------------------------------------------------- */
    /**
     * Try lock sections until timeout.
     * 
     * @param ms The maximum miliseconds for waiting.
     * @param count Count to lock.
     * @return Whether succeded to lock or not.
     */
    public async try_acquire_for(ms: number): Promise<boolean>
    {
        return new Promise<boolean>(resolve =>
        {
            if (this.locking_ < this.max_)
            {
                ++this.locking_;
                resolve(true);
            }
            else
            {
                // RESERVE ACQUIRE
                let it: List.Iterator<IResolver> = this.queue_.insert(this.queue_.end(), 
                {
                    handler: resolve,
                    type: LockType.KNOCK
                });

                // DO SLEEP - TIMED-ACQUIRE
                sleep_for(ms).then(() =>
                {
                    // SUCCEDED: RETURNS TRUE
                    if (it.value.handler === null)
                        return;

                    // FAILURE: ERASE THE RESERVED ITEM
                    this.queue_.erase(it);
                    this._Release(1);

                    // RETURS FALSE
                    resolve(false);
                });
            }
        });
    }

    /**
     * Try lock sections until time expiration.
     * 
     * @param at The maximum time point to wait.
     * @param count Count to lock.
     * @return Whether succeded to lock or not.
     */
    public try_acquire_until(at: Date): Promise<boolean>
    {
        // COMPUTE MILLISECONDS TO WAIT
        let now: Date = new Date();
        let ms: number = at.getTime() - now.getTime();

        return this.try_acquire_for(ms);
    }
}

/**
 * @hidden
 */
interface IResolver
{
    handler: Function | null;
    type: LockType;
}

export type couting_semaphore = Semaphore;
export const couting_semaphore = Semaphore;