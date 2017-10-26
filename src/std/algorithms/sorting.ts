/// <reference path="../API.ts" />

namespace std
{
	/* =========================================================
		SORTINGS
			- SORT
			- INSPECTOR
			- BACKGROUND
	============================================================
		SORT
	--------------------------------------------------------- */
	export function sort<T, RandomAccessIterator extends base.IArrayIterator<T>>
		(first: RandomAccessIterator, last: RandomAccessIterator): void;

	export function sort<T, RandomAccessIterator extends base.IArrayIterator<T>>
		(first: RandomAccessIterator, last: RandomAccessIterator, compare: (left: T, right: T) => boolean): void;

	export function sort<T, RandomAccessIterator extends base.IArrayIterator<T>>
		(first: RandomAccessIterator, last: RandomAccessIterator, compare: (left: T, right: T) => boolean = less): void
	{
		_Quick_sort(first.source() as base.IArrayContainer<T>, first.index(), last.index() - 1, compare);
	}

	export function stable_sort<T, RandomAccessIterator extends base.IArrayIterator<T>>
		(first: RandomAccessIterator, last: RandomAccessIterator): void;

	export function stable_sort<T, RandomAccessIterator extends base.IArrayIterator<T>>
		(first: RandomAccessIterator, last: RandomAccessIterator, compare: (left: T, right: T) => boolean): void;

	export function stable_sort<T, RandomAccessIterator extends base.IArrayIterator<T>>
		(first: RandomAccessIterator, last: RandomAccessIterator, compare: (left: T, right: T) => boolean = less): void
	{
		_Stable_quick_sort(first.source(), first.index(), last.index() - 1, compare);
	}

	export function partial_sort<T, RandomAccessIterator extends base.IArrayIterator<T>>
		(first: RandomAccessIterator, middle: RandomAccessIterator, last: RandomAccessIterator): void;

	export function partial_sort<T, RandomAccessIterator extends base.IArrayIterator<T>>
		(
			first: RandomAccessIterator, middle: RandomAccessIterator, last: RandomAccessIterator, 
			compare: (x: T, y: T) => boolean
		): void

	export function partial_sort<T, RandomAccessIterator extends base.IArrayIterator<T>>
		(
			first: RandomAccessIterator, middle: RandomAccessIterator, last: RandomAccessIterator, 
			compare: (x: T, y: T) => boolean = less
		): void
	{
		_Selection_sort(first.source() as base.IArrayContainer<T>, first.index(), middle.index(), last.index(), compare);
	}

	export function partial_sort_copy<T, InputIterator extends base.Iterator<T>, RandomAccessIterator extends base.Iterator<T>>
		(
			first: InputIterator, last: InputIterator, 
			result_first: RandomAccessIterator, result_last: RandomAccessIterator
		): RandomAccessIterator;

	export function partial_sort_copy
		<T, InputIterator extends base.Iterator<T>, RandomAccessIterator extends base.Iterator<T>>
		(
			first: InputIterator, last: InputIterator, 
			result_first: RandomAccessIterator, result_last: RandomAccessIterator, 
			compare: (x: T, y: T) => boolean
		): RandomAccessIterator;

	export function partial_sort_copy
		<T, InputIterator extends base.Iterator<T>, RandomAccessIterator extends base.IArrayIterator<T>>
		(
			first: InputIterator, last: InputIterator, 
			result_first: RandomAccessIterator, result_last: RandomAccessIterator, 
			compare: (x: T, y: T) => boolean = less
		): RandomAccessIterator
	{
		let input_size: number = distance(first, last);
		let result_size: number = distance(result_first, result_last);

		let vector: Vector<T> = new Vector<T>(first, last);
		sort(vector.begin(), vector.end());

		if (input_size > result_size)
			result_first = copy(vector.begin(), vector.begin().advance(result_size), result_first);
		else
			result_first = copy(vector.begin(), vector.end(), result_first);

		return result_first;
	}

	export function nth_element<T, RandomAccessIterator extends base.IArrayIterator<T>>
		(first: RandomAccessIterator, nth: RandomAccessIterator, last: RandomAccessIterator): void;

	export function nth_element<T, RandomAccessIterator extends base.IArrayIterator<T>>
		(first: RandomAccessIterator, nth: RandomAccessIterator, last: RandomAccessIterator, compare: (left: T, right: T) => boolean): void;

	export function nth_element<T, RandomAccessIterator extends base.IArrayIterator<T>>
		(first: RandomAccessIterator, nth: RandomAccessIterator, last: RandomAccessIterator, compare: (left: T, right: T) => boolean = less): void
	{
		sort(first, last, compare);
	}

	/* ---------------------------------------------------------
		INSPECTOR
	--------------------------------------------------------- */
	export function is_sorted<T, ForwardIterator extends base.Iterator<T>>
		(first: ForwardIterator, last: ForwardIterator): boolean;

	export function is_sorted<T, ForwardIterator extends base.Iterator<T>>
		(first: ForwardIterator, last: ForwardIterator, compare: (x: T, y: T) => boolean): boolean;

	export function is_sorted<T, ForwardIterator extends base.Iterator<T>>
		(first: ForwardIterator, last: ForwardIterator, compare: (x: T, y: T) => boolean = less): boolean
	{
		if (first.equals(last)) 
			return true;
		
		for (let next = first.next() as ForwardIterator; !next.equals(last); next = next.next() as ForwardIterator)
		{
			if (!(equal_to(next.value, first.value) || compare(first.value, next.value)))
				return false;
			
			first = first.next() as ForwardIterator;
		}
		return true;
	}

	export function is_sorted_until<T, ForwardIterator extends base.Iterator<T>>
		(first: ForwardIterator, last: ForwardIterator): ForwardIterator;

	export function is_sorted_until<T, ForwardIterator extends base.Iterator<T>>
		(first: ForwardIterator, last: ForwardIterator, compare: (x: T, y: T) => boolean): ForwardIterator;

	export function is_sorted_until<T, ForwardIterator extends base.Iterator<T>>
		(first: ForwardIterator, last: ForwardIterator, compare: (x: T, y: T) => boolean = less): ForwardIterator
	{
		if (first.equals(last))
			return first;
		
		for (let next = first.next() as ForwardIterator; !next.equals(last); next = next.next() as ForwardIterator)
		{
			if (!(equal_to(next.value, first.value) || compare(first.value, next.value)))
				return next;
			
			first = first.next() as ForwardIterator;
		}
		return last;
	}

	/* ---------------------------------------------------------
		BACKGROUND
	--------------------------------------------------------- */
	/**
	 * @hidden
	 */
	function _Quick_sort<T>
		(container: base.IArrayContainer<T>, first: number, last: number, compare: (left: T, right: T) => boolean): void
	{
		if (last == -2)
			last = container.size() - 1;
		if (first >= last)
			return;

		let index: number = _Quick_sort_partition(container, first, last, compare);
		_Quick_sort(container, first, index - 1, compare);
		_Quick_sort(container, index + 1, last, compare);
	}

	/**
	 * @hidden
	 */
	function _Quick_sort_partition<T>
		(
			container: base.IArrayContainer<T>, first: number, last: number, 
			compare: (left: T, right: T) => boolean
		): number
	{
		let standard: T = container.at(first);
		let i: number = first;
		let j: number = last + 1;

		while (true)
		{
			while (compare(container.at(++i), standard))
				if (i == last)
					break;
			while (compare(standard, container.at(--j)))
				if (j == first)
					break;

			if (i >= j)
				break;

			// SWAP; AT(I) WITH AT(J)
			_Swap_array_element(container, i, j);
		}

		// SWAP; AT(BEGIN) WITH AT(J)
		_Swap_array_element(container, first, j);

		return j;
	}

	/**
	 * @hidden
	 */
	function _Stable_quick_sort<T>
		(
			container: base.IArrayContainer<T>, first: number, last: number, 
			compare: (left: T, right: T) => boolean
		): void
	{
		if (last == -2)
			last = container.size() - 1;
		if (first >= last)
			return;

		let index: number = _Stable_quick_sort_partition(container, first, last, compare);
		_Stable_quick_sort(container, first, index - 1, compare);
		_Stable_quick_sort(container, index + 1, last, compare);
	}

	/**
	 * @hidden
	 */
	function _Stable_quick_sort_partition<T>
		(
			container: base.IArrayContainer<T>, first: number, last: number, 
			compare: (left: T, right: T) => boolean
		): number
	{
		let standard: T = container.at(first);
		let i: number = first;
		let j: number = last + 1;

		while (true)
		{
			while (compare(container.at(++i), standard))
				if (i == last)
					break;
			while (compare(standard, container.at(--j)))
				if (j == first)
					break;

			if (i >= j)
				break;

			// SWAP; AT(I) WITH AT(J)
			if (std.equal_to(container.at(i), container.at(j)) == false)
				_Swap_array_element(container, i, j);
		}

		// SWAP; AT(BEGIN) WITH AT(J)
		if (std.equal_to(container.at(first), container.at(j)) == false)
			_Swap_array_element(container, first, j);

		return j;
	}

	/**
	 * @hidden
	 */
	function _Swap_array_element<T>(container: base.IArrayContainer<T>, i: number, j: number): void
	{
		let supplement:T = container.at(i);
		container.set(i, container.at(j));
		container.set(j, supplement);
	}

	/**
	 * @hidden
	 */
	function _Selection_sort<T>
		(
			container: base.IArrayContainer<T>, first: number, middle: number, last: number,
			compare: (x: T, y: T) => boolean
		): void
	{
		if (last == -1)
			last = container.size();

		for (let i: number = first; i < middle; i++)
		{
			let min_index: number = i;

			for (let j: number = i + 1; j < last; j++)
				if (compare(container.at(j), container.at(min_index)))
					min_index = j;

			if (i != min_index)
				_Swap_array_element(container, i, min_index);
		}
	}
}