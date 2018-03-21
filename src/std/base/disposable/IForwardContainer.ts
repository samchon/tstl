namespace std.base
{
	/**
	 * @hidden
	 */
	export interface IForwardContainer<T, Iterator extends IForwardIterator<T, Iterator>>
	{
		begin(): Iterator;
		end(): Iterator;
	}
}
