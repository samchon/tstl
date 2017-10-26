/// <reference path="../API.ts" />

namespace std
{
	/* =========================================================
		MATHMATICS
			- MIN & MAX
			- PERMUTATION
			- MISCELLANEOUS
	============================================================
		MIN & MAX
	--------------------------------------------------------- */
	export function min<T>(...args: T[]): T
	{
		let minimum: T = args[0];

		for (let i: number = 1; i < args.length; i++)
			if (less(args[i], minimum))
				minimum = args[i];

		return minimum;
	}

	export function max<T>(...args: T[]): T
	{
		let maximum: T = args[0];

		for (let i: number = 1; i < args.length; i++)
			if (greater(args[i], maximum))
				maximum = args[i];

		return maximum;
	}

	export function minmax<T>(...args: T[]): Pair<T, T>
	{
		let minimum: T = args[0];
		let maximum: T = args[0];

		for (let i: number = 1; i < args.length; i++)
		{
			if (less(args[i], minimum))
				minimum = args[i];
			if (greater(args[i], maximum))
				maximum = args[i];
		}

		return make_pair(minimum, maximum);
	}
	
	export function min_element<T, ForwardIterator extends IForwardIterator<T>>
		(first: ForwardIterator, last: ForwardIterator): ForwardIterator;

	export function min_element<T, ForwardIterator extends IForwardIterator<T>>
		(first: ForwardIterator, last: ForwardIterator, compare: (x: T, y: T) => boolean): ForwardIterator;

	export function min_element<T, ForwardIterator extends IForwardIterator<T>>
		(first: ForwardIterator, last: ForwardIterator, compare: (x: T, y: T) => boolean = less): ForwardIterator
	{
		let smallest: ForwardIterator = first;
		first = first.next() as ForwardIterator;
		
		for (; !first.equals(last); first = first.next() as ForwardIterator)
			if (compare(first.value, smallest.value))
				smallest = first;

		return smallest;
	}

	export function max_element<T, ForwardIterator extends IForwardIterator<T>>
		(first: ForwardIterator, last: ForwardIterator): ForwardIterator;

	export function max_element<T, ForwardIterator extends IForwardIterator<T>>
		(first: ForwardIterator, last: ForwardIterator, compare: (x: T, y: T) => boolean): ForwardIterator;

	export function max_element<T, ForwardIterator extends IForwardIterator<T>>
		(first: ForwardIterator, last: ForwardIterator, compare: (x: T, y: T) => boolean = greater): ForwardIterator
	{
		let largest: ForwardIterator = first;
		first = first.next() as ForwardIterator;

		for (; !first.equals(last); first = first.next() as ForwardIterator)
			if (compare(first.value, largest.value))
				largest = first;

		return largest;
	}

	export function minmax_element<T, ForwardIterator extends IForwardIterator<T>>
		(first: ForwardIterator, last: ForwardIterator): Pair<ForwardIterator, ForwardIterator>;

	export function minmax_element<T, ForwardIterator extends IForwardIterator<T>>
		(
			first: ForwardIterator, last: ForwardIterator, compare: (x: T, y: T) => boolean
		): Pair<ForwardIterator, ForwardIterator>;

	export function minmax_element<T, ForwardIterator extends IForwardIterator<T>>
		(
			first: ForwardIterator, last: ForwardIterator, compare: (x: T, y: T) => boolean = greater
		): Pair<ForwardIterator, ForwardIterator>
	{
		let smallest: ForwardIterator = first;
		let largest: ForwardIterator = first;

		first = first.next() as ForwardIterator;
		for (; !first.equals(last); first = first.next() as ForwardIterator)
		{
			if (compare(first.value, smallest.value)) // first is less than the smallest.
				smallest = first;
			if (!compare(first.value, largest.value)) // first is not less than the largest.
				largest = first;
		}

		return make_pair(smallest, largest);
	}

	export function clamp<T>(v: T, lo: T, hi: T): T;

	export function clamp<T>(v: T, lo: T, hi: T, comp: (x: T, y: T) => boolean): T;

	export function clamp<T>(v: T, lo: T, hi: T, comp: (x: T, y: T) => boolean = less): T
	{
		let vec: Vector<T> = new Vector<T>([v, lo, hi]);
		sort(vec.begin(), vec.end(), comp);

		return vec.at(1);
	}

	/* ---------------------------------------------------------
		PERMUATATIONS
	--------------------------------------------------------- */
	export function is_permutation<T, Iterator1 extends IForwardIterator<T>, Iterator2 extends IForwardIterator<T>>
		(first1: Iterator1, last1: Iterator1, first2: Iterator2): boolean;

	export function is_permutation<T, Iterator1 extends IForwardIterator<T>, Iterator2 extends IForwardIterator<T>>
		(
			first1: Iterator1, last1: Iterator1, first2: Iterator2,
			pred: (x: T, y: T) => boolean
		): boolean;

	export function is_permutation<T, Iterator1 extends IForwardIterator<T>, Iterator2 extends IForwardIterator<T>>
		(
			first1: Iterator1, last1: Iterator1, first2: Iterator2,
			pred: (x: T, y: T) => boolean = equal_to
		): boolean
	{
		// find the mismatched
		let pair: Pair<Iterator1, Iterator2> = mismatch(first1, last1, first2);
		first1 = pair.first;
		first2 = pair.second;

		if (first1.equals(last1))
			return true;

		let last2: Iterator2 = first2.advance(distance(first1, last1)) as Iterator2;

		for (let it = first1; !it.equals(last1); it = it.next() as Iterator1)
			if (find(first1, it, it.value).equals(it))
			{
				let n: number = count(first2, last2, it.value);
				if (n == 0 || count(it, last1, it.value) != n)
					return false;
			}
		return true;
	}

	export function prev_permutation<T, BidirectionalIterator extends base.IArrayIterator<T>>
		(first: BidirectionalIterator, last: BidirectionalIterator): boolean;

	export function prev_permutation<T, BidirectionalIterator extends base.IArrayIterator<T>>
		(first: BidirectionalIterator, last: BidirectionalIterator, compare: (x: T, y: T) => boolean): boolean;

	export function prev_permutation<T, BidirectionalIterator extends base.IArrayIterator<T>>
		(first: BidirectionalIterator, last: BidirectionalIterator, compare: (x: T, y: T) => boolean = less): boolean
	{
		if (first.equals(last) == true)
			return false;

		let i: BidirectionalIterator = last.prev() as BidirectionalIterator;
		if (first.equals(i) == true)
			return false;

		while (true)
		{
			let x: BidirectionalIterator = i;
			let y: BidirectionalIterator;

			i = i.prev() as BidirectionalIterator;
			if (compare(x.value, i.value) == true)
			{
				y = last.prev() as BidirectionalIterator;
				while (compare(y.value, i.value) == false)
					y = y.prev() as BidirectionalIterator;
				
				iter_swap(i, y);
				reverse(x, last);
				return true;
			}

			if (i.equals(first) == true)
			{
				reverse(first, last);
				return false;
			}
		}
	}

	export function next_permutation<T, BidirectionalIterator extends base.IArrayIterator<T>>
		(first: BidirectionalIterator, last: BidirectionalIterator): boolean;

	export function next_permutation<T, BidirectionalIterator extends base.IArrayIterator<T>>
		(first: BidirectionalIterator, last: BidirectionalIterator, compare: (x: T, y: T) => boolean): boolean;

	export function next_permutation<T, BidirectionalIterator extends base.IArrayIterator<T>>
		(first: BidirectionalIterator, last: BidirectionalIterator, compare: (x: T, y: T) => boolean = less): boolean
	{
		if (first.equals(last) == true)
			return false;

		let i: BidirectionalIterator = last.prev() as BidirectionalIterator;
		if (first.equals(i) == true)
			return false;

		while (true)
		{
			let x: BidirectionalIterator = i;
			let y: BidirectionalIterator;

			i = i.prev() as BidirectionalIterator;
			if (compare(i.value, x.value) == true)
			{
				y = last.prev() as BidirectionalIterator;
				while (compare(i.value, y.value) == false)
					y = y.prev() as BidirectionalIterator;
				
				iter_swap(i, y);
				reverse(x, last);
				return true;
			}

			if (i.equals(first) == true)
			{
				reverse(first, last);
				return false;
			}
		}
	}
}