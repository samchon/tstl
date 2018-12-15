//================================================================ 
/** @module std.base */
//================================================================
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

/**
 * @hidden
 */
export function _Fetch_arguments(...args: any[])
{
	let ramda: ()=>void;
	let tail: any[];

	if (args.length >= 1 && args[0] instanceof Array)
	{
		// INITIALIZER LIST CONSTRUCTOR
		ramda = () =>
		{
			let items: Array<any> = args[0];
			this.push(...items);
		};
		tail = args.slice(1);
	}
	else if (args.length >= 2 && args[0].next instanceof Function && args[1].next instanceof Function)
	{
		// RANGE CONSTRUCTOR
		ramda = () =>
		{
			let first: any = args[0];
			let last: any = args[1];

			this.assign(first, last);
		};
		tail = args.slice(2);
	}
	else
	{
		// DEFAULT CONSTRUCTOR
		ramda = null;
		tail = args;
	}

	return {ramda: ramda, tail: tail};
}
