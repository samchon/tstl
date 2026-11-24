//================================================================

/**
 * @packageDocumentation
 * @module std
 */
//================================================================
import { ConditionVariable } from "./ConditionVariable";

/**
 * One-shot counter for releasing asynchronous waiters when all arrivals have
 * been registered.
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export class Latch {
  private cv_: ConditionVariable;
  private count_: number;

  /* ---------------------------------------------------------
        CONSTRUCTORS
    --------------------------------------------------------- */
  /**
   * Create a latch with the specified initial count.
   *
   * @param size Initial number of arrivals needed to release the latch.
   */
  public constructor(size: number) {
    this.cv_ = new ConditionVariable();
    this.count_ = size;
  }

  /* ---------------------------------------------------------
        WAIT FUNCTIONS
    --------------------------------------------------------- */
  /**
   * Wait until the latch counter reaches zero or below. A completed latch
   * resolves immediately.
   */
  public async wait(): Promise<void> {
    if (this._Try_wait() === false) await this.cv_.wait();
  }

  /**
   * Check the latch without waiting.
   *
   * @return Whether the counter is zero or below.
   */
  public async try_wait(): Promise<boolean> {
    return this._Try_wait();
  }

  /**
   * Wait for the latch counter to reach zero before the timeout elapses.
   *
   * @param ms Maximum time to wait, in milliseconds.
   * @return `true` if the latch is complete or completes before the timeout.
   */
  public async wait_for(ms: number): Promise<boolean> {
    if (this._Try_wait() === true) return true;
    else return await this.cv_.wait_for(ms);
  }

  /**
   * Wait for the latch counter to reach zero by the given deadline.
   *
   * @param at Wall-clock deadline.
   * @return `true` if the latch is complete or completes before the deadline.
   */
  public async wait_until(at: Date): Promise<boolean> {
    if (this._Try_wait() === true) return true;
    else return await this.cv_.wait_until(at);
  }

  private _Try_wait(): boolean {
    return this.count_ <= 0;
  }

  /* -----------------------------------------------------------
        ARRIVAL FUNCTIONS
    ----------------------------------------------------------- */
  /**
   * Register `n` arrivals. A count of zero or below releases the waiters.
   *
   * @param n Number of arrivals to register. Defaults to `1` .
   */
  public async count_down(n: number = 1): Promise<void> {
    this.count_ -= n;
    if (this._Try_wait() === true) await this.cv_.notify_all();
  }

  /**
   * Register `n` arrivals and wait for the counter to reach zero.
   *
   * @param n Number of arrivals to register. Defaults to `1` .
   */
  public async arrive_and_wait(n: number = 1): Promise<void> {
    await this.count_down(n);
    await this.wait();
  }
}
