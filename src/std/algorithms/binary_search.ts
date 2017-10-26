/// <reference path="../API.ts" />

namespace std
{
	/* =========================================================
		BINARY SEARCH
	========================================================= */
	export function lower_bound<T, ForwardIterator extends IForwardIterator<T>>
		(first: ForwardIterator, last: ForwardIterator, val: T): ForwardIterator;

	export function lower_bound<T, ForwardIterator extends IForwardIterator<T>>
		(
			first: ForwardIterator, last: ForwardIterator, val: T, 
			compare: (x: T, y: T) => boolean
		): ForwardIterator;

	export function lower_bound<T, ForwardIterator extends IForwardIterator<T>>
		(
			first: ForwardIterator, last: ForwardIterator, val: T, 
			compare: (x: T, y: T) => boolean = less
		): ForwardIterator
	{
		let count: number = distance(first, last);

		while (count > 0)
		{
			let step: number = Math.floor(count / 2);
			let it: ForwardIterator = advance(first, step) as ForwardIterator;

			if (!compare(it.value, val))
			{
				first = it.next() as ForwardIterator;
				count -= step + 1;
			}
			else
				count = step;
		}
		return first;
	}

	export function upper_bound<T, ForwardIterator extends IForwardIterator<T>>
		(first: ForwardIterator, last: ForwardIterator, val: T): ForwardIterator;

	export function upper_bound<T, ForwardIterator extends IForwardIterator<T>>
		(
			first: ForwardIterator, last: ForwardIterator, val: T,
			compare: (x: T, y: T) => boolean
		): ForwardIterator;

	export function upper_bound<T, ForwardIterator extends IForwardIterator<T>>
		(
			first: ForwardIterator, last: ForwardIterator, val: T,
			compare: (x: T, y: T) => boolean = less
		): ForwardIterator
	{
		let count: number = distance(first, last);
		
		while (count > 0)
		{
			let step: number = Math.floor(count / 2);
			let it: ForwardIterator = advance(first, step) as ForwardIterator;

			if (!compare(val, it.value))
			{
				first = it.next() as ForwardIterator;
				count -= step + 1;
			}
			else
				count = step;
		}
		return first;
	}

	export function equal_range<T, ForwardIterator extends IForwardIterator<T>>
		(first: ForwardIterator, last: ForwardIterator, val: T): Pair<ForwardIterator, ForwardIterator>

	export function equal_range<T, ForwardIterator extends IForwardIterator<T>>
		(
			first: ForwardIterator, last: ForwardIterator, val: T,
			compare: (x: T, y: T) => boolean
		): Pair<ForwardIterator, ForwardIterator>;

	export function equal_range<T, ForwardIterator extends IForwardIterator<T>>
		(
			first: ForwardIterator, last: ForwardIterator, val: T,
			compare: (x: T, y: T) => boolean = less
		): Pair<ForwardIterator, ForwardIterator>
	{
		let it: ForwardIterator = lower_bound(first, last, val, compare);

		return make_pair(it, upper_bound(it, last, val, compare));
	}

	export function binary_search<T, ForwardIterator extends IForwardIterator<T>>
		(first: ForwardIterator, last: ForwardIterator, val: T): boolean;

	export function binary_search<T, ForwardIterator extends IForwardIterator<T>>
		(
			first: ForwardIterator, last: ForwardIterator, val: T,
			compare: (x: T, y: T) => boolean
		): boolean;

	export function binary_search<T, ForwardIterator extends IForwardIterator<T>>
		(
			first: ForwardIterator, last: ForwardIterator, val: T,
			compare: (x: T, y: T) => boolean = less
		): boolean
	{
		first = lower_bound(first, last, val, compare);

		return !first.equals(last) && !compare(val, first.value);
	}
}