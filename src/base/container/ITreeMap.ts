//================================================================ 
/** @module std.base */
//================================================================
import { MapContainer } from "./MapContainer";
import { _ITreeContainer } from "./_ITreeContainer";

import { MapIterator, MapReverseIterator } from "../iterator/MapIterator";
import { IPair } from "../../utility/IPair";
import { Entry } from "../../utility";

/**
 * @hidden
 */
export interface ITreeMap<Key, T, Unique extends boolean, Source extends ITreeMap<Key, T, Unique, Source>>
	extends MapContainer<Key, T, Unique, Source>, 
		_ITreeContainer<Key, Entry<Key, T>, 
			Source,
			MapIterator<Key, T, Unique, Source>,
			MapReverseIterator<Key, T, Unique, Source>,
			IPair<Key, T>>
{
}