//================================================================ 
/** @module std.experimental */
//================================================================
import { LockType } from "../../base/thread/enums";

import { HashMap } from "../../container/HashMap";
import { OutOfRange } from "../../exception/LogicError";
import { RangeError } from "../../exception/RuntimeError";

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
    private hold_count_: number;

    /**
     * @hidden
     */
    private locked_count_: number;

    /**
     * @hidden
     */
    private max_: Max;

    /**
     * @hidden
     */
    private resolvers_: HashMap<IResolver, IProps>;

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
        this.locked_count_ = 0;
        this.hold_count_ = 0;
        this.max_ = max;

        this.resolvers_ = new HashMap();
    }

    /**
     * Number of maximum sections lockable.
     */
    public max(): Max
    {
        return this.max_;
    }

    /**
     * @hidden
     */
    private _Compute_excess_count(count: number): number
    {
        return Math.max(0, Math.min(this.locked_count_, this.max_) + count - this.max_);
    }

    /**
     * @hidden
     */
    private _Compute_resolve_count(count: number): number
    {
        return Math.min(count, this.hold_count_);
    }

    /* ---------------------------------------------------------
        ACQURE & RELEASE
    --------------------------------------------------------- */
    /**
     * @inheritDoc
     */
    public acquire(count: number = 1): Promise<void>
    {
        return new Promise<void>((resolve, reject) =>
        {
            // VALIDATE PARAMETER
            if (count < 1 || count > this.max_)
            {
                reject(new OutOfRange("Lock count to semaphore is out of its range."));
                return;
            }

            // INCREASE COUNT PROPERTIES
            let exceeded_count: number = this._Compute_excess_count(count);

            this.hold_count_ += exceeded_count;
            this.locked_count_ += count;

            // BRANCH; KEEP OR GO?
            if (exceeded_count > 0)
                this.resolvers_.emplace(resolve, 
                {
                    count: exceeded_count, 
                    type: LockType.HOLD
                });
            else
                resolve();
        });
    }

    /**
     * @inheritDoc
     */
    public async try_acquire(count: number = 1): Promise<boolean>
    {
        // VALIDATE PARAMETER
        if (count < 1 || count > this.max_)
            throw new OutOfRange("Lock count to semaphore is out of its range.");

        // ALL OR NOTHING
        if (this.locked_count_ + count > this.max_)
            return false;
        
        this.locked_count_ += count;
        return true;
    }

    /**
     * @inheritDoc
     */
    public async release(count: number = 1): Promise<void>
    {
        // VALIDATE PARAMETER
        if (count < 1 || count > this.max_)
            throw new OutOfRange("Unlock count to semaphore is out of its range.");
        else if (count > this.locked_count_)
            throw new RangeError("Number of unlocks to semaphore is greater than its locks.");

        // DO RELEASE
        this.locked_count_ -= count;
        await this._Release(count);
    }

    /**
     * @hidden
     */
    private async _Release(resolved_count: number): Promise<void>
    {
        // COMPUTE PROPERTY
        resolved_count = this._Compute_resolve_count(resolved_count);
        this.hold_count_ -= resolved_count;

        while (resolved_count !== 0)
        {
            let it/*Iterator*/ = this.resolvers_.begin();
            let props: IProps = it.second;

            if (props.count > resolved_count)
            {
                props.count -= resolved_count;
                resolved_count = 0;
            }
            else
            {
                // POP AND DECREAE COUNT FIRST
                resolved_count -= props.count;
                this.resolvers_.erase(it);

                // INFORM UNLOCK
                if (props.type === LockType.HOLD)
                    it.first();
                else
                    it.first(true);
            }
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
    public async try_acquire_for(ms: number, count: number = 1): Promise<boolean>
    {
        return new Promise<boolean>((resolve, reject) =>
        {
            // VALIDATE PARAMETER
            if (count < 1 || count > this.max_)
            {
                reject(new OutOfRange("Lock count to semaphore is out of its range."));
                return;
            }

            // INCRESE COUNT PROPERTIES
            let exceeded_count: number = this._Compute_excess_count(count);

            this.hold_count_ += exceeded_count;
            this.locked_count_ += count;

            // BRANCH; KEEP OR GO?
            if (exceeded_count > 0)
            {
                // RESERVATE LOCK
                this.resolvers_.emplace(resolve, 
                {
                    count: exceeded_count, 
                    type: LockType.KNOCK
                });

                // DO SLEEP
                sleep_for(ms).then(() =>
                {
                    let it/*Iterator*/ = this.resolvers_.find(resolve);
                    if (it.equals(this.resolvers_.end()) === true)
                        return; // ALREADY BE RETURNED

                    //----
                    // ADJUSTMENTS
                    //----
                    // ALL OR NOTHING
                    this.locked_count_ -= count - (exceeded_count - it.second.count);

                    // ERASE RESOLVER
                    this.hold_count_ -= it.second.count;
                    this.resolvers_.erase(it);

                    // RELEASE FOR THE NEXT HOLDERS
                    this._Release(it.second.count).then(() =>
                    {
                        // RETURNS
                        resolve(false);
                    });
                });
            }
            else // SUCCEEDED AT ONCE
                resolve(true);
        });
    }

    /**
     * Try lock sections until time expiration.
     * 
     * @param at The maximum time point to wait.
     * @param count Count to lock.
     * @return Whether succeded to lock or not.
     */
    public try_acquire_until(at: Date, count: number = 1): Promise<boolean>
    {
        // COMPUTE MILLISECONDS TO WAIT
        let now: Date = new Date();
        let ms: number = at.getTime() - now.getTime();

        return this.try_acquire_for(ms, count);
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
interface IProps
{
    count: number;
    type: LockType;
}

export type couting_semaphore = Semaphore;
export const couting_semaphore = Semaphore;