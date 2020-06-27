import { Mutex } from "./Mutex";
import { UniqueLock } from "./UniqueLock";

/**
 * Asynchronous Singleton Generator.
 * 
 * The `Singleton` is an asynchronous singleton generator class who guarantees the *lazy 
 * constructor* to be called *"only one at time"*. The *"only one at time"* would always be 
 * kepted, even in the race condition.
 *  
 * Create a `Singleton` instance with your custom *lazy constructor* and get the promised value 
 * through the {@link Singleton.get}() method. The {@link Singleton.get}() method would construct 
 * the return value following below logics:
 * 
 *   - At the first time: calls the *lazy constructor* and returns the value.
 *   - After the *lazy construction*: returns the pre-constructed value.
 *   - Race condition: 
 *     - simultaneously call happens during the *lazy construction*.
 *     - guarantees the *"only one at time"* through a *mutex*.
 * 
 * If you want to reload the promised value, regardless of whether the *lazy construction* has 
 * been completed or not, call the {@link Singleton.reload}() method. It would call the *lazy
 * constructor* forcibly, even if the *lany construction* has been completed in sometime.
 * 
 * @type T Type of the promised value to be lazy-constructed.
 * @author Jeongho Nam - https://github.com/samchon
 */
export class Singleton<T>
{
    /**
     * @hidden
     */
    private lazy_constructor: () => Promise<T>;

    /**
     * @hidden
     */
    private mutex_: Mutex;    

    /**
     * @hidden
     */
    private value_: T | object;

    /* ---------------------------------------------------------------
        CONSTRUCTORS
    --------------------------------------------------------------- */
    /**
     * Initializer Constructor.
     * 
     * Create a new `Singleton` instance with the *lazy consturctor*.
     * 
     * @param lazyConstructor Lazy constructor function returning the promised value.
     */
    public constructor(lazyConstructor: () => Promise<T>)
    {
        this.lazy_constructor = lazyConstructor;
        this.mutex_ = new Mutex();
        this.value_ = NOT_MOUNTED_YET;
    }

    /**
     * Reload value.
     * 
     * The `Singleton.reload()` method enforces to call the *lazy constructor*, regardless of 
     * whether the *lazy construction* has been completed or not. Therefore, even if the *lazy
     * construction* has been completed in sometime, the `Singleton.reload()` will call the *lazy
     * constructor* again.
     * 
     * However, unlike {@link Singleton.get}(), `Singleton.reload()` does not ensure the safety 
     * in the race condition. Therefore, you've to be careful by yourself when using this 
     * `Singleton.reload()` method. Try not to call this method simultaneously.
     * 
     * @return Re-constructed value.
     */
    public async reload(): Promise<T>
    {
        this.value_ = NOT_MOUNTED_YET;
        return await this.get();
    }

    /* ---------------------------------------------------------------
        ACCESSORS
    --------------------------------------------------------------- */
    /**
     * Get promised value.
     * 
     * `Singleton.get()` method returns the *lazy constructed value*. It guarantees the *lazy
     * constructor* to be called *"only one at time"*. It ensures the *"only one at time"*, even 
     * in the race condition.
     * 
     * If the promised value is not constructed yet (call this method at the first time), the 
     * *lazy constructor* would be called and returns the promised value. Otherwise, the promised 
     * value has been already constructed by the *lazy constructor* (this method already had been 
     * called), returns the pre-generated value.
     * 
     * Also, you don't need to worry anything even race condition has been occured, calling 
     * `Singleton.get()` simultaneously when the *lazy construction* is not completed but on 
     * going. The `Singleton` guarantees the *lazy constructor* to be called only one at time by 
     * using the *unique-lock* on a *mutex*.
     * 
     * @return The *lazy constructed* value.
     */
    public async get(): Promise<T>
    {
        // UNIQUE-LOCK FOR THE RACE CONDITION
        if (this.value_ === NOT_MOUNTED_YET)
            await UniqueLock.lock(this.mutex_, async () =>
            {
                // COULD BE COMPLETED DURING WAITING
                if (this.value_ !== NOT_MOUNTED_YET)
                    return;

                // CALL THE LAZY-CONSTRUCTOR
                this.value_ = await this.lazy_constructor();
            });
        return this.value_ as T;
    }
}

/**
 * @hidden
 */
const NOT_MOUNTED_YET = {};