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
		SORT
			- STANDARD DEFINITION
			- QUICK SORT
			- SWAP
	============================================================
		STANDARD DEFINITION
	--------------------------------------------------------- */
	/**
	 * <p> Sort elements in range. </p>
	 *
	 * <p> Sorts the elements in the range [<i>begin</i>, <i>end</i>] into ascending order. The elements are compared 
	 * using {@link less}. </p>
	 *
	 * @param begin {@link IArrayIterator Random-access iterator} to the initial position of the sequence to be sorted. 
	 *				The range used is [<i>begin</i>, <i>end</i>], which contains all the elements between <i>begin</i> 
	 *				and <i>end</i>, including the element pointed by <i>begin</i> but not the element pointed by 
	 *				<i>begin</i>. {@link IArrayIterator RandomAccessIterator} shall point to a type for which 
	 *				{@link Iterator.swap swap} is properly defined.
	 * 
	 * @param end {@link IArrayIterator Random-access iterator} to the final position of the sequence to be sorted.
	 *			  The range used is [<i>begin</i>, <i>end</i>], which contains all the elements between <i>begin</i>
	 *			  and <i>end</i>, including the element pointed by <i>begin</i> but not the element pointed by
	 *			  <i>begin</i>. {@link IArrayIterator RandomAccessIterator} shall point to a type for which
	 *			  {@link Iterator.swap swap} is properly defined.
	 */
	export function sort<T, InputIterator extends base.container.IArrayIterator<T>>
		(begin: InputIterator, end: InputIterator): void;

	/**
	 * <p> Sort elements in range. </p>
	 *
	 * <p> Sorts the elements in the range [<i>begin</i>, <i>end</i>] into specific order. The elements are compared
	 * using <i>compare</i>. </p>
	 *
	 * @param begin {@link IArrayIterator Random-access iterator} to the initial position of the sequence to be sorted. 
	 *				The range used is [<i>begin</i>, <i>end</i>], which contains all the elements between <i>begin</i> 
	 *				and <i>end</i>, including the element pointed by <i>begin</i> but not the element pointed by 
	 *				<i>begin</i>. {@link IArrayIterator RandomAccessIterator} shall point to a type for which 
	 *				{@link Iterator.swap swap} is properly defined.
	 *			  
	 * @param end {@link IArrayIterator Random-access iterator} to the final position of the sequence to be sorted.
	 *			  The range used is [<i>begin</i>, <i>end</i>], which contains all the elements between <i>begin</i>
	 *			  and <i>end</i>, including the element pointed by <i>begin</i> but not the element pointed by
	 *			  <i>begin</i>. {@link IArrayIterator RandomAccessIterator} shall point to a type for which
	 *			  {@link Iterator.swap swap} is properly defined.
	 *
	 * @param compare Binary function that accepts two elements in the range as arguments, and returns a value 
	 *		  convertible to <code>boolean</code>. The value returned indicates whether the element passed as first 
	 *		  argument is considered to go before the second in the specific strict weak ordering it defines. The 
	 *		  function shall not modify any of its arguments. This can either be a function pointer or a function 
	 *		  object.
	 */
	export function sort<T, InputIterator extends base.container.IArrayIterator<T>>
		(begin: InputIterator, end: InputIterator, compare: (left: T, right: T) => boolean): void;

	export function sort<T, InputIterator extends base.container.IArrayIterator<T>>
		(begin: InputIterator, end: InputIterator, compare: (left: T, right: T) => boolean = std.less): void
	{
		qsort(begin.get_source() as base.container.IArray<T>, begin.index, end.index, compare);
	}

	/* ---------------------------------------------------------
		QUICK SORT
	--------------------------------------------------------- */
	/**
	 * @hidden
	 */
	function qsort<T, Container extends base.container.IArray<T>>
		(container: Container, begin: number, end: number, compare: (left: T, right: T) => boolean): void
	{
		// QUICK SORT
		if (begin > end)
			return;

		let index: number = qsort_partition(container, begin, end, compare);
		qsort(container, begin, index, compare);
		qsort(container, index, end, compare);
	}

	/**
	 * @hidden
	 */
	function qsort_partition<T, Container extends base.container.IArray<T>>
		(container: Container, begin: number, end: number, compare: (left: T, right: T) => boolean): number
	{
		let val: T = container.at(begin);
		let i: number = begin;
		let j: number = end;

		while (true)
		{
			while (compare(container.at(++i), val))
				if (i == end - 1)
					break;
			while (compare(val, container.at(--j)))
				if (j == begin)
					break;

			if (i >= j)
				break;

			// SWAP; AT(I) WITH AT(J)
			let supplement: T = container.at(i);
			container.set(i, container.at(j));
			container.set(j, supplement);
		}

		// SWAO; AT(BEGIN) WITH AT(J)
		let supplement:T = container.at(begin);
		container.set(begin, container.at(j));
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
	 * 
	 * 
	 * @param left
	 * @param right
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

	export function random_shuffle<T, RandomAccessIterator extends base.container.IArrayIterator<T>>
		(begin: RandomAccessIterator, end: RandomAccessIterator): void
	{
		for (let it = begin; !it.equals(end); it = it.next() as RandomAccessIterator)
		{
			let rand_index: number = Math.floor(Math.random() * (end.index - begin.index));
			it.swap(begin.advance(rand_index));
		}
	}

	export function shuffle<T, RandomAccessIterator extends base.container.IArrayIterator<T>>
		(begin: RandomAccessIterator, end: RandomAccessIterator): void
	{
		for (let it = begin; !it.equals(end); it = it.next() as RandomAccessIterator)
		{
			let rand_index: number = Math.floor(Math.random() * (end.index - begin.index));
			it.swap(begin.advance(rand_index));
		}
	}

	/* =========================================================
		ITERATIONS
			- FOR_EACH
			- AGGREGATE CONDITIONS
			- FINDERS
			- COUNTERS
			- RANGES
	============================================================
		FOR_EACH
	--------------------------------------------------------- */
	/**
	 * <p> Apply function to range. </p>
	 *
	 * <p> Applies function <i>fn</i> to each of the elements in the range [<i>begin</i>, <i>end</i>]. </p>
	 *
	 * @param begin An {@link Iterator} to the initial position in a sequence.
	 * @param end An {@link Iterator} to the final position in a sequence. The range used is [<i>begin</i>, <i>end<i>], 
	 *			  which contains all the elements between <i>begin</i> and <i>end</i>, including the element pointed by 
	 *			  <i>begin</i> but not the element pointed by <i>end</i>.
	 * @param fn Unary function that accepts an element in the range as argument. This can either be a function p
	 *			 ointer or a move constructible function object. Its return value, if any, is ignored.
	 *
	 * @return Returns <i>fn</i>.
	 */
	export function for_each<T, InputIterator extends base.container.Iterator<T>, Func extends (val: T) => any>
		(begin: InputIterator, end: InputIterator, fn: Func): Func
	{
		for (let it = begin; !it.equals(end); it = it.next() as InputIterator)
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
	 * [<i>begin</i>, <i>end</i>] or if the range is {@link IContainer.empty empty}, and <code>false</code> otherwise.
	 * </p>
	 * 
	 * @param begin An {@link Iterator} to the initial position in a sequence.
	 * @param end An {@link Iterator} to the final position in a sequence. The range used is [<i>begin</i>, <i>end<i>],
	 *			  which contains all the elements between <i>begin</i> and <i>end</i>, including the element pointed by
	 *			  <i>begin</i> but not the element pointed by <i>end</i>.
	 * @param pred Unary function that accepts an element in the range as argument and returns a value convertible to
	 *			   <code>boolean</code>. The value returned indicates whether the element fulfills the condition 
	 *			   checked by this function. The function shall not modify its argument. This can either be a function 
	 *			   pointer or a function object.
	 *
	 * @return <code>true</code> if pred returns true for all the elements in the range or if the range is 
	 *		   {@link IContainer.empty empty}, and <code>false</code> otherwise.
	 */
	export function all_of<T, InputIterator extends base.container.Iterator<T>>
		(begin: InputIterator, end: InputIterator, pred: (val: T) => boolean): boolean
	{
		for (let it = begin; !it.equals(end); it = it.next() as InputIterator)
			if (pred(it.value) == false)
				return false;

		return true;
	}

	/**
	 * <p> Test if any element in range fulfills condition. </p>
	 * 
	 * <p> Returns <code>true</code> if <i>pred</i> returns true for any of the elements in the range 
	 * [<i>begin</i>, <i>end<i>], and <code>false</code> otherwise. </p>
	 * 
	 * <p> If [<i>begin</i>, <i>end</i>] is an {@link IContainer.empty empty} range, the function returns 
	 * <code>false</code>. </p>
	 * 
	 * @param begin An {@link Iterator} to the initial position in a sequence.
	 * @param end An {@link Iterator} to the final position in a sequence. The range used is [<i>begin</i>, <i>end<i>],
	 *			  which contains all the elements between <i>begin</i> and <i>end</i>, including the element pointed by
	 *			  <i>begin</i> but not the element pointed by <i>end</i>.
	 * @param pred Unary function that accepts an element in the range as argument and returns a value convertible to
	 *			   <code>boolean</code>. The value returned indicates whether the element fulfills the condition
	 *			   checked by this function. The function shall not modify its argument. This can either be a function
	 *			   pointer or a function object.
	 *
	 * @return <code>true</code> if <i>pred</i> returns <code>true</code> for any of the elements in the range 
	 *		   [<i>begin</i>, <i>end<i>], and <code>false</code> otherwise. If [<i>begin</i>, <i>end</i>] is an 
	 *		   {@link IContainer.empty empty} range, the function returns <code>false</code>.
	 */
	export function any_of<T, InputIterator extends base.container.Iterator<T>>
		(begin: InputIterator, end: InputIterator, pred: (val: T) => boolean): boolean
	{
		for (let it = begin; !it.equals(end); it = it.next() as InputIterator)
			if (pred(it.value) == true)
				return true;

		return false;
	}

	/**
	 * <p> Test if no elements fulfill condition. </p>
	 * 
	 * <p> Returns <code>true</code> if <i>pred</i> returns false for all the elements in the range 
	 * [<i>begin</i>, <i>end</i>] or if the range is {@link IContainer.empty empty}, and <code>false</code> otherwise. 
	 * </p>
	 * 
	 * @param begin An {@link Iterator} to the initial position in a sequence.
	 * @param end An {@link Iterator} to the final position in a sequence. The range used is [<i>begin</i>, <i>end<i>],
	 *			  which contains all the elements between <i>begin</i> and <i>end</i>, including the element pointed by
	 *			  <i>begin</i> but not the element pointed by <i>end</i>.
	 * @param pred Unary function that accepts an element in the range as argument and returns a value convertible to
	 *			   <code>boolean</code>. The value returned indicates whether the element fulfills the condition
	 *			   checked by this function. The function shall not modify its argument. This can either be a function
	 *			   pointer or a function object.
	 *
	 * @return <code>true</code> if <i>pred</i> returns <code>false</code> for all the elements in the range 
	 *		   [<i>begin</i>, <i>end<i>] or if the range is {@link IContainer.empty empty}, and <code>false</code> 
	 *		   otherwise.
	 */
	export function none_of<T, InputIterator extends base.container.Iterator<T>>
		(begin: InputIterator, end: InputIterator, pred: (val: T) => boolean): boolean
	{
		return !any_of(begin, end, pred);
	}

	/* ---------------------------------------------------------
		FINDERS
	--------------------------------------------------------- */
	/**
	 * <p> Find value in range. </p>
	 * 
	 * <p> Returns an iterator to the first element in the range [<i>begin</i>, <i>end</i>) that compares equal to 
	 * <i>val</i>. If no such element is found, the function returns <i>end</i>. </p>
	 * 
	 * <p> The function uses {@link std.equals equals} to compare the individual elements to <i>val</i>. </p>
	 * 
	 * @param begin An {@link Iterator} to the initial position in a sequence.
	 * @param end An {@link Iterator} to the final position in a sequence. The range used is [<i>begin</i>, <i>end<i>],
	 *			  which contains all the elements between <i>begin</i> and <i>end</i>, including the element pointed by
	 *			  <i>begin</i> but not the element pointed by <i>end</i>.
	 * @param val Value to search for in the range.
	 */
	export function find<T, InputIterator extends base.container.Iterator<T>>
		(begin: InputIterator, end: InputIterator, val: T): InputIterator
	{
		for (let it = begin; !it.equals(end); it = it.next() as InputIterator)
			if (std.equals(it.value, val))
				return it;

		return end;
	}

	/**
	 * <p> Find element in range. </p>
	 * 
	 * <p> Returns an iterator to the first element in the range [<i>begin</i>, <i>end</i>] for which pred returns 
	 * <code>true</code>. If no such element is found, the function returns <i>end</i>. </p>
	 * 
	 * @param begin An {@link Iterator} to the initial position in a sequence.
	 * @param end An {@link Iterator} to the final position in a sequence. The range used is [<i>begin</i>, <i>end<i>],
	 *			  which contains all the elements between <i>begin</i> and <i>end</i>, including the element pointed by
	 *			  <i>begin</i> but not the element pointed by <i>end</i>.
	 * @param pred Unary function that accepts an element in the range as argument and returns a value convertible 
	 *			   to <code>bool</code>. The value returned indicates whether the element is considered a match in 
	 *			   the context of this function. The function shall not modify its argument. This can either be a 
	 *			   function pointer or a function object.
	 */
	export function find_if<T, InputIterator extends base.container.Iterator<T>>
		(begin: InputIterator, end: InputIterator, pred: (val: T) => boolean): InputIterator
	{
		for (let it = begin; !it.equals(end); it = it.next() as InputIterator)
			if (pred(it.value))
				return it;

		return end;
	}

	/**
	 * <p> Find element in range. </p>
	 * 
	 * <p> Returns an iterator to the first element in the range [<i>begin</i>, <i>end</i>] for which pred returns 
	 * <code>true</code>. If no such element is found, the function returns <i>end</i>. </p>
	 * 
	 * @param begin An {@link Iterator} to the initial position in a sequence.
	 * @param end An {@link Iterator} to the final position in a sequence. The range used is [<i>begin</i>, <i>end<i>],
	 *			  which contains all the elements between <i>begin</i> and <i>end</i>, including the element pointed by
	 *			  <i>begin</i> but not the element pointed by <i>end</i>.
	 * @param pred Unary function that accepts an element in the range as argument and returns a value convertible 
	 *			   to <code>bool</code>. The value returned indicates whether the element is considered a match in 
	 *			   the context of this function. The function shall not modify its argument. This can either be a 
	 *			   function pointer or a function object.
	 */
	export function find_if_not<T, InputIterator extends base.container.Iterator<T>>
		(begin: InputIterator, end: InputIterator, pred: (val: T) => boolean): InputIterator
	{
		for (let it = begin; !it.equals(end); it = it.next() as InputIterator)
			if (pred(it.value) == false)
				return it;

		return end;
	}

	/* ---------------------------------------------------------
		COUNTERS
	--------------------------------------------------------- */
	export function count<T, InputIterator extends base.container.Iterator<T>>
		(begin: InputIterator, end: InputIterator, val: T): number
	{
		let cnt: number = 0;

		for (let it = begin; !it.equals(end); it = it.next() as InputIterator)
			if (std.equals(it.value, val))
				return cnt++;

		return cnt;
	}

	export function count_if<T, InputIterator extends base.container.Iterator<T>>
		(begin: InputIterator, end: InputIterator, pred: (val: T) => boolean): number
	{
		let cnt: number = 0;

		for (let it = begin; !it.equals(end); it = it.next() as InputIterator)
			if (pred(it.value))
				return cnt++;

		return cnt;
	}
}