/// <reference path="../API.ts" />

namespace std
{
	/* =========================================================
		PARTITION
	========================================================= */
	export function is_partitioned<T, InputIterator extends Readonly<IForwardIterator<T, InputIterator>>>
		(first: InputIterator, last: InputIterator, pred: (x: T) => boolean): boolean
	{
		while (!first.equals(last) && pred(first.value))
			first = first.next();

		for (; !first.equals(last); first = first.next())
			if (pred(first.value))
				return false;

		return true;
	}

	export function partition<T, BidirectionalIterator extends General<IBidirectionalIterator<T, BidirectionalIterator>>>
		(first: BidirectionalIterator, last: BidirectionalIterator, pred: (x: T) => boolean): BidirectionalIterator
	{
		while (!first.equals(last))
		{
			while (pred(first.value))
			{
				first = first.next();
				if (first.equals(last))
					return first;
			}

			do
			{
				last = last.prev();
				if (first.equals(last))
					return first;
			} while (!pred(last.value));

			iter_swap(first, last);
			first = first.next();
		}

		return last;
	}

	export function stable_partition<T, BidirectionalIterator extends General<IBidirectionalIterator<T, BidirectionalIterator>>>
		(first: BidirectionalIterator, last: BidirectionalIterator, pred: (x: T) => boolean): BidirectionalIterator
	{
		return partition(first, last, pred);
	}

	export function partition_copy<T, 
			InputIterator extends Readonly<IForwardIterator<T, InputIterator>>, 
			OutputIterator1 extends Writeonly<IForwardIterator<T, OutputIterator1>>, 
			OutputIterator2 extends Writeonly<IForwardIterator<T, OutputIterator2>>>
		(
			first: InputIterator, last: InputIterator, 
			result_true: OutputIterator1, result_false: OutputIterator2, 
			pred: (val: T) => T
		): Pair<OutputIterator1, OutputIterator2>
	{
		for (; !first.equals(last); first = first.next())
			if (pred(first.value))
			{
				result_true.value = first.value;
				result_true = result_true.next();
			}
			else
			{
				result_false.value = first.value;
				result_false = result_false.next();
			}
		
		return make_pair(result_true, result_false);
	}

	export function partition_point<T, ForwardIterator extends Readonly<IForwardIterator<T, ForwardIterator>>>
		(first: ForwardIterator, last: ForwardIterator, pred: (x: T) => boolean): ForwardIterator
	{
		let n: number = distance(first, last);

		while (n > 0)
		{
			let step: number = Math.floor(n / 2);
			let it: ForwardIterator = advance(first, step);

			if (pred(it.value))
			{
				first = it.next();
				n -= step + 1;
			}
			else
				n = step;
		}
		return first;
	}
}