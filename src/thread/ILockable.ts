//================================================================ 
/**
 * @packageDocumentation
 * @module std  
 */
//================================================================
/**
 * Lockable object.
 * 
 * @author Jeongho Nam - https://github.com/samchon
 */
export interface ILockable
{
    /**
     * Lock until be unlocked.
     */
    lock(): Promise<void>;

    /**
     * Try {@link lock}.
     * 
     * @return Whether succeeded to lock or not.
     */
    try_lock(): Promise<boolean>;

    /**
     * Unlock.
     */
    unlock(): Promise<void>;
}