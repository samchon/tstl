import { IForwardIterator } from "../iterators/IForwardIterator";
import { IBidirectionalIterator } from "../iterators/IBidirectionalIterator";

import { Writeonly, General } from "../iterators/IFake";
import { less } from "../functional/comparators";
import { copy } from "./modifiers";
import { back_inserter } from "../iterators/factory";

import { Vector } from "../containers/Vector";

/* =========================================================
	MERGE & SET OPERATIONS
		- MERGE
		- SET OPERATION
============================================================
	MERGE
--------------------------------------------------------- */
/**
 * Merge two sorted ranges.
 * 
 * @param first1 Input iteartor of the first position of the 1st range.
 * @param last1 Input iterator of the last position of the 1st range.
 * @param first2 Input iterator of the first position of the 2nd range.
 * @param last2 Input iterator of the last position of the 2nd range.
 * @param output Output iterator of the first position.
 * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Default is {@link less}.
 * 
 * @return Output Iterator of the last position by advancing.
 */
export function merge<T, 
		InputIterator1 extends Readonly<IForwardIterator<T, InputIterator1>>, 
		InputIterator2 extends Readonly<IForwardIterator<T, InputIterator2>>,
		OutputIterator extends Writeonly<IForwardIterator<T, OutputIterator>>>
	(
		first1: InputIterator1, last1: InputIterator1, 
		first2: InputIterator2, last2: InputIterator2,
		output: OutputIterator, comp: (x: T, y: T) => boolean = less
	): OutputIterator
{
	while (true)
	{
		if (first1.equals(last1))
			return copy(first2, last2, output);
		else if (first2.equals(last2))
			return copy(first1, last1, output);

		if (comp(first1.value, first2.value))
		{
			output.value = first1.value;
			first1 = first1.next();
		}
		else
		{
			output.value = first2.value;
			first2 = first2.next();
		}
		output = output.next();
	}
}

/**
 * Merge two sorted & consecutive ranges.
 * 
 * @param first Bidirectional iterator of the first position.
 * @param middle Bidirectional iterator of the initial position of the 2nd range.
 * @param last Bidirectional iterator of the last position.
 * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Default is {@link less}.
 */
export function inplace_merge<T, BidirectionalIterator extends General<IBidirectionalIterator<T, BidirectionalIterator>>>
	(
		first: BidirectionalIterator, middle: BidirectionalIterator, last: BidirectionalIterator,
		comp: (x: T, y: T) => boolean = less
	): void
{
	let vector: Vector<T> = new Vector();
	merge(first, middle, middle, last, back_inserter<T, Vector<T>>(vector), comp);

	copy(vector.begin(), vector.end(), first);
}

/* ---------------------------------------------------------
	SET OPERATIONS
--------------------------------------------------------- */
/**
 * Test whether two sorted ranges are in inclusion relationship.
 * 
 * @param first1 Input iteartor of the first position of the 1st range.
 * @param last1 Input iterator of the last position of the 1st range.
 * @param first2 Input iterator of the first position of the 2nd range.
 * @param last2 Input iterator of the last position of the 2nd range.
 * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Default is {@link less}.
 * 
 * @return Whether [first, last1) includes [first2, last2).
 */
export function includes<T, 
		InputIterator1 extends Readonly<IForwardIterator<T, InputIterator1>>, 
		InputIterator2 extends Readonly<IForwardIterator<T, InputIterator2>>>
	(
		first1: InputIterator1, last1: InputIterator1, 
		first2: InputIterator2, last2: InputIterator2,
		comp: (x: T, y: T) => boolean = less
	): boolean
{
	while (!first2.equals(last2))
	{
		if (first1.equals(last1) || comp(first2.value, first1.value))
			return false;
		else if (!comp(first1.value, first2.value))
			first2 = first2.next();

		first1 = first1.next();
	}

	return true;
}

/**
 * Combine two sorted ranges to union relationship.
 * 
 * @param first1 Input iteartor of the first position of the 1st range.
 * @param last1 Input iterator of the last position of the 1st range.
 * @param first2 Input iterator of the first position of the 2nd range.
 * @param last2 Input iterator of the last position of the 2nd range.
 * @param output Output iterator of the first position.
 * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Default is {@link less}.
 * 
 * @return Output Iterator of the last position by advancing.
 */
export function set_union<T, 
		InputIterator1 extends Readonly<IForwardIterator<T, InputIterator1>>, 
		InputIterator2 extends Readonly<IForwardIterator<T, InputIterator2>>,
		OutputIterator extends Writeonly<IForwardIterator<T, OutputIterator>>>
	(
		first1: InputIterator1, last1: InputIterator1, 
		first2: InputIterator2, last2: InputIterator2,
		output: OutputIterator, comp: (x: T, y: T) => boolean = less
	): OutputIterator
{
	while (true)
	{
		if (first1.equals(last1))
			return copy(first2, last2, output);
		else if (first2.equals(last2))
			return copy(first1, last1, output);

		if (comp(first1.value, first2.value))
		{
			output.value = first1.value;
			first1 = first1.next();
		}
		else if (comp(first2.value, first1.value))
		{
			output.value = first2.value;
			first2 = first2.next();
		}
		else 
		{// equals
			output.value = first1.value;

			first1 = first1.next();
			first2 = first2.next();
		}

		output = output.next();
	}
}

/**
 * Combine two sorted ranges to intersection relationship.
 * 
 * @param first1 Input iteartor of the first position of the 1st range.
 * @param last1 Input iterator of the last position of the 1st range.
 * @param first2 Input iterator of the first position of the 2nd range.
 * @param last2 Input iterator of the last position of the 2nd range.
 * @param output Output iterator of the first position.
 * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Default is {@link less}.
 * 
 * @return Output Iterator of the last position by advancing.
 */
export function set_intersection<T, 
		InputIterator1 extends Readonly<IForwardIterator<T, InputIterator1>>, 
		InputIterator2 extends Readonly<IForwardIterator<T, InputIterator2>>,
		OutputIterator extends Writeonly<IForwardIterator<T, OutputIterator>>>
	(
		first1: InputIterator1, last1: InputIterator1, 
		first2: InputIterator2, last2: InputIterator2,
		output: OutputIterator, comp: (x: T, y: T) => boolean = less
	): OutputIterator
{
	while (true)
	{
		if (first1.equals(last1))
			return copy(first2, last2, output);
		else if (first2.equals(last2))
			return copy(first1, last1, output);

		if (comp(first1.value, first2.value))
			first1 = first1.next();
		else if (comp(first2.value, first1.value))
			first2 = first2.next();
		else 
		{// equals
			output.value = first1.value;

			output = output.next();
			first1 = first1.next();
			first2 = first2.next();
		}
	}
}

/**
 * Combine two sorted ranges to difference relationship.
 * 
 * @param first1 Input iteartor of the first position of the 1st range.
 * @param last1 Input iterator of the last position of the 1st range.
 * @param first2 Input iterator of the first position of the 2nd range.
 * @param last2 Input iterator of the last position of the 2nd range.
 * @param output Output iterator of the first position.
 * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Default is {@link less}.
 * 
 * @return Output Iterator of the last position by advancing.
 */
export function set_difference<T, 
		InputIterator1 extends Readonly<IForwardIterator<T, InputIterator1>>, 
		InputIterator2 extends Readonly<IForwardIterator<T, InputIterator2>>,
		OutputIterator extends Writeonly<IForwardIterator<T, OutputIterator>>>
	(
		first1: InputIterator1, last1: InputIterator1, 
		first2: InputIterator2, last2: InputIterator2,
		output: OutputIterator, comp: (x: T, y: T) => boolean = less
	): OutputIterator
{
	while (!first1.equals(last1) && !first2.equals(last2))
		if (comp(first1.value, first2.value))
		{
			output.value = first1.value;

			output = output.next();
			first1 = first1.next();
		}
		else if (comp(first2.value, first1.value))
			first2 = first2.next();
		else
		{
			first1 = first1.next();
			first2 = first2.next();
		}

	return copy(first1, last1, output);
}

/**
 * Combine two sorted ranges to symmetric difference relationship.
 * 
 * @param first1 Input iteartor of the first position of the 1st range.
 * @param last1 Input iterator of the last position of the 1st range.
 * @param first2 Input iterator of the first position of the 2nd range.
 * @param last2 Input iterator of the last position of the 2nd range.
 * @param output Output iterator of the first position.
 * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Default is {@link less}.
 * 
 * @return Output Iterator of the last position by advancing.
 */
export function set_symmetric_difference<T, 
		InputIterator1 extends Readonly<IForwardIterator<T, InputIterator1>>, 
		InputIterator2 extends Readonly<IForwardIterator<T, InputIterator2>>,
		OutputIterator extends Writeonly<IForwardIterator<T, OutputIterator>>>
	(
		first1: InputIterator1, last1: InputIterator1, 
		first2: InputIterator2, last2: InputIterator2,
		output: OutputIterator, comp: (x: T, y: T) => boolean = less
	): OutputIterator
{
	while (true)
	{
		if (first1.equals(last1))
			return copy(first2, last2, output);
		else if (first2.equals(last2))
			return copy(first1, last1, output);

		if (comp(first1.value, first2.value))
		{
			output.value = first1.value;

			output = output.next();
			first1 = first1.next();
		}
		else if (comp(first2.value, first1.value))
		{
			output.value = first2.value;

			output = output.next();
			first2 = first2.next();
		}
		else 
		{// equals
			first1 = first1.next();
			first2 = first2.next();
		}
	}
}