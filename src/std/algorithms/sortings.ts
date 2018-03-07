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
	export function sort<T, RandomAccessIterator extends General<IRandomAccessIterator<T, RandomAccessIterator>>>
		(first: RandomAccessIterator, last: RandomAccessIterator): void;

	export function sort<T, RandomAccessIterator extends General<IRandomAccessIterator<T, RandomAccessIterator>>>
		(first: RandomAccessIterator, last: RandomAccessIterator, comp: (x: T, y: T) => boolean): void;

	export function sort<T, RandomAccessIterator extends General<IRandomAccessIterator<T, RandomAccessIterator>>>
		(first: RandomAccessIterator, last: RandomAccessIterator, comp: (x: T, y: T) => boolean = less): void
	{
		let size: number = last.index() - first.index();
		if (size <= 0)
			return;

		let pivot_it: RandomAccessIterator = first.advance(Math.floor(size / 2));
		let pivot: T = pivot_it.value;

		if (pivot_it.index() != first.index())
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

	export function stable_sort<T, RandomAccessIterator extends General<IRandomAccessIterator<T, RandomAccessIterator>>>
		(first: RandomAccessIterator, last: RandomAccessIterator): void;

	export function stable_sort<T, RandomAccessIterator extends General<IRandomAccessIterator<T, RandomAccessIterator>>>
		(first: RandomAccessIterator, last: RandomAccessIterator, comp: (x: T, y: T) => boolean): void;

	export function stable_sort<T, RandomAccessIterator extends General<IRandomAccessIterator<T, RandomAccessIterator>>>
		(first: RandomAccessIterator, last: RandomAccessIterator, comp: (x: T, y: T) => boolean = less): void
	{
		let ramda = function (x: T, y: T): boolean
		{
			return comp(x, y) && !comp(y, x);
		};
		sort(first, last, ramda);
	}

	export function partial_sort<T, RandomAccessIterator extends General<IRandomAccessIterator<T, RandomAccessIterator>>>
		(first: RandomAccessIterator, middle: RandomAccessIterator, last: RandomAccessIterator): void;

	export function partial_sort<T, RandomAccessIterator extends General<IRandomAccessIterator<T, RandomAccessIterator>>>
		(
			first: RandomAccessIterator, middle: RandomAccessIterator, last: RandomAccessIterator, 
			comp: (x: T, y: T) => boolean
		): void

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

	export function partial_sort_copy<T, 
			InputIterator extends Readonly<IForwardIterator<T, InputIterator>>, 
			RandomAccessIterator extends General<IForwardIterator<T, RandomAccessIterator>>>
		(
			first: InputIterator, last: InputIterator, 
			result_first: RandomAccessIterator, result_last: RandomAccessIterator
		): RandomAccessIterator;

	export function partial_sort_copy<T, 
			InputIterator extends Readonly<IForwardIterator<T, InputIterator>>, 
			RandomAccessIterator extends General<IForwardIterator<T, RandomAccessIterator>>>
		(
			first: InputIterator, last: InputIterator, 
			result_first: RandomAccessIterator, result_last: RandomAccessIterator, 
			comp: (x: T, y: T) => boolean
		): RandomAccessIterator;

	export function partial_sort_copy<T, 
			InputIterator extends Readonly<IForwardIterator<T, InputIterator>>, 
			RandomAccessIterator extends General<IForwardIterator<T, RandomAccessIterator>>>
		(
			first: InputIterator, last: InputIterator, 
			result_first: RandomAccessIterator, result_last: RandomAccessIterator, 
			comp: (x: T, y: T) => boolean = less
		): RandomAccessIterator
	{
		let input_size: number = distance(first, last);
		let result_size: number = distance(result_first, result_last);

		let vector: Vector<T> = new Vector<T>(first, last);
		sort(vector.begin(), vector.end(), comp);

		if (input_size > result_size)
			result_first = copy(vector.begin(), vector.begin().advance(result_size), result_first);
		else
			result_first = copy(vector.begin(), vector.end(), result_first);

		return result_first;
	}

	export function nth_element<T, RandomAccessIterator extends General<IRandomAccessIterator<T, RandomAccessIterator>>>
		(first: RandomAccessIterator, nth: RandomAccessIterator, last: RandomAccessIterator): void;

	export function nth_element<T, RandomAccessIterator extends General<IRandomAccessIterator<T, RandomAccessIterator>>>
		(first: RandomAccessIterator, nth: RandomAccessIterator, last: RandomAccessIterator, comp: (left: T, right: T) => boolean): void;

	export function nth_element<T, RandomAccessIterator extends General<IRandomAccessIterator<T, RandomAccessIterator>>>
		(first: RandomAccessIterator, nth: RandomAccessIterator, last: RandomAccessIterator, comp: (left: T, right: T) => boolean = less): void
	{
		nth.index(); // TODO: How to utilize it?

		sort(first, last, comp);
	}

	/* ---------------------------------------------------------
		INSPECTOR
	--------------------------------------------------------- */
	export function is_sorted<T, ForwardIterator extends Readonly<IForwardIterator<T, ForwardIterator>>>
		(first: ForwardIterator, last: ForwardIterator): boolean;

	export function is_sorted<T, ForwardIterator extends Readonly<IForwardIterator<T, ForwardIterator>>>
		(first: ForwardIterator, last: ForwardIterator, compare: (x: T, y: T) => boolean): boolean;

	export function is_sorted<T, ForwardIterator extends Readonly<IForwardIterator<T, ForwardIterator>>>
		(first: ForwardIterator, last: ForwardIterator, compare: (x: T, y: T) => boolean = less): boolean
	{
		if (first.equals(last)) 
			return true;
		
		for (let next = first.next(); !next.equals(last); next = next.next())
		{
			if (!(equal_to(next.value, first.value) || compare(first.value, next.value)))
				return false;
			
			first = first.next();
		}
		return true;
	}

	export function is_sorted_until<T, ForwardIterator extends Readonly<IForwardIterator<T, ForwardIterator>>>
		(first: ForwardIterator, last: ForwardIterator): ForwardIterator;

	export function is_sorted_until<T, ForwardIterator extends Readonly<IForwardIterator<T, ForwardIterator>>>
		(first: ForwardIterator, last: ForwardIterator, compare: (x: T, y: T) => boolean): ForwardIterator;

	export function is_sorted_until<T, ForwardIterator extends Readonly<IForwardIterator<T, ForwardIterator>>>
		(first: ForwardIterator, last: ForwardIterator, compare: (x: T, y: T) => boolean = less): ForwardIterator
	{
		if (first.equals(last))
			return first;
		
		for (let next = first.next(); !next.equals(last); next = next.next())
		{
			if (!(equal_to(next.value, first.value) || compare(first.value, next.value)))
				return next;
			
			first = first.next();
		}
		return last;
	}
}