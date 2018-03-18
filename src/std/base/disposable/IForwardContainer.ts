namespace std.base
{
	export interface IForwardContainer<T, Iterator extends IForwardIterator<T, Iterator>>
	{
		begin(): Iterator;
		end(): Iterator;
	}
}
