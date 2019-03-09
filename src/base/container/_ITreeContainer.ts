//================================================================ 
/** @module std.base */
//================================================================
import { _IAssociativeContainer, _Fetch_arguments } from "./_IAssociativeContainer";
import { Iterator } from "../iterator/Iterator";
import { IReverseIterator } from "../iterator/ReverseIterator";

import { Pair } from "../../utility/Pair";
import { less } from "../../functional/comparators";

/**
 * @hidden
 */
export interface _ITreeContainer<Key, T extends Elem, 
		SourceT extends _ITreeContainer<Key, T, SourceT, IteratorT, ReverseIteratorT, Elem>, 
		IteratorT extends Iterator<T, SourceT, IteratorT, ReverseIteratorT, Elem>,
		ReverseIteratorT extends IReverseIterator<T, SourceT, IteratorT, ReverseIteratorT, Elem>,
		Elem>
	extends _IAssociativeContainer<Key, T, SourceT, IteratorT, ReverseIteratorT, Elem>
{
	/**
	 * Get key comparison function.
	 * 
	 * @return The key comparison function.
	 */
	key_comp(): (x: Key, y: Key) => boolean;

	/**
	 * Get value comparison function.
	 * 
	 * @return The value comparison function.
	 */
	value_comp(): (x: Elem, y: Elem) => boolean;

	/**
	 * Get iterator to lower bound.
	 * 
	 * @param key Key to search for.
	 * @return Iterator to the first element equal or after to the key.
	 */
	lower_bound(key: Key): IteratorT;

	/**
	 * Get iterator to upper bound.
	 * 
	 * @param key Key to search for.
	 * @return Iterator to the first element after the key.
	 */
	upper_bound(key: Key): IteratorT;

	/**
	 * Get range of equal elements.
	 * 
	 * @param key Key to search for.
	 * @return Pair of {@link lower_bound} and {@link upper_bound}.
	 */
	equal_range(key: Key): Pair<IteratorT, IteratorT>;
}

/**
 * @hidden
 */
export function _Construct<Key, T extends Elem, 
		SourceT extends _ITreeContainer<Key, T, SourceT, IteratorT, ReverseIteratorT, Elem>, 
		IteratorT extends Iterator<T, SourceT, IteratorT, ReverseIteratorT, Elem>,
		ReverseIteratorT extends IReverseIterator<T, SourceT, IteratorT, ReverseIteratorT, Elem>,
		Elem>
	(
		source: SourceT, 
		Source: _Factory<SourceT>, 
		treeFactory: (comp: (x: Key, y: Key) => boolean) => void, 
		...args: any[]
	)
{
	// DECLARE MEMBERS
	let post_process: (() => void) | null = null;
	let comp: (x: Key, y: Key) => boolean = less;

	//----
	// INITIALIZE MEMBERS AND POST-PROCESS
	//----
	// BRANCH - METHOD OVERLOADINGS
	if (args.length === 1 && args[0] instanceof Source)
	{
		// PARAMETERS
		let container: SourceT = args[0];
		comp = container.key_comp();

		// COPY CONSTRUCTOR
		post_process = () =>
		{
			let first = container.begin();
			let last = container.end();

			source.assign(first, last);
		};
	}
	else
	{
		let tuple = _Fetch_arguments(source, ...args);

		post_process = tuple.ramda;
		if (tuple.tail.length >= 1) comp = tuple.tail[0];
	}

	//----
	// DO PROCESS
	//----
	// CONSTRUCT TREE
	treeFactory(comp);
	
	// ACT POST-PROCESS
	if (post_process !== null)
		post_process();
}

/**
 * @hidden
 */
export function _Emplacable<Key, T extends Elem, 
		SourceT extends _ITreeContainer<Key, T, SourceT, IteratorT, ReverseIteratorT, Elem>, 
		IteratorT extends Iterator<T, SourceT, IteratorT, ReverseIteratorT, Elem>,
		ReverseIteratorT extends IReverseIterator<T, SourceT, IteratorT, ReverseIteratorT, Elem>,
		Elem>
	(
		source: SourceT,
		hint: IteratorT, 
		elem: T
	): boolean
{
	let prev = hint.prev();
	let meet: boolean = prev.equals(source.end()) || source.value_comp()(prev.value, elem);
	meet = meet && (hint.equals(source.end()) || source.value_comp()(elem, hint.value));

	return meet;
}

/**
 * @hidden
 */
interface _Factory<T, Arguments extends any[] = any[]>
{
	new(...args: Arguments): T;
	prototype: T;
}