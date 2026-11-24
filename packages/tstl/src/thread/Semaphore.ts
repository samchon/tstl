//================================================================

/**
 * @packageDocumentation
 * @module std
 */
//================================================================
import { ITimedLockable } from "../base/thread/ITimedLockable";
import { List } from "../container/List";
import { InvalidArgument } from "../exception/InvalidArgument";
import { OutOfRange } from "../exception/OutOfRange";
import { LockType } from "../internal/thread/LockType";
import { sleep_for } from "./global";

/**
 * Counting semaphore that allows up to `max()` concurrent acquisitions.
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export class Semaphore<Max extends number = number> {
  private queue_: List<IResolver>;
  private acquiring_: number;
  private max_: Max;

  /* ---------------------------------------------------------
        CONSTRUCTORS
    --------------------------------------------------------- */
  /**
   * Create a semaphore with all permits initially available.
   *
   * @param max Maximum number of concurrent acquisitions.
   */
  public constructor(max: Max) {
    this.queue_ = new List();

    this.acquiring_ = 0;
    this.max_ = max;
  }

  /**
   * Get the total permit count.
   *
   * @return The maximum number of concurrent acquisitions.
   */
  public max(): Max {
    return this.max_;
  }

  /* ---------------------------------------------------------
        ACQUIRANCES
    --------------------------------------------------------- */
  /**
   * Acquire one permit, waiting if all permits are in use. Pair each
   * acquisition with a call to `release()` .
   */
  public acquire(): Promise<void> {
    return new Promise<void>((resolve) => {
      if (this.acquiring_ < this.max_) {
        ++this.acquiring_;
        resolve();
      } else {
        this.queue_.push_back({
          handler: resolve,
          lockType: LockType.HOLD,
        });
      }
    });
  }

  /**
   * Attempt to acquire one permit immediately.
   *
   * @return `true` if a permit was acquired.
   */
  public async try_acquire(): Promise<boolean> {
    // ALL OR NOTHING
    if (this.acquiring_ < this.max_) {
      ++this.acquiring_;
      return true;
    } else return false;
  }

  /**
   * Attempt to acquire one permit before the timeout elapses.
   *
   * @param ms Maximum time to wait, in milliseconds.
   * @return `true` if a permit was acquired.
   */
  public async try_acquire_for(ms: number): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      if (this.acquiring_ < this.max_) {
        ++this.acquiring_;
        resolve(true);
      } else {
        // RESERVE ACQUIRE
        const it: List.Iterator<IResolver> = this.queue_.insert(
          this.queue_.end(),
          {
            handler: resolve,
            lockType: LockType.KNOCK,
          },
        );

        // AUTOMATIC RELEASE AFTER TIMEOUT
        sleep_for(ms).then(() => {
          // NOT YET, THEN DO RELEASE
          if (it.value.handler !== null) this._Cancel(it);
        });
      }
    });
  }

  /**
   * Attempt to acquire one permit by the given deadline.
   *
   * @param at Wall-clock deadline.
   * @return `true` if a permit was acquired.
   */
  public try_acquire_until(at: Date): Promise<boolean> {
    // COMPUTE MILLISECONDS TO WAIT
    const now: Date = new Date();
    const ms: number = at.getTime() - now.getTime();

    return this.try_acquire_for(ms);
  }

  /* ---------------------------------------------------------
        RELEASES
    --------------------------------------------------------- */
  /**
   * Release `n` acquisitions and pass available permits to queued callers.
   *
   * @param n Number of permits to release. Defaults to `1` .
   * @throws {@link InvalidArgument} if `n` is less than `1` .
   * @throws {@link OutOfRange} if `n` exceeds the capacity or current
   * acquisition count.
   */
  public async release(n: number = 1): Promise<void> {
    //----
    // VALIDATION
    //----
    if (n < 1)
      throw new InvalidArgument(
        `Error on std.Semaphore.release(): parametric n is less than 1 -> (n = ${n}).`,
      );
    else if (n > this.max_)
      throw new OutOfRange(
        `Error on std.Semaphore.release(): parametric n is greater than max -> (n = ${n}, max = ${this.max_}).`,
      );
    else if (n > this.acquiring_)
      throw new OutOfRange(
        `Error on std.Semaphore.release(): parametric n is greater than acquiring -> (n = ${n}, acquiring = ${this.acquiring_}).`,
      );

    //----
    // RELEASE
    //----
    const resolverList: IResolver[] = [];
    while (this.queue_.empty() === false && resolverList.length < n) {
      // COPY IF HANDLER EXISTS
      const resolver: IResolver = this.queue_.front();
      if (resolver.handler !== null) resolverList.push({ ...resolver });

      // DESTRUCT
      this.queue_.pop_front();
      resolver.handler = null;
    }

    // COMPUTE REMAINED ACQUIRANCES
    this.acquiring_ -= n - resolverList.length;

    // CALL HANDLERS
    for (const resolver of resolverList)
      if (resolver.lockType === LockType.HOLD) resolver.handler!();
      else resolver.handler!(true);
  }

  private _Cancel(it: List.Iterator<IResolver>): void {
    // POP THE LISTENER
    const handler: Function = it.value.handler!;

    // DESTRUCTION
    it.value.handler = null;
    this.queue_.erase(it);

    // RETURNS FAILURE
    handler(false);
  }
}

/**
 * Counting semaphore that allows up to `max()` concurrent acquisitions.
 */
export namespace Semaphore {
  /**
   * Create a timed lock adapter that uses one semaphore permit per
   * acquisition.
   *
   * @param semaphore Semaphore to adapt.
   * @return An adapter that delegates acquisition and release to the
   * semaphore.
   */
  export function get_lockable<
    SemaphoreT extends Pick<
      Semaphore,
      | "acquire"
      | "try_acquire"
      | "try_acquire_for"
      | "try_acquire_until"
      | "release"
    >,
  >(semaphore: SemaphoreT): ITimedLockable {
    return new Lockable(semaphore);
  }

  /**
   * @internal
   */
  export class Lockable<
    SemaphoreT extends Pick<
      Semaphore,
      | "acquire"
      | "try_acquire"
      | "try_acquire_for"
      | "try_acquire_until"
      | "release"
    >,
  > implements ITimedLockable
  {
    private semahpore_: SemaphoreT;

    public constructor(semaphore: SemaphoreT) {
      this.semahpore_ = semaphore;
    }
    public lock(): Promise<void> {
      return this.semahpore_.acquire();
    }
    public unlock(): Promise<void> {
      return this.semahpore_.release();
    }

    public try_lock(): Promise<boolean> {
      return this.semahpore_.try_acquire();
    }
    public try_lock_for(ms: number): Promise<boolean> {
      return this.semahpore_.try_acquire_for(ms);
    }
    public try_lock_until(at: Date): Promise<boolean> {
      return this.semahpore_.try_acquire_until(at);
    }
  }
}

interface IResolver {
  handler: Function | null;
  lockType: LockType;
}
