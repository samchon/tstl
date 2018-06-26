import { IBidirectionalIterator } from "../iterators/IBidirectionalIterator";
import { IRandomAccessIterator } from "../iterators/IRandomAccessIterator";

import { General } from "../iterators/IFake";
import { less } from "../functional/comparators";
import { distance, advance } from "../iterators/global";
import { iter_swap } from "./modifiers";

/* =========================================================
	POPLAR-HEAP (https://github.com/Morwenn/poplar-heap)
		- PUSH
		- POP
		- SORT
		- BACKGROUND
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
	for (let it = first; !it.equals(last); it = it.next())
		push_heap(first, it, comp);
	push_heap(first, last, comp);
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
	let size: number = distance(first, last);

	// COMPUTE LAST_POLOR_SIZE
	let last_poplar_size: number = _Hyper_floor(size + 1) - 1;
	while (size - last_poplar_size !== 0)
	{
		size -= last_poplar_size;
		last_poplar_size = _Hyper_floor(size + 1) - 1;
	}

	// DO SIFT
	_Sift(last.advance(-last_poplar_size), last_poplar_size, comp);
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
	let size: number = distance(first, last);

	let poplar_size = _Hyper_floor(size + 1) - 1;
	let last_root = last.prev();
	let bigger = last_root;
	let bigger_size = poplar_size;

	// Look for the bigger poplar root
	let it = first;
	while (true) 
	{
		let root = it.advance(poplar_size - 1);
		if (root.equals(last_root))
			break;
		else if (comp(bigger.value, root.value)) 
		{
			bigger = root;
			bigger_size = poplar_size;
		}
		it = root.next();

		size -= poplar_size;
		poplar_size = _Hyper_floor(size + 1) - 1;
	}

	// Swap & sift if needed
	if (bigger !== last_root) 
	{
		iter_swap(bigger, last_root);
		_Sift(bigger.advance(-bigger_size + 1), bigger_size, comp);
	}
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
	if (distance(first, last) < 2)
		return last;

	// Determines the "level" of the biggest poplar seen so far
	let poplar_level: number = 1;

	let it: BidirectionalIterator = first;
	let next: BidirectionalIterator = it.next();
	
	while (true) 
	{
		let poplar_size: number = 1;

		// The loop increment follows the binary carry sequence for some reason
		for (let i: number = (poplar_level & -poplar_level) >> 1 ; i !== 0 ; i >>= 1) 
		{
			// Beginning and size of the poplar to track
			it = advance(it, -poplar_size);
			poplar_size = 2 * poplar_size + 1;

			// Check poplar property against child roots
			let root: BidirectionalIterator = advance(it, poplar_size - 1);
			if (root.equals(last))
				return next;
			else if (comp(root.value, root.prev().value))
				return next;
			else if (comp(root.value, advance(it, Math.floor(poplar_size / 2) - 1).value))
				return next;

			if (next.equals(last)) return last;
			next = next.next();
		}

		if (next.equals(last)) return last;
		it = next;
		next = next.next();
		++poplar_level;
	}
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
	BACKGROUND
--------------------------------------------------------- */
/**
 * @hidden
 */
function _Hyper_floor(n: number)
{
	for (let i: number = 1; i > 0; i <<= 1)
		n = n | (n >> 1);
	
	return n & ~(n >> 1);
}

/**
 * @hidden
 */
function _Sift<T, RandomAccessIterator extends General<IRandomAccessIterator<T, RandomAccessIterator>>>
	(first: RandomAccessIterator, size: number, comp: (x: T, y: T) => boolean): void
{
	if (size < 2)
		return;

	let half_size: number = Math.floor(size / 2);

	// PRELIMINARIES
	let root: RandomAccessIterator = first.advance(size - 1);
	let child_root1: RandomAccessIterator = root.prev();
	let child_root2: RandomAccessIterator = first.advance(half_size - 1);

	// DETERMINE MAX-ROOT
	let max_root: RandomAccessIterator = root;
	if (comp(max_root.value, child_root1.value)) 
		max_root = child_root1;
	if (comp(max_root.value, child_root2.value))
		max_root = child_root2;

	// NEED ADDITIONAL SIFT?
	if (!max_root.equals(root)) 
	{
		iter_swap(root, max_root);
		_Sift(max_root.advance(-half_size + 1), half_size, comp);
	}
}