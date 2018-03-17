namespace std.base
{
	export interface _IHashContainer<Key>
	{
		/* ---------------------------------------------------------
			PREDICATORS
		--------------------------------------------------------- */
		/**
		 * Get hash function.
		 * 
		 * @return The hash function.
		 */
		hash_function(): (key: Key) => number;

		/**
		 * Get key equality predicator.
		 * 
		 * @return The key equality predicator.
		 */
		key_eq(): (x: Key, y: Key) => boolean;

		/* ---------------------------------------------------------
			GETTERS
		--------------------------------------------------------- */
		/**
		 * Compute bucket index for the *key*.
		 * 
		 * @param key Target key.
		 * @return Index number.
		 */
		bucket(key: Key): number;

		/**
		 * Get number of buckets.
		 */
		bucket_count(): number;

		/**
		 * Get size of a specific bucket.
		 * 
		 * @param index Specific position.
		 * @return Size of the specific bucket.
		 */
		bucket_size(index: number): number;

		/**
		 * Compute load factor.
		 * 
		 * @return `this.size() / this.bucket_count()`
		 */
		load_factor(): number;

		/**
		 * Get maximum load factor that allowable.
		 * 
		 * @return The maximum load factor.
		 */
		max_load_factor(): number;

		/* ---------------------------------------------------------
			SETTERS
		--------------------------------------------------------- */
		/**
		 * Set maximum load factor.
		 * 
		 * @param z The new value to change.
		 */
		max_load_factor(z: number): void;

		/**
		 * Reserve buckets enable to store *n* elements.
		 * 
		 * @param n The capacity to reserve.
		 */
		reserve(n: number): void;
		
		/**
		 * Change of bucktes.
		 * 
		 * @param n The number to change.
		 */
		rehash(n: number): void;
	}
}