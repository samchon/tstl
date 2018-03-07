namespace std
{
	export interface IForwardIterator<T, Iterator extends IForwardIterator<T, Iterator> = IForwardIterator<T, any>>
	{
		value: T;

		next(): Iterator;
		equals(obj: Iterator): boolean;
	}
}
