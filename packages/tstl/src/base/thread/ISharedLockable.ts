//================================================================

/**
 * @packageDocumentation
 * @module std.base
 */
//================================================================
import { ILockable } from "./ILockable";

/**
 * Asynchronous lock interface with exclusive and shared modes.
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export interface ISharedLockable extends ILockable {
  /* ---------------------------------------------------------
        WRITE LOCK
    --------------------------------------------------------- */
  /**
   * Acquire the exclusive lock once all current exclusive and shared holders
   * have released it.
   */
  lock(): Promise<void>;

  /**
   * Attempt to acquire the exclusive lock immediately.
   *
   * @return `true` when the exclusive lock was acquired.
   */
  try_lock(): Promise<boolean>;

  /**
   * Release the exclusive lock and allow a waiting caller to proceed.
   *
   * @throws {@link DomainError} if there is no exclusive acquisition.
   */
  unlock(): Promise<void>;

  /* ---------------------------------------------------------
        READ LOCK
    --------------------------------------------------------- */
  /**
   * Acquire a shared lock. Multiple callers may hold shared locks together.
   */
  lock_shared(): Promise<void>;

  /**
   * Attempt to acquire a shared lock immediately.
   *
   * @return `true` when a shared lock was acquired.
   */
  try_lock_shared(): Promise<boolean>;

  /**
   * Release one shared acquisition.
   */
  unlock_shared(): Promise<void>;
}
