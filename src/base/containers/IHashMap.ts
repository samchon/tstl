import { MapContainer } from "./MapContainer";
import { _IHashContainer } from "./_IHashContainer";

import { MapIterator } from "../iterators/MapIterator";

/**
 * @hidden
 */
export interface IHashMap<Key, T, Source extends MapContainer<Key, T, Source>>
	extends MapContainer<Key, T, Source>, _IHashContainer<Key>
{
	/* ---------------------------------------------------------
		ITERATORS
	--------------------------------------------------------- */
	/**
	 * @inheritDoc
	 */
	begin(): MapIterator<Key, T, Source>;

	/**
	 * Iterator to the first element in a specific bucket.
	 * 
	 * @param index Index number of the specific bucket.
	 * @return Iterator from the specific bucket.
	 */
	begin(index: number): MapIterator<Key, T, Source>;

	/**
	 * @inheritDoc
	 */
	end(): MapIterator<Key, T, Source>;

	/**
	 * Iterator to the end in a specific bucket.
	 * 
	 * @param index Index number of the specific bucket.
	 * @return Iterator from the specific bucket.
	 */
	end(index: number): MapIterator<Key, T, Source>;
}