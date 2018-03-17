namespace std.base
{
	/**
	 * @hidden
	 */
	export interface _ISemaphore
	{
		/**
		 * Number of maximum sections lockable.
		 */
		size(): number;

		/**
		 * Lock sections until be unlocked.
		 * 
		 * @param count Count to lock. Default is `1`.
		 */
		lock(count?: number): Promise<void>;

		/**
		 * Try {@link lock} sections.
		 * 
		 * @param count Count to try lock. Default is `1`.
		 * @return Whether succeeded to lock or not.
		 */
		try_lock(count?: number): Promise<boolean>;

		/**
		 * Unlock sections.
		 * 
		 * @param count Count to unlock. Default is `1`.
		 */
		unlock(count?: number): Promise<void>;
	}
}