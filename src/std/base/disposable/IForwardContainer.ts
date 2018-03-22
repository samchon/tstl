namespace std.base
{
	/**
	 * @hidden
	 */
	export interface IForwardContainer<T, Iterator extends IForwardIterator<T, Iterator>>
	{
		/**
		 * Iterator to the first element.
		 * 
		 * @return Iterator to the first element.
		 */
		begin(): Iterator;

		/**
		 * Iterator to the end.
		 * 
		 * @return Iterator to the end.
		 */
		end(): Iterator;
	}
}
