/// <reference path="../API.ts" />

namespace std
{
	/* =========================================================
		BINARY SEARCH
	========================================================= */
	/**
	 * Return iterator to lower bound.
	 * 
	 * Returns an iterator pointing to the first element in the range [<i>first</i>, <i>last</i>) which does not 
	 * compare less than <i>val</i>.
	 * 
	 * The elements are compared using {@link less}. The elements in the range shall already be {@link is_sorted sorted} 
	 * according to this same criterion ({@link less}), or at least {@link is_partitioned partitioned} with respect to 
	 * <i>val</i>.
	 * 
	 * The function optimizes the number of comparisons performed by comparing non-consecutive elements of the sorted 
	 * range, which is specially efficient for {@link IArrayIterator random-access iterators}.
	 * 
	 * Unlike {@link upper_bound}, the value pointed by the iterator returned by this function may also be equivalent 
	 * to <i>val</i>, and not only greater.
	 * 
	 * @param first {@link base.Iterator Forward iterator} to the initial position of a {@link is_sorted sorted} (or properly 
	 *				{@link is_partitioned partitioned}) sequence.
	 * @param last {@link base.Iterator Forward iterator} to the final position of a {@link is_sorted sorted} (or properly
	 *			   {@link is_partitioned partitioned}) sequence. The range used is [<i>first</i>, <i>last</i>), which 
	 *			   contains all the elements between <i>first</i> and <i>last</i>, including the element pointed by 
	 *			   <i>first</i> but not the element pointed by <i>last</i>.
	 * @param val Value of the lower bound to search for in the range. <i>T</i> shall be a type supporting being compared 
	 *			  with elements of the range [<i>first</i>, <i>last</i>) as the left-hand side operand of {@link less}.
	 * 
	 * @return An iterator to the lower bound of <i>val</i> in the range. If all the element in the range compare less than 
	 *		   <i>val</i>, the function returns <i>last</i>.
	 */
	export function lower_bound<T, ForwardIterator extends base.Iterator<T>>
		(first: ForwardIterator, last: ForwardIterator, val: T): ForwardIterator;

	/**
	 * Return iterator to lower bound.
	 *
	 * Returns an iterator pointing to the first element in the range [<i>first</i>, <i>last</i>) which does not
	 * compare less than <i>val</i>.
	 *
	 * The elements are compared using <i>compare</i>. The elements in the range shall already be 
	 * {@link is_sorted sorted} according to this same criterion (<i>compare</i>), or at least 
	 * {@link is_partitioned partitioned} with respect to <i>val</i>.
	 *
	 * The function optimizes the number of comparisons performed by comparing non-consecutive elements of the sorted
	 * range, which is specially efficient for {@link IArrayIterator random-access iterators}.
	 *
	 * Unlike {@link upper_bound}, the value pointed by the iterator returned by this function may also be equivalent
	 * to <i>val</i>, and not only greater.
	 * 
	 * @param first {@link base.Iterator Forward iterator} to the initial position of a {@link is_sorted sorted} (or properly 
	 *				{@link is_partitioned partitioned}) sequence.
	 * @param last {@link base.Iterator Forward iterator} to the final position of a {@link is_sorted sorted} (or properly
	 *			   {@link is_partitioned partitioned}) sequence. The range used is [<i>first</i>, <i>last</i>), which 
	 *			   contains all the elements between <i>first</i> and <i>last</i>, including the element pointed by 
	 *			   <i>first</i> but not the element pointed by <i>last</i>.
	 * @param val Value of the lower bound to search for in the range.
	 * @param compare Binary function that accepts two arguments (the first of the type pointed by <i>ForwardIterator</i>, 
	 *				  and the second, always <i>val</i>), and returns a value convertible to <code>bool</code>. The value 
	 *				  returned indicates whether the first argument is considered to go before the second. The function 
	 *				  shall not modify any of its arguments.
	 * 
	 * @return An iterator to the lower bound of <i>val</i> in the range. If all the element in the range compare less than
	 *		   <i>val</i>, the function returns <i>last</i>.
	 */
	export function lower_bound<T, ForwardIterator extends base.Iterator<T>>
		(
			first: ForwardIterator, last: ForwardIterator, val: T, 
			compare: (x: T, y: T) => boolean
		): ForwardIterator;

	export function lower_bound<T, ForwardIterator extends base.Iterator<T>>
		(
			first: ForwardIterator, last: ForwardIterator, val: T, 
			compare: (x: T, y: T) => boolean = less
		): ForwardIterator
	{
		let count: number = distance(first, last);

		while (count > 0)
		{
			let step: number = Math.floor(count / 2);
			let it: ForwardIterator = first.advance(step) as ForwardIterator;

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

	/**
	 * Return iterator to upper bound.
	 * 
	 * Returns an iterator pointing to the first element in the range [<i>first</i>, <i>last</i>) which compares 
	 * greater than <i>val</i>.
	 * 
	 * The elements are compared using {@link less}. The elements in the range shall already be {@link is_sorted sorted} 
	 * according to this same criterion ({@link less}), or at least {@link is_partitioned partitioned} with respect to 
	 * <i>val</i>.
	 * 
	 * The function optimizes the number of comparisons performed by comparing non-consecutive elements of the sorted 
	 * range, which is specially efficient for {@link IArrayIterator random-access iterators}.
	 * 
	 * Unlike {@link lower_bound}, the value pointed by the iterator returned by this function cannot be equivalent to 
	 * <i>val</i>, only greater.
	 * 
	 * @param first {@link base.Iterator Forward iterator} to the initial position of a {@link is_sorted sorted} (or properly 
	 *				{@link is_partitioned partitioned}) sequence.
	 * @param last {@link base.Iterator Forward iterator} to the final position of a {@link is_sorted sorted} (or properly
	 *			   {@link is_partitioned partitioned}) sequence. The range used is [<i>first</i>, <i>last</i>), which 
	 *			   contains all the elements between <i>first</i> and <i>last</i>, including the element pointed by 
	 *			   <i>first</i> but not the element pointed by <i>last</i>.
	 * @param val Value of the lower bound to search for in the range. <i>T</i> shall be a type supporting being compared
	 *			  with elements of the range [<i>first</i>, <i>last</i>) as the left-hand side operand of {@link less}.
	 * 
	 * @return An iterator to the upper bound of <i>val</i> in the range. If no element in the range comparse greater than 
	 *		   <i>val</i>, the function returns <i>last</i>.
	 */
	export function upper_bound<T, ForwardIterator extends base.Iterator<T>>
		(first: ForwardIterator, last: ForwardIterator, val: T): ForwardIterator;

	/**
	 * Return iterator to upper bound.
	 *
	 * Returns an iterator pointing to the first element in the range [<i>first</i>, <i>last</i>) which compares
	 * greater than <i>val</i>.
	 *
	 * The elements are compared using <i>compare</i>. The elements in the range shall already be 
	 * {@link is_sorted sorted} according to this same criterion (<i>compare</i>), or at least 
	 * {@link is_partitioned partitioned} with respect to <i>val</i>.
	 *
	 * The function optimizes the number of comparisons performed by comparing non-consecutive elements of the sorted
	 * range, which is specially efficient for {@link IArrayIterator random-access iterators}.
	 *
	 * Unlike {@link lower_bound}, the value pointed by the iterator returned by this function cannot be equivalent to
	 * <i>val</i>, only greater.
	 *
	 * @param first {@link base.Iterator Forward iterator} to the initial position of a {@link is_sorted sorted} (or properly 
	 *				{@link is_partitioned partitioned}) sequence.
	 * @param last {@link base.Iterator Forward iterator} to the final position of a {@link is_sorted sorted} (or properly
	 *			   {@link is_partitioned partitioned}) sequence. The range used is [<i>first</i>, <i>last</i>), which 
	 *			   contains all the elements between <i>first</i> and <i>last</i>, including the element pointed by 
	 *			   <i>first</i> but not the element pointed by <i>last</i>.
	 * @param val Value of the lower bound to search for in the range.
	 * @param compare Binary function that accepts two arguments (the first of the type pointed by <i>ForwardIterator</i>, 
	 *				  and the second, always <i>val</i>), and returns a value convertible to <code>bool</code>. The value 
	 *				  returned indicates whether the first argument is considered to go before the second. The function 
	 *				  shall not modify any of its arguments.
	 * 
	 * @return An iterator to the upper bound of <i>val</i> in the range. If no element in the range comparse greater than
	 *		   <i>val</i>, the function returns <i>last</i>.
	 */
	export function upper_bound<T, ForwardIterator extends base.Iterator<T>>
		(
			first: ForwardIterator, last: ForwardIterator, val: T,
			compare: (x: T, y: T) => boolean
		): ForwardIterator;

	export function upper_bound<T, ForwardIterator extends base.Iterator<T>>
		(
			first: ForwardIterator, last: ForwardIterator, val: T,
			compare: (x: T, y: T) => boolean = less
		): ForwardIterator
	{
		let count: number = distance(first, last);
		
		while (count > 0)
		{
			let step: number = Math.floor(count / 2);
			let it: ForwardIterator = first.advance(step) as ForwardIterator;

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

	/**
	 * Get subrange of equal elements.
	 * 
	 * Returns the bounds of the subrange that includes all the elements of the range [<i>first</i>, <i>last</i>) with
	 * values equivalent to <i>val</i>.
	 * 
	 * The elements are compared using {@link less}. Two elements, <i>ax/i> and <i>y</i> are considered equivalent 
	 * <code>if (!less(x, y) && !less(y, x))</code>.
	 * 
	 * The elements in the range shall already be {@link is_sorted sorted} according to this same criterion 
	 * ({@link less}), or at least {@link is_partitioned partitioned} with respect to <i>val</i>.
	 * 
	 * If <i>val</i> is not equivalent to any value in the range, the subrange returned has a length of zero, with both 
	 * iterators pointing to the nearest value greater than <i>val</i>, if any, or to <i>last</i>, if <i>val</i> compares 
	 * greater than all the elements in the range.
	 * 
	 * @param first {@link base.Iterator Forward iterator} to the initial position of a {@link is_sorted sorted} (or properly
	 *				{@link is_partitioned partitioned}) sequence.
	 * @param last {@link base.Iterator Forward iterator} to the final position of a {@link is_sorted sorted} (or properly
	 *			   {@link is_partitioned partitioned}) sequence. The range used is [<i>first</i>, <i>last</i>), which
	 *			   contains all the elements between <i>first</i> and <i>last</i>, including the element pointed by
	 *			   <i>first</i> but not the element pointed by <i>last</i>.
	 * @param val Value of the lower bound to search for in the range. <i>T</i> shall be a type supporting being compared
	 *			  with elements of the range [<i>first</i>, <i>last</i>) as the left-hand side operand of {@link less}.
	 * 
	 * @return A {@link Pair} object, whose member {@link Pair.first} is an iterator to the lower bound of the subrange of 
	 *		   equivalent values, and {@link Pair.second} its upper bound. The values are the same as those that would be 
	 *		   returned by functions {@link lower_bound} and {@link upper_bound} respectively.
	 */
	export function equal_range<T, ForwardIterator extends base.Iterator<T>>
		(first: ForwardIterator, last: ForwardIterator, val: T): Pair<ForwardIterator, ForwardIterator>

	/**
	 * Get subrange of equal elements.
	 * 
	 * Returns the bounds of the subrange that includes all the elements of the range [<i>first</i>, <i>last</i>) with
	 * values equivalent to <i>val</i>.
	 * 
	 * The elements are compared using <i>compare</i>. Two elements, <i>ax/i> and <i>y</i> are considered equivalent 
	 * <code>if (!compare(x, y) && !compare(y, x))</code>.
	 * 
	 * The elements in the range shall already be {@link is_sorted sorted} according to this same criterion 
	 * (<i>compare</i>), or at least {@link is_partitioned partitioned} with respect to <i>val</i>.
	 * 
	 * If <i>val</i> is not equivalent to any value in the range, the subrange returned has a length of zero, with both 
	 * iterators pointing to the nearest value greater than <i>val</i>, if any, or to <i>last</i>, if <i>val</i> compares 
	 * greater than all the elements in the range.
	 * 
	 * @param first {@link base.Iterator Forward iterator} to the initial position of a {@link is_sorted sorted} (or properly
	 *				{@link is_partitioned partitioned}) sequence.
	 * @param last {@link base.Iterator Forward iterator} to the final position of a {@link is_sorted sorted} (or properly
	 *			   {@link is_partitioned partitioned}) sequence. The range used is [<i>first</i>, <i>last</i>), which
	 *			   contains all the elements between <i>first</i> and <i>last</i>, including the element pointed by
	 *			   <i>first</i> but not the element pointed by <i>last</i>.
	 * @param val Value of the lower bound to search for in the range.
	 * @param compare Binary function that accepts two arguments of the type pointed by <i>ForwardIterator</i> (and of type 
	 *				  <i>T</i>), and returns a value convertible to <code>bool</code>. The value returned indicates whether 
	 *				  the first argument is considered to go before the second. The function shall not modify any of its 
	 *				  arguments.
	 * 
	 * @return A {@link Pair} object, whose member {@link Pair.first} is an iterator to the lower bound of the subrange of 
	 *		   equivalent values, and {@link Pair.second} its upper bound. The values are the same as those that would be 
	 *		   returned by functions {@link lower_bound} and {@link upper_bound} respectively.
	 */
	export function equal_range<T, ForwardIterator extends base.Iterator<T>>
		(
			first: ForwardIterator, last: ForwardIterator, val: T,
			compare: (x: T, y: T) => boolean
		): Pair<ForwardIterator, ForwardIterator>;

	export function equal_range<T, ForwardIterator extends base.Iterator<T>>
		(
			first: ForwardIterator, last: ForwardIterator, val: T,
			compare: (x: T, y: T) => boolean = less
		): Pair<ForwardIterator, ForwardIterator>
	{
		let it: ForwardIterator = lower_bound(first, last, val, compare);

		return make_pair(it, upper_bound(it, last, val, compare));
	}

	/**
	 * Get subrange of equal elements.
	 * 
	 * Returns the bounds of the subrange that includes all the elements of the range [<i>first</i>, <i>last</i>) with 
	 * values equivalent to <i>val</i>.
	 * 
	 * The elements are compared using {@link less}. Two elements, <i>x</i> and <i>y</i> are considered equivalent 
	 * <code>if (!less(x, y) && !less(y, x))</code>.
	 * 
	 * The elements in the range shall already be {@link is_sorted sorted} according to this same criterion 
	 * ({@link less}), or at least {@link is_partitioned partitioned} with respect to <i>val</i>.
	 * 
	 * If <i>val</i> is not equivalent to any value in the range, the subrange returned has a length of zero, with both 
	 * iterators pointing to the nearest value greater than <i>val</i>, if any, or to <i>last</i>, if <i>val</i> compares 
	 * greater than all the elements in the range.
	 * 
	 * @param first {@link base.Iterator Forward iterator} to the initial position of a {@link is_sorted sorted} (or properly
	 *				{@link is_partitioned partitioned}) sequence.
	 * @param last {@link base.Iterator Forward iterator} to the final position of a {@link is_sorted sorted} (or properly
	 *			   {@link is_partitioned partitioned}) sequence. The range used is [<i>first</i>, <i>last</i>), which
	 *			   contains all the elements between <i>first</i> and <i>last</i>, including the element pointed by
	 *			   <i>first</i> but not the element pointed by <i>last</i>.
	 * @param val Value of the lower bound to search for in the range. <i>T</i> shall be a type supporting being compared
	 *			  with elements of the range [<i>first</i>, <i>last</i>) as the left-hand side operand of {@link less}.
	 * 
	 * @return <code>true</code> if an element equivalent to <i>val</i> is found, and <code>false</code> otherwise.
	 */
	export function binary_search<T, ForwardIterator extends base.Iterator<T>>
		(first: ForwardIterator, last: ForwardIterator, val: T): boolean;

	/**
	 * Get subrange of equal elements.
	 *
	 * Returns the bounds of the subrange that includes all the elements of the range [<i>first</i>, <i>last</i>) with
	 * values equivalent to <i>val</i>.
	 *
	 * The elements are compared using {<i>compare</i>}. Two elements, <i>x</i> and <i>y</i> are considered equivalent
	 * <code>if (!compare(x, y) && !compare(y, x))</code>.
	 *
	 * The elements in the range shall already be {@link is_sorted sorted} according to this same criterion
	 * (<i>compare</i>), or at least {@link is_partitioned partitioned} with respect to <i>val</i>.
	 *
	 * If <i>val</i> is not equivalent to any value in the range, the subrange returned has a length of zero, with both
	 * iterators pointing to the nearest value greater than <i>val</i>, if any, or to <i>last</i>, if <i>val</i> compares
	 * greater than all the elements in the range.
	 * 
	 * @param first {@link base.Iterator Forward iterator} to the initial position of a {@link is_sorted sorted} (or properly
	 *				{@link is_partitioned partitioned}) sequence.
	 * @param last {@link base.Iterator Forward iterator} to the final position of a {@link is_sorted sorted} (or properly
	 *			   {@link is_partitioned partitioned}) sequence. The range used is [<i>first</i>, <i>last</i>), which
	 *			   contains all the elements between <i>first</i> and <i>last</i>, including the element pointed by
	 *			   <i>first</i> but not the element pointed by <i>last</i>.
	 * @param val Value of the lower bound to search for in the range.
	 * @param compare Binary function that accepts two arguments of the type pointed by <i>ForwardIterator</i> (and of type
	 *				  <i>T</i>), and returns a value convertible to <code>bool</code>. The value returned indicates whether
	 *				  the first argument is considered to go before the second. The function shall not modify any of its
	 *				  arguments.
	 * 
	 * @return <code>true</code> if an element equivalent to <i>val</i> is found, and <code>false</code> otherwise.
	 */
	export function binary_search<T, ForwardIterator extends base.Iterator<T>>
		(
			first: ForwardIterator, last: ForwardIterator, val: T,
			compare: (x: T, y: T) => boolean
		): boolean;

	export function binary_search<T, ForwardIterator extends base.Iterator<T>>
		(
			first: ForwardIterator, last: ForwardIterator, val: T,
			compare: (x: T, y: T) => boolean = less
		): boolean
	{
		first = lower_bound(first, last, val, compare);

		return !first.equals(last) && !compare(val, first.value);
	}
}