//================================================================ 
/** @module std.base */
//================================================================
import { IContainer } from "./IContainer";

import { Iterator } from "../iterator/Iterator";
import { IReverseIterator } from "../iterator/ReverseIterator";
import { IForwardIterator } from "../../iterator/IForwardIterator";

import { _IPushBack } from "../disposable/IPartialContainers";

/**
 * Interface for linear containers.
 * 
 * @author Jeongho Nam <http://samchon.org>
 */
export interface ILinearContainer<T extends ElemT, 
		SourceT extends IContainer<T, SourceT, IteratorT, ReverseIteratorT, T>, 
		IteratorT extends Iterator<T, SourceT, IteratorT, ReverseIteratorT, T>, 
		ReverseIteratorT extends IReverseIterator<T, SourceT, IteratorT, ReverseIteratorT, T>,
		ElemT = T>
	extends IContainer<T, SourceT, IteratorT, ReverseIteratorT, ElemT>, 
		_IPushBack<T>
{
	/* ---------------------------------------------------------
		CONSTRUCTORS
	--------------------------------------------------------- */
	/**
	 * Fill Assigner.
	 * 
	 * @param n Initial size.
	 * @param val Value to fill.
	 */
	assign(n: number, val: T): void;

	/**
	 * Range Assigner.
	 * 
	 * @param first Input iterator of the first position.
	 * @param last Input iterator of the last position.
	 */
	assign<InputIterator extends Readonly<IForwardIterator<T, InputIterator>>>
		(first: InputIterator, last: InputIterator): void;

	/**
	 * Resize this {@link Vector} forcibly.
	 * 
	 * @param n New container size.
	 */
	resize(n: number): void;

	/* ---------------------------------------------------------
		ACCESSORS
	--------------------------------------------------------- */
	/**
	 * Get the last element.
	 * 
	 * @return The last element.
	 */
	back(): T;

	/**
	 * Change the last element.
	 * 
	 * @param val The value to change.
	 */
	back(val: T): void;

	/* ---------------------------------------------------------
		ELEMENTS I/O
	--------------------------------------------------------- */
	/**
	 * @inheritDoc
	 */
	push_back(val: T): void;

	/**
	 * Erase the last element.
	 */
	pop_back(): void;

	/**
	 * Insert a single element.
	 * 
	 * @param pos Position to insert.
	 * @param val Value to insert.
	 * @return An iterator to the newly inserted element.
	 */
	insert(pos: IteratorT, val: T): IteratorT;

	/**
	 * Insert repeated elements.
	 * 
	 * @param pos Position to insert.
	 * @param n Number of elements to insert.
	 * @param val Value to insert repeatedly.
	 * @return An iterator to the first of the newly inserted elements.
	 */
	insert(pos: IteratorT, n: number, val: T): IteratorT;

	/**
	 * Insert range elements.
	 * 
	 * @param pos Position to insert.
	 * @param first Input iterator of the first position.
	 * @param last Input iteartor of the last position.
	 * @return An iterator to the first of the newly inserted elements.
	 */
	insert<InputIterator extends Readonly<IForwardIterator<T, InputIterator>>>
		(pos: IteratorT, first: InputIterator, last: InputIterator): IteratorT;
}

/**
 * @hidden
 */
export interface _IFront<T>
{
	/**
	 * Get the first element.
	 * 
	 * @return The first element.
	 */
	front(): T;

	/**
	 * Change the first element.
	 * 
	 * @param val The value to change.
	 */
	front(val: T): void;
}