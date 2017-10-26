/// <reference path="../API.ts" />

namespace std
{
	/* =========================================================
		MERGE & SET OPERATIONS
			- MERGE
			- SET OPERATION
	============================================================
		MERGE
	--------------------------------------------------------- */
	export function merge<T, 
			InputIterator1 extends base.Iterator<T>, InputIterator2 extends base.Iterator<T>,
			OutputIterator extends base.ILinearIterator<T>>
		(
			first1: InputIterator1, last1: InputIterator1, first2: InputIterator2, last2: InputIterator2,
			result: OutputIterator
		): OutputIterator;

	export function merge<T, 
			InputIterator1 extends base.Iterator<T>, InputIterator2 extends base.Iterator<T>,
			OutputIterator extends base.ILinearIterator<T>>
		(
			first1: InputIterator1, last1: InputIterator1, first2: InputIterator2, last2: InputIterator2,
			result: OutputIterator, compare: (x: T, y: T) => boolean
		): OutputIterator;

	export function merge<T, 
			InputIterator1 extends base.Iterator<T>, InputIterator2 extends base.Iterator<T>,
			OutputIterator extends base.ILinearIterator<T>>
		(
			first1: InputIterator1, last1: InputIterator1, first2: InputIterator2, last2: InputIterator2,
			result: OutputIterator, compare: (x: T, y: T) => boolean = less
		): OutputIterator
	{
		while (true)
		{
			if (first1.equals(last1))
				return copy(first2, last2, result);
			else if (first2.equals(last2))
				return copy(first1, last1, result);

			if (compare(first1.value, first2.value))
			{
				result.value = first1.value;
				first1 = first1.next() as InputIterator1;
			}
			else
			{
				result.value = first2.value;
				first2 = first2.next() as InputIterator2;
			}

			result = result.next() as OutputIterator;
		}
	}

	export function inplace_merge<T, BidirectionalIterator extends base.Iterator<T>>
		(first: BidirectionalIterator, middle: BidirectionalIterator, last: BidirectionalIterator): void;

	export function inplace_merge<T, BidirectionalIterator extends base.ILinearIterator<T>>
		(
			first: BidirectionalIterator, middle: BidirectionalIterator, last: BidirectionalIterator,
			compare: (x: T, y: T) => boolean
		): void;

	export function inplace_merge<T, BidirectionalIterator extends base.ILinearIterator<T>>
		(
			first: BidirectionalIterator, middle: BidirectionalIterator, last: BidirectionalIterator,
			compare: (x: T, y: T) => boolean = less
		): void
	{
		let vector: Vector<T> = new Vector<T>(distance(first, last), null);
		merge(first, middle, middle, last, vector.begin());

		copy(vector.begin(), vector.end(), first);
	}

	/* ---------------------------------------------------------
		SET OPERATIONS
	--------------------------------------------------------- */
	export function includes<T, InputIterator1 extends base.Iterator<T>, InputIterator2 extends base.Iterator<T>>
		(first1: InputIterator1, last1: InputIterator1, first2: InputIterator2, last2: InputIterator2): boolean;
	
	export function includes<T, InputIterator1 extends base.Iterator<T>, InputIterator2 extends base.Iterator<T>>
		(
			first1: InputIterator1, last1: InputIterator1, first2: InputIterator2, last2: InputIterator2,
			compare: (x: T, y: T) => boolean
		): boolean;

	export function includes<T, InputIterator1 extends base.Iterator<T>, InputIterator2 extends base.Iterator<T>>
		(
			first1: InputIterator1, last1: InputIterator1, first2: InputIterator2, last2: InputIterator2,
			compare: (x: T, y: T) => boolean = less
		): boolean
	{
		while (!first2.equals(last2))
		{
			if (first1.equals(last2) || compare(first2.value, first1.value))
				return false;
			else if (!compare(first1.value, first2.value))
				first2 = first2.next() as InputIterator2;

			first1 = first1.next() as InputIterator1;
		}

		return true;
	}

	export function set_union<T, 
			InputIterator1 extends base.Iterator<T>, 
			InputIterator2 extends base.Iterator<T>,
			OutputIterator extends base.ILinearIterator<T>>
		(
			first1: InputIterator1, last1: InputIterator1, first2: InputIterator2, last2: InputIterator2,
			result: OutputIterator
		): OutputIterator;

	export function set_union<T, 
			InputIterator1 extends base.Iterator<T>, 
			InputIterator2 extends base.Iterator<T>,
			OutputIterator extends base.ILinearIterator<T>>
		(
			first1: InputIterator1, last1: InputIterator1, first2: InputIterator2, last2: InputIterator2,
			result: OutputIterator, compare: (x: T, y: T) => boolean
		): OutputIterator;
	
	export function set_union<T, 
			InputIterator1 extends base.Iterator<T>, 
			InputIterator2 extends base.Iterator<T>,
			OutputIterator extends base.ILinearIterator<T>>
		(
			first1: InputIterator1, last1: InputIterator1, first2: InputIterator2, last2: InputIterator2,
			result: OutputIterator, compare: (x: T, y: T) => boolean = less
		): OutputIterator
	{
		while (true)
		{
			if (first1.equals(last1))
				return copy(first2, last2, result);
			else if (first2.equals(last2))
				return copy(first1, last1, result);

			if (compare(first1.value, first2.value))
			{
				result.value = first1.value;

				first1 = first1.next() as InputIterator1;
			}
			else if (compare(first2.value, first1.value))
			{
				result.value = first2.value;

				first2 = first2.next() as InputIterator2;
			}
			else 
			{// equals
				result.value = first1.value;

				first1 = first1.next() as InputIterator1;
				first2 = first2.next() as InputIterator2;
			}

			result = result.next() as OutputIterator;
		}
	}

	export function set_intersection<T, 
			InputIterator1 extends base.Iterator<T>, 
			InputIterator2 extends base.Iterator<T>,
			OutputIterator extends base.ILinearIterator<T>>
		(
			first1: InputIterator1, last1: InputIterator1, first2: InputIterator2, last2: InputIterator2,
			result: OutputIterator
		): OutputIterator;

	export function set_intersection<T, 
			InputIterator1 extends base.Iterator<T>, 
			InputIterator2 extends base.Iterator<T>,
			OutputIterator extends base.ILinearIterator<T>>
		(
			first1: InputIterator1, last1: InputIterator1, first2: InputIterator2, last2: InputIterator2,
			result: OutputIterator, compare: (x: T, y: T) => boolean
		): OutputIterator;

	export function set_intersection<T, 
			InputIterator1 extends base.Iterator<T>, 
			InputIterator2 extends base.Iterator<T>,
			OutputIterator extends base.ILinearIterator<T>>
		(
			first1: InputIterator1, last1: InputIterator1, first2: InputIterator2, last2: InputIterator2,
			result: OutputIterator, compare: (x: T, y: T) => boolean = less
		): OutputIterator
	{
		while (true)
		{
			if (first1.equals(last1))
				return copy(first2, last2, result);
			else if (first2.equals(last2))
				return copy(first1, last1, result);

			if (compare(first1.value, first2.value))
				first1 = first1.next() as InputIterator1;
			else if (compare(first2.value, first1.value))
				first2 = first2.next() as InputIterator2;
			else 
			{// equals
				result.value = first1.value;

				result = result.next() as OutputIterator;
				first1 = first1.next() as InputIterator1;
				first2 = first2.next() as InputIterator2;
			}
		}
	}

	export function set_difference<T, 
			InputIterator1 extends base.Iterator<T>, 
			InputIterator2 extends base.Iterator<T>,
			OutputIterator extends base.ILinearIterator<T>>
		(
			first1: InputIterator1, last1: InputIterator1, first2: InputIterator2, last2: InputIterator2,
			result: OutputIterator
		): OutputIterator;

	export function set_difference<T, 
			InputIterator1 extends base.Iterator<T>, 
			InputIterator2 extends base.Iterator<T>,
			OutputIterator extends base.ILinearIterator<T>>
		(
			first1: InputIterator1, last1: InputIterator1, first2: InputIterator2, last2: InputIterator2,
			result: OutputIterator, compare: (x: T, y: T) => boolean
		): OutputIterator;

	export function set_difference<T, 
			InputIterator1 extends base.Iterator<T>, 
			InputIterator2 extends base.Iterator<T>,
			OutputIterator extends base.ILinearIterator<T>>
		(
			first1: InputIterator1, last1: InputIterator1, first2: InputIterator2, last2: InputIterator2,
			result: OutputIterator, compare: (x: T, y: T) => boolean = less
		): OutputIterator
	{
		while (!first1.equals(last1) && !first2.equals(last2))
			if (less(first1.value, first2.value))
			{
				result.value = first1.value;

				result = result.next() as OutputIterator;
				first1 = first1.next() as InputIterator1;
			}
			else if (less(first2.value, first1.value))
				first2 = first2.next() as InputIterator2;
			else
			{
				first1 = first1.next() as InputIterator1;
				first2 = first2.next() as InputIterator2;
			}

		return copy(first1, last1, result);
	}

	export function set_symmetric_difference<T, 
			InputIterator1 extends base.Iterator<T>, 
			InputIterator2 extends base.Iterator<T>,
			OutputIterator extends base.ILinearIterator<T>>
		(
			first1: InputIterator1, last1: InputIterator1, first2: InputIterator2, last2: InputIterator2,
			result: OutputIterator
		): OutputIterator;

	export function set_symmetric_difference<T, 
			InputIterator1 extends base.Iterator<T>, 
			InputIterator2 extends base.Iterator<T>,
			OutputIterator extends base.ILinearIterator<T>>
		(
			first1: InputIterator1, last1: InputIterator1, first2: InputIterator2, last2: InputIterator2,
			result: OutputIterator, compare: (x: T, y: T) => boolean
		): OutputIterator;

	export function set_symmetric_difference<T, 
			InputIterator1 extends base.Iterator<T>, 
			InputIterator2 extends base.Iterator<T>,
			OutputIterator extends base.ILinearIterator<T>>
		(
			first1: InputIterator1, last1: InputIterator1, first2: InputIterator2, last2: InputIterator2,
			result: OutputIterator, compare: (x: T, y: T) => boolean = less
		): OutputIterator
	{
		while (true)
		{
			if (first1.equals(last1))
				return copy(first2, last2, result);
			else if (first2.equals(last2))
				return copy(first1, last1, result);

			if (compare(first1.value, first2.value))
			{
				result.value = first1.value;

				result = result.next() as OutputIterator;
				first1 = first1.next() as InputIterator1;
			}
			else if (compare(first2.value, first1.value))
			{
				result.value = first2.value;

				result = result.next() as OutputIterator;
				first2 = first2.next() as InputIterator2;
			}
			else 
			{// equals
				first1 = first1.next() as InputIterator1;
				first2 = first2.next() as InputIterator2;
			}
		}
	}
}