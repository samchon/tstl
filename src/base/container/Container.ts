//================================================================ 
/** @module std.base */
//================================================================
import { IContainer } from "./IContainer";
import { Iterator } from "../iterator/Iterator";
import { ReverseIterator } from "../iterator/ReverseIterator";

import { IForwardIterator } from "../../iterator/IForwardIterator";
import { ForOfAdaptor } from "../iterator/ForOfAdaptor";

/**
 * Basic container.
 * 
 * @author Jeongho Nam <http://samchon.org>
 */
export abstract class Container<T extends Elem, 
		SourceT extends Container<T, SourceT, IteratorT, ReverseIteratorT, Elem>,
		IteratorT extends Iterator<T, SourceT, IteratorT, ReverseIteratorT, Elem>,
		ReverseIteratorT extends ReverseIterator<T, SourceT, IteratorT, ReverseIteratorT, Elem>,
		Elem = T>
	implements IContainer<T, SourceT, IteratorT, ReverseIteratorT, Elem>
{
	/* ---------------------------------------------------------
		ASSIGN & CLEAR
	--------------------------------------------------------- */
	/**
	 * @inheritDoc
	 */
	public abstract assign<InputIterator extends Readonly<IForwardIterator<Elem, InputIterator>>>
		(first: InputIterator, last: InputIterator): void;

	/**
	 * @inheritDoc
	 */
	public clear(): void
	{
		this.erase(this.begin(), this.end());
	}
	
	/* =========================================================
		ACCESSORS
			- SIZE
			- ITERATORS
	============================================================
		SIZE
	--------------------------------------------------------- */
	/**
	 * @inheritDoc
	 */
	public abstract size(): number;
	
	/**
	 * @inheritDoc
	 */
	public empty(): boolean
	{
		return this.size() === 0;
	}

	/* ---------------------------------------------------------
		ITERATORS
	--------------------------------------------------------- */
	/**
	 * @inheritDoc
	 */
	public abstract begin(): IteratorT;

	/**
	 * @inheritDoc
	 */
	public abstract end(): IteratorT;

	/**
	 * @inheritDoc
	 */
	public rbegin(): ReverseIteratorT
	{
		return this.end().reverse();
	}

	/**
	 * @inheritDoc
	 */
	public rend(): ReverseIteratorT
	{
		return this.begin().reverse();
	}

	/**
	 * @inheritDoc
	 */
	public [Symbol.iterator](): IterableIterator<T>
	{
		return new ForOfAdaptor(this.begin(), this.end());
	}

	/* ---------------------------------------------------------
		ELEMENTS I/O
	--------------------------------------------------------- */
	/**
	 * @inheritDoc
	 */
	public abstract push(...items: Elem[]): number;

	/**
	 * @inheritDoc
	 */
	public abstract erase(pos: IteratorT): IteratorT;

	/**
	 * @inheritDoc
	 */
	public abstract erase(first: IteratorT, last: IteratorT): IteratorT;

	/* ---------------------------------------------------------------
		UTILITIES
	--------------------------------------------------------------- */
	/**
	 * @inheritDoc
	 */
	public abstract swap(obj: SourceT): void;

	/**
	 * @inheritDoc
	 */
	public toJSON(): Array<T>
	{
		let ret: Array<T> = [];
		for (let elem of this)
			ret.push(elem);

		return ret;
	}
}