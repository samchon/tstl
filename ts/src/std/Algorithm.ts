namespace std
{
	/* =========================================================
		SORT
			- STANDARD DEFINITION
			- QUICK SORT
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
	 *
	 * @reference http://www.cplusplus.com/reference/algorithm/sort/
	 * @author Jeongho Nam <http://samchon.org>
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
	 *
	 * @reference http://www.cplusplus.com/reference/algorithm/sort/
	 * @author Jeongho Nam <http://samchon.org>
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
			let supp: T = container.at(i);
			container.set(i, container.at(j));
			container.set(j, supp);
		}

		// SWAO; AT(BEGIN) WITH AT(J)
		let supp:T = container.at(begin);
		container.set(begin, container.at(j));
		container.set(j, supp);

		return j;
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
	 *
	 * @reference http://www.cplusplus.com/reference/algorithm/all_of/
	 * @author Jeongho Nam <http://samchon.org>
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
	 *
	 * @reference http://www.cplusplus.com/reference/algorithm/any_of/
	 * @author Jeongho Nam <http://samchon.org>
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
	 *
	 * @reference http://www.cplusplus.com/reference/algorithm/none_of/
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export function none_of<T, InputIterator extends base.container.Iterator<T>>
		(begin: InputIterator, end: InputIterator, pred: (val: T) => boolean): boolean
	{
		return !any_of(begin, end, pred);
	}

	/* ---------------------------------------------------------
		FINDERS
	--------------------------------------------------------- */
}