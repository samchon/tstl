/**
 * @packageDocumentation
 * @module std
 */
import { ISharedLockable } from "../base/thread/ISharedLockable";
/**
 * Shared mutex.
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export declare class SharedMutex implements ISharedLockable {
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
    lock_shared(): Promise<void>;
    /**
     * @inheritDoc
     */
    try_lock_shared(): Promise<boolean>;
    /**
     * @inheritDoc
     */
    unlock_shared(): Promise<void>;
}
//# sourceMappingURL=SharedMutex.d.ts.map