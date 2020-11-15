/**
 * @packageDocumentation
 * @module std
 */
import { ILockable } from "../base/thread/ILockable";
/**
 * Mutex.
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export declare class Mutex implements ILockable {
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
}
//# sourceMappingURL=Mutex.d.ts.map