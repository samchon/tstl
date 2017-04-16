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
	/**
	 * Merge sorted ranges.
	 * 
	 * Combines the elements in the sorted ranges [<i>first1</i>, <i>last1</i>) and [<i>first2</i>, <i>last2</i>), into 
	 * a new range beginning at <i>result</i> with all its elements sorted.
	 * 
	 * The elements are compared using {@link less}. The elements in both ranges shall already be ordered according to 
	 * this same criterion ({@link less}). The resulting range is also sorted according to this.
	 * 
	 * @param first1 {@link base.Iterator Input iterator} to the initial position of the first sorted sequence.
	 * @param last1 {@link base.Iterator Input iterator} to the final position of the first sorted sequence. The range used is 
	 *				[<i>first1</i>, <i>last1</i>), which contains all the elements between <i>first1</i> and <i>last1</i>, 
	 *				including the element pointed by <i>first1</i> but not the element pointed by <i>last1</i>.
	 * @param first2 {@link base.Iterator Input iterator} to the initial position of the second sorted sequence.
	 * @param last2 {@link base.Iterator Input iterator} to the final position of the second sorted sequence. The range used is 
	 *				[<i>first2</i>, <i>last2</i>).
	 * @param result {@link base.Iterator Output iterator} to the initial position of the range where the resulting combined 
	 *				 range is stored. Its size is equal to the sum of both ranges above.
	 * 
	 * @return An iterator pointing to the past-the-end element in the resulting sequence.
	 */
	export function merge<T, 
			InputIterator1 extends base.Iterator<T>, InputIterator2 extends base.Iterator<T>,
			OutputIterator extends base.ILinearIterator<T>>
		(
			first1: InputIterator1, last1: InputIterator1, first2: InputIterator2, last2: InputIterator2,
			result: OutputIterator
		): OutputIterator;

	/**
	 * Merge sorted ranges.
	 * 
	 * Combines the elements in the sorted ranges [<i>first1</i>, <i>last1</i>) and [<i>first2</i>, <i>last2</i>), into 
	 * a new range beginning at <i>result</i> with all its elements sorted.
	 * 
	 * The elements are compared using {@link less}. The elements in both ranges shall already be ordered according to 
	 * this same criterion (<i>compare</i>). The resulting range is also sorted according to this.
	 * 
	 * @param first1 {@link base.Iterator Input iterator} to the initial position of the first sorted sequence.
	 * @param last1 {@link base.Iterator Input iterator} to the final position of the first sorted sequence. The range used is 
	 *				[<i>first1</i>, <i>last1</i>), which contains all the elements between <i>first1</i> and <i>last1</i>, 
	 *				including the element pointed by <i>first1</i> but not the element pointed by <i>last1</i>.
	 * @param first2 {@link base.Iterator Input iterator} to the initial position of the second sorted sequence.
	 * @param last2 {@link base.Iterator Input iterator} to the final position of the second sorted sequence. The range used is 
	 *				[<i>first2</i>, <i>last2</i>).
	 * @param result {@link base.Iterator Output iterator} to the initial position of the range where the resulting combined 
	 *				 range is stored. Its size is equal to the sum of both ranges above.
	 * @param compare Binary function that accepts two arguments of the types pointed by the iterators, and returns a value 
	 *				  convertible to <code>bool</code>. The value returned indicates whether the first argument is 
	 *				  considered to go before the second in the specific <i>strict weak ordering</i> it defines. The 
	 *				  function shall not modify any of its arguments.
	 * 
	 * @return An iterator pointing to the past-the-end element in the resulting sequence.
	 */
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

	/**
	 * Merge consecutive sorted ranges.
	 * 
	 * Merges two consecutive sorted ranges: [<i>first</i>, <i>middle</i>) and [<i>middle</i>, <i>last</i>), putting 
	 * the result into the combined sorted range [<i>first</i>, <i>last</i>).
	 * 
	 * The elements are compared using {@link less}. The elements in both ranges shall already be ordered according to 
	 * this same criterion ({@link less}). The resulting range is also sorted according to this.
	 * 
	 * The function preserves the relative order of elements with equivalent values, with the elements in the first 
	 * range preceding those equivalent in the second.
	 * 
	 * @param first {@link base.Iterator Bidirectional iterator} to the initial position in the first sorted sequence to merge. 
	 *				This is also the initial position where the resulting merged range is stored.
	 * @param middle {@link base.Iterator Bidirectional iterator} to the initial position of the second sorted sequence, which 
	 *				 because both sequences must be consecutive, matches the <i>past-the-end</i> position of the first 
	 *				 sequence.
	 * @param last {@link base.Iterator Bidirectional iterator} to the <i>past-the-end</i> position of the second sorted 
	 *			   sequence. This is also the <i>past-the-end</i> position of the range where the resulting merged range is 
	 *			   stored.
	 */
	export function inplace_merge<T, BidirectionalIterator extends base.Iterator<T>>
		(first: BidirectionalIterator, middle: BidirectionalIterator, last: BidirectionalIterator): void;

	/**
	 * Merge consecutive sorted ranges.
	 * 
	 * Merges two consecutive sorted ranges: [<i>first</i>, <i>middle</i>) and [<i>middle</i>, <i>last</i>), putting 
	 * the result into the combined sorted range [<i>first</i>, <i>last</i>).
	 * 
	 * The elements are compared using <i>compare</i>. The elements in both ranges shall already be ordered according 
	 * to this same criterion (<i>compare</i>). The resulting range is also sorted according to this.
	 * 
	 * The function preserves the relative order of elements with equivalent values, with the elements in the first 
	 * range preceding those equivalent in the second.
	 * 
	 * @param first {@link base.Iterator Bidirectional iterator} to the initial position in the first sorted sequence to merge. 
	 *				This is also the initial position where the resulting merged range is stored.
	 * @param middle {@link base.Iterator Bidirectional iterator} to the initial position of the second sorted sequence, which 
	 *				 because both sequences must be consecutive, matches the <i>past-the-end</i> position of the first 
	 *				 sequence.
	 * @param last {@link base.Iterator Bidirectional iterator} to the <i>past-the-end</i> position of the second sorted 
	 *			   sequence. This is also the <i>past-the-end</i> position of the range where the resulting merged range is 
	 *			   stored.
	 * @param compare Binary function that accepts two arguments of the types pointed by the iterators, and returns a value 
	 *				  convertible to <code>bool</code>. The value returned indicates whether the first argument is 
	 *				  considered to go before the second in the specific <i>strict weak ordering</i> it defines. The 
	 *				  function shall not modify any of its arguments.
	 */
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
	/**
	 * Test whether sorted range includes another sorted range.
	 * 
	 * Returns <code>true</code> if the sorted range [<i>first1</i>, <i>last1</i>) contains all the elements in the 
	 * sorted range [<i>first2</i>, <i>last2</i>).
	 * 
	 * The elements are compared using {@link less}. Two elements, <i>x</i> and <i>y</i> are considered equivalent 
	 * <code>if (!less(x, y) && !less(y, x))</code>.
	 * 
	 * The elements in the range shall already be ordered according to this same criterion ({@link less}).
	 * 
	 * @param first1 {@link base.Iterator Input iterator} to the initial position of the first sorted sequence.
	 * @param last1 {@link base.Iterator Input iterator} to the final position of the first sorted sequence (which is tested on 
	 *				whether it contains the second sequence). The range used is [<i>first1</i>, <i>last1</i>), which 
	 *				contains all the elements between <i>first1</i> and <i>last1</i>, including the element pointed by 
	 *				<i>first1</i> but not the element pointed by <i>last1</i>.
	 * @param first2 {@link base.Iterator Input iterator} to the initial position of the second sorted sequence.
	 * @param last2 {@link base.Iterator Input iterator} to the final position of the second sorted sequence. (which is tested 
	 *				on whether it is contained in the first sequence). The range used is [<i>first2</i>, <i>last2</i>).
	 * 
	 * @return <code>true</code> if every element in the range [<i>first2</i>, <i>last2</i>) is contained in the range 
	 *		   [<i>first1</i>, <i>last1</i>), <code>false</code> otherwise. If [<i>first2</i>, <i>last2</i>) is an empty 
	 *		   range, the function returns <code>true</code>.
	 */
	export function includes<T, InputIterator1 extends base.Iterator<T>, InputIterator2 extends base.Iterator<T>>
		(first1: InputIterator1, last1: InputIterator1, first2: InputIterator2, last2: InputIterator2): boolean;
	
	/**
	 * Test whether sorted range includes another sorted range.
	 * 
	 * Returns <code>true</code> if the sorted range [<i>first1</i>, <i>last1</i>) contains all the elements in the 
	 * sorted range [<i>first2</i>, <i>last2</i>).
	 * 
	 * The elements are compared using <i>compare</i>. Two elements, <i>x</i> and <i>y</i> are considered equivalent 
	 * <code>if (!compare(x, y) && !compare(y, x))</code>.
	 * 
	 * The elements in the range shall already be ordered according to this same criterion (<i>compare</i>).
	 * 
	 * @param first1 {@link base.Iterator Input iterator} to the initial position of the first sorted sequence.
	 * @param last1 {@link base.Iterator Input iterator} to the final position of the first sorted sequence (which is tested on 
	 *				whether it contains the second sequence). The range used is [<i>first1</i>, <i>last1</i>), which 
	 *				contains all the elements between <i>first1</i> and <i>last1</i>, including the element pointed by 
	 *				<i>first1</i> but not the element pointed by <i>last1</i>.
	 * @param first2 {@link base.Iterator Input iterator} to the initial position of the second sorted sequence.
	 * @param last2 {@link base.Iterator Input iterator} to the final position of the second sorted sequence. (which is tested 
	 *				on whether it is contained in the first sequence). The range used is [<i>first2</i>, <i>last2</i>).
	 * @param compare Binary function that accepts two elements as arguments (one from each of the two sequences, in the 
	 *				  same order), and returns a value convertible to <code>bool</code>. The value returned indicates 
	 *				  whether the element passed as first argument is considered to go before the second in the specific 
	 *				  <i>strict weak ordering</i> it defines. The function shall not modify any of its arguments.
	 * 
	 * @return <code>true</code> if every element in the range [<i>first2</i>, <i>last2</i>) is contained in the range 
	 *		   [<i>first1</i>, <i>last1</i>), <code>false</code> otherwise. If [<i>first2</i>, <i>last2</i>) is an empty 
	 *		   range, the function returns <code>true</code>.
	 */
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

	/**
	 * Union of two sorted ranges.
	 * 
	 * Constructs a sorted range beginning in the location pointed by <i>result</i> with the <i>set union</i> of the 
	 * two sorted ranges [<i>first1</i>, <i>last1</i>) and [<i>first2</i>, <i>last2</i>).
	 * 
	 * The <i>union</i> of two sets is formed by the elements that are present in either one of the sets, or in both. 
	 * Elements from the second range that have an equivalent element in the first range are not copied to the resulting 
	 * range.
	 * 
	 * The elements are compared using {@link less}. Two elements, <i>x</i> and <i>y</i> are considered equivalent 
	 * <code>if (!less(x, y) && !less(y, x))</code>.
	 * 
	 * The elements in the ranges shall already be ordered according to this same criterion ({@link less}). The 
	 * resulting range is also sorted according to this.
	 * 
	 * @param first1 {@link base.Iterator Input iterator} to the initial position of the first sorted sequence.
	 * @param last1 {@link base.Iterator Input iterator} to the final position of the first sorted sequence. The range used is
	 *				[<i>first1</i>, <i>last1</i>), which contains all the elements between <i>first1</i> and <i>last1</i>,
	 *				including the element pointed by <i>first1</i> but not the element pointed by <i>last1</i>.
	 * @param first2 {@link base.Iterator Input iterator} to the initial position of the second sorted sequence.
	 * @param last2 {@link base.Iterator Input iterator} to the final position of the second sorted sequence. The range used is
	 *				[<i>first2</i>, <i>last2</i>).
	 * @param result {@link base.Iterator Output iterator} to the initial position of the range where the resulting sequence is 
	 *				 stored. The pointed type shall support being assigned the value of an element from the other ranges.
	 * 
	 * @return An iterator to the end of the constructed range.
	 */
	export function set_union<T, 
			InputIterator1 extends base.Iterator<T>, 
			InputIterator2 extends base.Iterator<T>,
			OutputIterator extends base.ILinearIterator<T>>
		(
			first1: InputIterator1, last1: InputIterator1, first2: InputIterator2, last2: InputIterator2,
			result: OutputIterator
		): OutputIterator;

	/**
	 * Union of two sorted ranges.
	 * 
	 * Constructs a sorted range beginning in the location pointed by <i>result</i> with the <i>set union</i> of the 
	 * two sorted ranges [<i>first1</i>, <i>last1</i>) and [<i>first2</i>, <i>last2</i>).
	 * 
	 * The <i>union</i> of two sets is formed by the elements that are present in either one of the sets, or in both. 
	 * Elements from the second range that have an equivalent element in the first range are not copied to the resulting 
	 * range.
	 * 
	 * The elements are compared using <i>compare</i>. Two elements, <i>x</i> and <i>y</i> are considered equivalent 
	 * <code>if (!compare(x, y) && !compare(y, x))</code>.
	 * 
	 * The elements in the ranges shall already be ordered according to this same criterion (<i>compare</i>). The 
	 * resulting range is also sorted according to this.
	 * 
	 * @param first1 {@link base.Iterator Input iterator} to the initial position of the first sorted sequence.
	 * @param last1 {@link base.Iterator Input iterator} to the final position of the first sorted sequence. The range used is
	 *				[<i>first1</i>, <i>last1</i>), which contains all the elements between <i>first1</i> and <i>last1</i>,
	 *				including the element pointed by <i>first1</i> but not the element pointed by <i>last1</i>.
	 * @param first2 {@link base.Iterator Input iterator} to the initial position of the second sorted sequence.
	 * @param last2 {@link base.Iterator Input iterator} to the final position of the second sorted sequence. The range used is
	 *				[<i>first2</i>, <i>last2</i>).
	 * @param result {@link base.Iterator Output iterator} to the initial position of the range where the resulting sequence is 
	 *				 stored. The pointed type shall support being assigned the value of an element from the other ranges.
	 * @param compare Binary function that accepts two arguments of the types pointed by the input iterators, and returns a 
	 *				  value convertible to <code>bool</code>. The value returned indicates whether the first argument is 
	 *				  considered to go before the second in the specific <i>strict weak ordering</i> it defines. The 
	 *				  function shall not modify any of its arguments.
	 * 
	 * @return An iterator to the end of the constructed range.
	 */
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

	/**
	 * Intersection of two sorted ranges.
	 * 
	 * Constructs a sorted range beginning in the location pointed by <i>result</i> with the <i>set intersection</i> of 
	 * the two sorted ranges [<i>first1</i>, <i>last1</i>) and [<i>first2</i>, <i>last2</i>).
	 * 
	 * The <i>intersection</i> of two sets is formed only by the elements that are present in both sets. The elements 
	 * copied by the function come always from the first range, in the same order.
	 * 
	 * The elements are compared using {@link less}. Two elements, <i>x</i> and <i>y</i> are considered equivalent 
	 * <code>if (!less(x, y) && !less(y, x))</code>.
	 * 
	 * The elements in the ranges shall already be ordered according to this same criterion ({@link less}). The 
	 * resulting range is also sorted according to this.
	 * 
	 * @param first1 {@link base.Iterator Input iterator} to the initial position of the first sorted sequence.
	 * @param last1 {@link base.Iterator Input iterator} to the final position of the first sorted sequence. The range used is
	 *				[<i>first1</i>, <i>last1</i>), which contains all the elements between <i>first1</i> and <i>last1</i>,
	 *				including the element pointed by <i>first1</i> but not the element pointed by <i>last1</i>.
	 * @param first2 {@link base.Iterator Input iterator} to the initial position of the second sorted sequence.
	 * @param last2 {@link base.Iterator Input iterator} to the final position of the second sorted sequence. The range used is
	 *				[<i>first2</i>, <i>last2</i>).
	 * @param result {@link base.Iterator Output iterator} to the initial position of the range where the resulting sequence is
	 *				 stored. The pointed type shall support being assigned the value of an element from the first range.
	 *
	 * @return An iterator to the end of the constructed range.
	 */
	export function set_intersection<T, 
			InputIterator1 extends base.Iterator<T>, 
			InputIterator2 extends base.Iterator<T>,
			OutputIterator extends base.ILinearIterator<T>>
		(
			first1: InputIterator1, last1: InputIterator1, first2: InputIterator2, last2: InputIterator2,
			result: OutputIterator
		): OutputIterator;

	/**
	 * Intersection of two sorted ranges.
	 * 
	 * Constructs a sorted range beginning in the location pointed by <i>result</i> with the <i>set intersection</i> of 
	 * the two sorted ranges [<i>first1</i>, <i>last1</i>) and [<i>first2</i>, <i>last2</i>).
	 * 
	 * The <i>intersection</i> of two sets is formed only by the elements that are present in both sets. The elements 
	 * copied by the function come always from the first range, in the same order.
	 * 
	 * The elements are compared using <i>compare</i>. Two elements, <i>x</i> and <i>y</i> are considered equivalent 
	 * <code>if (!compare(x, y) && !compare(y, x))</code>.
	 * 
	 * The elements in the ranges shall already be ordered according to this same criterion (<i>compare</i>). The
	 * resulting range is also sorted according to this.
	 * 
	 * @param first1 {@link base.Iterator Input iterator} to the initial position of the first sorted sequence.
	 * @param last1 {@link base.Iterator Input iterator} to the final position of the first sorted sequence. The range used is
	 *				[<i>first1</i>, <i>last1</i>), which contains all the elements between <i>first1</i> and <i>last1</i>,
	 *				including the element pointed by <i>first1</i> but not the element pointed by <i>last1</i>.
	 * @param first2 {@link base.Iterator Input iterator} to the initial position of the second sorted sequence.
	 * @param last2 {@link base.Iterator Input iterator} to the final position of the second sorted sequence. The range used is
	 *				[<i>first2</i>, <i>last2</i>).
	 * @param result {@link base.Iterator Output iterator} to the initial position of the range where the resulting sequence is
	 *				 stored. The pointed type shall support being assigned the value of an element from the first range.
	 * @param compare Binary function that accepts two arguments of the types pointed by the input iterators, and returns a
	 *				  value convertible to <code>bool</code>. The value returned indicates whether the first argument is
	 *				  considered to go before the second in the specific <i>strict weak ordering</i> it defines. The
	 *				  function shall not modify any of its arguments.
	 *
	 * @return An iterator to the end of the constructed range.
	 */
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

	/**
	 * Difference of two sorted ranges.
	 * 
	 * Constructs a sorted range beginning in the location pointed by <i>result</i> with the <i>set difference</i> of 
	 * the sorted range [<i>first1</i>, <i>last1</i>) with respect to the sorted range [<i>first2</i>, <i>last2</i>).
	 * 
	 * The <i>difference</i> of two sets is formed by the elements that are present in the first set, but not in the 
	 * second one. The elements copied by the function come always from the first range, in the same order.
	 * 
	 * For containers supporting multiple occurrences of a value, the <i>difference</i> includes as many occurrences of 
	 * a given value as in the first range, minus the amount of matching elements in the second, preserving order.
	 * 
	 * Notice that this is a directional operation - for a symmetrical equivalent, see {@link set_symmetric_difference}. 
	 * 
	 * The elements are compared using {@link less}. Two elements, <i>x</i> and <i>y</i> are considered equivalent 
	 * <code>if (!less(x, y) && !less(y, x))</code>.
	 * 
	 * The elements in the ranges shall already be ordered according to this same criterion ({@link less}). The 
	 * resulting range is also sorted according to this.
	 * 
	 * @param first1 {@link base.Iterator Input iterator} to the initial position of the first sorted sequence.
	 * @param last1 {@link base.Iterator Input iterator} to the final position of the first sorted sequence. The range used is
	 *				[<i>first1</i>, <i>last1</i>), which contains all the elements between <i>first1</i> and <i>last1</i>,
	 *				including the element pointed by <i>first1</i> but not the element pointed by <i>last1</i>.
	 * @param first2 {@link base.Iterator Input iterator} to the initial position of the second sorted sequence.
	 * @param last2 {@link base.Iterator Input iterator} to the final position of the second sorted sequence. The range used is
	 *				[<i>first2</i>, <i>last2</i>).
	 * @param result {@link base.Iterator Output iterator} to the initial position of the range where the resulting sequence is
	 *				 stored. The pointed type shall support being assigned the value of an element from the first range.
	 * 
	 * @return An iterator to the end of the constructed range.
	 */
	export function set_difference<T, 
			InputIterator1 extends base.Iterator<T>, 
			InputIterator2 extends base.Iterator<T>,
			OutputIterator extends base.ILinearIterator<T>>
		(
			first1: InputIterator1, last1: InputIterator1, first2: InputIterator2, last2: InputIterator2,
			result: OutputIterator
		): OutputIterator;

	/**
	 * Difference of two sorted ranges.
	 * 
	 * Constructs a sorted range beginning in the location pointed by <i>result</i> with the <i>set difference</i> of 
	 * the sorted range [<i>first1</i>, <i>last1</i>) with respect to the sorted range [<i>first2</i>, <i>last2</i>).
	 * 
	 * The <i>difference</i> of two sets is formed by the elements that are present in the first set, but not in the 
	 * second one. The elements copied by the function come always from the first range, in the same order.
	 * 
	 * For containers supporting multiple occurrences of a value, the <i>difference</i> includes as many occurrences of 
	 * a given value as in the first range, minus the amount of matching elements in the second, preserving order.
	 * 
	 * Notice that this is a directional operation - for a symmetrical equivalent, see {@link set_symmetric_difference}. 
	 * 
	 * The elements are compared using <i>compare</i>. Two elements, <i>x</i> and <i>y</i> are considered equivalent 
	 * <code>if (!compare(x, y) && !compare(y, x))</code>.
	 * 
	 * The elements in the ranges shall already be ordered according to this same criterion (<i>compare</i>). The
	 * resulting range is also sorted according to this.
	 * 
	 * @param first1 {@link base.Iterator Input iterator} to the initial position of the first sorted sequence.
	 * @param last1 {@link base.Iterator Input iterator} to the final position of the first sorted sequence. The range used is
	 *				[<i>first1</i>, <i>last1</i>), which contains all the elements between <i>first1</i> and <i>last1</i>,
	 *				including the element pointed by <i>first1</i> but not the element pointed by <i>last1</i>.
	 * @param first2 {@link base.Iterator Input iterator} to the initial position of the second sorted sequence.
	 * @param last2 {@link base.Iterator Input iterator} to the final position of the second sorted sequence. The range used is
	 *				[<i>first2</i>, <i>last2</i>).
	 * @param result {@link base.Iterator Output iterator} to the initial position of the range where the resulting sequence is
	 *				 stored. The pointed type shall support being assigned the value of an element from the first range.
	 * @param compare Binary function that accepts two arguments of the types pointed by the input iterators, and returns a
	 *				  value convertible to <code>bool</code>. The value returned indicates whether the first argument is
	 *				  considered to go before the second in the specific <i>strict weak ordering</i> it defines. The
	 *				  function shall not modify any of its arguments.
	 * 
	 * @return An iterator to the end of the constructed range.
	 */
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

	/**
	 * Symmetric difference of two sorted ranges.
	 * 
	 * Constructs a sorted range beginning in the location pointed by0 <i>result</i> with the set 
	 * <i>symmetric difference</i> of the two sorted ranges [<i>first1</i>, <i>last1</i>) and [<i>first2</i>, <i>last2</i>). 
	 * 
	 * The <i>symmetric difference</i> of two sets is formed by the elements that are present in one of the sets, but 
	 * not in the other. Among the equivalent elements in each range, those discarded are those that appear before in the 
	 * existent order before the call. The existing order is also preserved for the copied elements.
	 * 
	 * The elements are compared using {@link less}. Two elements, <i>x</i> and <i>y</i> are considered equivalent 
	 * <code>if (!less(x, y) && !less(y, x))</code>.
	 * 
	 * The elements in the ranges shall already be ordered according to this same criterion ({@link less}). The 
	 * resulting range is also sorted according to this.
	 * 
	 * @param first1 {@link base.Iterator Input iterator} to the initial position of the first sorted sequence.
	 * @param last1 {@link base.Iterator Input iterator} to the final position of the first sorted sequence. The range used is
	 *				[<i>first1</i>, <i>last1</i>), which contains all the elements between <i>first1</i> and <i>last1</i>,
	 *				including the element pointed by <i>first1</i> but not the element pointed by <i>last1</i>.
	 * @param first2 {@link base.Iterator Input iterator} to the initial position of the second sorted sequence.
	 * @param last2 {@link base.Iterator Input iterator} to the final position of the second sorted sequence. The range used is
	 *				[<i>first2</i>, <i>last2</i>).
	 * @param result {@link base.Iterator Output iterator} to the initial position of the range where the resulting sequence is
	 *				 stored. The pointed type shall support being assigned the value of an element from the other ranges.
	 * @param compare Binary function that accepts two arguments of the types pointed by the input iterators, and returns a
	 *				  value convertible to <code>bool</code>. The value returned indicates whether the first argument is
	 *				  considered to go before the second in the specific <i>strict weak ordering</i> it defines. The
	 *				  function shall not modify any of its arguments.
	 *
	 * @return An iterator to the end of the constructed range.
	 */
	export function set_symmetric_difference<T, 
			InputIterator1 extends base.Iterator<T>, 
			InputIterator2 extends base.Iterator<T>,
			OutputIterator extends base.ILinearIterator<T>>
		(
			first1: InputIterator1, last1: InputIterator1, first2: InputIterator2, last2: InputIterator2,
			result: OutputIterator
		): OutputIterator;

	/**
	 * Symmetric difference of two sorted ranges.
	 *
	 * Constructs a sorted range beginning in the location pointed by0 <i>result</i> with the set
	 * <i>symmetric difference</i> of the two sorted ranges [<i>first1</i>, <i>last1</i>) and [<i>first2</i>, <i>last2</i>).
	 *
	 * The <i>symmetric difference</i> of two sets is formed by the elements that are present in one of the sets, but
	 * not in the other. Among the equivalent elements in each range, those discarded are those that appear before in the
	 * existent order before the call. The existing order is also preserved for the copied elements.
	 *
	 * The elements are compared using <i>compare</i>. Two elements, <i>x</i> and <i>y</i> are considered equivalent
	 * <code>if (!compare(x, y) && !compare(y, x))</code>.
	 *
	 * The elements in the ranges shall already be ordered according to this same criterion (<i>compare</i>). The
	 * resulting range is also sorted according to this.
	 * 
	 * @param first1 {@link base.Iterator Input iterator} to the initial position of the first sorted sequence.
	 * @param last1 {@link base.Iterator Input iterator} to the final position of the first sorted sequence. The range used is
	 *				[<i>first1</i>, <i>last1</i>), which contains all the elements between <i>first1</i> and <i>last1</i>,
	 *				including the element pointed by <i>first1</i> but not the element pointed by <i>last1</i>.
	 * @param first2 {@link base.Iterator Input iterator} to the initial position of the second sorted sequence.
	 * @param last2 {@link base.Iterator Input iterator} to the final position of the second sorted sequence. The range used is
	 *				[<i>first2</i>, <i>last2</i>).
	 * @param result {@link base.Iterator Output iterator} to the initial position of the range where the resulting sequence is
	 *				 stored. The pointed type shall support being assigned the value of an element from the other ranges.
	 * @param compare Binary function that accepts two arguments of the types pointed by the input iterators, and returns a
	 *				  value convertible to <code>bool</code>. The value returned indicates whether the first argument is
	 *				  considered to go before the second in the specific <i>strict weak ordering</i> it defines. The
	 *				  function shall not modify any of its arguments.
	 *
	 * @return An iterator to the end of the constructed range.
	 */
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