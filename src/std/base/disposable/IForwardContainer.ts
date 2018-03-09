namespace std.base
{
	export interface IForwardContainer<T, Iterator extends IForwardIterator<T, Iterator>>
	{
		begin(): Iterator;
		end(): Iterator;
	}

	export interface IBidirectionalContainer<T, 
			IteratorT extends IBidirectionalIterator<T, IteratorT>,
			ReverseIteratorT extends IBidirectionalIterator<T, ReverseIteratorT>>
		extends IForwardContainer<T, IteratorT>
	{
		rbegin(): ReverseIteratorT;
		rend(): ReverseIteratorT;
	}
}
