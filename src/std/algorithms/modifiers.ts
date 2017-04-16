/// <reference path="../API.ts" />

namespace std
{
	/* =========================================================
		MODIFIERS (MODIFYING SEQUENCE)
			- FILL
			- REMOVE
			- REPLACE & SWAP
			- RE-ARRANGEMENT
	============================================================
		FILL
	--------------------------------------------------------- */
	/**
	 * Copy range of elements.
	 * 
	 * Copies the elements in the range [<i>first</i>, <i>last</i>) into the range beginning at <i>result</i>.
	 * 
	 * The function returns an iterator to the end of the destination range (which points to the element following the 
	 * last element copied).
	 * 
	 * The ranges shall not overlap in such a way that result points to an element in the range 
	 * [<i>first</i>, <i>last</i>). For such cases, see {@link copy_backward}.
	 * 
	 * @param first {@link base.Iterator Input iterator} to the initial position in a sequence to be copied.
	 * @param last {@link base.Iterator Input iterator} to the initial position in a sequence to be copied. The range used is 
	 *			   [<i>first</i>, <i>last</i>), which contains all the elements between <i>first</i> and <i>last</i>, 
	 *			   including the element pointed by <i>first</i> but not the element pointed by <i>last</i>.
	 * @param result {@link base.Iterator Output iterator} to the initial position in the destination sequence. This shall not 
	 *				 point to any element in the range [<i>first</i>, <i>last</i>).
	 *
	 * @return An iterator to the end of the destination range where elements have been copied.
	 */
	export function copy
		<T, InputIterator extends base.Iterator<T>, OutputIterator extends base.ILinearIterator<T>>
		(first: InputIterator, last: InputIterator, result: OutputIterator): OutputIterator
	{
		for (; !first.equals(last); first = first.next() as InputIterator)
		{
			result.value = first.value;
			result = result.next() as OutputIterator;
		}
		return result;
	}

	/**
	 * Copy elements.
	 * 
	 * Copies the first <i>n</i> elements from the range beginning at <i>first</i> into the range beginning at 
	 * <i>result</i>.
	 * 
	 * The function returns an iterator to the end of the destination range (which points to one past the last element 
	 * copied).
	 * 
	 * If <i>n</i> is negative, the function does nothing.
	 * 
	 * If the ranges overlap, some of the elements in the range pointed by result may have undefined but valid values.
	 * 
	 * @param first {@link base.Iterator Input iterator} to the initial position in a sequence of at least <i>n</i> elements to 
	 *				be copied. <i>InputIterator</i> shall point to a type assignable to the elements pointed by 
	 *				<i>OutputIterator</i>.
	 * @param n Number of elements to copy. If this value is negative, the function does nothing.
	 * @param result {@link base.Iterator Output iterator} to the initial position in the destination sequence of at least 
	 *				 <i>n</i> elements. This shall not point to any element in the range [<i>first</i>, last].
	 * 
	 * @return An iterator to the end of the destination range where elements have been copied.
	 */
	export function copy_n
		<T, InputIterator extends base.Iterator<T>, OutputIterator extends base.ILinearIterator<T>>
		(first: InputIterator, n: number, result: OutputIterator): OutputIterator
	{
		for (let i: number = 0; i < n; i++)
		{
			result.value = first.value;

			first = first.next() as InputIterator;
			result = result.next() as OutputIterator;
		}
		return result;
	}

	/**
	 * Copy certain elements of range.
	 * 
	 * Copies the elements in the range [<i>first</i>, <i>last</i>) for which pred returns <code>true</code> to the 
	 * range beginning at <i>result</i>.
	 * 
	 * @param first {@link base.Iterator Input iterator} to the initial position in a sequence to be copied.
	 * @param last {@link base.Iterator Input iterator} to the initial position in a sequence to be copied. The range used is
	 *			   [<i>first</i>, <i>last</i>), which contains all the elements between <i>first</i> and <i>last</i>,
	 *			   including the element pointed by <i>first</i> but not the element pointed by <i>last</i>.
	 * @param result {@link base.Iterator Output iterator} to the initial position in the destination sequence. This shall not
	 *				 point to any element in the range [<i>first</i>, <i>last</i>).
	 * @param pred Unary function that accepts an element in the range as argument, and returns a value convertible to 
	 *			   <code>bool</code>. The value returned indicates whether the element is to be copied (if 
	 *			   <code>true</code>, it is copied). The function shall not modify any of its arguments.
	 *
	 * @return An iterator to the end of the destination range where elements have been copied.
	 */
	export function copy_if
		<T, InputIterator extends base.Iterator<T>, OutputIterator extends base.ILinearIterator<T>>
		(first: InputIterator, last: InputIterator, result: OutputIterator, pred: (x: T) => boolean): OutputIterator
	{
		for (; !first.equals(last); first = first.next() as InputIterator)
		{
			if (!pred(first.value))
				continue;

			result.value = first.value;
			result = result.next() as OutputIterator;
		}
		return result;
	}

	/**
	 * Copy range of elements backward.
	 * 
	 * Copies the elements in the range [<i>first</i>, <i>last</i>) starting from the end into the range terminating 
	 * at <i>result</i>.
	 * 
	 * The function returns an iterator to the first element in the destination range.
	 * 
	 * The resulting range has the elements in the exact same order as [<i>first</i>, <i>last</i>). To reverse their 
	 * order, see {@link reverse_copy}.
	 * 
	 * The function begins by copying <code>*(last-1)</code> into <code>*(result-1)</code>, and then follows backward 
	 * by the elements preceding these, until <i>first</i> is reached (and including it).
	 * 
	 * The ranges shall not overlap in such a way that <i>result</i> (which is the <i>past-the-end element</i> in the 
	 * destination range) points to an element in the range (first,last]. For such cases, see {@link copy}.
	 * 
	 * @param first {@link base.Iterator Bidirectional iterator} to the initial position in a sequence to be copied.
	 * @param last {@link base.Iterator Bidirectional iterator} to the initial position in a sequence to be copied. The range 
	 *			   used is [<i>first</i>, <i>last</i>), which contains all the elements between <i>first</i> and 
	 *			   <i>last</i>, including the element pointed by <i>first</i> but not the element pointed by <i>last</i>.
	 * @param result {@link base.Iterator Bidirectional iterator} to the initial position in the destination sequence. This 
	 *				 shall not point to any element in the range [<i>first</i>, <i>last</i>).
	 * 
	 * @return An iterator to the first element of the destination sequence where elements have been copied.
	 */
	export function copy_backward
		<T, BidirectionalIterator1 extends base.Iterator<T>, BidirectionalIterator2 extends base.ILinearIterator<T>>
		(first: BidirectionalIterator1, last: BidirectionalIterator1, result: BidirectionalIterator2): BidirectionalIterator2
	{
		last = last.prev() as BidirectionalIterator1

		for (; !last.equals(first); last = last.prev() as BidirectionalIterator1)
		{
			result.value = last.value;
			result = result.prev() as BidirectionalIterator2;
		}
		return result;
	}

	/**
	 * Fill range with value.
	 * 
	 * Assigns val to all the elements in the range [<i>first</i>, <i>last</i>).
	 * 
	 * @param first {@link base.Iterator Forward iterator} to the initial position in a sequence of elements that support being
	 *				assigned a value of type <i>T</i>.
	 * @param last {@link base.Iterator Forward iterator} to the final position in a sequence of elements that support being
	 *				assigned a value of type <i>T</i>.. The range filled is [<i>first</i>, <i>last</i>), which contains 
	 *				all the elements between <i>first</i> and <i>last</i>, including the element pointed by <i>first</i> 
	 *				but not the element pointed by <i>last</i>.
	 * @param val Value to assign to the elements in the filled range.
	 */
	export function fill<T, ForwardIterator extends base.ILinearIterator<T>>
		(first: ForwardIterator, last: ForwardIterator, val: T): void
	{
		for (; !first.equals(last); first = first.next() as ForwardIterator)
			first.value = val;
	}

	/**
	 * Fill sequence with value.
	 * 
	 * Assigns <i>val</i> to the first <i>n</i> elements of the sequence pointed by <i>first</i>.
	 * 
	 * @param first {@link base.Iterator Output iterator} to the initial position in a sequence of elements that support being
	 *				assigned a value of type <i>T</i>.
	 * @param n Number of elements to fill. If negative, the function does nothing.
	 * @param val Value to be used to fill the range.
	 * 
	 * @return An iterator pointing to the element that follows the last element filled.
	 */
	export function fill_n<T, OutputIterator extends base.ILinearIterator<T>>
		(first: OutputIterator, n: number, val: T): OutputIterator
	{
		for (let i: number = 0; i < n; i++)
		{
			first.value = val;
			first = first.next() as OutputIterator;
		}
		return first;
	}

	/**
	 * Transform range.
	 * 
	 * Applies <i>op</i> to each of the elements in the range [<i>first</i>, <i>last</i>) and stores the value returned 
	 * by each operation in the range that begins at <i>result</i>.
	 * 
	 * @param first {@link base.Iterator Input iterator} to the initial position in a sequence to be transformed.
	 * @param last {@link base.Iterator Input iterator} to the initial position in a sequence to be transformed. The range
	 *			   used is [<i>first</i>, <i>last</i>), which contains all the elements between <i>first</i> and
	 *			   <i>last</i>, including the element pointed by <i>first</i> but not the element pointed by <i>last</i>.
	 * @param result {@link base.Iterator Output} iterator to the initial position of the range where the operation results are
	 *				 stored. The range includes as many elements as [<i>first</i>, <i>last</i>).
	 * @param op Unary function that accepts one element of the type pointed to by <i>InputIterator</i> as argument, and 
	 *			 returns some result value convertible to the type pointed to by <i>OutputIterator</i>.
	 *
	 * @return An iterator pointing to the element that follows the last element written in the <i>result</i> sequence.
	 */
	export function transform<T, InputIterator extends base.Iterator<T>, OutputIterator extends base.ILinearIterator<T>>
		(first: InputIterator, last: InputIterator, result: OutputIterator, op: (val: T) => T): OutputIterator;

	/**
	 * Transform range.
	 * 
	 * Calls <i>binary_op</i> using each of the elements in the range [<i>first1</i>, <i>last1</i>) as first argument, 
	 * and the respective argument in the range that begins at <i>first2</i> as second argument. The value returned by 
	 * each call is stored in the range that begins at <i>result</i>.
	 * 
	 * @param first1 {@link base.Iterator Input iterator} to the initial position of the first sequence.
	 * @param last1 {@link base.Iterator Input iterator} to the final position of the first sequence. The range used is
	 *				[<i>first1</i>, <i>last1</i>), including the element pointed by <i>first1</i>, but not the element
	 *				pointed by <i>last1</i>.
	 * @param first2 {@link base.Iterator Input iterator} to the initial position of the second range. The range includes as 
	 *				 many elements as [<i>first1</i>, <i>last1</i>).
	 * @param result {@link base.Iterator Output} iterator to the initial position of the range where the operation results are 
	 *				 stored. The range includes as many elements as [<i>first1</i>, <i>last1</i>).
	 * @param binary_op Binary function that accepts two elements as argument (one of each of the two sequences), and 
	 *					returns some result value convertible to the type pointed to by <i>OutputIterator</i>.
	 * 
	 * @return An iterator pointing to the element that follows the last element written in the <i>result</i> sequence.
	 */
	export function transform<T, 
			InputIterator1 extends base.Iterator<T>,
			InputIterator2 extends base.Iterator<T>, 
			OutputIterator extends base.ILinearIterator<T>>
		(
			first1: InputIterator1, last1: InputIterator1, first2: InputIterator2, 
			result: OutputIterator, binary_op: (x: T, y: T) => T
		): OutputIterator;

	export function transform<T, OutputIterator extends base.ILinearIterator<T>>
		(...args: any[]): OutputIterator
	{
		if (args.length == 4)
			return unary_transform.apply(null, args);
		else // args: #5
			return binary_transform.apply(null, args);
	}

	/**
	 * @hidden
	 */
	function unary_transform<T, InputIterator extends base.Iterator<T>, OutputIterator extends base.ILinearIterator<T>>
		(first: InputIterator, last: InputIterator, result: OutputIterator, op: (val: T) => T): OutputIterator
	{
		for (; !first.equals(last); first = first.next() as InputIterator)
		{
			result.value = op(first.value);
			result = result.next() as OutputIterator;
		}
		return result;
	}

	/**
	 * @hidden
	 */
	function binary_transform<T, 
			InputIterator1 extends base.Iterator<T>,
			InputIterator2 extends base.Iterator<T>, 
			OutputIterator extends base.ILinearIterator<T>>
		(
			first1: InputIterator1, last1: InputIterator1, first2: InputIterator2, 
			result: OutputIterator, binary_op: (x: T, y: T) => T
		): OutputIterator
	{
		while (!first1.equals(last1))
		{
			result.value = binary_op(first1.value, first2.value);

			first1 = first1.next() as InputIterator1;
			first2 = first2.next() as InputIterator2;
			result = result.next() as OutputIterator;
		}
		return result;
	}

	/**
	 * Generate values for range with function.
	 * 
	 * Assigns the value returned by successive calls to gen to the elements in the range [<i>first</i>, <i>last</i>).
	 * 
	 * @param first {@link base.Iterator Forward iterator} to the initial position in a sequence.
	 * @param last {@link base.Iterator Forward iterator} to the final position in a sequence. The range affected is 
	 *			   [<i>first</i>, <i>last</i>), which contains all the elements between <i>first</i> and <i>last</i>, 
	 *			   including the element pointed by <i>first</i> but not the element pointed by <i>last</i>.
	 * @param gen Generator function that is called with no arguments and returns some value of a type convertible to 
	 *			  those pointed by the iterators.
	 */
	export function generate<T, ForwardIterator extends base.ILinearIterator<T>>
		(first: ForwardIterator, last: ForwardIterator, gen: () => T): void
	{
		for (; !first.equals(last); first = first.next() as ForwardIterator)
			first.value = gen();
	}

	/**
	 * Generate values for sequence with function.
	 * 
	 * Assigns the value returned by successive calls to <i>gen</i> to the first <i>n</i> elements of the sequence 
	 * pointed by <i>first</i>.
	 * 
	 * @param first {@link base.Iterator Output iterator} to the initial position in a sequence of at least <i>n</i> elements 
	 *				that support being assigned a value of the type returned by <i>gen</i>.
	 * @param n Number of values to generate. If negative, the function does nothing.
	 * @param gen Generator function that is called with no arguments and returns some value of a type convertible to
	 *			  those pointed by the iterators.
	 * 
	 * @return An iterator pointing to the element that follows the last element whose value has been generated.
	 */
	export function generate_n<T, ForwardIterator extends base.ILinearIterator<T>>
		(first: ForwardIterator, n: number, gen: () => T): ForwardIterator
	{
		for (let i: number = 0; i < n; i++)
		{
			first.value = gen();
			first = first.next() as ForwardIterator;
		}
		return first;
	}

	/* ---------------------------------------------------------
		REMOVE
	--------------------------------------------------------- */
	/**
	 * Remove consecutive duplicates in range.
	 * 
	 * Removes all but the first element from every consecutive group of equivalent elements in the range 
	 * [<i>first</i>, <i>last</i>).
	 * 
	 * The function cannot alter the properties of the object containing the range of elements (i.e., it cannot 
	 * alter the size of an array or a container): The removal is done by replacing the duplicate elements by the next 
	 * element that is not a duplicate, and signaling the new size of the shortened range by returning an iterator to 
	 * the element that should be considered its new past-the-last element.
	 * 
	 * The relative order of the elements not removed is preserved, while the elements between the returned 
	 * iterator and last are left in a valid but unspecified state.
	 * 
	 * @param first An {@link base.Iterator} to the initial position in a sequence.
	 * @param last An {@link base.Iterator} to the final position in a sequence. The range used is [<i>first</i>, <i>last</i>),
	 *			  which contains all the elements between <i>first</i> and <i>last</i>, including the element pointed by
	 *			  <i>first</i> but not the element pointed by <i>last</i>.
	 *
	 * @return An iterator to the element that follows the last element not removed. The range between <i>first</i> and
	 *		   this iterator includes all the elements in the sequence that were not considered duplicates.
	 */
	export function unique<T, InputIterator extends base.Iterator<T>>
		(first: InputIterator, last: InputIterator): InputIterator;

	/**
	 * Remove consecutive duplicates in range.
	 * 
	 * Removes all but the first element from every consecutive group of equivalent elements in the range 
	 * [<i>first</i>, <i>last</i>).
	 * 
	 * The function cannot alter the properties of the object containing the range of elements (i.e., it cannot 
	 * alter the size of an array or a container): The removal is done by replacing the duplicate elements by the next 
	 * element that is not a duplicate, and signaling the new size of the shortened range by returning an iterator to 
	 * the element that should be considered its new past-the-last element.
	 * 
	 * The relative order of the elements not removed is preserved, while the elements between the returned 
	 * iterator and last are left in a valid but unspecified state.
	 * 
	 * @param first An {@link base.Iterator} to the initial position in a sequence.
	 * @param last An {@link base.Iterator} to the final position in a sequence. The range used is [<i>first</i>, <i>last</i>),
	 *			  which contains all the elements between <i>first</i> and <i>last</i>, including the element pointed by
	 *			  <i>first</i> but not the element pointed by <i>last</i>.
	 * @param pred Binary function that accepts two elements in the range as argument, and returns a value convertible 
	 *			   to <code>bool</code>. The value returned indicates whether both arguments are considered equivalent 
	 *			  (if <code>true</code>, they are equivalent and one of them is removed). The function shall not modify 
	 *			  any of its arguments.
	 *
	 * @return An iterator to the element that follows the last element not removed. The range between <i>first</i> and 
	 *		   this iterator includes all the elements in the sequence that were not considered duplicates.
	 */
	export function unique<t, InputIterator extends base.Iterator<t>>
		(first: InputIterator, last: InputIterator, pred: (left: t, right: t) => boolean): InputIterator;

	export function unique<t, InputIterator extends base.Iterator<t>>
		(first: InputIterator, last: InputIterator, pred: (left: t, right: t) => boolean = equal_to): InputIterator
	{
		let ret: InputIterator = first;

		for (let it = first.next(); !it.equals(last);)
		{
			if (equal_to(it.value, it.prev().value) == true)
				it = it.source().erase(it) as InputIterator;
			else
			{
				ret = it as InputIterator;
				it = it.next();
			}
		}
		return ret;
	}

	/**
	 * Copy range removing duplicates.
	 * 
	 * Copies the elements in the range [<i>first</i>, <i>last</i>) to the range beginning at <i>result</i>, except 
	 * consecutive duplicates (elements that compare equal to the element preceding).
	 * 
	 * Only the first element from every consecutive group of equivalent elements in the range 
	 * [<i>first</i>, <i>last</i>) is copied.
	 * 
	 * The comparison between elements is performed by applying {@lnk equal_to}.
	 * 
	 * @param first {@link base.Iterator Forward iterator} to the initial position in a sequence.
	 * @param last {@link base.Iterator Forward iterator} to the final position in a sequence. The range used is 
	 *			   [<i>first</i>, <i>last</i>), which contains all the elements between <i>first</i> and <i>last</i>, 
	 *			   including the element pointed by <i>first</i> but not the element pointed by <i>last</i>.
	 * @param result Output iterator to the initial position of the range where the resulting range of values is stored.
	 *				 The pointed type shall support being assigned the value of an element in the range 
	 *				 [<i>first</i>, <i>last</i>).
	 * 
	 * @return An iterator pointing to the end of the copied range, which contains no consecutive duplicates.
	 */
	export function unique_copy<T, InputIterator extends base.Iterator<T>, OutputIterator extends base.ILinearIterator<T>>
		(first: InputIterator, last: InputIterator, result: OutputIterator): OutputIterator;

	/**
	 * Copy range removing duplicates.
	 * 
	 * Copies the elements in the range [<i>first</i>, <i>last</i>) to the range beginning at <i>result</i>, except 
	 * consecutive duplicates (elements that compare equal to the element preceding).
	 * 
	 * Only the first element from every consecutive group of equivalent elements in the range 
	 * [<i>first</i>, <i>last</i>) is copied.
	 * 
	 * The comparison between elements is performed by applying <i>pred</i>.
	 * 
	 * @param first {@link base.Iterator Forward iterator} to the initial position in a sequence.
	 * @param last {@link base.Iterator Forward iterator} to the final position in a sequence. The range used is 
	 *			   [<i>first</i>, <i>last</i>), which contains all the elements between <i>first</i> and <i>last</i>, 
	 *			   including the element pointed by <i>first</i> but not the element pointed by <i>last</i>.
	 * @param result Output iterator to the initial position of the range where the resulting range of values is stored.
	 *				 The pointed type shall support being assigned the value of an element in the range 
	 *				 [<i>first</i>, <i>last</i>).
	 * @param pred Binary function that accepts two elements in the range as argument, and returns a value convertible to 
	 *			   <code>bool</code>. The value returned indicates whether both arguments are considered equivalent (if 
	 *			   <code>true</code>, they are equivalent and one of them is removed). The function shall not modify any 
	 *			   of its arguments.
	 * 
	 * @return An iterator pointing to the end of the copied range, which contains no consecutive duplicates.
	 */
	export function unique_copy<T, InputIterator extends base.Iterator<T>, OutputIterator extends base.ILinearIterator<T>>
		(
			first: InputIterator, last: InputIterator, result: OutputIterator, 
			pred: (x: T, y: T) => boolean
		): OutputIterator;

	export function unique_copy<T, InputIterator extends base.Iterator<T>, OutputIterator extends base.ILinearIterator<T>>
		(
			first: InputIterator, last: InputIterator, result: OutputIterator, 
			pred: (x: T, y: T) => boolean = equal_to
		): OutputIterator
	{
		if (first.equals(last))
			return result;

		result.value = first.value;
		first = first.next() as InputIterator;

		for (; !first.equals(last); first = first.next() as InputIterator)
			if (!pred(first.value, result.value))
			{
				result = result.next() as OutputIterator;
				result.value = first.value;
			}

		return result;
	}

	/**
	 * Remove value from range.
	 * 
	 * Transforms the range [<i>first</i>, <i>last</i>) into a range with all the elements that compare equal to 
	 * <i>val</i> removed, and returns an iterator to the new last of that range.
	 * 
	 * The function cannot alter the properties of the object containing the range of elements (i.e., it cannot alter 
	 * the size of an array or a container): The removal is done by replacing the elements that compare equal to 
	 * <i>val</i> by the next element that does not, and signaling the new size of the shortened range by returning an 
	 * iterator to the element that should be considered its new past-the-last element.
	 * 
	 * The relative order of the elements not removed is preserved, while the elements between the returned iterator 
	 * and last are left in a valid but unspecified state.
	 * 
	 * @param first An {@link base.Iterator} to the initial position in a sequence.
	 * @param last An {@link base.Iterator} to the final position in a sequence. The range used is [<i>first</i>, <i>last</i>),
	 *			  which contains all the elements between <i>first</i> and <i>last</i>, including the element pointed by
	 *			  <i>first</i> but not the element pointed by <i>last</i>.
	 * @param val Value to be removed.
	 */
	export function remove<T, InputIterator extends base.Iterator<T>>
		(first: InputIterator, last: InputIterator, val: T): InputIterator
	{
		let ret: InputIterator = last;

		for (let it = first; !it.equals(last); )
		{
			if (equal_to(it.value, val) == true)
				it = it.source().erase(it) as InputIterator;
			else
			{
				ret = it;
				it = it.next() as InputIterator;
			}
		}
		return ret;
	}

	/**
	 * Remove elements from range.
	 * 
	 * Transforms the range [<i>first</i>, <i>last</i>) into a range with all the elements for which pred returns 
	 * <code>true</code> removed, and returns an iterator to the new last of that range.
	 * 
	 * The function cannot alter the properties of the object containing the range of elements (i.e., it cannot 
	 * alter the size of an array or a container): The removal is done by replacing the elements for which pred returns 
	 * <code>true</code> by the next element for which it does not, and signaling the new size of the shortened range 
	 * by returning an iterator to the element that should be considered its new past-the-last element.
	 * 
	 * The relative order of the elements not removed is preserved, while the elements between the returned 
	 * iterator and last are left in a valid but unspecified state.
	 * 
	 * @param first An {@link base.Iterator} to the initial position in a sequence.
	 * @param last An {@link base.Iterator} to the final position in a sequence. The range used is [<i>first</i>, <i>last</i>),
	 *			  which contains all the elements between <i>first</i> and <i>last</i>, including the element pointed by
	 *			  <i>first</i> but not the element pointed by <i>last</i>.
	 * @param pred Unary function that accepts an element in the range as argument, and returns a value convertible to 
	 *			   <code>bool</code>. The value returned indicates whether the element is to be removed (if 
	 *			   <code>true</code>, it is removed). The function shall not modify its argument.
	 */
	export function remove_if<T, InputIterator extends base.Iterator<T>>
		(first: InputIterator, last: InputIterator, pred: (left: T) => boolean): InputIterator
	{
		let ret: InputIterator = last;

		for (let it = first; !it.equals(last);)
		{
			if (pred(it.value) == true)
				it = it.source().erase(it) as InputIterator;
			else
			{
				ret = it;
				it = it.next() as InputIterator;
			}
		}
		return ret;
	}

	/**
	 * Copy range removing value.
	 * 
	 * Copies the elements in the range [<i>first</i>, <i>last</i>) to the range beginning at <i>result</i>, except 
	 * those elements that compare equal to <i>val</i>.
	 * 
	 * The resulting range is shorter than [<i>first</i>, <i>last</i>) by as many elements as matches in the sequence, 
	 * which are "removed".
	 * 
	 * The function uses {@link equal_to} to compare the individual elements to <i>val</i>.
	 * 
	 * @param first {@link base.Iterator InputIterator} to the initial position in a sequence.
	 * @param last {@link base.Iterator InputIterator} to the final position in a sequence. The range used is 
	 *			   [<i>first</i>, <i>last</i>), which contains all the elements between <i>first</i> and <i>last</i>, 
	 *			   including the element pointed by <i>first</i> but not the element pointed by <i>last</i>.
	 * @param result {@link base.Iterator Output iterator} to the initial position of the range where the resulting sequence is
	 *				 stored. The pointed type shall support being assigned the value of an element in the range 
	 *				 [<i>first</i>, <i>last</i>).
	 * @param val Value to be removed.
	 * 
	 * @return An iterator pointing to the end of the copied range, which includes all the elements in 
	 *		   [<i>first</i>, <i>last</i>) except those that compare equal to <i>val</i>.
	 */
	export function remove_copy<T, InputIterator extends base.Iterator<T>, OutputIterator extends base.ILinearIterator<T>>
		(first: InputIterator, last: InputIterator, result: OutputIterator, val: T): OutputIterator
	{
		for (; !first.equals(last); first = first.next() as InputIterator)
		{
			if (equal_to(first.value, val))
				continue;
			
			result.value = first.value;
			result = result.next() as OutputIterator;
		}

		return result;
	}

	/**
	 * Copy range removing values.
	 * 
	 * Copies the elements in the range [<i>first</i>, <i>last</i>) to the range beginning at <i>result</i>, except 
	 * those elements for which <i>pred</i> returns <code>true</code>.
	 * 
	 * The resulting range is shorter than [<i>first</i>, <i>last</i>) by as many elements as matches, which are 
	 * "removed".
	 * 
	 * @param first {@link base.Iterator InputIterator} to the initial position in a sequence.
	 * @param last {@link base.Iterator InputIterator} to the final position in a sequence. The range used is
	 *			   [<i>first</i>, <i>last</i>), which contains all the elements between <i>first</i> and <i>last</i>,
	 *			   including the element pointed by <i>first</i> but not the element pointed by <i>last</i>.
	 * @param result {@link base.Iterator Output iterator} to the initial position of the range where the resulting sequence is
	 *				 stored. The pointed type shall support being assigned the value of an element in the range
	 *				 [<i>first</i>, <i>last</i>).
	 * @param pred Unary function that accepts an element in the range as argument, and returns a value convertible to 
	 *			   <code>bool</code>. The value returned indicates whether the element is to be removed from the copy (if 
	 *			   <code>true</code>, it is not copied). The function shall not modify its argument.
	 * 
	 * @return An iterator pointing to the end of the copied range, which includes all the elements in 
	 *		   [<i>first</i>, <i>last</i>) except those for which <i>pred</i> returns <code>true</code>.
	 */
	export function remove_copy_if<T, InputIterator extends base.Iterator<T>, OutputIterator extends base.ILinearIterator<T>>
		(first: InputIterator, last: InputIterator, result: OutputIterator, pred: (val: T) => boolean): OutputIterator
	{
		for (; !first.equals(last); first = first.next() as InputIterator)
		{
			if (pred(first.value))
				continue;

			result.value = first.value;
			result = result.next() as OutputIterator;
		}

		return result;
	}

	/* ---------------------------------------------------------
		REPLACE & SWAP
	--------------------------------------------------------- */
	/**
	 * Replace value in range.
	 * 
	 * Assigns <i>new_val</i> to all the elements in the range [<i>first</i>, <i>last</i>) that compare equal to 
	 * <i>old_val</i>.
	 * 
	 * The function uses {@link equal_to} to compare the individual elements to old_val.
	 * 
	 * @param first An {@link base.Iterator} to the initial position in a sequence.
	 * @param last An {@link base.Iterator} to the final position in a sequence. The range used is [<i>first</i>, <i>last</i>),
	 *			  which contains all the elements between <i>first</i> and <i>last</i>, including the element pointed by
	 *			  <i>first</i> but not the element pointed by <i>last</i>.
	 * @param old_val Value to be replaced.
	 * @param new_val Replacement value.
	 */
	export function replace<T, InputIterator extends base.ILinearIterator<T>>
		(first: InputIterator, last: InputIterator, old_val: T, new_val: T): void
	{
		for (let it = first; !it.equals(last); it = it.next() as InputIterator)
			if (equal_to(it.value, old_val))
				it.value = new_val;
	}

	/**
	 * Replace value in range.
	 * 
	 * Assigns <i>new_val</i> to all the elements in the range [<i>first</i>, <i>last</i>) for which pred returns 
	 * <code>true</code>.
	 * 
	 * @param first An {@link base.Iterator} to the initial position in a sequence.
	 * @param last An {@link base.Iterator} to the final position in a sequence. The range used is [<i>first</i>, <i>last</i>),
	 *			  which contains all the elements between <i>first</i> and <i>last</i>, including the element pointed by
	 *			  <i>first</i> but not the element pointed by <i>last</i>.
	 * @param pred Unary function that accepts an element in the range as argument, and returns a value convertible to 
	 *			   <code>bool</code>. The value returned indicates whether the element is to be replaced (if 
	 *			   <code>true</code>, it is replaced). The function shall not modify its argument.
	 * @param new_val Value to assign to replaced elements.
	 */
	export function replace_if<T, InputIterator extends base.ILinearIterator<T>>
		(first: InputIterator, last: InputIterator, pred: (val: T) => boolean, new_val: T): void
	{
		for (let it = first; !it.equals(last); it = it.next() as InputIterator)
			if (pred(it.value) == true)
				it.value = new_val;
	}

	/**
	 * Copy range replacing value.
	 * 
	 * Copies the elements in the range [<i>first</i>, <i>last</i>) to the range beginning at <i>result</i>, replacing 
	 * the appearances of <i>old_value</i> by <i>new_value</i>.
	 * 
	 * The function uses {@link equal_to} to compare the individual elements to <i>old_value</i>.
	 * 
	 * The ranges shall not overlap in such a way that result points to an element in the range 
	 * [<i>first</i>, <i>last</i>).
	 * 
	 * @param first {@link base.Iterator InputIterator} to the initial position in a sequence.
	 * @param last {@link base.Iterator InputIterator} to the final position in a sequence. The range used is
	 *			   [<i>first</i>, <i>last</i>), which contains all the elements between <i>first</i> and <i>last</i>,
	 *			   including the element pointed by <i>first</i> but not the element pointed by <i>last</i>.
	 * @param result {@link base.Iterator Output iterator} to the initial position of the range where the resulting sequence is
	 *				 stored. The pointed type shall support being assigned the value of an element in the range
	 *				 [<i>first</i>, <i>last</i>).
	 * @param old_val Value to be replaced.
	 * @param new_val Replacement value.
	 * 
	 * @return An iterator pointing to the element that follows the last element written in the result sequence.
	 */
	export function replace_copy<T, InputIterator extends base.Iterator<T>, OutputIterator extends base.ILinearIterator<T>>
		(first: InputIterator, last: InputIterator, result: OutputIterator, old_val: T, new_val: T): OutputIterator
	{
		for (; !first.equals(last); first = first.next() as InputIterator)
		{
			if (equal_to(first.value, old_val))
				result.value = new_val;
			else
				result.value = first.value;

			result = result.next() as OutputIterator;
		}

		return result;
	}

	/**
	 * Copy range replacing value.
	 * 
	 * Copies the elements in the range [<i>first</i>, <i>last</i>) to the range beginning at <i>result</i>, replacing 
	 * those for which <i>pred</i> returns <code>true</code> by <i>new_value</i>.
	 * 
	 * @param first {@link base.Iterator InputIterator} to the initial position in a sequence.
	 * @param last {@link base.Iterator InputIterator} to the final position in a sequence. The range used is
	 *			   [<i>first</i>, <i>last</i>), which contains all the elements between <i>first</i> and <i>last</i>,
	 *			   including the element pointed by <i>first</i> but not the element pointed by <i>last</i>.
	 * @param result {@link base.Iterator Output iterator} to the initial position of the range where the resulting sequence is
	 *				 stored. The pointed type shall support being assigned the value of an element in the range
	 *				 [<i>first</i>, <i>last</i>).
	 * @param pred Unary function that accepts an element in the range as argument, and returns a value convertible to
	 *			   <code>bool</code>. The value returned indicates whether the element is to be removed from the copy (if
	 *			   <code>true</code>, it is not copied). The function shall not modify its argument.
	 * @param new_val Value to assign to replaced values.
	 * 
	 * @return An iterator pointing to the element that follows the last element written in the result sequence.
	 */
	export function replace_copy_if<T, InputIterator extends base.Iterator<T>, OutputIterator extends base.ILinearIterator<T>>
		(first: InputIterator, last: InputIterator, result: OutputIterator, pred: (val: T) => boolean, new_val: T): OutputIterator
	{
		for (; !first.equals(last); first = first.next() as InputIterator)
		{
			if (pred(first.value))
				result.value = new_val;
			else
				result.value = first.value;

			result = result.next() as OutputIterator;
		}

		return result;
	}

	/**
	 * Exchange values of objects pointed to by two iterators.
	 * 
	 * Swaps the elements pointed to by <i>x</i> and <i>y</i>.
	 * 
	 * The function calls {@link base.Iterator.swap} to exchange the elements.
	 * 
	 * @param x {@link base.Iterator Forward iterator} to the objects to swap.
	 * @param y {@link base.Iterator Forward iterator} to the objects to swap.
	 */
	export function iter_swap<T>(x: base.Iterator<T>, y: base.Iterator<T>): void
	{
		x.swap(y);
	}

	/**
	 * Exchange values of two ranges.
	 * 
	 * Exchanges the values of each of the elements in the range [<i>first1</i>, <i>last1</i>) with those of their 
	 * respective elements in the range beginning at <i>first2</i>.
	 * 
	 * The function calls {@link base.Iterator.swap} to exchange the elements.
	 * 
	 * @param first1 {@link base.Iterator Forward iterator} to the initial position of the first sequence.
	 * @param last1 {@link base.Iterator Forward iterator} to the final position of the first sequence. The range used is
	 *				[<i>first1</i>, <i>last1</i>), including the element pointed by <i>first1</i>, but not the element
	 *				pointed by <i>last1</i>.
	 * @param first2 {@link base.Iterator Forward iterator} to the initial position of the second range. The range includes as
	 *				 many elements as [<i>first1</i>, <i>last1</i>). The two ranges shall not overlap.
	 * 
	 * @return An iterator to the last element swapped in the second sequence.
	 */
	export function swap_ranges<T, ForwardIterator1 extends base.Iterator<T>, ForwardIterator2 extends base.Iterator<T>>
		(first1: ForwardIterator1, last1: ForwardIterator1, first2: ForwardIterator2): ForwardIterator2
	{
		for (; !first1.equals(last1); first1 = first1.next() as ForwardIterator1)
		{
			first1.swap(first2);
			first2 = first2.next() as ForwardIterator2;
		}
		return first2;
	}

	/* ---------------------------------------------------------
		RE-ARRANGEMENT
	--------------------------------------------------------- */
	/**
	 * Reverse range.
	 * 
	 * Reverses the order of the elements in the range [<i>first</i>, <i>last</i>).
	 * 
	 * The function calls {@link iter_swap} to swap the elements to their new locations.
	 * 
	 * @param first An {@link base.Iterator} to the initial position in a sequence.
	 * @param last An {@link base.Iterator} to the final position in a sequence. The range used is [<i>first</i>, <i>last</i>),
	 *			  which contains all the elements between <i>first</i> and <i>last</i>, including the element pointed by
	 *			  <i>first</i> but not the element pointed by <i>last</i>.
	 */
	export function reverse<T, InputIterator extends base.Iterator<T>>
		(first: InputIterator, last: InputIterator): void
	{
		// first != last && first != --last
		while (first.equals(last) == false && first.equals((last = last.prev() as InputIterator)) == false)
		{
			first.swap(last);
			first = first.next() as InputIterator;
		}
	}

	/**
	 * Copy range reversed.
	 * 
	 * Copies the elements in the range [<i>first</i>, <i>last</i>) to the range beginning at <i>result</i>, but in 
	 * reverse order.
	 * 
	 * @param first {@link base.Iterator Bidirectional iterator} to the initial position in a sequence to be copied.
	 * @param last {@link base.Iterator Bidirectional iterator} to the initial position in a sequence to be copied. The range 
	 *			   used is [<i>first</i>, <i>last</i>), which contains all the elements between <i>first</i> and 
	 *			   <i>last</i>, including the element pointed by <i>first</i> but not the element pointed by <i>last</i>.
	 * @param result {@link base.Iterator Output iterator} to the initial position of the range where the reserved range is
	 *				 stored. The pointed type shall support being assigned the value of an element in the range 
	 *				 [<i>first</i>, <i>last</i>).
	 * 
	 * @return An output iterator pointing to the end of the copied range, which contains the same elements in reverse 
	 *		   order.
	 */
	export function reverse_copy<T, BidirectionalIterator extends base.Iterator<T>, OutputIterator extends base.ILinearIterator<T>>
		(first: BidirectionalIterator, last: BidirectionalIterator, result: OutputIterator): OutputIterator
	{
		while (!last.equals(first))
		{
			last = last.prev() as BidirectionalIterator;

			result.value = last.value;
			result = result.next() as OutputIterator;
		}
		return result;
	}

	/**
	 * Rotate left the elements in range.
	 * 
	 * Rotates the order of the elements in the range [<i>first</i>, <i>last</i>), in such a way that the element 
	 * pointed by middle becomes the new first element.
	 * 
	 * @param first An {@link base.Iterator} to the initial position in a sequence.
	 * @param middle An {@link base.Iterator} pointing to the element within the range [<i>first</i>, <i>last</i>) that is 
	 *				 moved to the first position in the range.
	 * @param last An {@link base.Iterator} to the final position in a sequence. The range used is [<i>first</i>, <i>last</i>),
	 *			  which contains all the elements between <i>first</i> and <i>last</i>, including the element pointed by
	 *			  <i>first</i> but not the element pointed by <i>last</i>.
	 *
	 * @return An iterator pointing to the element that now contains the value previously pointed by <i>first</i>.
	 */
	export function rotate<T, InputIterator extends base.Iterator<T>>
		(first: InputIterator, middle: InputIterator, last: InputIterator): InputIterator
	{
		let next: InputIterator = middle;

		while (next.equals(last) == false)
		{
			first.swap(next);

			first = first.next() as InputIterator;
			next = next.next() as InputIterator;

			if (first.equals(middle))
				break;
		}

		return first;
	}

	/**
	 * Copy range rotated left.
	 * 
	 * Copies the elements in the range [<i>first</i>, <i>last</i>) to the range beginning at <i>result</i>, but 
	 * rotating the order of the elements in such a way that the element pointed by <i>middle</i> becomes the first 
	 * element in the resulting range.
	 * 
	 * @param first {@link base.Iterator Forward iterator} to the initial position of the range to be copy-rotated.
	 * @param middle Forward iterator pointing to the element within the range [<i>first</i>, <i>last</i>) that is copied as the first element in the resulting range.
	 * @param last {@link base.Iterator Forward iterator} to the final positions of the range to be copy-rotated. The range 
	 *			   used is [<i>first</i>, <i>last</i>), which contains all the elements between <i>first</i> and 
	 *			   <i>last</i>, including the element pointed by <i>first</i> but not the element pointed by <i>last</i>. 
	 *			   Notice that in this function, these are not consecutive parameters, but the first and <b>third</b> ones.
	 * @param result {@link base.Iterator Output iterator} to the initial position of the range where the reserved range is
	 *				 stored. The pointed type shall support being assigned the value of an element in the range
	 *				 [<i>first</i>, <i>last</i>).
	 * 
	 * @return An output iterator pointing to the end of the copied range.
	 */
	export function rotate_copy<T, ForwardIterator extends base.Iterator<T>, OutputIterator extends base.ILinearIterator<T>>
		(first: ForwardIterator, middle: ForwardIterator, last: ForwardIterator, result: OutputIterator): OutputIterator
	{
		result = copy(middle, last, result);
		return copy(first, middle, result);
	}
	
	/**
	 * Randomly rearrange elements in range.
	 * 
	 * Rearranges the elements in the range [<i>first</i>, <i>last</i>) randomly.
	 * 
	 * The function swaps the value of each element with that of some other randomly picked element. When provided, 
	 * the function gen determines which element is picked in every case. Otherwise, the function uses some unspecified 
	 * source of randomness.
	 * 
	 * To specify a uniform random generator, see {@link shuffle}.
	 * 
	 * @param first An {@link base.Iterator} to the initial position in a sequence.
	 * @param last An {@link base.Iterator} to the final position in a sequence. The range used is [<i>first</i>, <i>last</i>),
	 *			  which contains all the elements between <i>first</i> and <i>last</i>, including the element pointed by
	 *			  <i>first</i> but not the element pointed by <i>last</i>.
	 */
	export function random_shuffle<T, RandomAccessIterator extends base.IArrayIterator<T>>
		(first: RandomAccessIterator, last: RandomAccessIterator): void
	{
		return shuffle(first, last);
	}

	/**
	 * Randomly rearrange elements in range using generator.
	 * 
	 * Rearranges the elements in the range [<i>first</i>, <i>last</i>) randomly, using <i>g</i> as uniform random 
	 * number generator.
	 * 
	 * The function swaps the value of each element with that of some other randomly picked element. The function 
	 * determines the element picked by calling <i>g()</i>.
	 * 
	 * To shuffle the elements of the range without such a generator, see {@link random_shuffle} instead.
	 * 
	 * <h5> Note </h5>
	 * Using random generator engine is not implemented yet.
	 * 
	 * @param first An {@link base.Iterator} to the initial position in a sequence.
	 * @param last An {@link base.Iterator} to the final position in a sequence. The range used is [<i>first</i>, <i>last</i>),
	 *			  which contains all the elements between <i>first</i> and <i>last</i>, including the element pointed by
	 *			  <i>first</i> but not the element pointed by <i>last</i>.
	 */
	export function shuffle<T, RandomAccessIterator extends base.IArrayIterator<T>>
		(first: RandomAccessIterator, last: RandomAccessIterator): void
	{
		for (let it = first; !it.equals(last); it = it.next() as RandomAccessIterator)
		{
			let last_index: number = (last.index() == -1) ? last.source().size() : last.index();
			let rand_index: number = Math.floor(Math.random() * (last_index - first.index()));

			it.swap(first.advance(rand_index));
		}
	}
}