import { IForwardIterator } from "../iterators/IForwardIterator";

import { less, equal_to } from "../functional/comparisons";
import { advance, distance } from "../iterators/global";
import { Pair } from "../utilities/Pair";

/* =========================================================
	ITERATIONS (NON-MODIFYING SEQUENCE)
		- FOR_EACH
		- AGGREGATE CONDITIONS
		- FINDERS
		- COUNTERS
============================================================
	FOR_EACH
--------------------------------------------------------- */
export function for_each<T,
		InputIterator extends Readonly<IForwardIterator<T, InputIterator>>,
		Func extends (val: T) => void>
	(first: InputIterator, last: InputIterator, fn: Func): Func
{
	for (let it = first; !it.equals(last); it = it.next())
		fn(it.value);

	return fn;
}

export function for_each_n<T, 
		InputIterator extends Readonly<IForwardIterator<T, InputIterator>>,
		Func extends (val: T) => void>
	(first: InputIterator, n: number, fn: Func): InputIterator
{
	for (let i: number = 0; i < n; ++i)
	{
		fn(first.value);
		first = first.next();
	}
	return first;
}

/* ---------------------------------------------------------
	AGGREGATE CONDITIONS
--------------------------------------------------------- */
export function all_of<T, InputIterator extends Readonly<IForwardIterator<T, InputIterator>>>
	(first: InputIterator, last: InputIterator, pred: (val: T) => boolean): boolean
{
	for (let it = first; !it.equals(last); it = it.next())
		if (pred(it.value) == false)
			return false;

	return true;
}

export function any_of<T, InputIterator extends Readonly<IForwardIterator<T, InputIterator>>>
	(first: InputIterator, last: InputIterator, pred: (val: T) => boolean): boolean
{
	for (let it = first; !it.equals(last); it = it.next())
		if (pred(it.value) == true)
			return true;

	return false;
}

export function none_of<T, InputIterator extends Readonly<IForwardIterator<T, InputIterator>>>
	(first: InputIterator, last: InputIterator, pred: (val: T) => boolean): boolean
{
	return !any_of(first, last, pred);
}

export function equal<T, 
		InputIterator1 extends Readonly<IForwardIterator<T, InputIterator1>>,
		InputIterator2 extends Readonly<IForwardIterator<T, InputIterator2>>>
	(first1: InputIterator1, last1: InputIterator1, first2: InputIterator2): boolean;

export function equal<T, 
		InputIterator1 extends Readonly<IForwardIterator<T, InputIterator1>>,
		InputIterator2 extends Readonly<IForwardIterator<T, InputIterator2>>>
	(
		first1: InputIterator1, last1: InputIterator1, first2: InputIterator2,
		pred: (x: T, y: T) => boolean
	): boolean;

export function equal<T, 
		InputIterator1 extends Readonly<IForwardIterator<T, InputIterator1>>,
		InputIterator2 extends Readonly<IForwardIterator<T, InputIterator2>>>
	(
		first1: InputIterator1, last1: InputIterator1, first2: InputIterator2,
		pred: (x: T, y: T) => boolean = equal_to
	): boolean
{
	while (!first1.equals(last1))
		if (!pred(first1.value, first2.value))
			return false;
		else
		{
			first1 = first1.next();
			first2 = first2.next();
		}
	return true;
}

export function lexicographical_compare<T, 
		Iterator1 extends Readonly<IForwardIterator<T, Iterator1>>, 
		Iterator2 extends Readonly<IForwardIterator<T, Iterator2>>>
	(first1: Iterator1, last1: Iterator1, first2: Iterator2, last2: Iterator2): boolean;

export function lexicographical_compare<T, 
		Iterator1 extends Readonly<IForwardIterator<T, Iterator1>>, 
		Iterator2 extends Readonly<IForwardIterator<T, Iterator2>>>
	(
		first1: Iterator1, last1: Iterator1, first2: Iterator2, last2: Iterator2, 
		comp: (x: T, y: T) => boolean
	) : boolean;

export function lexicographical_compare<T, 
		Iterator1 extends Readonly<IForwardIterator<T, Iterator1>>, 
		Iterator2 extends Readonly<IForwardIterator<T, Iterator2>>>
	(
		first1: Iterator1, last1: Iterator1, first2: Iterator2, last2: Iterator2,
		comp: (x: T, y: T) => boolean = less
	): boolean
{
	while (!first1.equals(last1))
		if (first2.equals(last2) || comp(first2.value, first1.value))
			return false;
		else if (comp(first1.value, first2.value))
			return true;
		else
		{
			first1 = first1.next();
			first2 = first2.next();
		}
		
	return !first2.equals(last2);
}

/* ---------------------------------------------------------
	FINDERS
--------------------------------------------------------- */
export function find<T, InputIterator extends Readonly<IForwardIterator<T, InputIterator>>>
	(first: InputIterator, last: InputIterator, val: T): InputIterator
{
	for (let it = first; !it.equals(last); it = it.next())
		if (equal_to(it.value, val))
			return it;

	return last;
}

export function find_if<T, InputIterator extends Readonly<IForwardIterator<T, InputIterator>>>
	(first: InputIterator, last: InputIterator, pred: (val: T) => boolean): InputIterator
{
	for (let it = first; !it.equals(last); it = it.next())
		if (pred(it.value))
			return it;

	return last;
}

export function find_if_not<T, InputIterator extends Readonly<IForwardIterator<T, InputIterator>>>
	(first: InputIterator, last: InputIterator, pred: (val: T) => boolean): InputIterator
{
	for (let it = first; !it.equals(last); it = it.next())
		if (pred(it.value) == false)
			return it;

	return last;
}

export function find_end<T, 
		Iterator1 extends Readonly<IForwardIterator<T, Iterator1>>, 
		Iterator2 extends Readonly<IForwardIterator<T, Iterator2>>>
	(first1: Iterator1, last1: Iterator1, first2: Iterator2, last2: Iterator2): Iterator1;

export function find_end<T, 
		Iterator1 extends Readonly<IForwardIterator<T, Iterator1>>, 
		Iterator2 extends Readonly<IForwardIterator<T, Iterator2>>>
	(
		first1: Iterator1, last1: Iterator1, first2: Iterator2, last2: Iterator2, 
		pred: (x: T, y: T) => boolean
	): Iterator1;

export function find_end<T, 
		Iterator1 extends Readonly<IForwardIterator<T, Iterator1>>, 
		Iterator2 extends Readonly<IForwardIterator<T, Iterator2>>>
	(
		first1: Iterator1, last1: Iterator1, first2: Iterator2, last2: Iterator2, 
		pred: (x: T, y: T) => boolean = equal_to
	): Iterator1
{
	if (first2.equals(last2))
		return last1;

	let ret: Iterator1 = last1;

	for (; !first1.equals(last1); first1 = first1.next())
	{
		let it1: Iterator1 = first1;
		let it2: Iterator2 = first2;

		while (pred(it1.value, it2.value))
		{
			it1 = it1.next();
			it2 = it2.next();

			if (it2.equals(last2))
			{
				ret = first1;
				break;
			}
			else if (it1.equals(last1))
				return ret;
		}
	}
	return ret;
}

export function find_first_of<T, 
		Iterator1 extends Readonly<IForwardIterator<T, Iterator1>>, 
		Iterator2 extends Readonly<IForwardIterator<T, Iterator2>>>
	(first1: Iterator1, last1: Iterator1, first2: Iterator2, last2: Iterator2): Iterator1;

export function find_first_of<T, 
		Iterator1 extends Readonly<IForwardIterator<T, Iterator1>>, 
		Iterator2 extends Readonly<IForwardIterator<T, Iterator2>>>
	(
		first1: Iterator1, last1: Iterator1, first2: Iterator2, last2: Iterator2,
		pred: (x: T, y: T) => boolean
	): Iterator1;

export function find_first_of<T, 
		Iterator1 extends Readonly<IForwardIterator<T, Iterator1>>, 
		Iterator2 extends Readonly<IForwardIterator<T, Iterator2>>>
	(
		first1: Iterator1, last1: Iterator1, first2: Iterator2, last2: Iterator2,
		pred: (x: T, y: T) => boolean = equal_to
	): Iterator1
{
	for (; !first1.equals(last1); first1 = first1.next())
		for (let it = first2; !it.equals(last2); it = it.next())
			if (pred(it.value, first1.value))
				return first1;

	return last1;
}

export function adjacent_find<T, InputIterator extends Readonly<IForwardIterator<T, InputIterator>>>
	(first: InputIterator, last: InputIterator): InputIterator;

export function adjacent_find<T, InputIterator extends Readonly<IForwardIterator<T, InputIterator>>>
	(first: InputIterator, last: InputIterator, pred: (x: T, y: T) => boolean): InputIterator;

export function adjacent_find<T, InputIterator extends Readonly<IForwardIterator<T, InputIterator>>>
	(first: InputIterator, last: InputIterator, pred: (x: T, y: T) => boolean = equal_to): InputIterator
{
	if (!first.equals(last))
	{
		let next: InputIterator = first.next();

		while (!next.equals(last))
		{
			if (pred(first.value, last.value))
				return first;

			first = first.next();
			next = next.next();
		}
	}
	return last;
}

export function search<T, 
		ForwardIterator1 extends Readonly<IForwardIterator<T, ForwardIterator1>>, 
		ForwardIterator2 extends Readonly<IForwardIterator<T, ForwardIterator2>>>
	(first1: ForwardIterator1, last1: ForwardIterator1, first2: ForwardIterator2, last2: ForwardIterator2): ForwardIterator1

export function search<T, 
		ForwardIterator1 extends Readonly<IForwardIterator<T, ForwardIterator1>>, 
		ForwardIterator2 extends Readonly<IForwardIterator<T, ForwardIterator2>>>
	(
		first1: ForwardIterator1, last1: ForwardIterator1, first2: ForwardIterator2, last2: ForwardIterator2,
		pred: (x: T, y: T) => boolean
	): ForwardIterator1

export function search<T, 
		ForwardIterator1 extends Readonly<IForwardIterator<T, ForwardIterator1>>, 
		ForwardIterator2 extends Readonly<IForwardIterator<T, ForwardIterator2>>>
	(
		first1: ForwardIterator1, last1: ForwardIterator1, first2: ForwardIterator2, last2: ForwardIterator2,
		pred: (x: T, y: T) => boolean = equal_to
	): ForwardIterator1
{
	if (first2.equals(last2))
		return first1;

	for (; !first1.equals(last1); first1 = first1.next())
	{
		let it1: ForwardIterator1 = first1;
		let it2: ForwardIterator2 = first2;

		while (pred(it1.value, it2.value))
		{
			it1 = it1.next();
			it2 = it2.next();

			if (it2.equals(last2))
				return first1;
			else if (it1.equals(last1))
				return last1;
		}
	}
	return last1;
}

export function search_n<T, ForwardIterator extends Readonly<IForwardIterator<T, ForwardIterator>>>
	(first: ForwardIterator, last: ForwardIterator, count: number, val: T): ForwardIterator;

export function search_n<T, ForwardIterator extends Readonly<IForwardIterator<T, ForwardIterator>>>
	(
		first: ForwardIterator, last: ForwardIterator, count: number, val: T, 
		pred: (x: T, y: T) => boolean
	): ForwardIterator;

export function search_n<T, ForwardIterator extends Readonly<IForwardIterator<T, ForwardIterator>>>
	(
		first: ForwardIterator, last: ForwardIterator, count: number, val: T, 
		pred: (x: T, y: T) => boolean = equal_to
	): ForwardIterator
{
	let limit: ForwardIterator = advance(first, distance(first, last) - count);

	for (; !first.equals(limit); first = first.next())
	{
		let it: ForwardIterator = first;
		let i: number = 0;

		while (pred(it.value, val))
		{
			it = it.next();

			if (++i == count)
				return first;
		}
	}
	return last;
}

export function mismatch<T, 
		Iterator1 extends Readonly<IForwardIterator<T, Iterator1>>, 
		Iterator2 extends Readonly<IForwardIterator<T, Iterator2>>>
	(first1: Iterator1, last1: Iterator1, first2: Iterator2): Pair<Iterator1, Iterator2>;

export function mismatch<T, 
		Iterator1 extends Readonly<IForwardIterator<T, Iterator1>>, 
		Iterator2 extends Readonly<IForwardIterator<T, Iterator2>>>
	(
		first1: Iterator1, last1: Iterator1, first2: Iterator2,
		compare: (x: T, y: T) => boolean
	): Pair<Iterator1, Iterator2>;

export function mismatch<T, 
		Iterator1 extends Readonly<IForwardIterator<T, Iterator1>>, 
		Iterator2 extends Readonly<IForwardIterator<T, Iterator2>>>
	(
		first1: Iterator1, last1: Iterator1, first2: Iterator2,
		pred: (x: T, y: T) => boolean = equal_to
	): Pair<Iterator1, Iterator2>
{
	while (!first1.equals(last1) && pred(first1.value, first2.value))
	{
		first1 = first1.next();
		first2 = first2.next();
	}
	return new Pair(first1, first2);
}

/* ---------------------------------------------------------
	COUNTERS
--------------------------------------------------------- */
export function count<T, InputIterator extends Readonly<IForwardIterator<T, InputIterator>>>
	(first: InputIterator, last: InputIterator, val: T): number
{
	let cnt: number = 0;

	for (let it = first; !it.equals(last); it = it.next())
		if (equal_to(it.value, val))
			cnt++;

	return cnt;
}

export function count_if<T, InputIterator extends Readonly<IForwardIterator<T, InputIterator>>>
	(first: InputIterator, last: InputIterator, pred: (val: T) => boolean): number
{
	let cnt: number = 0;

	for (let it = first; !it.equals(last); it = it.next())
		if (pred(it.value))
			cnt++;

	return cnt;
}