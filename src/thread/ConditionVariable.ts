//================================================================ 
/**
 * @packageDocumentation
 * @module std  
 */
//================================================================
import { HashMap } from "../container/HashMap";
import { LockType } from "../internal/thread/LockType";
import { sleep_until } from "./global";

/**
 * Condition variable.
 * 
 * @author Jeongho Nam - https://github.com/samchon
 */
export class ConditionVariable
{
    private resolvers_: HashMap<IResolver, LockType>;

    /* ---------------------------------------------------------
        CONSTRUCTORS
    --------------------------------------------------------- */
    /**
     * Default Constructor.
     */
    public constructor()
    {
        this.resolvers_ = new HashMap();
    }

    /* ---------------------------------------------------------
        NOTIFIERS
    --------------------------------------------------------- */
    /**
     * Notify, wake one.
     */
    public async notify_one(): Promise<void>
    {
        // NOTHING TO NOTIFY
        if (this.resolvers_.empty())
            return;

        // POP THE 1ST RESOLVER
        let it = this.resolvers_.begin();
        this.resolvers_.erase(it);    

        // CALL ITS HANDLER
        if (it.second === LockType.HOLD)
            it.first();
        else
            it.first(true);
    }

    /**
     * Notify, wake all
     */
    public async notify_all(): Promise<void>
    {
        // NOTHING TO NOTIFY
        if (this.resolvers_.empty())
            return;

        // POP RESOLVERS
        let resolvers = this.resolvers_.toJSON();
        this.resolvers_.clear();

        // ITERATE RESOLVERS
        for (let pair of resolvers)
            if (pair.second === LockType.HOLD)
                pair.first();
            else
                pair.first(true);
    }

    /* ---------------------------------------------------------
        WAITORS
    --------------------------------------------------------- */
    /**
     * Wait until notified.
     */
    public wait(): Promise<void>;

    /**
     * Wait until predicator returns true.
     * 
     * This method is equivalent to:
     * 
    ```typescript
    while (!await predicator())
        await this.wait();
    ```
     * 
     * @param predicator A predicator function determines completion.
     */
    public wait(predicator: Predicator): Promise<void>;

    public async wait(predicator?: Predicator): Promise<void>
    {
        if (!predicator)
            return await this._Wait();
        
        while (!await predicator())
            await this._Wait();
    }

    /**
     * Wait for timeout or until notified.
     * 
     * @param ms The maximum miliseconds for waiting.
     * @return Whether awaken by notification or timeout.
     */
    public wait_for(ms: number): Promise<boolean>;

    /**
     * Wait until timeout or predicator returns true.
     * 
     * This method is equivalent to:
    ```typescript
    let at: Date = new Date(Date.now() + ms);
    while (!await predicator())
    {
        if (!await this.wait_until(at))
            return await predicator();
    }
    return true;
    ```
     * 
     * @param ms The maximum miliseconds for waiting.
     * @param predicator A predicator function determines the completion.
     * @return Returned value of the *predicator*.
     */
    public wait_for(ms: number, predicator: Predicator): Promise<boolean>;

    public wait_for(ms: number, predicator?: Predicator): Promise<boolean>
    {
        let at: Date = new Date(Date.now() + ms);
        return this.wait_until(at, predicator!);
    }

    /**
     * Wait until notified or time expiration.
     * 
     * @param at The maximum time point to wait.
     * @return Whether awaken by notification or time expiration.
     */
    public wait_until(at: Date): Promise<boolean>;

    /**
     * Wait until time expiration or predicator returns true.
     * 
     * This method is equivalent to:
    ```typescript
    while (!await predicator())
    {
        if (!await this.wait_until(at))
            return await predicator();
    }
    return true;
    ```
     * 
     * @param at The maximum time point to wait.
     * @param predicator A predicator function determines the completion.
     * @return Returned value of the *predicator*.
     */
    public wait_until(at: Date, predicator: Predicator): Promise<boolean>;

    public async wait_until(at: Date, predicator?: Predicator): Promise<boolean>
    {
        if (!predicator)
            return await this._Wait_until(at);

        while (!await predicator())
            if (!await this._Wait_until(at))
                return await predicator();
        
        return true;
    }

    private _Wait(): Promise<void>
    {
        return new Promise<void>(resolve => 
        {
            this.resolvers_.emplace(resolve, LockType.HOLD);
        });
    }

    private _Wait_until(at: Date): Promise<boolean>
    {
        return new Promise<boolean>(resolve =>
        {
            this.resolvers_.emplace(resolve, LockType.KNOCK);

            // AUTOMATIC UNLOCK
            sleep_until(at).then(() =>
            {
                if (this.resolvers_.has(resolve) === false)
                    return;

                // DO UNLOCK
                this.resolvers_.erase(resolve); // POP THE LISTENER
                resolve(false); // RETURN FAILURE
            });
        });
    }
}

interface IResolver
{
    (value?: any): void;
}
type Predicator = () => boolean | Promise<boolean>;