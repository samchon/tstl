//================================================================ 
/** @module std.base */
//================================================================
import { MapContainer } from "./MapContainer";
import { _ITreeContainer } from "./_ITreeContainer";

import { MapIterator } from "../iterator/MapIterator";
import { IPair } from "../../utility/IPair";

/**
 * @hidden
 */
export interface ITreeMap<Key, T, Unique extends boolean, Source extends MapContainer<Key, T, Unique, Source>>
	extends MapContainer<Key, T, Unique, Source>, 
		_ITreeContainer<Key, MapIterator<Key, T, Unique, Source>>
{
	/**
	 * Get value comparison function.
	 * 
	 * @return The value comparison function.
	 */
	value_comp(): (x: IPair<Key, T>, y: IPair<Key, T>) => boolean;
}