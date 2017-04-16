/// <reference path="../API.ts" />

namespace std
{
	/* =========================================================
		SORTINGS
			- SORT
			- INSPECTOR
			- BACKGROUND
	============================================================
		SORT
	--------------------------------------------------------- */
	/**
	 * Sort elements in range.
	 *
	 * Sorts the elements in the range [<i>first</i>, <i>last</i>) into ascending order. The elements are compared 
	 * using {@link less}.
	 *
	 * @param first {@link IArrayIterator Random-access iterator} to the initial position of the sequence to be sorted.
	 * @param last {@link IArrayIterator Random-access iterator} to the final position of the sequence to be sorted.
	 *			  The range used is [<i>first</i>, <i>last</i>), which contains all the elements between <i>first</i>
	 *			  and <i>last</i>, including the element pointed by <i>first</i> but not the element pointed by
	 *			  <i>last</i>. {@link IArrayIterator RandomAccessIterator} shall point to a type for which
	 *			  {@link base.Iterator.swap swap} is properly defined.
	 */
	export function sort<T, RandomAccessIterator extends base.IArrayIterator<T>>
		(first: RandomAccessIterator, last: RandomAccessIterator): void;

	/**
	 * Sort elements in range.
	 *
	 * Sorts the elements in the range [<i>first</i>, <i>last</i>) into specific order. The elements are compared
	 * using <i>compare</i>.
	 *
	 * @param first {@link IArrayIterator Random-access iterator} to the initial position of the sequence to be sorted.		  
	 * @param last {@link IArrayIterator Random-access iterator} to the final position of the sequence to be sorted.
	 *			  The range used is [<i>first</i>, <i>last</i>), which contains all the elements between <i>first</i>
	 *			  and <i>last</i>, including the element pointed by <i>first</i> but not the element pointed by
	 *			  <i>last</i>. {@link IArrayIterator RandomAccessIterator} shall point to a type for which
	 *			  {@link base.Iterator.swap swap} is properly defined.
	 * @param compare Binary function that accepts two elements in the range as arguments, and returns a value 
	 *				  convertible to <code>boolean</code>. The value returned indicates whether the element passed as first 
	 *				  argument is considered to go before the second in the specific strict weak ordering it defines. The 
	 *				  function shall not modify any of its arguments. This can either be a function pointer or a function 
	 *				  object.
	 */
	export function sort<T, RandomAccessIterator extends base.IArrayIterator<T>>
		(first: RandomAccessIterator, last: RandomAccessIterator, compare: (left: T, right: T) => boolean): void;

	export function sort<T, RandomAccessIterator extends base.IArrayIterator<T>>
		(first: RandomAccessIterator, last: RandomAccessIterator, compare: (left: T, right: T) => boolean = less): void
	{
		_Quick_sort(first.source() as base.IArrayContainer<T>, first.index(), last.index() - 1, compare);
	}

	/**
	 * Sort elements preserving order of equivalents
	 * 
	 * Sorts the elements in the range [*first*, *last*) into ascending order, like {@link sort}, but {@link stable_sort} 
	 * preserves the relative order of the elements with equivalent values.
	 * 
	 * The elements are compared using {@link less}.
	 * 
	 * @param first {@link IArrayIterator Random-access iterator} to the initial position of the sequence to be sorted.
	 * @param last {@link IArrayIterator Random-access iterator} to the final position of the sequence to be sorted.
	 *			   The range used is [<i>first</i>, <i>last</i>), which contains all the elements between <i>first</i>
	 *			   and <i>last</i>, including the element pointed by <i>first</i> but not the element pointed by
	 *			   <i>last</i>. {@link IArrayIterator RandomAccessIterator} shall point to a type for which
	 *			   {@link base.Iterator.swap swap} is properly defined.
	 */
	export function stable_sort<T, RandomAccessIterator extends base.IArrayIterator<T>>
		(first: RandomAccessIterator, last: RandomAccessIterator): void;

	/**
	 * Sort elements preserving order of equivalents
	 * 
	 * Sorts the elements in the range [*first*, *last*) into ascending order, like {@link sort}, but {@link stable_sort} 
	 * preserves the relative order of the elements with equivalent values.
	 * 
	 * The elements are compared using *compare*.
	 * 
	 * @param first {@link IArrayIterator Random-access iterator} to the initial position of the sequence to be sorted.
	 * @param last {@link IArrayIterator Random-access iterator} to the final position of the sequence to be sorted.
	 *			   The range used is [<i>first</i>, <i>last</i>), which contains all the elements between <i>first</i>
	 *			   and <i>last</i>, including the element pointed by <i>first</i> but not the element pointed by
	 *			   <i>last</i>. {@link IArrayIterator RandomAccessIterator} shall point to a type for which
	 *			   {@link base.Iterator.swap swap} is properly defined.
	 * @param compare Binary function that accepts two elements in the range as arguments, and returns a value 
	 *				  convertible to <code>boolean</code>. The value returned indicates whether the element passed as first 
	 *				  argument is considered to go before the second in the specific strict weak ordering it defines. The 
	 *				  function shall not modify any of its arguments. This can either be a function pointer or a function 
	 *				  object.
	 */
	export function stable_sort<T, RandomAccessIterator extends base.IArrayIterator<T>>
		(first: RandomAccessIterator, last: RandomAccessIterator, compare: (left: T, right: T) => boolean): void;

	export function stable_sort<T, RandomAccessIterator extends base.IArrayIterator<T>>
		(first: RandomAccessIterator, last: RandomAccessIterator, compare: (left: T, right: T) => boolean = less): void
	{
		_Stable_quick_sort(first.source(), first.index(), last.index() - 1, compare);
	}

	/**
	 * Partially sort elements in range.
	 * 
	 * Rearranges the elements in the range [<i>first</i>, <i>last</i>), in such a way that the elements before 
	 * <i>middle</i> are the smallest elements in the entire range and are sorted in ascending order, while the remaining 
	 * elements are left without any specific order.
	 * 
	 * The elements are compared using {@link less}.
	 * 
	 * @param last {@link IArrayIterator Random-access iterator} to the first position of the sequence to be sorted.
	 * @param middle {@link IArrayIterator Random-access iterator} pointing to the element within the range [<i>first</i>, <i>last</i>) that is used as the upper boundary of the elements that are fully sorted.
	 * @param last {@link IArrayIterator Random-access iterator} to the final position of the sequence to be sorted.
	 *			  The range used is [<i>first</i>, <i>last</i>), which contains all the elements between <i>first</i>
	 *			  and <i>last</i>, including the element pointed by <i>first</i> but not the element pointed by
	 *			  <i>last</i>.
	 */
	export function partial_sort<T, RandomAccessIterator extends base.IArrayIterator<T>>
		(first: RandomAccessIterator, middle: RandomAccessIterator, last: RandomAccessIterator): void;

	/**
	 * Partially sort elements in range.
	 * 
	 * Rearranges the elements in the range [<i>first</i>, <i>last</i>), in such a way that the elements before 
	 * <i>middle</i> are the smallest elements in the entire range and are sorted in ascending order, while the remaining 
	 * elements are left without any specific order.
	 * 
	 * The elements are compared using <i>comp</i>.
	 * 
	 * @param last {@link IArrayIterator Random-access iterator} to the first position of the sequence to be sorted.
	 * @param middle {@link IArrayIterator Random-access iterator} pointing to the element within the range [<i>first</i>, <i>last</i>) that is used as the upper boundary of the elements that are fully sorted.
	 * @param last {@link IArrayIterator Random-access iterator} to the final position of the sequence to be sorted.
	 *			   The range used is [<i>first</i>, <i>last</i>), which contains all the elements between <i>first</i>
	 *			   and <i>last</i>, including the element pointed by <i>first</i> but not the element pointed by
	 *			   <i>last</i>.
	 * @param compare Binary function that accepts two elements in the range as arguments, and returns a value 
	 *				  convertible to <code>boolean</code>. The value returned indicates whether the element passed as 
	 *				  first argument is considered to go before the second in the specific strict weak ordering it 
	 *				  defines. The function shall not modify any of its arguments.
	 */
	export function partial_sort<T, RandomAccessIterator extends base.IArrayIterator<T>>
		(
			first: RandomAccessIterator, middle: RandomAccessIterator, last: RandomAccessIterator, 
			compare: (x: T, y: T) => boolean
		): void

	export function partial_sort<T, RandomAccessIterator extends base.IArrayIterator<T>>
		(
			first: RandomAccessIterator, middle: RandomAccessIterator, last: RandomAccessIterator, 
			compare: (x: T, y: T) => boolean = less
		): void
	{
		_Selection_sort(first.source() as base.IArrayContainer<T>, first.index(), middle.index(), last.index(), compare);
	}

	/**
	 * Copy and partially sort range.
	 * 
	 * Copies the smallest  elements in the range [<i>first</i>, <i>last</i>) to 
	 * [<i>result_first</i>, <i>result_last</i>), sorting the elements copied. The number of elements copied is the same 
	 * as the {@link distance} between <i>result_first</i> and <i>result_last</i> (unless this is more than the amount of 
	 * elements in [<i>first</i>, <i>last</i>)).
	 * 
	 * The range [<i>first</i>, <i>last</i>) is not modified.
	 * 
	 * The elements are compared using {@link less}.
	 * 
	 * @param first {@link base.Iterator Input iterator} to the initial position of the sequence to copy from.
	 * @param last {@link base.Iterator Input iterator} to the final position of the sequence to copy from. The range used is 
	 *			   [<i>first</i>, <i>last</i>), which contains all the elements between <i>first</i> and <i>last</i>, 
	 *			   including the element pointed by <i>first</i> but not the element pointed by <i>last</i>. 
	 *			   <i>InputIterator</i> shall point to a type assignable to the elements pointed by 
	 *			   <i>RandomAccessIterator</i>.
	 * @param result_first {@link base.Iterator Random-access iterator} to the initial position of the destination sequence.
	 * @param result_last {@link base.Iterator Random-access iterator} to the final position of the destination sequence.
	 *					  The range used is [<i>result_first</i>, <i>result_last</i>).
	 * @param compare Binary function that accepts two elements in the result range as arguments, and returns a value 
	 *				  convertible to <code>bool</code>. The value returned indicates whether the element passed as first 
	 *				  argument is considered to go before the second in the specific <i>strict weak ordering</i> it
	 *				  defines. The function shall not modify any of its arguments.
	 *
	 * @return An iterator pointing to the element that follows the last element written in the result sequence.
	 */
	export function partial_sort_copy<T, InputIterator extends base.Iterator<T>, RandomAccessIterator extends base.Iterator<T>>
		(
			first: InputIterator, last: InputIterator, 
			result_first: RandomAccessIterator, result_last: RandomAccessIterator
		): RandomAccessIterator;

	/**
	 * Copy and partially sort range.
	 * 
	 * Copies the smallest (or largest) elements in the range [<i>first</i>, <i>last</i>) to 
	 * [<i>result_first</i>, <i>result_last</i>), sorting the elements copied. The number of elements copied is the same 
	 * as the {@link distance} between <i>result_first</i> and <i>result_last</i> (unless this is more than the amount of 
	 * elements in [<i>first</i>, <i>last</i>)).
	 * 
	 * The range [<i>first</i>, <i>last</i>) is not modified.
	 * 
	 * The elements are compared using <i>compare</i>.
	 * 
	 * @param first {@link base.Iterator Input iterator} to the initial position of the sequence to copy from.
	 * @param last {@link base.Iterator Input iterator} to the final position of the sequence to copy from. The range used is 
	 *			   [<i>first</i>, <i>last</i>), which contains all the elements between <i>first</i> and <i>last</i>, 
	 *			   including the element pointed by <i>first</i> but not the element pointed by <i>last</i>. 
	 *			   <i>InputIterator</i> shall point to a type assignable to the elements pointed by 
	 *			   <i>RandomAccessIterator</i>.
	 * @param result_first {@link base.Iterator Random-access iterator} to the initial position of the destination sequence.
	 * @param result_last {@link base.Iterator Random-access iterator} to the final position of the destination sequence.
	 *					  The range used is [<i>result_first</i>, <i>result_last</i>).
	 * @param compare Binary function that accepts two elements in the result range as arguments, and returns a value 
	 *				  convertible to <code>bool</code>. The value returned indicates whether the element passed as first 
	 *				  argument is considered to go before the second in the specific <i>strict weak ordering</i> it
	 *				  defines. The function shall not modify any of its arguments.
	 *
	 * @return An iterator pointing to the element that follows the last element written in the result sequence.
	 */
	export function partial_sort_copy
		<T, InputIterator extends base.Iterator<T>, RandomAccessIterator extends base.Iterator<T>>
		(
			first: InputIterator, last: InputIterator, 
			result_first: RandomAccessIterator, result_last: RandomAccessIterator, 
			compare: (x: T, y: T) => boolean
		): RandomAccessIterator;

	export function partial_sort_copy
		<T, InputIterator extends base.Iterator<T>, RandomAccessIterator extends base.IArrayIterator<T>>
		(
			first: InputIterator, last: InputIterator, 
			result_first: RandomAccessIterator, result_last: RandomAccessIterator, 
			compare: (x: T, y: T) => boolean = less
		): RandomAccessIterator
	{
		let input_size: number = distance(first, last);
		let result_size: number = distance(result_first, result_last);

		let vector: Vector<T> = new Vector<T>(first, last);
		sort(vector.begin(), vector.end());

		if (input_size > result_size)
			result_first = copy(vector.begin(), vector.begin().advance(result_size), result_first);
		else
			result_first = copy(vector.begin(), vector.end(), result_first);

		return result_first;
	}

	/**
	 * Sort element in range
	 * 
	 * Rearranges the elements in the range [*first*, *last*), in such a way that the element at the *nth* position 
	 * is the element that would be in that position in a sorted sequence.
	 * 
	 * The other elements are left without any specific order, except that none of the elements preceding *nth* are 
	 * greater than it, and none of the elements following it are less.
	 * 
	 * The elements are compared using {@link less}.
	 * 
	 * @param first {@link IArrayIterator Random-access iterator} to the initial position of the sequence to be sorted.
	 * @param last {@link IArrayIterator Random-access iterator} to the final position of the sequence to be sorted.
	 *			   The range used is [<i>first</i>, <i>last</i>), which contains all the elements between <i>first</i>
	 *			   and <i>last</i>, including the element pointed by <i>first</i> but not the element pointed by
	 *			   <i>last</i>. {@link IArrayIterator RandomAccessIterator} shall point to a type for which
	 *			   {@link base.Iterator.swap swap} is properly defined.
	 */
	export function nth_element<T, RandomAccessIterator extends base.IArrayIterator<T>>
		(first: RandomAccessIterator, nth: RandomAccessIterator, last: RandomAccessIterator): void;

	/**
	 * Sort element in range
	 * 
	 * Rearranges the elements in the range [*first*, *last*), in such a way that the element at the *nth* position 
	 * is the element that would be in that position in a sorted sequence.
	 * 
	 * The other elements are left without any specific order, except that none of the elements preceding *nth* are 
	 * greater than it, and none of the elements following it are less.
	 * 
	 * The elements are compared using *compare*.
	 * 
	 * @param first {@link IArrayIterator Random-access iterator} to the initial position of the sequence to be sorted.
	 * @param last {@link IArrayIterator Random-access iterator} to the final position of the sequence to be sorted.
	 *			   The range used is [<i>first</i>, <i>last</i>), which contains all the elements between <i>first</i>
	 *			   and <i>last</i>, including the element pointed by <i>first</i> but not the element pointed by
	 *			   <i>last</i>. {@link IArrayIterator RandomAccessIterator} shall point to a type for which
	 *			   {@link base.Iterator.swap swap} is properly defined.
	 * @param compare Binary function that accepts two elements in the range as arguments, and returns a value 
	 *				  convertible to <code>boolean</code>. The value returned indicates whether the element passed as first 
	 *				  argument is considered to go before the second in the specific strict weak ordering it defines. The 
	 *				  function shall not modify any of its arguments. This can either be a function pointer or a function 
	 *				  object.
	 */
	export function nth_element<T, RandomAccessIterator extends base.IArrayIterator<T>>
		(first: RandomAccessIterator, nth: RandomAccessIterator, last: RandomAccessIterator, compare: (left: T, right: T) => boolean): void;

	export function nth_element<T, RandomAccessIterator extends base.IArrayIterator<T>>
		(first: RandomAccessIterator, nth: RandomAccessIterator, last: RandomAccessIterator, compare: (left: T, right: T) => boolean = less): void
	{
		sort(first, last, compare);
	}

	/* ---------------------------------------------------------
		INSPECTOR
	--------------------------------------------------------- */
	/**
	 * Check whether range is sorted.
	 * 
	 * Returns <code>true</code> if the range [<i>first</i>, <i>last</i>) is sorted into ascending order.
	 * 
	 * The elements are compared using {@link less}.
	 * 
	 * @param first {@link base.Iterator Forward iterator} to the initial position of the sequence.
	 * @param last {@link base.Iterator Forward iterator} to the final position of the sequence. The range checked is 
	 *			   [<i>first</i>, <i>last</i>), which contains all the elements between <i>first</i> and <i>last</i>, 
	 *			   including the element pointed by <i>first</i> but not the element pointed by <i>last</i>.
	 * 
	 * @return <code>true</code> if the range [<i>first</i>, <i>last</i>) is sorted into ascending order, 
	 *		   <code>false</code> otherwise. If the range [<i>first</i>, <i>last</i>) contains less than two elements, 
	 *		   the function always returns <code>true</code>.
	 */
	export function is_sorted<T, ForwardIterator extends base.Iterator<T>>
		(first: ForwardIterator, last: ForwardIterator): boolean;

	/**
	 * Check whether range is sorted.
	 * 
	 * Returns <code>true</code> if the range [<i>first</i>, <i>last</i>) is sorted into ascending order.
	 * 
	 * The elements are compared using <i>compare</i>.
	 * 
	 * @param first {@link base.Iterator Forward iterator} to the initial position of the sequence.
	 * @param last {@link base.Iterator Forward iterator} to the final position of the sequence. The range checked is 
	 *			   [<i>first</i>, <i>last</i>), which contains all the elements between <i>first</i> and <i>last</i>, 
	 *			   including the element pointed by <i>first</i> but not the element pointed by <i>last</i>.
	 * @param compare Binary function that accepts two elements in the range as arguments, and returns a value convertible 
	 *				  to <code>bool</code>. The value returned indicates whether the element passed as first argument is 
	 *				  considered to go before the second in the specific strict weak ordering it defines. The function 
	 *				  shall not modify any of its arguments.
	 * 
	 * @return <code>true</code> if the range [<i>first</i>, <i>last</i>) is sorted into ascending order, 
	 *		   <code>false</code> otherwise. If the range [<i>first</i>, <i>last</i>) contains less than two elements, 
	 *		   the function always returns <code>true</code>.
	 */
	export function is_sorted<T, ForwardIterator extends base.Iterator<T>>
		(first: ForwardIterator, last: ForwardIterator, compare: (x: T, y: T) => boolean): boolean;

	export function is_sorted<T, ForwardIterator extends base.Iterator<T>>
		(first: ForwardIterator, last: ForwardIterator, compare: (x: T, y: T) => boolean = less): boolean
	{
		if (first.equals(last)) 
			return true;
		
		for (let next = first.next() as ForwardIterator; !next.equals(last); next = next.next() as ForwardIterator)
		{
			if (!(equal_to(next.value, first.value) || compare(first.value, next.value)))
				return false;
			
			first = first.next() as ForwardIterator;
		}
		return true;
	}

	/**
	 * Find first unsorted element in range.
	 * 
	 * Returns an iterator to the first element in the range [<i>first</i>, <i>last</i>) which does not follow an 
	 * ascending order.
	 * 
	 * The range between <i>first</i> and the iterator returned {@link is_sorted is sorted}.
	 * 
	 * If the entire range is sorted, the function returns <i>last</i>.
	 * 
	 * The elements are compared using {@link equal_to}.
	 * 
	 * @param first {@link base.Iterator Forward iterator} to the initial position of the sequence.
	 * @param last {@link base.Iterator Forward iterator} to the final position of the sequence. The range checked is
	 *			   [<i>first</i>, <i>last</i>), which contains all the elements between <i>first</i> and <i>last</i>,
	 *			   including the element pointed by <i>first</i> but not the element pointed by <i>last</i>.
	 * @param compare Binary function that accepts two elements in the range as arguments, and returns a value convertible
	 *				  to <code>bool</code>. The value returned indicates whether the element passed as first argument is
	 *				  considered to go before the second in the specific strict weak ordering it defines. The function
	 *				  shall not modify any of its arguments.
	 * 
	 * @return An iterator to the first element in the range which does not follow an ascending order, or <i>last</i> if 
	 *		   all elements are sorted or if the range contains less than two elements.
	 */
	export function is_sorted_until<T, ForwardIterator extends base.Iterator<T>>
		(first: ForwardIterator, last: ForwardIterator): ForwardIterator;

	/**
	 * Find first unsorted element in range.
	 * 
	 * Returns an iterator to the first element in the range [<i>first</i>, <i>last</i>) which does not follow an 
	 * ascending order.
	 * 
	 * The range between <i>first</i> and the iterator returned {@link is_sorted is sorted}.
	 * 
	 * If the entire range is sorted, the function returns <i>last</i>.
	 * 
	 * The elements are compared using <i>compare</i>.
	 * 
	 * @param first {@link base.Iterator Forward iterator} to the initial position of the sequence.
	 * @param last {@link base.Iterator Forward iterator} to the final position of the sequence. The range checked is
	 *			   [<i>first</i>, <i>last</i>), which contains all the elements between <i>first</i> and <i>last</i>,
	 *			   including the element pointed by <i>first</i> but not the element pointed by <i>last</i>.
	 * @param compare Binary function that accepts two elements in the range as arguments, and returns a value convertible
	 *				  to <code>bool</code>. The value returned indicates whether the element passed as first argument is
	 *				  considered to go before the second in the specific strict weak ordering it defines. The function
	 *				  shall not modify any of its arguments.
	 * 
	 * @return An iterator to the first element in the range which does not follow an ascending order, or <i>last</i> if 
	 *		   all elements are sorted or if the range contains less than two elements.
	 */
	export function is_sorted_until<T, ForwardIterator extends base.Iterator<T>>
		(first: ForwardIterator, last: ForwardIterator, compare: (x: T, y: T) => boolean): ForwardIterator;

	export function is_sorted_until<T, ForwardIterator extends base.Iterator<T>>
		(first: ForwardIterator, last: ForwardIterator, compare: (x: T, y: T) => boolean = less): ForwardIterator
	{
		if (first.equals(last))
			return first;
		
		for (let next = first.next() as ForwardIterator; !next.equals(last); next = next.next() as ForwardIterator)
		{
			if (!(equal_to(next.value, first.value) || compare(first.value, next.value)))
				return next;
			
			first = first.next() as ForwardIterator;
		}
		return last;
	}

	/* ---------------------------------------------------------
		BACKGROUND
	--------------------------------------------------------- */
	/**
	 * @hidden
	 */
	function _Quick_sort<T>
		(container: base.IArrayContainer<T>, first: number, last: number, compare: (left: T, right: T) => boolean): void
	{
		if (last == -2)
			last = container.size() - 1;
		if (first >= last)
			return;

		let index: number = _Quick_sort_partition(container, first, last, compare);
		_Quick_sort(container, first, index - 1, compare);
		_Quick_sort(container, index + 1, last, compare);
	}

	/**
	 * @hidden
	 */
	function _Quick_sort_partition<T>
		(
			container: base.IArrayContainer<T>, first: number, last: number, 
			compare: (left: T, right: T) => boolean
		): number
	{
		let standard: T = container.at(first);
		let i: number = first;
		let j: number = last + 1;

		while (true)
		{
			while (compare(container.at(++i), standard))
				if (i == last)
					break;
			while (compare(standard, container.at(--j)))
				if (j == first)
					break;

			if (i >= j)
				break;

			// SWAP; AT(I) WITH AT(J)
			_Swap_array_element(container, i, j);
		}

		// SWAP; AT(BEGIN) WITH AT(J)
		_Swap_array_element(container, first, j);

		return j;
	}

	/**
	 * @hidden
	 */
	function _Stable_quick_sort<T>
		(
			container: base.IArrayContainer<T>, first: number, last: number, 
			compare: (left: T, right: T) => boolean
		): void
	{
		if (last == -2)
			last = container.size() - 1;
		if (first >= last)
			return;

		let index: number = _Stable_quick_sort_partition(container, first, last, compare);
		_Stable_quick_sort(container, first, index - 1, compare);
		_Stable_quick_sort(container, index + 1, last, compare);
	}

	/**
	 * @hidden
	 */
	function _Stable_quick_sort_partition<T>
		(
			container: base.IArrayContainer<T>, first: number, last: number, 
			compare: (left: T, right: T) => boolean
		): number
	{
		let standard: T = container.at(first);
		let i: number = first;
		let j: number = last + 1;

		while (true)
		{
			while (compare(container.at(++i), standard))
				if (i == last)
					break;
			while (compare(standard, container.at(--j)))
				if (j == first)
					break;

			if (i >= j)
				break;

			// SWAP; AT(I) WITH AT(J)
			if (std.equal_to(container.at(i), container.at(j)) == false)
				_Swap_array_element(container, i, j);
		}

		// SWAP; AT(BEGIN) WITH AT(J)
		if (std.equal_to(container.at(first), container.at(j)) == false)
			_Swap_array_element(container, first, j);

		return j;
	}

	/**
	 * @hidden
	 */
	function _Swap_array_element<T>(container: base.IArrayContainer<T>, i: number, j: number): void
	{
		let supplement:T = container.at(i);
		container.set(i, container.at(j));
		container.set(j, supplement);
	}

	/**
	 * @hidden
	 */
	function _Selection_sort<T>
		(
			container: base.IArrayContainer<T>, first: number, middle: number, last: number,
			compare: (x: T, y: T) => boolean
		): void
	{
		if (last == -1)
			last = container.size();

		for (let i: number = first; i < middle; i++)
		{
			let min_index: number = i;

			for (let j: number = i + 1; j < last; j++)
				if (compare(container.at(j), container.at(min_index)))
					min_index = j;

			if (i != min_index)
				_Swap_array_element(container, i, min_index);
		}
	}
}