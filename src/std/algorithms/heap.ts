/// <reference path="../API.ts" />

namespace std
{
	/* =========================================================
		HEAPS
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
	 *			   {@link base.Iterator.swap swap} is properly defined.
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
	 *			   {@link base.Iterator.swap swap} is properly defined.
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
	 *			   {@link base.Iterator.swap swap} is properly defined.
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
	 *			   {@link base.Iterator.swap swap} is properly defined.
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
	 *			   {@link IArrayIterator RandomAccessIterator} shall point to a type for which {@link base.Iterator.swap swap} 
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
	 *			   {@link IArrayIterator RandomAccessIterator} shall point to a type for which {@link base.Iterator.swap swap}
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
	 *			   {@link IArrayIterator RandomAccessIterator} shall point to a type for which {@link base.Iterator.swap swap} 
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
	 *			   {@link IArrayIterator RandomAccessIterator} shall point to a type for which {@link base.Iterator.swap swap}
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
	 *			   {@link IArrayIterator RandomAccessIterator} shall point to a type for which {@link base.Iterator.swap swap}
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
	 *			   {@link IArrayIterator RandomAccessIterator} shall point to a type for which {@link base.Iterator.swap swap}
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
	 *			   {@link IArrayIterator RandomAccessIterator} shall point to a type for which {@link base.Iterator.swap swap} 
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
	 *			   {@link IArrayIterator RandomAccessIterator} shall point to a type for which {@link base.Iterator.swap swap}
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