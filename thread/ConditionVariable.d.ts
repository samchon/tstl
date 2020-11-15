/**
 * Condition variable.
 *
 * The `ConditionVariable` class blocks critical sections until be notified.
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export declare class ConditionVariable {
    private resolvers_;
    /**
     * Default Constructor.
     */
    constructor();
    /**
     * Wait until notified.
     */
    wait(): Promise<void>;
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
    wait(predicator: ConditionVariable.Predicator): Promise<void>;
    /**
     * Wait for timeout or until notified.
     *
     * @param ms The maximum miliseconds for waiting.
     * @return Whether awaken by notification or timeout.
     */
    wait_for(ms: number): Promise<boolean>;
    /**
     * Wait until timeout or predicator returns true.
     *
     * This method is equivalent to:
    ```typescript
    const at: Date = new Date(Date.now() + ms);
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
    wait_for(ms: number, predicator: ConditionVariable.Predicator): Promise<boolean>;
    /**
     * Wait until notified or time expiration.
     *
     * @param at The maximum time point to wait.
     * @return Whether awaken by notification or time expiration.
     */
    wait_until(at: Date): Promise<boolean>;
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
    wait_until(at: Date, predicator: ConditionVariable.Predicator): Promise<boolean>;
    private _Wait;
    private _Wait_until;
    /**
     * Notify, wake only one up.
     */
    notify_one(): Promise<void>;
    /**
     * Notify, wake all up.
     */
    notify_all(): Promise<void>;
}
/**
 *
 */
export declare namespace ConditionVariable {
    /**
     * Type of predicator function who determines the completion.
     */
    type Predicator = () => boolean | Promise<boolean>;
}
//# sourceMappingURL=ConditionVariable.d.ts.map