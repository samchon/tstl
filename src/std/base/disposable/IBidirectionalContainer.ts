namespace std.base
{
	/**
	 * @hidden
	 */
	export interface IBidirectionalContainer<T, 
			IteratorT extends IReversableIterator<T, IteratorT, ReverseIteratorT>,
			ReverseIteratorT extends IReverseIterator<T, IteratorT, ReverseIteratorT>>
		extends IForwardContainer<T, IteratorT>
	{
		rbegin(): ReverseIteratorT;
		rend(): ReverseIteratorT;
	}
}