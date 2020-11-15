/**
 * @packageDocumentation
 * @module std.internal
 */
export declare namespace SafeLock {
    function lock(locker: () => Promise<void>, unlocker: () => Promise<void>, lambda: () => void | Promise<void>): Promise<void>;
    function try_lock(locker: () => Promise<boolean>, unlocker: () => Promise<void>, lambda: () => void | Promise<void>): Promise<boolean>;
}
//# sourceMappingURL=SafeLock.d.ts.map