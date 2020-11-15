/**
 * Latch for critical sections.
 *
 * The `Latch` class blocks critical sections until the downward counter to be zero. Howver,
 * unlike {@link Barrier} who can reusable that downward counter be reset whenever reach to the
 * zero, downward of the `Latch` is not reusable but diposable.
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export declare class Latch {
    private cv_;
    private count_;
    /**
     * Initializer Constructor.
     *
     * @param size Size of the downward counter.
     */
    constructor(size: number);
    /**
     * Waits until the counter to be zero.
     *
     * Blocks the function calling until internal counter to be reached to the zero.
     *
     * If the {@link Latch} already has been reached to the zero, it would be returned
     * immediately.
     */
    wait(): Promise<void>;
    /**
     * Test whether the counter has been reached to the zero.
     *
     * The {@link try_wait} function tests whether the internal counter has been reached to the
     * zero.
     *
     * @return Whether reached to zero or not.
     */
    try_wait(): Promise<boolean>;
    /**
     * Tries to wait until the counter to be zero in timeout.
     *
     * Attempts to block the function calling until internal counter to be reached to the zero
     * in timeout. If succeeded to waiting the counter to be reached to the zero, it returns
     * `true`. Otherwise, the {@link Latch} fails to reach to the zero in the given time, the
     * function gives up the waiting and returns `false`.
     *
     * If the {@link Latch} already has been reached to the zero, it would return `true` directly.
     *
     * @param ms The maximum miliseconds for waiting.
     * @return Whether succeeded to waiting in the given time.
     */
    wait_for(ms: number): Promise<boolean>;
    /**
     * Tries to wait until the counter to be zero in time expiration.
     *
     * Attempts to block the function calling until internal counter to be reached to the zero
     * in time expiration. If succeeded to waiting the counter to be reached to the zero, it
     * returns `true`. Otherwise, the {@link Latch} fails to reach to the zero in the given time,
     * the function gives up the waiting and returns `false`.
     *
     * If the {@link Latch} already has been reached to the zero, it would return `true` directly.
     *
     * @param at The maximum time point to wait.
     * @return Whether succeeded to waiting in the given time.
     */
    wait_until(at: Date): Promise<boolean>;
    private _Try_wait;
    /**
     * Derecements the counter.
     *
     * Decrements the counter by *n* without blocking.
     *
     * If the parametric value *n* is equal to or greater than internal counter, so that the
     * internal counter be equal to or less than zero, everyone who are {@link wait waiting} for
     * the {@link Latch} would continue their execution.
     *
     * @param n Value of the decrement. Default is 1.
     */
    count_down(n?: number): Promise<void>;
    /**
     * Decrements the counter and waits until the counter to be zero.
     *
     * Decrements the counter by *n* and blocks the section until internal counter to be zero.
     *
     * If the parametric value *n* is equal to or greater than internal counter, so that the
     * internal counter be equal to or less than zero, everyone who are {@link wait waiting} for
     * the {@link Latch} would continue their execution including this one.
     *
     * @param n Value of the decrement. Default is 1.
     */
    arrive_and_wait(n?: number): Promise<void>;
}
//# sourceMappingURL=Latch.d.ts.map