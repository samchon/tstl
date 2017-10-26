/// <reference path="../API.ts" />

namespace std
{
	/* =========================================================
		HEAPS
	========================================================= */
	export function make_heap<T, RandomAccessIterator extends base.IArrayIterator<T>>
		(first: RandomAccessIterator, last: RandomAccessIterator): void;

	export function make_heap<T, RandomAccessIterator extends base.IArrayIterator<T>>
		(first: RandomAccessIterator, last: RandomAccessIterator, compare: (x: T, y: T) => boolean): void;

	export function make_heap<T, RandomAccessIterator extends base.IArrayIterator<T>>
		(first: RandomAccessIterator, last: RandomAccessIterator, compare: (x: T, y: T) => boolean = less): void
	{
		let heap_compare = 
			function (x: T, y: T): boolean
			{
				return !compare(x, y);
			}

		sort(first, last, heap_compare);
	}

	export function push_heap<T, RandomAccessIterator extends base.IArrayIterator<T>>
		(first: RandomAccessIterator, last: RandomAccessIterator): void;

	export function push_heap<T, RandomAccessIterator extends base.IArrayIterator<T>>
		(first: RandomAccessIterator, last: RandomAccessIterator, compare: (x: T, y: T) => boolean): void;

	export function push_heap<T, RandomAccessIterator extends base.IArrayIterator<T>>
		(first: RandomAccessIterator, last: RandomAccessIterator, compare: (x: T, y: T) => boolean = less): void
	{
		let last_item_it = last.prev();
		let less_it: RandomAccessIterator = null;
		
		for (let it = first; !it.equals(last_item_it); it = it.next() as RandomAccessIterator)
		{
			if (compare(it.value, last_item_it.value))
			{
				less_it = it;
				break;
			}
		}

		if (less_it != null)
		{
			let container = last_item_it.source() as base.IArrayContainer<T>;

			container.insert(less_it, last_item_it.value);
			container.erase(last_item_it);
		}
	}

	export function pop_heap<T, RandomAccessIterator extends base.IArrayIterator<T>>
		(first: RandomAccessIterator, last: RandomAccessIterator): void;

	export function pop_heap<T, RandomAccessIterator extends base.IArrayIterator<T>>
		(first: RandomAccessIterator, last: RandomAccessIterator, compare: (x: T, y: T) => boolean): void;

	export function pop_heap<T, RandomAccessIterator extends base.IArrayIterator<T>>
		(first: RandomAccessIterator, last: RandomAccessIterator, compare: (x: T, y: T) => boolean = less): void
	{
		let container = first.source() as base.IArrayContainer<T>;

		container.insert(last, first.value);
		container.erase(first);
	}

	export function is_heap<T, RandomAccessIterator extends base.IArrayIterator<T>>
		(first: RandomAccessIterator, last: RandomAccessIterator): boolean;

	export function is_heap<T, RandomAccessIterator extends base.IArrayIterator<T>>
		(first: RandomAccessIterator, last: RandomAccessIterator, compare: (x: T, y: T) => boolean): boolean;

	export function is_heap<T, RandomAccessIterator extends base.IArrayIterator<T>>
		(first: RandomAccessIterator, last: RandomAccessIterator, compare: (x: T, y: T) => boolean = less): boolean
	{
		let it = is_heap_until(first, last, compare);

		return it.equals(last);
	}

	export function is_heap_until<T, RandomAccessIterator extends base.IArrayIterator<T>>
		(first: RandomAccessIterator, last: RandomAccessIterator): RandomAccessIterator;

	export function is_heap_until<T, RandomAccessIterator extends base.IArrayIterator<T>>
		(first: RandomAccessIterator, last: RandomAccessIterator, compare: (x: T, y: T) => boolean): RandomAccessIterator;

	export function is_heap_until<T, RandomAccessIterator extends base.IArrayIterator<T>>
		(first: RandomAccessIterator, last: RandomAccessIterator, compare: (x: T, y: T) => boolean = less): RandomAccessIterator
	{
		let prev = first;
		for (let it = first.next() as RandomAccessIterator; !it.equals(last); it = it.next() as RandomAccessIterator)
		{
			if (compare(prev.value, it.value) == true)
				return it;

			prev = it;
		}
		return last;
	}

	export function sort_heap<T, RandomAccessIterator extends base.IArrayIterator<T>>
		(first: RandomAccessIterator, last: RandomAccessIterator): void;

	export function sort_heap<T, RandomAccessIterator extends base.IArrayIterator<T>>
		(first: RandomAccessIterator, last: RandomAccessIterator, compare: (x: T, y: T) => boolean): void;

	export function sort_heap<T, RandomAccessIterator extends base.IArrayIterator<T>>
		(first: RandomAccessIterator, last: RandomAccessIterator, compare: (x: T, y: T) => boolean = less): void
	{
		sort(first, last, compare);
	}
}