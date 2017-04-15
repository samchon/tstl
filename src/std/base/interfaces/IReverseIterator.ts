namespace std.base
{
	/**
	 * @hidden
	 */
	export interface IReverseIterator<T>
		extends ReverseIterator<T, Container<T>, Iterator<T>, IReverseIterator<T>>
	{
	}
}