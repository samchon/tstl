import { MapContainer } from "../containers/MapContainer";
import { MapIterator } from "../iterators/MapIterator";

import { IPair } from "../../utilities/IPair";
import { Pair } from "../../utilities/Pair";

/** 
 * @hidden
 */
export interface ITreeMap<Key, T, Source extends MapContainer<Key, T, Source>>
	extends MapContainer<Key, T, Source>
{
	key_comp(): (x: Key, y: Key) => boolean;
	value_comp(): (x: IPair<Key, T>, y: IPair<Key, T>) => boolean;

	lower_bound(key: Key): MapIterator<Key, T, Source>;
	upper_bound(key: Key): MapIterator<Key, T, Source>;
	equal_range(key: Key): Pair<MapIterator<Key, T, Source>, MapIterator<Key, T, Source>>;
}