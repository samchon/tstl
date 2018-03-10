import { IBidirectionalIterator } from "./IBidirectionalIterator";

export interface IRandomAccessIterator<T, Iterator extends IRandomAccessIterator<T, Iterator> = IRandomAccessIterator<T, any>>
	extends IBidirectionalIterator<T, Iterator>
{
	index(): number;
	advance(n: number): Iterator;
}