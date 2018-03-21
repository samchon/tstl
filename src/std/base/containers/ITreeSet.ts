namespace std.base
{
	/**
	 * @hidden
	 */
    export interface ITreeSet<T, Source extends SetContainer<T, Source>>
        extends SetContainer<T, Source>, _ITreeContainer<T, SetIterator<T, Source>>
	{
		/**
		 * Get value comparison function.
		 * 
		 * @return The value comparison function.
		 */
		value_comp(): (x: T, y: T) => boolean;
	}
}
