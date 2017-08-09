/// <reference path="../../API.ts" />

namespace std.base
{
	/**
	 * Bi-directional iterator.
	 *
	 * {@link Iterator Bidirectional iterators} are iterators that can be used to access the sequence of elements 
	 * in a range in both directions (towards the end and towards the beginning).
	 *
	 * All {@link IArrayIterator random-access iterators} are also valid {@link Iterrator bidirectional iterators}. 
	 *
	 * There is not a single type of {@link Iterator bidirectional iterator}: {@link Container Each container} 
	 * may define its own specific iterator type able to iterate through it and access its elements.
	 *
	 * <a href="http://samchon.github.io/tstl/images/class_diagram/abstract_containers.png" target="_blank"> 
	 * <img src="http://samchon.github.io/tstl/images/class_diagram/abstract_containers.png" style="max-width: 100%" /></a>
	 *
	 * @reference http://www.cplusplus.com/reference/iterator/BidirectionalIterator
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export abstract class Iterator<T> 
		implements IBidirectionalIterator<T>, IComparable<Iterator<T>>
	{
		/* ---------------------------------------------------------
			MOVERS
		--------------------------------------------------------- */
		/**
		 * Get iterator to previous element.
		 * 
		 * If current iterator is the first item(equal with {@link Container.begin Container.begin()}), 
		 * returns {@link Container.end Container.end()}.
		 *
		 * @return An iterator of the previous item. 
		 */
		public abstract prev(): Iterator<T>;

		/**
		 * Get iterator to next element.
		 * 
		 * If current iterator is the last item, returns {@link Container.end Container.end()}.
		 *
		 * @return An iterator of the next item.
		 */
		public abstract next(): Iterator<T>;

		/**
		 * Advances the {@link Iterator} by <i>n</i> element positions.
		 *
		 * @param n Number of element positions to advance.
		 * @return An advanced iterator.
		 */
		public abstract advance(n: number): Iterator<T>;

		/* ---------------------------------------------------------
			ACCESSORS
		--------------------------------------------------------- */
		/**
		 * Get source container.
		 *
		 * Get source container of this iterator is directing for.
		 */
		public abstract source(): Container<T>;

		/**
		 * Whether an iterator is equal with the iterator.
		 * 
		 * Compare two iterators and returns whether they are equal or not.
		 *
		 * #### Note
		 * Iterator's {@link equals equals()} only compare souce container and index number.
		 * 
		 * Although elements in a pair, key and value are {@link equal_to equal_to}, if the source map or
		 * index number is different, then the {@link equals equals()} will return false. If you want to
		 * compare the elements of a pair, compare them directly by yourself.
		 *
		 * @param obj An iterator to compare
		 * @return Indicates whether equal or not.
		 */
		public abstract equals(obj: Iterator<T>): boolean;
		
		/**
		 * Get value of the iterator is pointing.
		 * 
		 * @return A value of the iterator.
		 */
		public abstract get value(): T; // TS2.0 New Feature

		public abstract swap(obj: Iterator<T>): void;
	}
}
