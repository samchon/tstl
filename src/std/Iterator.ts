/// <reference path="API.ts" />

// Iterator definitions.
//
// @reference http://www.cplusplus.com/reference/iterator
// @author Jeongho Nam <http://samchon.org>

namespace std
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

namespace std
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

	/* =========================================================
		GLOBAL FUNCTIONS
			- ACCESSORS
			- MOVERS
			- FACTORY
	============================================================
		ACCESSORS
	--------------------------------------------------------- */
	/**
	 * Return the number of elements in the {@link Container}.
	 *
	 * @param container A container with a size method.
	 * @return The number of elements in the container.
	 */
	export function size<T>(container: base.Container<T>): number
	{
		return container.size();
	}

	/**
	 * Test whether the container is empty.
	 *
	 * Returns whether the {@link Container} is empty (i.e. whether its {@link size} is 0).
	 * 
	 * @param container A container with a empty method.
	 * @return <code>true</code> if the container size is 0, <code>false</code> otherwise.
	 */
	export function empty<T>(container: base.Container<T>): boolean
	{
		return container.empty();
	}

	/**
	 * Return distance between {@link Iterator iterators}.
	 * 
	 * Calculates the number of elements between <i>first</i> and <i>last</i>.
	 * 
	 * If it is a {@link IArrayIterator random-access iterator}, the function uses operator- to calculate this. 
	 * Otherwise, the function uses the increase operator {@link Iterator.next next()} repeatedly.
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
			return _Distance_via_index(<any>first, <any>last);

		let length: number = 0;
		for (; !first.equals(last); first = first.next() as InputIterator)
			length++;

		return length;
	}

	/**
	 * @hidden
	 */
	function _Distance_via_index<T>(first: base.IArrayIterator<T>, last: base.IArrayIterator<T>): number
	{
		return Math.abs(last.index() - first.index());
	}

	/* ---------------------------------------------------------
		ACCESSORS
	--------------------------------------------------------- */
	/**
	 * Advance iterator.
	 * 
	 * Advances the iterator <i>it</i> by <i>n</i> elements positions.
	 * 
	 * @param it Iterator to be advanced.
	 * @param n Number of element positions to advance.
	 * 
	 * @return An iterator to the element <i>n</i> positions before <i>it</i>.
	 */
	export function advance<T, InputIterator extends Iterator<T>>
		(it: InputIterator, n: number): InputIterator
	{
		return it.advance(n) as InputIterator;
	}
	
	/**
	 * Get iterator to previous element.
	 * 
	 * Returns an iterator pointing to the element that <i>it</i> would be pointing to if advanced <i>-n</i> positions.
	 * 
	 * @param it Iterator to base position.
	 * @param n Number of element positions offset (1 by default).
	 * 
	 * @return An iterator to the element <i>n</i> positions before <i>it</i>.
	 */
	export function prev<T, BidirectionalIterator extends Iterator<T>>
		(it: BidirectionalIterator, n: number = 1): BidirectionalIterator
	{
		return it.advance(n) as BidirectionalIterator;
	}
	
	/**
	 * Get iterator to next element.
	 * 
	 * Returns an iterator pointing to the element that <i>it</i> would be pointing to if advanced <i>n</i> positions.
	 * 
	 * @param it Iterator to base position.
	 * @param n Number of element positions offset (1 by default).
	 * 
	 * @return An iterator to the element <i>n</i> positions away from <i>it</i>.
	 */
	export function next<T, ForwardIterator extends Iterator<T>>
		(it: ForwardIterator, n: number = 1): ForwardIterator
	{	
		return it.advance(n) as ForwardIterator;
	}

	/* ---------------------------------------------------------
		FACTORY
	--------------------------------------------------------- */
	/**
	 * Iterator to beginning.
	 * 
	 * Returns an iterator pointing to the first element in the sequence.
	 * 
	 * If the sequence is {@link empty}, the returned value shall not be dereferenced.
	 * 
	 * @param container A container object of a class type for which member {@link begin} is defined.
	 * @return The same as returned by {@link begin begin()}.
	 */
	export function begin<T>(container: base.Container<T>): Iterator<T>;
	export function begin<T>(container: Vector<T>): VectorIterator<T>;
	export function begin<T>(container: List<T>): ListIterator<T>;
	export function begin<T>(container: Deque<T>): DequeIterator<T>;
	export function begin<T>(container: base.SetContainer<T>): SetIterator<T>;
	export function begin<Key, T>(container: base.MapContainer<Key, T>): MapIterator<Key, T>;

	// typedef is not specified in TypeScript yet.
	// Instead, I listed all the containers and its iterators as overloaded functions
	export function begin<T>(container: base.Container<T>): Iterator<T>
	{
		return container.begin();
	}

	/**
	 * Iterator to reverse-beginning.
	 * 
	 * Returns a reverse iterator pointing to the last element in the sequence.
	 * 
	 * If the sequence is {@link empty}, the returned value shall not be dereferenced.
	 * 
	 * @param container A container object of a class type for which member {@link rbegin} is defined.
	 * @return The same as returned by {@link rbegin()}.
	 */
	export function rbegin<T>(container: base.Container<T>): base.IReverseIterator<T>;
	export function rbegin<T>(container: Vector<T>): VectorReverseIterator<T>;
	export function rbegin<T>(container: List<T>): ListReverseIterator<T>;
	export function rbegin<T>(container: Deque<T>): DequeReverseIterator<T>;
	export function rbegin<T>(container: base.SetContainer<T>): SetReverseIterator<T>;
	export function rbegin<Key, T>(container: base.MapContainer<Key, T>): MapReverseIterator<Key, T>;

	export function rbegin<T>(container: base.Container<T>): base.IReverseIterator<T>
	{
		return container.rbegin();
	}
	
	/**
	 * Iterator to end.
	 * 
	 * Returns an iterator pointing to the <i>past-the-end</i> element in the sequence.
	 * 
	 * If the sequence is {@link empty}, the returned value compares equal to the one returned by {@link begin} with the same argument.
	 * 
	 * @param container A container of a class type for which member {@link end} is defined.
	 * @return The same as returned by {@link end end()}.
	 */
	export function end<T>(container: base.Container<T>): Iterator<T>;
	export function end<T>(container: Vector<T>): VectorIterator<T>;
	export function end<T>(container: List<T>): ListIterator<T>;
	export function end<T>(container: Deque<T>): DequeIterator<T>;
	export function end<T>(container: base.SetContainer<T>): SetIterator<T>;
	export function end<Key, T>(container: base.MapContainer<Key, T>): MapIterator<Key, T>;

	export function end<T>(container: base.Container<T>): Iterator<T>
	{
		return container.end();
	}

	/**
	 * Iterator to end.
	 * 
	 * Returns an iterator pointing to the <i>past-the-end</i> element in the sequence.
	 * 
	 * If the sequence is {@link empty}, the returned value compares equal to the one returned by {@link begin} with the same argument.
	 * 
	 * @param container A container of a class type for which member {@link end} is defined.
	 * @return The same as returned by {@link end end()}.
	 */
	export function rend<T>(container: base.Container<T>): base.IReverseIterator<T>;
	export function rend<T>(container: Vector<T>): VectorReverseIterator<T>;
	export function rend<T>(container: List<T>): ListReverseIterator<T>;
	export function rend<T>(container: Deque<T>): DequeReverseIterator<T>;
	export function rend<T>(container: base.SetContainer<T>): SetReverseIterator<T>;
	export function rend<Key, T>(container: base.MapContainer<Key, T>): MapReverseIterator<Key, T>;

	export function rend<T>(container: base.Container<T>): base.IReverseIterator<T>
	{
		return container.rend();
	}

	/**
	 * Make reverse iterator.
	 * 
	 * @param it A reference of the base iterator, which iterates in the opposite direction.
	 * @return A {@link ReverseIterator reverse iterator} based on *it*.
	 */
	export function make_reverse_iterator<T>(it: VectorIterator<T>): VectorReverseIterator<T>;
	export function make_reverse_iterator<T>(it: DequeIterator<T>): DequeReverseIterator<T>;
	export function make_reverse_iterator<T>(it: ListIterator<T>): ListReverseIterator<T>;
	export function make_reverse_iterator<T>(it: SetIterator<T>): SetReverseIterator<T>;
	export function make_reverse_iterator<Key, T>(it: MapIterator<Key, T>): MapReverseIterator<Key, T>;

	export function make_reverse_iterator<T>(it: Iterator<T>): base.IReverseIterator<T> | MapReverseIterator<any, any>
	{
		if (it instanceof VectorIterator)
			return new VectorReverseIterator<T>(it);
		else if (it instanceof DequeIterator)
			return new DequeReverseIterator<T>(it);
		else if (it instanceof ListIterator)
			return new ListReverseIterator<T>(it);

		else if (it instanceof SetIterator)
			return new SetReverseIterator<T>(it);
		else if (it instanceof MapIterator)
			return new MapReverseIterator<any, any>(it);
	}
}