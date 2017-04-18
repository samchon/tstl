/// <reference path="../API.ts" />

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
	 * @param first {@link base.Iterator Input iterator} to the initial position of the sequence.
	 * @param last {@link base.Iterator Input iterator} to the final position of the sequence. The range used is
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
	export function is_partitioned<T, InputIterator extends base.Iterator<T>>
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
	 * @param first {@link base.Iterator Forward iterator} to the initial position of the sequence to partition.
	 * @param last {@link base.Iterator Forward iterator} to the final position of the sequence to partition. The range used is
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
	export function partition<T, BidirectionalIterator extends base.Iterator<T>>
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
	 * @param first {@link base.Iterator Bidirectional iterator} to the initial position of the sequence to partition.
	 * @param last {@link base.Iterator Bidirectional iterator} to the final position of the sequence to partition. The range 
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
	export function stable_partition<T, BidirectionalIterator extends base.Iterator<T>>
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
	 * @param first {@link base.Iterator Input iterator} to the initial position of the range to be copy-partitioned.
	 * @param last {@link base.Iterator Input iterator} to the final position of the range to be copy-partitioned. The range 
	 *			   used is [<i>first</i>, <i>last</i>), which contains all the elements between <i>first</i> and 
	 *			   <i>last</i>, including the element pointed by <i>first</i> but not the element pointed by <i>last</i>.
	 * @param result_true {@link base.Iterator Output iterator} to the initial position of the range where the elements for 
	 *					  which <i>pred</i> returns <code>true</code> are stored.
	 * @param result_false {@link base.Iterator Output iterator} to the initial position of the range where the elements for
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
			InputIterator extends base.Iterator<T>, 
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
	 * @param first {@link base.Iterator Forward iterator} to the initial position of the partitioned sequence.
	 * @param last {@link base.Iterator Forward iterator} to the final position of the partitioned sequence. The range checked 
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
	export function partition_point<T, ForwardIterator extends base.Iterator<T>>
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