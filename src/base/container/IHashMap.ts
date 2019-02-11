//================================================================ 
/** @module std.base */
//================================================================
import { MapContainer } from "./MapContainer";
import { _IHashContainer } from "./_IHashContainer";

import { MapIterator, MapReverseIterator } from "../iterator/MapIterator";
import { Entry, IPair } from "../../utility";

/**
 * Common interface for Hash Maps.
 * 
 * @author Jeongho Nam <http://samchon.org>
 */
export interface IHashMap<Key, T, Unique extends boolean, Source extends IHashMap<Key, T, Unique, Source>>
	extends MapContainer<Key, T, Unique, Source>, 
		_IHashContainer<Key, Entry<Key, T>, Source, 
			MapIterator<Key, T, Unique, Source>, 
			MapReverseIterator<Key, T, Unique, Source>,
			IPair<Key, T>>
{
	/* ---------------------------------------------------------
		ITERATORS
	--------------------------------------------------------- */
	/**
	 * @inheritDoc
	 */
	begin(): MapIterator<Key, T, Unique, Source>;

	/**
	 * Iterator to the first element in a specific bucket.
	 * 
	 * @param index Index number of the specific bucket.
	 * @return Iterator from the specific bucket.
	 */
	begin(index: number): MapIterator<Key, T, Unique, Source>;

	/**
	 * @inheritDoc
	 */
	end(): MapIterator<Key, T, Unique, Source>;

	/**
	 * Iterator to the end in a specific bucket.
	 * 
	 * @param index Index number of the specific bucket.
	 * @return Iterator from the specific bucket.
	 */
	end(index: number): MapIterator<Key, T, Unique, Source>;
}