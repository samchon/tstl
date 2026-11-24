import { HashMap } from "../container/HashMap";
import { hash } from "../functional/hash";
import { equal } from "../ranges/algorithm/iterations";
import { TimedSingleton } from "./TimedSingleton";

/**
 * Maintains a separate lazily refreshed cache for each equivalent tuple of
 * arguments.
 *
 * @template T Type of the value to be lazy-constructed
 * @template Args Type of parameters of the lazy constructor function
 * @author Jeongho Nam - https://github.com/samchon
 */
export class VariadicTimedSingleton<T, Args extends any[]> {
  private readonly interval_: number;
  private readonly closure_: (...args: Args) => T;
  private readonly dict_: HashMap<Args, TimedSingleton<T, Args>>;

  /**
   * Create a cache in which argument tuples are keys.
   *
   * @param interval Cache lifetime for each argument tuple, in milliseconds.
   * @param closure Factory used to compute a value for an argument tuple.
   * @param hasher Hash function for argument tuples.
   * @param pred Equality predicate for argument tuples.
   */
  public constructor(
    interval: number,
    closure: (...args: Args) => T,
    hasher: (args: Args) => number = (args) => hash(...args),
    pred: (x: Args, y: Args) => boolean = equal,
  ) {
    this.interval_ = interval;
    this.closure_ = closure;
    this.dict_ = new HashMap(hasher, pred);
  }

  /**
   * Retrieve the cached value for these arguments, recomputing it if the entry
   * is missing or expired.
   *
   * @param args Arguments that identify the cache entry and are passed to the
   * factory.
   * @returns The value for this argument tuple.
   */
  public get(...args: Args): T {
    let it: HashMap.Iterator<Args, TimedSingleton<T, Args>> = this.dict_.find(
      args,
    );
    if (it.equals(this.dict_.end()) == true) {
      const singleton: TimedSingleton<T, Args> = new TimedSingleton(
        this.interval_,
        this.closure_,
      );
      it = this.dict_.emplace(args, singleton).first;
    }
    return it.second.get(...args);
  }
}
