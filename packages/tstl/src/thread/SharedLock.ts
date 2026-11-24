//================================================================

/**
 * @packageDocumentation
 * @module std
 */
//================================================================
import { ISharedLockable } from "../base/thread/ISharedLockable";
import { ISharedTimedLockable } from "../base/thread/ISharedTimedLockable";
import { SafeLock } from "../internal/thread/SafeLock";

/**
 * Helpers that run a callback under a shared lock and release it when the
 * callback completes or throws.
 */
export class SharedLock {}

/**
 * Helpers that run a callback under a shared lock and release it when the
 * callback completes or throws.
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export namespace SharedLock {
  /**
   * Wait for a shared lock and run the callback. Release the lock even if the
   * callback throws.
   *
   * @param mutex Object that supplies the shared lock.
   * @param closure Callback to run while holding the lock.
   *
   * @throws Propagates an error thrown or rejected by the callback.
   */
  export function lock<
    Mutex extends Pick<ISharedLockable, "lock_shared" | "unlock_shared">,
  >(mutex: Mutex, closure: Closure): Promise<void> {
    return SafeLock.lock(
      () => mutex.lock_shared(),
      () => mutex.unlock_shared(),
      closure,
    );
  }

  /**
   * Run the callback if the shared lock can be acquired immediately. Release
   * the lock even if the callback throws.
   *
   * @param mutex Object that supplies the shared lock.
   * @param closure Callback to run while holding the lock.
   * @return `true` if the lock was acquired and the callback completed.
   *
   * @throws Propagates an error thrown or rejected by the callback.
   */
  export function try_lock<
    Mutex extends Pick<ISharedLockable, "try_lock_shared" | "unlock_shared">,
  >(mutex: Mutex, closure: Closure): Promise<boolean> {
    return SafeLock.try_lock(
      () => mutex.try_lock_shared(),
      () => mutex.unlock_shared(),
      closure,
    );
  }

  /**
   * Run the callback if the shared lock is acquired before the timeout
   * elapses. Release the lock even if the callback throws.
   *
   * @param mutex Object that supplies the shared lock.
   * @param ms Maximum time to wait, in milliseconds.
   * @param closure Callback to run while holding the lock.
   * @return `true` if the lock was acquired and the callback completed.
   *
   * @throws Propagates an error thrown or rejected by the callback.
   */
  export function try_lock_for<
    Mutex extends Pick<
      ISharedTimedLockable,
      "try_lock_shared_for" | "unlock_shared"
    >,
  >(mutex: Mutex, ms: number, closure: Closure): Promise<boolean> {
    return SafeLock.try_lock(
      () => mutex.try_lock_shared_for(ms),
      () => mutex.unlock_shared(),
      closure,
    );
  }

  /**
   * Run the callback if the shared lock is acquired by the deadline. Release
   * the lock even if the callback throws.
   *
   * @param mutex Object that supplies the shared lock.
   * @param at Wall-clock deadline.
   * @param closure Callback to run while holding the lock.
   * @return `true` if the lock was acquired and the callback completed.
   *
   * @throws Propagates an error thrown or rejected by the callback.
   */
  export function try_lock_until<
    Mutex extends Pick<
      ISharedTimedLockable,
      "try_lock_shared_until" | "unlock_shared"
    >,
  >(mutex: Mutex, at: Date, closure: Closure): Promise<boolean> {
    return SafeLock.try_lock(
      () => mutex.try_lock_shared_until(at),
      () => mutex.unlock_shared(),
      closure,
    );
  }

  /**
   * Synchronous or asynchronous callback run while a shared lock is held.
   */
  type Closure = () => void | Promise<void>;
}
