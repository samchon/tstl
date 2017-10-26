/// <reference path="../API.ts" />

namespace std
{
	/* =========================================================
		PARTITION
	========================================================= */
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

	export function stable_partition<T, BidirectionalIterator extends base.Iterator<T>>
		(first: BidirectionalIterator, last: BidirectionalIterator, pred: (x: T) => boolean): BidirectionalIterator
	{
		return partition(first, last, pred);
	}

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