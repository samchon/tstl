/// <reference path="../../API.ts" />

/// <reference path="Iterator.ts" />

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
	export abstract class ReverseIterator<T, Source extends Container<T>, Base extends Iterator<T>, This extends ReverseIterator<T, Source, Base, This>>
		extends Iterator<T>
		implements IForwardIterator<T>, IComparable<ReverseIterator<T, Source, Base, This>>
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
			super();
			
			this.base_ = base.prev() as Base;
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
			return this.base_.source() as Source;
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
			return this._Create_neighbor(this.base_);
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
