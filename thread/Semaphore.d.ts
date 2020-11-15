import { ITimedLockable } from "../base/thread/ITimedLockable";
/**
 * Counting semaphore.
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export declare class Semaphore<Max extends number = number> {
    private queue_;
    private acquiring_;
    private max_;
    /**
     * Initializer Constructor.
     *
     * @param max Number of maximum sections acquirable.
     */
    constructor(max: Max);
    /**
     * Get number of maximum sections lockable.
     *
     * @return Number of maximum sections lockable.
     */
    max(): Max;
    /**
     * Acquires a section.
     *
     * Acquires a section until be {@link release released}. If all of the sections in the
     * semaphore already have been acquired by others, the function call would be blocked until
     * one of them returns its acquisition by calling the {@link release} method.
     *
     * In same reason, if you don't call the {@link release} function after you business, the
     * others who want to {@link acquire} a section from the semaphore would be fall into the
     * forever sleep. Therefore, never forget to calling the {@link release} function or utilize
     * the {@link UniqueLock.lock} function instead with {@link Semaphore.get_lockable} to ensure
     * the safety.
     */
    acquire(): Promise<void>;
    /**
     * Tries to acquire a section.
     *
     * Attempts to acquire a section without blocking. If succeeded to acquire a section from the
     * semaphore immediately, it returns `true` directly. Otherwise all of the sections in the
     * semaphore are full, the function gives up the trial immediately and returns `false`
     * directly.
     *
     * Note that, if you succeeded to acquire a section from the semaphore (returns `true) but do
     * not call the {@link release} function after your business, the others who want to
     * {@link acquire} a section from the semaphore would be fall into the forever sleep.
     * Therefore, never forget to calling the {@link release} function or utilize the
     * {@link UniqueLock.try_lock} function instead with {@link Semaphore.get_lockable} to ensure
     * the safety.
     *
     * @return Whether succeeded to acquire or not.
     */
    try_acquire(): Promise<boolean>;
    /**
     * Tries to acquire a section until timeout.
     *
     * Attempts to acquire a section from the semaphore until timeout. If succeeded to acquire a
     * section until the timeout, it returns `true`. Otherwise failed to acquiring a section in
     * given the time, the function gives up the trial and returns `false`.
     *
     * Failed to acquiring a section in the given time (returns `false`), it means that there're
     * someone who have already {@link acquire acquired} sections and do not return them over the
     * time expiration.
     *
     * Note that, if you succeeded to acquire a section from the semaphore (returns `true) but do
     * not call the {@link release} function after your business, the others who want to
     * {@link acquire} a section from the semaphore would be fall into the forever sleep.
     * Therefore, never forget to calling the {@link release} function or utilize the
     * {@link UniqueLock.try_acquire_for} function instead with {@link Semaphore.get_lockable} to
     * ensure the safety.
     *
     * @param ms The maximum miliseconds for waiting.
     * @return Whether succeded to acquire or not.
     */
    try_acquire_for(ms: number): Promise<boolean>;
    /**
     * Tries to acquire a section until timeout.
     *
     * Attempts to acquire a section from the semaphore until time expiration. If succeeded to
     * acquire a section until the time expiration, it returns `true`. Otherwise failed to
     * acquiring a section in the given time, the function gives up the trial and returns `false`.
     *
     * Failed to acquiring a section in the given time (returns `false`), it means that there're
     * someone who have already {@link acquire acquired} sections and do not return them over the
     * time expiration.
     *
     * Note that, if you succeeded to acquire a section from the semaphore (returns `true) but do
     * not call the {@link release} function after your business, the others who want to
     * {@link acquire} a section from the semaphore would be fall into the forever sleep.
     * Therefore, never forget to calling the {@link release} function or utilize the
     * {@link UniqueLock.try_acquire_until} function instead with {@link Semaphore.get_lockable}
     * to ensure the safety.
     *
     * @param at The maximum time point to wait.
     * @return Whether succeded to acquire or not.
     */
    try_acquire_until(at: Date): Promise<boolean>;
    /**
     * Release sections.
     *
     * When you call this {@link release} method and there're someone who are currently blocked
     * by attemping to {@link acquire} a section from this semaphore, *n* of them
     * (FIFO; first-in-first-out) would {@link acquire} those {@link release released} sections
     * and continue their executions.
     *
     * Otherwise, there's not anyone who is {@link acquire acquiring} the section or number of
     * the blocked are less than *n*, the {@link OutOfRange} error would be thrown.
     *
     * > As you know, when you succeeded to {@link acquire} a section, you don't have to forget
     * > to calling this {@link release} method after your business. If you forget it, it would
     * > be a terrible situation for the others who're attempting to {@link acquire} a section
     * > from this semaphore.
     * >
     * > However, if you utilize the {@link UniqueLock} with {@link Semaphore.get_lockable}, you
     * > don't need to consider about this {@link release} method. Just define your business into
     * > a callback function as a parameter of methods of the {@link UniqueLock}, then this
     * > {@link release} method would be automatically called by the {@link UniqueLock} after the
     * > business.
     *
     * @param n Number of sections to be released. Default is 1.
     * @throw {@link OutOfRange} when *n* is greater than currently {@link acquire acquired} sections.
     */
    release(n?: number): Promise<void>;
    private _Cancel;
}
/**
 *
 */
export declare namespace Semaphore {
    /**
     * Capsules a {@link Semaphore} to be suitable for the {@link UniqueLock}.
     *
     * @param semaphore Target semaphore to capsule.
     * @return Lockable instance suitable for the {@link UniqueLock}
     */
    function get_lockable<SemaphoreT extends Pick<Semaphore, "acquire" | "try_acquire" | "try_acquire_for" | "try_acquire_until" | "release">>(semaphore: SemaphoreT): ITimedLockable;
}
//# sourceMappingURL=Semaphore.d.ts.map