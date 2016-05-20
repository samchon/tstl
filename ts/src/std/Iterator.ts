/// <reference path="API.ts" />

namespace std
{
	/**
	 * <p> Bi-directional iterator. </p>
	 *
	 * <p> {@link Iterator Bidirectional iterators} are iterators that can be used to access the sequence of elements 
	 * in a range in both directions (towards the end and towards the beginning). </p>
	 *
	 * <p> All {@link IArrayIterator random-access iterators} are also valid {@link Iterrator bidirectional iterators}. 
	 * </p>
	 *
	 * <p> There is not a single type of {@link Iterator bidirectional iterator}: {@link IContainer Each container} 
	 * may define its own specific iterator type able to iterate through it and access its elements. </p>
	 *
	 * <ul>
	 *	<li> Reference: http://www.cplusplus.com/reference/iterator/BidirectionalIterator/ </li>
	 * </ul>
	 *
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export abstract class Iterator<T>
	{
		/**
		 * Source container of the iterator is directing for.
		 */
		protected source_: base.IContainer<T>;

		/* ---------------------------------------------------------
			CONSTRUCTORS
		--------------------------------------------------------- */
		/**
		 * Construct from the source {@link IContainer container}.
		 *
		 * @param source The source 
		 */
		public constructor(source: base.IContainer<T>)
		{
			this.source_ = source;
		}

		/* ---------------------------------------------------------
			MOVERS
		--------------------------------------------------------- */
		/**
		 * <p> Get iterator to previous element. </p>
		 * <p> If current iterator is the first item(equal with {@link IContainer.begin IContainer.begin()}), 
		 * returns {@link IContainer.end IContainer.end()}. </p>
		 *
		 * @return An iterator of the previous item. 
		 */
		public abstract prev(): Iterator<T>;

		/**
		 * <p> Get iterator to next element. </p>
		 * <p> If current iterator is the last item, returns {@link IContainer.end IContainer.end()}. </p>
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
		public advance(n: number): Iterator<T>
		{
			let it: Iterator<T> = this;
			let i: number;

			if (n >= 0 )
			{
				for (i = 0; i < n; i++)
					if (it.equal_to(this.source_.end()))
						return this.source_.end();
					else
						it = it.next();
			}
			else
			{
				n = n * -1;

				for (i = 0; i < n; i++)
					if (it.equal_to(this.source_.end()))
						return this.source_.end();
					else
						it = it.prev();
			}

			return it;
		}

		/* ---------------------------------------------------------
			ACCESSORS
		--------------------------------------------------------- */
		/**
		 * Get source 
		 */
		public get_source(): base.IContainer<T>
		{
			return this.source_;
		}

		/**
		 * <p> Whether an iterator is equal with the iterator. </p>
		 * 
		 * <p> Compare two iterators and returns whether they are equal or not. </p>
		 * 
		 * <h4> Note </h4> 
		 * <p> Iterator's equal_to() only compare souce container and index number. </p>
		 *
		 * <p> Although elements in a pair, key and value are equal_to, if the source map or
		 * index number is different, then the {@link equal_to equal_to()} will return false. If you want to
		 * compare the elements of a pair, compare them directly by yourself. </p>
		 *
		 * @param obj An iterator to compare
		 * @return Indicates whether equal or not.
		 */
		public equal_to<U extends T>(obj: Iterator<U>): boolean
		{
			return this.source_ == obj.source_;
		}
		
		/**
		 * <p> Get value of the iterator is pointing. </p>
		 * 
		 * @return A value of the iterator.
		 */
		public get value(): T
		{
			throw new LogicError("Have to be overriden.");
		}

		public abstract swap(obj: Iterator<T>): void;
	}

	/**
	 * <p> This class reverses the direction in which a bidirectional or random-access iterator iterates through a range.
	 * </p>
	 * 
	 * <p> A copy of the original iterator (the {@link Iterator base iterator}) is kept internally and used to reflect 
	 * the operations performed on the {@link ReverseIterator}: whenever the {@link ReverseIterator} is incremented, its 
	 * {@link Iterator base iterator} is decreased, and vice versa. A copy of the {@link Iterator base iterator} with the 
	 * current state can be obtained at any time by calling member {@link base}. </p>
	 * 
	 * <p> Notice however that when an iterator is reversed, the reversed version does not point to the same element in 
	 * the range, but to <b>the one preceding it</b>. This is so, in order to arrange for the past-the-end element of a 
	 * range: An iterator pointing to a past-the-end element in a range, when reversed, is pointing to the last element 
	 * (not past it) of the range (this would be the first element of the reversed range). And if an iterator to the 
	 * first element in a range is reversed, the reversed iterator points to the element before the first element (this 
	 * would be the past-the-end element of the reversed range). </p>
	 * 
	 * @reference http://www.cplusplus.com/reference/iterator/reverse_iterator/
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export abstract class ReverseIterator<T, Base extends Iterator<T>, This extends ReverseIterator<T, Base, This>>
		extends Iterator<T>
	{
		protected base_: Base;

		/* ---------------------------------------------------------
			CONSTRUCTORS
		--------------------------------------------------------- */
		public constructor(base: Base)
		{
			if (base == null)
				super(null);
			else
			{
				super(base.get_source());
				this.base_ = base.prev() as Base;
			}
		}

		public base(): Base
		{
			return this.base_.next() as Base;
		}

		protected abstract create_neighbor(): This;

		/* ---------------------------------------------------------
			ACCESSORS
		--------------------------------------------------------- */
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
			let ret = this.create_neighbor();
			ret.source_ = this.source_;
			ret.base_ = this.base_.next() as Base;

			return ret;
		}

		/**
		 * @inheritdoc
		 */
		public next(): This
		{
			let ret = this.create_neighbor();
			ret.source_ = this.source_;
			ret.base_ = this.base_.next() as Base;

			return ret;
		}

		/**
		 * @inheritdoc
		 */
		public advance(n: number): This
		{
			let ret = this.create_neighbor();
			ret.source_ = this.source_;
			ret.base_ = this.base_.advance(-n) as Base;

			return ret;
		}

		/* ---------------------------------------------------------
			COMPARES
		--------------------------------------------------------- */
		/**
		 * @inheritdoc
		 */
		public equal_to(obj: This): boolean
		{
			return this.base_.equal_to(obj.base_);
		}

		/**
		 * @inheritdoc
		 */
		public swap(obj: This): void
		{
			this.base_.swap(obj.base_);
		}
	}

	/* =========================================================
		GLOBAL FUNCTIONS
			- MOVERS
			- BEGIN
			- END
	============================================================
		MOVERS
	--------------------------------------------------------- */
	/**
	 * <p> Return distance between {@link Iterator iterators}. </p>
	 * 
	 * <p> Calculates the number of elements between <i>first</i> and <i>last</i>. </p>
	 * 
	 * <p> If it is a {@link IArrayIterator random-access iterator}, the function uses operator- to calculate this. 
	 * Otherwise, the function uses the increase operator {@link Iterator.next next()} repeatedly. </p>
	 * 
	 * @param first Iterator pointing to the initial element.
	 * @param last Iterator pointing to the final element. This must be reachable from first.
	 *
	 * @return The number of elements between first and last.
	 */
	export function distance<T, InputIterator extends Iterator<T>>
		(first: InputIterator, last: InputIterator): number
	{
		if ((<any>first).index != undefined)
		{
			// WHEN IARRAY_ITERATOR
			// ABS FOR REVERSE_ITERATOR
			return Math.abs((<any>last).index - (<any>first).index);
		}
		
		let length: number = 0;
		for (; !first.equal_to(last); first = first.next() as InputIterator)
			length++;

		return length;
	}

	export function advance<T, BidirectionalIterator extends Iterator<T>>
		(it: BidirectionalIterator, n: number): BidirectionalIterator
	{
		return it.advance(n) as BidirectionalIterator;
	}
	
	export function prev<T, BidirectionalIterator extends Iterator<T>>
		(it: BidirectionalIterator, n: number = 1): BidirectionalIterator
	{
		return it.advance(n) as BidirectionalIterator;
	}
	
	export function next<T, BidirectionalIterator extends Iterator<T>>
		(it: BidirectionalIterator, n: number = 1): BidirectionalIterator
	{
		return it.advance(n) as BidirectionalIterator;
	}

	/* ---------------------------------------------------------
		BEGIN
	--------------------------------------------------------- */
	export function begin<T>(container: Vector<T>): VectorIterator<T>;

	export function begin<T>(container: List<T>): ListIterator<T>;

	export function begin<T>(container: Deque<T>): DequeIterator<T>;

	export function begin<T>(container: base.SetContainer<T>): SetIterator<T>;

	export function begin<Key, T>(container: base.MapContainer<Key, T>): MapIterator<Key, T>;

	export function begin<T>(container: base.IContainer<T>): Iterator<T>
	{
		return container.begin();
	}


	/* ---------------------------------------------------------
		END
	--------------------------------------------------------- */
	export function end<T>(container: Vector<T>): VectorIterator<T>;

	export function end<T>(container: List<T>): ListIterator<T>;

	export function end<T>(container: Deque<T>): DequeIterator<T>;

	export function end<T>(container: base.SetContainer<T>): SetIterator<T>;

	export function end<Key, T>(container: base.MapContainer<Key, T>): MapIterator<Key, T>;

	export function end<T>(container: base.IContainer<T>): Iterator<T>
	{
		return container.end();
	}
}