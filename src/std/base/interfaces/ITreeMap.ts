namespace std.base
{
    export interface ITreeMap<Key, T, Source extends IMapContainer<Key, T>>
        extends MapContainer<Key, T, Source>
	{
		key_comp(): (x: Key, y: Key) => boolean;

		value_comp(): (x: Pair<Key, T>, y: Pair<Key, T>) => boolean;

		lower_bound(key: Key): MapIterator<Key, T, Source>;

		upper_bound(key: Key): MapIterator<Key, T, Source>;

		equal_range(key: Key): Pair<MapIterator<Key, T, Source>, MapIterator<Key, T, Source>>;
	}
}