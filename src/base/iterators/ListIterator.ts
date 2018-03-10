import { Iterator } from "./Iterator";
import { ReverseIterator } from "./ReverseIterator";

import { Container } from "../containers/Container";

export abstract class ListIterator<T, 
		SourceT extends Container<T, SourceT, IteratorT, ReverseIteratorT>,
		IteratorT extends ListIterator<T, SourceT, IteratorT, ReverseIteratorT>,
		ReverseIteratorT extends ReverseIterator<T, SourceT, IteratorT, ReverseIteratorT>>
	implements Readonly<Iterator<T, SourceT, IteratorT, ReverseIteratorT>>
{
	/**
	 * @hidden
	 */
	private prev_: IteratorT;

	/**
	 * @hidden
	 */
	private next_: IteratorT;

	/**
	 * @hidden
	 */
	private value_: T;

	/**
	 * @hidden
	 */
	protected constructor(prev: IteratorT, next: IteratorT, value: T)
	{
		this.prev_ = prev;
		this.next_ = next;
		this.value_ = value;
	}

	public abstract reverse(): ReverseIteratorT;

	/* ---------------------------------------------------------------
		ACCESSORS
	--------------------------------------------------------------- */
	public abstract source(): SourceT;

	public prev(): IteratorT
	{
		return this.prev_;
	}

	public next(): IteratorT
	{
		return this.next_;
	}

	public get value(): T
	{
		return this.value_;
	}

	/* ---------------------------------------------------------------
		COMPARISON
	--------------------------------------------------------------- */
	public equals(obj: IteratorT): boolean
	{
		return this == <any>obj;
	}
}