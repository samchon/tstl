//================================================================

/**
 * @packageDocumentation
 * @module std
 */
//================================================================
import { ConditionVariable } from "./ConditionVariable";

/**
 * Reusable barrier for synchronizing asynchronous callers in phases. Each
 * phase completes when its expected arrivals have been registered.
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export class Barrier {
  private cv_: ConditionVariable;

  private size_: number;
  private count_: number;

  /**
   * Create a barrier whose first phase expects `size` arrivals.
   *
   * @param size Initial number of arrivals expected per phase.
   */
  public constructor(size: number) {
    this.cv_ = new ConditionVariable();

    this.size_ = size;
    this.count_ = size;
  }

  /* ---------------------------------------------------------
        WAIT FUNCTIONS
    --------------------------------------------------------- */
  /**
   * Wait for the current phase to complete. Calling this method leaves the
   * arrival count unchanged.
   */
  public wait(): Promise<void> {
    return this.cv_.wait();
  }

  /**
   * Wait for the current phase to complete before the timeout elapses.
   *
   * @param ms Maximum time to wait, in milliseconds.
   * @return `true` when the phase completes before the timeout.
   */
  public wait_for(ms: number): Promise<boolean> {
    return this.cv_.wait_for(ms);
  }

  /**
   * Wait for the current phase to complete by the given deadline.
   *
   * @param at Wall-clock deadline.
   * @return `true` when the phase completes before the deadline.
   */
  public wait_until(at: Date): Promise<boolean> {
    return this.cv_.wait_until(at);
  }

  /* ---------------------------------------------------------
        ARRIVAL FUNCTIONS
    --------------------------------------------------------- */
  /**
   * Register `n` arrivals without waiting for any outstanding arrivals. The
   * final arrival releases current waiters and starts the next phase.
   *
   * @param n Number of arrivals to register. Defaults to `1` .
   */
  public async arrive(n: number = 1): Promise<void> {
    this.count_ -= n;
    if (this.count_ > 0) return;

    this.count_ = this.size_;
    await this.cv_.notify_all();
  }

  /**
   * Register one arrival and wait for the current phase to complete.
   */
  public async arrive_and_wait(): Promise<void> {
    const waiting = this.wait();
    await this.arrive();
    await waiting;
  }

  /**
   * Register one arrival in the current phase and reduce the expected arrivals
   * in later phases by one.
   */
  public async arrive_and_drop(): Promise<void> {
    --this.size_;
    await this.arrive();
  }
}
