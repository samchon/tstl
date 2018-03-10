import { IForwardIterator } from "../../iterators/IForwardIterator";
import { IReversableIterator, IReverseIterator } from "../../iterators/IReverseIterator";

export interface IForwardContainer<T, Iterator extends IForwardIterator<T, Iterator>>
{
	begin(): Iterator;
	end(): Iterator;
}

export interface IBidirectionalContainer<T, 
		IteratorT extends IReversableIterator<T, IteratorT, ReverseIteratorT>,
		ReverseIteratorT extends IReverseIterator<T, IteratorT, ReverseIteratorT>>
	extends IForwardContainer<T, IteratorT>
{
	rbegin(): ReverseIteratorT;
	rend(): ReverseIteratorT;
}