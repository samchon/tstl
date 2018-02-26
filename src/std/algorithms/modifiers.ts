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
	export function copy<T, InputIterator extends Readonly<IForwardIterator<T>>, OutputIterator extends Writeonly<IForwardIterator<T>>>
		(first: InputIterator, last: InputIterator, result: OutputIterator): OutputIterator
	{
		for (; !first.equals(last); first = first.next() as InputIterator)
		{
			result.value = first.value;
			result = result.next() as OutputIterator;
		}
		return result;
	}

	export function copy_n<T, InputIterator extends Readonly<IForwardIterator<T>>, OutputIterator extends Writeonly<IForwardIterator<T>>>
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

	export function copy_if<T, InputIterator extends Readonly<IForwardIterator<T>>, OutputIterator extends Writeonly<IForwardIterator<T>>>
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

	export function copy_backward<T, BidirectionalIterator1 extends Readonly<IBidirectionalIterator<T>>, BidirectionalIterator2 extends Writeonly<IBidirectionalIterator<T>>>
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

	export function fill<T, ForwardIterator extends Writeonly<IForwardIterator<T>>>
		(first: ForwardIterator, last: ForwardIterator, val: T): void
	{
		for (; !first.equals(last); first = first.next() as ForwardIterator)
			first.value = val;
	}

	export function fill_n<T, OutputIterator extends Writeonly<IForwardIterator<T>>>
		(first: OutputIterator, n: number, val: T): OutputIterator
	{
		for (let i: number = 0; i < n; i++)
		{
			first.value = val;
			first = first.next() as OutputIterator;
		}
		return first;
	}

	export function transform<T, Ret, InputIterator extends Readonly<IForwardIterator<T>>, OutputIterator extends Writeonly<IForwardIterator<Ret>>>
		(first: InputIterator, last: InputIterator, result: OutputIterator, op: (val: T) => Ret): OutputIterator;

	export function transform<T, Ret,
			InputIterator1 extends Readonly<IForwardIterator<T>>,
			InputIterator2 extends Readonly<IForwardIterator<T>>, 
			OutputIterator extends Writeonly<IForwardIterator<Ret>>>
		(
			first1: InputIterator1, last1: InputIterator1, first2: InputIterator2, 
			result: OutputIterator, binary_op: (x: T, y: T) => Ret
		): OutputIterator;

	export function transform(...args: any[]): any
	{
		if (args.length == 4)
			return unary_transform.apply(null, args);
		else // args: #5
			return binary_transform.apply(null, args);
	}

	/**
	 * @hidden
	 */
	function unary_transform<T, Ret, InputIterator extends Readonly<IForwardIterator<T>>, OutputIterator extends Writeonly<IForwardIterator<Ret>>>
		(first: InputIterator, last: InputIterator, result: OutputIterator, op: (val: T) => Ret): OutputIterator
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
	function binary_transform<T, Ret,
			InputIterator1 extends Readonly<IForwardIterator<T>>,
			InputIterator2 extends Readonly<IForwardIterator<T>>, 
			OutputIterator extends Writeonly<IForwardIterator<Ret>>>
		(
			first1: InputIterator1, last1: InputIterator1, first2: InputIterator2, 
			result: OutputIterator, binary_op: (x: T, y: T) => Ret
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

	export function generate<T, ForwardIterator extends General<IForwardIterator<T>>>
		(first: ForwardIterator, last: ForwardIterator, gen: () => T): void
	{
		for (; !first.equals(last); first = first.next() as ForwardIterator)
			first.value = gen();
	}

	export function generate_n<T, ForwardIterator extends General<IForwardIterator<T>>>
		(first: ForwardIterator, n: number, gen: () => T): ForwardIterator
	{
		while (n-- > 0)
		{
			first.value = gen();
			first = first.next() as ForwardIterator;
		}
		return first;
	}

	/* ---------------------------------------------------------
		REMOVE
	--------------------------------------------------------- */
	export function unique<T, InputIterator extends General<IForwardIterator<T>>>
		(first: InputIterator, last: InputIterator): InputIterator;

	export function unique<T, InputIterator extends General<IForwardIterator<T>>>
		(first: InputIterator, last: InputIterator, pred: (x: T, y: T) => boolean): InputIterator;

	export function unique<T, InputIterator extends General<IForwardIterator<T>>>
		(first: InputIterator, last: InputIterator, pred: (x: T, y: T) => boolean = equal_to): InputIterator
	{
		if (first.equals(last))
			return last;

		let ret: InputIterator = first;
		for (first = first.next() as InputIterator; !first.equals(last); first = first.next() as InputIterator)
			if (!pred(ret.value, first.value))
			{
				ret = ret.next() as InputIterator;
				ret.value = first.value;
			}
		return ret;
	}

	export function unique_copy<T, InputIterator extends Readonly<IForwardIterator<T>>, OutputIterator extends Writeonly<IForwardIterator<T>>>
		(first: InputIterator, last: InputIterator, result: OutputIterator): OutputIterator;

	export function unique_copy<T, InputIterator extends Readonly<IForwardIterator<T>>, OutputIterator extends Writeonly<IForwardIterator<T>>>
		(
			first: InputIterator, last: InputIterator, result: OutputIterator, 
			pred: (x: T, y: T) => boolean
		): OutputIterator;

	export function unique_copy<T, InputIterator extends Readonly<IForwardIterator<T>>, OutputIterator extends Writeonly<IForwardIterator<T>>>
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

	export function remove<T, InputIterator extends General<IForwardIterator<T>>>
		(first: InputIterator, last: InputIterator, val: T): InputIterator
	{
		let pred = function (x: T): boolean 
		{
			return equal_to(x, val);
		};
		return remove_if(first, last, pred);
	}

	export function remove_if<T, InputIterator extends General<IForwardIterator<T>>>
		(first: InputIterator, last: InputIterator, pred: (val: T) => boolean): InputIterator
	{
		let ret: InputIterator = first;

		while (!first.equals(last))
		{
			if (!pred(first.value))
			{
				ret.value = first.value;
				ret = ret.next() as InputIterator;
			}
			first = first.next() as InputIterator;
		}
		return ret;
	}

	export function remove_copy<T, InputIterator extends Readonly<IForwardIterator<T>>, OutputIterator extends Writeonly<IForwardIterator<T>>>
		(first: InputIterator, last: InputIterator, result: OutputIterator, val: T): OutputIterator
	{
		let pred = function (x: T): boolean 
		{
			return equal_to(x, val);
		};
		return remove_copy_if(first, last, result, pred);
	}

	export function remove_copy_if<T, InputIterator extends Readonly<IForwardIterator<T>>, OutputIterator extends Writeonly<IForwardIterator<T>>>
		(first: InputIterator, last: InputIterator, result: OutputIterator, pred: (x: T) => boolean): OutputIterator
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
	export function replace<T, InputIterator extends General<IForwardIterator<T>>>
		(first: InputIterator, last: InputIterator, old_val: T, new_val: T): void
	{
		let pred = function (x: T): boolean
		{
			return std.equal_to(x, old_val);
		};
		return replace_if(first, last, pred, new_val);
	}

	export function replace_if<T, InputIterator extends General<IForwardIterator<T>>>
		(first: InputIterator, last: InputIterator, pred: (val: T) => boolean, new_val: T): void
	{
		for (let it = first; !it.equals(last); it = it.next() as InputIterator)
			if (pred(it.value) == true)
				it.value = new_val;
	}

	export function replace_copy<T, InputIterator extends Readonly<IForwardIterator<T>>, OutputIterator extends Writeonly<IForwardIterator<T>>>
		(first: InputIterator, last: InputIterator, result: OutputIterator, old_val: T, new_val: T): OutputIterator
	{
		let pred = function (x: T): boolean
		{
			return std.equal_to(x, old_val);
		};
		return replace_copy_if(first, last, result, pred, new_val);
	}

	export function replace_copy_if<T, InputIterator extends Readonly<IForwardIterator<T>>, OutputIterator extends Writeonly<IForwardIterator<T>>>
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

	export function iter_swap<T, ForwardIterator1 extends General<IForwardIterator<T>>, ForwardIterator2 extends General<IForwardIterator<T>>>
		(x: ForwardIterator1, y: ForwardIterator2): void
	{
		[x.value, y.value] = [y.value, x.value];
	}

	export function swap_ranges<T, ForwardIterator1 extends General<IForwardIterator<T>>, ForwardIterator2 extends General<IForwardIterator<T>>>
		(first1: ForwardIterator1, last1: ForwardIterator1, first2: ForwardIterator2): ForwardIterator2
	{
		for (; !first1.equals(last1); first1 = first1.next() as ForwardIterator1)
		{
			iter_swap(first1, first2);
			first2 = first2.next() as ForwardIterator2;
		}
		return first2;
	}

	/* ---------------------------------------------------------
		RE-ARRANGEMENT
	--------------------------------------------------------- */
	export function reverse<T, BidirectionalIterator extends General<IBidirectionalIterator<T>>>
		(first: BidirectionalIterator, last: BidirectionalIterator): void
	{
		// first != last && first != --last
		while (first.equals(last) == false && first.equals((last = last.prev() as BidirectionalIterator)) == false)
		{
			iter_swap(first, last);
			first = first.next() as BidirectionalIterator;
		}
	}

	export function reverse_copy<T, BidirectionalIterator extends Readonly<IBidirectionalIterator<T>>, OutputIterator extends Writeonly<IForwardIterator<T>>>
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

	export function rotate<T, InputIterator extends General<IForwardIterator<T>>>
		(first: InputIterator, middle: InputIterator, last: InputIterator): InputIterator
	{
		let next: InputIterator = middle;

		while (next.equals(last) == false)
		{
			iter_swap(first, next);

			first = first.next() as InputIterator;
			next = next.next() as InputIterator;

			if (first.equals(middle))
				break;
		}

		return first;
	}

	export function rotate_copy<T, ForwardIterator extends Readonly<IForwardIterator<T>>, OutputIterator extends Writeonly<IForwardIterator<T>>>
		(first: ForwardIterator, middle: ForwardIterator, last: ForwardIterator, result: OutputIterator): OutputIterator
	{
		result = copy(middle, last, result);
		return copy(first, middle, result);
	}

	export function shuffle<T, RandomAccessIterator extends General<IRandomAccessIterator<T>>>
		(first: RandomAccessIterator, last: RandomAccessIterator): void
	{
		for (let it = first; !it.equals(last); it = it.next() as RandomAccessIterator)
		{
			let rand_index: number = randint(first.index(), last.index() - 1);
			iter_swap(it, first.advance(rand_index));
		}
	}
}