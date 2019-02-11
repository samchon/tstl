//================================================================ 
/** @module std.base */
//================================================================
import { SetContainer } from "./SetContainer";
import { _IHashContainer } from "./_IHashContainer";

import { SetIterator, SetReverseIterator } from "../iterator/SetIterator";

/**
 * Common interface for Hash Sets.
 * 
 * @author Jeongho Nam <http://samchon.org>
 */
export interface IHashSet<Key, Unique extends boolean, Source extends IHashSet<Key, Unique, Source>>
	extends SetContainer<Key, Unique, Source>, 
		_IHashContainer<Key, Key, Source, 
			SetIterator<Key, Unique, Source>, 
			SetReverseIterator<Key, Unique, Source>,
			Key>
{
	/* ---------------------------------------------------------
		ITERATORS
	--------------------------------------------------------- */
	/**
	 * @inheritDoc
	 */
	begin(): SetIterator<Key, Unique, Source>;

	/**
	 * Iterator to the first element in a specific bucket.
	 * 
	 * @param index Index number of the specific bucket.
	 * @return Iterator from the specific bucket.
	 */
	begin(index: number): SetIterator<Key, Unique, Source>;

	/**
	 * @inheritDoc
	 */
	end(): SetIterator<Key, Unique, Source>;

	/**
	 * Iterator to the end in a specific bucket.
	 * 
	 * @param index Index number of the specific bucket.
	 * @return Iterator from the specific bucket.
	 */
	end(index: number): SetIterator<Key, Unique, Source>;
}