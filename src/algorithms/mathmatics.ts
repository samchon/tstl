import { IForwardIterator } from "../iterators/IForwardIterator";
import { IBidirectionalIterator } from "../iterators/IBidirectionalIterator";

import { General } from "../iterators/IFake";
import { Pair } from "../utilities/Pair";

import { less, equal_to } from "../functional/comparators";
import { advance, distance } from "../iterators/global";
import { mismatch, find_if, count } from "./iterations";
import { iter_swap, reverse } from "./modifiers";

/* =========================================================
	MATHMATICS
		- MIN & MAX
		- PERMUTATION
		- MISCELLANEOUS
============================================================
	MIN & MAX
--------------------------------------------------------- */
/**
 * Get the minium value.
 * 
 * @param items Items to search through.
 * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Default is {@link less}.
 * 
 * @return The minimum value.
 */
export function min<T>(items: T[], comp: (x: T, y: T) => boolean = less): T
{
	let minimum: T = items[0];

	for (let i: number = 1; i < items.length; i++)
		if (comp(items[i], minimum))
			minimum = items[i];

	return minimum;
}

/**
 * Get the maximum value.
 * 
 * @param items Items to search through.
 * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Default is {@link less}.
 * 
 * @return The maximum value.
 */
export function max<T>(items: T[], comp: (x: T, y: T) => boolean = less): T
{
	let maximum: T = items[0];

	for (let i: number = 1; i < items.length; i++)
		if (comp(maximum, items[i]))
			maximum = items[i];

	return maximum;
}

/**
 * Get the minimum & maximum values.
 * 
 * @param items Items to search through.
 * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Default is {@link less}.
 * 
 * @return A {@link Pair} of minimum & maximum values.
 */
export function minmax<T>(items: T[], comp: (x: T, y: T) => boolean): Pair<T, T>
{
	let minimum: T = items[0];
	let maximum: T = items[0];

	for (let i: number = 1; i < items.length; i++)
	{
		if (comp(items[i], minimum))
			minimum = items[i];
		if (comp(maximum, items[i]))
			maximum = items[i];
	}
	return new Pair(minimum, maximum);
}

/**
 * Get the minimum element in range.
 * 
 * @param first Forward iterator of the first position.
 * @param last Forward iterator of the last position.
 * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Default is {@link less}.
 * 
 * @return Iterator to the minimum element.
 */
export function min_element<T, ForwardIterator extends Readonly<IForwardIterator<T, ForwardIterator>>>
	(first: ForwardIterator, last: ForwardIterator, comp: (x: T, y: T) => boolean = less): ForwardIterator
{
	let smallest: ForwardIterator = first;
	first = first.next();
	
	for (; !first.equals(last); first = first.next())
		if (comp(first.value, smallest.value))
			smallest = first;

	return smallest;
}

/**
 * Get the maximum element in range.
 * 
 * @param first Forward iterator of the first position.
 * @param last Forward iterator of the last position.
 * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Default is {@link less}.
 * 
 * @return Iterator to the maximum element.
 */
export function max_element<T, ForwardIterator extends Readonly<IForwardIterator<T, ForwardIterator>>>
	(first: ForwardIterator, last: ForwardIterator, comp: (x: T, y: T) => boolean = less): ForwardIterator
{
	let largest: ForwardIterator = first;
	first = first.next();

	for (; !first.equals(last); first = first.next())
		if (comp(largest.value, first.value))
			largest = first;

	return largest;
}

/**
 * Get the minimum & maximum elements in range.
 * 
 * @param first Forward iterator of the first position.
 * @param last Forward iterator of the last position.
 * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Default is {@link less}.
 * 
 * @return A {@link Pair} of iterators to the minimum & maximum elements.
 */
export function minmax_element<T, ForwardIterator extends Readonly<IForwardIterator<T, ForwardIterator>>>
	(first: ForwardIterator, last: ForwardIterator, comp: (x: T, y: T) => boolean = less): Pair<ForwardIterator, ForwardIterator>
{
	let smallest: ForwardIterator = first;
	let largest: ForwardIterator = first;

	first = first.next();
	for (; !first.equals(last); first = first.next())
	{
		if (comp(first.value, smallest.value)) // first is less than the smallest.
			smallest = first;
		if (comp(largest.value, first.value)) // first is not less than the largest.
			largest = first;
	}
	return new Pair(smallest, largest);
}

/**
 * Get the clamp value.
 * 
 * @param v The value to clamp.
 * @param lo Lower value than *hi*.
 * @param hi Higher value than *lo*.
 * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Default is {@link less}.
 * 
 * @return The clamp value.
 */
export function clamp<T>(v: T, lo: T, hi: T, comp: (x: T, y: T) => boolean = less): T
{
	return comp(v, lo) ? lo
		: comp(hi, v) ? hi : v;
}

/* ---------------------------------------------------------
	PERMUATATIONS
--------------------------------------------------------- */
/**
 * Test whether two ranges are in permutation relationship.
 * 
 * @param first1 Forward iteartor of the first position of the 1st range.
 * @param last1 Forward iterator of the last position of the 1st range.
 * @param first2 Forward iterator of the first position of the 2nd range.
 * @param pred A binary function predicates two arguments are equal. Default is {@link equal_to}.
 * 
 * @return Whether permutation or not.
 */
export function is_permutation<T, 
		ForwardIterator1 extends Readonly<IForwardIterator<T, ForwardIterator1>>, 
		ForwardIterator2 extends Readonly<IForwardIterator<T, ForwardIterator2>>>
	(
		first1: ForwardIterator1, last1: ForwardIterator1, 
		first2: ForwardIterator2,
		pred: (x: T, y: T) => boolean = equal_to
	): boolean
{
	// find the mismatched
	let pair: Pair<ForwardIterator1, ForwardIterator2> = mismatch(first1, last1, first2);
	first1 = pair.first;
	first2 = pair.second;

	if (first1.equals(last1))
		return true;

	let last2: ForwardIterator2 = advance(first2, distance(first1, last1));

	for (let it = first1; !it.equals(last1); it = it.next())
	{
		let lamda = function (val: T): boolean 
		{
			return pred(val, it.value);
		};

		if (find_if(first1, it, lamda).equals(it))
		{
			let n: number = count(first2, last2, it.value);
			if (n === 0 || count(it, last1, it.value) !== n)
				return false;
		}
	}
	return true;
}

/**
 * Transform to the previous permutation.
 * 
 * @param first Bidirectional iterator of the first position.
 * @param last Bidirectional iterator of the last position.
 * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Default is {@link less}.
 * 
 * @return Whether the transformation was meaningful.
 */
export function prev_permutation<T, BidirectionalIterator extends General<IBidirectionalIterator<T, BidirectionalIterator>>>
	(first: BidirectionalIterator, last: BidirectionalIterator, comp: (x: T, y: T) => boolean = less): boolean
{
	if (first.equals(last) === true)
		return false;

	let i: BidirectionalIterator = last.prev();
	if (first.equals(i) === true)
		return false;

	while (true)
	{
		let x: BidirectionalIterator = i;
		let y: BidirectionalIterator;

		i = i.prev();
		if (comp(x.value, i.value) === true)
		{
			y = last.prev();
			while (comp(y.value, i.value) === false)
				y = y.prev();
			
			iter_swap(i, y);
			reverse(x, last);
			return true;
		}

		if (i.equals(first) === true)
		{
			reverse(first, last);
			return false;
		}
	}
}

/**
 * Transform to the next permutation.
 * 
 * @param first Bidirectional iterator of the first position.
 * @param last Bidirectional iterator of the last position.
 * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Default is {@link less}.
 * 
 * @return Whether the transformation was meaningful.
 */
export function next_permutation<T, BidirectionalIterator extends General<IBidirectionalIterator<T, BidirectionalIterator>>>
	(first: BidirectionalIterator, last: BidirectionalIterator, compare: (x: T, y: T) => boolean = less): boolean
{
	if (first.equals(last) === true)
		return false;

	let i: BidirectionalIterator = last.prev();
	if (first.equals(i) === true)
		return false;

	while (true)
	{
		let x: BidirectionalIterator = i;
		let y: BidirectionalIterator;

		i = i.prev();
		if (compare(i.value, x.value) === true)
		{
			y = last.prev();
			while (compare(i.value, y.value) === false)
				y = y.prev();
			
			iter_swap(i, y);
			reverse(x, last);
			return true;
		}

		if (i.equals(first) === true)
		{
			reverse(first, last);
			return false;
		}
	}
}