import { ISharedTimedLockable } from "../base/thread/ISharedTimedLockable";
/**
 * Shared timed mutex.
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export declare class SharedTimedMutex implements ISharedTimedLockable {
    private source_;
    private queue_;
    private writing_;
    private reading_;
    /**
     * Default Constructor.
     */
    constructor();
    private _Current_access_type;
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
    try_lock_for(ms: number): Promise<boolean>;
    /**
     * @inheritDoc
     */
    try_lock_until(at: Date): Promise<boolean>;
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
    try_lock_shared_for(ms: number): Promise<boolean>;
    /**
     * @inheritDoc
     */
    try_lock_shared_until(at: Date): Promise<boolean>;
    /**
     * @inheritDoc
     */
    unlock_shared(): Promise<void>;
    private _Release;
    private _Cancel;
}
//# sourceMappingURL=SharedTimedMutex.d.ts.map