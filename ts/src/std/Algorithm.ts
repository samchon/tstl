/// <reference path="API.ts" />

// Standard Template Library: Algorithms
// The header <algorithm> defines a collection of functions especially designed to be used on ranges of elements.
//
// A range is any sequence of objects that can be accessed through iterators or pointers, such as an array or an 
// instance of some of the STL containers. Notice though, that algorithms operate through iterators directly on the 
// values, not affecting in any way the structure of any possible container (it never affects the size or storage 
// allocation of the container).
//
// @reference http://www.cplusplus.com/reference/algorithm
// @author Jeongho Nam <http://samchon.org>

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
	 * @param first An {@link Iterator} to the initial position in a sequence.
	 * @param last An {@link Iterator} to the final position in a sequence. The range used is [<i>first</i>, <i>last</i>), 
	 *			  which contains all the elements between <i>first</i> and <i>last</i>, including the element pointed by 
	 *			  <i>first</i> but not the element pointed by <i>last</i>.
	 * @param fn Unary function that accepts an element in the range as argument. This can either be a function p
	 *			 ointer or a move constructible function object. Its return value, if any, is ignored.
	 */
	export function for_each<T, InputIterator extends Iterator<T>, Func extends (val: T) => any>
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
	 * @param first An {@link Iterator} to the initial position in a sequence.
	 * @param n the number of elements to apply the function to
	 * @param fn Unary function that accepts an element in the range as argument. This can either be a function p
	 *			 ointer or a move constructible function object. Its return value, if any, is ignored.
	 * 
	 * @return first + n
	 */
	export function for_each_n<T, InputIterator extends Iterator<T>>
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
	 * @param first An {@link Iterator} to the initial position in a sequence.
	 * @param last An {@link Iterator} to the final position in a sequence. The range used is [<i>first</i>, <i>last</i>),
	 *			  which contains all the elements between <i>first</i> and <i>last</i>, including the element pointed by
	 *			  <i>first</i> but not the element pointed by <i>last</i>.
	 * @param pred Unary function that accepts an element in the range as argument and returns a value convertible to
	 *			   <code>boolean</code>. The value returned indicates whether the element fulfills the condition 
	 *			   checked by this function. The function shall not modify its argument.
	 *
	 * @return <code>true</code> if pred returns true for all the elements in the range or if the range is 
	 *		   {@link Container.empty empty}, and <code>false</code> otherwise.
	 */
	export function all_of<T, InputIterator extends Iterator<T>>
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
	 * @param first An {@link Iterator} to the initial position in a sequence.
	 * @param last An {@link Iterator} to the final position in a sequence. The range used is [<i>first</i>, <i>last</i>),
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
	export function any_of<T, InputIterator extends Iterator<T>>
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
	 * @param first An {@link Iterator} to the initial position in a sequence.
	 * @param last An {@link Iterator} to the final position in a sequence. The range used is [<i>first</i>, <i>last</i>),
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
	export function none_of<T, InputIterator extends Iterator<T>>
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
	 * @param first1 An {@link Iterator} to the initial position of the first sequence.
	 * @param last1 An {@link Iterator} to the final position in a sequence. The range used is
	 *				[<i>first1</i>, <i>last1</i>), including the element pointed by <i>first1</i>, but not the element
	 *				pointed by <i>last1</i>.
	 * @param first2 An {@link Iterator} to the initial position of the second sequence. The comparison includes up to 
	 *				 as many elements of this sequence as those in the range [<i>first1</i>, <i>last1</i>).
	 * 
	 * @return <code>true</code> if all the elements in the range [<i>first1</i>, <i>last1</i>) compare equal to those 
	 *		   of the range starting at <i>first2</i>, and <code>false</code> otherwise.
	 */
	export function equal<T, InputIterator extends Iterator<T>>
		(first1: InputIterator, last1: InputIterator, first2: Iterator<T>): boolean;

	/**
	 * Test whether the elements in two ranges are equal.
	 * 
	 * Compares the elements in the range [<i>first1</i>, <i>last1</i>) with those in the range beginning at 
	 * <i>first2</i>, and returns <code>true</code> if all of the elements in both ranges match.
	 * 
	 * @param first1 An {@link Iterator} to the initial position of the first sequence.
	 * @param last1 An {@link Iterator} to the final position in a sequence. The range used is
	 *				[<i>first1</i>, <i>last1</i>), including the element pointed by <i>first1</i>, but not the element
	 *				pointed by <i>last1</i>.
	 * @param first2 An {@link Iterator} to the initial position of the second sequence. The comparison includes up to 
	 *				 as many elements of this sequence as those in the range [<i>first1</i>, <i>last1</i>).
	 * @param pred Binary function that accepts two elements as argument (one of each of the two sequences, in the same 
	 *			   order), and returns a value convertible to <code>bool</code>. The value returned indicates whether 
	 *			   the elements are considered to match in the context of this function.
	 * 
	 * @return <code>true</code> if all the elements in the range [<i>first1</i>, <i>last1</i>) compare equal to those
	 *		   of the range starting at <i>first2</i>, and <code>false</code> otherwise.
	 */
	export function equal<T, InputIterator extends Iterator<T>>
		(
			first1: InputIterator, last1: InputIterator, first2: Iterator<T>,
			pred: (x: T, y: T) => boolean
		): boolean;

	export function equal<T, InputIterator extends Iterator<T>>
		(
			first1: InputIterator, last1: InputIterator, first2: Iterator<T>,
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
	 * @param first1 An {@link Iterator} to the initial position of the first sequence.
	 * @param last1 An {@link Iterator} to the final position in a sequence. The range used is 
	 *				[<i>first1</i>, <i>last1</i>), including the element pointed by <i>first1</i>, but not the element
	 *				pointed by <i>last1</i>.
	 * @param first2 An {@link Iterator} to the initial position of the second sequence.
	 * @param last2 An {@link Iterator} to the final position of the second sequence. The ranged used is 
	 *				[<i>first2</i>, <i>last2</i>).
	 * 
	 * @return <code>true</code> if the first range compares <i>lexicographically less</i> than than the second. 
	 *		   <code>false</code> otherwise (including when all the elements of both ranges are equivalent).
	 */
	export function lexicographical_compare
		<T, T1 extends T, T2 extends T, 
			Iterator1 extends Iterator<T1>, Iterator2 extends Iterator<T2>>
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
	 * @param first1 An {@link Iterator} to the initial position of the first sequence.
	 * @param last1 An {@link Iterator} to the final position in a sequence. The range used is 
	 *				[<i>first1</i>, <i>last1</i>), including the element pointed by <i>first1</i>, but not the element
	 *				pointed by <i>last1</i>.
	 * @param first2 An {@link Iterator} to the initial position of the second sequence.
	 * @param last2 An {@link Iterator} to the final position of the second sequence. The ranged used is 
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
			Iterator1 extends Iterator<T1>, Iterator2 extends Iterator<T2>>
		(
			first1: Iterator1, last1: Iterator1, first2: Iterator2, last2: Iterator2, 
			compare: (x: T, y: T) => boolean
		) : boolean;
	
	export function lexicographical_compare
		<T, T1 extends T, T2 extends T,
			Iterator1 extends Iterator<T1>, Iterator2 extends Iterator<T2>>
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
	 * @param first An {@link Iterator} to the initial position in a sequence.
	 * @param last An {@link Iterator} to the final position in a sequence. The range used is [<i>first</i>, <i>last</i>),
	 *			  which contains all the elements between <i>first</i> and <i>last</i>, including the element pointed by
	 *			  <i>first</i> but not the element pointed by <i>last</i>.
	 * @param val Value to search for in the range.
	 * 
	 * @return An {@link Iterator} to the first element in the range that compares equal to <i>val</i>. If no elements 
	 *		   match, the function returns <i>last</i>.
	 */
	export function find<T, InputIterator extends Iterator<T>>
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
	 * @param first An {@link Iterator} to the initial position in a sequence.
	 * @param last An {@link Iterator} to the final position in a sequence. The range used is [<i>first</i>, <i>last</i>),
	 *			  which contains all the elements between <i>first</i> and <i>last</i>, including the element pointed by
	 *			  <i>first</i> but not the element pointed by <i>last</i>.
	 * @param pred Unary function that accepts an element in the range as argument and returns a value convertible 
	 *			   to <code>bool</code>. The value returned indicates whether the element is considered a match in 
	 *			   the context of this function. The function shall not modify its argument.
	 * 
	 * @return An {@link Iterator} to the first element in the range for which <i>pred</i> does not return 
	 *		   <code>false</code>. If <i>pred</i> is <code>false</code> for all elements, the function returns 
	 *		   <i>last</i>.
	 */
	export function find_if<T, InputIterator extends Iterator<T>>
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
	 * @param first An {@link Iterator} to the initial position in a sequence.
	 * @param last An {@link Iterator} to the final position in a sequence. The range used is [<i>first</i>, <i>last</i>),
	 *			  which contains all the elements between <i>first</i> and <i>last</i>, including the element pointed by
	 *			  <i>first</i> but not the element pointed by <i>last</i>.
	 * @param pred Unary function that accepts an element in the range as argument and returns a value convertible 
	 *			   to <code>bool</code>. The value returned indicates whether the element is considered a match in 
	 *			   the context of this function. The function shall not modify its argument.
	 * 
	 * @return An {@link Iterator} to the first element in the range for which <i>pred</i> returns <code>false</code>.
	 *		   If <i>pred</i> is <code>true</code> for all elements, the function returns <i>last</i>.
	 */
	export function find_if_not<T, InputIterator extends Iterator<T>>
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
	 * [<i>first2</i>, <i>last2</i>), and returns an {@link Iterator} to its first element, or <i>last1,/i> if no 
	 * occurrences are found.
	 * 
	 * The elements in both ranges are compared sequentially using {@link equal_to}: A subsequence of 
	 * [<i>first1</i>, <i>last1</i>) is considered a match only when this is <code>true</code> for all the elements of 
	 * [<i>first2</i>, <i>last2</i>).
	 * 
	 * This function returns the last of such occurrences. For an algorithm that returns the first instead, see 
	 * {@link search}.
	 * 
	 * @param first1 An {@link Iterator} to the initial position of the first sequence.
	 * @param last1 An {@link Iterator} to the final position in a sequence. The range used is
	 *				[<i>first1</i>, <i>last1</i>), including the element pointed by <i>first1</i>, but not the element
	 *				pointed by <i>last1</i>.
	 * @param first2 An {@link Iterator} to the initial position of the element values to be searched for.
	 * @param last2 An {@link Iterator} to the final position of the element values to be searched for. The range used
	 *				is [<i>first2</i>, <i>last2</i>).
	 * @param pred Binary function that accepts two elements as arguments (one of each of the two sequences, in the
	 *			   same order), and returns a value convertible to <code>bool</code>. The value returned indicates
	 *			   whether the elements are considered to match in the context of this function.
	 * 
	 * @return An {@link Iterator} to the first element of the last occurrence of [<i>first2</i>, <i>last2</i>) in 
	 *		   [<i>first1</i>, <i>last1</i>). If the sequence is not found, the function returns ,i>last1</i>. Otherwise 
	 *		   [<i>first2</i>, <i>last2</i>) is an empty range, the function returns <i>last1</i>.
	 */
	export function find_end
		<T, Iterator1 extends Iterator<T>, Iterator2 extends Iterator<T>>
		(first1: Iterator1, last1: Iterator1, first2: Iterator2, last2: Iterator2): Iterator1;
	
	/**
	 * Find last subsequence in range.
	 * 
	 * Searches the range [<i>first1</i>, <i>last1</i>) for the last occurrence of the sequence defined by 
	 * [<i>first2</i>, <i>last2</i>), and returns an {@link Iterator} to its first element, or <i>last1,/i> if no 
	 * occurrences are found.
	 * 
	 * The elements in both ranges are compared sequentially using <i>pred</i>: A subsequence of 
	 * [<i>first1</i>, <i>last1</i>) is considered a match only when this is <code>true</code> for all the elements of 
	 * [<i>first2</i>, <i>last2</i>).
	 * 
	 * This function returns the last of such occurrences. For an algorithm that returns the first instead, see 
	 * {@link search}.
	 * 
	 * @param first1 An {@link Iterator} to the initial position of the first sequence.
	 * @param last1 An {@link Iterator} to the final position in a sequence. The range used is
	 *				[<i>first1</i>, <i>last1</i>), including the element pointed by <i>first1</i>, but not the element
	 *				pointed by <i>last1</i>.
	 * @param first2 An {@link Iterator} to the initial position of the element values to be searched for.
	 * @param last2 An {@link Iterator} to the final position of the element values to be searched for. The range used
	 *				is [<i>first2</i>, <i>last2</i>).
	 * @param pred Binary function that accepts two elements as arguments (one of each of the two sequences, in the
	 *			   same order), and returns a value convertible to <code>bool</code>. The value returned indicates
	 *			   whether the elements are considered to match in the context of this function.
	 * 
	 * @return An {@link Iterator} to the first element of the last occurrence of [<i>first2</i>, <i>last2</i>) in 
	 *		   [<i>first1</i>, <i>last1</i>). If the sequence is not found, the function returns ,i>last1</i>. Otherwise 
	 *		   [<i>first2</i>, <i>last2</i>) is an empty range, the function returns <i>last1</i>.
	 */
	export function find_end
		<T, Iterator1 extends Iterator<T>, Iterator2 extends Iterator<T>>
		(
			first1: Iterator1, last1: Iterator1, first2: Iterator2, last2: Iterator2, 
			pred: (x: T, y: T) => boolean
		): Iterator1;

	export function find_end
		<T, Iterator1 extends Iterator<T>, Iterator2 extends Iterator<T>>
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
	 * @param first1 An {@link Iterator} to the initial position of the first sequence.
	 * @param last1 An {@link Iterator} to the final position in a sequence. The range used is
	 *				[<i>first1</i>, <i>last1</i>), including the element pointed by <i>first1</i>, but not the element
	 *				pointed by <i>last1</i>.
	 * @param first2 An {@link Iterator} to the initial position of the element values to be searched for.
	 * @param last2 An {@link Iterator} to the final position of the element values to be searched for. The range used
	 *				is [<i>first2</i>, <i>last2</i>).
	 * 
	 * @return An {@link Iterator} to the first element in [<i>first1</i>, <i>last1</i>) that is part of 
	 *		   [<i>first2</i>, <i>last2</i>). If no matches are found, the function returns <i>last1</i>.
	 */
	export function find_first_of
		<T, Iterator1 extends Iterator<T>, Iterator2 extends Iterator<T>>
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
	 * @param first1 An {@link Iterator} to the initial position of the first sequence.
	 * @param last1 An {@link Iterator} to the final position in a sequence. The range used is
	 *				[<i>first1</i>, <i>last1</i>), including the element pointed by <i>first1</i>, but not the element
	 *				pointed by <i>last1</i>.
	 * @param first2 An {@link Iterator} to the initial position of the element values to be searched for.
	 * @param last2 An {@link Iterator} to the final position of the element values to be searched for. The range used
	 *				is [<i>first2</i>, <i>last2</i>).
	 * @param pred Binary function that accepts two elements as arguments (one of each of the two sequences, in the 
	 *			   same order), and returns a value convertible to <code>bool</code>. The value returned indicates 
	 *			   whether the elements are considered to match in the context of this function.
	 * 
	 * @return An {@link Iterator} to the first element in [<i>first1</i>, <i>last1</i>) that is part of 
	 *		   [<i>first2</i>, <i>last2</i>). If no matches are found, the function returns <i>last1</i>.
	 */
	export function find_first_of
		<T, Iterator1 extends Iterator<T>, Iterator2 extends Iterator<T>>
		(
			first1: Iterator1, last1: Iterator1, first2: Iterator2, last2: Iterator2,
			pred: (x: T, y: T) => boolean
		): Iterator1;

	export function find_first_of
		<T, Iterator1 extends Iterator<T>, Iterator2 extends Iterator<T>>
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
	 * and returns an {@link Iterator} to the first of these two elements, or <i>last</i> if no such pair is found.
	 * 
	 * Two elements match if they compare equal using {@link equal_to}.
	 * 
	 * @param first An {@link Iterator} to the initial position in a sequence.
	 * @param last An {@link Iterator} to the final position in a sequence. The range used is [<i>first</i>, <i>last</i>),
	 *			  which contains all the elements between <i>first</i> and <i>last</i>, including the element pointed by
	 *			  <i>first</i> but not the element pointed by <i>last</i>.
	 * 
	 * @return An {@link Iterator} to the first element of the first pair of matching consecutive elements in the range 
	 *		   [<i>first</i>, <i>last</i>). If no such pair is found, the function returns <i>last</i>.
	 */
	export function adjacent_find<T, InputIterator extends Iterator<T>>
		(first: InputIterator, last: InputIterator): InputIterator;

	/**
	 * Find equal adjacent elements in range.
	 * 
	 * Searches the range [<i>first</i>, <i>last</i>) for the first occurrence of two consecutive elements that match, 
	 * and returns an {@link Iterator} to the first of these two elements, or <i>last</i> if no such pair is found.
	 * 
	 * Two elements match if they compare equal using <i>pred</i>.
	 * 
	 * @param first An {@link Iterator} to the initial position in a sequence.
	 * @param last An {@link Iterator} to the final position in a sequence. The range used is [<i>first</i>, <i>last</i>),
	 *			  which contains all the elements between <i>first</i> and <i>last</i>, including the element pointed by
	 *			  <i>first</i> but not the element pointed by <i>last</i>.
	 * @param pred Unary function that accepts an element in the range as argument and returns a value convertible to 
	 *			   <code>bool</code>. The value returned indicates whether the element is considered a match in the 
	 *			   context of this function. The function shall not modify its argument.
	 * 
	 * @return An {@link Iterator} to the first element of the first pair of matching consecutive elements in the range 
	 *		   [<i>first</i>, <i>last</i>). If no such pair is found, the function returns <i>last</i>.
	 */
	export function adjacent_find<T, InputIterator extends Iterator<T>>
		(first: InputIterator, last: InputIterator, pred: (x: T, y: T) => boolean): InputIterator;

	export function adjacent_find<T, InputIterator extends Iterator<T>>
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
	 * @param first1 {@link Iterator Forward iterator} to the initial position of the searched sequence.
	 * @param last1 {@link Iterator Forward iterator} to the final position of the searched sequence. The range used is 
	 *				[<i>first1</i>, <i>last1</i>), which contains all the elements between <i>first1</i> and <i>last1</i>, 
	 *				including the element pointed by <i>first1</i> but not the element pointed by <i>last1</i>.
	 * @param first2 {@link Iterator Forward iterator} to the initial position of the sequence to be searched for.
	 * @param last2 {@link Iterator Forward iterator} to the final position of the sequence to be searched for. The range 
	 *				used is [<i>first2</i>, <i>last2</i>).
	 * 
	 * @return An iterator to the first element of the first occurrence of [<i>first2</i>, <i>last2</i>) in <i>first1</i> 
	 *		   and <i>last1</i>. If the sequence is not found, the function returns <i>last1</i>. Otherwise 
	 *		   [<i>first2</i>, <i>last2</i>) is an empty range, the function returns <i>first1</i>.
	 */
	export function search<T, ForwardIterator1 extends Iterator<T>, ForwardIterator2 extends Iterator<T>>
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
	 * @param first1 {@link Iterator Forward iterator} to the initial position of the searched sequence.
	 * @param last1 {@link Iterator Forward iterator} to the final position of the searched sequence. The range used is 
	 *				[<i>first1</i>, <i>last1</i>), which contains all the elements between <i>first1</i> and <i>last1</i>, 
	 *				including the element pointed by <i>first1</i> but not the element pointed by <i>last1</i>.
	 * @param first2 {@link Iterator Forward iterator} to the initial position of the sequence to be searched for.
	 * @param last2 {@link Iterator Forward iterator} to the final position of the sequence to be searched for. The range 
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
	export function search<T, ForwardIterator1 extends Iterator<T>, ForwardIterator2 extends Iterator<T>>
		(
			first1: ForwardIterator1, last1: ForwardIterator1, first2: ForwardIterator2, last2: ForwardIterator2,
			pred: (x: T, y: T) => boolean
		): ForwardIterator1

	export function search<T, ForwardIterator1 extends Iterator<T>, ForwardIterator2 extends Iterator<T>>
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
	 * @param first {@link Iterator Forward iterator} to the initial position of the searched sequence.
	 * @param last {@link Iterator Forward iterator} to the final position of the searched sequence. The range used is 
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
	 * @param first {@link Iterator Forward iterator} to the initial position of the searched sequence.
	 * @param last {@link Iterator Forward iterator} to the final position of the searched sequence. The range used is 
	 *			   [<i>first</i>, <i>last</i>), which contains all the elements between <i>first</i> and <i>last</i>, 
	 *			   including the element pointed by <i>first</i> but not the element pointed by <i>last</i>.
	 * @param count Minimum number of successive elements to match.
	 * @param val Individual value to be compared, or to be used as argument for <i>pred</i>.
	 * @param pred Binary function that accepts two arguments (one element from the sequence as first, and <i>val</i> as 
	 *			   second), and returns a value convertible to <code>bool</code>. The value returned indicates whether the 
	 *			   element is considered a match in the context of this function. The function shall not modify any of its 
	 *			   arguments.
	 *
	 * @return An {@link Iterator} to the first element of the sequence. If no such sequence is found, the function 
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
	 * The function returns a {@link Pair} of {@link iterators Iterator} to the first element in each range that 
	 * does not match.
	 * 
	 * @param first1 An {@link Iterator} to the initial position of the first sequence.
	 * @param last1 An {@link Iterator} to the final position in a sequence. The range used is
	 *				[<i>first1</i>, <i>last1</i>), including the element pointed by <i>first1</i>, but not the element
	 *				pointed by <i>last1</i>.
	 * @param first2 An {@link Iterator} to the initial position of the second sequence. The comparison includes up to 
	 *				 as many elements of this sequence as those in the range [<i>first1</i>, <i>last1</i>).
	 * 
	 * @return A {@link Pair}, where its members {@link Pair.first first} and {@link Pair.second second} point to the 
	 *		   first element in both sequences that did not compare equal to each other. If the elements compared in 
	 *		   both sequences have all matched, the function returns a {@link Pair} with {@link Pair.first first} set 
	 *		   to <i>last1</i> and {@link Pair.second second} set to the element in that same relative position in the 
	 *		   second sequence. If none matched, it returns {@link make_pair}(<i>first1</i>, <i>first2</i>).
	 */
	export function mismatch
		<T, Iterator1 extends Iterator<T>, Iterator2 extends Iterator<T>>
		(first1: Iterator1, last1: Iterator1, first2: Iterator2): Pair<Iterator1, Iterator2>;

	/**
	 * Return first position where two ranges differ.
	 * 
	 * Compares the elements in the range [<i>first1</i>, <i>last1</i>) with those in the range beginning at 
	 * <i>first2</i>, and returns the first element of both sequences that does not match.
	 *
	 * The function returns a {@link Pair} of {@link iterators Iterator} to the first element in each range that 
	 * does not match.
	 * 
	 * @param first1 An {@link Iterator} to the initial position of the first sequence.
	 * @param last1 An {@link Iterator} to the final position in a sequence. The range used is
	 *				[<i>first1</i>, <i>last1</i>), including the element pointed by <i>first1</i>, but not the element
	 *				pointed by <i>last1</i>.
	 * @param first2 An {@link Iterator} to the initial position of the second sequence. The comparison includes up to 
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
		<T, Iterator1 extends Iterator<T>, Iterator2 extends Iterator<T>>
		(
			first1: Iterator1, last1: Iterator1, first2: Iterator2,
			compare: (x: T, y: T) => boolean
		): Pair<Iterator1, Iterator2>;

	export function mismatch
		<T, Iterator1 extends Iterator<T>, Iterator2 extends Iterator<T>>
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
	 * @param first An {@link Iterator} to the initial position in a sequence.
	 * @param last An {@link Iterator} to the final position in a sequence. The range used is [<i>first</i>, <i>last</i>),
	 *			  which contains all the elements between <i>first</i> and <i>last</i>, including the element pointed by
	 *			  <i>first</i> but not the element pointed by <i>last</i>.
	 * @param val Value to match.
	 *
	 * @return The number of elements in the range [<i>first</i>, <i>last</i>) that compare equal to <i>val</i>.
	 */
	export function count<T, InputIterator extends Iterator<T>>
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
	 * @param first An {@link Iterator} to the initial position in a sequence.
	 * @param last An {@link Iterator} to the final position in a sequence. The range used is [<i>first</i>, <i>last</i>),
	 *			  which contains all the elements between <i>first</i> and <i>last</i>, including the element pointed by
	 *			  <i>first</i> but not the element pointed by <i>last</i>.
	 * @param pred Unary function that accepts an element in the range as argument, and returns a value convertible 
	 *			   to <code>bool</code>. The value returned indicates whether the element is counted by this function.
	 *			   The function shall not modify its argument. This can either be a function pointer or a function 
	 *			   object.
	 */
	export function count_if<T, InputIterator extends Iterator<T>>
		(first: InputIterator, last: InputIterator, pred: (val: T) => boolean): number
	{
		let cnt: number = 0;

		for (let it = first; !it.equals(last); it = it.next() as InputIterator)
			if (pred(it.value))
				cnt++;

		return cnt;
	}
}

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
	 * @param first {@link Iterator Input iterator} to the initial position in a sequence to be copied.
	 * @param last {@link Iterator Input iterator} to the initial position in a sequence to be copied. The range used is 
	 *			   [<i>first</i>, <i>last</i>), which contains all the elements between <i>first</i> and <i>last</i>, 
	 *			   including the element pointed by <i>first</i> but not the element pointed by <i>last</i>.
	 * @param result {@link Iterator Output iterator} to the initial position in the destination sequence. This shall not 
	 *				 point to any element in the range [<i>first</i>, <i>last</i>).
	 *
	 * @return An iterator to the end of the destination range where elements have been copied.
	 */
	export function copy
		<T, InputIterator extends Iterator<T>, OutputIterator extends base.ILinearIterator<T>>
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
	 * @param first {@link Iterator Input iterator} to the initial position in a sequence of at least <i>n</i> elements to 
	 *				be copied. <i>InputIterator</i> shall point to a type assignable to the elements pointed by 
	 *				<i>OutputIterator</i>.
	 * @param n Number of elements to copy. If this value is negative, the function does nothing.
	 * @param result {@link Iterator Output iterator} to the initial position in the destination sequence of at least 
	 *				 <i>n</i> elements. This shall not point to any element in the range [<i>first</i>, last].
	 * 
	 * @return An iterator to the end of the destination range where elements have been copied.
	 */
	export function copy_n
		<T, InputIterator extends Iterator<T>, OutputIterator extends base.ILinearIterator<T>>
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
	 * @param first {@link Iterator Input iterator} to the initial position in a sequence to be copied.
	 * @param last {@link Iterator Input iterator} to the initial position in a sequence to be copied. The range used is
	 *			   [<i>first</i>, <i>last</i>), which contains all the elements between <i>first</i> and <i>last</i>,
	 *			   including the element pointed by <i>first</i> but not the element pointed by <i>last</i>.
	 * @param result {@link Iterator Output iterator} to the initial position in the destination sequence. This shall not
	 *				 point to any element in the range [<i>first</i>, <i>last</i>).
	 * @param pred Unary function that accepts an element in the range as argument, and returns a value convertible to 
	 *			   <code>bool</code>. The value returned indicates whether the element is to be copied (if 
	 *			   <code>true</code>, it is copied). The function shall not modify any of its arguments.
	 *
	 * @return An iterator to the end of the destination range where elements have been copied.
	 */
	export function copy_if
		<T, InputIterator extends Iterator<T>, OutputIterator extends base.ILinearIterator<T>>
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
	 * @param first {@link Iterator Bidirectional iterator} to the initial position in a sequence to be copied.
	 * @param last {@link Iterator Bidirectional iterator} to the initial position in a sequence to be copied. The range 
	 *			   used is [<i>first</i>, <i>last</i>), which contains all the elements between <i>first</i> and 
	 *			   <i>last</i>, including the element pointed by <i>first</i> but not the element pointed by <i>last</i>.
	 * @param result {@link Iterator Bidirectional iterator} to the initial position in the destination sequence. This 
	 *				 shall not point to any element in the range [<i>first</i>, <i>last</i>).
	 * 
	 * @return An iterator to the first element of the destination sequence where elements have been copied.
	 */
	export function copy_backward
		<T, BidirectionalIterator1 extends Iterator<T>, BidirectionalIterator2 extends base.ILinearIterator<T>>
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
	 * @param first {@link Iterator Forward iterator} to the initial position in a sequence of elements that support being
	 *				assigned a value of type <i>T</i>.
	 * @param last {@link Iterator Forward iterator} to the final position in a sequence of elements that support being
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
	 * @param first {@link Iterator Output iterator} to the initial position in a sequence of elements that support being
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
	 * @param first {@link Iterator Input iterator} to the initial position in a sequence to be transformed.
	 * @param last {@link Iterator Input iterator} to the initial position in a sequence to be transformed. The range
	 *			   used is [<i>first</i>, <i>last</i>), which contains all the elements between <i>first</i> and
	 *			   <i>last</i>, including the element pointed by <i>first</i> but not the element pointed by <i>last</i>.
	 * @param result {@link Iterator Output} iterator to the initial position of the range where the operation results are
	 *				 stored. The range includes as many elements as [<i>first</i>, <i>last</i>).
	 * @param op Unary function that accepts one element of the type pointed to by <i>InputIterator</i> as argument, and 
	 *			 returns some result value convertible to the type pointed to by <i>OutputIterator</i>.
	 *
	 * @return An iterator pointing to the element that follows the last element written in the <i>result</i> sequence.
	 */
	export function transform<T, InputIterator extends Iterator<T>, OutputIterator extends base.ILinearIterator<T>>
		(first: InputIterator, last: InputIterator, result: OutputIterator, op: (val: T) => T): OutputIterator;

	/**
	 * Transform range.
	 * 
	 * Calls <i>binary_op</i> using each of the elements in the range [<i>first1</i>, <i>last1</i>) as first argument, 
	 * and the respective argument in the range that begins at <i>first2</i> as second argument. The value returned by 
	 * each call is stored in the range that begins at <i>result</i>.
	 * 
	 * @param first1 {@link Iterator Input iterator} to the initial position of the first sequence.
	 * @param last1 {@link Iterator Input iterator} to the final position of the first sequence. The range used is
	 *				[<i>first1</i>, <i>last1</i>), including the element pointed by <i>first1</i>, but not the element
	 *				pointed by <i>last1</i>.
	 * @param first2 {@link Iterator Input iterator} to the initial position of the second range. The range includes as 
	 *				 many elements as [<i>first1</i>, <i>last1</i>).
	 * @param result {@link Iterator Output} iterator to the initial position of the range where the operation results are 
	 *				 stored. The range includes as many elements as [<i>first1</i>, <i>last1</i>).
	 * @param binary_op Binary function that accepts two elements as argument (one of each of the two sequences), and 
	 *					returns some result value convertible to the type pointed to by <i>OutputIterator</i>.
	 * 
	 * @return An iterator pointing to the element that follows the last element written in the <i>result</i> sequence.
	 */
	export function transform<T, 
			InputIterator1 extends Iterator<T>,
			InputIterator2 extends Iterator<T>, 
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
	function unary_transform<T, InputIterator extends Iterator<T>, OutputIterator extends base.ILinearIterator<T>>
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
			InputIterator1 extends Iterator<T>,
			InputIterator2 extends Iterator<T>, 
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
	 * @param first {@link Iterator Forward iterator} to the initial position in a sequence.
	 * @param last {@link Iterator Forward iterator} to the final position in a sequence. The range affected is 
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
	 * @param first {@link Iterator Output iterator} to the initial position in a sequence of at least <i>n</i> elements 
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
	 * @param first An {@link Iterator} to the initial position in a sequence.
	 * @param last An {@link Iterator} to the final position in a sequence. The range used is [<i>first</i>, <i>last</i>),
	 *			  which contains all the elements between <i>first</i> and <i>last</i>, including the element pointed by
	 *			  <i>first</i> but not the element pointed by <i>last</i>.
	 *
	 * @return An iterator to the element that follows the last element not removed. The range between <i>first</i> and
	 *		   this iterator includes all the elements in the sequence that were not considered duplicates.
	 */
	export function unique<T, InputIterator extends Iterator<T>>
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
	 * @param first An {@link Iterator} to the initial position in a sequence.
	 * @param last An {@link Iterator} to the final position in a sequence. The range used is [<i>first</i>, <i>last</i>),
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
	export function unique<t, InputIterator extends Iterator<t>>
		(first: InputIterator, last: InputIterator, pred: (left: t, right: t) => boolean): InputIterator;

	export function unique<t, InputIterator extends Iterator<t>>
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
	 * @param first {@link Iterator Forward iterator} to the initial position in a sequence.
	 * @param last {@link Iterator Forward iterator} to the final position in a sequence. The range used is 
	 *			   [<i>first</i>, <i>last</i>), which contains all the elements between <i>first</i> and <i>last</i>, 
	 *			   including the element pointed by <i>first</i> but not the element pointed by <i>last</i>.
	 * @param result Output iterator to the initial position of the range where the resulting range of values is stored.
	 *				 The pointed type shall support being assigned the value of an element in the range 
	 *				 [<i>first</i>, <i>last</i>).
	 * 
	 * @return An iterator pointing to the end of the copied range, which contains no consecutive duplicates.
	 */
	export function unique_copy<T, InputIterator extends Iterator<T>, OutputIterator extends base.ILinearIterator<T>>
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
	 * @param first {@link Iterator Forward iterator} to the initial position in a sequence.
	 * @param last {@link Iterator Forward iterator} to the final position in a sequence. The range used is 
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
	export function unique_copy<T, InputIterator extends Iterator<T>, OutputIterator extends base.ILinearIterator<T>>
		(
			first: InputIterator, last: InputIterator, result: OutputIterator, 
			pred: (x: T, y: T) => boolean
		): OutputIterator;

	export function unique_copy<T, InputIterator extends Iterator<T>, OutputIterator extends base.ILinearIterator<T>>
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
	 * @param first An {@link Iterator} to the initial position in a sequence.
	 * @param last An {@link Iterator} to the final position in a sequence. The range used is [<i>first</i>, <i>last</i>),
	 *			  which contains all the elements between <i>first</i> and <i>last</i>, including the element pointed by
	 *			  <i>first</i> but not the element pointed by <i>last</i>.
	 * @param val Value to be removed.
	 */
	export function remove<T, InputIterator extends Iterator<T>>
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
	 * @param first An {@link Iterator} to the initial position in a sequence.
	 * @param last An {@link Iterator} to the final position in a sequence. The range used is [<i>first</i>, <i>last</i>),
	 *			  which contains all the elements between <i>first</i> and <i>last</i>, including the element pointed by
	 *			  <i>first</i> but not the element pointed by <i>last</i>.
	 * @param pred Unary function that accepts an element in the range as argument, and returns a value convertible to 
	 *			   <code>bool</code>. The value returned indicates whether the element is to be removed (if 
	 *			   <code>true</code>, it is removed). The function shall not modify its argument.
	 */
	export function remove_if<T, InputIterator extends Iterator<T>>
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
	 * @param first {@link Iterator InputIterator} to the initial position in a sequence.
	 * @param last {@link Iterator InputIterator} to the final position in a sequence. The range used is 
	 *			   [<i>first</i>, <i>last</i>), which contains all the elements between <i>first</i> and <i>last</i>, 
	 *			   including the element pointed by <i>first</i> but not the element pointed by <i>last</i>.
	 * @param result {@link Iterator Output iterator} to the initial position of the range where the resulting sequence is
	 *				 stored. The pointed type shall support being assigned the value of an element in the range 
	 *				 [<i>first</i>, <i>last</i>).
	 * @param val Value to be removed.
	 * 
	 * @return An iterator pointing to the end of the copied range, which includes all the elements in 
	 *		   [<i>first</i>, <i>last</i>) except those that compare equal to <i>val</i>.
	 */
	export function remove_copy<T, InputIterator extends Iterator<T>, OutputIterator extends base.ILinearIterator<T>>
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
	 * @param first {@link Iterator InputIterator} to the initial position in a sequence.
	 * @param last {@link Iterator InputIterator} to the final position in a sequence. The range used is
	 *			   [<i>first</i>, <i>last</i>), which contains all the elements between <i>first</i> and <i>last</i>,
	 *			   including the element pointed by <i>first</i> but not the element pointed by <i>last</i>.
	 * @param result {@link Iterator Output iterator} to the initial position of the range where the resulting sequence is
	 *				 stored. The pointed type shall support being assigned the value of an element in the range
	 *				 [<i>first</i>, <i>last</i>).
	 * @param pred Unary function that accepts an element in the range as argument, and returns a value convertible to 
	 *			   <code>bool</code>. The value returned indicates whether the element is to be removed from the copy (if 
	 *			   <code>true</code>, it is not copied). The function shall not modify its argument.
	 * 
	 * @return An iterator pointing to the end of the copied range, which includes all the elements in 
	 *		   [<i>first</i>, <i>last</i>) except those for which <i>pred</i> returns <code>true</code>.
	 */
	export function remove_copy_if<T, InputIterator extends Iterator<T>, OutputIterator extends base.ILinearIterator<T>>
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
	 * @param first An {@link Iterator} to the initial position in a sequence.
	 * @param last An {@link Iterator} to the final position in a sequence. The range used is [<i>first</i>, <i>last</i>),
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
	 * @param first An {@link Iterator} to the initial position in a sequence.
	 * @param last An {@link Iterator} to the final position in a sequence. The range used is [<i>first</i>, <i>last</i>),
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
	 * @param first {@link Iterator InputIterator} to the initial position in a sequence.
	 * @param last {@link Iterator InputIterator} to the final position in a sequence. The range used is
	 *			   [<i>first</i>, <i>last</i>), which contains all the elements between <i>first</i> and <i>last</i>,
	 *			   including the element pointed by <i>first</i> but not the element pointed by <i>last</i>.
	 * @param result {@link Iterator Output iterator} to the initial position of the range where the resulting sequence is
	 *				 stored. The pointed type shall support being assigned the value of an element in the range
	 *				 [<i>first</i>, <i>last</i>).
	 * @param old_val Value to be replaced.
	 * @param new_val Replacement value.
	 * 
	 * @return An iterator pointing to the element that follows the last element written in the result sequence.
	 */
	export function replace_copy<T, InputIterator extends Iterator<T>, OutputIterator extends base.ILinearIterator<T>>
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
	 * @param first {@link Iterator InputIterator} to the initial position in a sequence.
	 * @param last {@link Iterator InputIterator} to the final position in a sequence. The range used is
	 *			   [<i>first</i>, <i>last</i>), which contains all the elements between <i>first</i> and <i>last</i>,
	 *			   including the element pointed by <i>first</i> but not the element pointed by <i>last</i>.
	 * @param result {@link Iterator Output iterator} to the initial position of the range where the resulting sequence is
	 *				 stored. The pointed type shall support being assigned the value of an element in the range
	 *				 [<i>first</i>, <i>last</i>).
	 * @param pred Unary function that accepts an element in the range as argument, and returns a value convertible to
	 *			   <code>bool</code>. The value returned indicates whether the element is to be removed from the copy (if
	 *			   <code>true</code>, it is not copied). The function shall not modify its argument.
	 * @param new_val Value to assign to replaced values.
	 * 
	 * @return An iterator pointing to the element that follows the last element written in the result sequence.
	 */
	export function replace_copy_if<T, InputIterator extends Iterator<T>, OutputIterator extends base.ILinearIterator<T>>
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
	 * The function calls {@link Iterator.swap} to exchange the elements.
	 * 
	 * @param x {@link Iterator Forward iterator} to the objects to swap.
	 * @param y {@link Iterator Forward iterator} to the objects to swap.
	 */
	export function iter_swap<T>(x: Iterator<T>, y: Iterator<T>): void
	{
		x.swap(y);
	}

	/**
	 * Exchange values of two ranges.
	 * 
	 * Exchanges the values of each of the elements in the range [<i>first1</i>, <i>last1</i>) with those of their 
	 * respective elements in the range beginning at <i>first2</i>.
	 * 
	 * The function calls {@link Iterator.swap} to exchange the elements.
	 * 
	 * @param first1 {@link Iterator Forward iterator} to the initial position of the first sequence.
	 * @param last1 {@link Iterator Forward iterator} to the final position of the first sequence. The range used is
	 *				[<i>first1</i>, <i>last1</i>), including the element pointed by <i>first1</i>, but not the element
	 *				pointed by <i>last1</i>.
	 * @param first2 {@link Iterator Forward iterator} to the initial position of the second range. The range includes as
	 *				 many elements as [<i>first1</i>, <i>last1</i>). The two ranges shall not overlap.
	 * 
	 * @return An iterator to the last element swapped in the second sequence.
	 */
	export function swap_ranges<T, ForwardIterator1 extends Iterator<T>, ForwardIterator2 extends Iterator<T>>
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
	 * @param first An {@link Iterator} to the initial position in a sequence.
	 * @param last An {@link Iterator} to the final position in a sequence. The range used is [<i>first</i>, <i>last</i>),
	 *			  which contains all the elements between <i>first</i> and <i>last</i>, including the element pointed by
	 *			  <i>first</i> but not the element pointed by <i>last</i>.
	 */
	export function reverse<T, InputIterator extends Iterator<T>>
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
	 * @param first {@link Iterator Bidirectional iterator} to the initial position in a sequence to be copied.
	 * @param last {@link Iterator Bidirectional iterator} to the initial position in a sequence to be copied. The range 
	 *			   used is [<i>first</i>, <i>last</i>), which contains all the elements between <i>first</i> and 
	 *			   <i>last</i>, including the element pointed by <i>first</i> but not the element pointed by <i>last</i>.
	 * @param result {@link Iterator Output iterator} to the initial position of the range where the reserved range is
	 *				 stored. The pointed type shall support being assigned the value of an element in the range 
	 *				 [<i>first</i>, <i>last</i>).
	 * 
	 * @return An output iterator pointing to the end of the copied range, which contains the same elements in reverse 
	 *		   order.
	 */
	export function reverse_copy<T, BidirectionalIterator extends Iterator<T>, OutputIterator extends base.ILinearIterator<T>>
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
	 * @param first An {@link Iterator} to the initial position in a sequence.
	 * @param middle An {@link Iterator} pointing to the element within the range [<i>first</i>, <i>last</i>) that is 
	 *				 moved to the first position in the range.
	 * @param last An {@link Iterator} to the final position in a sequence. The range used is [<i>first</i>, <i>last</i>),
	 *			  which contains all the elements between <i>first</i> and <i>last</i>, including the element pointed by
	 *			  <i>first</i> but not the element pointed by <i>last</i>.
	 *
	 * @return An iterator pointing to the element that now contains the value previously pointed by <i>first</i>.
	 */
	export function rotate<T, InputIterator extends Iterator<T>>
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
	 * @param first {@link Iterator Forward iterator} to the initial position of the range to be copy-rotated.
	 * @param middle Forward iterator pointing to the element within the range [<i>first</i>, <i>last</i>) that is copied as the first element in the resulting range.
	 * @param last {@link Iterator Forward iterator} to the final positions of the range to be copy-rotated. The range 
	 *			   used is [<i>first</i>, <i>last</i>), which contains all the elements between <i>first</i> and 
	 *			   <i>last</i>, including the element pointed by <i>first</i> but not the element pointed by <i>last</i>. 
	 *			   Notice that in this function, these are not consecutive parameters, but the first and <b>third</b> ones.
	 * @param result {@link Iterator Output iterator} to the initial position of the range where the reserved range is
	 *				 stored. The pointed type shall support being assigned the value of an element in the range
	 *				 [<i>first</i>, <i>last</i>).
	 * 
	 * @return An output iterator pointing to the end of the copied range.
	 */
	export function rotate_copy<T, ForwardIterator extends Iterator<T>, OutputIterator extends base.ILinearIterator<T>>
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
	 * @param first An {@link Iterator} to the initial position in a sequence.
	 * @param last An {@link Iterator} to the final position in a sequence. The range used is [<i>first</i>, <i>last</i>),
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
	 * @param first An {@link Iterator} to the initial position in a sequence.
	 * @param last An {@link Iterator} to the final position in a sequence. The range used is [<i>first</i>, <i>last</i>),
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

namespace std
{
	/* =========================================================
		SORTING
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
	 *			  {@link Iterator.swap swap} is properly defined.
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
	 *			  {@link Iterator.swap swap} is properly defined.
	 * @param compare Binary function that accepts two elements in the range as arguments, and returns a value 
	 *		  convertible to <code>boolean</code>. The value returned indicates whether the element passed as first 
	 *		  argument is considered to go before the second in the specific strict weak ordering it defines. The 
	 *		  function shall not modify any of its arguments. This can either be a function pointer or a function 
	 *		  object.
	 */
	export function sort<T, RandomAccessIterator extends base.IArrayIterator<T>>
		(first: RandomAccessIterator, last: RandomAccessIterator, compare: (left: T, right: T) => boolean): void;

	export function sort<T, RandomAccessIterator extends base.IArrayIterator<T>>
		(first: RandomAccessIterator, last: RandomAccessIterator, compare: (left: T, right: T) => boolean = less): void
	{
		_Quick_sort(first.source() as base.IArrayContainer<T>, first.index(), last.index() - 1, compare);
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
	 *			  The range used is [<i>first</i>, <i>last</i>), which contains all the elements between <i>first</i>
	 *			  and <i>last</i>, including the element pointed by <i>first</i> but not the element pointed by
	 *			  <i>last</i>.
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
	 * @param first {@link Iterator Input iterator} to the initial position of the sequence to copy from.
	 * @param last {@link Iterator Input iterator} to the final position of the sequence to copy from. The range used is 
	 *			   [<i>first</i>, <i>last</i>), which contains all the elements between <i>first</i> and <i>last</i>, 
	 *			   including the element pointed by <i>first</i> but not the element pointed by <i>last</i>. 
	 *			   <i>InputIterator</i> shall point to a type assignable to the elements pointed by 
	 *			   <i>RandomAccessIterator</i>.
	 * @param result_first {@link Iterator Random-access iterator} to the initial position of the destination sequence.
	 * @param result_last {@link Iterator Random-access iterator} to the final position of the destination sequence.
	 *					  The range used is [<i>result_first</i>, <i>result_last</i>).
	 * @param compare Binary function that accepts two elements in the result range as arguments, and returns a value 
	 *				  convertible to <code>bool</code>. The value returned indicates whether the element passed as first 
	 *				  argument is considered to go before the second in the specific <i>strict weak ordering</i> it
	 *				  defines. The function shall not modify any of its arguments.
	 *
	 * @return An iterator pointing to the element that follows the last element written in the result sequence.
	 */
	export function partial_sort_copy<T, InputIterator extends Iterator<T>, RandomAccessIterator extends Iterator<T>>
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
	 * @param first {@link Iterator Input iterator} to the initial position of the sequence to copy from.
	 * @param last {@link Iterator Input iterator} to the final position of the sequence to copy from. The range used is 
	 *			   [<i>first</i>, <i>last</i>), which contains all the elements between <i>first</i> and <i>last</i>, 
	 *			   including the element pointed by <i>first</i> but not the element pointed by <i>last</i>. 
	 *			   <i>InputIterator</i> shall point to a type assignable to the elements pointed by 
	 *			   <i>RandomAccessIterator</i>.
	 * @param result_first {@link Iterator Random-access iterator} to the initial position of the destination sequence.
	 * @param result_last {@link Iterator Random-access iterator} to the final position of the destination sequence.
	 *					  The range used is [<i>result_first</i>, <i>result_last</i>).
	 * @param compare Binary function that accepts two elements in the result range as arguments, and returns a value 
	 *				  convertible to <code>bool</code>. The value returned indicates whether the element passed as first 
	 *				  argument is considered to go before the second in the specific <i>strict weak ordering</i> it
	 *				  defines. The function shall not modify any of its arguments.
	 *
	 * @return An iterator pointing to the element that follows the last element written in the result sequence.
	 */
	export function partial_sort_copy
		<T, InputIterator extends Iterator<T>, RandomAccessIterator extends Iterator<T>>
		(
			first: InputIterator, last: InputIterator, 
			result_first: RandomAccessIterator, result_last: RandomAccessIterator, 
			compare: (x: T, y: T) => boolean
		): RandomAccessIterator;

	export function partial_sort_copy
		<T, InputIterator extends Iterator<T>, RandomAccessIterator extends base.IArrayIterator<T>>
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
	 * @param first {@link Iterator Forward iterator} to the initial position of the sequence.
	 * @param last {@link Iterator Forward iterator} to the final position of the sequence. The range checked is 
	 *			   [<i>first</i>, <i>last</i>), which contains all the elements between <i>first</i> and <i>last</i>, 
	 *			   including the element pointed by <i>first</i> but not the element pointed by <i>last</i>.
	 * 
	 * @return <code>true</code> if the range [<i>first</i>, <i>last</i>) is sorted into ascending order, 
	 *		   <code>false</code> otherwise. If the range [<i>first</i>, <i>last</i>) contains less than two elements, 
	 *		   the function always returns <code>true</code>.
	 */
	export function is_sorted<T, ForwardIterator extends Iterator<T>>
		(first: ForwardIterator, last: ForwardIterator): boolean;

	/**
	 * Check whether range is sorted.
	 * 
	 * Returns <code>true</code> if the range [<i>first</i>, <i>last</i>) is sorted into ascending order.
	 * 
	 * The elements are compared using <i>compare</i>.
	 * 
	 * @param first {@link Iterator Forward iterator} to the initial position of the sequence.
	 * @param last {@link Iterator Forward iterator} to the final position of the sequence. The range checked is 
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
	export function is_sorted<T, ForwardIterator extends Iterator<T>>
		(first: ForwardIterator, last: ForwardIterator, compare: (x: T, y: T) => boolean): boolean;

	export function is_sorted<T, ForwardIterator extends Iterator<T>>
		(first: ForwardIterator, last: ForwardIterator, compare: (x: T, y: T) => boolean = equal_to): boolean
	{
		if (first.equals(last)) 
			return true;
		
		for (let next = first.next() as ForwardIterator; !next.equals(last); next = next.next() as ForwardIterator)
		{
			if (less(next.value, first.value)) // or, if (comp(*next,*first)) for version (2)
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
	 * @param first {@link Iterator Forward iterator} to the initial position of the sequence.
	 * @param last {@link Iterator Forward iterator} to the final position of the sequence. The range checked is
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
	export function is_sorted_until<T, ForwardIterator extends Iterator<T>>
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
	 * @param first {@link Iterator Forward iterator} to the initial position of the sequence.
	 * @param last {@link Iterator Forward iterator} to the final position of the sequence. The range checked is
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
	export function is_sorted_until<T, ForwardIterator extends Iterator<T>>
		(first: ForwardIterator, last: ForwardIterator, compare: (x: T, y: T) => boolean): ForwardIterator;

	export function is_sorted_until<T, ForwardIterator extends Iterator<T>>
		(first: ForwardIterator, last: ForwardIterator, compare: (x: T, y: T) => boolean = equal_to): ForwardIterator
	{
		if (first.equals(last))
			return first;
		
		for (let next = first.next() as ForwardIterator; !next.equals(last); next = next.next() as ForwardIterator)
		{
			if (less(next.value ,first.value)) 
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
			let supplement: T = container.at(i);
			container.set(i, container.at(j));
			container.set(j, supplement);
		}

		// SWAP; AT(BEGIN) WITH AT(J)
		let supplement:T = container.at(first);
		container.set(first, container.at(j));
		container.set(j, supplement);

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
		// QUICK SORT
		if (last == -2)
			last = container.size() - 1;
		else if (first >= last)
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
		let val: T = container.at(first);
		let i: number = first;
		let j: number = last + 1;

		while (true)
		{
			while (!equal_to(container.at(++i), val) && compare(container.at(i), val))
				if (i == last - 1)
					break;
			while (!equal_to(val, container.at(--j)) && compare(val, container.at(j)))
				if (j == first)
					break;

			if (i >= j)
				break;

			// SWAP; AT(I) WITH AT(J)
			let supplement: T = container.at(i);
			container.set(i, container.at(j));
			container.set(j, supplement);
		}

		// SWAP; AT(BEGIN) WITH AT(J)
		let supplement:T = container.at(first);
		container.set(first, container.at(j));
		container.set(j, supplement);

		return j;
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
			{
				let supplement: T = container.at(i);
				container.set(i, container.at(min_index));
				container.set(min_index, supplement);
			}
		}
	}
}

namespace std
{
	/* =========================================================
		HEAP
	========================================================= */
	/**
	 * Make heap from range.
	 * 
	 * Rearranges the elements in the range [<i>first</i>, <i>last</i>) in such a way that they form a heap.
	 * 
	 * A heap is a way to organize the elements of a range that allows for fast retrieval of the element with the 
	 * highest value at any moment (with {@link pop_heap}), even repeatedly, while allowing for fast insertion of new 
	 * elements (with {@link push_heap}).
	 * 
	 * The element with the highest value is always pointed by first. The order of the other elements depends on the 
	 * particular implementation, but it is consistent throughout all heap-related functions of this header.
	 * 
	 * The elements are compared using {@link less}: The element with the highest value is an element for which this 
	 * would return false when compared to every other element in the range.
	 * 
	 * The standard container adaptor {@link PriorityQueue} calls {@link make_heap}, {@link push_heap} and 
	 * {@link pop_heap} automatically to maintain heap properties for a container.
	 * 
	 * @param first {@link IArrayIterator Random-access iterator} to the initial position of the sequence to be 
	 *				transformed into a heap.
	 * @param last {@link IArrayIterator Random-access iterator} to the final position of the sequence to be transformed
	 *			   into a heap. The range used is [<i>first</i>, <i>last</i>), which contains all the elements between
	 *			   <i>first</i> and <i>last</i>, including the element pointed by <i>first</i> but not the element pointed
	 *			   by <i>last</i>. {@link IArrayIterator RandomAccessIterator} shall point to a type for which
	 *			   {@link Iterator.swap swap} is properly defined.
	 */
	export function make_heap<T, RandomAccessIterator extends base.IArrayIterator<T>>
		(first: RandomAccessIterator, last: RandomAccessIterator): void;

	/**
	 * Make heap from range.
	 *
	 * Rearranges the elements in the range [<i>first</i>, <i>last</i>) in such a way that they form a heap.
	 *
	 * A heap is a way to organize the elements of a range that allows for fast retrieval of the element with the
	 * highest value at any moment (with {@link pop_heap}), even repeatedly, while allowing for fast insertion of new
	 * elements (with {@link push_heap}).
	 *
	 * The element with the highest value is always pointed by first. The order of the other elements depends on the
	 * particular implementation, but it is consistent throughout all heap-related functions of this header.
	 *
	 * The elements are compared using <i>compare</i>: The element with the highest value is an element for which this
	 * would return false when compared to every other element in the range.
	 *
	 * The standard container adaptor {@link PriorityQueue} calls {@link make_heap}, {@link push_heap} and
	 * {@link pop_heap} automatically to maintain heap properties for a container.
	 * 
	 * @param first {@link IArrayIterator Random-access iterator} to the initial position of the sequence to be 
	 *				transformed into a heap.
	 * @param last {@link IArrayIterator Random-access iterator} to the final position of the sequence to be transformed 
	 *			   into a heap. The range used is [<i>first</i>, <i>last</i>), which contains all the elements between 
	 *			   <i>first</i> and <i>last</i>, including the element pointed by <i>first</i> but not the element pointed 
	 *			   by <i>last</i>. {@link IArrayIterator RandomAccessIterator} shall point to a type for which
	 *			   {@link Iterator.swap swap} is properly defined.
	 * @param compare Binary function that accepts two elements in the range as arguments, and returns a value
	 *				  convertible to <code>boolean</code>. The value returned indicates whether the element passed as 
	 *				  first argument is considered to go before the second in the specific strict weak ordering it defines. 
	 *				  The function shall not modify any of its arguments. This can either be a function pointer or a 
	 *				  function object.
	 */
	export function make_heap<T, RandomAccessIterator extends base.IArrayIterator<T>>
		(first: RandomAccessIterator, last: RandomAccessIterator, compare: (x: T, y: T) => boolean): void;

	export function make_heap<T, RandomAccessIterator extends base.IArrayIterator<T>>
		(first: RandomAccessIterator, last: RandomAccessIterator, compare: (x: T, y: T) => boolean = less): void
	{
		let heap_compare = 
			function (x: T, y: T): boolean
			{
				return !compare(x, y);
			}

		sort(first, last, heap_compare);
	}

	/**
	 * Push element into heap range.
	 * 
	 * Given a heap in the range [<i>first</i>, <i>last</i> - 1), this function extends the range considered a heap to 
	 * [<i>first</i>, <i>last</i>) by placing the value in (<i>last</i> - 1) into its corresponding location within it. 
	 *
	 * 
	 * A range can be organized into a heap by calling {@link make_heap}. After that, its heap properties are 
	 * preserved if elements are added and removed from it using {@link push_heap} and {@link pop_heap}, respectively. 
	 *
	 * 
	 * @param first {@link IArrayIterator Random-access iterator} to the initial position of the new heap range, including 
	 *				the pushed element.
	 * @param last {@link IArrayIterator Random-access iterator} to the final position of the new heap range, including 
	 *			   the pushed element.  The range used is [<i>first</i>, <i>last</i>), which contains all the elements 
	 *			   between <i>first</i> and <i>last</i>, including the element pointed by <i>first</i> but not the element 
	 *			   pointed by <i>last</i>. {@link IArrayIterator RandomAccessIterator} shall point to a type for which
	 *			   {@link Iterator.swap swap} is properly defined.
	 */
	export function push_heap<T, RandomAccessIterator extends base.IArrayIterator<T>>
		(first: RandomAccessIterator, last: RandomAccessIterator): void;

	/**
	 * Push element into heap range.
	 *
	 * Given a heap in the range [<i>first</i>, <i>last</i> - 1), this function extends the range considered a heap to
	 * [<i>first</i>, <i>last</i>) by placing the value in (<i>last</i> - 1) into its corresponding location within it.
	 *
	 * A range can be organized into a heap by calling {@link make_heap}. After that, its heap properties are
	 * preserved if elements are added and removed from it using {@link push_heap} and {@link pop_heap}, respectively.
	 *
	 * 
	 * @param first {@link IArrayIterator Random-access iterator} to the initial position of the new heap range, including
	 *				the pushed element.
	 * @param last {@link IArrayIterator Random-access iterator} to the final position of the new heap range, including
	 *			   the pushed element.  The range used is [<i>first</i>, <i>last</i>), which contains all the elements
	 *			   between <i>first</i> and <i>last</i>, including the element pointed by <i>first</i> but not the element
	 *			   pointed by <i>last</i>. {@link IArrayIterator RandomAccessIterator} shall point to a type for which
	 *			   {@link Iterator.swap swap} is properly defined.
	 * @param compare Binary function that accepts two elements in the range as arguments, and returns a value
	 *				  convertible to <code>boolean</code>. The value returned indicates whether the element passed as 
	 *				  first argument is considered to go before the second in the specific strict weak ordering it defines. 
	 *				  The function shall not modify any of its arguments. This can either be a function pointer or a 
	 *				  function object.
	 */
	export function push_heap<T, RandomAccessIterator extends base.IArrayIterator<T>>
		(first: RandomAccessIterator, last: RandomAccessIterator, compare: (x: T, y: T) => boolean): void;

	export function push_heap<T, RandomAccessIterator extends base.IArrayIterator<T>>
		(first: RandomAccessIterator, last: RandomAccessIterator, compare: (x: T, y: T) => boolean = less): void
	{
		let last_item_it = last.prev();
		let less_it: RandomAccessIterator = null;
		
		for (let it = first; !it.equals(last_item_it); it = it.next() as RandomAccessIterator)
		{
			if (compare(it.value, last_item_it.value))
			{
				less_it = it;
				break;
			}
		}

		if (less_it != null)
		{
			let container = last_item_it.source() as base.IArrayContainer<T>;

			container.insert(less_it, last_item_it.value);
			container.erase(last_item_it);
		}
	}

	/**
	 * Pop element from heap range.
	 * 
	 * Rearranges the elements in the heap range [<i>first</i>, <i>last</i>) in such a way that the part considered a 
	 * heap is shortened by one: The element with the highest value is moved to (<i>last</i> - 1).
	 * 
	 * While the element with the highest value is moved from first to (<i>last</i> - 1) (which now is out of the 
	 * heap), the other elements are reorganized in such a way that the range [<i>first</i>, <i>last</i> - 1) preserves 
	 * the properties of a heap.
	 * 
	 * A range can be organized into a heap by calling {@link make_heap}. After that, its heap properties are 
	 * preserved if elements are added and removed from it using {@link push_heap} and {@link pop_heap}, respectively. 
	 * 
	 * @param first {@link IArrayIterator Random-access iterator} to the initial position of the heap to be shrank by one.
	 * @param last {@link IArrayIterator Random-access iterator} to the final position of the heap to be shrank by one. 
	 *			   The range used is [<i>first</i>, <i>last</i>), which contains all the elements between <i>first</i> and 
	 *			   <i>last</i>, including the element pointed by <i>first</i> but not the element pointed by <i>last</i>. 
	 *			   {@link IArrayIterator RandomAccessIterator} shall point to a type for which {@link Iterator.swap swap} 
	 *			   is properly defined.
	 */
	export function pop_heap<T, RandomAccessIterator extends base.IArrayIterator<T>>
		(first: RandomAccessIterator, last: RandomAccessIterator): void;

	/**
	 * Pop element from heap range.
	 *
	 * Rearranges the elements in the heap range [<i>first</i>, <i>last</i>) in such a way that the part considered a
	 * heap is shortened by one: The element with the highest value is moved to (<i>last</i> - 1).
	 *
	 * While the element with the highest value is moved from first to (<i>last</i> - 1) (which now is out of the
	 * heap), the other elements are reorganized in such a way that the range [<i>first</i>, <i>last</i> - 1) preserves
	 * the properties of a heap.
	 *
	 * A range can be organized into a heap by calling {@link make_heap}. After that, its heap properties are
	 * preserved if elements are added and removed from it using {@link push_heap} and {@link pop_heap}, respectively.
	 * 
	 * @param first {@link IArrayIterator Random-access iterator} to the initial position of the heap to be shrank by one.
	 * @param last {@link IArrayIterator Random-access iterator} to the final position of the heap to be shrank by one.
	 *			   The range used is [<i>first</i>, <i>last</i>), which contains all the elements between <i>first</i> and
	 *			   <i>last</i>, including the element pointed by <i>first</i> but not the element pointed by <i>last</i>.
	 *			   {@link IArrayIterator RandomAccessIterator} shall point to a type for which {@link Iterator.swap swap}
	 *			   is properly defined.
	 * @param compare Binary function that accepts two elements in the range as arguments, and returns a value
	 *				  convertible to <code>boolean</code>. The value returned indicates whether the element passed as
	 *				  first argument is considered to go before the second in the specific strict weak ordering it defines.
	 *				  The function shall not modify any of its arguments. This can either be a function pointer or a
	 *				  function object.
	 */
	export function pop_heap<T, RandomAccessIterator extends base.IArrayIterator<T>>
		(first: RandomAccessIterator, last: RandomAccessIterator, compare: (x: T, y: T) => boolean): void;

	export function pop_heap<T, RandomAccessIterator extends base.IArrayIterator<T>>
		(first: RandomAccessIterator, last: RandomAccessIterator, compare: (x: T, y: T) => boolean = less): void
	{
		let container = first.source() as base.IArrayContainer<T>;

		container.insert(last, first.value);
		container.erase(first);
	}

	/**
	 * Test if range is heap.
	 * 
	 * Returns true if the range [<i>first</i>, <i>last</i>) forms a heap, as if constructed with {@link make_heap}. 
	 * 
	 * The elements are compared using {@link less}.
	 * 
	 * @param first {@link IArrayIterator Random-access iterator} to the initial position of the sequence.
	 * @param last {@link IArrayIterator Random-access iterator} to the final position of the sequence. The range used is 
	 *			   [<i>first</i>, <i>last</i>), which contains all the elements between <i>first</i> and <i>last</i>, 
	 *			   including the element pointed by <i>first</i> but not the element pointed by <i>last</i>. 
	 *			   {@link IArrayIterator RandomAccessIterator} shall point to a type for which {@link Iterator.swap swap} 
	 *			   is properly defined.
	 * 
	 * @return <code>true</code> if the range [<i>first</i>, <i>last</i>) is a heap (as if constructed with 
	 *		   {@link make_heap}), <code>false</code> otherwise. If the range [<i>first</i>, <i>last</i>) contains less 
	 *		   than two elements, the function always returns <code>true</code>.
	 */
	export function is_heap<T, RandomAccessIterator extends base.IArrayIterator<T>>
		(first: RandomAccessIterator, last: RandomAccessIterator): boolean;

	/**
	 * Test if range is heap.
	 *
	 * Returns true if the range [<i>first</i>, <i>last</i>) forms a heap, as if constructed with {@link make_heap}.
	 *
	 * The elements are compared using <i>compare</i>.
	 * 
	 * @param first {@link IArrayIterator Random-access iterator} to the initial position of the sequence.
	 * @param last {@link IArrayIterator Random-access iterator} to the final position of the sequence. The range used is
	 *			   [<i>first</i>, <i>last</i>), which contains all the elements between <i>first</i> and <i>last</i>,
	 *			   including the element pointed by <i>first</i> but not the element pointed by <i>last</i>.
	 *			   {@link IArrayIterator RandomAccessIterator} shall point to a type for which {@link Iterator.swap swap}
	 *			   is properly defined.
	 * @param compare Binary function that accepts two elements in the range as arguments, and returns a value
	 *				  convertible to <code>boolean</code>. The value returned indicates whether the element passed as
	 *				  first argument is considered to go before the second in the specific strict weak ordering it defines.
	 *				  The function shall not modify any of its arguments. This can either be a function pointer or a
	 *				  function object.
	 * 
	 * @return <code>true</code> if the range [<i>first</i>, <i>last</i>) is a heap (as if constructed with
	 *		   {@link make_heap}), <code>false</code> otherwise. If the range [<i>first</i>, <i>last</i>) contains less
	 *		   than two elements, the function always returns <code>true</code>.
	 */
	export function is_heap<T, RandomAccessIterator extends base.IArrayIterator<T>>
		(first: RandomAccessIterator, last: RandomAccessIterator, compare: (x: T, y: T) => boolean): boolean;

	export function is_heap<T, RandomAccessIterator extends base.IArrayIterator<T>>
		(first: RandomAccessIterator, last: RandomAccessIterator, compare: (x: T, y: T) => boolean = less): boolean
	{
		let it = is_heap_until(first, last, compare);

		return it.equals(last);
	}

	/**
	 * Find first element not in heap order.
	 * 
	 * Returns an iterator to the first element in the range [<i>first</i>, <i>last</i>) which is not in a valid 
	 * position if the range is considered a heap (as if constructed with {@link make_heap}).
	 * 
	 * The range between first and the iterator returned is a heap.
	 * 
	 * If the entire range is a valid heap, the function returns <i>last</i>.
	 * 
	 * The elements are compared using {@link less}.
	 * 
	 * @param first {@link IArrayIterator Random-access iterator} to the initial position of the sequence.
	 * @param last {@link IArrayIterator Random-access iterator} to the final position of the sequence. The range used is
	 *			   [<i>first</i>, <i>last</i>), which contains all the elements between <i>first</i> and <i>last</i>,
	 *			   including the element pointed by <i>first</i> but not the element pointed by <i>last</i>.
	 *			   {@link IArrayIterator RandomAccessIterator} shall point to a type for which {@link Iterator.swap swap}
	 *			   is properly defined.
	 */
	export function is_heap_until<T, RandomAccessIterator extends base.IArrayIterator<T>>
		(first: RandomAccessIterator, last: RandomAccessIterator): RandomAccessIterator;

	/**
	 * Find first element not in heap order.
	 *
	 * Returns an iterator to the first element in the range [<i>first</i>, <i>last</i>) which is not in a valid
	 * position if the range is considered a heap (as if constructed with {@link make_heap}).
	 *
	 * The range between first and the iterator returned is a heap.
	 *
	 * If the entire range is a valid heap, the function returns <i>last</i>.
	 *
	 * The elements are compared using {@link less}.
	 * 
	 * @param first {@link IArrayIterator Random-access iterator} to the initial position of the sequence.
	 * @param last {@link IArrayIterator Random-access iterator} to the final position of the sequence. The range used is
	 *			   [<i>first</i>, <i>last</i>), which contains all the elements between <i>first</i> and <i>last</i>,
	 *			   including the element pointed by <i>first</i> but not the element pointed by <i>last</i>.
	 *			   {@link IArrayIterator RandomAccessIterator} shall point to a type for which {@link Iterator.swap swap}
	 *			   is properly defined.
	 * @param compare Binary function that accepts two elements in the range as arguments, and returns a value
	 *				  convertible to <code>boolean</code>. The value returned indicates whether the element passed as
	 *				  first argument is considered to go before the second in the specific strict weak ordering it defines.
	 *				  The function shall not modify any of its arguments. This can either be a function pointer or a
	 *				  function object.
	 */
	export function is_heap_until<T, RandomAccessIterator extends base.IArrayIterator<T>>
		(first: RandomAccessIterator, last: RandomAccessIterator, compare: (x: T, y: T) => boolean): RandomAccessIterator;

	export function is_heap_until<T, RandomAccessIterator extends base.IArrayIterator<T>>
		(first: RandomAccessIterator, last: RandomAccessIterator, compare: (x: T, y: T) => boolean = less): RandomAccessIterator
	{
		let prev = first;
		for (let it = first.next() as RandomAccessIterator; !it.equals(last); it = it.next() as RandomAccessIterator)
		{
			if (compare(prev.value, it.value) == true)
				return it;

			prev = it;
		}
		return last;
	}

	/**
	 * Sort elements of heap.
	 * 
	 * Sorts the elements in the heap range [<i>first</i>, <i>last</i>) into ascending order.
	 * 
	 * The elements are compared using {@link less}, which shall be the same as used to construct the heap.
	 * 
	 * The range loses its properties as a heap.
	 * 
	 * @param first {@link IArrayIterator Random-access iterator} to the initial position of the sequence to be sorted.
	 * @param last {@link IArrayIterator Random-access iterator} to the final position of the sequence to be sorted.
	 *			   The range used is [<i>first</i>, <i>last</i>), which contains all the elements between <i>first</i> and 
	 *			   <i>last</i>, including the element pointed by <i>first</i> but not the element pointed by <i>last</i>. 
	 *			   {@link IArrayIterator RandomAccessIterator} shall point to a type for which {@link Iterator.swap swap} 
	 *			   is properly defined.
	 */
	export function sort_heap<T, RandomAccessIterator extends base.IArrayIterator<T>>
		(first: RandomAccessIterator, last: RandomAccessIterator): void;

	/**
	 * Sort elements of heap.
	 *
	 * Sorts the elements in the heap range [<i>first</i>, <i>last</i>) into ascending order.
	 *
	 * The elements are compared using <i>compare</i>, which shall be the same as used to construct the heap.
	 *
	 * The range loses its properties as a heap.
	 * 
	 * @param first {@link IArrayIterator Random-access iterator} to the initial position of the sequence to be sorted.
	 * @param last {@link IArrayIterator Random-access iterator} to the final position of the sequence to be sorted.
	 *			   The range used is [<i>first</i>, <i>last</i>), which contains all the elements between <i>first</i> and
	 *			   <i>last</i>, including the element pointed by <i>first</i> but not the element pointed by <i>last</i>.
	 *			   {@link IArrayIterator RandomAccessIterator} shall point to a type for which {@link Iterator.swap swap}
	 *			   is properly defined.
	 * @param compare Binary function that accepts two elements in the range as arguments, and returns a value
	 *				  convertible to <code>boolean</code>. The value returned indicates whether the element passed as
	 *				  first argument is considered to go before the second in the specific strict weak ordering it defines.
	 *				  The function shall not modify any of its arguments. This can either be a function pointer or a
	 *				  function object.
	 */
	export function sort_heap<T, RandomAccessIterator extends base.IArrayIterator<T>>
		(first: RandomAccessIterator, last: RandomAccessIterator, compare: (x: T, y: T) => boolean): void;

	export function sort_heap<T, RandomAccessIterator extends base.IArrayIterator<T>>
		(first: RandomAccessIterator, last: RandomAccessIterator, compare: (x: T, y: T) => boolean = less): void
	{
		sort(first, last, compare);
	}
}

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
	 * @param first {@link Iterator Forward iterator} to the initial position of a {@link is_sorted sorted} (or properly 
	 *				{@link is_partitioned partitioned}) sequence.
	 * @param last {@link Iterator Forward iterator} to the final position of a {@link is_sorted sorted} (or properly
	 *			   {@link is_partitioned partitioned}) sequence. The range used is [<i>first</i>, <i>last</i>), which 
	 *			   contains all the elements between <i>first</i> and <i>last</i>, including the element pointed by 
	 *			   <i>first</i> but not the element pointed by <i>last</i>.
	 * @param val Value of the lower bound to search for in the range. <i>T</i> shall be a type supporting being compared 
	 *			  with elements of the range [<i>first</i>, <i>last</i>) as the left-hand side operand of {@link less}.
	 * 
	 * @return An iterator to the lower bound of <i>val</i> in the range. If all the element in the range compare less than 
	 *		   <i>val</i>, the function returns <i>last</i>.
	 */
	export function lower_bound<T, ForwardIterator extends Iterator<T>>
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
	 * @param first {@link Iterator Forward iterator} to the initial position of a {@link is_sorted sorted} (or properly 
	 *				{@link is_partitioned partitioned}) sequence.
	 * @param last {@link Iterator Forward iterator} to the final position of a {@link is_sorted sorted} (or properly
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
	export function lower_bound<T, ForwardIterator extends Iterator<T>>
		(
			first: ForwardIterator, last: ForwardIterator, val: T, 
			compare: (x: T, y: T) => boolean
		): ForwardIterator;

	export function lower_bound<T, ForwardIterator extends Iterator<T>>
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
	 * @param first {@link Iterator Forward iterator} to the initial position of a {@link is_sorted sorted} (or properly 
	 *				{@link is_partitioned partitioned}) sequence.
	 * @param last {@link Iterator Forward iterator} to the final position of a {@link is_sorted sorted} (or properly
	 *			   {@link is_partitioned partitioned}) sequence. The range used is [<i>first</i>, <i>last</i>), which 
	 *			   contains all the elements between <i>first</i> and <i>last</i>, including the element pointed by 
	 *			   <i>first</i> but not the element pointed by <i>last</i>.
	 * @param val Value of the lower bound to search for in the range. <i>T</i> shall be a type supporting being compared
	 *			  with elements of the range [<i>first</i>, <i>last</i>) as the left-hand side operand of {@link less}.
	 * 
	 * @return An iterator to the upper bound of <i>val</i> in the range. If no element in the range comparse greater than 
	 *		   <i>val</i>, the function returns <i>last</i>.
	 */
	export function upper_bound<T, ForwardIterator extends Iterator<T>>
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
	 * @param first {@link Iterator Forward iterator} to the initial position of a {@link is_sorted sorted} (or properly 
	 *				{@link is_partitioned partitioned}) sequence.
	 * @param last {@link Iterator Forward iterator} to the final position of a {@link is_sorted sorted} (or properly
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
	export function upper_bound<T, ForwardIterator extends Iterator<T>>
		(
			first: ForwardIterator, last: ForwardIterator, val: T,
			compare: (x: T, y: T) => boolean
		): ForwardIterator;

	export function upper_bound<T, ForwardIterator extends Iterator<T>>
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
	 * @param first {@link Iterator Forward iterator} to the initial position of a {@link is_sorted sorted} (or properly
	 *				{@link is_partitioned partitioned}) sequence.
	 * @param last {@link Iterator Forward iterator} to the final position of a {@link is_sorted sorted} (or properly
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
	export function equal_range<T, ForwardIterator extends Iterator<T>>
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
	 * @param first {@link Iterator Forward iterator} to the initial position of a {@link is_sorted sorted} (or properly
	 *				{@link is_partitioned partitioned}) sequence.
	 * @param last {@link Iterator Forward iterator} to the final position of a {@link is_sorted sorted} (or properly
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
	export function equal_range<T, ForwardIterator extends Iterator<T>>
		(
			first: ForwardIterator, last: ForwardIterator, val: T,
			compare: (x: T, y: T) => boolean
		): Pair<ForwardIterator, ForwardIterator>;

	export function equal_range<T, ForwardIterator extends Iterator<T>>
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
	 * @param first {@link Iterator Forward iterator} to the initial position of a {@link is_sorted sorted} (or properly
	 *				{@link is_partitioned partitioned}) sequence.
	 * @param last {@link Iterator Forward iterator} to the final position of a {@link is_sorted sorted} (or properly
	 *			   {@link is_partitioned partitioned}) sequence. The range used is [<i>first</i>, <i>last</i>), which
	 *			   contains all the elements between <i>first</i> and <i>last</i>, including the element pointed by
	 *			   <i>first</i> but not the element pointed by <i>last</i>.
	 * @param val Value of the lower bound to search for in the range. <i>T</i> shall be a type supporting being compared
	 *			  with elements of the range [<i>first</i>, <i>last</i>) as the left-hand side operand of {@link less}.
	 * 
	 * @return <code>true</code> if an element equivalent to <i>val</i> is found, and <code>false</code> otherwise.
	 */
	export function binary_search<T, ForwardIterator extends Iterator<T>>
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
	 * @param first {@link Iterator Forward iterator} to the initial position of a {@link is_sorted sorted} (or properly
	 *				{@link is_partitioned partitioned}) sequence.
	 * @param last {@link Iterator Forward iterator} to the final position of a {@link is_sorted sorted} (or properly
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
	export function binary_search<T, ForwardIterator extends Iterator<T>>
		(
			first: ForwardIterator, last: ForwardIterator, val: T,
			compare: (x: T, y: T) => boolean
		): boolean;

	export function binary_search<T, ForwardIterator extends Iterator<T>>
		(
			first: ForwardIterator, last: ForwardIterator, val: T,
			compare: (x: T, y: T) => boolean = less
		): boolean
	{
		first = lower_bound(first, last, val, compare);

		return !first.equals(last) && !compare(val, first.value);
	}
}

namespace std
{
	/* =========================================================
		PARTITION
	========================================================= */
	/**
	 * Test whether range is partitioned.
	 * 
	 * Returns <code>true</code> if all the elements in the range [<i>first</i>, <i>last</i>) for which <i>pred</i> 
	 * returns <code>true</code> precede those for which it returns <code>false</code>.
	 * 
	 * If the range is {@link Container.empty empty}, the function returns <code>true</code>.
	 * 
	 * @param first {@link Iterator Input iterator} to the initial position of the sequence.
	 * @param last {@link Iterator Input iterator} to the final position of the sequence. The range used is
	 *			   [<i>first</i>, <i>last</i>), which contains all the elements between <i>first</i> and <i>last</i>,
	 *			   including the element pointed by <i>first</i> but not the element pointed by <i>last</i>.
	 * @param pred Unary function that accepts an element in the range as argument, and returns a value convertible to 
	 *			   <code>bool</code>. The value returned indicates whether the element belongs to the first group (if 
	 *			   <code>true</code>, the element is expected before all the elements for which it returns 
	 *			   <code>false</code>). The function shall not modify its argument.
	 * 
	 * @return <code>true</code> if all the elements in the range [<i>first</i>, <i>last</i>) for which <i>pred</i> returns 
	 *		   <code>true</code> precede those for which it returns <code>false</code>. Otherwise it returns 
	 *		   <code>false</code>. If the range is {@link Container.empty empty}, the function returns <code>true</code>.
	 */
	export function is_partitioned<T, InputIterator extends Iterator<T>>
		(first: InputIterator, last: InputIterator, pred: (x: T) => boolean): boolean
	{
		while (!first.equals(last) && pred(first.value))
			first = first.next() as InputIterator;

		for (; !first.equals(last); first = first.next() as InputIterator)
			if (pred(first.value))
				return false;

		return true;
	}

	/**
	 * Partition range in two.
	 * 
	 * Rearranges the elements from the range [<i>first</i>, <i>last</i>), in such a way that all the elements for 
	 * which <i>pred</i> returns <code>true</code> precede all those for which it returns <code>false</code>. The iterator 
	 * returned points to the first element of the second group.
	 * 
	 * The relative ordering within each group is not necessarily the same as before the call. See 
	 * {@link stable_partition} for a function with a similar behavior but with stable ordering within each group.
	 * 
	 * @param first {@link Iterator Forward iterator} to the initial position of the sequence to partition.
	 * @param last {@link Iterator Forward iterator} to the final position of the sequence to partition. The range used is
	 *			   [<i>first</i>, <i>last</i>), which contains all the elements between <i>first</i> and <i>last</i>,
	 *			   including the element pointed by <i>first</i> but not the element pointed by <i>last</i>.
	 * @param pred Unary function that accepts an element in the range as argument, and returns a value convertible to
	 *			   <code>bool</code>. The value returned indicates whether the element belongs to the first group (if
	 *			   <code>true</code>, the element is expected before all the elements for which it returns
	 *			   <code>false</code>). The function shall not modify its argument.
	 * 
	 * @return An iterator that points to the first element of the second group of elements (those for which <i>pred</i> 
	 *		   returns <code>false</code>), or <i>last</i> if this group is {@link Container.empty empty}.
	 */
	export function partition<T, BidirectionalIterator extends Iterator<T>>
		(first: BidirectionalIterator, last: BidirectionalIterator, pred: (x: T) => boolean): BidirectionalIterator
	{
		while (!first.equals(last))
		{
			while (pred(first.value))
			{
				first = first.next() as BidirectionalIterator;
				if (first.equals(last))
					return first;
			}

			do
			{
				last = last.prev() as BidirectionalIterator;
				if (first.equals(last))
					return first;
			} while (!pred(last.value));

			first.swap(last);
			first = first.next() as BidirectionalIterator;
		}

		return last;
	}

	/**
	 * Partition range in two - stable ordering.
	 * 
	 * Rearranges the elements in the range [<i>first</i>, <i>last</i>), in such a way that all the elements for which 
	 * <i>pred</i> returns <code>true</code> precede all those for which it returns <code>false</code>, and, unlike 
	 * function {@link partition}, the relative order of elements within each group is preserved.
	 * 
	 * This is generally implemented using an internal temporary buffer.
	 * 
	 * @param first {@link Iterator Bidirectional iterator} to the initial position of the sequence to partition.
	 * @param last {@link Iterator Bidirectional iterator} to the final position of the sequence to partition. The range 
	 *			   used is [<i>first</i>, <i>last</i>), which contains all the elements between <i>first</i> and 
	 *			   <i>last</i>, including the element pointed by <i>first</i> but not the element pointed by <i>last</i>.
	 * @param pred Unary function that accepts an element in the range as argument, and returns a value convertible to
	 *			   <code>bool</code>. The value returned indicates whether the element belongs to the first group (if
	 *			   <code>true</code>, the element is expected before all the elements for which it returns
	 *			   <code>false</code>). The function shall not modify its argument.
	 *
	 * @return An iterator that points to the first element of the second group of elements (those for which <i>pred</i>
	 *		   returns <code>false</code>), or <i>last</i> if this group is {@link Container.empty empty}.
	 */
	export function stable_partition<T, BidirectionalIterator extends Iterator<T>>
		(first: BidirectionalIterator, last: BidirectionalIterator, pred: (x: T) => boolean): BidirectionalIterator
	{
		return partition(first, last, pred);
	}

	/**
	 * Partition range into two.
	 * 
	 * Copies the elements in the range [<i>first</i>, <i>last</i>) for which <i>pred</i> returns <code>true</code> 
	 * into the range pointed by <i>result_true</i>, and those for which it does not into the range pointed by 
	 * <i>result_false</i>.
	 * 
	 * @param first {@link Iterator Input iterator} to the initial position of the range to be copy-partitioned.
	 * @param last {@link Iterator Input iterator} to the final position of the range to be copy-partitioned. The range 
	 *			   used is [<i>first</i>, <i>last</i>), which contains all the elements between <i>first</i> and 
	 *			   <i>last</i>, including the element pointed by <i>first</i> but not the element pointed by <i>last</i>.
	 * @param result_true {@link Iterator Output iterator} to the initial position of the range where the elements for 
	 *					  which <i>pred</i> returns <code>true</code> are stored.
	 * @param result_false {@link Iterator Output iterator} to the initial position of the range where the elements for
	 *					   which <i>pred</i> returns <code>false</code> are stored.
	 * @param pred Unary function that accepts an element pointed by <i>InputIterator</i> as argument, and returns a value 
	 *			   convertible to <code>bool</code>. The value returned indicates on which result range the element is 
	 *			   copied. The function shall not modify its argument.
	 * 
	 * @return A {@link Pair} of iterators with the end of the generated sequences pointed by <i>result_true</i> and 
	 *		   <i>result_false</i>, respectivelly. Its member {@link Pair.first first} points to the element that follows 
	 *		   the last element copied to the sequence of elements for which <i>pred</i> returned <code>true</code>. Its 
	 *		   member {@link Pair.second second} points to the element that follows the last element copied to the sequence 
	 *		   of elements for which <i>pred</i> returned <code>false</code>.
	 */
	export function partition_copy<T, 
			InputIterator extends Iterator<T>, 
			OutputIterator1 extends base.ILinearIterator<T>, OutputIterator2 extends base.ILinearIterator<T>>
		(
			first: InputIterator, last: InputIterator, 
			result_true: OutputIterator1, result_false: OutputIterator2, pred: (val: T) => T
		): Pair<OutputIterator1, OutputIterator2>
	{
		for (; !first.equals(last); first = first.next() as InputIterator)
			if (pred(first.value))
			{
				result_true.value = first.value;
				result_true = result_true.next() as OutputIterator1;
			}
			else
			{
				result_false.value = first.value;
				result_false = result_false.next() as OutputIterator2;
			}
		
		return make_pair(result_true, result_false);
	}

	/**
	 * Get partition point.
	 * 
	 * Returns an iterator to the first element in the partitioned range [<i>first</i>, <i>last</i>) for which 
	 * <i>pred</i> is not <code>true</code>, indicating its partition point.
	 * 
	 * The elements in the range shall already {@link is_partitioned be partitioned}, as if {@link partition} had been 
	 * called with the same arguments.
	 * 
	 * The function optimizes the number of comparisons performed by comparing non-consecutive elements of the sorted 
	 * range, which is specially efficient for {@link Iteartor random-access iterators}.
	 * 
	 * @param first {@link Iterator Forward iterator} to the initial position of the partitioned sequence.
	 * @param last {@link Iterator Forward iterator} to the final position of the partitioned sequence. The range checked 
	 *		  is [<i>first</i>, <i>last</i>), which contains all the elements between <i>first</i> an <i>last</i>, 
	 *		  including the element pointed by <i>first</i> but not the element pointed by <i>last</i>.
	 * @param pred Unary function that accepts an element in the range as argument, and returns a value convertible to
	 *			   <code>bool</code>. The value returned indicates whether the element goes before the partition point (if 
	 *			   <code>true</code>, it goes before; if <code>false</code> goes at or after it). The function shall not 
	 *			   modify its argument.
	 *
	 * @return An iterator to the first element in the partitioned range [<i>first</i>, <i>last</i>) for which <i>pred</i> 
	 *		   is not <code>true</code>, or <i>last</i> if it is not <code>true</code> for any element.
	 */
	export function partition_point<T, ForwardIterator extends Iterator<T>>
		(first: ForwardIterator, last: ForwardIterator, pred: (x: T) => boolean): ForwardIterator
	{
		let n: number = distance(first, last);

		while (n > 0)
		{
			let step: number = Math.floor(n / 2);
			let it: ForwardIterator = first.advance(step) as ForwardIterator;

			if (pred(it.value))
			{
				first = it.next() as ForwardIterator;
				n -= step + 1;
			}
			else
				n = step;
		}

		return first;
	}
}

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
	 * @param first1 {@link Iterator Input iterator} to the initial position of the first sorted sequence.
	 * @param last1 {@link Iterator Input iterator} to the final position of the first sorted sequence. The range used is 
	 *				[<i>first1</i>, <i>last1</i>), which contains all the elements between <i>first1</i> and <i>last1</i>, 
	 *				including the element pointed by <i>first1</i> but not the element pointed by <i>last1</i>.
	 * @param first2 {@link Iterator Input iterator} to the initial position of the second sorted sequence.
	 * @param last2 {@link Iterator Input iterator} to the final position of the second sorted sequence. The range used is 
	 *				[<i>first2</i>, <i>last2</i>).
	 * @param result {@link Iterator Output iterator} to the initial position of the range where the resulting combined 
	 *				 range is stored. Its size is equal to the sum of both ranges above.
	 * 
	 * @return An iterator pointing to the past-the-end element in the resulting sequence.
	 */
	export function merge<T, 
			InputIterator1 extends Iterator<T>, InputIterator2 extends Iterator<T>,
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
	 * @param first1 {@link Iterator Input iterator} to the initial position of the first sorted sequence.
	 * @param last1 {@link Iterator Input iterator} to the final position of the first sorted sequence. The range used is 
	 *				[<i>first1</i>, <i>last1</i>), which contains all the elements between <i>first1</i> and <i>last1</i>, 
	 *				including the element pointed by <i>first1</i> but not the element pointed by <i>last1</i>.
	 * @param first2 {@link Iterator Input iterator} to the initial position of the second sorted sequence.
	 * @param last2 {@link Iterator Input iterator} to the final position of the second sorted sequence. The range used is 
	 *				[<i>first2</i>, <i>last2</i>).
	 * @param result {@link Iterator Output iterator} to the initial position of the range where the resulting combined 
	 *				 range is stored. Its size is equal to the sum of both ranges above.
	 * @param compare Binary function that accepts two arguments of the types pointed by the iterators, and returns a value 
	 *				  convertible to <code>bool</code>. The value returned indicates whether the first argument is 
	 *				  considered to go before the second in the specific <i>strict weak ordering</i> it defines. The 
	 *				  function shall not modify any of its arguments.
	 * 
	 * @return An iterator pointing to the past-the-end element in the resulting sequence.
	 */
	export function merge<T, 
			InputIterator1 extends Iterator<T>, InputIterator2 extends Iterator<T>,
			OutputIterator extends base.ILinearIterator<T>>
		(
			first1: InputIterator1, last1: InputIterator1, first2: InputIterator2, last2: InputIterator2,
			result: OutputIterator, compare: (x: T, y: T) => boolean
		): OutputIterator;

	export function merge<T, 
			InputIterator1 extends Iterator<T>, InputIterator2 extends Iterator<T>,
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
	 * @param first {@link Iterator Bidirectional iterator} to the initial position in the first sorted sequence to merge. 
	 *				This is also the initial position where the resulting merged range is stored.
	 * @param middle {@link Iterator Bidirectional iterator} to the initial position of the second sorted sequence, which 
	 *				 because both sequences must be consecutive, matches the <i>past-the-end</i> position of the first 
	 *				 sequence.
	 * @param last {@link Iterator Bidirectional iterator} to the <i>past-the-end</i> position of the second sorted 
	 *			   sequence. This is also the <i>past-the-end</i> position of the range where the resulting merged range is 
	 *			   stored.
	 */
	export function inplace_merge<T, BidirectionalIterator extends Iterator<T>>
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
	 * @param first {@link Iterator Bidirectional iterator} to the initial position in the first sorted sequence to merge. 
	 *				This is also the initial position where the resulting merged range is stored.
	 * @param middle {@link Iterator Bidirectional iterator} to the initial position of the second sorted sequence, which 
	 *				 because both sequences must be consecutive, matches the <i>past-the-end</i> position of the first 
	 *				 sequence.
	 * @param last {@link Iterator Bidirectional iterator} to the <i>past-the-end</i> position of the second sorted 
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
	 * @param first1 {@link Iterator Input iterator} to the initial position of the first sorted sequence.
	 * @param last1 {@link Iterator Input iterator} to the final position of the first sorted sequence (which is tested on 
	 *				whether it contains the second sequence). The range used is [<i>first1</i>, <i>last1</i>), which 
	 *				contains all the elements between <i>first1</i> and <i>last1</i>, including the element pointed by 
	 *				<i>first1</i> but not the element pointed by <i>last1</i>.
	 * @param first2 {@link Iterator Input iterator} to the initial position of the second sorted sequence.
	 * @param last2 {@link Iterator Input iterator} to the final position of the second sorted sequence. (which is tested 
	 *				on whether it is contained in the first sequence). The range used is [<i>first2</i>, <i>last2</i>).
	 * 
	 * @return <code>true</code> if every element in the range [<i>first2</i>, <i>last2</i>) is contained in the range 
	 *		   [<i>first1</i>, <i>last1</i>), <code>false</code> otherwise. If [<i>first2</i>, <i>last2</i>) is an empty 
	 *		   range, the function returns <code>true</code>.
	 */
	export function includes<T, InputIterator1 extends Iterator<T>, InputIterator2 extends Iterator<T>>
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
	 * @param first1 {@link Iterator Input iterator} to the initial position of the first sorted sequence.
	 * @param last1 {@link Iterator Input iterator} to the final position of the first sorted sequence (which is tested on 
	 *				whether it contains the second sequence). The range used is [<i>first1</i>, <i>last1</i>), which 
	 *				contains all the elements between <i>first1</i> and <i>last1</i>, including the element pointed by 
	 *				<i>first1</i> but not the element pointed by <i>last1</i>.
	 * @param first2 {@link Iterator Input iterator} to the initial position of the second sorted sequence.
	 * @param last2 {@link Iterator Input iterator} to the final position of the second sorted sequence. (which is tested 
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
	export function includes<T, InputIterator1 extends Iterator<T>, InputIterator2 extends Iterator<T>>
		(
			first1: InputIterator1, last1: InputIterator1, first2: InputIterator2, last2: InputIterator2,
			compare: (x: T, y: T) => boolean
		): boolean;

	export function includes<T, InputIterator1 extends Iterator<T>, InputIterator2 extends Iterator<T>>
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
	 * @param first1 {@link Iterator Input iterator} to the initial position of the first sorted sequence.
	 * @param last1 {@link Iterator Input iterator} to the final position of the first sorted sequence. The range used is
	 *				[<i>first1</i>, <i>last1</i>), which contains all the elements between <i>first1</i> and <i>last1</i>,
	 *				including the element pointed by <i>first1</i> but not the element pointed by <i>last1</i>.
	 * @param first2 {@link Iterator Input iterator} to the initial position of the second sorted sequence.
	 * @param last2 {@link Iterator Input iterator} to the final position of the second sorted sequence. The range used is
	 *				[<i>first2</i>, <i>last2</i>).
	 * @param result {@link Iterator Output iterator} to the initial position of the range where the resulting sequence is 
	 *				 stored. The pointed type shall support being assigned the value of an element from the other ranges.
	 * 
	 * @return An iterator to the end of the constructed range.
	 */
	export function set_union<T, 
			InputIterator1 extends Iterator<T>, 
			InputIterator2 extends Iterator<T>,
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
	 * @param first1 {@link Iterator Input iterator} to the initial position of the first sorted sequence.
	 * @param last1 {@link Iterator Input iterator} to the final position of the first sorted sequence. The range used is
	 *				[<i>first1</i>, <i>last1</i>), which contains all the elements between <i>first1</i> and <i>last1</i>,
	 *				including the element pointed by <i>first1</i> but not the element pointed by <i>last1</i>.
	 * @param first2 {@link Iterator Input iterator} to the initial position of the second sorted sequence.
	 * @param last2 {@link Iterator Input iterator} to the final position of the second sorted sequence. The range used is
	 *				[<i>first2</i>, <i>last2</i>).
	 * @param result {@link Iterator Output iterator} to the initial position of the range where the resulting sequence is 
	 *				 stored. The pointed type shall support being assigned the value of an element from the other ranges.
	 * @param compare Binary function that accepts two arguments of the types pointed by the input iterators, and returns a 
	 *				  value convertible to <code>bool</code>. The value returned indicates whether the first argument is 
	 *				  considered to go before the second in the specific <i>strict weak ordering</i> it defines. The 
	 *				  function shall not modify any of its arguments.
	 * 
	 * @return An iterator to the end of the constructed range.
	 */
	export function set_union<T, 
			InputIterator1 extends Iterator<T>, 
			InputIterator2 extends Iterator<T>,
			OutputIterator extends base.ILinearIterator<T>>
		(
			first1: InputIterator1, last1: InputIterator1, first2: InputIterator2, last2: InputIterator2,
			result: OutputIterator, compare: (x: T, y: T) => boolean
		): OutputIterator;
	
	export function set_union<T, 
			InputIterator1 extends Iterator<T>, 
			InputIterator2 extends Iterator<T>,
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
	 * @param first1 {@link Iterator Input iterator} to the initial position of the first sorted sequence.
	 * @param last1 {@link Iterator Input iterator} to the final position of the first sorted sequence. The range used is
	 *				[<i>first1</i>, <i>last1</i>), which contains all the elements between <i>first1</i> and <i>last1</i>,
	 *				including the element pointed by <i>first1</i> but not the element pointed by <i>last1</i>.
	 * @param first2 {@link Iterator Input iterator} to the initial position of the second sorted sequence.
	 * @param last2 {@link Iterator Input iterator} to the final position of the second sorted sequence. The range used is
	 *				[<i>first2</i>, <i>last2</i>).
	 * @param result {@link Iterator Output iterator} to the initial position of the range where the resulting sequence is
	 *				 stored. The pointed type shall support being assigned the value of an element from the first range.
	 *
	 * @return An iterator to the end of the constructed range.
	 */
	export function set_intersection<T, 
			InputIterator1 extends Iterator<T>, 
			InputIterator2 extends Iterator<T>,
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
	 * @param first1 {@link Iterator Input iterator} to the initial position of the first sorted sequence.
	 * @param last1 {@link Iterator Input iterator} to the final position of the first sorted sequence. The range used is
	 *				[<i>first1</i>, <i>last1</i>), which contains all the elements between <i>first1</i> and <i>last1</i>,
	 *				including the element pointed by <i>first1</i> but not the element pointed by <i>last1</i>.
	 * @param first2 {@link Iterator Input iterator} to the initial position of the second sorted sequence.
	 * @param last2 {@link Iterator Input iterator} to the final position of the second sorted sequence. The range used is
	 *				[<i>first2</i>, <i>last2</i>).
	 * @param result {@link Iterator Output iterator} to the initial position of the range where the resulting sequence is
	 *				 stored. The pointed type shall support being assigned the value of an element from the first range.
	 * @param compare Binary function that accepts two arguments of the types pointed by the input iterators, and returns a
	 *				  value convertible to <code>bool</code>. The value returned indicates whether the first argument is
	 *				  considered to go before the second in the specific <i>strict weak ordering</i> it defines. The
	 *				  function shall not modify any of its arguments.
	 *
	 * @return An iterator to the end of the constructed range.
	 */
	export function set_intersection<T, 
			InputIterator1 extends Iterator<T>, 
			InputIterator2 extends Iterator<T>,
			OutputIterator extends base.ILinearIterator<T>>
		(
			first1: InputIterator1, last1: InputIterator1, first2: InputIterator2, last2: InputIterator2,
			result: OutputIterator, compare: (x: T, y: T) => boolean
		): OutputIterator;

	export function set_intersection<T, 
			InputIterator1 extends Iterator<T>, 
			InputIterator2 extends Iterator<T>,
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
	 * @param first1 {@link Iterator Input iterator} to the initial position of the first sorted sequence.
	 * @param last1 {@link Iterator Input iterator} to the final position of the first sorted sequence. The range used is
	 *				[<i>first1</i>, <i>last1</i>), which contains all the elements between <i>first1</i> and <i>last1</i>,
	 *				including the element pointed by <i>first1</i> but not the element pointed by <i>last1</i>.
	 * @param first2 {@link Iterator Input iterator} to the initial position of the second sorted sequence.
	 * @param last2 {@link Iterator Input iterator} to the final position of the second sorted sequence. The range used is
	 *				[<i>first2</i>, <i>last2</i>).
	 * @param result {@link Iterator Output iterator} to the initial position of the range where the resulting sequence is
	 *				 stored. The pointed type shall support being assigned the value of an element from the first range.
	 * 
	 * @return An iterator to the end of the constructed range.
	 */
	export function set_difference<T, 
			InputIterator1 extends Iterator<T>, 
			InputIterator2 extends Iterator<T>,
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
	 * @param first1 {@link Iterator Input iterator} to the initial position of the first sorted sequence.
	 * @param last1 {@link Iterator Input iterator} to the final position of the first sorted sequence. The range used is
	 *				[<i>first1</i>, <i>last1</i>), which contains all the elements between <i>first1</i> and <i>last1</i>,
	 *				including the element pointed by <i>first1</i> but not the element pointed by <i>last1</i>.
	 * @param first2 {@link Iterator Input iterator} to the initial position of the second sorted sequence.
	 * @param last2 {@link Iterator Input iterator} to the final position of the second sorted sequence. The range used is
	 *				[<i>first2</i>, <i>last2</i>).
	 * @param result {@link Iterator Output iterator} to the initial position of the range where the resulting sequence is
	 *				 stored. The pointed type shall support being assigned the value of an element from the first range.
	 * @param compare Binary function that accepts two arguments of the types pointed by the input iterators, and returns a
	 *				  value convertible to <code>bool</code>. The value returned indicates whether the first argument is
	 *				  considered to go before the second in the specific <i>strict weak ordering</i> it defines. The
	 *				  function shall not modify any of its arguments.
	 * 
	 * @return An iterator to the end of the constructed range.
	 */
	export function set_difference<T, 
			InputIterator1 extends Iterator<T>, 
			InputIterator2 extends Iterator<T>,
			OutputIterator extends base.ILinearIterator<T>>
		(
			first1: InputIterator1, last1: InputIterator1, first2: InputIterator2, last2: InputIterator2,
			result: OutputIterator, compare: (x: T, y: T) => boolean
		): OutputIterator;

	export function set_difference<T, 
			InputIterator1 extends Iterator<T>, 
			InputIterator2 extends Iterator<T>,
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
	 * @param first1 {@link Iterator Input iterator} to the initial position of the first sorted sequence.
	 * @param last1 {@link Iterator Input iterator} to the final position of the first sorted sequence. The range used is
	 *				[<i>first1</i>, <i>last1</i>), which contains all the elements between <i>first1</i> and <i>last1</i>,
	 *				including the element pointed by <i>first1</i> but not the element pointed by <i>last1</i>.
	 * @param first2 {@link Iterator Input iterator} to the initial position of the second sorted sequence.
	 * @param last2 {@link Iterator Input iterator} to the final position of the second sorted sequence. The range used is
	 *				[<i>first2</i>, <i>last2</i>).
	 * @param result {@link Iterator Output iterator} to the initial position of the range where the resulting sequence is
	 *				 stored. The pointed type shall support being assigned the value of an element from the other ranges.
	 * @param compare Binary function that accepts two arguments of the types pointed by the input iterators, and returns a
	 *				  value convertible to <code>bool</code>. The value returned indicates whether the first argument is
	 *				  considered to go before the second in the specific <i>strict weak ordering</i> it defines. The
	 *				  function shall not modify any of its arguments.
	 *
	 * @return An iterator to the end of the constructed range.
	 */
	export function set_symmetric_difference<T, 
			InputIterator1 extends Iterator<T>, 
			InputIterator2 extends Iterator<T>,
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
	 * @param first1 {@link Iterator Input iterator} to the initial position of the first sorted sequence.
	 * @param last1 {@link Iterator Input iterator} to the final position of the first sorted sequence. The range used is
	 *				[<i>first1</i>, <i>last1</i>), which contains all the elements between <i>first1</i> and <i>last1</i>,
	 *				including the element pointed by <i>first1</i> but not the element pointed by <i>last1</i>.
	 * @param first2 {@link Iterator Input iterator} to the initial position of the second sorted sequence.
	 * @param last2 {@link Iterator Input iterator} to the final position of the second sorted sequence. The range used is
	 *				[<i>first2</i>, <i>last2</i>).
	 * @param result {@link Iterator Output iterator} to the initial position of the range where the resulting sequence is
	 *				 stored. The pointed type shall support being assigned the value of an element from the other ranges.
	 * @param compare Binary function that accepts two arguments of the types pointed by the input iterators, and returns a
	 *				  value convertible to <code>bool</code>. The value returned indicates whether the first argument is
	 *				  considered to go before the second in the specific <i>strict weak ordering</i> it defines. The
	 *				  function shall not modify any of its arguments.
	 *
	 * @return An iterator to the end of the constructed range.
	 */
	export function set_symmetric_difference<T, 
			InputIterator1 extends Iterator<T>, 
			InputIterator2 extends Iterator<T>,
			OutputIterator extends base.ILinearIterator<T>>
		(
			first1: InputIterator1, last1: InputIterator1, first2: InputIterator2, last2: InputIterator2,
			result: OutputIterator, compare: (x: T, y: T) => boolean
		): OutputIterator;

	export function set_symmetric_difference<T, 
			InputIterator1 extends Iterator<T>, 
			InputIterator2 extends Iterator<T>,
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

namespace std
{
	/* =========================================================
		MATHMATICS
			- MIN & MAX
			- PERMUTATION
			- MISCELLANEOUS
	============================================================
		MIN & MAX
	--------------------------------------------------------- */
	/**
	 * Return the smallest.
	 * 
	 * Returns the smallest of all the elements in the <i>args</i>.
	 * 
	 * @param args Values to compare.
	 * 
	 * @return The lesser of the values passed as arguments.
	 */
	export function min<T>(...args: T[]): T
	{
		let minimum: T = args[0];

		for (let i: number = 1; i < args.length; i++)
			if (less(args[i], minimum))
				minimum = args[i];

		return minimum;
	}

	/**
	 * Return the largest.
	 * 
	 * Returns the largest of all the elements in the <i>args</i>.
	 * 
	 * @param args Values to compare.
	 * 
	 * @return The largest of the values passed as arguments.
	 */
	export function max<T>(...args: T[]): T
	{
		let maximum: T = args[0];

		for (let i: number = 1; i < args.length; i++)
			if (greater(args[i], maximum))
				maximum = args[i];

		return maximum;
	}

	/**
	 * Return smallest and largest elements.
	 *
	 * Returns a {@link Pair} with the smallest of all the elements in the <i>args</i> as first element (the first of 
	 * them, if there are more than one), and the largest as second (the last of them, if there are more than one).
	 * 
	 * @param args Values to compare.
	 * 
	 * @return The lesser and greatest of the values passed as arguments.
	 */
	export function minmax<T>(...args: T[]): Pair<T, T>
	{
		let minimum: T = args[0];
		let maximum: T = args[0];

		for (let i: number = 1; i < args.length; i++)
		{
			if (less(args[i], minimum))
				minimum = args[i];
			if (greater(args[i], maximum))
				maximum = args[i];
		}

		return make_pair(minimum, maximum);
	}
	
	/**
	 * Return smallest element in range.
	 * 
	 * Returns an iterator pointing to the element with the smallest value in the range  [<i>first</i>, <i>last</i>).
	 * 
	 * The comparisons are performed using either {@link less}; An element is the smallest if no other element 
	 * compares less than it. If more than one element fulfills this condition, the iterator returned points to the first 
	 * of such elements.
	 * 
	 * @param first {@link Iteartor Input iterator} to the initial final position of the sequence to compare.
	 * @param last {@link Iteartor Input iterator} to the final final position of the sequence to compare. The range used 
	 *			   is [<i>first</i>, <i>last</i>), which contains all the elements between <i>first</i> and <i>last</i>, 
	 *			   including the element pointed by <i>first</i> but not the element pointed by <i>last</i>.
	 * 
	 * @return An iterator to smallest value in the range, or <i>last</i> if the range is empty.
	 */
	export function min_element<T, ForwardIterator extends Iterator<T>>
		(first: ForwardIterator, last: ForwardIterator): ForwardIterator;

	/**
	 * Return smallest element in range.
	 * 
	 * Returns an iterator pointing to the element with the smallest value in the range  [<i>first</i>, <i>last</i>).
	 * 
	 * The comparisons are performed using either <i>compare</i>; An element is the smallest if no other element 
	 * compares less than it. If more than one element fulfills this condition, the iterator returned points to the first 
	 * of such elements.
	 * 
	 * @param first {@link Iteartor Input iterator} to the initial final position of the sequence to compare.
	 * @param last {@link Iteartor Input iterator} to the final final position of the sequence to compare. The range used 
	 *			   is [<i>first</i>, <i>last</i>), which contains all the elements between <i>first</i> and <i>last</i>, 
	 *			   including the element pointed by <i>first</i> but not the element pointed by <i>last</i>.
	 * @param compare Binary function that accepts two elements in the range as arguments, and returns a value convertible 
	 *				  to <code>bool</code>. The value returned indicates whether the element passed as first argument is 
	 *				  considered less than the second. The function shall not modify any of its arguments.
	 * 
	 * @return An iterator to smallest value in the range, or <i>last</i> if the range is empty.
	 */
	export function min_element<T, ForwardIterator extends Iterator<T>>
		(first: ForwardIterator, last: ForwardIterator, compare: (x: T, y: T) => boolean): ForwardIterator;

	export function min_element<T, ForwardIterator extends Iterator<T>>
		(first: ForwardIterator, last: ForwardIterator, compare: (x: T, y: T) => boolean = less): ForwardIterator
	{
		let smallest: ForwardIterator = first;
		first = first.next() as ForwardIterator;
		
		for (; !first.equals(last); first = first.next() as ForwardIterator)
			if (compare(first.value, smallest.value))
				smallest = first;

		return smallest;
	}

	/**
	 * Return largest element in range.
	 * 
	 * Returns an iterator pointing to the element with the largest value in the range  [<i>first</i>, <i>last</i>).
	 * 
	 * The comparisons are performed using either {@link greater}; An element is the largest if no other element 
	 * compares less than it. If more than one element fulfills this condition, the iterator returned points to the first 
	 * of such elements.
	 * 
	 * @param first {@link Iteartor Input iterator} to the initial final position of the sequence to compare.
	 * @param last {@link Iteartor Input iterator} to the final final position of the sequence to compare. The range used 
	 *			   is [<i>first</i>, <i>last</i>), which contains all the elements between <i>first</i> and <i>last</i>, 
	 *			   including the element pointed by <i>first</i> but not the element pointed by <i>last</i>.
	 * 
	 * @return An iterator to largest value in the range, or <i>last</i> if the range is empty.
	 */
	export function max_element<T, ForwardIterator extends Iterator<T>>
		(first: ForwardIterator, last: ForwardIterator): ForwardIterator;

	/**
	 * Return largest element in range.
	 * 
	 * Returns an iterator pointing to the element with the largest value in the range  [<i>first</i>, <i>last</i>).
	 * 
	 * The comparisons are performed using either <i>compare</i>; An element is the largest if no other element 
	 * compares less than it. If more than one element fulfills this condition, the iterator returned points to the first 
	 * of such elements.
	 * 
	 * @param first {@link Iteartor Input iterator} to the initial final position of the sequence to compare.
	 * @param last {@link Iteartor Input iterator} to the final final position of the sequence to compare. The range used 
	 *			   is [<i>first</i>, <i>last</i>), which contains all the elements between <i>first</i> and <i>last</i>, 
	 *			   including the element pointed by <i>first</i> but not the element pointed by <i>last</i>.
	 * @param compare Binary function that accepts two elements in the range as arguments, and returns a value convertible 
	 *				  to <code>bool</code>. The value returned indicates whether the element passed as first argument is 
	 *				  considered less than the second. The function shall not modify any of its arguments.
	 * 
	 * @return An iterator to largest value in the range, or <i>last</i> if the range is empty.
	 */
	export function max_element<T, ForwardIterator extends Iterator<T>>
		(first: ForwardIterator, last: ForwardIterator, compare: (x: T, y: T) => boolean): ForwardIterator;

	export function max_element<T, ForwardIterator extends Iterator<T>>
		(first: ForwardIterator, last: ForwardIterator, compare: (x: T, y: T) => boolean = greater): ForwardIterator
	{
		let largest: ForwardIterator = first;
		first = first.next() as ForwardIterator;

		for (; !first.equals(last); first = first.next() as ForwardIterator)
			if (compare(first.value, largest.value))
				largest = first;

		return largest;
	}

	/**
	 * Return smallest and largest elements in range.
	 * 
	 * Returns a {@link Pair} with an iterator pointing to the element with the smallest value in the range 
	 * [<i>first</i>, <i>last</i>) as first element, and the largest as second.
	 * 
	 * The comparisons are performed using either {@link less} and {@link greater}.
	 * 
	 * If more than one equivalent element has the smallest value, the first iterator points to the first of such 
	 * elements.
	 * 
	 * If more than one equivalent element has the largest value, the second iterator points to the last of such 
	 * elements.
	 * 
	 * @param first {@link Iteartor Input iterator} to the initial final position of the sequence to compare.
	 * @param last {@link Iteartor Input iterator} to the final final position of the sequence to compare. The range used
	 *			   is [<i>first</i>, <i>last</i>), which contains all the elements between <i>first</i> and <i>last</i>,
	 *			   including the element pointed by <i>first</i> but not the element pointed by <i>last</i>.
	 * @param compare Binary function that accepts two elements in the range as arguments, and returns a value convertible
	 *				  to <code>bool</code>. The value returned indicates whether the element passed as first argument is
	 *				  considered less than the second. The function shall not modify any of its arguments.
	 * 
	 * @return A {@link Pair} with an iterator pointing to the element with the smallest value in the range 
	 *		   [<i>first</i>, <i>last</i>) as first element, and the largest as second.
	 */
	export function minmax_element<T, ForwardIterator extends Iterator<T>>
		(first: ForwardIterator, last: ForwardIterator): Pair<ForwardIterator, ForwardIterator>;

	/**
	 * Return smallest and largest elements in range.
	 * 
	 * Returns a {@link Pair} with an iterator pointing to the element with the smallest value in the range 
	 * [<i>first</i>, <i>last</i>) as first element, and the largest as second.
	 * 
	 * The comparisons are performed using either <i>compare</i>.
	 * 
	 * If more than one equivalent element has the smallest value, the first iterator points to the first of such 
	 * elements.
	 * 
	 * If more than one equivalent element has the largest value, the second iterator points to the last of such 
	 * elements.
	 * 
	 * @param first {@link Iteartor Input iterator} to the initial final position of the sequence to compare.
	 * @param last {@link Iteartor Input iterator} to the final final position of the sequence to compare. The range used
	 *			   is [<i>first</i>, <i>last</i>), which contains all the elements between <i>first</i> and <i>last</i>,
	 *			   including the element pointed by <i>first</i> but not the element pointed by <i>last</i>.
	 * @param compare Binary function that accepts two elements in the range as arguments, and returns a value convertible
	 *				  to <code>bool</code>. The value returned indicates whether the element passed as first argument is
	 *				  considered less than the second. The function shall not modify any of its arguments.
	 * 
	 * @return A {@link Pair} with an iterator pointing to the element with the smallest value in the range 
	 *		   [<i>first</i>, <i>last</i>) as first element, and the largest as second.
	 */
	export function minmax_element<T, ForwardIterator extends Iterator<T>>
		(
			first: ForwardIterator, last: ForwardIterator, compare: (x: T, y: T) => boolean
		): Pair<ForwardIterator, ForwardIterator>;

	export function minmax_element<T, ForwardIterator extends Iterator<T>>
		(
			first: ForwardIterator, last: ForwardIterator, compare: (x: T, y: T) => boolean = greater
		): Pair<ForwardIterator, ForwardIterator>
	{
		let smallest: ForwardIterator = first;
		let largest: ForwardIterator = first;

		first = first.next() as ForwardIterator;
		for (; !first.equals(last); first = first.next() as ForwardIterator)
		{
			if (compare(first.value, smallest.value)) // first is less than the smallest.
				smallest = first;
			if (!compare(first.value, largest.value)) // first is not less than the largest.
				largest = first;
		}

		return make_pair(smallest, largest);
	}

	/**
	 * Clamp a value between a pair of boundary.
	 * 
	 * @param v The value to clamp.
	 * @param lo Start of the boundaries to clamp *v* to.
	 * @param hi Terminal of the boundaries to clamp *v* to.
	 *
	 * @return *lo* if *v* is less than *lo*, *hi* if *hi* is less than *v*, otherwise *v*.
	 */
	export function clamp<T>(v: T, lo: T, hi: T): T;

	/**
	 * Clamp a value between a pair of boundary.
	 * 
	 * @param v The value to clamp.
	 * @param lo Start of the boundaries to clamp *v* to.
	 * @param hi Terminal of the boundaries to clamp *v* to.
	 * @param comp Binary function that accepts two elements as arguments (one of each of the two sequences, in the
	 *			   same order), and returns a value convertible to <code>bool</code>. The value returned indicates
	 *			   whether the elements are considered to match in the context of this function.
	 *
	 * @return *lo* if *v* is less than *lo*, *hi* if *hi* is less than *v*, otherwise *v*.
	 */
	export function clamp<T>(v: T, lo: T, hi: T, comp: (x: T, y: T) => boolean): T;

	export function clamp<T>(v: T, lo: T, hi: T, comp: (x: T, y: T) => boolean = less): T
	{
		let vec: Vector<T> = new Vector<T>([v, lo, hi]);
		sort(vec.begin(), vec.end(), comp);

		return vec.at(1);
	}

	/* ---------------------------------------------------------
		PERMUATATIONS
	--------------------------------------------------------- */
	/**
	 * Test whether range is permutation of another.
	 * 
	 * Compares the elements in the range [<i>first1</i>, <i>last1</i>) with those in the range beginning at 
	 * <i>first2</i>, and returns <code>true</code> if all of the elements in both ranges match, even in a different 
	 * order.
	 * 
	 * @param first1 An {@link Iterator} to the initial position of the first sequence.
	 * @param last1 An {@link Iterator} to the final position in a sequence. The range used is
	 *				[<i>first1</i>, <i>last1</i>), including the element pointed by <i>first1</i>, but not the element
	 *				pointed by <i>last1</i>.
	 * @param first2 An {@link Iterator} to the initial position of the second sequence. The comparison includes up to
	 *				 as many elements of this sequence as those in the range [<i>first1</i>, <i>last1</i>).
	 * 
	 * @return <code>true</code> if all the elements in the range [<i>first1</i>, <i>last1</i>) compare equal to those 
	 *		   of the range starting at <i>first2</i> in any order, and <code>false</code> otherwise.
	 */
	export function is_permutation
		<T, Iterator1 extends Iterator<T>, Iterator2 extends Iterator<T>>
		(first1: Iterator1, last1: Iterator1, first2: Iterator2): boolean;

	/**
	 * Test whether range is permutation of another.
	 * 
	 * Compares the elements in the range [<i>first1</i>, <i>last1</i>) with those in the range beginning at 
	 * <i>first2</i>, and returns <code>true</code> if all of the elements in both ranges match, even in a different 
	 * order.
	 * 
	 * @param first1 An {@link Iterator} to the initial position of the first sequence.
	 * @param last1 An {@link Iterator} to the final position in a sequence. The range used is
	 *				[<i>first1</i>, <i>last1</i>), including the element pointed by <i>first1</i>, but not the element
	 *				pointed by <i>last1</i>.
	 * @param first2 An {@link Iterator} to the initial position of the second sequence. The comparison includes up to
	 *				 as many elements of this sequence as those in the range [<i>first1</i>, <i>last1</i>).
	 * @param pred Binary function that accepts two elements as argument (one of each of the two sequences, in the same
	 *			   order), and returns a value convertible to <code>bool</code>. The value returned indicates whether
	 *			   the elements are considered to match in the context of this function.
	 * 
	 * @return <code>true</code> if all the elements in the range [<i>first1</i>, <i>last1</i>) compare equal to those 
	 *		   of the range starting at <i>first2</i> in any order, and <code>false</code> otherwise.
	 */
	export function is_permutation
		<T, Iterator1 extends Iterator<T>, Iterator2 extends Iterator<T>>
		(
			first1: Iterator1, last1: Iterator1, first2: Iterator2,
			pred: (x: T, y: T) => boolean
		): boolean;

	export function is_permutation
		<T, Iterator1 extends Iterator<T>, Iterator2 extends Iterator<T>>
		(
			first1: Iterator1, last1: Iterator1, first2: Iterator2,
			pred: (x: T, y: T) => boolean = equal_to
		): boolean
	{
		// find the mismatched
		let pair: Pair<Iterator1, Iterator2> = mismatch(first1, last1, first2);
		first1 = pair.first;
		first2 = pair.second;

		if (first1.equals(last1))
			return true;

		let last2: Iterator2 = first2.advance(distance(first1, last1)) as Iterator2;

		for (let it = first1; !it.equals(last1); it = it.next() as Iterator1)
			if (find(first1, it, it.value).equals(it))
			{
				let n: number = count(first2, last2, it.value);
				if (n == 0 || count(it, last1, it.value) != n)
					return false;
			}
		return true;
	}

	/**
	 * Transform range to previous permutation.
	 * 
	 * Rearranges the elements in the range [*first*, *last*) into the previous *lexicographically-ordered* permutation.
	 * 
	 * A *permutation* is each one of the N! possible arrangements the elements can take (where *N* is the number of 
	 * elements in the range). Different permutations can be ordered according to how they compare 
	 * {@link lexicographicaly lexicographical_compare} to each other; The first such-sorted possible permutation (the one 
	 * that would compare *lexicographically smaller* to all other permutations) is the one which has all its elements 
	 * sorted in ascending order, and the largest has all its elements sorted in descending order.
	 * 
	 * The comparisons of individual elements are performed using the {@link less less()} function.
	 * 
	 * If the function can determine the previous permutation, it rearranges the elements as such and returns true. If 
	 * that was not possible (because it is already at the lowest possible permutation), it rearranges the elements 
	 * according to the last permutation (sorted in descending order) and returns false.
	 * 
	 * @param first Bidirectional iterators to the initial positions of the sequence
	 * @param last Bidirectional iterators to the final positions of the sequence. The range used is [*first*, *last*), 
	 *			   which contains all the elements between *first* and *last*, including the element pointed by *first* 
	 *			   but not the element pointed by *last*.
	 * 
	 * @return true if the function could rearrange the object as a lexicographicaly smaller permutation. Otherwise, the 
	 *		   function returns false to indicate that the arrangement is not less than the previous, but the largest 
	 *		   possible (sorted in descending order).
	 */
	export function prev_permutation<T, BidirectionalIterator extends base.IArrayIterator<T>>
		(first: BidirectionalIterator, last: BidirectionalIterator): boolean;

	/**
	 * Transform range to previous permutation.
	 * 
	 * Rearranges the elements in the range [*first*, *last*) into the previous *lexicographically-ordered* permutation.
	 * 
	 * A *permutation* is each one of the N! possible arrangements the elements can take (where *N* is the number of 
	 * elements in the range). Different permutations can be ordered according to how they compare 
	 * {@link lexicographicaly lexicographical_compare} to each other; The first such-sorted possible permutation (the one 
	 * that would compare *lexicographically smaller* to all other permutations) is the one which has all its elements 
	 * sorted in ascending order, and the largest has all its elements sorted in descending order.
	 * 
	 * The comparisons of individual elements are performed using the *compare*.
	 * 
	 * If the function can determine the previous permutation, it rearranges the elements as such and returns true. If 
	 * that was not possible (because it is already at the lowest possible permutation), it rearranges the elements 
	 * according to the last permutation (sorted in descending order) and returns false.
	 * 
	 * @param first Bidirectional iterators to the initial positions of the sequence
	 * @param last Bidirectional iterators to the final positions of the sequence. The range used is [*first*, *last*), 
	 *			   which contains all the elements between *first* and *last*, including the element pointed by *first* 
	 *			   but not the element pointed by *last*.
	 * @param compare Binary function that accepts two arguments of the type pointed by BidirectionalIterator, and returns 
	 *				  a value convertible to bool. The value returned indicates whether the first argument is considered 
	 *				  to go before the second in the specific strict weak ordering it defines.
	 * 
	 * @return true if the function could rearrange the object as a lexicographicaly smaller permutation. Otherwise, the
	 *		   function returns false to indicate that the arrangement is not less than the previous, but the largest
	 *		   possible (sorted in descending order).
	 */
	export function prev_permutation<T, BidirectionalIterator extends base.IArrayIterator<T>>
		(first: BidirectionalIterator, last: BidirectionalIterator, compare: (x: T, y: T) => boolean): boolean;

	export function prev_permutation<T, BidirectionalIterator extends base.IArrayIterator<T>>
		(first: BidirectionalIterator, last: BidirectionalIterator, compare: (x: T, y: T) => boolean = less): boolean
	{
		if (first.equals(last) == true)
			return false;

		let i: BidirectionalIterator = last.prev() as BidirectionalIterator;
		if (first.equals(i) == true)
			return false;

		while (true)
		{
			let x: BidirectionalIterator = i;
			let y: BidirectionalIterator;

			i = i.prev() as BidirectionalIterator;
			if (compare(x.value, i.value) == true)
			{
				y = last.prev() as BidirectionalIterator;
				while (compare(y.value, i.value) == false)
					y = y.prev() as BidirectionalIterator;
				
				iter_swap(i, y);
				reverse(x, last);
				return true;
			}

			if (i.equals(first) == true)
			{
				reverse(first, last);
				return false;
			}
		}
	}

	/**
	 * Transform range to next permutation.
	 *
	 * Rearranges the elements in the range [*first*, *last*) into the next *lexicographically greater* permutation.
	 *
	 * A permutation is each one of the *N!* possible arrangements the elements can take (where *N* is the number of
	 * elements in the range). Different permutations can be ordered according to how they compare
	 * {@link lexicographicaly lexicographical_compare} to each other; The first such-sorted possible permutation (the one
	 * that would compare *lexicographically smaller* to all other permutations) is the one which has all its elements
	 * sorted in ascending order, and the largest has all its elements sorted in descending order.
	 *
	 * The comparisons of individual elements are performed using the {@link less} function.
	 *
	 * If the function can determine the next higher permutation, it rearranges the elements as such and returns true. If
	 * that was not possible (because it is already at the largest possible permutation), it rearranges the elements
	 * according to the first permutation (sorted in ascending order) and returns false.
	 * 
	 * @param first Bidirectional iterators to the initial positions of the sequence
	 * @param last Bidirectional iterators to the final positions of the sequence. The range used is [*first*, *last*),
	 *			   which contains all the elements between *first* and *last*, including the element pointed by *first*
	 *			   but not the element pointed by *last*.
	 * 
	 * @return true if the function could rearrange the object as a lexicographicaly greater permutation. Otherwise, the
	 *		   function returns false to indicate that the arrangement is not greater than the previous, but the lowest
	 *		   possible (sorted in ascending order).
	 */
	export function next_permutation<T, BidirectionalIterator extends base.IArrayIterator<T>>
		(first: BidirectionalIterator, last: BidirectionalIterator): boolean;

	/**
	 * Transform range to next permutation.
	 * 
	 * Rearranges the elements in the range [*first*, *last*) into the next *lexicographically greater* permutation.
	 * 
	 * A permutation is each one of the *N!* possible arrangements the elements can take (where *N* is the number of 
	 * elements in the range). Different permutations can be ordered according to how they compare 
	 * {@link lexicographicaly lexicographical_compare} to each other; The first such-sorted possible permutation (the one 
	 * that would compare *lexicographically smaller* to all other permutations) is the one which has all its elements 
	 * sorted in ascending order, and the largest has all its elements sorted in descending order.
	 * 
	 * The comparisons of individual elements are performed using the *compare*.
	 * 
	 * If the function can determine the next higher permutation, it rearranges the elements as such and returns true. If 
	 * that was not possible (because it is already at the largest possible permutation), it rearranges the elements 
	 * according to the first permutation (sorted in ascending order) and returns false.
	 * 
	 * @param first Bidirectional iterators to the initial positions of the sequence
	 * @param last Bidirectional iterators to the final positions of the sequence. The range used is [*first*, *last*),
	 *			   which contains all the elements between *first* and *last*, including the element pointed by *first*
	 *			   but not the element pointed by *last*.
	 * @param compare Binary function that accepts two arguments of the type pointed by BidirectionalIterator, and returns
	 *				  a value convertible to bool. The value returned indicates whether the first argument is considered
	 *				  to go before the second in the specific strict weak ordering it defines.
	 * 
	 * @return true if the function could rearrange the object as a lexicographicaly greater permutation. Otherwise, the 
	 *		   function returns false to indicate that the arrangement is not greater than the previous, but the lowest 
	 *		   possible (sorted in ascending order).
	 */
	export function next_permutation<T, BidirectionalIterator extends base.IArrayIterator<T>>
		(first: BidirectionalIterator, last: BidirectionalIterator, compare: (x: T, y: T) => boolean): boolean;

	export function next_permutation<T, BidirectionalIterator extends base.IArrayIterator<T>>
		(first: BidirectionalIterator, last: BidirectionalIterator, compare: (x: T, y: T) => boolean = less): boolean
	{
		if (first.equals(last) == true)
			return false;

		let i: BidirectionalIterator = last.prev() as BidirectionalIterator;
		if (first.equals(i) == true)
			return false;

		while (true)
		{
			let x: BidirectionalIterator = i;
			let y: BidirectionalIterator;

			i = i.prev() as BidirectionalIterator;
			if (compare(i.value, x.value) == true)
			{
				y = last.prev() as BidirectionalIterator;
				while (compare(i.value, y.value) == false)
					y = y.prev() as BidirectionalIterator;
				
				iter_swap(i, y);
				reverse(x, last);
				return true;
			}

			if (i.equals(first) == true)
			{
				reverse(first, last);
				return false;
			}
		}
	}
}