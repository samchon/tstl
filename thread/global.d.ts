/**
 * @packageDocumentation
 * @module std
 */
import { ILockable } from "../base/thread/ILockable";
/**
 * Sleep for time span.
 *
 * @param ms The milliseconds to sleep.
 */
export declare function sleep_for(ms: number): Promise<void>;
/**
 * Sleep until time expiration.
 *
 * @param at The time point to wake up.
 */
export declare function sleep_until(at: Date): Promise<void>;
/**
 * Lock multiple mutexes.
 *
 * @param items Items to lock.
 */
export declare function lock(...items: Pick<ILockable, "lock">[]): Promise<void>;
/**
 * Try lock mutexes.
 *
 * @param items Items to try lock.
 * @return Index of mutex who failed to lock. None of them're failed, then returns `-1`.
 */
export declare function try_lock(...items: Pick<ILockable, "try_lock">[]): Promise<number>;
//# sourceMappingURL=global.d.ts.map