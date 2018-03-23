/**
 * @hidden
 */
export interface _IAssociativeContainer<Key, Iterator>
{
	/**
	 * Get iterator to element.
	 * 
	 * @param key Key to search for.
	 * @return An iterator to the element, if the specified key is found, otherwise `this.end()`.
	 */
	find(key: Key): Iterator;

	/**
	 * Test whether a key exists.
	 * 
	 * @param key Key to search for.
	 * @return Whether the specified key exists.
	 */
	has(key: Key): boolean;

	/**
	 * Count elements with a specified key.
	 * 
	 * @param key Key to search for.
	 * @return Number of elements with the specified key.
	 */
	count(key: Key): number;

	/**
	 * Erase elements with a specified key.
	 * 
	 * @param key Key to search for.
	 * @return Number of erased elements.
	 */
	erase(key: Key): number;
}