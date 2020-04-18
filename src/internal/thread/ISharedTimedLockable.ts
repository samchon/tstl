//================================================================ 
/**
 * @packageDocumentation
 * @module std.internal  
 */
//================================================================
import { ISharedLockable } from "./ISharedLockable";

export interface ISharedTimedLockable extends ISharedLockable
{
    /**
     * Try lock shared until timeout.
     * 
     * @param ms The maximum miliseconds for waiting.
     * @return Whether succeded to lock or not.
     */
    try_lock_shared_for(ms: number): Promise<boolean>;

    /**
     * Try lock shared until time expiration.
     * 
     * @param at The maximum time point to wait.
     * @return Whether succeded to lock or not.
     */
    try_lock_shared_until(at: Date): Promise<boolean>;
}