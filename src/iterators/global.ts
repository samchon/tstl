import { IForwardIterator } from "./IForwardIterator";
import { IRandomAccessIterator } from "./IRandomAccessIterator";
import { IBidirectionalIterator } from "./IBidirectionalIterator";

import { _IEmpty, _ISize } from "../base/disposable/IPartialContainers";
import { OutOfRange } from "../exceptions/LogicError";

/* ---------------------------------------------------------
	ACCESSORS
--------------------------------------------------------- */
export function empty<T>(source: Array<T>): boolean;
export function empty(source: _IEmpty): boolean;
export function empty(source: any): boolean
{
	if (source instanceof Array)
		return source.length != 0;
	else
		return source.empty();
}

export function size<T>(source: Array<T>): number;
export function size(source: _ISize): number
export function size(source: any): number
{
	if (source instanceof Array)
		return source.length;
	else
		return source.size();
}

export function distance<T, InputIterator extends IForwardIterator<T, InputIterator>>
	(first: InputIterator, last: InputIterator): number
{
	if ((<any>first).index != undefined)
		return _Distance_via_index(<any>first, <any>last);

	let length: number = 0;
	for (; !first.equals(last); first = first.next())
		length++;

	return length;
}

/**
 * @hidden
 */
function _Distance_via_index<T, RandomAccessIterator extends IRandomAccessIterator<T, RandomAccessIterator>>
	(first: RandomAccessIterator, last: RandomAccessIterator): number
{
	let start: number = first.index();
	let end: number = last.index();

	return Math.abs(end - start);
}

/* ---------------------------------------------------------
	ACCESSORS
--------------------------------------------------------- */
export function advance<T, InputIterator extends IForwardIterator<T, InputIterator>>
	(it: InputIterator, n: number): InputIterator
{
	if ((<any>it).advance instanceof Function)
		it = (<any>it).advance(n);
	else if (n > 0)
		for (let i: number = 0; i < n; ++i)
			it = it.next();
	else
	{
		let p_it: IBidirectionalIterator<T, any> = <any>it;
		if (!(p_it.next instanceof Function))
			throw new OutOfRange("It's not bidirectional iterator. Advancing to negative value is impossible.");

		n = -n;
		for (let i: number = 0; i < n; ++i)
			p_it = p_it.prev();

		it = <any>p_it;
	}
	return it;
}

export function prev<T, BidirectionalIterator extends IBidirectionalIterator<T, BidirectionalIterator>>
	(it: BidirectionalIterator, n: number = 1): BidirectionalIterator
{
	if (n == 1)
		return it.prev();
	else
		return advance(it, -n);
}

export function next<T, ForwardIterator extends IForwardIterator<T, ForwardIterator>>
	(it: ForwardIterator, n: number = 1): ForwardIterator
{	
	if (n == 1)
		return it.next();
	else
		return advance(it, n);
}
