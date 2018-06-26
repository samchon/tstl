import { IForwardIterator } from "../iterators/IForwardIterator";
import { IRandomAccessIterator } from "../iterators/IRandomAccessIterator";

import { General } from "../iterators/IFake";
import { less, equal_to } from "../functional/comparators";
import { iter_swap, copy } from "./modifiers";
import { distance } from "../iterators/global";

import { Vector } from "../containers/Vector";

/* =========================================================
	SORTINGS
		- SORT
		- INSPECTOR
		- BACKGROUND
============================================================
	SORT
--------------------------------------------------------- */
/**
 * Sort elements in range.
 * 
 * @param first Random access iterator of the first position.
 * @param last Random access iterator of the last position.
 * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Default is {@link less}.
 */
export function sort<T, RandomAccessIterator extends General<IRandomAccessIterator<T, RandomAccessIterator>>>
	(first: RandomAccessIterator, last: RandomAccessIterator, comp: (x: T, y: T) => boolean = less): void
{
	let size: number = last.index() - first.index();
	if (size <= 0)
		return;

	let pivot_it: RandomAccessIterator = first.advance(Math.floor(size / 2));
	let pivot: T = pivot_it.value;

	if (pivot_it.index() !== first.index())
		iter_swap(first, pivot_it);
	
	let i: number = 1;
	for (let j: number = 1; j < size; ++j)
	{
		let j_it: RandomAccessIterator = first.advance(j);
		if (comp(j_it.value, pivot))
		{
			iter_swap(j_it, first.advance(i));
			++i;
		}
	}
	iter_swap(first, first.advance(i - 1));

	sort(first, first.advance(i-1), comp);
	sort(first.advance(i), last, comp);
}

/**
 * Sort elements in range stably.
 * 
 * @param first Random access iterator of the first position.
 * @param last Random access iterator of the last position.
 * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Default is {@link less}.
 */
export function stable_sort<T, RandomAccessIterator extends General<IRandomAccessIterator<T, RandomAccessIterator>>>
	(first: RandomAccessIterator, last: RandomAccessIterator, comp: (x: T, y: T) => boolean = less): void
{
	let ramda = function (x: T, y: T): boolean
	{
		return comp(x, y) && !comp(y, x);
	};
	sort(first, last, ramda);
}

/**
 * Sort elements in range partially.
 * 
 * @param first Random access iterator of the first position.
 * @param middle Random access iterator of the middle position between [first, last). Elements only in [first, middle) are fully sorted.
 * @param last Random access iterator of the last position.
 * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Default is {@link less}.
 */
export function partial_sort<T, RandomAccessIterator extends General<IRandomAccessIterator<T, RandomAccessIterator>>>
	(
		first: RandomAccessIterator, middle: RandomAccessIterator, last: RandomAccessIterator, 
		comp: (x: T, y: T) => boolean = less
	): void
{
	for (let i = first; !i.equals(middle); i = i.next())
	{
		let min: RandomAccessIterator = i;

		for (let j = i.next(); !j.equals(last); j = j.next())
			if (comp(j.value, min.value))
				min = j;
		
			if (!i.equals(min))
				iter_swap(i, min);
	}
}

/**
 * Copy elements in range with partial sort.
 * 
 * @param first Input iteartor of the first position.
 * @param last Input iterator of the last position.
 * @param output_first Output iterator of the first position.
 * @param output_last Output iterator of the last position.
 * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Default is {@link less}.
 * 
 * @return Output Iterator of the last position by advancing.
 */
export function partial_sort_copy<T, 
		InputIterator extends Readonly<IForwardIterator<T, InputIterator>>, 
		RandomAccessIterator extends General<IForwardIterator<T, RandomAccessIterator>>>
	(
		first: InputIterator, last: InputIterator, 
		output_first: RandomAccessIterator, output_last: RandomAccessIterator, 
		comp: (x: T, y: T) => boolean = less
	): RandomAccessIterator
{
	let input_size: number = distance(first, last);
	let result_size: number = distance(output_first, output_last);

	let vector: Vector<T> = new Vector<T>(first, last);
	sort(vector.begin(), vector.end(), comp);

	if (input_size > result_size)
		output_first = copy(vector.begin(), vector.begin().advance(result_size), output_first);
	else
		output_first = copy(vector.begin(), vector.end(), output_first);

	return output_first;
}

/**
 * Rearrange for the n'th element.
 * 
 * @param first Random access iterator of the first position.
 * @param nth Random access iterator the n'th position.
 * @param last Random access iterator of the last position.
 * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Default is {@link less}.
 */
export function nth_element<T, RandomAccessIterator extends General<IRandomAccessIterator<T, RandomAccessIterator>>>
	(first: RandomAccessIterator, nth: RandomAccessIterator, last: RandomAccessIterator, comp: (left: T, right: T) => boolean = less): void
{
	let n: number = distance(first, nth);
	for (let i = first; !i.equals(last); i = i.next())
	{
		let count: number = 0;
		for (let j = first; !j.equals(last); j = j.next())
			if (i.equals(j))
				continue;
			else if (comp(i.value, j.value) && ++count > n)
				break;

		if (count === n)
		{
			iter_swap(nth, i);
			return;
		}
	}
}

/* ---------------------------------------------------------
	INSPECTOR
--------------------------------------------------------- */
/**
 * Test whether a range is sorted.
 * 
 * @param first Input iterator of the first position.
 * @param last Input iterator of the last position.
 * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Default is {@link less}.
 * 
 * @return Whether sorted or not.
 */
export function is_sorted<T, InputIterator extends Readonly<IForwardIterator<T, InputIterator>>>
	(first: InputIterator, last: InputIterator, comp: (x: T, y: T) => boolean = less): boolean
{
	if (first.equals(last)) 
		return true;
	
	for (let next = first.next(); !next.equals(last); next = next.next())
	{
		if (!(equal_to(next.value, first.value) || comp(first.value, next.value)))
			return false;
		
		first = first.next();
	}
	return true;
}

/**
 * Find the first unsorted element in range.
 * 
 * @param first Input iterator of the first position.
 * @param last Input iterator of the last position.
 * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Default is {@link less}.
 * 
 * @return Iterator to the first element who violates the order.
 */
export function is_sorted_until<T, InputIterator extends Readonly<IForwardIterator<T, InputIterator>>>
	(first: InputIterator, last: InputIterator, comp: (x: T, y: T) => boolean = less): InputIterator
{
	if (first.equals(last))
		return first;
	
	for (let next = first.next(); !next.equals(last); next = next.next())
	{
		if (!(equal_to(next.value, first.value) || comp(first.value, next.value)))
			return next;
		
		first = first.next();
	}
	return last;
}