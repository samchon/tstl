//================================================================ 
/** @module std.base */
//================================================================
import { IContainer } from "./IContainer";
import { ILinearContainer } from "./ILinearContainer";

import { Iterator } from "../iterator/Iterator";
import { ReverseIterator } from "../iterator/ReverseIterator";
import { _IPushFront } from "../disposable/IPartialContainers";

/**
 * Interface for deque containers.
 * 
 * @author Jeongho Nam <http://samchon.org>
 */
export interface IDequeContainer<T extends ElemT,
		SourceT extends IContainer<T, SourceT, IteratorT, ReverseIteratorT, ElemT>, 
		IteratorT extends Iterator<T, SourceT, IteratorT, ReverseIteratorT, ElemT>, 
		ReverseIteratorT extends ReverseIterator<T, SourceT, IteratorT, ReverseIteratorT, ElemT>,
		ElemT = T>
	extends ILinearContainer<T, SourceT, IteratorT, ReverseIteratorT, ElemT>, _IDeque<T>
{
}

/**
 * @hidden
 */
export interface _IDeque<T> extends _IPushFront<T>
{
	/**
	 * @inheritDoc
	 */
	push_front(val: T): void;

	/**
	 * Erase the first element.
	 */
	pop_front(): void;
}