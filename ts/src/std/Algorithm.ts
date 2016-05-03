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
		for (let it = first; !it.equal_to(last); it = it.next() as Iterator)
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
		for (let it = first; !it.equal_to(last); it = it.next() as Iterator)
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
		for (let it = first; !it.equal_to(last); it = it.next() as Iterator)
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
			pred: (x: T, y: T) => boolean = std.equal_to
		): boolean
	{
		while (!first1.equal_to(last1))
			if (first2.equal_to(first2.get_source().end()) || !pred(first1.value, first2.value))
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
			pred: (x: T, y: T) => boolean = std.equal_to
		): boolean
	{
		// find the mismatched
		let pair: Pair<Iterator1, Iterator2> = mismatch(first1, last1, first2);
		first1 = pair.first;
		first2 = pair.second;

		if (first1.equal_to(last1))
			return true;

		let last2: Iterator2 = first2.advance(distance(first1, last1)) as Iterator2;

		for (let it = first1; !it.equal_to(last1); it = it.next() as Iterator1)
			if (find(first1, it, it.value).equal_to(it))
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
		while (!first1.equal_to(last1))
			if (first2.equal_to(last2) || !compare(first1.value, first2.value))
				return false;
			else if (compare(first1.value, first2.value))
				return true;
			else
			{
				first1 = first1.next() as Iterator1;
				first2 = first2.next() as Iterator2;
			}

		return !std.equal_to(last2, last2.get_source().end()) && !std.equal_to(first2.value, last2.value);
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
	 * <p> The function uses {@link std.equal_to equal_to} to compare the individual elements to <i>val</i>. </p>
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
		for (let it = first; !it.equal_to(last); it = it.next() as Iterator)
			if (std.equal_to(it.value, val))
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
		for (let it = first; !it.equal_to(last); it = it.next() as Iterator)
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
		for (let it = first; !it.equal_to(last); it = it.next() as Iterator)
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
	 * <p> The elements in both ranges are compared sequentially using {@link equal_to}: A subsequence of 
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
			compare: (x: T, y: T) => boolean = std.equal_to
		): Iterator1
	{
		if (first2.equal_to(last2))
			return last1;

		let ret: Iterator1 = last1;

		for (; !first1.equal_to(last1); first1 = first1.next() as Iterator1)
		{
			let it1: Iterator1 = first1;
			let it2: Iterator2 = first2;

			while (std.equal_to(it1.value, it2.value))
			{
				it1 = it1.next() as Iterator1;
				it2 = it2.next() as Iterator2;

				if (it2.equal_to(last2))
				{
					ret = first1;
					break;
				}
				else if (it1.equal_to(last1))
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
	 * [<i>first2</i>, <i>last2</i>] using {@link std.equal_to}, until a pair matches. </p>
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
			pred: (x: T, y: T) => boolean = std.equal_to
		): Iterator1
	{
		for (; !first1.equal_to(last1); first1 = first1.next() as Iterator1)
			for (let it = first2; !it.equal_to(last2); it = it.next() as Iterator2)
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
	 * <p> Two elements match if they compare equal using {@link std.equal_to}. </p>
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
		(first: Iterator, last: Iterator, pred: (x: T, y: T) => boolean = std.equal_to): Iterator
	{
		if (!first.equal_to(last))
		{
			let next: Iterator = first.next() as Iterator;

			while (!next.equal_to(last))
			{
				if (std.equal_to(first.value, last.value))
					return first;

				first = first.next() as Iterator;
				next = next.next() as Iterator;
			}
		}
		return last;
	}

	/**
	 * <p> Search range for subsequence. </p>
	 * 
	 * <p> Searches the range [<i>first1</i>, <i>last1</i>] for the first occurrence of the sequence defined by 
	 * [<i>first2</i>, <i>last2</i>], and returns an iterator to its first element, or <i>last1</i> if no occurrences are 
	 * found. </p>
	 * 
	 * <p> The elements in both ranges are compared sequentially using {@link std.equal_to}: A subsequence of 
	 * [<i>first1</i>, <i>last1</i>] is considered a match only when this is true for <b>all</b> the elements of 
	 * [<i>first2</i>, <i>last2</i>]. </p>
	 * 
	 * <p> This function returns the first of such occurrences. For an algorithm that returns the last instead, see 
	 * {@link find_end}. </p>
	 * 
	 * @param first1 {@link Iterator Forward iterator} to the initial position of the searched sequence.
	 * @param last1 {@link Iterator Forward iterator} to the final position of the searched sequence. The range used is 
	 *				[<i>first1</i>, <i>last1</i>], which contains all the elements between <i>first1</i> and <i>last1</i>, 
	 *				including the element pointed by <i>first1</i> but not the element pointed by <i>last1</i>.
	 * @param first2 {@link Iterator Forward iterator} to the initial position of the sequence to be searched for.
	 * @param last2 {@link Iterator Forward iterator} to the final position of the sequence to be searched for. The range 
	 *				used is [<i>first2</i>, <i>last2</i>].
	 * 
	 * @return An iterator to the first element of the first occurrence of [first2,last2) in [first1,last1). If the 
	 *		   sequence is not found, the function returns last1. Otherwise [first2,last2) is an empty range, the function 
	 *		   returns first1.
	 */
	export function search<T, ForwardIterator1 extends base.container.Iterator<T>, ForwardIterator2 extends base.container.Iterator<T>>
		(first1: ForwardIterator1, last1: ForwardIterator1, first2: ForwardIterator2, last2: ForwardIterator2): ForwardIterator1

	/**
	 * <p> Search range for subsequence. </p>
	 * 
	 * <p> Searches the range [<i>first1</i>, <i>last1</i>] for the first occurrence of the sequence defined by 
	 * [<i>first2</i>, <i>last2</i>], and returns an iterator to its first element, or <i>last1</i> if no occurrences are 
	 * found. </p>
	 * 
	 * <p> The elements in both ranges are compared sequentially using <i>pred</i>: A subsequence of 
	 * [<i>first1</i>, <i>last1</i>] is considered a match only when this is true for <b>all</b> the elements of 
	 * [<i>first2</i>, <i>last2</i>]. </p>
	 * 
	 * <p> This function returns the first of such occurrences. For an algorithm that returns the last instead, see 
	 * {@link find_end}. </p>
	 * 
	 * @param first1 {@link Iterator Forward iterator} to the initial position of the searched sequence.
	 * @param last1 {@link Iterator Forward iterator} to the final position of the searched sequence. The range used is 
	 *				[<i>first1</i>, <i>last1</i>], which contains all the elements between <i>first1</i> and <i>last1</i>, 
	 *				including the element pointed by <i>first1</i> but not the element pointed by <i>last1</i>.
	 * @param first2 {@link Iterator Forward iterator} to the initial position of the sequence to be searched for.
	 * @param last2 {@link Iterator Forward iterator} to the final position of the sequence to be searched for. The range 
	 *				used is [<i>first2</i>, <i>last2</i>].
	 * @param pred Binary function that accepts two elements as arguments (one of each of the two sequences, in the same 
	 *			   order), and returns a value convertible to bool. The returned value indicates whether the elements are 
	 *			   considered to match in the context of this function. The function shall not modify any of its 
	 *			   arguments. This can either be a function pointer or a function object.
	 * 
	 * @return An iterator to the first element of the first occurrence of [<i>first2</i>, <i>last2</i>] in 
	 *		   [<i>first1</i>, <i>last1</i>]. If the sequence is not found, the function returns last1. Otherwise 
	 *		   [<i>first2</i>, <i>last2</i>] is an empty range, the function returns <i>first1</i>.
	 */
	export function search<T, ForwardIterator1 extends base.container.Iterator<T>, ForwardIterator2 extends base.container.Iterator<T>>
		(
			first1: ForwardIterator1, last1: ForwardIterator1, first2: ForwardIterator2, last2: ForwardIterator2,
			pred: (x: T, y: T) => boolean
		): ForwardIterator1

	export function search<T, ForwardIterator1 extends base.container.Iterator<T>, ForwardIterator2 extends base.container.Iterator<T>>
		(
			first1: ForwardIterator1, last1: ForwardIterator1, first2: ForwardIterator2, last2: ForwardIterator2,
			pred: (x: T, y: T) => boolean = std.equal_to
		): ForwardIterator1
	{
		if (first2.equal_to(last2))
			return first1;

		for (; !first1.equal_to(last1); first1 = first1.next() as ForwardIterator1)
		{
			let it1: ForwardIterator1 = first1;
			let it2: ForwardIterator2 = first2;

			while (std.equal_to(it1.value, it2.value))
			{
				it1 = it1.next() as ForwardIterator1;
				it2 = it2.next() as ForwardIterator2;

				if (it2.equal_to(last2))
					return first1;
				else if (it1.equal_to(last1))
					return last1;
			}
		}
		return last1;
	}

	/**
	 * <p> Search range for elements. </p>
	 * 
	 * <p> Searches the range [<i>first</i>, <i>last</i>] for a sequence of <i>count</i> elements, each comparing equal to 
	 * <i>val</i>. </p>
	 * 
	 * <p> The function returns an iterator to the first of such elements, or <i>last</i> if no such sequence is found. 
	 * </p>
	 * 
	 * @param first {@link Iterator Forward iterator} to the initial position of the searched sequence.
	 * @param last {@link Iterator Forward iterator} to the final position of the searched sequence. The range used is 
	 *			   [<i>first</i>, <i>last</i>], which contains all the elements between <i>first</i> and <i>last</i>, 
	 *			   including the element pointed by <i>first</i> but not the element pointed by <i>last</i>.
	 * @param count Minimum number of successive elements to match.
	 * @param val Individual value to be compared, or to be used as argument for {@link std.equal_to}.
	 * 
	 * @return An iterator to the first element of the sequence. If no such sequence is found, the function returns 
	 *		   <i>last</i>.
	 */
	export function search_n<T, ForwardIterator extends base.container.IArrayIterator<T>>
		(first: ForwardIterator, last: ForwardIterator, count: number, val: T): ForwardIterator;

	/**
	 * <p> Search range for elements. </p>
	 * 
	 * <p> Searches the range [<i>first</i>, <i>last</i>] for a sequence of <i>count</i> elements, each comparing equal to 
	 * <i>val</i>. </p>
	 * 
	 * <p> The function returns an iterator to the first of such elements, or <i>last</i> if no such sequence is found. 
	 * </p>
	 * 
	 * @param first {@link Iterator Forward iterator} to the initial position of the searched sequence.
	 * @param last {@link Iterator Forward iterator} to the final position of the searched sequence. The range used is 
	 *			   [<i>first</i>, <i>last</i>], which contains all the elements between <i>first</i> and <i>last</i>, 
	 *			   including the element pointed by <i>first</i> but not the element pointed by <i>last</i>.
	 * @param count Minimum number of successive elements to match.
	 * @param val Individual value to be compared, or to be used as argument for <i>pred</i>.
	 * @param pred Binary function that accepts two arguments (one element from the sequence as first, and <i>val</i> as 
	 *			   second), and returns a value convertible to <code>bool</code>. The value returned indicates whether the 
	 *			   element is considered a match in the context of this function. The function shall not modify any of its 
	 *			   arguments. This can either be a function pointer or a function object.
	 *
	 * @return An {@link Iterator} to the first element of the sequence. If no such sequence is found, the function 
	 *		   returns <i>last</i>.
	 */
	export function search_n<T, ForwardIterator extends base.container.IArrayIterator<T>>
		(
			first: ForwardIterator, last: ForwardIterator, count: number, val: T, 
			pred: (x: T, y: T) => boolean
		): ForwardIterator;

	export function search_n<T, ForwardIterator extends base.container.IArrayIterator<T>>
		(
			first: ForwardIterator, last: ForwardIterator, count: number, val: T, 
			pred: (x: T, y: T) => boolean = std.equal_to
		): ForwardIterator
	{
		let limit: ForwardIterator = first.advance(distance(first, last) - count) as ForwardIterator;

		for (; !first.equal_to(limit); first = first.next() as ForwardIterator)
		{
			let it: ForwardIterator = first;
			let i: number = 0;

			while (std.equal_to(it.value, val))
			{
				it = it.next() as ForwardIterator;

				if (++i == count)
					return first;
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
			compare: (x: T, y: T) => boolean = std.equal_to
		): Pair<Iterator1, Iterator2>
	{
		while (!first1.equal_to(last1) && !first2.equal_to(first2.get_source().end())
			&& std.equal_to(first1.value, first2.value))
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
	 * <p> The function uses {@link equal_to} to compare the individual elements to <i>val</i>. </p>
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

		for (let it = first; !it.equal_to(last); it = it.next() as Iterator)
			if (std.equal_to(it.value, val))
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

		for (let it = first; !it.equal_to(last); it = it.next() as Iterator)
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
		(first: Iterator, last: Iterator, pred: (left: t, right: t) => boolean = std.equal_to): Iterator
	{
		let ret: Iterator = first;

		for (let it = first.next(); !it.equal_to(last);)
		{
			if (std.equal_to(it.value, it.prev().value) == true)
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
	 * <p> The function cannot alter the properties of the object containing the range of elements (i.e., it cannot alter 
	 * the size of an array or a container): The removal is done by replacing the elements that compare equal to 
	 * <i>val</i> by the next element that does not, and signaling the new size of the shortened range by returning an 
	 * iterator to the element that should be considered its new past-the-last element. </p>
	 * 
	 * <p> The relative order of the elements not removed is preserved, while the elements between the returned iterator 
	 * and last are left in a valid but unspecified state. </p>
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

		for (let it = first; !it.equal_to(last); )
		{
			if (std.equal_to(it.value, val) == true)
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

		for (let it = first; !it.equal_to(last);)
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
	 * <p> The function uses {@link equal_to} to compare the individual elements to old_val. </p>
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
		for (let it = first; !it.equal_to(last); it = it.next() as Iterator)
			if (std.equal_to(it.value, old_val))
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
		for (let it = first; !it.equal_to(last); it = it.next() as Iterator)
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
		while (first.equal_to(last) == false && !first.equal_to((last = last.prev() as Iterator)) == false)
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

		while (next.equal_to(last) == false)
		{
			first.swap(next);

			first = first.next() as Iterator;
			next = next.next() as Iterator;

			if (first.equal_to(middle))
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
	 * <p> Rearranges the elements in the range [<i>first</i>, <i>last</i>] randomly, using <i>g</i> as uniform random 
	 * number generator. </p>
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
		for (let it = first; !it.equal_to(last); it = it.next() as RandomAccessIterator)
		{
			let rand_index: number = Math.floor(Math.random() * (last.index - first.index));
			it.swap(first.advance(rand_index));
		}
	}

	/* =========================================================
		SORTING
			- SORT
			- INSPECTOR
			- BACKGROUND
	============================================================
		SORT
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
	 *			  <i>last</i>. {@link IArrayIterator RandomAccessIterator} shall point to a type for which
	 *			  {@link Iterator.swap swap} is properly defined.
	 */
	export function sort<T, RandomAccessIterator extends base.container.IArrayIterator<T>>
		(first: RandomAccessIterator, last: RandomAccessIterator): void;

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
	 *			  <i>last</i>. {@link IArrayIterator RandomAccessIterator} shall point to a type for which
	 *			  {@link Iterator.swap swap} is properly defined.
	 *
	 * @param compare Binary function that accepts two elements in the range as arguments, and returns a value 
	 *		  convertible to <code>boolean</code>. The value returned indicates whether the element passed as first 
	 *		  argument is considered to go before the second in the specific strict weak ordering it defines. The 
	 *		  function shall not modify any of its arguments. This can either be a function pointer or a function 
	 *		  object.
	 */
	export function sort<T, RandomAccessIterator extends base.container.IArrayIterator<T>>
		(first: RandomAccessIterator, last: RandomAccessIterator, compare: (left: T, right: T) => boolean): void;

	export function sort<T, RandomAccessIterator extends base.container.IArrayIterator<T>>
		(first: RandomAccessIterator, last: RandomAccessIterator, compare: (left: T, right: T) => boolean = std.less): void
	{
		qsort(first.get_source() as base.container.IArray<T>, first.index, last.index, compare);
	}

	/**
	 * <p> Partially sort elements in range. </p>
	 * 
	 * <p> Rearranges the elements in the range [<i>first</i>, <i>last</i>], in such a way that the elements before 
	 * <i>middle</i> are the smallest elements in the entire range and are sorted in ascending order, while the remaining 
	 * elements are left without any specific order. </p>
	 * 
	 * <p> The elements are compared using {@link std.less}. </p>
	 * 
	 * @param last {@link IArrayIterator Random-access iterator} to the first position of the sequence to be sorted.
	 * @param middle {@link IArrayIterator Random-access iterator} pointing to the element within the range [<i>first</i>, <i>last</i>] that is used as the upper boundary of the elements that are fully sorted.
	 * @param last {@link IArrayIterator Random-access iterator} to the final position of the sequence to be sorted.
	 *			  The range used is [<i>first</i>, <i>last</i>], which contains all the elements between <i>first</i>
	 *			  and <i>last</i>, including the element pointed by <i>first</i> but not the element pointed by
	 *			  <i>last</i>.
	 */
	export function partial_sort<T, RandomAccessIterator extends base.container.IArrayIterator<T>>
		(first: RandomAccessIterator, middle: RandomAccessIterator, last: RandomAccessIterator): void;

	/**
	 * <p> Partially sort elements in range. </p>
	 * 
	 * <p> Rearranges the elements in the range [<i>first</i>, <i>last</i>], in such a way that the elements before 
	 * <i>middle</i> are the smallest elements in the entire range and are sorted in ascending order, while the remaining 
	 * elements are left without any specific order. </p>
	 * 
	 * <p> The elements are compared using <i>comp</i>. </p>
	 * 
	 * @param last {@link IArrayIterator Random-access iterator} to the first position of the sequence to be sorted.
	 * @param middle {@link IArrayIterator Random-access iterator} pointing to the element within the range [<i>first</i>, <i>last</i>] that is used as the upper boundary of the elements that are fully sorted.
	 * @param last {@link IArrayIterator Random-access iterator} to the final position of the sequence to be sorted.
	 *			  The range used is [<i>first</i>, <i>last</i>], which contains all the elements between <i>first</i>
	 *			  and <i>last</i>, including the element pointed by <i>first</i> but not the element pointed by
	 *			  <i>last</i>.
	 * @param compare Binary function that accepts two elements in the range as arguments, and returns a value 
	 *				  convertible to <code>boolean</code>. The value returned indicates whether the element passed as 
	 *				  first argument is considered to go before the second in the specific strict weak ordering it 
	 *				  defines. The function shall not modify any of its arguments. This can either be a function pointer 
	 *				  or a function object.
	 */
	export function partial_sort<T, RandomAccessIterator extends base.container.IArrayIterator<T>>
		(
			first: RandomAccessIterator, middle: RandomAccessIterator, last: RandomAccessIterator, 
			compare: (x: T, y: T) => boolean
		): void

	export function partial_sort<T, RandomAccessIterator extends base.container.IArrayIterator<T>>
		(
			first: RandomAccessIterator, middle: RandomAccessIterator, last: RandomAccessIterator, 
			compare: (x: T, y: T) => boolean = std.less
		): void
	{
		selection_sort(first.get_source() as base.container.IArray<T>, first.index, middle.index, last.index, compare);
	}

	/* ---------------------------------------------------------
		INSPECTOR
	--------------------------------------------------------- */
	/**
	 * <p> Check whether range is sorted. </p>
	 * 
	 * <p> Returns <code>true</code> if the range [<i>first</i>, <i>last</i>] is sorted into ascending order. </p>
	 * 
	 * <p> The elements are compared using {@link std.less}. </p>
	 * 
	 * @param first {@link Iterator Forward iterator} to the initial position of the sequence.
	 * @param last {@link Iterator Forward iterator} to the final position of the sequence. The range checked is 
	 *			   [<i>first</i>, <i>last</i>], which contains all the elements between <i>first</i> and <i>last</i>, 
	 *			   including the element pointed by <i>first</i> but not the element pointed by <i>last</i>.
	 * 
	 * @return <code>true</code> if the range [<i>first</i>, <i>last</i>] is sorted into ascending order, 
	 *		   <code>false</code> otherwise. If the range [<i>first</i>, <i>last</i>] contains less than two elements, 
	 *		   the function always returns <code>true</code>.
	 */
	export function is_sorted<T, ForwardIterator extends base.container.Iterator<T>>
		(first: ForwardIterator, last: ForwardIterator): boolean;

	/**
	 * <p> Check whether range is sorted. </p>
	 * 
	 * <p> Returns <code>true</code> if the range [<i>first</i>, <i>last</i>] is sorted into ascending order. </p>
	 * 
	 * <p> The elements are compared using <i>compare</i>. </p>
	 * 
	 * @param first {@link Iterator Forward iterator} to the initial position of the sequence.
	 * @param last {@link Iterator Forward iterator} to the final position of the sequence. The range checked is 
	 *			   [<i>first</i>, <i>last</i>], which contains all the elements between <i>first</i> and <i>last</i>, 
	 *			   including the element pointed by <i>first</i> but not the element pointed by <i>last</i>.
	 * @param compare Binary function that accepts two elements in the range as arguments, and returns a value convertible 
	 *				  to <code>bool</code>. The value returned indicates whether the element passed as first argument is 
	 *				  considered to go before the second in the specific strict weak ordering it defines. The function 
	 *				  shall not modify any of its arguments. This can either be a function pointer or a function object.
	 * 
	 * @return <code>true</code> if the range [<i>first</i>, <i>last</i>] is sorted into ascending order, 
	 *		   <code>false</code> otherwise. If the range [<i>first</i>, <i>last</i>] contains less than two elements, 
	 *		   the function always returns <code>true</code>.
	 */
	export function is_sorted<T, ForwardIterator extends base.container.Iterator<T>>
		(first: ForwardIterator, last: ForwardIterator, compare: (x: T, y: T) => boolean): boolean;

	export function is_sorted<T, ForwardIterator extends base.container.Iterator<T>>
		(first: ForwardIterator, last: ForwardIterator, compare: (x: T, y: T) => boolean = std.equal_to): boolean
	{
		if (first.equal_to(last)) 
			return true;
		
		for (let next = first.next() as ForwardIterator; !next.equal_to(last); next = next.next() as ForwardIterator)
		{
			if (std.less(next.value, first.value))     // or, if (comp(*next,*first)) for version (2)
				return false;
			
			first = first.next() as ForwardIterator;
		}
		return true;
	}

	/**
	 * <p> Find first unsorted element in range. </p>
	 * 
	 * <p> Returns an iterator to the first element in the range [<i>first</i>, <i>last</i>] which does not follow an 
	 * ascending order. </p>
	 * 
	 * <p> The range between <i>first</i> and the iterator returned {@link is_sorted is sorted}. </p>
	 * 
	 * <p> If the entire range is sorted, the function returns <i>last</i>. </p>
	 * 
	 * <p> The elements are compared using {@link std.equal_to}. </p>
	 * 
	 * @param first {@link Iterator Forward iterator} to the initial position of the sequence.
	 * @param last {@link Iterator Forward iterator} to the final position of the sequence. The range checked is
	 *			   [<i>first</i>, <i>last</i>], which contains all the elements between <i>first</i> and <i>last</i>,
	 *			   including the element pointed by <i>first</i> but not the element pointed by <i>last</i>.
	 * @param compare Binary function that accepts two elements in the range as arguments, and returns a value convertible
	 *				  to <code>bool</code>. The value returned indicates whether the element passed as first argument is
	 *				  considered to go before the second in the specific strict weak ordering it defines. The function
	 *				  shall not modify any of its arguments. This can either be a function pointer or a function object.
	 * 
	 * @return An iterator to the first element in the range which does not follow an ascending order, or <i>last</i> if 
	 *		   all elements are sorted or if the range contains less than two elements.
	 */
	export function is_sorted_until<T, ForwardIterator extends base.container.Iterator<T>>
		(first: ForwardIterator, last: ForwardIterator): ForwardIterator;

	/**
	 * <p> Find first unsorted element in range. </p>
	 * 
	 * <p> Returns an iterator to the first element in the range [<i>first</i>, <i>last</i>] which does not follow an 
	 * ascending order. </p>
	 * 
	 * <p> The range between <i>first</i> and the iterator returned {@link is_sorted is sorted}. </p>
	 * 
	 * <p> If the entire range is sorted, the function returns <i>last</i>. </p>
	 * 
	 * <p> The elements are compared using <i>compare</i>. </p>
	 * 
	 * @param first {@link Iterator Forward iterator} to the initial position of the sequence.
	 * @param last {@link Iterator Forward iterator} to the final position of the sequence. The range checked is
	 *			   [<i>first</i>, <i>last</i>], which contains all the elements between <i>first</i> and <i>last</i>,
	 *			   including the element pointed by <i>first</i> but not the element pointed by <i>last</i>.
	 * @param compare Binary function that accepts two elements in the range as arguments, and returns a value convertible
	 *				  to <code>bool</code>. The value returned indicates whether the element passed as first argument is
	 *				  considered to go before the second in the specific strict weak ordering it defines. The function
	 *				  shall not modify any of its arguments. This can either be a function pointer or a function object.
	 * 
	 * @return An iterator to the first element in the range which does not follow an ascending order, or <i>last</i> if 
	 *		   all elements are sorted or if the range contains less than two elements.
	 */
	export function is_sorted_until<T, ForwardIterator extends base.container.Iterator<T>>
		(first: ForwardIterator, last: ForwardIterator, compare: (x: T, y: T) => boolean): ForwardIterator;

	export function is_sorted_until<T, ForwardIterator extends base.container.Iterator<T>>
		(first: ForwardIterator, last: ForwardIterator, compare: (x: T, y: T) => boolean = std.equal_to): ForwardIterator
	{
		if (first.equal_to(last))
			return first;
		
		for (let next = first.next() as ForwardIterator; !next.equal_to(last); next = next.next() as ForwardIterator)
		{
			if (std.less(next.value ,first.value)) 
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
	function qsort<T>
		(
			container: base.container.IArray<T>, first: number, last: number, 
			compare: (left: T, right: T) => boolean
		): void
	{
		if (first > last) // SWAP BEGIN A
			[first, last] = [last, first];

		if (last == -1)
			last = container.size();

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

		// SWAP; AT(BEGIN) WITH AT(J)
		let supplement:T = container.at(first);
		container.set(first, container.at(j));
		container.set(j, supplement);

		return j;
	}

	/**
	 * @hidden
	 */
	function stable_qsort<T>
		(
			container: base.container.IArray<T>, first: number, last: number, 
			compare: (left: T, right: T) => boolean
		): void
	{
		// QUICK SORT
		if (first > last) // SWAP BEGIN A
			[first, last] = [last, first];

		let index: number = stable_qsort_partition(container, first, last, compare);
		stable_qsort(container, first, index, compare);
		stable_qsort(container, index, last, compare);
	}

	/**
	 * @hidden
	 */
	function stable_qsort_partition<T>
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
			while (!std.equal_to(container.at(++i), val) && compare(container.at(i), val))
				if (i == last - 1)
					break;
			while (!std.equal_to(val, container.at(--j)) && compare(val, container.at(j)))
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
	function selection_sort<T>
		(
			container: base.container.IArray<T>, first: number, middle: number, last: number,
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

	/* =========================================================
		BINARY SEARCH
	========================================================= */


	/* =========================================================
		MERGE
	========================================================= */


	/* =========================================================
		HEAP
	========================================================= */


	/* =========================================================
		MIN & MAX
			- VARADIC PARAMETERS
			- ITERATORS
	============================================================
		VARADIC PARAMETERS
	--------------------------------------------------------- */
	/**
	 * <p> Return the smallest. </p>
	 * 
	 * <p> Returns the smallest of all the elements in the <i>args</i>. </p>
	 * 
	 * @param args Values to compare.
	 * 
	 * @return The lesser of the values passed as arguments.
	 */
	export function min<T>(...args: T[]): T
	{
		let minimum: T = args[0];

		for (let i: number = 1; i < args.length; i++)
			if (std.less(args[i], minimum))
				minimum = args[i];

		return minimum;
	}

	/**
	 * <p> Return the largest. </p>
	 * 
	 * <p> Returns the largest of all the elements in the <i>args</i>. </p>
	 * 
	 * @param args Values to compare.
	 * 
	 * @return The largest of the values passed as arguments.
	 */
	export function max<T>(...args: T[]): T
	{
		let maximum: T = args[0];

		for (let i: number = 1; i < args.length; i++)
			if (std.greater(args[i], maximum))
				maximum = args[i];

		return maximum;
	}

	/**
	 * <p> Return smallest and largest elements. </p>
	 *
	 * <p> Returns a {@link Pair} with the smallest of all the elements in the <i>args</i> as first element (the first of 
	 * them, if there are more than one), and the largest as second (the last of them, if there are more than one). </p>
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
			if (std.less(args[i], minimum))
				minimum = args[i];
			if (std.greater(args[i], maximum))
				maximum = args[i];
		}

		return new Pair<T, T>(minimum, maximum);
	}

	/* ---------------------------------------------------------
		ITERATORS
	--------------------------------------------------------- */
	/**
	 * <p> Return smallest element in range. </p>
	 * 
	 * <p> Returns an iterator pointing to the element with the smallest value in the range  [<i>first</i>, <i>last</i>].
	 * </p>
	 * 
	 * <p> The comparisons are performed using either {@link std.less}; An element is the smallest if no other element 
	 * compares less than it. If more than one element fulfills this condition, the iterator returned points to the first 
	 * of such elements. </p>
	 * 
	 * @param first {@link Iteartor Input iterator} to the initial final position of the sequence to compare.
	 * @param last {@link Iteartor Input iterator} to the final final position of the sequence to compare. The range used 
	 *			   is [<i>first</i>, <i>last</i>], which contains all the elements between <i>first</i> and <i>last</i>, 
	 *			   including the element pointed by <i>first</i> but not the element pointed by <i>last</i>.
	 * 
	 * @return An iterator to smallest value in the range, or <i>last</i> if the range is empty.
	 */
	export function min_element<T, ForwardIterator extends base.container.Iterator<T>>
		(first: ForwardIterator, last: ForwardIterator): ForwardIterator;

	/**
	 * <p> Return smallest element in range. </p>
	 * 
	 * <p> Returns an iterator pointing to the element with the smallest value in the range  [<i>first</i>, <i>last</i>].
	 * </p>
	 * 
	 * <p> The comparisons are performed using either <i>compare</i>; An element is the smallest if no other element 
	 * compares less than it. If more than one element fulfills this condition, the iterator returned points to the first 
	 * of such elements. </p>
	 * 
	 * @param first {@link Iteartor Input iterator} to the initial final position of the sequence to compare.
	 * @param last {@link Iteartor Input iterator} to the final final position of the sequence to compare. The range used 
	 *			   is [<i>first</i>, <i>last</i>], which contains all the elements between <i>first</i> and <i>last</i>, 
	 *			   including the element pointed by <i>first</i> but not the element pointed by <i>last</i>.
	 * @param compare Binary function that accepts two elements in the range as arguments, and returns a value convertible 
	 *				  to <code>bool</code>. The value returned indicates whether the element passed as first argument is 
	 *				  considered less than the second. The function shall not modify any of its arguments. This can either 
	 *				  be a function pointer or a function object.
	 * 
	 * @return An iterator to smallest value in the range, or <i>last</i> if the range is empty.
	 */
	export function min_element<T, ForwardIterator extends base.container.Iterator<T>>
		(first: ForwardIterator, last: ForwardIterator, compare: (x: T, y: T) => boolean): ForwardIterator;

	export function min_element<T, ForwardIterator extends base.container.Iterator<T>>
		(first: ForwardIterator, last: ForwardIterator, compare: (x: T, y: T) => boolean = std.less): ForwardIterator
	{
		let smallest: ForwardIterator = first;
		first = first.next() as ForwardIterator;
		
		for (; !first.equal_to(last); first = first.next() as ForwardIterator)
			if (compare(first.value, smallest.value))
				smallest = first;

		return smallest;
	};

	/**
	 * <p> Return largest element in range. </p>
	 * 
	 * <p> Returns an iterator pointing to the element with the largest value in the range  [<i>first</i>, <i>last</i>].
	 * </p>
	 * 
	 * <p> The comparisons are performed using either {@link std.greater}; An element is the largest if no other element 
	 * compares less than it. If more than one element fulfills this condition, the iterator returned points to the first 
	 * of such elements. </p>
	 * 
	 * @param first {@link Iteartor Input iterator} to the initial final position of the sequence to compare.
	 * @param last {@link Iteartor Input iterator} to the final final position of the sequence to compare. The range used 
	 *			   is [<i>first</i>, <i>last</i>], which contains all the elements between <i>first</i> and <i>last</i>, 
	 *			   including the element pointed by <i>first</i> but not the element pointed by <i>last</i>.
	 * 
	 * @return An iterator to largest value in the range, or <i>last</i> if the range is empty.
	 */
	export function max_element<T, ForwardIterator extends base.container.Iterator<T>>
		(first: ForwardIterator, last: ForwardIterator): ForwardIterator;

	/**
	 * <p> Return largest element in range. </p>
	 * 
	 * <p> Returns an iterator pointing to the element with the largest value in the range  [<i>first</i>, <i>last</i>].
	 * </p>
	 * 
	 * <p> The comparisons are performed using either <i>compare</i>; An element is the largest if no other element 
	 * compares less than it. If more than one element fulfills this condition, the iterator returned points to the first 
	 * of such elements. </p>
	 * 
	 * @param first {@link Iteartor Input iterator} to the initial final position of the sequence to compare.
	 * @param last {@link Iteartor Input iterator} to the final final position of the sequence to compare. The range used 
	 *			   is [<i>first</i>, <i>last</i>], which contains all the elements between <i>first</i> and <i>last</i>, 
	 *			   including the element pointed by <i>first</i> but not the element pointed by <i>last</i>.
	 * @param compare Binary function that accepts two elements in the range as arguments, and returns a value convertible 
	 *				  to <code>bool</code>. The value returned indicates whether the element passed as first argument is 
	 *				  considered less than the second. The function shall not modify any of its arguments. This can either 
	 *				  be a function pointer or a function object.
	 * 
	 * @return An iterator to largest value in the range, or <i>last</i> if the range is empty.
	 */
	export function max_element<T, ForwardIterator extends base.container.Iterator<T>>
		(first: ForwardIterator, last: ForwardIterator, compare: (x: T, y: T) => boolean): ForwardIterator;

	export function max_element<T, ForwardIterator extends base.container.Iterator<T>>
		(first: ForwardIterator, last: ForwardIterator, compare: (x: T, y: T) => boolean = std.greater): ForwardIterator
	{
		let largest: ForwardIterator = first;
		first = first.next() as ForwardIterator;

		for (; !first.equal_to(last); first = first.next() as ForwardIterator)
			if (compare(first.value, largest.value))
				largest = first;

		return largest;
	};

	/**
	 * <p> Return smallest and largest elements in range. </p>
	 * 
	 * <p> Returns a {@link Pair} with an iterator pointing to the element with the smallest value in the range 
	 * [<i>first</i>, <i>last</i>] as first element, and the largest as second. </p>
	 * 
	 * <p> The comparisons are performed using either {@link std.less} and {@link std.greater}. </p>
	 * 
	 * <p> If more than one equivalent element has the smallest value, the first iterator points to the first of such 
	 * elements. </p>
	 * 
	 * <p> If more than one equivalent element has the largest value, the second iterator points to the last of such 
	 * elements. </p>
	 * 
	 * @param first {@link Iteartor Input iterator} to the initial final position of the sequence to compare.
	 * @param last {@link Iteartor Input iterator} to the final final position of the sequence to compare. The range used
	 *			   is [<i>first</i>, <i>last</i>], which contains all the elements between <i>first</i> and <i>last</i>,
	 *			   including the element pointed by <i>first</i> but not the element pointed by <i>last</i>.
	 * @param compare Binary function that accepts two elements in the range as arguments, and returns a value convertible
	 *				  to <code>bool</code>. The value returned indicates whether the element passed as first argument is
	 *				  considered less than the second. The function shall not modify any of its arguments. This can either
	 *				  be a function pointer or a function object.
	 * 
	 * @return A {@link Pair} with an iterator pointing to the element with the smallest value in the range 
	 *		   [<i>first</i>, <i>last</i>] as first element, and the largest as second.
	 */
	export function minmax_element<T, ForwardIterator extends base.container.Iterator<T>>
		(first: ForwardIterator, last: ForwardIterator): Pair<ForwardIterator, ForwardIterator>;

	/**
	 * <p> Return smallest and largest elements in range. </p>
	 * 
	 * <p> Returns a {@link Pair} with an iterator pointing to the element with the smallest value in the range 
	 * [<i>first</i>, <i>last</i>] as first element, and the largest as second. </p>
	 * 
	 * <p> The comparisons are performed using either <i>compare</i>. </p>
	 * 
	 * <p> If more than one equivalent element has the smallest value, the first iterator points to the first of such 
	 * elements. </p>
	 * 
	 * <p> If more than one equivalent element has the largest value, the second iterator points to the last of such 
	 * elements. </p>
	 * 
	 * @param first {@link Iteartor Input iterator} to the initial final position of the sequence to compare.
	 * @param last {@link Iteartor Input iterator} to the final final position of the sequence to compare. The range used
	 *			   is [<i>first</i>, <i>last</i>], which contains all the elements between <i>first</i> and <i>last</i>,
	 *			   including the element pointed by <i>first</i> but not the element pointed by <i>last</i>.
	 * @param compare Binary function that accepts two elements in the range as arguments, and returns a value convertible
	 *				  to <code>bool</code>. The value returned indicates whether the element passed as first argument is
	 *				  considered less than the second. The function shall not modify any of its arguments. This can either
	 *				  be a function pointer or a function object.
	 * 
	 * @return A {@link Pair} with an iterator pointing to the element with the smallest value in the range 
	 *		   [<i>first</i>, <i>last</i>] as first element, and the largest as second.
	 */
	export function minmax_element<T, ForwardIterator extends base.container.Iterator<T>>
		(first: ForwardIterator, last: ForwardIterator, compare: (x: T, y: T) => boolean): Pair<ForwardIterator, ForwardIterator>;

	export function minmax_element<T, ForwardIterator extends base.container.Iterator<T>>
		(first: ForwardIterator, last: ForwardIterator, compare: (x: T, y: T) => boolean = std.greater): Pair<ForwardIterator, ForwardIterator>
	{
		let smallest: ForwardIterator = first;
		let largest: ForwardIterator = first;

		first = first.next() as ForwardIterator;
		for (; !first.equal_to(last); first = first.next() as ForwardIterator)
		{
			if (compare(first.value, smallest.value)) // first is less than the smallest.
				smallest = first;
			if (!compare(first.value, largest.value)) // first is not less than the largest.
				largest = first;
		}

		return new Pair<ForwardIterator, ForwardIterator>(smallest, largest);
	};
}