/// <reference path="../API.ts" />

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
	export function copy
		<T, InputIterator extends base.Iterator<T>, OutputIterator extends base.ILinearIterator<T>>
		(first: InputIterator, last: InputIterator, result: OutputIterator): OutputIterator
	{
		for (; !first.equals(last); first = first.next() as InputIterator)
		{
			result.value = first.value;
			result = result.next() as OutputIterator;
		}
		return result;
	}

	export function copy_n
		<T, InputIterator extends base.Iterator<T>, OutputIterator extends base.ILinearIterator<T>>
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

	export function copy_if
		<T, InputIterator extends base.Iterator<T>, OutputIterator extends base.ILinearIterator<T>>
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

	export function copy_backward
		<T, BidirectionalIterator1 extends base.Iterator<T>, BidirectionalIterator2 extends base.ILinearIterator<T>>
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

	export function fill<T, ForwardIterator extends base.ILinearIterator<T>>
		(first: ForwardIterator, last: ForwardIterator, val: T): void
	{
		for (; !first.equals(last); first = first.next() as ForwardIterator)
			first.value = val;
	}

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

	export function transform<T, InputIterator extends base.Iterator<T>, OutputIterator extends base.ILinearIterator<T>>
		(first: InputIterator, last: InputIterator, result: OutputIterator, op: (val: T) => T): OutputIterator;

	export function transform<T, 
			InputIterator1 extends base.Iterator<T>,
			InputIterator2 extends base.Iterator<T>, 
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
	function unary_transform<T, InputIterator extends base.Iterator<T>, OutputIterator extends base.ILinearIterator<T>>
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
			InputIterator1 extends base.Iterator<T>,
			InputIterator2 extends base.Iterator<T>, 
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

	export function generate<T, ForwardIterator extends base.ILinearIterator<T>>
		(first: ForwardIterator, last: ForwardIterator, gen: () => T): void
	{
		for (; !first.equals(last); first = first.next() as ForwardIterator)
			first.value = gen();
	}

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
	export function unique<T, InputIterator extends base.Iterator<T>>
		(first: InputIterator, last: InputIterator): InputIterator;

	export function unique<t, InputIterator extends base.Iterator<t>>
		(first: InputIterator, last: InputIterator, pred: (left: t, right: t) => boolean): InputIterator;

	export function unique<t, InputIterator extends base.Iterator<t>>
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

	export function unique_copy<T, InputIterator extends base.Iterator<T>, OutputIterator extends base.ILinearIterator<T>>
		(first: InputIterator, last: InputIterator, result: OutputIterator): OutputIterator;

	export function unique_copy<T, InputIterator extends base.Iterator<T>, OutputIterator extends base.ILinearIterator<T>>
		(
			first: InputIterator, last: InputIterator, result: OutputIterator, 
			pred: (x: T, y: T) => boolean
		): OutputIterator;

	export function unique_copy<T, InputIterator extends base.Iterator<T>, OutputIterator extends base.ILinearIterator<T>>
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

	export function remove<T, InputIterator extends base.Iterator<T>>
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

	export function remove_if<T, InputIterator extends base.Iterator<T>>
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

	export function remove_copy<T, InputIterator extends base.Iterator<T>, OutputIterator extends base.ILinearIterator<T>>
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

	export function remove_copy_if<T, InputIterator extends base.Iterator<T>, OutputIterator extends base.ILinearIterator<T>>
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
	export function replace<T, InputIterator extends base.ILinearIterator<T>>
		(first: InputIterator, last: InputIterator, old_val: T, new_val: T): void
	{
		for (let it = first; !it.equals(last); it = it.next() as InputIterator)
			if (equal_to(it.value, old_val))
				it.value = new_val;
	}

	export function replace_if<T, InputIterator extends base.ILinearIterator<T>>
		(first: InputIterator, last: InputIterator, pred: (val: T) => boolean, new_val: T): void
	{
		for (let it = first; !it.equals(last); it = it.next() as InputIterator)
			if (pred(it.value) == true)
				it.value = new_val;
	}

	export function replace_copy<T, InputIterator extends base.Iterator<T>, OutputIterator extends base.ILinearIterator<T>>
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

	export function replace_copy_if<T, InputIterator extends base.Iterator<T>, OutputIterator extends base.ILinearIterator<T>>
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

	export function iter_swap<T>(x: base.Iterator<T>, y: base.Iterator<T>): void
	{
		x.swap(y);
	}

	export function swap_ranges<T, ForwardIterator1 extends base.Iterator<T>, ForwardIterator2 extends base.Iterator<T>>
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
	export function reverse<T, InputIterator extends base.Iterator<T>>
		(first: InputIterator, last: InputIterator): void
	{
		// first != last && first != --last
		while (first.equals(last) == false && first.equals((last = last.prev() as InputIterator)) == false)
		{
			first.swap(last);
			first = first.next() as InputIterator;
		}
	}

	export function reverse_copy<T, BidirectionalIterator extends base.Iterator<T>, OutputIterator extends base.ILinearIterator<T>>
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

	export function rotate<T, InputIterator extends base.Iterator<T>>
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

	export function rotate_copy<T, ForwardIterator extends base.Iterator<T>, OutputIterator extends base.ILinearIterator<T>>
		(first: ForwardIterator, middle: ForwardIterator, last: ForwardIterator, result: OutputIterator): OutputIterator
	{
		result = copy(middle, last, result);
		return copy(first, middle, result);
	}
	
	export function random_shuffle<T, RandomAccessIterator extends base.IArrayIterator<T>>
		(first: RandomAccessIterator, last: RandomAccessIterator): void
	{
		return shuffle(first, last);
	}

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