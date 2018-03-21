namespace std.base
{
	/**
	 * @hidden
	 */
    export interface ITreeMap<Key, T, Source extends MapContainer<Key, T, Source>>
		extends MapContainer<Key, T, Source>, 
			_ITreeContainer<Key, MapIterator<Key, T, Source>>
	{
		/**
		 * Get value comparison function.
		 * 
		 * @return The value comparison function.
		 */
		value_comp(): (x: IPair<Key, T>, y: IPair<Key, T>) => boolean;
	}
}