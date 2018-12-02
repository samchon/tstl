//================================================================ 
/** @module std */
//================================================================
import { IBidirectionalIterator } from "../iterator/IBidirectionalIterator";
import { IRandomAccessIterator } from "../iterator/IRandomAccessIterator";

import { General } from "../iterator/IFake";
import { less } from "../functional/comparators";
import { distance, advance } from "../iterator/global";

/* =========================================================
	EA-STL (https://github.com/electronicarts/EASTL/blob/master/include/EASTL/heap.h)
		- PUSH
		- POP
		- SORT
		- INTERNAL
============================================================
	PUSH
--------------------------------------------------------- */
/**
 * Make a heap.
 * 
 * @param first Random access iteartor of the first position.
 * @param last Random access iterator of the last position.
 * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Default is {@link less}.
 */
export function make_heap<T, RandomAccessIterator extends General<IRandomAccessIterator<T, RandomAccessIterator>>>
	(first: RandomAccessIterator, last: RandomAccessIterator, comp: (x: T, y: T) => boolean = less): void
{
	let heapSize: number = distance(first, last);
	if (heapSize < 2)
		return;

	let parentPosition: number = ((heapSize - 2) >> 1) + 1;
	do
	{
		let temp: T = first.advance(--parentPosition).value;
		_Adjust_heap(first, parentPosition, heapSize, parentPosition, temp, comp);
	}
	while (parentPosition !== 0);
}

/**
 * Push an element into heap.
 * 
 * @param first Random access iteartor of the first position.
 * @param last Random access iterator of the last position.
 * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Default is {@link less}.
 */
export function push_heap<T, RandomAccessIterator extends General<IRandomAccessIterator<T, RandomAccessIterator>>>
	(first: RandomAccessIterator, last: RandomAccessIterator, comp: (x: T, y: T) => boolean = less): void
{
	let tempBottom: T = last.prev().value;
	_Promote_heap(first, 0, last.index() - first.index() - 1, tempBottom, comp);
}

/* ---------------------------------------------------------
	POP
--------------------------------------------------------- */
/**
 * Pop an element from heap.
 * 
 * @param first Random access iteartor of the first position.
 * @param last Random access iterator of the last position.
 * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Default is {@link less}.
 */
export function pop_heap<T, RandomAccessIterator extends General<IRandomAccessIterator<T, RandomAccessIterator>>>
	(first: RandomAccessIterator, last: RandomAccessIterator, comp: (x: T, y: T) => boolean = less): void
{
	let tempBottom: T = last.prev().value;
	last.prev().value = first.value;


	_Adjust_heap(first, 0, last.index() - first.index() - 1, 0, tempBottom, comp);
}

/* ---------------------------------------------------------
	SORT
--------------------------------------------------------- */
/**
 * Test whether a range is heap.
 * 
 * @param first Bi-directional iteartor of the first position.
 * @param last Bi-directional iterator of the last position.
 * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Default is {@link less}.
 * 
 * @return Whether the range is heap.
 */
export function is_heap<T, BidirectionalIterator extends Readonly<IBidirectionalIterator<T, BidirectionalIterator>>>
	(first: BidirectionalIterator, last: BidirectionalIterator, comp: (x: T, y: T) => boolean = less): boolean
{
	let it = is_heap_until(first, last, comp);
	return it.equals(last);
}

/**
 * Find the first element not in heap order.
 * 
 * @param first Bi-directional iteartor of the first position.
 * @param last Bi-directional iterator of the last position.
 * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Default is {@link less}.
 * 
 * @return Iterator to the first element not in heap order.
 */
export function is_heap_until<T, BidirectionalIterator extends Readonly<IBidirectionalIterator<T, BidirectionalIterator>>>
	(first: BidirectionalIterator, last: BidirectionalIterator, comp: (x: T, y: T) => boolean = less): BidirectionalIterator
{
	let counter: number = 0;
	for (let child = first.next(); !child.equals(last); child = child.next(), counter ^= 1)
	{
		if (comp(first.value, child.value))
			return child;
		first = advance(first, counter);
	}
	return last;
}

/**
 * Sort elements of a heap.
 * 
 * @param first Random access iteartor of the first position.
 * @param last Random access iterator of the last position.
 * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Default is {@link less}.
 */
export function sort_heap<T, RandomAccessIterator extends General<IRandomAccessIterator<T, RandomAccessIterator>>>
	(first: RandomAccessIterator, last: RandomAccessIterator, comp: (x: T, y: T) => boolean = less): void
{
	while (!first.equals(last))
	{
		pop_heap(first, last, comp);
		last = last.prev();
	}
}

/* ---------------------------------------------------------
	INTERNAL
--------------------------------------------------------- */
/**
 * @hidden
 */
function _Promote_heap<T, RandomAccessIterator extends General<IRandomAccessIterator<T, RandomAccessIterator>>>
	(first: RandomAccessIterator, topPosition: number, position: number, value: T, comp: (x: T, y: T) => boolean): void
{
	for (let parentPosition: number = (position - 1) >> 1; 
		(position > topPosition) && comp(first.advance(parentPosition).value, value); 
		parentPosition = (position - 1 ) >> 1)
	{
		first.advance(position).value = first.advance(parentPosition).value;
		position = parentPosition;
	}
	first.advance(position).value = value;
}

function _Adjust_heap<T, RandomAccessIterator extends General<IRandomAccessIterator<T, RandomAccessIterator>>>
	(first: RandomAccessIterator, topPosition: number, heapSize: number, position: number, value: T, comp: (x: T, y: T) => boolean): void
{
	let childPosition: number = (2 * position) + 2;
	for (; childPosition < heapSize; childPosition = (2 * childPosition) + 2)
	{
		if (comp(first.advance(childPosition).value, first.advance(childPosition - 1).value))
			--childPosition;
		
		first.advance(position).value = first.advance(childPosition).value;
		position = childPosition;
	}

	if (childPosition === heapSize)
	{
		first.advance(position).value = first.advance(childPosition - 1).value;
		position = childPosition - 1;
	}

	_Promote_heap(first, topPosition, position, value, comp);
}
