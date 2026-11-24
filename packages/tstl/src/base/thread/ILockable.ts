//================================================================
/**
 * @packageDocumentation
 * @module std.base
 */
//================================================================
/**
 * Asynchronous exclusive-lock interface.
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export interface ILockable {
  /**
   * Acquire the exclusive lock, waiting until it is available. The caller must
   * release it with `unlock()` .
   */
  lock(): Promise<void>;

  /**
   * Attempt to acquire the exclusive lock immediately.
   *
   * @return `true` when acquired. The caller must then release it with
   * `unlock()` .
   */
  try_lock(): Promise<boolean>;

  /**
   * Release the exclusive lock so another caller can acquire it.
   *
   * @throws {@link DomainError} if the mutex is unlocked.
   */
  unlock(): Promise<void>;
}
