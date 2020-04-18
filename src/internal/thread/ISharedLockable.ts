//================================================================ 
/**
 * @packageDocumentation
 * @module std.internal  
 */
//================================================================
export interface ISharedLockable
{
    /**
     * Lock shared until be unlock shared.
     */
    lock_shared(): Promise<void>;

    /**
     * Try lock shared.
     */
    try_lock_shared(): Promise<boolean>;

    /**
     * Unlock shared.
     */
    unlock_shared(): Promise<void>;
}