//================================================================ 
/** @module std */
//================================================================
import { ITimedLockable } from "./ITimedLockable";
import { SharedTimedMutex } from "./SharedTimedMutex";

/**
 * Timed mutex.
 * 
 * @author Jeongho Nam <http://samchon.org>
 */
export class TimedMutex implements ITimedLockable
{
    /**
     * @hidden
     */
    private mutex_: SharedTimedMutex;

    /* ---------------------------------------------------------
        CONSTRUCTOR
    --------------------------------------------------------- */
    /**
     * Default Constructor.
     */
    public constructor()
    {
        this.mutex_ = new SharedTimedMutex(this);
    }

    /* ---------------------------------------------------------
        LOCK & UNLOCK
    --------------------------------------------------------- */
    /**
     * @inheritDoc
     */
    public lock(): Promise<void>
    {
        return this.mutex_.lock();
    }

    /**
     * @inheritDoc
     */
    public try_lock(): Promise<boolean>
    {
        return this.mutex_.try_lock();
    }

    /**
     * @inheritDoc
     */
    public unlock(): Promise<void>
    {
        return this.mutex_.unlock();
    }

    /* ---------------------------------------------------------
        TIMED LOCK
    --------------------------------------------------------- */
    /**
     * @inheritDoc
     */
    public try_lock_for(ms: number): Promise<boolean>
    {
        return this.mutex_.try_lock_for(ms);
    }
    
    /**
     * @inheritDoc
     */
    public try_lock_until(at: Date): Promise<boolean>
    {
        return this.mutex_.try_lock_until(at);
    }
}

export type timed_mutex = TimedMutex;
export const timed_mutex = TimedMutex;