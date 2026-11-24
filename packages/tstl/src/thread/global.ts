//================================================================

/**
 * @packageDocumentation
 * @module std
 */
//================================================================
import { ILockable } from "../base/thread/ILockable";

/**
 * Resolve after a timer of the requested duration. A nonpositive duration
 * resolves on a later timer turn.
 *
 * @param ms Duration in milliseconds.
 */
export function sleep_for(ms: number): Promise<void> {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, Math.max(0, ms));
  });
}

/**
 * Resolve on a timer at or after the given time.
 *
 * @param at Wall-clock time to wait for.
 */
export function sleep_until(at: Date): Promise<void> {
  const now: Date = new Date();
  const ms: number = at.getTime() - now.getTime(); // MILLISECONDS TO WAIT

  return sleep_for(ms); // CONVERT TO THE SLEEP_FOR
}

/**
 * Start acquiring each mutex and wait until every acquisition succeeds. The
 * caller is responsible for releasing each acquired lock.
 *
 * @param items Mutexes to acquire.
 */
export async function lock(...items: Pick<ILockable, "lock">[]): Promise<void> {
  const promises: Promise<void>[] = [];
  for (const mtx of items) promises.push(mtx.lock());

  await Promise.all(promises);
}

/**
 * Attempt to acquire the mutexes in argument order. Stop at the first failure.
 * Earlier acquisitions remain held.
 *
 * @param items Mutexes to acquire, in attempt order.
 * @return The index of the first failure, or `-1` if every lock was acquired.
 */
export async function try_lock(
  ...items: Pick<ILockable, "try_lock">[]
): Promise<number> {
  for (let i: number = 0; i < items.length; ++i)
    if ((await items[i].try_lock()) === false) return i;

  return -1;
}
