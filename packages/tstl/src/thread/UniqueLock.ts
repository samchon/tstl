//================================================================

/**
 * @packageDocumentation
 * @module std
 */
//================================================================
import { ILockable } from "../base/thread/ILockable";
import { ITimedLockable } from "../base/thread/ITimedLockable";
import { SafeLock } from "../internal/thread/SafeLock";

/**
 * Helpers that run a callback under a exclusive lock and release it when the
 * callback completes or throws.
 */
export class UniqueLock {}

/**
 * Helpers that run a callback under a exclusive lock and release it when the
 * callback completes or throws.
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export namespace UniqueLock {
  /**
   * Wait for a exclusive lock and run the callback. Release the lock even if
   * the callback throws.
   *
   * @param mutex Object that supplies the exclusive lock.
   * @param closure Callback to run while holding the lock.
   *
   * @throws Propagates an error thrown or rejected by the callback.
   */
  export function lock<Mutex extends Pick<ILockable, "lock" | "unlock">>(
    mutex: Mutex,
    closure: Closure,
  ): Promise<void> {
    return SafeLock.lock(
      () => mutex.lock(),
      () => mutex.unlock(),
      closure,
    );
  }

  /**
   * Run the callback if the exclusive lock can be acquired immediately.
   * Release the lock even if the callback throws.
   *
   * @param mutex Object that supplies the exclusive lock.
   * @param closure Callback to run while holding the lock.
   * @return `true` if the lock was acquired and the callback completed.
   *
   * @throws Propagates an error thrown or rejected by the callback.
   */
  export function try_lock<
    Mutex extends Pick<ILockable, "try_lock" | "unlock">,
  >(mutex: Mutex, closure: Closure): Promise<boolean> {
    return SafeLock.try_lock(
      () => mutex.try_lock(),
      () => mutex.unlock(),
      closure,
    );
  }

  /**
   * Run the callback if the exclusive lock is acquired before the timeout
   * elapses. Release the lock even if the callback throws.
   *
   * @param mutex Object that supplies the exclusive lock.
   * @param ms Maximum time to wait, in milliseconds.
   * @param closure Callback to run while holding the lock.
   * @return `true` if the lock was acquired and the callback completed.
   *
   * @throws Propagates an error thrown or rejected by the callback.
   */
  export function try_lock_for<
    Mutex extends Pick<ITimedLockable, "try_lock_for" | "unlock">,
  >(mutex: Mutex, ms: number, closure: Closure): Promise<boolean> {
    return SafeLock.try_lock(
      () => mutex.try_lock_for(ms),
      () => mutex.unlock(),
      closure,
    );
  }

  /**
   * Run the callback if the exclusive lock is acquired by the deadline.
   * Release the lock even if the callback throws.
   *
   * @param mutex Object that supplies the exclusive lock.
   * @param at Wall-clock deadline.
   * @param closure Callback to run while holding the lock.
   * @return `true` if the lock was acquired and the callback completed.
   *
   * @throws Propagates an error thrown or rejected by the callback.
   */
  export function try_lock_until<
    Mutex extends Pick<ITimedLockable, "try_lock_until" | "unlock">,
  >(mutex: Mutex, at: Date, closure: Closure): Promise<boolean> {
    return SafeLock.try_lock(
      () => mutex.try_lock_until(at),
      () => mutex.unlock(),
      closure,
    );
  }

  /**
   * Synchronous or asynchronous callback run while an exclusive lock is held.
   */
  type Closure = () => void | Promise<void>;
}
