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
	export function sort<T>
		(begin: base.container.IArrayIterator<T>, end: base.container.IArrayIterator<T>): void;

	//export function sort<T, InputIterator extends >
	//	(begin: InputIterator, end: InputIterator): void;

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
	export function sort<T>
		(
			begin: base.container.IArrayIterator<T>, end: base.container.IArrayIterator<T>, 
			compare: (left: T, right: T) => boolean
		): void;

	export function sort<T>
		(
			begin: base.container.IArrayIterator<T>, end: base.container.IArrayIterator<T>, 
			compare: (left: T, right: T) => boolean = std.less
		): void
	{
		qsort(begin.get_source() as base.container.IArray<T>, begin.index, end.index, compare);
	}

	//export function sort<T, InputIterator extends base.container.IArrayIterator<T>>
	//	(begin: InputIterator, end: InputIterator, compare: (left: T, right: T) => boolean): void;

	//export function sort<T, InputIterator extends base.container.IArrayIterator<T>>
	//	(begin: InputIterator, end: InputIterator, compare: (left: T, right: T) => boolean = std.less): void
	//{
	//	qsort(begin.get_source() as base.container.IArray<T>, begin.index, end.index, compare);
	//}

	/* ---------------------------------------------------------
		QUICK SORT
	--------------------------------------------------------- */
	/**
	 * @hidden
	 */
	function qsort<T>
		(
			container: base.container.IArray<T>, begin: number, end: number, 
			compare: (left: T, right: T) => boolean
		): void
	{
		// QUICK SORT
		if (begin > end)
		{
			// SWAP BEGIN A
			let supp: number = begin;
			begin = end;
			end = begin;
		}

		let index: number = qsort_partition(container, begin, end, compare);
		qsort(container, begin, index, compare);
		qsort(container, index, end, compare);
	}

	/**
	 * @hidden
	 */
	function qsort_partition<T>
		(
			container: base.container.IArray<T>, begin: number, end: number, 
			compare: (left: T, right: T) => boolean
		): number
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

	/* =========================================================
		MODIFIERS
			- ITERATION
			- RE-ARRANGEMENT
	============================================================
		ITERATION
	--------------------------------------------------------- */
	/**
	 * <p> Remove consecutive duplicates in range. </p>
	 * 
	 * <p> Removes all but the first element from every consecutive group of equivalent elements in the range 
	 * [<i>begin</i>, <i>end</i>]. </p>
	 * 
	 * <p> The function cannot alter the properties of the object containing the range of elements (i.e., it cannot 
	 * alter the size of an array or a container): The removal is done by replacing the duplicate elements by the next 
	 * element that is not a duplicate, and signaling the new size of the shortened range by returning an iterator to 
	 * the element that should be considered its new past-the-end element. </p>
	 * 
	 * <p> The relative order of the elements not removed is preserved, while the elements between the returned 
	 * iterator and last are left in a valid but unspecified state. </p>
	 * 
	 * @param begin An {@link Iterator} to the initial position in a sequence.
	 * @param end An {@link Iterator} to the final position in a sequence. The range used is [<i>begin</i>, <i>end<i>],
	 *			  which contains all the elements between <i>begin</i> and <i>end</i>, including the element pointed by
	 *			  <i>begin</i> but not the element pointed by <i>end</i>.
	 *
	 * @return An iterator to the element that follows the last element not removed. The range between <i>begin</i> and
	 *		   this iterator includes all the elements in the sequence that were not considered duplicates.
	 */
	export function unique<T>
		(begin: base.container.Iterator<T>, end: base.container.Iterator<T>): base.container.Iterator<T>;

	//export function unique<T, Iterator extends base.container.Iterator<T>>
	//	(begin: Iterator, end: Iterator): Iterator;

	/**
	 * <p> Remove consecutive duplicates in range. </p>
	 * 
	 * <p> Removes all but the first element from every consecutive group of equivalent elements in the range 
	 * [<i>begin</i>, <i>end</i>]. </p>
	 * 
	 * <p> The function cannot alter the properties of the object containing the range of elements (i.e., it cannot 
	 * alter the size of an array or a container): The removal is done by replacing the duplicate elements by the next 
	 * element that is not a duplicate, and signaling the new size of the shortened range by returning an iterator to 
	 * the element that should be considered its new past-the-end element. </p>
	 * 
	 * <p> The relative order of the elements not removed is preserved, while the elements between the returned 
	 * iterator and last are left in a valid but unspecified state. </p>
	 * 
	 * @param begin An {@link Iterator} to the initial position in a sequence.
	 * @param end An {@link Iterator} to the final position in a sequence. The range used is [<i>begin</i>, <i>end<i>],
	 *			  which contains all the elements between <i>begin</i> and <i>end</i>, including the element pointed by
	 *			  <i>begin</i> but not the element pointed by <i>end</i>.
	 * @param pred Binary function that accepts two elements in the range as argument, and returns a value convertible 
	 *			   to <code>bool</code>. The value returned indicates whether both arguments are considered equivalent 
	 *			  (if <code>true</code>, they are equivalent and one of them is removed). The function shall not modify 
	 *			  any of its arguments. This can either be a function pointer or a function object.
	 *
	 * @return An iterator to the element that follows the last element not removed. The range between <i>begin</i> and 
	 *		   this iterator includes all the elements in the sequence that were not considered duplicates.
	 */
	export function unique<T>
		(
			begin: base.container.Iterator<T>, end: base.container.Iterator<T>, 
			pred: (left: T, right: T) => boolean
		): base.container.Iterator<T>;

	export function unique<T>
		(
			begin: base.container.Iterator<T>, end: base.container.Iterator<T>, 
			pred: (left: T, right: T) => boolean = std.equals
		): base.container.Iterator<T>
	{
		let ret: base.container.Iterator<T> = begin;

		for (let it = begin.next(); !it.equals(end);)
		{
			if (std.equals(it.value, it.prev().value) == true)
				it = it.get_source().erase(it);
			else
			{
				ret = it;
				it = it.next();
			}
		}
		return ret;
	}

	//export function unique<T, Iterator extends base.container.Iterator<T>>
	//	(begin: Iterator, end: Iterator, pred: (left: T, right: T) => boolean): Iterator;

	//export function unique<T, Iterator extends base.container.Iterator<T>>
	//	(begin: Iterator, end: Iterator, pred: (left: T, right: T) => boolean = std.equals): Iterator
	//{
	//	let ret: Iterator = begin;

	//	for (let it = begin.next(); !it.equals(end);)
	//	{
	//		if (std.equals(it.value, it.prev().value) == true)
	//			it = it.get_source().erase(it) as Iterator;
	//		else
	//		{
	//			ret = it as Iterator;
	//			it = it.next();
	//		}
	//	}
	//	return ret;
	//}

	/**
	 * <p> Remove value from range. </p>
	 * 
	 * <p> Transforms the range [<i>begin</i>, <i>end</i>] into a range with all the elements that compare equal to 
	 * <i>val</i> removed, and returns an iterator to the new end of that range. </p>
	 * 
	 * <p> The function cannot alter the properties of the object containing the range of elements (i.e., it cannot 
	 * alter the size of an array or a container): The removal is done by replacing the elements that compare equal to 
	 * <i>val</i> by the next element that does not, and signaling the new size of the shortened range by returning an 
	 * iterator to the element that should be considered its new past-the-end element. </p>
	 * 
	 * The relative order of the elements not removed is preserved, while the elements between the returned iterator and last are left in a valid but unspecified state.
	 * 
	 * @param begin An {@link Iterator} to the initial position in a sequence.
	 * @param end An {@link Iterator} to the final position in a sequence. The range used is [<i>begin</i>, <i>end<i>],
	 *			  which contains all the elements between <i>begin</i> and <i>end</i>, including the element pointed by
	 *			  <i>begin</i> but not the element pointed by <i>end</i>.
	 * @param val Value to be removed.
	 */
	export function remove<T>
		(begin: base.container.Iterator<T>, end: base.container.Iterator<T>, val: T): base.container.Iterator<T>
	{
		let ret: base.container.Iterator<T> = end;

		for (let it = begin; !it.equals(end);)
		{
			if (std.equals(it.value, val) == true)
				it = it.get_source().erase(it);
			else
			{
				ret = it;
				it = it.next();
			}
		}
		return ret;
	}

	//export function remove<T, Iterator extends base.container.Iterator<T>>
	//	(begin: Iterator, end: Iterator, val: T): Iterator
	//{
	//	let ret: Iterator = end;

	//	for (let it = begin; !it.equals(end); )
	//	{
	//		if (std.equals(it.value, val) == true)
	//			it = it.get_source().erase(it) as Iterator;
	//		else
	//		{
	//			ret = it;
	//			it = it.next() as Iterator;
	//		}
	//	}
	//	return ret;
	//}

	/**
	 * <p> Remove elements from range. </p>
	 * 
	 * <p> Transforms the range [<i>begin</i>, <i>end</i>) into a range with all the elements for which pred returns 
	 * <code>true</code> removed, and returns an iterator to the new end of that range. </p>
	 * 
	 * <p> The function cannot alter the properties of the object containing the range of elements (i.e., it cannot 
	 * alter the size of an array or a container): The removal is done by replacing the elements for which pred returns 
	 * <code>true</code> by the next element for which it does not, and signaling the new size of the shortened range 
	 * by returning an iterator to the element that should be considered its new past-the-end element. </p>
	 * 
	 * <p> The relative order of the elements not removed is preserved, while the elements between the returned 
	 * iterator and last are left in a valid but unspecified state. </p>
	 * 
	 * @param begin An {@link Iterator} to the initial position in a sequence.
	 * @param end An {@link Iterator} to the final position in a sequence. The range used is [<i>begin</i>, <i>end<i>],
	 *			  which contains all the elements between <i>begin</i> and <i>end</i>, including the element pointed by
	 *			  <i>begin</i> but not the element pointed by <i>end</i>.
	 * @param pred Unary function that accepts an element in the range as argument, and returns a value convertible to 
	 *			   <code>bool</code>. The value returned indicates whether the element is to be removed (if 
	 *			   <code>true</code>, it is removed). The function shall not modify its argument. This can either be a 
	 *			   function pointer or a function object.
	 */
	export function remove_if<T>
		(
			begin: base.container.Iterator<T>, end: base.container.Iterator<T>, 
			pred: (left: T) => boolean
		): base.container.Iterator<T>
	{
		let ret: base.container.Iterator<T> = end;

		for (let it = begin; !it.equals(end);)
		{
			if (pred(it.value) == true)
				it = it.get_source().erase(it);
			else
			{
				ret = it;
				it = it.next();
			}
		}
		return ret;
	}

	//export function remove_if<T, Iterator extends base.container.Iterator<T>>
	//	(begin: Iterator, end: Iterator, pred: (left: T) => boolean): Iterator
	//{
	//	let ret: Iterator = end;

	//	for (let it = begin; !it.equals(end);)
	//	{
	//		if (pred(it.value) == true)
	//			it = it.get_source().erase(it) as Iterator;
	//		else
	//		{
	//			ret = it;
	//			it = it.next() as Iterator;
	//		}
	//	}
	//	return ret;
	//}

	/**
	 * <p> Replace value in range. </p>
	 * 
	 * <p> Assigns <i>new_val</i> to all the elements in the range [<i>begin</i>, <i>end</i>] that compare equal to 
	 * <i>old_val</i>. </p>
	 * 
	 * <p> The function uses {@link equals} to compare the individual elements to old_val. </p>
	 * 
	 * @param begin An {@link Iterator} to the initial position in a sequence.
	 * @param end An {@link Iterator} to the final position in a sequence. The range used is [<i>begin</i>, <i>end<i>],
	 *			  which contains all the elements between <i>begin</i> and <i>end</i>, including the element pointed by
	 *			  <i>begin</i> but not the element pointed by <i>end</i>.
	 * @param old_val Value to be replaced.
	 * @param new_val Replacement value.
	 */
	export function replace<T>
		(begin: base.container.Iterator<T>, end: base.container.Iterator<T>, old_val: T, new_val: T): void
	{
		for (let it = begin; !it.equals(end); it = it.next())
			if (std.equals(it.value, old_val))
				it.value = new_val;
	}

	//export function replace<T, Iterator extends base.container.Iterator<T>>
	//	(begin: Iterator, end: Iterator, old_val: T, new_val: T): void
	//{
	//	for (let it = begin; !it.equals(end); it = it.next() as Iterator)
	//		if (std.equals(it.value, old_val))
	//			it.value = new_val;
	//}

	/**
	 * <p> Replace value in range. </p>
	 * 
	 * <p> Assigns <i>new_val</i> to all the elements in the range [<i>begin</i>, <i>end</i>] for which pred returns 
	 * <code>true</code>. </p>
	 * 
	 * @param begin An {@link Iterator} to the initial position in a sequence.
	 * @param end An {@link Iterator} to the final position in a sequence. The range used is [<i>begin</i>, <i>end<i>],
	 *			  which contains all the elements between <i>begin</i> and <i>end</i>, including the element pointed by
	 *			  <i>begin</i> but not the element pointed by <i>end</i>.
	 * @param pred Unary function that accepts an element in the range as argument, and returns a value convertible to 
	 *			   <code>bool</code>. The value returned indicates whether the element is to be replaced (if 
	 *			   <code>true</code>, it is replaced). The function shall not modify its argument. This can either be 
	 *			   a function pointer or a function object.
	 * @param new_val Value to assign to replaced elements.
	 */
	export function replace_if<T>
		(
			begin: base.container.Iterator<T>, end: base.container.Iterator<T>, 
			pred: (val: T) => boolean, new_val: T
		): void
	{
		for (let it = begin; !it.equals(end); it = it.next())
			if (pred(it.value) == true)
				it.value = new_val;
	}

	//export function replace_if<T, Iterator extends base.container.Iterator<T>>
	//	(begin: Iterator, end: Iterator, pred: (val: T) => boolean, new_val: T): void
	//{
	//	for (let it = begin; !it.equals(end); it = it.next() as Iterator)
	//		if (pred(it.value) == true)
	//			it.value = new_val;
	//}

	/* ---------------------------------------------------------
		RE-ARRANGEMENT
	--------------------------------------------------------- */
	/**
	 * <p> Reverse range. </p>
	 * 
	 * <p> Reverses the order of the elements in the range [<i>begin</i>, <i>end</i>]. </p>
	 * 
	 * <p> The function calls {@link iter_swap} to swap the elements to their new locations. </p>
	 * 
	 * @param begin An {@link Iterator} to the initial position in a sequence.
	 * @param end An {@link Iterator} to the final position in a sequence. The range used is [<i>begin</i>, <i>end<i>],
	 *			  which contains all the elements between <i>begin</i> and <i>end</i>, including the element pointed by
	 *			  <i>begin</i> but not the element pointed by <i>end</i>.
	 */
	export function reverse<T>
		(begin: base.container.Iterator<T>, end: base.container.Iterator<T>): void
	{
		// begin != end && begin != --end
		while (begin.equals(end) == false && !begin.equals((end = end.prev())) == false)
		{
			begin.swap(end);
			begin = begin.next();
		}
	}

	//export function reverse<T, Iterator extends base.container.Iterator<T>>
	//	(begin: Iterator, end: Iterator): void
	//{
	//	// begin != end && begin != --end
	//	while (begin.equals(end) == false && !begin.equals((end = end.prev() as Iterator)) == false)
	//	{
	//		begin.swap(end);
	//		begin = begin.next() as Iterator;
	//	}
	//}

	/**
	 * <p> Rotate left the elements in range. </p>
	 * 
	 * <p> Rotates the order of the elements in the range [<i>begin</i>, <i>end</i>], in such a way that the element 
	 * pointed by middle becomes the new first element. </p>
	 * 
	 * @param begin An {@link Iterator} to the initial position in a sequence.
	 * @param middle An {@link Iterator} pointing to the element within the range [<i>begin</i>, <i>end</i>] that is 
	 *				 moved to the first position in the range.
	 * @param end An {@link Iterator} to the final position in a sequence. The range used is [<i>begin</i>, <i>end<i>],
	 *			  which contains all the elements between <i>begin</i> and <i>end</i>, including the element pointed by
	 *			  <i>begin</i> but not the element pointed by <i>end</i>.
	 *
	 * @return An iterator pointing to the element that now contains the value previously pointed by <i>begin</i>.
	 */
	export function rotate<T>
		(begin: base.container.Iterator<T>, middle: base.container.Iterator<T>, end: base.container.Iterator<T>)
			: base.container.Iterator<T>
	{
		let next: base.container.Iterator<T> = middle;

		while (next.equals(end) == false)
		{
			begin.swap(next);

			begin = begin.next();
			next = next.next();

			if (begin.equals(middle))
				break;
		}

		return begin;
	}

	//export function rotate<T, Iterator extends base.container.Iterator<T>>
	//	(begin: Iterator, middle: Iterator, end: Iterator): Iterator
	//{
	//	let next: Iterator = middle;

	//	while (next.equals(end) == false)
	//	{
	//		begin.swap(next);

	//		begin = begin.next() as Iterator;
	//		next = next.next() as Iterator;

	//		if (begin.equals(middle))
	//			break;
	//	}

	//	return begin;
	//}
	
	/**
	 * <p> Randomly rearrange elements in range. </p>
	 * 
	 * <p> Rearranges the elements in the range [<i>begin</i>, <i>end</i>) randomly. </p>
	 * 
	 * <p> The function swaps the value of each element with that of some other randomly picked element. When provided, 
	 * the function gen determines which element is picked in every case. Otherwise, the function uses some unspecified 
	 * source of randomness. </p>
	 * 
	 * <p> To specify a uniform random generator, see {@link shuffle}. </p>
	 * 
	 * @param begin An {@link Iterator} to the initial position in a sequence.
	 * @param end An {@link Iterator} to the final position in a sequence. The range used is [<i>begin</i>, <i>end<i>],
	 *			  which contains all the elements between <i>begin</i> and <i>end</i>, including the element pointed by
	 *			  <i>begin</i> but not the element pointed by <i>end</i>.
	 */
	export function random_shuffle<T>
		(begin: base.container.IArrayIterator<T>, end: base.container.IArrayIterator<T>): void
	{
		return std.shuffle(begin, end);
	}

	//export function random_shuffle<T, RandomAccessIterator extends base.container.IArrayIterator<T>>
	//	(begin: RandomAccessIterator, end: RandomAccessIterator): void
	//{
	//	return std.shuffle(begin, end);
	//}

	/**
	 * <p> Randomly rearrange elements in range using generator. </p>
	 * 
	 * <p> Rearranges the elements in the range [<i>begin</i>, <i>end</i>] randomly, using <i>g</i> as uniform random number 
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
	 * @param begin An {@link Iterator} to the initial position in a sequence.
	 * @param end An {@link Iterator} to the final position in a sequence. The range used is [<i>begin</i>, <i>end<i>],
	 *			  which contains all the elements between <i>begin</i> and <i>end</i>, including the element pointed by
	 *			  <i>begin</i> but not the element pointed by <i>end</i>.
	 */
	export function shuffle<T>
		(begin: base.container.IArrayIterator<T>, end: base.container.IArrayIterator<T>): void
	{
		for (let it = begin; !it.equals(end); it = it.next())
		{
			let rand_index: number = Math.floor(Math.random() * (end.index - begin.index));
			it.swap(begin.advance(rand_index));
		}
	}

	//export function shuffle<T, RandomAccessIterator extends base.container.IArrayIterator<T>>
	//	(begin: RandomAccessIterator, end: RandomAccessIterator): void
	//{
	//	for (let it = begin; !it.equals(end); it = it.next() as RandomAccessIterator)
	//	{
	//		let rand_index: number = Math.floor(Math.random() * (end.index - begin.index));
	//		it.swap(begin.advance(rand_index));
	//	}
	//}

	/* ---------------------------------------------------------
		
	--------------------------------------------------------- */

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
	export function for_each<T>
		(begin: base.container.Iterator<T>, end: base.container.Iterator<T>, fn: (val: T) => any): (val: T) => any
	{
		for (let it = begin; !it.equals(end); it = it.next())
			fn(it.value);

		return fn;
	}

	//export function for_each<T, Iterator extends base.container.Iterator<T>, Func extends (val: T) => any>
	//	(begin: Iterator, end: Iterator, fn: Func): Func
	//{
	//	for (let it = begin; !it.equals(end); it = it.next() as Iterator)
	//		fn(it.value);

	//	return fn;
	//}

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
	export function all_of<T>
		(begin: base.container.Iterator<T>, end: base.container.Iterator<T>, pred: (val: T) => boolean): boolean
	{
		for (let it = begin; !it.equals(end); it = it.next())
			if (pred(it.value) == false)
				return false;

		return true;
	}

	//export function all_of<T, Iterator extends base.container.Iterator<T>>
	//	(begin: Iterator, end: Iterator, pred: (val: T) => boolean): boolean
	//{
	//	for (let it = begin; !it.equals(end); it = it.next() as Iterator)
	//		if (pred(it.value) == false)
	//			return false;

	//	return true;
	//}

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
	export function any_of<T>
		(begin: base.container.Iterator<T>, end: base.container.Iterator<T>, pred: (val: T) => boolean): boolean
	{
		for (let it = begin; !it.equals(end); it = it.next())
			if (pred(it.value) == true)
				return true;

		return false;
	}

	//export function any_of<T, Iterator extends base.container.Iterator<T>>
	//	(begin: Iterator, end: Iterator, pred: (val: T) => boolean): boolean
	//{
	//	for (let it = begin; !it.equals(end); it = it.next() as Iterator)
	//		if (pred(it.value) == true)
	//			return true;

	//	return false;
	//}

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
	export function none_of<T>
		(begin: base.container.Iterator<T>, end: base.container.Iterator<T>, pred: (val: T) => boolean): boolean
	{
		return !any_of(begin, end, pred);
	}

	//export function none_of<T, Iterator extends base.container.Iterator<T>>
	//	(begin: Iterator, end: Iterator, pred: (val: T) => boolean): boolean
	//{
	//	return !any_of(begin, end, pred);
	//}

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
	export function find<T>
		(begin: base.container.Iterator<T>, end: base.container.Iterator<T>, val: T): base.container.Iterator<T>
	{
		for (let it = begin; !it.equals(end); it = it.next())
			if (std.equals(it.value, val))
				return it;

		return end;
	}

	//export function find<T, Iterator extends base.container.Iterator<T>>
	//	(begin: Iterator, end: Iterator, val: T): Iterator
	//{
	//	for (let it = begin; !it.equals(end); it = it.next() as Iterator)
	//		if (std.equals(it.value, val))
	//			return it;

	//	return end;
	//}

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
	export function find_if<T>
		(begin: base.container.Iterator<T>, end: base.container.Iterator<T>, pred: (val: T) => boolean)
			: base.container.Iterator<T>
	{
		for (let it = begin; !it.equals(end); it = it.next())
			if (pred(it.value))
				return it;

		return end;
	}

	//export function find_if<T, Iterator extends base.container.Iterator<T>>
	//	(begin: Iterator, end: Iterator, pred: (val: T) => boolean): Iterator
	//{
	//	for (let it = begin; !it.equals(end); it = it.next() as Iterator)
	//		if (pred(it.value))
	//			return it;

	//	return end;
	//}

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
	export function find_if_not<T>
		(begin: base.container.Iterator<T>, end: base.container.Iterator<T>, pred: (val: T) => boolean)
			: base.container.Iterator<T>
	{
		for (let it = begin; !it.equals(end); it = it.next())
			if (pred(it.value) == false)
				return it;

		return end;
	}

	//export function find_if_not<T, Iterator extends base.container.Iterator<T>>
	//	(begin: Iterator, end: Iterator, pred: (val: T) => boolean): Iterator
	//{
	//	for (let it = begin; !it.equals(end); it = it.next() as Iterator)
	//		if (pred(it.value) == false)
	//			return it;

	//	return end;
	//}

	/* ---------------------------------------------------------
		COUNTERS
	--------------------------------------------------------- */
	/**
	 * <p> Count appearances of value in range. </p>
	 * 
	 * <p> Returns the number of elements in the range [<i>begin</i>, <i>end</i>] that compare equal to <i>val</i>. </p>
	 * 
	 * <p> The function uses {@link equals} to compare the individual elements to <i>val</i>. </p>
	 * 
	 * @param begin An {@link Iterator} to the initial position in a sequence.
	 * @param end An {@link Iterator} to the final position in a sequence. The range used is [<i>begin</i>, <i>end<i>],
	 *			  which contains all the elements between <i>begin</i> and <i>end</i>, including the element pointed by
	 *			  <i>begin</i> but not the element pointed by <i>end</i>.
	 * @param val Value to match.
	 */
	export function count<T>
		(begin: base.container.Iterator<T>, end: base.container.Iterator<T>, val: T): number
	{
		let cnt: number = 0;

		for (let it = begin; !it.equals(end); it = it.next())
			if (std.equals(it.value, val))
				return cnt++;

		return cnt;
	}

	//export function count<T, Iterator extends base.container.Iterator<T>>
	//	(begin: Iterator, end: Iterator, val: T): number
	//{
	//	let cnt: number = 0;

	//	for (let it = begin; !it.equals(end); it = it.next() as Iterator)
	//		if (std.equals(it.value, val))
	//			return cnt++;

	//	return cnt;
	//}

	/**
	 * <p> Return number of elements in range satisfying condition. </p>
	 * 
	 * <p> Returns the number of elements in the range [<i>begin</i>, <i>end</i>] for which pred is <code>true</code>. 
	 * </p>
	 * 
	 * @param begin An {@link Iterator} to the initial position in a sequence.
	 * @param end An {@link Iterator} to the final position in a sequence. The range used is [<i>begin</i>, <i>end<i>],
	 *			  which contains all the elements between <i>begin</i> and <i>end</i>, including the element pointed by
	 *			  <i>begin</i> but not the element pointed by <i>end</i>.
	 * @param pred Unary function that accepts an element in the range as argument, and returns a value convertible 
	 *			   to <code>bool</code>. The value returned indicates whether the element is counted by this function.
	 *			   The function shall not modify its argument. This can either be a function pointer or a function 
	 *			   object.
	 */
	export function count_if<T>
		(begin: base.container.Iterator<T>, end: base.container.Iterator<T>, pred: (val: T) => boolean): number
	{
		let cnt: number = 0;

		for (let it = begin; !it.equals(end); it = it.next())
			if (pred(it.value))
				return cnt++;

		return cnt;
	}

	//export function count_if<T, Iterator extends base.container.Iterator<T>>
	//	(begin: Iterator, end: Iterator, pred: (val: T) => boolean): number
	//{
	//	let cnt: number = 0;

	//	for (let it = begin; !it.equals(end); it = it.next() as Iterator)
	//		if (pred(it.value))
	//			return cnt++;

	//	return cnt;
	//}
}