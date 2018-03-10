import { IBidirectionalIterator } from "./IBidirectionalIterator";

export interface IReversableIterator<T,
		IteratorT extends IReversableIterator<T, IteratorT, ReverseT>,
		ReverseT extends IReverseIterator<T, IteratorT, ReverseT>>
	extends IBidirectionalIterator<T, IteratorT>
{
	reverse(): ReverseT;
}

export interface IReverseIterator<T,
		Base extends IReversableIterator<T, Base, This>,
		This extends IReverseIterator<T, Base, This>>
	extends IBidirectionalIterator<T, This>
{
	base(): Base;
}