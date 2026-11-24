//================================================================

/**
 * @packageDocumentation
 * @module std
 */
//================================================================
import { SharedLock } from "./SharedLock";
import { SharedMutex } from "./SharedMutex";
import { UniqueLock } from "./UniqueLock";

/**
 * Lazy asynchronous value with serialized initialization and explicit
 * operations to replace, reload, or clear it.
 *
 * @template T Type of the promised value to be lazy-constructed.
 * @author Jeongho Nam - https://github.com/samchon
 */
export class MutableSingleton<T, Args extends any[] = []> {
  /**
   * @hidden
   */
  private readonly closure_: (...args: Args) => Promise<T>;

  /**
   * @hidden
   */
  private readonly mutex_: SharedMutex;

  /**
   * @hidden
   */
  private value_: T | object;

  /* ---------------------------------------------------------------
        CONSTRUCTORS
    --------------------------------------------------------------- */
  /**
   * Create an initially unloaded value.
   *
   * @param closure Factory called to load the value.
   */
  public constructor(closure: (...args: Args) => Promise<T>) {
    this.closure_ = closure;
    this.mutex_ = new SharedMutex();
    this.value_ = NOT_MOUNTED_YET;
  }

  /**
   * Run the factory and replace the cached value after it resolves.
   *
   * @return The newly loaded value.
   */
  public async reload(...args: Args): Promise<T> {
    let output: T;
    await UniqueLock.lock(this.mutex_, async () => {
      output = await this.closure_(...args);
      this.value_ = output;
    });
    return output!;
  }

  /**
   * Replace the cached value.
   *
   * @param value Value to cache.
   */
  public async set(value: T): Promise<void> {
    await UniqueLock.lock(this.mutex_, () => {
      this.value_ = value;
    });
  }

  /**
   * Clear the cached value so the next `get()` calls the factory.
   */
  public async clear(): Promise<void> {
    await UniqueLock.lock(this.mutex_, () => {
      this.value_ = NOT_MOUNTED_YET;
    });
  }

  /* ---------------------------------------------------------------
        ACCESSORS
    --------------------------------------------------------------- */
  /**
   * Return the cached value, or initialize it lazily. Concurrent calls share a
   * successful initialization.
   *
   * @return The cached or newly loaded value.
   */
  public async get(...args: Args): Promise<T> {
    let output: T | object = NOT_MOUNTED_YET as any;
    await SharedLock.lock(this.mutex_, async () => {
      output = this.value_;
    });

    if (output === NOT_MOUNTED_YET)
      await UniqueLock.lock(this.mutex_, async () => {
        // COULD BE COMPLETED DURING WAITING
        if (this.value_ !== NOT_MOUNTED_YET) {
          output = this.value_;
          return;
        }

        // CALL THE LAZY-CONSTRUCTOR
        output = await this.closure_(...args);
        this.value_ = output;
      });
    return output as T;
  }

  /**
   * Check whether the singleton currently has a cached value.
   *
   * @returns Whether a successful load or explicit set has cached a value.
   */
  public async is_loaded(): Promise<boolean> {
    let loaded: boolean = false;
    await SharedLock.lock(this.mutex_, async () => {
      loaded = this.value_ !== NOT_MOUNTED_YET;
    });
    return loaded;
  }
}

/**
 * @hidden
 */
const NOT_MOUNTED_YET = {};
