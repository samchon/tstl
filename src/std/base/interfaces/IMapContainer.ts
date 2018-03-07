namespace std.base
{
	/** 
	 * @hidden
	 */
	export interface IMapContainer<Key, T> extends MapContainer<Key, T, IMapContainer<Key, T>> {}

	/** 
	 * @hidden
	 */
	export interface IUniqueMap<Key, T> extends UniqueMap<Key, T, IUniqueMap<Key, T>> {}

	/** 
	 * @hidden
	 */
	export interface IMultiMap<Key, T> extends MultiMap<Key, T, IMultiMap<Key, T>> {}
}