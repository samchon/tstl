import { General } from "../iterators/IFake";
import { IForwardIterator } from "../iterators/IForwardIterator";
import { IBidirectionalIterator } from "../iterators/IBidirectionalIterator";

import { advance } from "../iterators/global";
import { copy, copy_backward } from "../algorithms/modifiers";

export function shift_left<T, ForwardIterator extends General<IForwardIterator<T, ForwardIterator>>>
	(first: ForwardIterator, last: ForwardIterator, n: number): ForwardIterator
{
	let mid = advance(first, n);
	return copy(mid, last, first);
}

export function shift_right<T, ForwardIterator extends General<IBidirectionalIterator<T, ForwardIterator>>>
	(first: ForwardIterator, last: ForwardIterator, n: number): ForwardIterator
{
	let mid = advance(last, -n);
	return copy_backward(first, mid, last);
}