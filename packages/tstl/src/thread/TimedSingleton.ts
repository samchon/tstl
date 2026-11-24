/**
 * Caches one lazily constructed value and refreshes it on the first `get()`
 * after the interval elapses.
 *
 * @template T Type of the value to be lazy-constructed
 * @author Jeongho Nam - https://github.com/samchon
 */
export class TimedSingleton<T, Args extends any[] = []> {
  private readonly interval_: number;
  private readonly closure_: (...args: Args) => T;
  private expired_at_: number;
  private value_: T;

  /**
   * Create a timed cache with a lazy factory.
   *
   * @param interval Cache lifetime in milliseconds.
   * @param closure Factory called on the first access and after expiration.
   */
  public constructor(interval: number, closure: (...args: Args) => T) {
    this.interval_ = interval;
    this.closure_ = closure;
    this.value_ = null!;
    this.expired_at_ = 0;
  }

  /**
   * Return the cached value, refreshing it with the supplied arguments if the
   * cache has expired.
   *
   * @returns The cached or newly constructed value.
   */
  public get(...args: Args): T {
    if (Date.now() >= this.expired_at_) {
      this.expired_at_ = Date.now() + this.interval_;
      this.value_ = this.closure_(...args);
    }
    return this.value_;
  }
}
