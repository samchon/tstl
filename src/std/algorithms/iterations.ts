/// <reference path="../API.ts" />

namespace std
{
	/* =========================================================
		ITERATIONS (NON-MODIFYING SEQUENCE)
			- FOR_EACH
			- AGGREGATE CONDITIONS
			- FINDERS
			- COUNTERS
	============================================================
		FOR_EACH
	--------------------------------------------------------- */
	/**
	 * Apply function to range.
	 *
	 * Applies function <i>fn</i> to each of the elements in the range [<i>first</i>, <i>last</i>).
	 *
	 * @param first An {@link base.Iterator} to the initial position in a sequence.
	 * @param last An {@link base.Iterator} to the final position in a sequence. The range used is [<i>first</i>, <i>last</i>), 
	 *			  which contains all the elements between <i>first</i> and <i>last</i>, including the element pointed by 
	 *			  <i>first</i> but not the element pointed by <i>last</i>.
	 * @param fn Unary function that accepts an element in the range as argument. This can either be a function p
	 *			 ointer or a move constructible function object. Its return value, if any, is ignored.
	 */
	export function for_each<T, InputIterator extends base.Iterator<T>, Func extends (val: T) => any>
		(first: InputIterator, last: InputIterator, fn: Func): Func
	{
		for (let it = first; !it.equals(last); it = it.next() as InputIterator)
			fn(it.value);

		return fn;
	}

	/**
	 * Apply function to range.
	 *
	 * Applies function *fn* to each of the elements in the range [*first*, *first + n*).
	 * 
	 * @param first An {@link base.Iterator} to the initial position in a sequence.
	 * @param n the number of elements to apply the function to
	 * @param fn Unary function that accepts an element in the range as argument. This can either be a function p
	 *			 ointer or a move constructible function object. Its return value, if any, is ignored.
	 * 
	 * @return first + n
	 */
	export function for_each_n<T, InputIterator extends base.Iterator<T>>
		(first: InputIterator, n: number, fn: (val: T) => any): InputIterator
	{
		for (let i: number = 0; i < n; i++)
		{
			fn(first.value);
			first = first.next() as InputIterator;
		}
		return first;
	}

	/* ---------------------------------------------------------
		AGGREGATE CONDITIONS
	--------------------------------------------------------- */
	/**
	 * Test condition on all elements in range.
	 * 
	 * Returns <code>true</code> if <i>pred</i> returns <code>true</code> for all the elements in the range 
	 * [<i>first</i>, <i>last</i>) or if the range is {@link Container.empty empty}, and <code>false</code> otherwise.
	 *
	 * 
	 * @param first An {@link base.Iterator} to the initial position in a sequence.
	 * @param last An {@link base.Iterator} to the final position in a sequence. The range used is [<i>first</i>, <i>last</i>),
	 *			  which contains all the elements between <i>first</i> and <i>last</i>, including the element pointed by
	 *			  <i>first</i> but not the element pointed by <i>last</i>.
	 * @param pred Unary function that accepts an element in the range as argument and returns a value convertible to
	 *			   <code>boolean</code>. The value returned indicates whether the element fulfills the condition 
	 *			   checked by this function. The function shall not modify its argument.
	 *
	 * @return <code>true</code> if pred returns true for all the elements in the range or if the range is 
	 *		   {@link Container.empty empty}, and <code>false</code> otherwise.
	 */
	export function all_of<T, InputIterator extends base.Iterator<T>>
		(first: InputIterator, last: InputIterator, pred: (val: T) => boolean): boolean
	{
		for (let it = first; !it.equals(last); it = it.next() as InputIterator)
			if (pred(it.value) == false)
				return false;

		return true;
	}

	/**
	 * Test if any element in range fulfills condition.
	 * 
	 * Returns <code>true</code> if <i>pred</i> returns true for any of the elements in the range 
	 * [<i>first</i>, <i>last</i>), and <code>false</code> otherwise.
	 * 
	 * If [<i>first</i>, <i>last</i>) is an {@link Container.empty empty} range, the function returns 
	 * <code>false</code>.
	 * 
	 * @param first An {@link base.Iterator} to the initial position in a sequence.
	 * @param last An {@link base.Iterator} to the final position in a sequence. The range used is [<i>first</i>, <i>last</i>),
	 *			  which contains all the elements between <i>first</i> and <i>last</i>, including the element pointed by
	 *			  <i>first</i> but not the element pointed by <i>last</i>.
	 * @param pred Unary function that accepts an element in the range as argument and returns a value convertible to
	 *			   <code>boolean</code>. The value returned indicates whether the element fulfills the condition
	 *			   checked by this function. The function shall not modify its argument.
	 *
	 * @return <code>true</code> if <i>pred</i> returns <code>true</code> for any of the elements in the range 
	 *		   [<i>first</i>, <i>last</i>), and <code>false</code> otherwise. If [<i>first</i>, <i>last</i>) is an 
	 *		   {@link Container.empty empty} range, the function returns <code>false</code>.
	 */
	export function any_of<T, InputIterator extends base.Iterator<T>>
		(first: InputIterator, last: InputIterator, pred: (val: T) => boolean): boolean
	{
		for (let it = first; !it.equals(last); it = it.next() as InputIterator)
			if (pred(it.value) == true)
				return true;

		return false;
	}

	/**
	 * Test if no elements fulfill condition.
	 * 
	 * Returns <code>true</code> if <i>pred</i> returns false for all the elements in the range 
	 * [<i>first</i>, <i>last</i>) or if the range is {@link Container.empty empty}, and <code>false</code> otherwise. 
	 * 
	 * @param first An {@link base.Iterator} to the initial position in a sequence.
	 * @param last An {@link base.Iterator} to the final position in a sequence. The range used is [<i>first</i>, <i>last</i>),
	 *			  which contains all the elements between <i>first</i> and <i>last</i>, including the element pointed by
	 *			  <i>first</i> but not the element pointed by <i>last</i>.
	 * @param pred Unary function that accepts an element in the range as argument and returns a value convertible to
	 *			   <code>boolean</code>. The value returned indicates whether the element fulfills the condition
	 *			   checked by this function. The function shall not modify its argument.
	 *
	 * @return <code>true</code> if <i>pred</i> returns <code>false</code> for all the elements in the range 
	 *		   [<i>first</i>, <i>last</i>) or if the range is {@link Container.empty empty}, and <code>false</code> 
	 *		   otherwise.
	 */
	export function none_of<T, InputIterator extends base.Iterator<T>>
		(first: InputIterator, last: InputIterator, pred: (val: T) => boolean): boolean
	{
		return !any_of(first, last, pred);
	}

	/**
	 * Test whether the elements in two ranges are equal.
	 * 
	 * Compares the elements in the range [<i>first1</i>, <i>last1</i>) with those in the range beginning at 
	 * <i>first2</i>, and returns <code>true</code> if all of the elements in both ranges match.
	 * 
	 * @param first1 An {@link base.Iterator} to the initial position of the first sequence.
	 * @param last1 An {@link base.Iterator} to the final position in a sequence. The range used is
	 *				[<i>first1</i>, <i>last1</i>), including the element pointed by <i>first1</i>, but not the element
	 *				pointed by <i>last1</i>.
	 * @param first2 An {@link base.Iterator} to the initial position of the second sequence. The comparison includes up to 
	 *				 as many elements of this sequence as those in the range [<i>first1</i>, <i>last1</i>).
	 * 
	 * @return <code>true</code> if all the elements in the range [<i>first1</i>, <i>last1</i>) compare equal to those 
	 *		   of the range starting at <i>first2</i>, and <code>false</code> otherwise.
	 */
	export function equal<T, InputIterator extends base.Iterator<T>>
		(first1: InputIterator, last1: InputIterator, first2: base.Iterator<T>): boolean;

	/**
	 * Test whether the elements in two ranges are equal.
	 * 
	 * Compares the elements in the range [<i>first1</i>, <i>last1</i>) with those in the range beginning at 
	 * <i>first2</i>, and returns <code>true</code> if all of the elements in both ranges match.
	 * 
	 * @param first1 An {@link base.Iterator} to the initial position of the first sequence.
	 * @param last1 An {@link base.Iterator} to the final position in a sequence. The range used is
	 *				[<i>first1</i>, <i>last1</i>), including the element pointed by <i>first1</i>, but not the element
	 *				pointed by <i>last1</i>.
	 * @param first2 An {@link base.Iterator} to the initial position of the second sequence. The comparison includes up to 
	 *				 as many elements of this sequence as those in the range [<i>first1</i>, <i>last1</i>).
	 * @param pred Binary function that accepts two elements as argument (one of each of the two sequences, in the same 
	 *			   order), and returns a value convertible to <code>bool</code>. The value returned indicates whether 
	 *			   the elements are considered to match in the context of this function.
	 * 
	 * @return <code>true</code> if all the elements in the range [<i>first1</i>, <i>last1</i>) compare equal to those
	 *		   of the range starting at <i>first2</i>, and <code>false</code> otherwise.
	 */
	export function equal<T, InputIterator extends base.Iterator<T>>
		(
			first1: InputIterator, last1: InputIterator, first2: base.Iterator<T>,
			pred: (x: T, y: T) => boolean
		): boolean;

	export function equal<T, InputIterator extends base.Iterator<T>>
		(
			first1: InputIterator, last1: InputIterator, first2: base.Iterator<T>,
			pred: (x: T, y: T) => boolean = equal_to
		): boolean
	{
		while (!first1.equals(last1))
			if (first2.equals(first2.source().end()) || !pred(first1.value, first2.value))
				return false;
			else
			{
				first1 = first1.next() as InputIterator;
				first2 = first2.next();
			}
		return true;
	}

	/**
	 * Lexicographical less-than comparison.
	 * 
	 * Returns <code>true</code> if the range [<i>first1</i>, <i>last1</i>) compares <i>lexicographically less</i> 
	 * than the range [<i>first2</i>, <i>last2</i>).
	 *
	 * A <i>lexicographical comparison</i> is the kind of comparison generally used to sort words alphabetically in 
	 * dictionaries; It involves comparing sequentially the elements that have the same position in both ranges against 
	 * each other until one element is not equivalent to the other. The result of comparing these first non-matching 
	 * elements is the result of the lexicographical comparison.
	 * 
	 * If both sequences compare equal until one of them ends, the shorter sequence is <i>lexicographically less</i> 
	 * than the longer one.
	 * 
	 * @param first1 An {@link base.Iterator} to the initial position of the first sequence.
	 * @param last1 An {@link base.Iterator} to the final position in a sequence. The range used is 
	 *				[<i>first1</i>, <i>last1</i>), including the element pointed by <i>first1</i>, but not the element
	 *				pointed by <i>last1</i>.
	 * @param first2 An {@link base.Iterator} to the initial position of the second sequence.
	 * @param last2 An {@link base.Iterator} to the final position of the second sequence. The ranged used is 
	 *				[<i>first2</i>, <i>last2</i>).
	 * 
	 * @return <code>true</code> if the first range compares <i>lexicographically less</i> than than the second. 
	 *		   <code>false</code> otherwise (including when all the elements of both ranges are equivalent).
	 */
	export function lexicographical_compare
		<T, T1 extends T, T2 extends T, 
			Iterator1 extends base.Iterator<T1>, Iterator2 extends base.Iterator<T2>>
		(first1: Iterator1, last1: Iterator1, first2: Iterator2, last2: Iterator2): boolean;

	/**
	 * Lexicographical comparison.
	 * 
	 * Returns <code>true</code> if the range [<i>first1</i>, <i>last1</i>) compares <i>lexicographically 
	 * relationship</i> than the range [<i>first2</i>, <i>last2</i>).
	 *
	 * A <i>lexicographical comparison</i> is the kind of comparison generally used to sort words alphabetically in 
	 * dictionaries; It involves comparing sequentially the elements that have the same position in both ranges against 
	 * each other until one element is not equivalent to the other. The result of comparing these first non-matching 
	 * elements is the result of the lexicographical comparison.
	 * 
	 * If both sequences compare equal until one of them ends, the shorter sequence is <i>lexicographically 
	 * relationship</i> than the longer one.
	 * 
	 * @param first1 An {@link base.Iterator} to the initial position of the first sequence.
	 * @param last1 An {@link base.Iterator} to the final position in a sequence. The range used is 
	 *				[<i>first1</i>, <i>last1</i>), including the element pointed by <i>first1</i>, but not the element
	 *				pointed by <i>last1</i>.
	 * @param first2 An {@link base.Iterator} to the initial position of the second sequence.
	 * @param last2 An {@link base.Iterator} to the final position of the second sequence. The ranged used is 
	 *				[<i>first2</i>, <i>last2</i>).
	 * @param compare Binary function that accepts two arguments of the types pointed by the iterators, and returns a 
	 *		  value convertible to <code>bool</code>. The value returned indicates whether the first argument is 
	 *		  considered to go before the second in the specific <i>strict weak ordering</i> it defines.
	 * 
	 * @return <code>true</code> if the first range compares <i>lexicographically relationship</i> than than the 
	 *		   second. <code>false</code> otherwise (including when all the elements of both ranges are equivalent).
	 */
	export function lexicographical_compare
		<T, T1 extends T, T2 extends T, 
			Iterator1 extends base.Iterator<T1>, Iterator2 extends base.Iterator<T2>>
		(
			first1: Iterator1, last1: Iterator1, first2: Iterator2, last2: Iterator2, 
			compare: (x: T, y: T) => boolean
		) : boolean;
	
	export function lexicographical_compare
		<T, T1 extends T, T2 extends T,
			Iterator1 extends base.Iterator<T1>, Iterator2 extends base.Iterator<T2>>
		(
			first1: Iterator1, last1: Iterator1, first2: Iterator2, last2: Iterator2,
			compare: (x: T, y: T) => boolean = less
		): boolean
	{
		while (!first1.equals(last1))
			if (first2.equals(last2) || !compare(first1.value, first2.value))
				return false;
			else if (compare(first1.value, first2.value))
				return true;
			else
			{
				first1 = first1.next() as Iterator1;
				first2 = first2.next() as Iterator2;
			}

		return !equal_to(last2, last2.source().end()) && !equal_to(first2.value, last2.value);
	}

	/* ---------------------------------------------------------
		FINDERS
	--------------------------------------------------------- */
	/**
	 * Find value in range.
	 * 
	 * Returns an iterator to the first element in the range [<i>first</i>, <i>last</i>) that compares equal to 
	 * <i>val</i>. If no such element is found, the function returns <i>last</i>.
	 * 
	 * The function uses {@link equal_to equal_to} to compare the individual elements to <i>val</i>.
	 * 
	 * @param first An {@link base.Iterator} to the initial position in a sequence.
	 * @param last An {@link base.Iterator} to the final position in a sequence. The range used is [<i>first</i>, <i>last</i>),
	 *			  which contains all the elements between <i>first</i> and <i>last</i>, including the element pointed by
	 *			  <i>first</i> but not the element pointed by <i>last</i>.
	 * @param val Value to search for in the range.
	 * 
	 * @return An {@link base.Iterator} to the first element in the range that compares equal to <i>val</i>. If no elements 
	 *		   match, the function returns <i>last</i>.
	 */
	export function find<T, InputIterator extends base.Iterator<T>>
		(first: InputIterator, last: InputIterator, val: T): InputIterator
	{
		for (let it = first; !it.equals(last); it = it.next() as InputIterator)
			if (equal_to(it.value, val))
				return it;

		return last;
	}

	/**
	 * Find element in range.
	 * 
	 * Returns an iterator to the first element in the range [<i>first</i>, <i>last</i>) for which pred returns 
	 * <code>true</code>. If no such element is found, the function returns <i>last</i>.
	 * 
	 * @param first An {@link base.Iterator} to the initial position in a sequence.
	 * @param last An {@link base.Iterator} to the final position in a sequence. The range used is [<i>first</i>, <i>last</i>),
	 *			  which contains all the elements between <i>first</i> and <i>last</i>, including the element pointed by
	 *			  <i>first</i> but not the element pointed by <i>last</i>.
	 * @param pred Unary function that accepts an element in the range as argument and returns a value convertible 
	 *			   to <code>bool</code>. The value returned indicates whether the element is considered a match in 
	 *			   the context of this function. The function shall not modify its argument.
	 * 
	 * @return An {@link base.Iterator} to the first element in the range for which <i>pred</i> does not return 
	 *		   <code>false</code>. If <i>pred</i> is <code>false</code> for all elements, the function returns 
	 *		   <i>last</i>.
	 */
	export function find_if<T, InputIterator extends base.Iterator<T>>
		(first: InputIterator, last: InputIterator, pred: (val: T) => boolean): InputIterator
	{
		for (let it = first; !it.equals(last); it = it.next() as InputIterator)
			if (pred(it.value))
				return it;

		return last;
	}

	/**
	 * Find element in range.
	 * 
	 * Returns an iterator to the first element in the range [<i>first</i>, <i>last</i>) for which pred returns 
	 * <code>true</code>. If no such element is found, the function returns <i>last</i>.
	 * 
	 * @param first An {@link base.Iterator} to the initial position in a sequence.
	 * @param last An {@link base.Iterator} to the final position in a sequence. The range used is [<i>first</i>, <i>last</i>),
	 *			  which contains all the elements between <i>first</i> and <i>last</i>, including the element pointed by
	 *			  <i>first</i> but not the element pointed by <i>last</i>.
	 * @param pred Unary function that accepts an element in the range as argument and returns a value convertible 
	 *			   to <code>bool</code>. The value returned indicates whether the element is considered a match in 
	 *			   the context of this function. The function shall not modify its argument.
	 * 
	 * @return An {@link base.Iterator} to the first element in the range for which <i>pred</i> returns <code>false</code>.
	 *		   If <i>pred</i> is <code>true</code> for all elements, the function returns <i>last</i>.
	 */
	export function find_if_not<T, InputIterator extends base.Iterator<T>>
		(first: InputIterator, last: InputIterator, pred: (val: T) => boolean): InputIterator
	{
		for (let it = first; !it.equals(last); it = it.next() as InputIterator)
			if (pred(it.value) == false)
				return it;

		return last;
	}

	/**
	 * Find last subsequence in range.
	 * 
	 * Searches the range [<i>first1</i>, <i>last1</i>) for the last occurrence of the sequence defined by 
	 * [<i>first2</i>, <i>last2</i>), and returns an {@link base.Iterator} to its first element, or <i>last1,/i> if no 
	 * occurrences are found.
	 * 
	 * The elements in both ranges are compared sequentially using {@link equal_to}: A subsequence of 
	 * [<i>first1</i>, <i>last1</i>) is considered a match only when this is <code>true</code> for all the elements of 
	 * [<i>first2</i>, <i>last2</i>).
	 * 
	 * This function returns the last of such occurrences. For an algorithm that returns the first instead, see 
	 * {@link search}.
	 * 
	 * @param first1 An {@link base.Iterator} to the initial position of the first sequence.
	 * @param last1 An {@link base.Iterator} to the final position in a sequence. The range used is
	 *				[<i>first1</i>, <i>last1</i>), including the element pointed by <i>first1</i>, but not the element
	 *				pointed by <i>last1</i>.
	 * @param first2 An {@link base.Iterator} to the initial position of the element values to be searched for.
	 * @param last2 An {@link base.Iterator} to the final position of the element values to be searched for. The range used
	 *				is [<i>first2</i>, <i>last2</i>).
	 * @param pred Binary function that accepts two elements as arguments (one of each of the two sequences, in the
	 *			   same order), and returns a value convertible to <code>bool</code>. The value returned indicates
	 *			   whether the elements are considered to match in the context of this function.
	 * 
	 * @return An {@link base.Iterator} to the first element of the last occurrence of [<i>first2</i>, <i>last2</i>) in 
	 *		   [<i>first1</i>, <i>last1</i>). If the sequence is not found, the function returns ,i>last1</i>. Otherwise 
	 *		   [<i>first2</i>, <i>last2</i>) is an empty range, the function returns <i>last1</i>.
	 */
	export function find_end
		<T, Iterator1 extends base.Iterator<T>, Iterator2 extends base.Iterator<T>>
		(first1: Iterator1, last1: Iterator1, first2: Iterator2, last2: Iterator2): Iterator1;
	
	/**
	 * Find last subsequence in range.
	 * 
	 * Searches the range [<i>first1</i>, <i>last1</i>) for the last occurrence of the sequence defined by 
	 * [<i>first2</i>, <i>last2</i>), and returns an {@link base.Iterator} to its first element, or <i>last1,/i> if no 
	 * occurrences are found.
	 * 
	 * The elements in both ranges are compared sequentially using <i>pred</i>: A subsequence of 
	 * [<i>first1</i>, <i>last1</i>) is considered a match only when this is <code>true</code> for all the elements of 
	 * [<i>first2</i>, <i>last2</i>).
	 * 
	 * This function returns the last of such occurrences. For an algorithm that returns the first instead, see 
	 * {@link search}.
	 * 
	 * @param first1 An {@link base.Iterator} to the initial position of the first sequence.
	 * @param last1 An {@link base.Iterator} to the final position in a sequence. The range used is
	 *				[<i>first1</i>, <i>last1</i>), including the element pointed by <i>first1</i>, but not the element
	 *				pointed by <i>last1</i>.
	 * @param first2 An {@link base.Iterator} to the initial position of the element values to be searched for.
	 * @param last2 An {@link base.Iterator} to the final position of the element values to be searched for. The range used
	 *				is [<i>first2</i>, <i>last2</i>).
	 * @param pred Binary function that accepts two elements as arguments (one of each of the two sequences, in the
	 *			   same order), and returns a value convertible to <code>bool</code>. The value returned indicates
	 *			   whether the elements are considered to match in the context of this function.
	 * 
	 * @return An {@link base.Iterator} to the first element of the last occurrence of [<i>first2</i>, <i>last2</i>) in 
	 *		   [<i>first1</i>, <i>last1</i>). If the sequence is not found, the function returns ,i>last1</i>. Otherwise 
	 *		   [<i>first2</i>, <i>last2</i>) is an empty range, the function returns <i>last1</i>.
	 */
	export function find_end
		<T, Iterator1 extends base.Iterator<T>, Iterator2 extends base.Iterator<T>>
		(
			first1: Iterator1, last1: Iterator1, first2: Iterator2, last2: Iterator2, 
			pred: (x: T, y: T) => boolean
		): Iterator1;

	export function find_end
		<T, Iterator1 extends base.Iterator<T>, Iterator2 extends base.Iterator<T>>
		(
			first1: Iterator1, last1: Iterator1, first2: Iterator2, last2: Iterator2, 
			compare: (x: T, y: T) => boolean = equal_to
		): Iterator1
	{
		if (first2.equals(last2))
			return last1;

		let ret: Iterator1 = last1;

		for (; !first1.equals(last1); first1 = first1.next() as Iterator1)
		{
			let it1: Iterator1 = first1;
			let it2: Iterator2 = first2;

			while (equal_to(it1.value, it2.value))
			{
				it1 = it1.next() as Iterator1;
				it2 = it2.next() as Iterator2;

				if (it2.equals(last2))
				{
					ret = first1;
					break;
				}
				else if (it1.equals(last1))
					return ret;
			}
		}
		return ret;
	}

	/**
	 * Find element from set in range.
	 * 
	 * Returns an iterator to the first element in the range [<i>first1</i>, <i>last1</i>) that matches any of the 
	 * elements in [<i>first2</i>, <i>last2</i>). If no such element is found, the function returns <i>last1</i>.
	 * 
	 * The elements in [<i>first1</i>, <i>last1</i>) are sequentially compared to each of the values in 
	 * [<i>first2</i>, <i>last2</i>) using {@link equal_to}, until a pair matches.
	 * 
	 * @param first1 An {@link base.Iterator} to the initial position of the first sequence.
	 * @param last1 An {@link base.Iterator} to the final position in a sequence. The range used is
	 *				[<i>first1</i>, <i>last1</i>), including the element pointed by <i>first1</i>, but not the element
	 *				pointed by <i>last1</i>.
	 * @param first2 An {@link base.Iterator} to the initial position of the element values to be searched for.
	 * @param last2 An {@link base.Iterator} to the final position of the element values to be searched for. The range used
	 *				is [<i>first2</i>, <i>last2</i>).
	 * 
	 * @return An {@link base.Iterator} to the first element in [<i>first1</i>, <i>last1</i>) that is part of 
	 *		   [<i>first2</i>, <i>last2</i>). If no matches are found, the function returns <i>last1</i>.
	 */
	export function find_first_of
		<T, Iterator1 extends base.Iterator<T>, Iterator2 extends base.Iterator<T>>
		(first1: Iterator1, last1: Iterator1, first2: Iterator2, last2: Iterator2): Iterator1;

	/**
	 * Find element from set in range.
	 * 
	 * Returns an iterator to the first element in the range [<i>first1</i>, <i>last1</i>) that matches any of the 
	 * elements in [<i>first2</i>, <i>last2</i>). If no such element is found, the function returns <i>last1</i>.
	 * 
	 * The elements in [<i>first1</i>, <i>last1</i>) are sequentially compared to each of the values in 
	 * [<i>first2</i>, <i>last2</i>) using <i>pred</i>, until a pair matches.
	 * 
	 * @param first1 An {@link base.Iterator} to the initial position of the first sequence.
	 * @param last1 An {@link base.Iterator} to the final position in a sequence. The range used is
	 *				[<i>first1</i>, <i>last1</i>), including the element pointed by <i>first1</i>, but not the element
	 *				pointed by <i>last1</i>.
	 * @param first2 An {@link base.Iterator} to the initial position of the element values to be searched for.
	 * @param last2 An {@link base.Iterator} to the final position of the element values to be searched for. The range used
	 *				is [<i>first2</i>, <i>last2</i>).
	 * @param pred Binary function that accepts two elements as arguments (one of each of the two sequences, in the 
	 *			   same order), and returns a value convertible to <code>bool</code>. The value returned indicates 
	 *			   whether the elements are considered to match in the context of this function.
	 * 
	 * @return An {@link base.Iterator} to the first element in [<i>first1</i>, <i>last1</i>) that is part of 
	 *		   [<i>first2</i>, <i>last2</i>). If no matches are found, the function returns <i>last1</i>.
	 */
	export function find_first_of
		<T, Iterator1 extends base.Iterator<T>, Iterator2 extends base.Iterator<T>>
		(
			first1: Iterator1, last1: Iterator1, first2: Iterator2, last2: Iterator2,
			pred: (x: T, y: T) => boolean
		): Iterator1;

	export function find_first_of
		<T, Iterator1 extends base.Iterator<T>, Iterator2 extends base.Iterator<T>>
		(
			first1: Iterator1, last1: Iterator1, first2: Iterator2, last2: Iterator2,
			pred: (x: T, y: T) => boolean = equal_to
		): Iterator1
	{
		for (; !first1.equals(last1); first1 = first1.next() as Iterator1)
			for (let it = first2; !it.equals(last2); it = it.next() as Iterator2)
				if (pred(it.value, first1.value))
					return first1;

		return last1;
	}

	/**
	 * Find equal adjacent elements in range.
	 * 
	 * Searches the range [<i>first</i>, <i>last</i>) for the first occurrence of two consecutive elements that match, 
	 * and returns an {@link base.Iterator} to the first of these two elements, or <i>last</i> if no such pair is found.
	 * 
	 * Two elements match if they compare equal using {@link equal_to}.
	 * 
	 * @param first An {@link base.Iterator} to the initial position in a sequence.
	 * @param last An {@link base.Iterator} to the final position in a sequence. The range used is [<i>first</i>, <i>last</i>),
	 *			  which contains all the elements between <i>first</i> and <i>last</i>, including the element pointed by
	 *			  <i>first</i> but not the element pointed by <i>last</i>.
	 * 
	 * @return An {@link base.Iterator} to the first element of the first pair of matching consecutive elements in the range 
	 *		   [<i>first</i>, <i>last</i>). If no such pair is found, the function returns <i>last</i>.
	 */
	export function adjacent_find<T, InputIterator extends base.Iterator<T>>
		(first: InputIterator, last: InputIterator): InputIterator;

	/**
	 * Find equal adjacent elements in range.
	 * 
	 * Searches the range [<i>first</i>, <i>last</i>) for the first occurrence of two consecutive elements that match, 
	 * and returns an {@link base.Iterator} to the first of these two elements, or <i>last</i> if no such pair is found.
	 * 
	 * Two elements match if they compare equal using <i>pred</i>.
	 * 
	 * @param first An {@link base.Iterator} to the initial position in a sequence.
	 * @param last An {@link base.Iterator} to the final position in a sequence. The range used is [<i>first</i>, <i>last</i>),
	 *			  which contains all the elements between <i>first</i> and <i>last</i>, including the element pointed by
	 *			  <i>first</i> but not the element pointed by <i>last</i>.
	 * @param pred Unary function that accepts an element in the range as argument and returns a value convertible to 
	 *			   <code>bool</code>. The value returned indicates whether the element is considered a match in the 
	 *			   context of this function. The function shall not modify its argument.
	 * 
	 * @return An {@link base.Iterator} to the first element of the first pair of matching consecutive elements in the range 
	 *		   [<i>first</i>, <i>last</i>). If no such pair is found, the function returns <i>last</i>.
	 */
	export function adjacent_find<T, InputIterator extends base.Iterator<T>>
		(first: InputIterator, last: InputIterator, pred: (x: T, y: T) => boolean): InputIterator;

	export function adjacent_find<T, InputIterator extends base.Iterator<T>>
		(first: InputIterator, last: InputIterator, pred: (x: T, y: T) => boolean = equal_to): InputIterator
	{
		if (!first.equals(last))
		{
			let next: InputIterator = first.next() as InputIterator;

			while (!next.equals(last))
			{
				if (equal_to(first.value, last.value))
					return first;

				first = first.next() as InputIterator;
				next = next.next() as InputIterator;
			}
		}
		return last;
	}

	/**
	 * Search range for subsequence.
	 * 
	 * Searches the range [<i>first1</i>, <i>last1</i>) for the first occurrence of the sequence defined by 
	 * [<i>first2</i>, <i>last2</i>), and returns an iterator to its first element, or <i>last1</i> if no occurrences are 
	 * found.
	 * 
	 * The elements in both ranges are compared sequentially using {@link equal_to}: A subsequence of 
	 * [<i>first1</i>, <i>last1</i>) is considered a match only when this is true for <b>all</b> the elements of 
	 * [<i>first2</i>, <i>last2</i>).
	 * 
	 * This function returns the first of such occurrences. For an algorithm that returns the last instead, see 
	 * {@link find_end}.
	 * 
	 * @param first1 {@link base.Iterator Forward iterator} to the initial position of the searched sequence.
	 * @param last1 {@link base.Iterator Forward iterator} to the final position of the searched sequence. The range used is 
	 *				[<i>first1</i>, <i>last1</i>), which contains all the elements between <i>first1</i> and <i>last1</i>, 
	 *				including the element pointed by <i>first1</i> but not the element pointed by <i>last1</i>.
	 * @param first2 {@link base.Iterator Forward iterator} to the initial position of the sequence to be searched for.
	 * @param last2 {@link base.Iterator Forward iterator} to the final position of the sequence to be searched for. The range 
	 *				used is [<i>first2</i>, <i>last2</i>).
	 * 
	 * @return An iterator to the first element of the first occurrence of [<i>first2</i>, <i>last2</i>) in <i>first1</i> 
	 *		   and <i>last1</i>. If the sequence is not found, the function returns <i>last1</i>. Otherwise 
	 *		   [<i>first2</i>, <i>last2</i>) is an empty range, the function returns <i>first1</i>.
	 */
	export function search<T, ForwardIterator1 extends base.Iterator<T>, ForwardIterator2 extends base.Iterator<T>>
		(first1: ForwardIterator1, last1: ForwardIterator1, first2: ForwardIterator2, last2: ForwardIterator2): ForwardIterator1

	/**
	 * Search range for subsequence.
	 * 
	 * Searches the range [<i>first1</i>, <i>last1</i>) for the first occurrence of the sequence defined by 
	 * [<i>first2</i>, <i>last2</i>), and returns an iterator to its first element, or <i>last1</i> if no occurrences are 
	 * found.
	 * 
	 * The elements in both ranges are compared sequentially using <i>pred</i>: A subsequence of 
	 * [<i>first1</i>, <i>last1</i>) is considered a match only when this is true for <b>all</b> the elements of 
	 * [<i>first2</i>, <i>last2</i>).
	 * 
	 * This function returns the first of such occurrences. For an algorithm that returns the last instead, see 
	 * {@link find_end}.
	 * 
	 * @param first1 {@link base.Iterator Forward iterator} to the initial position of the searched sequence.
	 * @param last1 {@link base.Iterator Forward iterator} to the final position of the searched sequence. The range used is 
	 *				[<i>first1</i>, <i>last1</i>), which contains all the elements between <i>first1</i> and <i>last1</i>, 
	 *				including the element pointed by <i>first1</i> but not the element pointed by <i>last1</i>.
	 * @param first2 {@link base.Iterator Forward iterator} to the initial position of the sequence to be searched for.
	 * @param last2 {@link base.Iterator Forward iterator} to the final position of the sequence to be searched for. The range 
	 *				used is [<i>first2</i>, <i>last2</i>).
	 * @param pred Binary function that accepts two elements as arguments (one of each of the two sequences, in the same 
	 *			   order), and returns a value convertible to bool. The returned value indicates whether the elements are 
	 *			   considered to match in the context of this function. The function shall not modify any of its 
	 *			   arguments.
	 * 
	 * @return An iterator to the first element of the first occurrence of [<i>first2</i>, <i>last2</i>) in 
	 *		   [<i>first1</i>, <i>last1</i>). If the sequence is not found, the function returns last1. Otherwise 
	 *		   [<i>first2</i>, <i>last2</i>) is an empty range, the function returns <i>first1</i>.
	 */
	export function search<T, ForwardIterator1 extends base.Iterator<T>, ForwardIterator2 extends base.Iterator<T>>
		(
			first1: ForwardIterator1, last1: ForwardIterator1, first2: ForwardIterator2, last2: ForwardIterator2,
			pred: (x: T, y: T) => boolean
		): ForwardIterator1

	export function search<T, ForwardIterator1 extends base.Iterator<T>, ForwardIterator2 extends base.Iterator<T>>
		(
			first1: ForwardIterator1, last1: ForwardIterator1, first2: ForwardIterator2, last2: ForwardIterator2,
			pred: (x: T, y: T) => boolean = equal_to
		): ForwardIterator1
	{
		if (first2.equals(last2))
			return first1;

		for (; !first1.equals(last1); first1 = first1.next() as ForwardIterator1)
		{
			let it1: ForwardIterator1 = first1;
			let it2: ForwardIterator2 = first2;

			while (equal_to(it1.value, it2.value))
			{
				it1 = it1.next() as ForwardIterator1;
				it2 = it2.next() as ForwardIterator2;

				if (it2.equals(last2))
					return first1;
				else if (it1.equals(last1))
					return last1;
			}
		}
		return last1;
	}

	/**
	 * Search range for elements.
	 * 
	 * Searches the range [<i>first</i>, <i>last</i>) for a sequence of <i>count</i> elements, each comparing equal to 
	 * <i>val</i>.
	 * 
	 * The function returns an iterator to the first of such elements, or <i>last</i> if no such sequence is found. 
	 * 
	 * @param first {@link base.Iterator Forward iterator} to the initial position of the searched sequence.
	 * @param last {@link base.Iterator Forward iterator} to the final position of the searched sequence. The range used is 
	 *			   [<i>first</i>, <i>last</i>), which contains all the elements between <i>first</i> and <i>last</i>, 
	 *			   including the element pointed by <i>first</i> but not the element pointed by <i>last</i>.
	 * @param count Minimum number of successive elements to match.
	 * @param val Individual value to be compared, or to be used as argument for {@link equal_to}.
	 * 
	 * @return An iterator to the first element of the sequence. If no such sequence is found, the function returns 
	 *		   <i>last</i>.
	 */
	export function search_n<T, ForwardIterator extends base.IArrayIterator<T>>
		(first: ForwardIterator, last: ForwardIterator, count: number, val: T): ForwardIterator;

	/**
	 * Search range for elements.
	 * 
	 * Searches the range [<i>first</i>, <i>last</i>) for a sequence of <i>count</i> elements, each comparing equal to 
	 * <i>val</i>.
	 * 
	 * The function returns an iterator to the first of such elements, or <i>last</i> if no such sequence is found. 
	 *
	 * 
	 * @param first {@link base.Iterator Forward iterator} to the initial position of the searched sequence.
	 * @param last {@link base.Iterator Forward iterator} to the final position of the searched sequence. The range used is 
	 *			   [<i>first</i>, <i>last</i>), which contains all the elements between <i>first</i> and <i>last</i>, 
	 *			   including the element pointed by <i>first</i> but not the element pointed by <i>last</i>.
	 * @param count Minimum number of successive elements to match.
	 * @param val Individual value to be compared, or to be used as argument for <i>pred</i>.
	 * @param pred Binary function that accepts two arguments (one element from the sequence as first, and <i>val</i> as 
	 *			   second), and returns a value convertible to <code>bool</code>. The value returned indicates whether the 
	 *			   element is considered a match in the context of this function. The function shall not modify any of its 
	 *			   arguments.
	 *
	 * @return An {@link base.Iterator} to the first element of the sequence. If no such sequence is found, the function 
	 *		   returns <i>last</i>.
	 */
	export function search_n<T, ForwardIterator extends base.IArrayIterator<T>>
		(
			first: ForwardIterator, last: ForwardIterator, count: number, val: T, 
			pred: (x: T, y: T) => boolean
		): ForwardIterator;

	export function search_n<T, ForwardIterator extends base.IArrayIterator<T>>
		(
			first: ForwardIterator, last: ForwardIterator, count: number, val: T, 
			pred: (x: T, y: T) => boolean = equal_to
		): ForwardIterator
	{
		let limit: ForwardIterator = first.advance(distance(first, last) - count) as ForwardIterator;

		for (; !first.equals(limit); first = first.next() as ForwardIterator)
		{
			let it: ForwardIterator = first;
			let i: number = 0;

			while (equal_to(it.value, val))
			{
				it = it.next() as ForwardIterator;

				if (++i == count)
					return first;
			}
		}
		return last;
	}

	/**
	 * Return first position where two ranges differ.
	 * 
	 * Compares the elements in the range [<i>first1</i>, <i>last1</i>) with those in the range beginning at 
	 * <i>first2</i>, and returns the first element of both sequences that does not match.
	 *
	 * The function returns a {@link Pair} of {@link iterators base.Iterator} to the first element in each range that 
	 * does not match.
	 * 
	 * @param first1 An {@link base.Iterator} to the initial position of the first sequence.
	 * @param last1 An {@link base.Iterator} to the final position in a sequence. The range used is
	 *				[<i>first1</i>, <i>last1</i>), including the element pointed by <i>first1</i>, but not the element
	 *				pointed by <i>last1</i>.
	 * @param first2 An {@link base.Iterator} to the initial position of the second sequence. The comparison includes up to 
	 *				 as many elements of this sequence as those in the range [<i>first1</i>, <i>last1</i>).
	 * 
	 * @return A {@link Pair}, where its members {@link Pair.first first} and {@link Pair.second second} point to the 
	 *		   first element in both sequences that did not compare equal to each other. If the elements compared in 
	 *		   both sequences have all matched, the function returns a {@link Pair} with {@link Pair.first first} set 
	 *		   to <i>last1</i> and {@link Pair.second second} set to the element in that same relative position in the 
	 *		   second sequence. If none matched, it returns {@link make_pair}(<i>first1</i>, <i>first2</i>).
	 */
	export function mismatch
		<T, Iterator1 extends base.Iterator<T>, Iterator2 extends base.Iterator<T>>
		(first1: Iterator1, last1: Iterator1, first2: Iterator2): Pair<Iterator1, Iterator2>;

	/**
	 * Return first position where two ranges differ.
	 * 
	 * Compares the elements in the range [<i>first1</i>, <i>last1</i>) with those in the range beginning at 
	 * <i>first2</i>, and returns the first element of both sequences that does not match.
	 *
	 * The function returns a {@link Pair} of {@link iterators base.Iterator} to the first element in each range that 
	 * does not match.
	 * 
	 * @param first1 An {@link base.Iterator} to the initial position of the first sequence.
	 * @param last1 An {@link base.Iterator} to the final position in a sequence. The range used is
	 *				[<i>first1</i>, <i>last1</i>), including the element pointed by <i>first1</i>, but not the element
	 *				pointed by <i>last1</i>.
	 * @param first2 An {@link base.Iterator} to the initial position of the second sequence. The comparison includes up to 
	 *				 as many elements of this sequence as those in the range [<i>first1</i>, <i>last1</i>).
	 * @param pred Binary function that accepts two elements as argument (one of each of the two sequences, in the same 
	 *			   order), and returns a value convertible to <code>bool</code>. The value returned indicates whether 
	 *			   the elements are considered to match in the context of this function.
	 * 
	 * @return A {@link Pair}, where its members {@link Pair.first first} and {@link Pair.second second} point to the 
	 *		   first element in both sequences that did not compare equal to each other. If the elements compared in 
	 *		   both sequences have all matched, the function returns a {@link Pair} with {@link Pair.first first} set 
	 *		   to <i>last1</i> and {@link Pair.second second} set to the element in that same relative position in the 
	 *		   second sequence. If none matched, it returns {@link make_pair}(<i>first1</i>, <i>first2</i>).
	 */
	export function mismatch
		<T, Iterator1 extends base.Iterator<T>, Iterator2 extends base.Iterator<T>>
		(
			first1: Iterator1, last1: Iterator1, first2: Iterator2,
			compare: (x: T, y: T) => boolean
		): Pair<Iterator1, Iterator2>;

	export function mismatch
		<T, Iterator1 extends base.Iterator<T>, Iterator2 extends base.Iterator<T>>
		(
			first1: Iterator1, last1: Iterator1, first2: Iterator2,
			compare: (x: T, y: T) => boolean = equal_to
		): Pair<Iterator1, Iterator2>
	{
		while (!first1.equals(last1) && !first2.equals(first2.source().end())
			&& equal_to(first1.value, first2.value))
		{
			first1 = first1.next() as Iterator1;
			first2 = first2.next() as Iterator2;
		}
		return make_pair(first1, first2);
	}

	/* ---------------------------------------------------------
		COUNTERS
	--------------------------------------------------------- */
	/**
	 * Count appearances of value in range.
	 * 
	 * Returns the number of elements in the range [<i>first</i>, <i>last</i>) that compare equal to <i>val</i>.
	 * 
	 * The function uses {@link equal_to} to compare the individual elements to <i>val</i>.
	 * 
	 * @param first An {@link base.Iterator} to the initial position in a sequence.
	 * @param last An {@link base.Iterator} to the final position in a sequence. The range used is [<i>first</i>, <i>last</i>),
	 *			  which contains all the elements between <i>first</i> and <i>last</i>, including the element pointed by
	 *			  <i>first</i> but not the element pointed by <i>last</i>.
	 * @param val Value to match.
	 *
	 * @return The number of elements in the range [<i>first</i>, <i>last</i>) that compare equal to <i>val</i>.
	 */
	export function count<T, InputIterator extends base.Iterator<T>>
		(first: InputIterator, last: InputIterator, val: T): number
	{
		let cnt: number = 0;

		for (let it = first; !it.equals(last); it = it.next() as InputIterator)
			if (equal_to(it.value, val))
				cnt++;

		return cnt;
	}

	/**
	 * Return number of elements in range satisfying condition.
	 * 
	 * Returns the number of elements in the range [<i>first</i>, <i>last</i>) for which pred is <code>true</code>. 
	 * 
	 * @param first An {@link base.Iterator} to the initial position in a sequence.
	 * @param last An {@link base.Iterator} to the final position in a sequence. The range used is [<i>first</i>, <i>last</i>),
	 *			  which contains all the elements between <i>first</i> and <i>last</i>, including the element pointed by
	 *			  <i>first</i> but not the element pointed by <i>last</i>.
	 * @param pred Unary function that accepts an element in the range as argument, and returns a value convertible 
	 *			   to <code>bool</code>. The value returned indicates whether the element is counted by this function.
	 *			   The function shall not modify its argument. This can either be a function pointer or a function 
	 *			   object.
	 */
	export function count_if<T, InputIterator extends base.Iterator<T>>
		(first: InputIterator, last: InputIterator, pred: (val: T) => boolean): number
	{
		let cnt: number = 0;

		for (let it = first; !it.equals(last); it = it.next() as InputIterator)
			if (pred(it.value))
				cnt++;

		return cnt;
	}
}