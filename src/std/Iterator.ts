/// <reference path="API.ts" />

// base.Iterator definitions.
//
// @reference http://www.cplusplus.com/reference/iterator
// @author Jeongho Nam <http://samchon.org>

namespace std
{
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
	 * Return distance between {@link base.Iterator iterators}.
	 * 
	 * Calculates the number of elements between <i>first</i> and <i>last</i>.
	 * 
	 * If it is a {@link IArrayIterator random-access iterator}, the function uses operator- to calculate this. 
	 * Otherwise, the function uses the increase operator {@link base.Iterator.next next()} repeatedly.
	 * 
	 * @param first base.Iterator pointing to the initial element.
	 * @param last base.Iterator pointing to the final element. This must be reachable from first.
	 *
	 * @return The number of elements between first and last.
	 */
	export function distance<T, InputIterator extends base.Iterator<T>>
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
	 * @param it base.Iterator to be advanced.
	 * @param n Number of element positions to advance.
	 * 
	 * @return An iterator to the element <i>n</i> positions before <i>it</i>.
	 */
	export function advance<T, InputIterator extends base.Iterator<T>>
		(it: InputIterator, n: number): InputIterator
	{
		return it.advance(n) as InputIterator;
	}
	
	/**
	 * Get iterator to previous element.
	 * 
	 * Returns an iterator pointing to the element that <i>it</i> would be pointing to if advanced <i>-n</i> positions.
	 * 
	 * @param it base.Iterator to base position.
	 * @param n Number of element positions offset (1 by default).
	 * 
	 * @return An iterator to the element <i>n</i> positions before <i>it</i>.
	 */
	export function prev<T, BidirectionalIterator extends base.Iterator<T>>
		(it: BidirectionalIterator, n: number = 1): BidirectionalIterator
	{
		return it.advance(-n) as BidirectionalIterator;
	}
	
	/**
	 * Get iterator to next element.
	 * 
	 * Returns an iterator pointing to the element that <i>it</i> would be pointing to if advanced <i>n</i> positions.
	 * 
	 * @param it base.Iterator to base position.
	 * @param n Number of element positions offset (1 by default).
	 * 
	 * @return An iterator to the element <i>n</i> positions away from <i>it</i>.
	 */
	export function next<T, ForwardIterator extends base.Iterator<T>>
		(it: ForwardIterator, n: number = 1): ForwardIterator
	{	
		return it.advance(n) as ForwardIterator;
	}

	/* ---------------------------------------------------------
		FACTORY
	--------------------------------------------------------- */
	/**
	 * base.Iterator to beginning.
	 * 
	 * Returns an iterator pointing to the first element in the sequence.
	 * 
	 * If the sequence is {@link empty}, the returned value shall not be dereferenced.
	 * 
	 * @param container A container object of a class type for which member {@link begin} is defined.
	 * @return The same as returned by {@link begin begin()}.
	 */
	export function begin<T>(container: base.Container<T>): base.Iterator<T>;
	export function begin<T>(container: Vector<T>): VectorIterator<T>;
	export function begin<T>(container: List<T>): ListIterator<T>;
	export function begin<T>(container: Deque<T>): DequeIterator<T>;
	export function begin<T>(container: base.SetContainer<T>): SetIterator<T>;
	export function begin<Key, T>(container: base.MapContainer<Key, T>): MapIterator<Key, T>;

	// typedef is not specified in TypeScript yet.
	// Instead, I listed all the containers and its iterators as overloaded functions
	export function begin<T>(container: base.Container<T>): base.Iterator<T>
	{
		return container.begin();
	}

	/**
	 * base.Iterator to reverse-beginning.
	 * 
	 * Returns a reverse iterator pointing to the last element in the sequence.
	 * 
	 * If the sequence is {@link empty}, the returned value shall not be dereferenced.
	 * 
	 * @param container A container object of a class type for which member {@link rbegin} is defined.
	 * @return The same as returned by {@link rbegin()}.
	 */
	export function rbegin<T, Source extends base.IArrayContainer<T>>
		(container: base.ArrayContainer<T, Source>): base.ArrayReverseIterator<T, Source>;
	export function rbegin<T>(container: List<T>): ListReverseIterator<T>;
	export function rbegin<T>(container: base.SetContainer<T>): SetReverseIterator<T>;
	export function rbegin<Key, T>(container: base.MapContainer<Key, T>): MapReverseIterator<Key, T>;

	export function rbegin<T>(container: base.Container<T>): base.IReverseIterator<T>
	{
		return container.rbegin();
	}
	
	/**
	 * base.Iterator to end.
	 * 
	 * Returns an iterator pointing to the <i>past-the-end</i> element in the sequence.
	 * 
	 * If the sequence is {@link empty}, the returned value compares equal to the one returned by {@link begin} with the same argument.
	 * 
	 * @param container A container of a class type for which member {@link end} is defined.
	 * @return The same as returned by {@link end end()}.
	 */
	export function end<T>(container: base.Container<T>): base.Iterator<T>;
	export function end<T>(container: Vector<T>): VectorIterator<T>;
	export function end<T>(container: List<T>): ListIterator<T>;
	export function end<T>(container: Deque<T>): DequeIterator<T>;
	export function end<T>(container: base.SetContainer<T>): SetIterator<T>;
	export function end<Key, T>(container: base.MapContainer<Key, T>): MapIterator<Key, T>;

	export function end<T>(container: base.Container<T>): base.Iterator<T>
	{
		return container.end();
	}

	/**
	 * base.Iterator to end.
	 * 
	 * Returns an iterator pointing to the <i>past-the-end</i> element in the sequence.
	 * 
	 * If the sequence is {@link empty}, the returned value compares equal to the one returned by {@link begin} with the same argument.
	 * 
	 * @param container A container of a class type for which member {@link end} is defined.
	 * @return The same as returned by {@link end end()}.
	 */
	export function rend<T>(container: base.Container<T>): base.IReverseIterator<T>;
	export function rend<T, Source extends base.IArrayContainer<T>>
		(container: base.ArrayContainer<T, Source>): base.ArrayReverseIterator<T, Source>;
	export function rend<T>(container: List<T>): ListReverseIterator<T>;
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
	export function make_reverse_iterator<T, Source extends base.IArrayContainer<T>>
		(it: base.ArrayIterator<T, Source>): base.ArrayReverseIterator<T, Source>;
	export function make_reverse_iterator<T>(it: ListIterator<T>): ListReverseIterator<T>;
	export function make_reverse_iterator<T>(it: SetIterator<T>): SetReverseIterator<T>;
	export function make_reverse_iterator<Key, T>(it: MapIterator<Key, T>): MapReverseIterator<Key, T>;
	
	export function make_reverse_iterator(it: any): any
	{
		if (it instanceof base.ArrayIterator)
			return new base.ArrayReverseIterator<any, base.IArrayContainer<any>>(it);
		else if (it instanceof ListIterator)
			return new ListReverseIterator<any>(it);

		else if (it instanceof SetIterator)
			return new SetReverseIterator<any>(it);
		else if (it instanceof MapIterator)
			return new MapReverseIterator<any, any>(it);
	}
}