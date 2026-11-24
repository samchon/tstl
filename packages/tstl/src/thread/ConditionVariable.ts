//================================================================

/**
 * @packageDocumentation
 * @module std
 */
//================================================================
import { List } from "../container/List";
import { LockType } from "../internal/thread/LockType";
import { sleep_until } from "./global";

/**
 * Asynchronous notification point for callers waiting for an event or a
 * predicate.
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export class ConditionVariable {
  private resolvers_: List<IResolver>;

  /* ---------------------------------------------------------
        CONSTRUCTORS
    --------------------------------------------------------- */
  /**
   * Create a condition variable with no waiters.
   */
  public constructor() {
    this.resolvers_ = new List();
  }

  /* ---------------------------------------------------------
        WAIT FUNCTIONS
    --------------------------------------------------------- */
  /**
   * Wait for a notification.
   */
  public wait(): Promise<void>;

  /**
   * Evaluate `predicator` immediately and after each notification. Keep
   * waiting until it returns `true` .
   *
   * @param predicator Predicate checked before waiting and after a
   * notification.
   */
  public wait(predicator: ConditionVariable.Predicator): Promise<void>;

  public async wait(predicator?: ConditionVariable.Predicator): Promise<void> {
    if (!predicator) return await this._Wait();

    while (!(await predicator())) await this._Wait();
  }

  /**
   * Wait for a notification before the timeout elapses.
   *
   * @param ms Maximum time to wait, in milliseconds.
   * @return `true` if notified before the timeout.
   */
  public wait_for(ms: number): Promise<boolean>;

  /**
   * Evaluate `predicator` before waiting, after each notification, and once
   * after a timeout.
   *
   * @param ms Maximum time to wait, in milliseconds.
   * @param predicator Predicate checked before waiting and after a
   * notification.
   * @return The predicate result that ended the wait.
   */
  public wait_for(
    ms: number,
    predicator: ConditionVariable.Predicator,
  ): Promise<boolean>;

  public wait_for(
    ms: number,
    predicator?: ConditionVariable.Predicator,
  ): Promise<boolean> {
    const at: Date = new Date(Date.now() + ms);
    return this.wait_until(at, predicator!);
  }

  /**
   * Wait for a notification by a wall-clock deadline.
   *
   * @param at Wall-clock deadline.
   * @return `true` if notified before the deadline.
   */
  public wait_until(at: Date): Promise<boolean>;

  /**
   * Evaluate `predicator` before waiting, after each notification, and once
   * after a timeout.
   *
   * @param at Wall-clock deadline.
   * @param predicator Predicate checked before waiting and after a
   * notification.
   * @return The predicate result that ended the wait.
   */
  public wait_until(
    at: Date,
    predicator: ConditionVariable.Predicator,
  ): Promise<boolean>;

  public async wait_until(
    at: Date,
    predicator?: ConditionVariable.Predicator,
  ): Promise<boolean> {
    if (!predicator) return await this._Wait_until(at);

    while (!(await predicator()))
      if (!(await this._Wait_until(at))) return await predicator();

    return true;
  }

  private _Wait(): Promise<void> {
    return new Promise<void>((resolve) => {
      this.resolvers_.push_back({
        handler: resolve,
        lockType: LockType.HOLD,
      });
    });
  }

  private _Wait_until(at: Date): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      const it: List.Iterator<IResolver> = this.resolvers_.insert(
        this.resolvers_.end(),
        {
          handler: resolve,
          lockType: LockType.KNOCK,
        },
      );

      // AUTOMATIC UNLOCK
      sleep_until(at).then(() => {
        if (it.erased_ === true) return;

        // DO UNLOCK
        this.resolvers_.erase(it); // POP THE LISTENER
        resolve(false); // RETURN FAILURE
      });
    });
  }

  /* ---------------------------------------------------------
        NOTIFIERS
    --------------------------------------------------------- */
  /**
   * Release the first queued waiter, if any.
   */
  public async notify_one(): Promise<void> {
    // NOTHING TO NOTIFY
    if (this.resolvers_.empty()) return;

    // POP THE 1ST RESOLVER
    const it = this.resolvers_.begin();
    this.resolvers_.erase(it);

    // CALL ITS HANDLER
    if (it.value.lockType === LockType.HOLD) it.value.handler();
    else it.value.handler(true);
  }

  /**
   * Release all callers currently waiting on this condition variable.
   */
  public async notify_all(): Promise<void> {
    // NOTHING TO NOTIFY
    if (this.resolvers_.empty()) return;

    // POP RESOLVERS
    const resolverList: IResolver[] = this.resolvers_.toJSON();
    // Timed waiters use the erased flag to tell that they were notified.
    this.resolvers_.erase(this.resolvers_.begin(), this.resolvers_.end());

    // ITERATE RESOLVERS
    for (const resolver of resolverList)
      if (resolver.lockType === LockType.HOLD) resolver.handler();
      else resolver.handler(true);
  }
}

/**
 * Asynchronous notification point for callers waiting for an event or a
 * predicate.
 */
export namespace ConditionVariable {
  /**
   * Synchronous or asynchronous predicate indicating that the caller may stop
   * waiting.
   */
  export type Predicator = () => boolean | Promise<boolean>;
}

interface IResolver {
  handler: (value?: any) => void;
  lockType: LockType;
}
