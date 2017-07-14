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
		implements IComparable<Iterator<T>>
	{
		/**
		 * @hidden
		 */
		protected source_: base.Container<T>;

		/* ---------------------------------------------------------
			CONSTRUCTORS
		--------------------------------------------------------- */
		/**
		 * Construct from the source {@link Container container}.
		 *
		 * @param source The source container.
		 */
		protected constructor(source: base.Container<T>)
		{
			this.source_ = source;
		}

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
		public abstract source(): base.Container<T>;

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
		public equals(obj: Iterator<T>): boolean
		{
			return this.source_ == obj.source_;
		}
		
		/**
		 * Get value of the iterator is pointing.
		 * 
		 * @return A value of the iterator.
		 */
		public abstract get value(): T; // TS2.0 New Feature

		public abstract swap(obj: Iterator<T>): void;
	}
}

namespace std.base
{
	/**
	 * This class reverses the direction in which a bidirectional or random-access iterator iterates through a range.
	 * 
	 * A copy of the original iterator (the {@link Iterator base iterator}) is kept internally and used to reflect 
	 * the operations performed on the {@link ReverseIterator}: whenever the {@link ReverseIterator} is incremented, its 
	 * {@link Iterator base iterator} is decreased, and vice versa. A copy of the {@link Iterator base iterator} with the 
	 * current state can be obtained at any time by calling member {@link base}.
	 * 
	 * Notice however that when an iterator is reversed, the reversed version does not point to the same element in 
	 * the range, but to <b>the one preceding it</b>. This is so, in order to arrange for the past-the-end element of a 
	 * range: An iterator pointing to a past-the-end element in a range, when reversed, is pointing to the last element 
	 * (not past it) of the range (this would be the first element of the reversed range). And if an iterator to the 
	 * first element in a range is reversed, the reversed iterator points to the element before the first element (this 
	 * would be the past-the-end element of the reversed range).
	 * 
	 * <a href="http://samchon.github.io/tstl/images/class_diagram/abstract_containers.png" target="_blank"> 
	 * <img src="http://samchon.github.io/tstl/images/class_diagram/abstract_containers.png" style="max-width: 100%" /></a>
	 * 
	 * @reference http://www.cplusplus.com/reference/iterator/reverse_iterator
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export abstract class ReverseIterator<T, Source extends base.Container<T>, Base extends Iterator<T>, This extends ReverseIterator<T, Source, Base, This>>
		extends Iterator<T>
		implements IComparable<ReverseIterator<T, Source, Base, This>>
	{
		/**
		 * @hidden
		 */
		protected base_: Base;

		/* ---------------------------------------------------------
			CONSTRUCTORS
		--------------------------------------------------------- */
		/**
		 * Construct from base iterator.
		 * 
		 * @param base A reference of the base iterator, which iterates in the opposite direction.
		 */
		protected constructor(base: Base)
		{
			if (base == null)
				super(null);
			else
			{
				super(base.source());
				this.base_ = base.prev() as Base;
			}
		}

		// CREATE A NEW OBJECT WITH SAME (DERIVED) TYPE
		/**
		 * @hidden
		 */
		protected abstract _Create_neighbor(base: Base): This;

		/* ---------------------------------------------------------
			ACCESSORS
		--------------------------------------------------------- */
		public source(): Source
		{
			return this.source_ as Source;
		}

		/**
		 * Return base iterator.
		 * 
		 * Return a reference of the base iteraotr.
		 * 
		 * The base iterator is an iterator of the same type as the one used to construct the {@link ReverseIterator}, 
		 * but pointing to the element next to the one the {@link ReverseIterator} is currently pointing to 
		 * (a {@link ReverseIterator} has always an offset of -1 with respect to its base iterator).
		 * 
		 * @return A reference of the base iterator, which iterates in the opposite direction.
		 */
		public base(): Base
		{
			return this.base_.next() as Base;
		}
		
		/**
		 * Get value of the iterator is pointing.
		 * 
		 * @return A value of the reverse iterator.
		 */
		public get value(): T
		{
			return this.base_.value;
		}

		/* ---------------------------------------------------------
			MOVERS
		--------------------------------------------------------- */
		/**
		 * @inheritdoc
		 */
		public prev(): This
		{
			return this._Create_neighbor(this.base().next() as Base);
		}

		/**
		 * @inheritdoc
		 */
		public next(): This
		{
			return this._Create_neighbor(this.base().prev() as Base);
		}

		/**
		 * @inheritdoc
		 */
		public advance(n: number): This
		{
			return this._Create_neighbor(this.base().advance(-n) as Base);
		}

		/* ---------------------------------------------------------
			COMPARES
		--------------------------------------------------------- */
		/**
		 * @inheritdoc
		 */
		public equals(obj: This): boolean
		{
			return this.base_.equals(obj.base_);
		}

		/**
		 * @inheritdoc
		 */
		public swap(obj: This): void
		{
			this.base_.swap(obj.base_);
		}
	}
}