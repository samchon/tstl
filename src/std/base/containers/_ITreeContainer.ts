namespace std.base
{
	/**
	 * @hidden
	 */
	export interface _ITreeContainer<Key, Iterator>
	{
		/**
		 * Get key comparison function.
		 * 
		 * @return The key comparison function.
		 */
		key_comp(): (x: Key, y: Key) => boolean;

		/**
		 * Get iterator to lower bound.
		 * 
		 * @param key Key to search for.
		 * @return Iterator to the first element equal or after to the key.
		 */
		lower_bound(key: Key): Iterator;

		/**
		 * Get iterator to upper bound.
		 * 
		 * @param key Key to search for.
		 * @return Iterator to the first element after the key.
		 */
		upper_bound(key: Key): Iterator;

		/**
		 * Get range of equal elements.
		 * 
		 * @param key Key to search for.
		 * @return Pair of {@link lower_bound} and {@link upper_bound}.
		 */
		equal_range(key: Key): Pair<Iterator, Iterator>;
	}
}