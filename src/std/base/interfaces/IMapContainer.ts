namespace std.base
{
	export interface IMapContainer<Key, T> extends MapContainer<Key, T, IMapContainer<Key, T>> {}
	export interface IUniqueMap<Key, T> extends UniqueMap<Key, T, IUniqueMap<Key, T>> {}
	export interface IMultiMap<Key, T> extends MultiMap<Key, T, IMultiMap<Key, T>> {}
}