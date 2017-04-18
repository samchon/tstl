/// <reference path="../API.ts" />

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
	export function min_element<T, ForwardIterator extends base.Iterator<T>>
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
	export function min_element<T, ForwardIterator extends base.Iterator<T>>
		(first: ForwardIterator, last: ForwardIterator, compare: (x: T, y: T) => boolean): ForwardIterator;

	export function min_element<T, ForwardIterator extends base.Iterator<T>>
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
	export function max_element<T, ForwardIterator extends base.Iterator<T>>
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
	export function max_element<T, ForwardIterator extends base.Iterator<T>>
		(first: ForwardIterator, last: ForwardIterator, compare: (x: T, y: T) => boolean): ForwardIterator;

	export function max_element<T, ForwardIterator extends base.Iterator<T>>
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
	export function minmax_element<T, ForwardIterator extends base.Iterator<T>>
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
	export function minmax_element<T, ForwardIterator extends base.Iterator<T>>
		(
			first: ForwardIterator, last: ForwardIterator, compare: (x: T, y: T) => boolean
		): Pair<ForwardIterator, ForwardIterator>;

	export function minmax_element<T, ForwardIterator extends base.Iterator<T>>
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
	 * @param first1 An {@link base.Iterator} to the initial position of the first sequence.
	 * @param last1 An {@link base.Iterator} to the final position in a sequence. The range used is
	 *				[<i>first1</i>, <i>last1</i>), including the element pointed by <i>first1</i>, but not the element
	 *				pointed by <i>last1</i>.
	 * @param first2 An {@link base.Iterator} to the initial position of the second sequence. The comparison includes up to
	 *				 as many elements of this sequence as those in the range [<i>first1</i>, <i>last1</i>).
	 * 
	 * @return <code>true</code> if all the elements in the range [<i>first1</i>, <i>last1</i>) compare equal to those 
	 *		   of the range starting at <i>first2</i> in any order, and <code>false</code> otherwise.
	 */
	export function is_permutation
		<T, Iterator1 extends base.Iterator<T>, Iterator2 extends base.Iterator<T>>
		(first1: Iterator1, last1: Iterator1, first2: Iterator2): boolean;

	/**
	 * Test whether range is permutation of another.
	 * 
	 * Compares the elements in the range [<i>first1</i>, <i>last1</i>) with those in the range beginning at 
	 * <i>first2</i>, and returns <code>true</code> if all of the elements in both ranges match, even in a different 
	 * order.
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
	 *		   of the range starting at <i>first2</i> in any order, and <code>false</code> otherwise.
	 */
	export function is_permutation
		<T, Iterator1 extends base.Iterator<T>, Iterator2 extends base.Iterator<T>>
		(
			first1: Iterator1, last1: Iterator1, first2: Iterator2,
			pred: (x: T, y: T) => boolean
		): boolean;

	export function is_permutation
		<T, Iterator1 extends base.Iterator<T>, Iterator2 extends base.Iterator<T>>
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