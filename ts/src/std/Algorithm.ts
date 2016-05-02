// Standard Template Library: Algorithms
// The header <algorithm> defines a collection of functions especially designed to be used on ranges of elements.
//
// A range is any sequence of objects that can be accessed through iterators or pointers, such as an array or an 
// instance of some of the STL containers. Notice though, that algorithms operate through iterators directly on the 
// values, not affecting in any way the structure of any possible container (it never affects the size or storage 
// allocation of the container).
//
// @reference http://www.cplusplus.com/reference/algorithm/
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
	 * <p> Apply function to range. </p>
	 *
	 * <p> Applies function <i>fn</i> to each of the elements in the range [<i>first</i>, <i>last</i>]. </p>
	 *
	 * @param first An {@link Iterator} to the initial position in a sequence.
	 * @param last An {@link Iterator} to the final position in a sequence. The range used is [<i>first</i>, <i>last<i>], 
	 *			  which contains all the elements between <i>first</i> and <i>last</i>, including the element pointed by 
	 *			  <i>first</i> but not the element pointed by <i>last</i>.
	 * @param fn Unary function that accepts an element in the range as argument. This can either be a function p
	 *			 ointer or a move constructible function object. Its return value, if any, is ignored.
	 *
	 * @return Returns <i>fn</i>.
	 */
	export function for_each<T, Iterator extends base.container.Iterator<T>, Func extends (val: T) => any>
		(first: Iterator, last: Iterator, fn: Func): Func
	{
		for (let it = first; !it.equals(last); it = it.next() as Iterator)
			fn(it.value);

		return fn;
	}

	/* ---------------------------------------------------------
		AGGREGATE CONDITIONS
	--------------------------------------------------------- */
	/**
	 * <p> Test condition on all elements in range. </p>
	 * 
	 * <p> Returns <code>true</code> if <i>pred</i> returns <code>true</code> for all the elements in the range 
	 * [<i>first</i>, <i>last</i>] or if the range is {@link IContainer.empty empty}, and <code>false</code> otherwise.
	 * </p>
	 * 
	 * @param first An {@link Iterator} to the initial position in a sequence.
	 * @param last An {@link Iterator} to the final position in a sequence. The range used is [<i>first</i>, <i>last<i>],
	 *			  which contains all the elements between <i>first</i> and <i>last</i>, including the element pointed by
	 *			  <i>first</i> but not the element pointed by <i>last</i>.
	 * @param pred Unary function that accepts an element in the range as argument and returns a value convertible to
	 *			   <code>boolean</code>. The value returned indicates whether the element fulfills the condition 
	 *			   checked by this function. The function shall not modify its argument. This can either be a function 
	 *			   pointer or a function object.
	 *
	 * @return <code>true</code> if pred returns true for all the elements in the range or if the range is 
	 *		   {@link IContainer.empty empty}, and <code>false</code> otherwise.
	 */
	export function all_of<T, Iterator extends base.container.Iterator<T>>
		(first: Iterator, last: Iterator, pred: (val: T) => boolean): boolean
	{
		for (let it = first; !it.equals(last); it = it.next() as Iterator)
			if (pred(it.value) == false)
				return false;

		return true;
	}

	/**
	 * <p> Test if any element in range fulfills condition. </p>
	 * 
	 * <p> Returns <code>true</code> if <i>pred</i> returns true for any of the elements in the range 
	 * [<i>first</i>, <i>last<i>], and <code>false</code> otherwise. </p>
	 * 
	 * <p> If [<i>first</i>, <i>last</i>] is an {@link IContainer.empty empty} range, the function returns 
	 * <code>false</code>. </p>
	 * 
	 * @param first An {@link Iterator} to the initial position in a sequence.
	 * @param last An {@link Iterator} to the final position in a sequence. The range used is [<i>first</i>, <i>last<i>],
	 *			  which contains all the elements between <i>first</i> and <i>last</i>, including the element pointed by
	 *			  <i>first</i> but not the element pointed by <i>last</i>.
	 * @param pred Unary function that accepts an element in the range as argument and returns a value convertible to
	 *			   <code>boolean</code>. The value returned indicates whether the element fulfills the condition
	 *			   checked by this function. The function shall not modify its argument. This can either be a function
	 *			   pointer or a function object.
	 *
	 * @return <code>true</code> if <i>pred</i> returns <code>true</code> for any of the elements in the range 
	 *		   [<i>first</i>, <i>last<i>], and <code>false</code> otherwise. If [<i>first</i>, <i>last</i>] is an 
	 *		   {@link IContainer.empty empty} range, the function returns <code>false</code>.
	 */
	export function any_of<T, Iterator extends base.container.Iterator<T>>
		(first: Iterator, last: Iterator, pred: (val: T) => boolean): boolean
	{
		for (let it = first; !it.equals(last); it = it.next() as Iterator)
			if (pred(it.value) == true)
				return true;

		return false;
	}

	/**
	 * <p> Test if no elements fulfill condition. </p>
	 * 
	 * <p> Returns <code>true</code> if <i>pred</i> returns false for all the elements in the range 
	 * [<i>first</i>, <i>last</i>] or if the range is {@link IContainer.empty empty}, and <code>false</code> otherwise. 
	 * </p>
	 * 
	 * @param first An {@link Iterator} to the initial position in a sequence.
	 * @param last An {@link Iterator} to the final position in a sequence. The range used is [<i>first</i>, <i>last<i>],
	 *			  which contains all the elements between <i>first</i> and <i>last</i>, including the element pointed by
	 *			  <i>first</i> but not the element pointed by <i>last</i>.
	 * @param pred Unary function that accepts an element in the range as argument and returns a value convertible to
	 *			   <code>boolean</code>. The value returned indicates whether the element fulfills the condition
	 *			   checked by this function. The function shall not modify its argument. This can either be a function
	 *			   pointer or a function object.
	 *
	 * @return <code>true</code> if <i>pred</i> returns <code>false</code> for all the elements in the range 
	 *		   [<i>first</i>, <i>last<i>] or if the range is {@link IContainer.empty empty}, and <code>false</code> 
	 *		   otherwise.
	 */
	export function none_of<T, Iterator extends base.container.Iterator<T>>
		(first: Iterator, last: Iterator, pred: (val: T) => boolean): boolean
	{
		return !any_of(first, last, pred);
	}

	/**
	 * <p> Test whether the elements in two ranges are equal. </p>
	 * 
	 * <p> Compares the elements in the range [<i>first1</i>, <i>last1</i>] with those in the range beginning at 
	 * <i>first2</i>, and returns <code>true</code> if all of the elements in both ranges match. </p>
	 * 
	 * @param first1 An {@link Iterator} to the initial position of the first sequence.
	 * @param last1 An {@link Iterator} to the final position in a sequence. The range used is
	 *				[<i>first1</i>, <i>last1</i>], including the element pointed by <i>first1</i>, but not the element
	 *				pointed by <i>last1</i>.
	 * @param first2 An {@link Iterator} to the initial position of the second sequence. The comparison includes up to 
	 *				 as many elements of this sequence as those in the range [<i>first1</i>, <i>last1</i>].
	 * 
	 * @return <code>true</code> if all the elements in the range [<i>first1</i>, <i>last1</i>] compare equal to those 
	 *		   of the range starting at <i>first2</i>, and <code>false</code> otherwise.
	 */
	export function equal<T, Iterator1 extends base.container.Iterator<T>>
		(first1: Iterator1, last1: Iterator1, first2: base.container.Iterator<T>): boolean;

	/**
	 * <p> Test whether the elements in two ranges are equal. </p>
	 * 
	 * <p> Compares the elements in the range [<i>first1</i>, <i>last1</i>] with those in the range beginning at 
	 * <i>first2</i>, and returns <code>true</code> if all of the elements in both ranges match. </p>
	 * 
	 * @param first1 An {@link Iterator} to the initial position of the first sequence.
	 * @param last1 An {@link Iterator} to the final position in a sequence. The range used is
	 *				[<i>first1</i>, <i>last1</i>], including the element pointed by <i>first1</i>, but not the element
	 *				pointed by <i>last1</i>.
	 * @param first2 An {@link Iterator} to the initial position of the second sequence. The comparison includes up to 
	 *				 as many elements of this sequence as those in the range [<i>first1</i>, <i>last1</i>].
	 * @param pred Binary function that accepts two elements as argument (one of each of the two sequences, in the same 
	 *			   order), and returns a value convertible to <code>bool</code>. The value returned indicates whether 
	 *			   the elements are considered to match in the context of this function.
	 * 
	 * @return <code>true</code> if all the elements in the range [<i>first1</i>, <i>last1</i>] compare equal to those
	 *		   of the range starting at <i>first2</i>, and <code>false</code> otherwise.
	 */
	export function equal<T, Iterator1 extends base.container.Iterator<T>>
		(
			first1: Iterator1, last1: Iterator1, first2: base.container.Iterator<T>,
			pred: (x: T, y: T) => boolean
		): boolean;

	export function equal<T, Iterator1 extends base.container.Iterator<T>>
		(
			first1: Iterator1, last1: Iterator1, first2: base.container.Iterator<T>,
			pred: (x: T, y: T) => boolean = std.equals
		): boolean
	{
		while (!first1.equals(last1))
			if (first2.equals(first2.get_source().end()) || !pred(first1.value, first2.value))
				return false;
			else
			{
				first1 = first1.next() as Iterator1;
				first2 = first2.next();
			}
		return true;
	}

	/**
	 * <p> Test whether range is permutation of another. </p>
	 * 
	 * <p> Compares the elements in the range [<i>first1</i>, <i>last1</i>] with those in the range beginning at 
	 * <i>first2</i>, and returns <code>true</code> if all of the elements in both ranges match, even in a different 
	 * order. </p>
	 * 
	 * @param first1 An {@link Iterator} to the initial position of the first sequence.
	 * @param last1 An {@link Iterator} to the final position in a sequence. The range used is
	 *				[<i>first1</i>, <i>last1</i>], including the element pointed by <i>first1</i>, but not the element
	 *				pointed by <i>last1</i>.
	 * @param first2 An {@link Iterator} to the initial position of the second sequence. The comparison includes up to
	 *				 as many elements of this sequence as those in the range [<i>first1</i>, <i>last1</i>].
	 * 
	 * @return <code>true</code> if all the elements in the range [<i>first1</i>, <i>last1</i>] compare equal to those 
	 *		   of the range starting at <i>first2</i> in any order, and <code>false</code> otherwise.
	 */
	export function is_permutation
		<T, Iterator1 extends base.container.Iterator<T>, Iterator2 extends base.container.Iterator<T>>
		(first1: Iterator1, last1: Iterator1, first2: Iterator2): boolean;

	/**
	 * <p> Test whether range is permutation of another. </p>
	 * 
	 * <p> Compares the elements in the range [<i>first1</i>, <i>last1</i>] with those in the range beginning at 
	 * <i>first2</i>, and returns <code>true</code> if all of the elements in both ranges match, even in a different 
	 * order. </p>
	 * 
	 * @param first1 An {@link Iterator} to the initial position of the first sequence.
	 * @param last1 An {@link Iterator} to the final position in a sequence. The range used is
	 *				[<i>first1</i>, <i>last1</i>], including the element pointed by <i>first1</i>, but not the element
	 *				pointed by <i>last1</i>.
	 * @param first2 An {@link Iterator} to the initial position of the second sequence. The comparison includes up to
	 *				 as many elements of this sequence as those in the range [<i>first1</i>, <i>last1</i>].
	 * @param pred Binary function that accepts two elements as argument (one of each of the two sequences, in the same
	 *			   order), and returns a value convertible to <code>bool</code>. The value returned indicates whether
	 *			   the elements are considered to match in the context of this function.
	 * 
	 * @return <code>true</code> if all the elements in the range [<i>first1</i>, <i>last1</i>] compare equal to those 
	 *		   of the range starting at <i>first2</i> in any order, and <code>false</code> otherwise.
	 */
	export function is_permutation
		<T, Iterator1 extends base.container.Iterator<T>, Iterator2 extends base.container.Iterator<T>>
		(
			first1: Iterator1, last1: Iterator1, first2: Iterator2,
			pred: (x: T, y: T) => boolean
		): boolean;

	export function is_permutation
		<T, Iterator1 extends base.container.Iterator<T>, Iterator2 extends base.container.Iterator<T>>
		(
			first1: Iterator1, last1: Iterator1, first2: Iterator2,
			pred: (x: T, y: T) => boolean = std.equals
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
	 * <p> Lexicographical less-than comparison. </p>
	 * 
	 * <p> Returns <code>true</code> if the range [<i>first1</i>, <i>last1</i>] compares <i>lexicographically less</i> 
	 * than the range [<i>first2</i>, <i>last2</i>]. </p>
	 *
	 * <p> A <i>lexicographical comparison</i> is the kind of comparison generally used to sort words alphabetically in 
	 * dictionaries; It involves comparing sequentially the elements that have the same position in both ranges against 
	 * each other until one element is not equivalent to the other. The result of comparing these first non-matching 
	 * elements is the result of the lexicographical comparison. </p>
	 * 
	 * <p> If both sequences compare equal until one of them ends, the shorter sequence is <i>lexicographically less</i> 
	 * than the longer one. </p>
	 * 
	 * @param first1 An {@link Iterator} to the initial position of the first sequence.
	 * @param last1 An {@link Iterator} to the final position in a sequence. The range used is 
	 *				[<i>first1</i>, <i>last1</i>], including the element pointed by <i>first1</i>, but not the element
	 *				pointed by <i>last1</i>.
	 * @param first2 An {@link Iterator} to the initial position of the second sequence.
	 * @param last2 An {@link Iterator} to the final position of the second sequence. The ranged used is 
	 *				[<i>first2</i>, <i>last2</i>].
	 * 
	 * @return <code>true</code> if the first range compares <i>lexicographically less</i> than than the second. 
	 *		   <code>false</code> otherwise (including when all the elements of both ranges are equivalent).
	 */
	export function lexicographical_compare
		<T, T1 extends T, T2 extends T, 
			Iterator1 extends base.container.Iterator<T1>, Iterator2 extends base.container.Iterator<T2>>
		(first1: Iterator1, last1: Iterator1, first2: Iterator2, last2: Iterator2): boolean;

	/**
	 * <p> Lexicographical comparison. </p>
	 * 
	 * <p> Returns <code>true</code> if the range [<i>first1</i>, <i>last1</i>] compares <i>lexicographically 
	 * relationship</i> than the range [<i>first2</i>, <i>last2</i>]. </p>
	 *
	 * <p> A <i>lexicographical comparison</i> is the kind of comparison generally used to sort words alphabetically in 
	 * dictionaries; It involves comparing sequentially the elements that have the same position in both ranges against 
	 * each other until one element is not equivalent to the other. The result of comparing these first non-matching 
	 * elements is the result of the lexicographical comparison. </p>
	 * 
	 * <p> If both sequences compare equal until one of them ends, the shorter sequence is <i>lexicographically 
	 * relationship</i> than the longer one. </p>
	 * 
	 * @param first1 An {@link Iterator} to the initial position of the first sequence.
	 * @param last1 An {@link Iterator} to the final position in a sequence. The range used is 
	 *				[<i>first1</i>, <i>last1</i>], including the element pointed by <i>first1</i>, but not the element
	 *				pointed by <i>last1</i>.
	 * @param first2 An {@link Iterator} to the initial position of the second sequence.
	 * @param last2 An {@link Iterator} to the final position of the second sequence. The ranged used is 
	 *				[<i>first2</i>, <i>last2</i>].
	 * @param compare Binary function that accepts two arguments of the types pointed by the iterators, and returns a 
	 *		  value convertible to <code>bool</code>. The value returned indicates whether the first argument is 
	 *		  considered to go before the second in the specific <i>strict weak ordering</i> it defines.
	 * 
	 * @return <code>true</code> if the first range compares <i>lexicographically relationship</i> than than the 
	 *		   second. <code>false</code> otherwise (including when all the elements of both ranges are equivalent).
	 */
	export function lexicographical_compare
		<T, T1 extends T, T2 extends T, 
			Iterator1 extends base.container.Iterator<T1>, Iterator2 extends base.container.Iterator<T2>>
		(
			first1: Iterator1, last1: Iterator1, first2: Iterator2, last2: Iterator2, 
			compare: (x: T, y: T) => boolean
		) : boolean;
	
	export function lexicographical_compare
		<T, T1 extends T, T2 extends T,
			Iterator1 extends base.container.Iterator<T1>, Iterator2 extends base.container.Iterator<T2>>
		(
			first1: Iterator1, last1: Iterator1, first2: Iterator2, last2: Iterator2,
			compare: (x: T, y: T) => boolean = std.less
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

		return !std.equals(last2, last2.get_source().end()) && !std.equals(first2.value, last2.value);
	}

	/* ---------------------------------------------------------
		FINDERS
	--------------------------------------------------------- */
	/**
	 * <p> Find value in range. </p>
	 * 
	 * <p> Returns an iterator to the first element in the range [<i>first</i>, <i>last</i>) that compares equal to 
	 * <i>val</i>. If no such element is found, the function returns <i>last</i>. </p>
	 * 
	 * <p> The function uses {@link std.equals equals} to compare the individual elements to <i>val</i>. </p>
	 * 
	 * @param first An {@link Iterator} to the initial position in a sequence.
	 * @param last An {@link Iterator} to the final position in a sequence. The range used is [<i>first</i>, <i>last<i>],
	 *			  which contains all the elements between <i>first</i> and <i>last</i>, including the element pointed by
	 *			  <i>first</i> but not the element pointed by <i>last</i>.
	 * @param val Value to search for in the range.
	 * 
	 * @return An {@link Iterator} to the first element in the range that compares equal to <i>val</i>. If no elements 
	 *		   match, the function returns <i>last</i>.
	 */
	export function find<T, Iterator extends base.container.Iterator<T>>
		(first: Iterator, last: Iterator, val: T): Iterator
	{
		for (let it = first; !it.equals(last); it = it.next() as Iterator)
			if (std.equals(it.value, val))
				return it;

		return last;
	}

	/**
	 * <p> Find element in range. </p>
	 * 
	 * <p> Returns an iterator to the first element in the range [<i>first</i>, <i>last</i>] for which pred returns 
	 * <code>true</code>. If no such element is found, the function returns <i>last</i>. </p>
	 * 
	 * @param first An {@link Iterator} to the initial position in a sequence.
	 * @param last An {@link Iterator} to the final position in a sequence. The range used is [<i>first</i>, <i>last<i>],
	 *			  which contains all the elements between <i>first</i> and <i>last</i>, including the element pointed by
	 *			  <i>first</i> but not the element pointed by <i>last</i>.
	 * @param pred Unary function that accepts an element in the range as argument and returns a value convertible 
	 *			   to <code>bool</code>. The value returned indicates whether the element is considered a match in 
	 *			   the context of this function. The function shall not modify its argument. This can either be a 
	 *			   function pointer or a function object.
	 * 
	 * @return An {@link Iterator} to the first element in the range for which <i>pred</i> does not return 
	 *		   <code>false</code>. If <i>pred</i> is <code>false</code> for all elements, the function returns 
	 *		   <i>last</i>.
	 */
	export function find_if<T, Iterator extends base.container.Iterator<T>>
		(first: Iterator, last: Iterator, pred: (val: T) => boolean): Iterator
	{
		for (let it = first; !it.equals(last); it = it.next() as Iterator)
			if (pred(it.value))
				return it;

		return last;
	}

	/**
	 * <p> Find element in range. </p>
	 * 
	 * <p> Returns an iterator to the first element in the range [<i>first</i>, <i>last</i>] for which pred returns 
	 * <code>true</code>. If no such element is found, the function returns <i>last</i>. </p>
	 * 
	 * @param first An {@link Iterator} to the initial position in a sequence.
	 * @param last An {@link Iterator} to the final position in a sequence. The range used is [<i>first</i>, <i>last<i>],
	 *			  which contains all the elements between <i>first</i> and <i>last</i>, including the element pointed by
	 *			  <i>first</i> but not the element pointed by <i>last</i>.
	 * @param pred Unary function that accepts an element in the range as argument and returns a value convertible 
	 *			   to <code>bool</code>. The value returned indicates whether the element is considered a match in 
	 *			   the context of this function. The function shall not modify its argument. This can either be a 
	 *			   function pointer or a function object.
	 * 
	 * @return An {@link Iterator} to the first element in the range for which <i>pred</i> returns <code>false</code>.
	 *		   If <i>pred</i> is <code>true</code> for all elements, the function returns <i>last</i>.
	 */
	export function find_if_not<T, Iterator extends base.container.Iterator<T>>
		(first: Iterator, last: Iterator, pred: (val: T) => boolean): Iterator
	{
		for (let it = first; !it.equals(last); it = it.next() as Iterator)
			if (pred(it.value) == false)
				return it;

		return last;
	}

	/**
	 * <p> Find last subsequence in range. </p>
	 * 
	 * <p> Searches the range [<i>first1</i>, <i>last1</i>] for the last occurrence of the sequence defined by 
	 * [<i>first2</i>, <i>last2</i>], and returns an {@link Iterator} to its first element, or <i>last1,/i> if no 
	 * occurrences are found. </p>
	 * 
	 * <p> The elements in both ranges are compared sequentially using {@link equals}: A subsequence of 
	 * [<i>first1</i>, <i>last1</i>] is considered a match only when this is <code>true</code> for all the elements of 
	 * [<i>first2</i>, <i>last2</i>]. </p>
	 * 
	 * <p> This function returns the last of such occurrences. For an algorithm that returns the first instead, see 
	 * {@link search}. </p>
	 * 
	 * @param first1 An {@link Iterator} to the initial position of the first sequence.
	 * @param last1 An {@link Iterator} to the final position in a sequence. The range used is
	 *				[<i>first1</i>, <i>last1</i>], including the element pointed by <i>first1</i>, but not the element
	 *				pointed by <i>last1</i>.
	 * @param first2 An {@link Iterator} to the initial position of the element values to be searched for.
	 * @param last2 An {@link Iterator} to the final position of the element values to be searched for. The range used
	 *				is [<i>first2</i>, <i>last2</i>].
	 * @param pred Binary function that accepts two elements as arguments (one of each of the two sequences, in the
	 *			   same order), and returns a value convertible to <code>bool</code>. The value returned indicates
	 *			   whether the elements are considered to match in the context of this function.
	 * 
	 * @return An {@link Iterator} to the first element of the last occurrence of [<i>first2</i>, <i>last2</i>] in 
	 *		   [<i>first1</i>, <i>last1</i>]. If the sequence is not found, the function returns ,i>last1</i>. Otherwise 
	 *		   [<i>first2</i>, <i>last2</i>] is an empty range, the function returns <i>last1</i>.
	 */
	export function find_end
		<T, Iterator1 extends base.container.Iterator<T>, Iterator2 extends base.container.Iterator<T>>
		(first1: Iterator1, last1: Iterator1, first2: Iterator2, last2: Iterator2): Iterator1;
	
	/**
	 * <p> Find last subsequence in range. </p>
	 * 
	 * <p> Searches the range [<i>first1</i>, <i>last1</i>] for the last occurrence of the sequence defined by 
	 * [<i>first2</i>, <i>last2</i>], and returns an {@link Iterator} to its first element, or <i>last1,/i> if no 
	 * occurrences are found. </p>
	 * 
	 * <p> The elements in both ranges are compared sequentially using <i>pred</i>: A subsequence of 
	 * [<i>first1</i>, <i>last1</i>] is considered a match only when this is <code>true</code> for all the elements of 
	 * [<i>first2</i>, <i>last2</i>]. </p>
	 * 
	 * <p> This function returns the last of such occurrences. For an algorithm that returns the first instead, see 
	 * {@link search}. </p>
	 * 
	 * @param first1 An {@link Iterator} to the initial position of the first sequence.
	 * @param last1 An {@link Iterator} to the final position in a sequence. The range used is
	 *				[<i>first1</i>, <i>last1</i>], including the element pointed by <i>first1</i>, but not the element
	 *				pointed by <i>last1</i>.
	 * @param first2 An {@link Iterator} to the initial position of the element values to be searched for.
	 * @param last2 An {@link Iterator} to the final position of the element values to be searched for. The range used
	 *				is [<i>first2</i>, <i>last2</i>].
	 * @param pred Binary function that accepts two elements as arguments (one of each of the two sequences, in the
	 *			   same order), and returns a value convertible to <code>bool</code>. The value returned indicates
	 *			   whether the elements are considered to match in the context of this function.
	 * 
	 * @return An {@link Iterator} to the first element of the last occurrence of [<i>first2</i>, <i>last2</i>] in 
	 *		   [<i>first1</i>, <i>last1</i>]. If the sequence is not found, the function returns ,i>last1</i>. Otherwise 
	 *		   [<i>first2</i>, <i>last2</i>] is an empty range, the function returns <i>last1</i>.
	 */
	export function find_end
		<T, Iterator1 extends base.container.Iterator<T>, Iterator2 extends base.container.Iterator<T>>
		(
			first1: Iterator1, last1: Iterator1, first2: Iterator2, last2: Iterator2, 
			pred: (x: T, y: T) => boolean
		): Iterator1;

	export function find_end
		<T, Iterator1 extends base.container.Iterator<T>, Iterator2 extends base.container.Iterator<T>>
		(
			first1: Iterator1, last1: Iterator1, first2: Iterator2, last2: Iterator2, 
			compare: (x: T, y: T) => boolean = std.equals
		): Iterator1
	{
		if (first2.equals(last2))
			return last1;

		let ret: Iterator1 = last1;

		for (; !first1.equals(last1); first1 = first1.next() as Iterator1)
		{
			let it1: Iterator1 = first1;
			let it2: Iterator2 = first2;

			while (std.equals(it1.value, it2.value))
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
	 * <p> Find element from set in range. </p>
	 * 
	 * <p> Returns an iterator to the first element in the range [<i>first1</i>, <i>last1</i>] that matches any of the 
	 * elements in [<i>first2</i>, <i>last2</i>]. If no such element is found, the function returns <i>last1</i>. </p>
	 * 
	 * <p> The elements in [<i>first1</i>, <i>last1</i>] are sequentially compared to each of the values in 
	 * [<i>first2</i>, <i>last2</i>] using {@link std.equals}, until a pair matches. </p>
	 * 
	 * @param first1 An {@link Iterator} to the initial position of the first sequence.
	 * @param last1 An {@link Iterator} to the final position in a sequence. The range used is
	 *				[<i>first1</i>, <i>last1</i>], including the element pointed by <i>first1</i>, but not the element
	 *				pointed by <i>last1</i>.
	 * @param first2 An {@link Iterator} to the initial position of the element values to be searched for.
	 * @param last2 An {@link Iterator} to the final position of the element values to be searched for. The range used
	 *				is [<i>first2</i>, <i>last2</i>].
	 * 
	 * @return An {@link Iterator} to the first element in [<i>first1</i>, <i>last1</i>] that is part of 
	 *		   [<i>first2</i>, <i>last2</i>]. If no matches are found, the function returns <i>last1</i>.
	 */
	export function find_first_of
		<T, Iterator1 extends base.container.Iterator<T>, Iterator2 extends base.container.Iterator<T>>
		(first1: Iterator1, last1: Iterator1, first2: Iterator2, last2: Iterator2): Iterator1;

	/**
	 * <p> Find element from set in range. </p>
	 * 
	 * <p> Returns an iterator to the first element in the range [<i>first1</i>, <i>last1</i>] that matches any of the 
	 * elements in [<i>first2</i>, <i>last2</i>]. If no such element is found, the function returns <i>last1</i>. </p>
	 * 
	 * <p> The elements in [<i>first1</i>, <i>last1</i>] are sequentially compared to each of the values in 
	 * [<i>first2</i>, <i>last2</i>] using <i>pred</i>, until a pair matches. </p>
	 * 
	 * @param first1 An {@link Iterator} to the initial position of the first sequence.
	 * @param last1 An {@link Iterator} to the final position in a sequence. The range used is
	 *				[<i>first1</i>, <i>last1</i>], including the element pointed by <i>first1</i>, but not the element
	 *				pointed by <i>last1</i>.
	 * @param first2 An {@link Iterator} to the initial position of the element values to be searched for.
	 * @param last2 An {@link Iterator} to the final position of the element values to be searched for. The range used
	 *				is [<i>first2</i>, <i>last2</i>].
	 * @param pred Binary function that accepts two elements as arguments (one of each of the two sequences, in the 
	 *			   same order), and returns a value convertible to <code>bool</code>. The value returned indicates 
	 *			   whether the elements are considered to match in the context of this function.
	 * 
	 * @return An {@link Iterator} to the first element in [<i>first1</i>, <i>last1</i>] that is part of 
	 *		   [<i>first2</i>, <i>last2</i>]. If no matches are found, the function returns <i>last1</i>.
	 */
	export function find_first_of
		<T, Iterator1 extends base.container.Iterator<T>, Iterator2 extends base.container.Iterator<T>>
		(
			first1: Iterator1, last1: Iterator1, first2: Iterator2, last2: Iterator2,
			pred: (x: T, y: T) => boolean
		): Iterator1;

	export function find_first_of
		<T, Iterator1 extends base.container.Iterator<T>, Iterator2 extends base.container.Iterator<T>>
		(
			first1: Iterator1, last1: Iterator1, first2: Iterator2, last2: Iterator2,
			pred: (x: T, y: T) => boolean = std.equals
		): Iterator1
	{
		for (; !first1.equals(last1); first1 = first1.next() as Iterator1)
			for (let it = first2; !it.equals(last2); it = it.next() as Iterator2)
				if (pred(it.value, first1.value))
					return first1;

		return last1;
	}

	/**
	 * <p> Find equal adjacent elements in range. </p>
	 * 
	 * <p> Searches the range [<i>first</i>, <i>last</i>] for the first occurrence of two consecutive elements that match, 
	 * and returns an {@link Iterator} to the first of these two elements, or <i>last</i> if no such pair is found. </p>
	 * 
	 * <p> Two elements match if they compare equal using {@link std.equals}. </p>
	 * 
	 * @param first An {@link Iterator} to the initial position in a sequence.
	 * @param last An {@link Iterator} to the final position in a sequence. The range used is [<i>first</i>, <i>last<i>],
	 *			  which contains all the elements between <i>first</i> and <i>last</i>, including the element pointed by
	 *			  <i>first</i> but not the element pointed by <i>last</i>.
	 * 
	 * @return An {@link Iterator} to the first element of the first pair of matching consecutive elements in the range 
	 *		   [<i>first</i>, <i>last</i>]. If no such pair is found, the function returns <i>last</i>.
	 */
	export function adjacent_find<T, Iterator extends base.container.Iterator<T>>
		(first: Iterator, last: Iterator): Iterator;

	/**
	 * <p> Find equal adjacent elements in range. </p>
	 * 
	 * <p> Searches the range [<i>first</i>, <i>last</i>] for the first occurrence of two consecutive elements that match, 
	 * and returns an {@link Iterator} to the first of these two elements, or <i>last</i> if no such pair is found. </p>
	 * 
	 * <p> Two elements match if they compare equal using <i>pred</i>. </p>
	 * 
	 * @param first An {@link Iterator} to the initial position in a sequence.
	 * @param last An {@link Iterator} to the final position in a sequence. The range used is [<i>first</i>, <i>last<i>],
	 *			  which contains all the elements between <i>first</i> and <i>last</i>, including the element pointed by
	 *			  <i>first</i> but not the element pointed by <i>last</i>.
	 * @param pred Unary function that accepts an element in the range as argument and returns a value convertible to 
	 *			   <code>bool</code>. The value returned indicates whether the element is considered a match in the 
	 *			   context of this function. The function shall not modify its argument. This can either be a function 
	 *			   pointer or a function object.
	 * 
	 * @return An {@link Iterator} to the first element of the first pair of matching consecutive elements in the range 
	 *		   [<i>first</i>, <i>last</i>]. If no such pair is found, the function returns <i>last</i>.
	 */
	export function adjacent_find<T, Iterator extends base.container.Iterator<T>>
		(first: Iterator, last: Iterator, pred: (x: T, y: T) => boolean): Iterator;

	export function adjacent_find<T, Iterator extends base.container.Iterator<T>>
		(first: Iterator, last: Iterator, pred: (x: T, y: T) => boolean = std.equals): Iterator
	{
		if (!first.equals(last))
		{
			let next: Iterator = first.next() as Iterator;

			while (!next.equals(last))
			{
				if (std.equals(first.value, last.value))
					return first;

				first = first.next() as Iterator;
				next = next.next() as Iterator;
			}
		}
		return last;
	}

	/**
	 * <p> Return first position where two ranges differ. </p>
	 * 
	 * <p> Compares the elements in the range [<i>first1</i>, <i>last1</i>] with those in the range beginning at 
	 * <i>first2</i>, and returns the first element of both sequences that does not match. </p>
	 *
	 * <p> The function returns a {@link Pair} of {@link iterators Iterator} to the first element in each range that 
	 * does not match. </p>
	 * 
	 * @param first1 An {@link Iterator} to the initial position of the first sequence.
	 * @param last1 An {@link Iterator} to the final position in a sequence. The range used is
	 *				[<i>first1</i>, <i>last1</i>], including the element pointed by <i>first1</i>, but not the element
	 *				pointed by <i>last1</i>.
	 * @param first2 An {@link Iterator} to the initial position of the second sequence. The comparison includes up to 
	 *				 as many elements of this sequence as those in the range [<i>first1</i>, <i>last1</i>].
	 * 
	 * @return A {@link Pair}, where its members {@link Pair.first first} and {@link Pair.second second} point to the 
	 *		   first element in both sequences that did not compare equal to each other. If the elements compared in 
	 *		   both sequences have all matched, the function returns a {@link Pair} with {@link Pair.first first} set 
	 *		   to <i>last1</i> and {@link Pair.second second} set to the element in that same relative position in the 
	 *		   second sequence. If none matched, it returns {@link make_pair}(<i>first1</i>, <i>first2</i>).
	 */
	export function mismatch
		<T, Iterator1 extends base.container.Iterator<T>, Iterator2 extends base.container.Iterator<T>>
		(first1: Iterator1, last1: Iterator1, first2: Iterator2): Pair<Iterator1, Iterator2>;

	/**
	 * <p> Return first position where two ranges differ. </p>
	 * 
	 * <p> Compares the elements in the range [<i>first1</i>, <i>last1</i>] with those in the range beginning at 
	 * <i>first2</i>, and returns the first element of both sequences that does not match. </p>
	 *
	 * <p> The function returns a {@link Pair} of {@link iterators Iterator} to the first element in each range that 
	 * does not match. </p>
	 * 
	 * @param first1 An {@link Iterator} to the initial position of the first sequence.
	 * @param last1 An {@link Iterator} to the final position in a sequence. The range used is
	 *				[<i>first1</i>, <i>last1</i>], including the element pointed by <i>first1</i>, but not the element
	 *				pointed by <i>last1</i>.
	 * @param first2 An {@link Iterator} to the initial position of the second sequence. The comparison includes up to 
	 *				 as many elements of this sequence as those in the range [<i>first1</i>, <i>last1</i>].
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
		<T, Iterator1 extends base.container.Iterator<T>, Iterator2 extends base.container.Iterator<T>>
		(
			first1: Iterator1, last1: Iterator1, first2: Iterator2,
			compare: (x: T, y: T) => boolean
		): Pair<Iterator1, Iterator2>;

	export function mismatch
		<T, Iterator1 extends base.container.Iterator<T>, Iterator2 extends base.container.Iterator<T>>
		(
			first1: Iterator1, last1: Iterator1, first2: Iterator2,
			compare: (x: T, y: T) => boolean = std.equals
		): Pair<Iterator1, Iterator2>
	{
		while (!first1.equals(last1) && !first2.equals(first2.get_source().end())
			&& std.equals(first1.value, first2.value))
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
	 * <p> Count appearances of value in range. </p>
	 * 
	 * <p> Returns the number of elements in the range [<i>first</i>, <i>last</i>] that compare equal to <i>val</i>. </p>
	 * 
	 * <p> The function uses {@link equals} to compare the individual elements to <i>val</i>. </p>
	 * 
	 * @param first An {@link Iterator} to the initial position in a sequence.
	 * @param last An {@link Iterator} to the final position in a sequence. The range used is [<i>first</i>, <i>last<i>],
	 *			  which contains all the elements between <i>first</i> and <i>last</i>, including the element pointed by
	 *			  <i>first</i> but not the element pointed by <i>last</i>.
	 * @param val Value to match.
	 *
	 * @return The number of elements in the range [<i>first</i>, <i>last</i>] that compare equal to <i>val</i>.
	 */
	export function count<T, Iterator extends base.container.Iterator<T>>
		(first: Iterator, last: Iterator, val: T): number
	{
		let cnt: number = 0;

		for (let it = first; !it.equals(last); it = it.next() as Iterator)
			if (std.equals(it.value, val))
				return cnt++;

		return cnt;
	}

	/**
	 * <p> Return number of elements in range satisfying condition. </p>
	 * 
	 * <p> Returns the number of elements in the range [<i>first</i>, <i>last</i>] for which pred is <code>true</code>. 
	 * </p>
	 * 
	 * @param first An {@link Iterator} to the initial position in a sequence.
	 * @param last An {@link Iterator} to the final position in a sequence. The range used is [<i>first</i>, <i>last<i>],
	 *			  which contains all the elements between <i>first</i> and <i>last</i>, including the element pointed by
	 *			  <i>first</i> but not the element pointed by <i>last</i>.
	 * @param pred Unary function that accepts an element in the range as argument, and returns a value convertible 
	 *			   to <code>bool</code>. The value returned indicates whether the element is counted by this function.
	 *			   The function shall not modify its argument. This can either be a function pointer or a function 
	 *			   object.
	 */
	export function count_if<T, Iterator extends base.container.Iterator<T>>
		(first: Iterator, last: Iterator, pred: (val: T) => boolean): number
	{
		let cnt: number = 0;

		for (let it = first; !it.equals(last); it = it.next() as Iterator)
			if (pred(it.value))
				return cnt++;

		return cnt;
	}

	/* =========================================================
		MODIFIERS (MODIFYING SEQUENCE)
			- ITERATION
			- RE-ARRANGEMENT
	============================================================
		ITERATION
	--------------------------------------------------------- */
	/**
	 * <p> Remove consecutive duplicates in range. </p>
	 * 
	 * <p> Removes all but the first element from every consecutive group of equivalent elements in the range 
	 * [<i>first</i>, <i>last</i>]. </p>
	 * 
	 * <p> The function cannot alter the properties of the object containing the range of elements (i.e., it cannot 
	 * alter the size of an array or a container): The removal is done by replacing the duplicate elements by the next 
	 * element that is not a duplicate, and signaling the new size of the shortened range by returning an iterator to 
	 * the element that should be considered its new past-the-last element. </p>
	 * 
	 * <p> The relative order of the elements not removed is preserved, while the elements between the returned 
	 * iterator and last are left in a valid but unspecified state. </p>
	 * 
	 * @param first An {@link Iterator} to the initial position in a sequence.
	 * @param last An {@link Iterator} to the final position in a sequence. The range used is [<i>first</i>, <i>last<i>],
	 *			  which contains all the elements between <i>first</i> and <i>last</i>, including the element pointed by
	 *			  <i>first</i> but not the element pointed by <i>last</i>.
	 *
	 * @return An iterator to the element that follows the last element not removed. The range between <i>first</i> and
	 *		   this iterator includes all the elements in the sequence that were not considered duplicates.
	 */
	export function unique<T, Iterator extends base.container.Iterator<T>>
		(first: Iterator, last: Iterator): Iterator;

	/**
	 * <p> Remove consecutive duplicates in range. </p>
	 * 
	 * <p> Removes all but the first element from every consecutive group of equivalent elements in the range 
	 * [<i>first</i>, <i>last</i>]. </p>
	 * 
	 * <p> The function cannot alter the properties of the object containing the range of elements (i.e., it cannot 
	 * alter the size of an array or a container): The removal is done by replacing the duplicate elements by the next 
	 * element that is not a duplicate, and signaling the new size of the shortened range by returning an iterator to 
	 * the element that should be considered its new past-the-last element. </p>
	 * 
	 * <p> The relative order of the elements not removed is preserved, while the elements between the returned 
	 * iterator and last are left in a valid but unspecified state. </p>
	 * 
	 * @param first An {@link Iterator} to the initial position in a sequence.
	 * @param last An {@link Iterator} to the final position in a sequence. The range used is [<i>first</i>, <i>last<i>],
	 *			  which contains all the elements between <i>first</i> and <i>last</i>, including the element pointed by
	 *			  <i>first</i> but not the element pointed by <i>last</i>.
	 * @param pred Binary function that accepts two elements in the range as argument, and returns a value convertible 
	 *			   to <code>bool</code>. The value returned indicates whether both arguments are considered equivalent 
	 *			  (if <code>true</code>, they are equivalent and one of them is removed). The function shall not modify 
	 *			  any of its arguments. This can either be a function pointer or a function object.
	 *
	 * @return An iterator to the element that follows the last element not removed. The range between <i>first</i> and 
	 *		   this iterator includes all the elements in the sequence that were not considered duplicates.
	 */
	export function unique<t, Iterator extends base.container.Iterator<t>>
		(first: Iterator, last: Iterator, pred: (left: t, right: t) => boolean): Iterator;

	export function unique<t, Iterator extends base.container.Iterator<t>>
		(first: Iterator, last: Iterator, pred: (left: t, right: t) => boolean = std.equals): Iterator
	{
		let ret: Iterator = first;

		for (let it = first.next(); !it.equals(last);)
		{
			if (std.equals(it.value, it.prev().value) == true)
				it = it.get_source().erase(it) as Iterator;
			else
			{
				ret = it as Iterator;
				it = it.next();
			}
		}
		return ret;
	}

	/**
	 * <p> Remove value from range. </p>
	 * 
	 * <p> Transforms the range [<i>first</i>, <i>last</i>] into a range with all the elements that compare equal to 
	 * <i>val</i> removed, and returns an iterator to the new last of that range. </p>
	 * 
	 * <p> The function cannot alter the properties of the object containing the range of elements (i.e., it cannot 
	 * alter the size of an array or a container): The removal is done by replacing the elements that compare equal to 
	 * <i>val</i> by the next element that does not, and signaling the new size of the shortened range by returning an 
	 * iterator to the element that should be considered its new past-the-last element. </p>
	 * 
	 * The relative order of the elements not removed is preserved, while the elements between the returned iterator and last are left in a valid but unspecified state.
	 * 
	 * @param first An {@link Iterator} to the initial position in a sequence.
	 * @param last An {@link Iterator} to the final position in a sequence. The range used is [<i>first</i>, <i>last<i>],
	 *			  which contains all the elements between <i>first</i> and <i>last</i>, including the element pointed by
	 *			  <i>first</i> but not the element pointed by <i>last</i>.
	 * @param val Value to be removed.
	 */
	export function remove<T, Iterator extends base.container.Iterator<T>>
		(first: Iterator, last: Iterator, val: T): Iterator
	{
		let ret: Iterator = last;

		for (let it = first; !it.equals(last); )
		{
			if (std.equals(it.value, val) == true)
				it = it.get_source().erase(it) as Iterator;
			else
			{
				ret = it;
				it = it.next() as Iterator;
			}
		}
		return ret;
	}

	/**
	 * <p> Remove elements from range. </p>
	 * 
	 * <p> Transforms the range [<i>first</i>, <i>last</i>) into a range with all the elements for which pred returns 
	 * <code>true</code> removed, and returns an iterator to the new last of that range. </p>
	 * 
	 * <p> The function cannot alter the properties of the object containing the range of elements (i.e., it cannot 
	 * alter the size of an array or a container): The removal is done by replacing the elements for which pred returns 
	 * <code>true</code> by the next element for which it does not, and signaling the new size of the shortened range 
	 * by returning an iterator to the element that should be considered its new past-the-last element. </p>
	 * 
	 * <p> The relative order of the elements not removed is preserved, while the elements between the returned 
	 * iterator and last are left in a valid but unspecified state. </p>
	 * 
	 * @param first An {@link Iterator} to the initial position in a sequence.
	 * @param last An {@link Iterator} to the final position in a sequence. The range used is [<i>first</i>, <i>last<i>],
	 *			  which contains all the elements between <i>first</i> and <i>last</i>, including the element pointed by
	 *			  <i>first</i> but not the element pointed by <i>last</i>.
	 * @param pred Unary function that accepts an element in the range as argument, and returns a value convertible to 
	 *			   <code>bool</code>. The value returned indicates whether the element is to be removed (if 
	 *			   <code>true</code>, it is removed). The function shall not modify its argument. This can either be a 
	 *			   function pointer or a function object.
	 */
	export function remove_if<T, Iterator extends base.container.Iterator<T>>
		(first: Iterator, last: Iterator, pred: (left: T) => boolean): Iterator
	{
		let ret: Iterator = last;

		for (let it = first; !it.equals(last);)
		{
			if (pred(it.value) == true)
				it = it.get_source().erase(it) as Iterator;
			else
			{
				ret = it;
				it = it.next() as Iterator;
			}
		}
		return ret;
	}

	/**
	 * <p> Replace value in range. </p>
	 * 
	 * <p> Assigns <i>new_val</i> to all the elements in the range [<i>first</i>, <i>last</i>] that compare equal to 
	 * <i>old_val</i>. </p>
	 * 
	 * <p> The function uses {@link equals} to compare the individual elements to old_val. </p>
	 * 
	 * @param first An {@link Iterator} to the initial position in a sequence.
	 * @param last An {@link Iterator} to the final position in a sequence. The range used is [<i>first</i>, <i>last<i>],
	 *			  which contains all the elements between <i>first</i> and <i>last</i>, including the element pointed by
	 *			  <i>first</i> but not the element pointed by <i>last</i>.
	 * @param old_val Value to be replaced.
	 * @param new_val Replacement value.
	 */
	export function replace<T, Iterator extends base.container.Iterator<T>>
		(first: Iterator, last: Iterator, old_val: T, new_val: T): void
	{
		for (let it = first; !it.equals(last); it = it.next() as Iterator)
			if (std.equals(it.value, old_val))
				it.value = new_val;
	}

	/**
	 * <p> Replace value in range. </p>
	 * 
	 * <p> Assigns <i>new_val</i> to all the elements in the range [<i>first</i>, <i>last</i>] for which pred returns 
	 * <code>true</code>. </p>
	 * 
	 * @param first An {@link Iterator} to the initial position in a sequence.
	 * @param last An {@link Iterator} to the final position in a sequence. The range used is [<i>first</i>, <i>last<i>],
	 *			  which contains all the elements between <i>first</i> and <i>last</i>, including the element pointed by
	 *			  <i>first</i> but not the element pointed by <i>last</i>.
	 * @param pred Unary function that accepts an element in the range as argument, and returns a value convertible to 
	 *			   <code>bool</code>. The value returned indicates whether the element is to be replaced (if 
	 *			   <code>true</code>, it is replaced). The function shall not modify its argument. This can either be 
	 *			   a function pointer or a function object.
	 * @param new_val Value to assign to replaced elements.
	 */
	export function replace_if<T, Iterator extends base.container.Iterator<T>>
		(first: Iterator, last: Iterator, pred: (val: T) => boolean, new_val: T): void
	{
		for (let it = first; !it.equals(last); it = it.next() as Iterator)
			if (pred(it.value) == true)
				it.value = new_val;
	}

	/* ---------------------------------------------------------
		RE-ARRANGEMENT
	--------------------------------------------------------- */
	/**
	 * <p> Reverse range. </p>
	 * 
	 * <p> Reverses the order of the elements in the range [<i>first</i>, <i>last</i>]. </p>
	 * 
	 * <p> The function calls {@link iter_swap} to swap the elements to their new locations. </p>
	 * 
	 * @param first An {@link Iterator} to the initial position in a sequence.
	 * @param last An {@link Iterator} to the final position in a sequence. The range used is [<i>first</i>, <i>last<i>],
	 *			  which contains all the elements between <i>first</i> and <i>last</i>, including the element pointed by
	 *			  <i>first</i> but not the element pointed by <i>last</i>.
	 */
	export function reverse<T, Iterator extends base.container.Iterator<T>>
		(first: Iterator, last: Iterator): void
	{
		// first != last && first != --last
		while (first.equals(last) == false && !first.equals((last = last.prev() as Iterator)) == false)
		{
			first.swap(last);
			first = first.next() as Iterator;
		}
	}

	/**
	 * <p> Rotate left the elements in range. </p>
	 * 
	 * <p> Rotates the order of the elements in the range [<i>first</i>, <i>last</i>], in such a way that the element 
	 * pointed by middle becomes the new first element. </p>
	 * 
	 * @param first An {@link Iterator} to the initial position in a sequence.
	 * @param middle An {@link Iterator} pointing to the element within the range [<i>first</i>, <i>last</i>] that is 
	 *				 moved to the first position in the range.
	 * @param last An {@link Iterator} to the final position in a sequence. The range used is [<i>first</i>, <i>last<i>],
	 *			  which contains all the elements between <i>first</i> and <i>last</i>, including the element pointed by
	 *			  <i>first</i> but not the element pointed by <i>last</i>.
	 *
	 * @return An iterator pointing to the element that now contains the value previously pointed by <i>first</i>.
	 */
	export function rotate<T, Iterator extends base.container.Iterator<T>>
		(first: Iterator, middle: Iterator, last: Iterator): Iterator
	{
		let next: Iterator = middle;

		while (next.equals(last) == false)
		{
			first.swap(next);

			first = first.next() as Iterator;
			next = next.next() as Iterator;

			if (first.equals(middle))
				break;
		}

		return first;
	}
	
	/**
	 * <p> Randomly rearrange elements in range. </p>
	 * 
	 * <p> Rearranges the elements in the range [<i>first</i>, <i>last</i>) randomly. </p>
	 * 
	 * <p> The function swaps the value of each element with that of some other randomly picked element. When provided, 
	 * the function gen determines which element is picked in every case. Otherwise, the function uses some unspecified 
	 * source of randomness. </p>
	 * 
	 * <p> To specify a uniform random generator, see {@link shuffle}. </p>
	 * 
	 * @param first An {@link Iterator} to the initial position in a sequence.
	 * @param last An {@link Iterator} to the final position in a sequence. The range used is [<i>first</i>, <i>last<i>],
	 *			  which contains all the elements between <i>first</i> and <i>last</i>, including the element pointed by
	 *			  <i>first</i> but not the element pointed by <i>last</i>.
	 */
	export function random_shuffle<T, RandomAccessIterator extends base.container.IArrayIterator<T>>
		(first: RandomAccessIterator, last: RandomAccessIterator): void
	{
		return std.shuffle(first, last);
	}

	/**
	 * <p> Randomly rearrange elements in range using generator. </p>
	 * 
	 * <p> Rearranges the elements in the range [<i>first</i>, <i>last</i>] randomly, using <i>g</i> as uniform random number 
	 * generator. </p>
	 * 
	 * <p> The function swaps the value of each element with that of some other randomly picked element. The function 
	 * determines the element picked by calling <i>g()</i>. </p>
	 * 
	 * <p> To shuffle the elements of the range without such a generator, see {@link random_shuffle} instead. </p>
	 * 
	 * <h5> Note </h5>
	 * <p> Using random generator engine is not implemented yet. </p>
	 * 
	 * @param first An {@link Iterator} to the initial position in a sequence.
	 * @param last An {@link Iterator} to the final position in a sequence. The range used is [<i>first</i>, <i>last<i>],
	 *			  which contains all the elements between <i>first</i> and <i>last</i>, including the element pointed by
	 *			  <i>first</i> but not the element pointed by <i>last</i>.
	 */
	export function shuffle<T, RandomAccessIterator extends base.container.IArrayIterator<T>>
		(first: RandomAccessIterator, last: RandomAccessIterator): void
	{
		for (let it = first; !it.equals(last); it = it.next() as RandomAccessIterator)
		{
			let rand_index: number = Math.floor(Math.random() * (last.index - first.index));
			it.swap(first.advance(rand_index));
		}
	}

	/* =========================================================
		SORTING
			- STANDARD DEFINITION
			- QUICK SORT
			- SWAP
			- COMPARE
	============================================================
		STANDARD DEFINITION
	--------------------------------------------------------- */
	/**
	 * <p> Sort elements in range. </p>
	 *
	 * <p> Sorts the elements in the range [<i>first</i>, <i>last</i>] into ascending order. The elements are compared 
	 * using {@link less}. </p>
	 *
	 * @param first {@link IArrayIterator Random-access iterator} to the initial position of the sequence to be sorted. 
	 *				The range used is [<i>first</i>, <i>last</i>], which contains all the elements between <i>first</i> 
	 *				and <i>last</i>, including the element pointed by <i>first</i> but not the element pointed by 
	 *				<i>first</i>. {@link IArrayIterator RandomAccessIterator} shall point to a type for which 
	 *				{@link Iterator.swap swap} is properly defined.
	 * 
	 * @param last {@link IArrayIterator Random-access iterator} to the final position of the sequence to be sorted.
	 *			  The range used is [<i>first</i>, <i>last</i>], which contains all the elements between <i>first</i>
	 *			  and <i>last</i>, including the element pointed by <i>first</i> but not the element pointed by
	 *			  <i>first</i>. {@link IArrayIterator RandomAccessIterator} shall point to a type for which
	 *			  {@link Iterator.swap swap} is properly defined.
	 */
	export function sort<T, InputIterator extends base.container.IArrayIterator<T>>
		(first: InputIterator, last: InputIterator): void;

	/**
	 * <p> Sort elements in range. </p>
	 *
	 * <p> Sorts the elements in the range [<i>first</i>, <i>last</i>] into specific order. The elements are compared
	 * using <i>compare</i>. </p>
	 *
	 * @param first {@link IArrayIterator Random-access iterator} to the initial position of the sequence to be sorted. 
	 *				The range used is [<i>first</i>, <i>last</i>], which contains all the elements between <i>first</i> 
	 *				and <i>last</i>, including the element pointed by <i>first</i> but not the element pointed by 
	 *				<i>first</i>. {@link IArrayIterator RandomAccessIterator} shall point to a type for which 
	 *				{@link Iterator.swap swap} is properly defined.
	 *			  
	 * @param last {@link IArrayIterator Random-access iterator} to the final position of the sequence to be sorted.
	 *			  The range used is [<i>first</i>, <i>last</i>], which contains all the elements between <i>first</i>
	 *			  and <i>last</i>, including the element pointed by <i>first</i> but not the element pointed by
	 *			  <i>first</i>. {@link IArrayIterator RandomAccessIterator} shall point to a type for which
	 *			  {@link Iterator.swap swap} is properly defined.
	 *
	 * @param compare Binary function that accepts two elements in the range as arguments, and returns a value 
	 *		  convertible to <code>boolean</code>. The value returned indicates whether the element passed as first 
	 *		  argument is considered to go before the second in the specific strict weak ordering it defines. The 
	 *		  function shall not modify any of its arguments. This can either be a function pointer or a function 
	 *		  object.
	 */
	export function sort<T, InputIterator extends base.container.IArrayIterator<T>>
		(first: InputIterator, last: InputIterator, compare: (left: T, right: T) => boolean): void;

	export function sort<T, InputIterator extends base.container.IArrayIterator<T>>
		(first: InputIterator, last: InputIterator, compare: (left: T, right: T) => boolean = std.less): void
	{
		qsort(first.get_source() as base.container.IArray<T>, first.index, last.index, compare);
	}

	/* ---------------------------------------------------------
		QUICK SORT
	--------------------------------------------------------- */
	/**
	 * @hidden
	 */
	function qsort<T>
		(
			container: base.container.IArray<T>, first: number, last: number, 
			compare: (left: T, right: T) => boolean
		): void
	{
		// QUICK SORT
		if (first > last)
		{
			// SWAP BEGIN A
			let supp: number = first;
			first = last;
			last = first;
		}

		let index: number = qsort_partition(container, first, last, compare);
		qsort(container, first, index, compare);
		qsort(container, index, last, compare);
	}

	/**
	 * @hidden
	 */
	function qsort_partition<T>
		(
			container: base.container.IArray<T>, first: number, last: number, 
			compare: (left: T, right: T) => boolean
		): number
	{
		let val: T = container.at(first);
		let i: number = first;
		let j: number = last;

		while (true)
		{
			while (compare(container.at(++i), val))
				if (i == last - 1)
					break;
			while (compare(val, container.at(--j)))
				if (j == first)
					break;

			if (i >= j)
				break;

			// SWAP; AT(I) WITH AT(J)
			let supplement: T = container.at(i);
			container.set(i, container.at(j));
			container.set(j, supplement);
		}

		// SWAO; AT(BEGIN) WITH AT(J)
		let supplement:T = container.at(first);
		container.set(first, container.at(j));
		container.set(j, supplement);

		return j;
	}

	/* ---------------------------------------------------------
		SWAP
	--------------------------------------------------------- */
	/**
	 * <p> Exchange contents of {@link IContainers containers}. </p>
	 * 
	 * <p> The contents of container <i>left</i> are exchanged with those of <i>right</i>. Both container objects 
	 * must have same type of elements (same template parameters), although sizes may differ. </p>
	 * 
	 * <p> After the call to this member function, the elements in <i>left</i> are those which were in <i>right</i> 
	 * before the call, and the elements of <i>right</i> are those which were in <i>left</i>. All iterators, 
	 * references and pointers remain valid for the swapped objects. </p>
	 *
	 * <p> This is an overload of the generic algorithm swap that improves its performance by mutually transferring 
	 * ownership over their assets to the other container (i.e., the containers exchange references to their data, 
	 * without actually performing any element copy or movement): It behaves as if 
	 * <i>left</i>.{@link IContainer.swap swap}(<i>right</i>) was called. </p>
	 * 
	 * @param left A {@link IContainer container} to swap its contents.
	 * @param right A {@link IContainer container} to swap its contents.
	 */
	export function swap<T>
		(left: base.container.IContainer<T>, right: base.container.IContainer<T>): void;

	/**
	 * <p> Exchange contents of queues. </p>
	 * 
	 * <p> Exchanges the contents of <i>left</i> and <i>right</i>. </p>
	 * 
	 * @param left A {@link Queue} container of the same type. Size may differ.
	 * @param right A {@link Queue} container of the same type. Size may differ.
	 */
	export function swap<T>
		(left: Queue<T>, right: Queue<T>): void;

	/**
	 * <p> Exchange contents of {@link PriorityQueue PriorityQueues}. </p>
	 * 
	 * <p> Exchanges the contents of <i>left</i> and <i>right</i>. </p>
	 * 
	 * @param left A {@link PriorityQueue} container of the same type. Size may differ.
	 * @param right A {@link PriorityQueue} container of the same type. Size may differ.
	 */
	export function swap<T>
		(left: PriorityQueue<T>, right: PriorityQueue<T>): void;

	/**
	 * <p> Exchange contents of {@link Stack Stacks}. </p>
	 * 
	 * <p> Exchanges the contents of <i>left</i> and <i>right</i>. </p>
	 * 
	 * @param left A {@link Stack} container of the same type. Size may differ.
	 * @param right A {@link Stack} container of the same type. Size may differ.
	 */
	export function swap<T>
		(left: Stack<T>, right: Stack<T>): void;

	/**
	 * <p> Exchanges the contents of two {@link UniqueMap unique maps}. </p>
	 * 
	 * <p> The contents of container <i>left</i> are exchanged with those of <i>right</i>. Both container objects must 
	 * be of the same type (same template parameters), although sizes may differ. </p>
	 * 
	 * <p> After the call to this member function, the elements in <i>left</i> are those which were in <i>right</i> 
	 * before the call, and the elements of <i>right</i> are those which were in <i>left</i>. All iterators, references 
	 * and pointers remain valid for the swapped objects. </p>
	 * 
	 * <p> This is an overload of the generic algorithm swap that improves its performance by mutually transferring 
	 * ownership over their assets to the other container (i.e., the containers exchange references to their data, 
	 * without actually performing any element copy or movement): It behaves as if 
	 * <i>left</i>.{@link UniqueMap.swap swap}(<i>right</i>) was called. </p>
	 * 
	 * @param left An {@link UniqueMap unique map} to swap its conents.
	 * @param right An {@link UniqueMap unique map} to swap its conents.
	 */
	export function swap<Key, T>
		(left: base.container.UniqueMap<Key, T>, right: base.container.UniqueMap<Key, T>): void;

	/**
	 * <p> Exchanges the contents of two {@link MultiMap multi maps}. </p>
	 * 
	 * <p> The contents of container <i>left</i> are exchanged with those of <i>right</i>. Both container objects must 
	 * be of the same type (same template parameters), although sizes may differ. </p>
	 * 
	 * <p> After the call to this member function, the elements in <i>left</i> are those which were in <i>right</i> 
	 * before the call, and the elements of <i>right</i> are those which were in <i>left</i>. All iterators, references 
	 * and pointers remain valid for the swapped objects. </p>
	 * 
	 * <p> This is an overload of the generic algorithm swap that improves its performance by mutually transferring 
	 * ownership over their assets to the other container (i.e., the containers exchange references to their data, 
	 * without actually performing any element copy or movement): It behaves as if 
	 * <i>left</i>.{@link MultiMap.swap swap}(<i>right</i>) was called. </p>
	 * 
	 * @param left A {@link MultiMap multi map} to swap its conents.
	 * @param right A {@link MultiMap multi map} to swap its conents.
	 */
	export function swap<Key, T>
		(left: base.container.MultiMap<Key, T>, right: base.container.MultiMap<Key, T>): void;

	export function swap(left: any, right: any)
	{
		left.swap(right);
	}
}