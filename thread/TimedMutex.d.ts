/**
 * @packageDocumentation
 * @module std
 */
import { ITimedLockable } from "../base/thread/ITimedLockable";
/**
 * Timed mutex.
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export declare class TimedMutex implements ITimedLockable {
    private mutex_;
    /**
     * Default Constructor.
     */
    constructor();
    /**
     * @inheritDoc
     */
    lock(): Promise<void>;
    /**
     * @inheritDoc
     */
    try_lock(): Promise<boolean>;
    /**
     * @inheritDoc
     */
    unlock(): Promise<void>;
    /**
     * @inheritDoc
     */
    try_lock_for(ms: number): Promise<boolean>;
    /**
     * @inheritDoc
     */
    try_lock_until(at: Date): Promise<boolean>;
}
//# sourceMappingURL=TimedMutex.d.ts.map