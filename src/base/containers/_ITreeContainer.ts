import { _Fetch_arguments } from "./_IAssociativeContainer";

import { Pair } from "../../utilities/Pair";
import { less } from "../../functional/comparators";

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

export function _Construct<Key>(Source: any, XTree: any, ...args: any[])
{
	// DECLARE MEMBERS
	let post_process: () => void = null;
	let comp: (x: Key, y: Key) => boolean = less;

	//----
	// INITIALIZE MEMBERS AND POST-PROCESS
	//----
	// BRANCH - METHOD OVERLOADINGS
	if (args.length === 1 && args[0] instanceof Source)
	{
		// PARAMETERS
		let container: _ITreeContainer<Key, any> = args[0];
		comp = container.key_comp();

		// COPY CONSTRUCTOR
		post_process = () =>
		{
			let first = (container as any).begin();
			let last = (container as any).end();

			this.assign(first, last);
		};
	}
	else
	{
		let tuple = _Fetch_arguments.bind(this)(...args);

		post_process = tuple.ramda;
		if (tuple.tail.length >= 1) comp = tuple.tail[0];
	}

	//----
	// DO PROCESS
	//----
	// CONSTRUCT TREE
	this.tree_ = new XTree(this, comp);
	
	// ACT POST-PROCESS
	if (post_process !== null)
		post_process();
}
