import { Container } from "../containers/Container";

import { Iterator } from "../iterators/Iterator";
import { ReverseIterator } from "../iterators/ReverseIterator";
import { IForwardIterator } from "../../iterators/IForwardIterator";

/** 
 * @hidden
 */
export interface ILinearContainer<T, 
		SourceT extends ILinearContainer<T, SourceT, IteratorT, ReverseIteratorT>, 
		IteratorT extends Iterator<T, SourceT, IteratorT, ReverseIteratorT>, 
		ReverseIteratorT extends ReverseIterator<T, SourceT, IteratorT, ReverseIteratorT>>
	extends Container<T, SourceT, IteratorT, ReverseIteratorT>
{
	/* ---------------------------------------------------------
		CONSTRUCTORS
	--------------------------------------------------------- */
	assign(n: number, val: T): void;
	assign<U extends T, InputIterator extends Readonly<IForwardIterator<U, InputIterator>>>
		(begin: InputIterator, end: InputIterator): void;

	/* ---------------------------------------------------------
		ACCESSORS
	--------------------------------------------------------- */
	front(): T;
	front(val: T): void;

	back(): T;
	back(val: T): void;

	/* ---------------------------------------------------------
		ELEMENTS I/O
	--------------------------------------------------------- */
	push_back(val: T): void;
	pop_back(): void;

	insert(position: IteratorT, val: T): IteratorT;
	insert(position: IteratorT, n: number, val: T): IteratorT;
	insert<U extends T, InputIterator extends Readonly<IForwardIterator<U, InputIterator>>>
		(position: IteratorT, first: InputIterator, last: InputIterator): IteratorT;
}