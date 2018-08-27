import { General } from "../iterator/IFake";
import { IForwardIterator } from "../iterator/IForwardIterator";
import { IBidirectionalIterator } from "../iterator/IBidirectionalIterator";

import { advance } from "../iterator/global";
import { copy, copy_backward } from "../algorithm/modifiers";

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