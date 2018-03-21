/// <reference path="../API.ts" />

namespace std
{
	/* =========================================================
		PARTITION
	========================================================= */
	/**
	 * Test whether a range is partitioned.
	 * 
	 * @param first Forward iterator of the first position.
	 * @param last Forward iterator of the last position.
	 * @param pred An unary function predicates partition. Returns `true`, if an element belongs to the first section, otherwise `false` which means the element belongs to the second section.
	 * 
	 * @return Whether the range is partition or not.
	 */
	export function is_partitioned<T, ForwardIterator extends Readonly<IForwardIterator<T, ForwardIterator>>>
		(first: ForwardIterator, last: ForwardIterator, pred: (x: T) => boolean): boolean
	{
		while (!first.equals(last) && pred(first.value))
			first = first.next();

		for (; !first.equals(last); first = first.next())
			if (pred(first.value))
				return false;

		return true;
	}

	/**
	 * Get partition point.
	 * 
	 * @param first Forward iterator of the first position.
	 * @param last Forward iterator of the last position.
	 * @param pred An unary function predicates partition. Returns `true`, if an element belongs to the first section, otherwise `false` which means the element belongs to the second section.
	 * 
	 * @return Iterator to the first element of the second section.
	 */
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

	/**
	 * Partition a range into two sections.
	 * 
	 * @param first Bidirectional iterator of the first position.
	 * @param last Bidirectional iterator of the last position.
	 * @param pred An unary function predicates partition. Returns `true`, if an element belongs to the first section, otherwise `false` which means the element belongs to the second section.
	 * 
	 * @return Iterator to the first element of the second section.
	 */
	export function partition<T, BidirectionalIterator extends General<IBidirectionalIterator<T, BidirectionalIterator>>>
		(first: BidirectionalIterator, last: BidirectionalIterator, pred: (x: T) => boolean): BidirectionalIterator
	{
		return stable_partition(first, last, pred);
	}

	/**
	 * Partition a range into two sections with stable ordering.
	 * 
	 * @param first Bidirectional iterator of the first position.
	 * @param last Bidirectional iterator of the last position.
	 * @param pred An unary function predicates partition. Returns `true`, if an element belongs to the first section, otherwise `false` which means the element belongs to the second section.
	 * 
	 * @return Iterator to the first element of the second section.
	 */
	export function stable_partition<T, BidirectionalIterator extends General<IBidirectionalIterator<T, BidirectionalIterator>>>
		(first: BidirectionalIterator, last: BidirectionalIterator, pred: (x: T) => boolean): BidirectionalIterator
	{
		while (!first.equals(last) && pred(first.value))
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

	/**
	 * Partition a range into two outputs.
	 * 
	 * @param first Bidirectional iterator of the first position.
	 * @param last Bidirectional iterator of the last position.
	 * @param output_true Output iterator to the first position for the first section.
	 * @param output_false Output iterator to the first position for the second section.
	 * @param pred An unary function predicates partition. Returns `true`, if an element belongs to the first section, otherwise `false` which means the element belongs to the second section.
	 * 
	 * @return Iterator to the first element of the second section.
	 */
	export function partition_copy<T, 
			InputIterator extends Readonly<IForwardIterator<T, InputIterator>>, 
			OutputIterator1 extends Writeonly<IForwardIterator<T, OutputIterator1>>, 
			OutputIterator2 extends Writeonly<IForwardIterator<T, OutputIterator2>>>
		(
			first: InputIterator, last: InputIterator, 
			output_true: OutputIterator1, 
			output_false: OutputIterator2, 
			pred: (val: T) => T
		): Pair<OutputIterator1, OutputIterator2>
	{
		for (; !first.equals(last); first = first.next())
			if (pred(first.value))
			{
				output_true.value = first.value;
				output_true = output_true.next();
			}
			else
			{
				output_false.value = first.value;
				output_false = output_false.next();
			}
		return make_pair(output_true, output_false);
	}
}