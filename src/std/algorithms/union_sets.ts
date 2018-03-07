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
			InputIterator1 extends Readonly<IForwardIterator<T, InputIterator1>>, 
			InputIterator2 extends Readonly<IForwardIterator<T, InputIterator2>>,
			OutputIterator extends Writeonly<IForwardIterator<T, OutputIterator>>>
		(
			first1: InputIterator1, last1: InputIterator1, first2: InputIterator2, last2: InputIterator2,
			result: OutputIterator
		): OutputIterator;

	export function merge<T, 
			InputIterator1 extends Readonly<IForwardIterator<T, InputIterator1>>, 
			InputIterator2 extends Readonly<IForwardIterator<T, InputIterator2>>,
			OutputIterator extends Writeonly<IForwardIterator<T, OutputIterator>>>
		(
			first1: InputIterator1, last1: InputIterator1, first2: InputIterator2, last2: InputIterator2,
			result: OutputIterator, compare: (x: T, y: T) => boolean
		): OutputIterator;

	export function merge<T, 
			InputIterator1 extends Readonly<IForwardIterator<T, InputIterator1>>, 
			InputIterator2 extends Readonly<IForwardIterator<T, InputIterator2>>,
			OutputIterator extends Writeonly<IForwardIterator<T, OutputIterator>>>
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
				first1 = first1.next();
			}
			else
			{
				result.value = first2.value;
				first2 = first2.next();
			}
			result = result.next();
		}
	}

	export function inplace_merge<T, ForwardIterator extends General<IForwardIterator<T, ForwardIterator>>>
		(first: ForwardIterator, middle: ForwardIterator, last: ForwardIterator): void;

	export function inplace_merge<T, ForwardIterator extends General<IForwardIterator<T, ForwardIterator>>>
		(
			first: ForwardIterator, middle: ForwardIterator, last: ForwardIterator,
			comp: (x: T, y: T) => boolean
		): void;

	export function inplace_merge<T, ForwardIterator extends General<IForwardIterator<T, ForwardIterator>>>
		(
			first: ForwardIterator, middle: ForwardIterator, last: ForwardIterator,
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
	export function includes<T, 
			InputIterator1 extends Readonly<IForwardIterator<T, InputIterator1>>, 
			InputIterator2 extends Readonly<IForwardIterator<T, InputIterator2>>>
		(first1: InputIterator1, last1: InputIterator1, first2: InputIterator2, last2: InputIterator2): boolean;
	
	export function includes<T, 
			InputIterator1 extends Readonly<IForwardIterator<T, InputIterator1>>, 
			InputIterator2 extends Readonly<IForwardIterator<T, InputIterator2>>>
		(
			first1: InputIterator1, last1: InputIterator1, first2: InputIterator2, last2: InputIterator2,
			compare: (x: T, y: T) => boolean
		): boolean;

	export function includes<T, 
			InputIterator1 extends Readonly<IForwardIterator<T, InputIterator1>>, 
			InputIterator2 extends Readonly<IForwardIterator<T, InputIterator2>>>
		(
			first1: InputIterator1, last1: InputIterator1, first2: InputIterator2, last2: InputIterator2,
			compare: (x: T, y: T) => boolean = less
		): boolean
	{
		while (!first2.equals(last2))
		{
			if (first1.equals(last1) || compare(first2.value, first1.value))
				return false;
			else if (!compare(first1.value, first2.value))
				first2 = first2.next();

			first1 = first1.next();
		}

		return true;
	}

	export function set_union<T, 
			InputIterator1 extends Readonly<IForwardIterator<T, InputIterator1>>, 
			InputIterator2 extends Readonly<IForwardIterator<T, InputIterator2>>,
			OutputIterator extends Writeonly<IForwardIterator<T, OutputIterator>>>
		(
			first1: InputIterator1, last1: InputIterator1, first2: InputIterator2, last2: InputIterator2,
			result: OutputIterator
		): OutputIterator;

	export function set_union<T, 
			InputIterator1 extends Readonly<IForwardIterator<T, InputIterator1>>, 
			InputIterator2 extends Readonly<IForwardIterator<T, InputIterator2>>,
			OutputIterator extends Writeonly<IForwardIterator<T, OutputIterator>>>
		(
			first1: InputIterator1, last1: InputIterator1, first2: InputIterator2, last2: InputIterator2,
			result: OutputIterator, compare: (x: T, y: T) => boolean
		): OutputIterator;
	
	export function set_union<T, 
			InputIterator1 extends Readonly<IForwardIterator<T, InputIterator1>>, 
			InputIterator2 extends Readonly<IForwardIterator<T, InputIterator2>>,
			OutputIterator extends Writeonly<IForwardIterator<T, OutputIterator>>>
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
				first1 = first1.next();
			}
			else if (compare(first2.value, first1.value))
			{
				result.value = first2.value;
				first2 = first2.next();
			}
			else 
			{// equals
				result.value = first1.value;

				first1 = first1.next();
				first2 = first2.next();
			}

			result = result.next();
		}
	}

	export function set_intersection<T, 
			InputIterator1 extends Readonly<IForwardIterator<T, InputIterator1>>, 
			InputIterator2 extends Readonly<IForwardIterator<T, InputIterator2>>,
			OutputIterator extends Writeonly<IForwardIterator<T, OutputIterator>>>
		(
			first1: InputIterator1, last1: InputIterator1, first2: InputIterator2, last2: InputIterator2,
			result: OutputIterator
		): OutputIterator;

	export function set_intersection<T, 
			InputIterator1 extends Readonly<IForwardIterator<T, InputIterator1>>, 
			InputIterator2 extends Readonly<IForwardIterator<T, InputIterator2>>,
			OutputIterator extends Writeonly<IForwardIterator<T, OutputIterator>>>
		(
			first1: InputIterator1, last1: InputIterator1, first2: InputIterator2, last2: InputIterator2,
			result: OutputIterator, compare: (x: T, y: T) => boolean
		): OutputIterator;

	export function set_intersection<T, 
			InputIterator1 extends Readonly<IForwardIterator<T, InputIterator1>>, 
			InputIterator2 extends Readonly<IForwardIterator<T, InputIterator2>>,
			OutputIterator extends Writeonly<IForwardIterator<T, OutputIterator>>>
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
				first1 = first1.next();
			else if (compare(first2.value, first1.value))
				first2 = first2.next();
			else 
			{// equals
				result.value = first1.value;

				result = result.next();
				first1 = first1.next();
				first2 = first2.next();
			}
		}
	}

	export function set_difference<T, 
			InputIterator1 extends Readonly<IForwardIterator<T, InputIterator1>>, 
			InputIterator2 extends Readonly<IForwardIterator<T, InputIterator2>>,
			OutputIterator extends Writeonly<IForwardIterator<T, OutputIterator>>>
		(
			first1: InputIterator1, last1: InputIterator1, first2: InputIterator2, last2: InputIterator2,
			result: OutputIterator
		): OutputIterator;

	export function set_difference<T, 
			InputIterator1 extends Readonly<IForwardIterator<T, InputIterator1>>, 
			InputIterator2 extends Readonly<IForwardIterator<T, InputIterator2>>,
			OutputIterator extends Writeonly<IForwardIterator<T, OutputIterator>>>
		(
			first1: InputIterator1, last1: InputIterator1, first2: InputIterator2, last2: InputIterator2,
			result: OutputIterator, comp: (x: T, y: T) => boolean
		): OutputIterator;

	export function set_difference<T, 
			InputIterator1 extends Readonly<IForwardIterator<T, InputIterator1>>, 
			InputIterator2 extends Readonly<IForwardIterator<T, InputIterator2>>,
			OutputIterator extends Writeonly<IForwardIterator<T, OutputIterator>>>
		(
			first1: InputIterator1, last1: InputIterator1, first2: InputIterator2, last2: InputIterator2,
			result: OutputIterator, comp: (x: T, y: T) => boolean = less
		): OutputIterator
	{
		while (!first1.equals(last1) && !first2.equals(last2))
			if (comp(first1.value, first2.value))
			{
				result.value = first1.value;

				result = result.next();
				first1 = first1.next();
			}
			else if (comp(first2.value, first1.value))
				first2 = first2.next();
			else
			{
				first1 = first1.next();
				first2 = first2.next();
			}

		return copy(first1, last1, result);
	}

	export function set_symmetric_difference<T, 
			InputIterator1 extends Readonly<IForwardIterator<T, InputIterator1>>, 
			InputIterator2 extends Readonly<IForwardIterator<T, InputIterator2>>,
			OutputIterator extends Writeonly<IForwardIterator<T, OutputIterator>>>
		(
			first1: InputIterator1, last1: InputIterator1, first2: InputIterator2, last2: InputIterator2,
			result: OutputIterator
		): OutputIterator;

	export function set_symmetric_difference<T, 
			InputIterator1 extends Readonly<IForwardIterator<T, InputIterator1>>, 
			InputIterator2 extends Readonly<IForwardIterator<T, InputIterator2>>,
			OutputIterator extends Writeonly<IForwardIterator<T, OutputIterator>>>
		(
			first1: InputIterator1, last1: InputIterator1, first2: InputIterator2, last2: InputIterator2,
			result: OutputIterator, compare: (x: T, y: T) => boolean
		): OutputIterator;

	export function set_symmetric_difference<T, 
			InputIterator1 extends Readonly<IForwardIterator<T, InputIterator1>>, 
			InputIterator2 extends Readonly<IForwardIterator<T, InputIterator2>>,
			OutputIterator extends Writeonly<IForwardIterator<T, OutputIterator>>>
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

				result = result.next();
				first1 = first1.next();
			}
			else if (compare(first2.value, first1.value))
			{
				result.value = first2.value;

				result = result.next();
				first2 = first2.next();
			}
			else 
			{// equals
				first1 = first1.next();
				first2 = first2.next();
			}
		}
	}
}