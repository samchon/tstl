import { IForwardIterator } from "../../iterators/IForwardIterator";

/* ---------------------------------------------------------
	CAPACITY
--------------------------------------------------------- */
/**
 * @hidden
 */
export interface _IClear
{
	/**
	 * Clear elements.
	 */
	clear(): void;
}

/**
 * @hidden
 */
export interface _IEmpty
{
	/**
	 * Test whether container is empty.
	 */
	empty(): boolean;
}

/**
 * @hidden
 */
export interface _ISize
{
	/**
	 * Number of elements in the container.
	 */
	size(): number;
}

/* ---------------------------------------------------------
	INSERTER
--------------------------------------------------------- */
/**
 * @hidden
 */
export interface _IInsert<T, Iterator extends IForwardIterator<T, Iterator>>
{
	insert(it: Iterator, value: T): Iterator;
}

/**
 * @hidden
 */
export interface _IPush<T>
{
	/**
	 * Insert items at the end.
	 * 
	 * @param items Items to insert.
	 * @return Number of elements in the container after insertion.
	 */
	push(...items: T[]): number;
}

/**
 * @hidden
 */
export interface _IPushFront<T>
{
	/**
	 * Insert an element at the first.
	 * 
	 * @param val Value to insert.
	 */
	push_front(val: T): void;
}

/**
 * @hidden
 */
export interface _IPushBack<T>
{
	/**
	 * Insert an element at the end.
	 * 
	 * @param val Value to insert.
	 */
	push_back(val: T): void;
}