namespace std.base
{
	export interface IInsertContainer<T, Iterator extends IForwardIterator<T>>
	{
		insert(it: Iterator, value: T): Iterator;
	}
}