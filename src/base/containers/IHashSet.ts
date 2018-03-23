import { SetContainer } from "./SetContainer";
import { _IHashContainer } from "./_IHashContainer";

import { SetIterator } from "../iterators/SetIterator";

/**
 * @hidden
 */
export interface IHashSet<T, Source extends SetContainer<T, Source>>
	extends SetContainer<T, Source>, _IHashContainer<T>
{
	/* ---------------------------------------------------------
		ITERATORS
	--------------------------------------------------------- */
	/**
	 * @inheritDoc
	 */
	begin(): SetIterator<T, Source>;

	/**
	 * Iterator to the first element in a specific bucket.
	 * 
	 * @param index Index number of the specific bucket.
	 * @return Iterator from the specific bucket.
	 */
	begin(index: number): SetIterator<T, Source>;

	/**
	 * @inheritDoc
	 */
	end(): SetIterator<T, Source>;

	/**
	 * Iterator to the end in a specific bucket.
	 * 
	 * @param index Index number of the specific bucket.
	 * @return Iterator from the specific bucket.
	 */
	end(index: number): SetIterator<T, Source>;
}