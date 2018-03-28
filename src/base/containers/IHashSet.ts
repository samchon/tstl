import { SetContainer } from "./SetContainer";
import { _IHashContainer } from "./_IHashContainer";

import { SetIterator } from "../iterators/SetIterator";

/**
 * @hidden
 */
export interface IHashSet<T, Unique extends boolean, Source extends SetContainer<T, Unique, Source>>
	extends SetContainer<T, Unique, Source>, _IHashContainer<T>
{
	/* ---------------------------------------------------------
		ITERATORS
	--------------------------------------------------------- */
	/**
	 * @inheritDoc
	 */
	begin(): SetIterator<T, Unique, Source>;

	/**
	 * Iterator to the first element in a specific bucket.
	 * 
	 * @param index Index number of the specific bucket.
	 * @return Iterator from the specific bucket.
	 */
	begin(index: number): SetIterator<T, Unique, Source>;

	/**
	 * @inheritDoc
	 */
	end(): SetIterator<T, Unique, Source>;

	/**
	 * Iterator to the end in a specific bucket.
	 * 
	 * @param index Index number of the specific bucket.
	 * @return Iterator from the specific bucket.
	 */
	end(index: number): SetIterator<T, Unique, Source>;
}