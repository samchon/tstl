//================================================================

/**
 * @packageDocumentation
 * @module std.base
 */
//================================================================
import { ISharedLockable } from "./ISharedLockable";

/**
 * Exclusive and shared locking with bounded acquisition attempts.
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export interface ISharedTimedLockable extends ISharedLockable {
  /* ---------------------------------------------------------
        WRITE LOCK
    --------------------------------------------------------- */
  /**
   * Attempt to acquire the exclusive lock before the timeout elapses.
   *
   * @param ms Maximum time to wait, in milliseconds.
   * @return `true` when the exclusive lock was acquired.
   */
  try_lock_for(ms: number): Promise<boolean>;

  /**
   * Attempt to acquire the exclusive lock by the given deadline.
   *
   * @param at Wall-clock deadline.
   * @return `true` when the exclusive lock was acquired.
   */
  try_lock_until(at: Date): Promise<boolean>;

  /* ---------------------------------------------------------
        READ LOCK
    --------------------------------------------------------- */
  /**
   * Attempt to acquire a shared lock before the timeout elapses.
   *
   * @param ms Maximum time to wait, in milliseconds.
   * @return `true` when a shared lock was acquired.
   */
  try_lock_shared_for(ms: number): Promise<boolean>;

  /**
   * Attempt to acquire a shared lock by the given deadline.
   *
   * @param at Wall-clock deadline.
   * @return `true` when a shared lock was acquired.
   */
  try_lock_shared_until(at: Date): Promise<boolean>;
}
