//================================================================ 
/**
 * @packageDocumentation
 * @module std  
 */
//================================================================
import { ILockable } from "./ILockable";
import { ITimedLockable } from "../internal/thread/ITimedLockable";

import { SafeLock } from "../internal/thread/SafeLock";

export class UniqueLock<Mutex extends IMutex>
{
    private mutex_: Mutex;

    /* ---------------------------------------------------------
        CONSTRUCTOR
    --------------------------------------------------------- */
    public constructor(mutex: Mutex)
    {
        this.mutex_ = mutex;

        this.try_lock_for = mutex.try_lock_for instanceof Function
            ? UniqueLock.try_lock_for.bind(undefined, this.mutex_ as ITimedLockable)
            : undefined as any;
        this.try_lock_until = mutex.try_lock_until instanceof Function
            ? UniqueLock.try_lock_until.bind(undefined, this.mutex_ as ITimedLockable)
            : undefined as any;
    }

    public try_lock_for: "try_lock_for" extends keyof Mutex
        ? (ms: number, closure: Closure) => Promise<boolean>
        : undefined;

    public try_lock_until: "try_lock_until" extends keyof Mutex
        ? (at: Date, closure: Closure) => Promise<boolean>
        : undefined;

    /* ---------------------------------------------------------
        COMMON METHODS
    --------------------------------------------------------- */
    public lock(closure: Closure): Promise<void>
    {
        return UniqueLock.lock(this.mutex_, closure);
    }
    
    public try_lock(closure: Closure): Promise<boolean>
    {
        return UniqueLock.try_lock(this.mutex_, closure);
    }
}

export namespace UniqueLock
{
    /* ---------------------------------------------------------
        STATIC FUNCTIONS
    --------------------------------------------------------- */
    export function lock<Mutex extends Pick<ILockable, "lock"|"unlock">>
        (mutex: Mutex, closure: Closure): Promise<void>
    {
        return SafeLock.lock
        (
            () => mutex.lock(), 
            () => mutex.unlock(), 
            closure
        );
    }

    export function try_lock<Mutex extends Pick<ILockable, "try_lock"|"unlock">>
        (mutex: Mutex, closure: Closure): Promise<boolean>
    {
        return SafeLock.try_lock
        (
            () => mutex.try_lock(), 
            () => mutex.unlock(), 
            closure
        );
    }

    export function try_lock_for<Mutex extends Pick<ITimedLockable, "try_lock_for"|"unlock">>
        (mutex: Mutex, ms: number, closure: Closure): Promise<boolean>
    {
        return SafeLock.try_lock
        (
            () => mutex.try_lock_for(ms), 
            () => mutex.unlock(), 
            closure
        );
    }

    export function try_lock_until<Mutex extends Pick<ITimedLockable, "try_lock_until"|"unlock">>
        (mutex: Mutex, at: Date, closure: Closure): Promise<boolean>
    {
        return SafeLock.try_lock
        (
            () => mutex.try_lock_until(at), 
            () => mutex.unlock(), 
            closure
        );
    }
}

type IMutex = ILockable & Partial<ITimedLockable>;
type Closure = () => void | Promise<void>;