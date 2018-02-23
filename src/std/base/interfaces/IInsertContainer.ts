namespace std.base
{
	export interface IInsertContainer<T, Iterator extends Readonly<IForwardIterator<T>>>
	{
		insert(it: Iterator, value: T): Iterator;
	}
}