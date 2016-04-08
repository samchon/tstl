namespace std.base.container
{
	/**
	 * <p> Random-access iterator. </p>
	 *
	 * <p> {@link IArrayIterator Random-access iterators} are iterators that can be used to access elements at an 
	 * arbitrary offset position relative to the element they point to, offering the same functionality as pointers.
	 * </p>
	 *
	 * <p> {@link IArrayIterator Random-access iterators} are the most complete iterators in terms of functionality. 
	 * All pointer types are also valid {@link IArrayIterator random-access iterators}. </p>
	 *
	 * <p> There is not a single type of {@link IArrayIterator random-access iterator}: Each container may define its 
	 * own specific iterator type able to iterate through it and access its elements. </p>
	 *
	 * <ul>
	 *	<li> Reference: http://www.cplusplus.com/reference/iterator/RandomAccessIterator/ </li>
	 * </ul>
	 *
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export interface IArrayIterator<T>
		extends Iterator<T>
	{
		index: number;

		prev(): IArrayIterator<T>;
		next(): IArrayIterator<T>;
	}
}