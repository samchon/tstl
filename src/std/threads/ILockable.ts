namespace std
{
	/**
	 * A lockable type.
	 * 
	 * @reference http://www.cplusplus.com/reference/concept/Lockable/
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export interface ILockable
	{
		/**
		 * Lock.
		 * 
		 * Bock until the {@link unlock} is called.2
		 */
		lock(): Promise<void>;

		/**
		 * Try lock.
		 * 
		 * Attempts to lock without blocking:
		 * - If the {@link ILockable} isn't currently locked, then {@link lock locks} it and returns true.
		 * - If {@link ILockable} is currently locked, then do not wait and just returns false.
		 * 
		 * @return true if succeeded to lock, false othersie.
		 */
		try_lock(): boolean;

		/**
		 * Unlock.
		 */
		unlock(): void;
	}
}