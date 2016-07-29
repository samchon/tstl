/// <reference path="../API.ts" />

namespace std.base
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
	 * <p> <a href="D:/Homepage/samchon.github.io/typescript-stl/images/class_diagram/linear_containers.png" target="_blank"> 
	 * <img src="D:/Homepage/samchon.github.io/typescript-stl/images/class_diagram/linear_containers.png" style="max-width: 100%" /> 
	 * </a> </p>
	 *
	 * @reference http://www.cplusplus.com/reference/iterator/RandomAccessIterator
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export interface IArrayIterator<T>
		extends Iterator<T>
	{
		/**
		 * Get index, sequence number of the iterator in the source {@link IArray array}.
		 *
		 * @return Sequence number of the iterator in the source {@link IArray array}.
		 */
		index: number;

		/**
		 * @inheritdoc
		 */
		prev(): IArrayIterator<T>;

		/**
		 * @inheritdoc
		 */
		next(): IArrayIterator<T>;
	}
}