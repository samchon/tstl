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
	/**
	 * Copy elements in range.
	 * 
	 * @param first Input iteartor of the first position.
	 * @param last Input iterator of the last position.
	 * @param output Output iterator of the first position.
	 * 
	 * @return Output Iterator to the last position by advancing.
	 */
	export function copy<T, 
			InputIterator extends Readonly<IForwardIterator<T, InputIterator>>, 
			OutputIterator extends Writeonly<IForwardIterator<T, OutputIterator>>>
		(first: InputIterator, last: InputIterator, output: OutputIterator): OutputIterator
	{
		for (; !first.equals(last); first = first.next())
		{
			output.value = first.value;
			output = output.next();
		}
		return output;
	}

	/**
	 * Copy *n* elements.
	 * 
	 * @param first Input iteartor of the first position.
	 * @param n Number of elements to copy.
	 * @param output Output iterator of the first position.
	 * 
	 * @return Output Iterator to the last position by advancing.
	 */
	export function copy_n<T, 
			InputIterator extends Readonly<IForwardIterator<T, InputIterator>>, 
			OutputIterator extends Writeonly<IForwardIterator<T, OutputIterator>>>
		(first: InputIterator, n: number, output: OutputIterator): OutputIterator
	{
		for (let i: number = 0; i < n; i++)
		{
			output.value = first.value;

			first = first.next();
			output = output.next();
		}
		return output;
	}

	/**
	 * Copy specific elements by a condition.
	 * 
	 * @param first Input iteartor of the first position.
	 * @param last Input iterator of the last position.
	 * @param output Output iterator of the first position.
	 * @param pred A function predicates the specific condition.
	 * 
	 * @return Output Iterator to the last position by advancing.
	 */
	export function copy_if<T, 
			InputIterator extends Readonly<IForwardIterator<T, InputIterator>>, 
			OutputIterator extends Writeonly<IForwardIterator<T, OutputIterator>>>
		(first: InputIterator, last: InputIterator, output: OutputIterator, pred: (x: T) => boolean): OutputIterator
	{
		for (; !first.equals(last); first = first.next())
		{
			if (!pred(first.value))
				continue;

			output.value = first.value;
			output = output.next();
		}
		return output;
	}

	/**
	 * Copy elements reversely.
	 * 
	 * @param first Input iteartor of the first position.
	 * @param last Input iterator of the last position.
	 * @param output Output iterator of the first position.
	 * 
	 * @return Output Iterator to the last position by advancing.
	 */
	export function copy_backward<T, 
			BidirectionalIterator1 extends Readonly<IBidirectionalIterator<T, BidirectionalIterator1>>, 
			BidirectionalIterator2 extends Writeonly<IBidirectionalIterator<T, BidirectionalIterator2>>>
		(first: BidirectionalIterator1, last: BidirectionalIterator1, output: BidirectionalIterator2): BidirectionalIterator2
	{
		last = last.prev();

		for (; !last.equals(first); last = last.prev())
		{
			output.value = last.value;
			output = output.prev();
		}
		return output;
	}

	/**
	 * Fill range elements
	 * 
	 * @param first Input iteartor of the first position.
	 * @param last Input iterator of the last position.
	 * @param val The value to fill.
	 * 
	 * @return Output Iterator to the last position by advancing.
	 */
	export function fill<T, ForwardIterator extends Writeonly<IForwardIterator<T, ForwardIterator>>>
		(first: ForwardIterator, last: ForwardIterator, val: T): void
	{
		for (; !first.equals(last); first = first.next())
			first.value = val;
	}

	/**
	 * Fill *n* elements.
	 * 
	 * @param first Input iteartor of the first position.
	 * @param n Number of elements to fill.
	 * @param val The value to fill.
	 * 
	 * @return Output Iterator to the last position by advancing.
	 */
	export function fill_n<T, OutputIterator extends Writeonly<IForwardIterator<T, OutputIterator>>>
		(first: OutputIterator, n: number, val: T): OutputIterator
	{
		for (let i: number = 0; i < n; i++)
		{
			first.value = val;
			first = first.next();
		}
		return first;
	}

	/**
	 * Transform elements.
	 * 
	 * @param first Input iteartor of the first position.
	 * @param last Input iterator of the last position.
	 * @param output Output iterator of the first position.
	 * @param op Unary function determines the transform.
	 * 
	 * @return Output Iterator to the last position by advancing.
	 */
	export function transform<T, Ret, 
			InputIterator extends Readonly<IForwardIterator<T, InputIterator>>, 
			OutputIterator extends Writeonly<IForwardIterator<Ret, OutputIterator>>>
		(first: InputIterator, last: InputIterator, result: OutputIterator, op: (val: T) => Ret): OutputIterator;

	/**
	 * Transform elements.
	 * 
	 * @param first1 Input iteartor of the first position of the 1st range.
	 * @param last1 Input iterator of the last position of the 1st range.
	 * @param first2 Input iterator of the first position of the 2nd range.
	 * @param output Output iterator of the first position.
	 * @param op Binary function determines the transform.
	 * 
	 * @return Output Iterator to the last position by advancing.
	 */
	export function transform<T, Ret,
			InputIterator1 extends Readonly<IForwardIterator<T, InputIterator1>>,
			InputIterator2 extends Readonly<IForwardIterator<T, InputIterator2>>, 
			OutputIterator extends Writeonly<IForwardIterator<Ret, OutputIterator>>>
		(
			first1: InputIterator1, last1: InputIterator1, 
			first2: InputIterator2, 
			result: OutputIterator, 
			binary_op: (x: T, y: T) => Ret
		): OutputIterator;

	export function transform(...args: any[]): any
	{
		if (args.length == 4)
			return _Unary_transform.apply(null, args);
		else // args: #5
			return _Binary_transform.apply(null, args);
	}

	/**
	 * @hidden
	 */
	function _Unary_transform<T, Ret, 
			InputIterator extends Readonly<IForwardIterator<T, InputIterator>>, 
			OutputIterator extends Writeonly<IForwardIterator<Ret, OutputIterator>>>
		(first: InputIterator, last: InputIterator, result: OutputIterator, op: (val: T) => Ret): OutputIterator
	{
		for (; !first.equals(last); first = first.next())
		{
			result.value = op(first.value);
			result = result.next();
		}
		return result;
	}

	/**
	 * @hidden
	 */
	function _Binary_transform<T, Ret,
			InputIterator1 extends Readonly<IForwardIterator<T, InputIterator1>>,
			InputIterator2 extends Readonly<IForwardIterator<T, InputIterator2>>, 
			OutputIterator extends Writeonly<IForwardIterator<Ret, OutputIterator>>>
		(
			first1: InputIterator1, last1: InputIterator1, first2: InputIterator2, 
			result: OutputIterator, binary_op: (x: T, y: T) => Ret
		): OutputIterator
	{
		while (!first1.equals(last1))
		{
			result.value = binary_op(first1.value, first2.value);

			first1 = first1.next();
			first2 = first2.next();
			result = result.next();
		}
		return result;
	}

	/**
	 * Generate range elements.
	 * 
	 * @param first Forward iteartor of the first position.
	 * @param last Forward iterator of the last position.
	 * @param gen The generator function.
	 */
	export function generate<T, ForwardIterator extends Writeonly<IForwardIterator<T, ForwardIterator>>>
		(first: ForwardIterator, last: ForwardIterator, gen: () => T): void
	{
		for (; !first.equals(last); first = first.next())
			first.value = gen();
	}

	/**
	 * Generate *n* elements.
	 * 
	 * @param first Forward iteartor of the first position.
	 * @param n Number of elements to generate.
	 * @param gen The generator function.
	 * 
	 * @return Forward Iterator to the last position by advancing.
	 */
	export function generate_n<T, ForwardIterator extends Writeonly<IForwardIterator<T, ForwardIterator>>>
		(first: ForwardIterator, n: number, gen: () => T): ForwardIterator
	{
		while (n-- > 0)
		{
			first.value = gen();
			first = first.next();
		}
		return first;
	}

	/* ---------------------------------------------------------
		REMOVE
	--------------------------------------------------------- */
	/**
	 * Remove duplicated elements in sorted range.
	 * 
	 * @param first Input iteartor of the first position.
	 * @param last Input iterator of the last position.
	 * @param pred A binary function predicates two arguments are equal. Default is {@link equal_to}.
	 * 
	 * @return Input iterator to the last element not removed.
	 */
	export function unique<T, InputIterator extends General<IForwardIterator<T, InputIterator>>>
		(first: InputIterator, last: InputIterator, pred: (x: T, y: T) => boolean = equal_to): InputIterator
	{
		if (first.equals(last))
			return last;

		let ret: InputIterator = first;
		for (first = first.next(); !first.equals(last); first = first.next())
			if (!pred(ret.value, first.value))
			{
				ret = ret.next();
				ret.value = first.value;
			}
		return ret.next();
	}

	export function unique_copy<T, 
			InputIterator extends Readonly<IForwardIterator<T, InputIterator>>, 
			OutputIterator extends Writeonly<IForwardIterator<T, OutputIterator>>>
		(
			first: InputIterator, last: InputIterator, result: OutputIterator, 
			pred: (x: T, y: T) => boolean = equal_to
		): OutputIterator
	{
		if (first.equals(last))
			return result;

		result.value = first.value;
		first = first.next();

		for (; !first.equals(last); first = first.next())
			if (!pred(first.value, result.value))
			{
				result = result.next();
				result.value = first.value;
			}
		return result.next();
	}

	export function remove<T, InputIterator extends General<IForwardIterator<T, InputIterator>>>
		(first: InputIterator, last: InputIterator, val: T): InputIterator
	{
		let pred = function (x: T): boolean 
		{
			return equal_to(x, val);
		};
		return remove_if(first, last, pred);
	}

	export function remove_if<T, InputIterator extends General<IForwardIterator<T, InputIterator>>>
		(first: InputIterator, last: InputIterator, pred: (val: T) => boolean): InputIterator
	{
		let ret: InputIterator = first;

		while (!first.equals(last))
		{
			if (!pred(first.value))
			{
				ret.value = first.value;
				ret = ret.next();
			}
			first = first.next();
		}
		return ret;
	}

	export function remove_copy<T, 
			InputIterator extends Readonly<IForwardIterator<T, InputIterator>>, 
			OutputIterator extends Writeonly<IForwardIterator<T, OutputIterator>>>
		(first: InputIterator, last: InputIterator, result: OutputIterator, val: T): OutputIterator
	{
		let pred = function (x: T): boolean 
		{
			return equal_to(x, val);
		};
		return remove_copy_if(first, last, result, pred);
	}

	export function remove_copy_if<T, 
			InputIterator extends Readonly<IForwardIterator<T, InputIterator>>, 
			OutputIterator extends Writeonly<IForwardIterator<T, OutputIterator>>>
		(first: InputIterator, last: InputIterator, result: OutputIterator, pred: (x: T) => boolean): OutputIterator
	{
		for (; !first.equals(last); first = first.next())
		{
			if (pred(first.value))
				continue;

			result.value = first.value;
			result = result.next();
		}

		return result;
	}

	/* ---------------------------------------------------------
		REPLACE & SWAP
	--------------------------------------------------------- */
	export function replace<T, InputIterator extends General<IForwardIterator<T, InputIterator>>>
		(first: InputIterator, last: InputIterator, old_val: T, new_val: T): void
	{
		let pred = function (x: T): boolean
		{
			return std.equal_to(x, old_val);
		};
		return replace_if(first, last, pred, new_val);
	}

	export function replace_if<T, InputIterator extends General<IForwardIterator<T, InputIterator>>>
		(first: InputIterator, last: InputIterator, pred: (val: T) => boolean, new_val: T): void
	{
		for (let it = first; !it.equals(last); it = it.next())
			if (pred(it.value) == true)
				it.value = new_val;
	}

	export function replace_copy<T, 
			InputIterator extends Readonly<IForwardIterator<T, InputIterator>>, 
			OutputIterator extends Writeonly<IForwardIterator<T, OutputIterator>>>
		(first: InputIterator, last: InputIterator, result: OutputIterator, old_val: T, new_val: T): OutputIterator
	{
		let pred = function (x: T): boolean
		{
			return std.equal_to(x, old_val);
		};
		return replace_copy_if(first, last, result, pred, new_val);
	}

	export function replace_copy_if<T, 
			InputIterator extends Readonly<IForwardIterator<T, InputIterator>>, 
			OutputIterator extends Writeonly<IForwardIterator<T, OutputIterator>>>
		(first: InputIterator, last: InputIterator, result: OutputIterator, pred: (val: T) => boolean, new_val: T): OutputIterator
	{
		for (; !first.equals(last); first = first.next())
		{
			if (pred(first.value))
				result.value = new_val;
			else
				result.value = first.value;

			result = result.next();
		}

		return result;
	}

	export function iter_swap<T, 
			ForwardIterator1 extends General<IForwardIterator<T, ForwardIterator1>>, 
			ForwardIterator2 extends General<IForwardIterator<T, ForwardIterator2>>>
		(x: ForwardIterator1, y: ForwardIterator2): void
	{
		[x.value, y.value] = [y.value, x.value];
	}

	export function swap_ranges<T, 
			ForwardIterator1 extends General<IForwardIterator<T, ForwardIterator1>>, 
			ForwardIterator2 extends General<IForwardIterator<T, ForwardIterator2>>>
		(first1: ForwardIterator1, last1: ForwardIterator1, first2: ForwardIterator2): ForwardIterator2
	{
		for (; !first1.equals(last1); first1 = first1.next())
		{
			iter_swap(first1, first2);
			first2 = first2.next();
		}
		return first2;
	}

	/* ---------------------------------------------------------
		RE-ARRANGEMENT
	--------------------------------------------------------- */
	export function reverse<T, BidirectionalIterator extends General<IBidirectionalIterator<T, BidirectionalIterator>>>
		(first: BidirectionalIterator, last: BidirectionalIterator): void
	{
		// first != last && first != --last
		while (first.equals(last) == false && first.equals((last = last.prev())) == false)
		{
			iter_swap(first, last);
			first = first.next();
		}
	}

	export function reverse_copy<T, 
			BidirectionalIterator extends Readonly<IBidirectionalIterator<T, BidirectionalIterator>>, 
			OutputIterator extends Writeonly<IForwardIterator<T, OutputIterator>>>
		(first: BidirectionalIterator, last: BidirectionalIterator, result: OutputIterator): OutputIterator
	{
		while (!last.equals(first))
		{
			last = last.prev();

			result.value = last.value;
			result = result.next();
		}
		return result;
	}

	export function rotate<T, InputIterator extends General<IForwardIterator<T, InputIterator>>>
		(first: InputIterator, middle: InputIterator, last: InputIterator): InputIterator
	{
		let next: InputIterator = middle;

		while (next.equals(last) == false)
		{
			iter_swap(first, next);

			first = first.next();
			next = next.next();

			if (first.equals(middle))
				break;
		}

		return first;
	}

	export function rotate_copy<T, 
			ForwardIterator extends Readonly<IForwardIterator<T, ForwardIterator>>, 
			OutputIterator extends Writeonly<IForwardIterator<T, OutputIterator>>>
		(first: ForwardIterator, middle: ForwardIterator, last: ForwardIterator, result: OutputIterator): OutputIterator
	{
		result = copy(middle, last, result);
		return copy(first, middle, result);
	}

	export function shuffle<T, RandomAccessIterator extends General<IRandomAccessIterator<T, RandomAccessIterator>>>
		(first: RandomAccessIterator, last: RandomAccessIterator): void
	{
		for (let it = first; !it.equals(last); it = it.next())
		{
			let rand_index: number = randint(first.index(), last.index() - 1);
			iter_swap(it, first.advance(rand_index));
		}
	}
}