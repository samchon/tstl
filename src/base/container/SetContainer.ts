//================================================================ 
/** @module std.base */
//================================================================
import { Container } from "./Container";
import { _IAssociativeContainer } from "./_IAssociativeContainer";

import { ISetIterator, ISetReverseIterator } from "../iterator/ISetIterator";
import { ILinearContainer } from "./ILinearContainer";
import { IForwardIterator } from "../../iterator/IForwardIterator";
import { _NativeArrayIterator } from "../iterator/_NativeArrayIterator";

import { Pair } from "../../utility/Pair";
import { Temporary } from "../Temporary";

/**
 * Base class for Set Containers.
 * 
 * @author Jeongho Nam <http://samchon.org>
 */
export abstract class SetContainer<Key, 
		Unique extends boolean, 
		Source extends SetContainer<Key, Unique, Source, IteratorT, ReverseT>,
		IteratorT extends ISetIterator<Key, Unique, Source, IteratorT, ReverseT>,
		ReverseT extends ISetReverseIterator<Key, Unique, Source, IteratorT, ReverseT>>
	extends Container<Key, Source, IteratorT, ReverseT, Key>
	implements _IAssociativeContainer<Key, Key, Source, IteratorT, ReverseT, Key>
{
	/**
	 * @hidden
	 */
	protected data_: ILinearContainer<Key, Source, IteratorT, ReverseT>;
	
	/* ---------------------------------------------------------
		CONSTURCTORS
	--------------------------------------------------------- */
	/**
	 * Default Constructor.
	 */
	protected constructor(factory: (thisArg: Source) => ILinearContainer<Key, Source, IteratorT, ReverseT>)
	{
		super();
		this.data_ = factory(this as Temporary);
	}

	/**
	 * @inheritDoc
	 */
	public assign<InputIterator extends Readonly<IForwardIterator<Key, InputIterator>>>
		(first: InputIterator, last: InputIterator): void
	{
		// INSERT
		this.clear();
		this.insert(first, last);
	}

	/**
	 * @inheritDoc
	 */
	public clear(): void
	{
		// TO BE ABSTRACT
		this.data_.clear();
	}

	/* =========================================================
		ACCESSORS
			- ITERATORS
			- ELEMENTS
	============================================================
		ITERATOR
	--------------------------------------------------------- */
	/**
	 * @inheritDoc
	 */
	public abstract find(key: Key): IteratorT;

	/**
	 * @inheritDoc
	 */
	public begin(): IteratorT
	{
		return this.data_.begin();
	}

	/**
	 * @inheritDoc
	 */
	public end(): IteratorT
	{
		return this.data_.end();
	}

	/* ---------------------------------------------------------
		ELEMENTS
	--------------------------------------------------------- */
	/**
	 * @inheritDoc
	 */
	public has(key: Key): boolean
	{
		return !this.find(key).equals(this.end());
	}

	/**
	 * @inheritDoc
	 */
	public abstract count(key: Key): number;

	/**
	 * @inheritDoc
	 */
	public size(): number
	{
		return this.data_.size();
	}

	/* =========================================================
		ELEMENTS I/O
			- INSERT
			- ERASE
			- UTILITY
			- POST-PROCESS
	============================================================
		INSERT
	--------------------------------------------------------- */
	/**
	 * @inheritDoc
	 */
	public push(...items: Key[]): number
	{
		if (items.length === 0)
			return this.size();

		// INSERT BY RANGE
		let first: _NativeArrayIterator<Key> = new _NativeArrayIterator(items, 0);
		let last: _NativeArrayIterator<Key> = new _NativeArrayIterator(items, items.length);

		this._Insert_by_range(first, last);

		// RETURN SIZE
		return this.size();
	}
	
	public insert(key: Key): SetContainer.InsertRet<Key, Unique, Source, IteratorT, ReverseT>;
	public insert(hint: IteratorT, key: Key): IteratorT;
	public insert<InputIterator extends Readonly<IForwardIterator<Key, InputIterator>>>
		(first: InputIterator, last: InputIterator): void;

	public insert(...args: any[]): any
	{
		if (args.length === 1)
			return this._Insert_by_key(args[0]);
		else if (args[0].next instanceof Function && args[1].next instanceof Function)
			return this._Insert_by_range(args[0], args[1]);
		else
			return this._Insert_by_hint(args[0], args[1]);
	}

	/**
	 * @hidden
	 */
	protected abstract _Insert_by_key(key: Key): SetContainer.InsertRet<Key, Unique, Source, IteratorT, ReverseT>;
	
	/**
	 * @hidden
	 */
	protected abstract _Insert_by_hint(hint: IteratorT, key: Key): IteratorT;
	
	/**
	 * @hidden
	 */
	protected abstract _Insert_by_range<InputIterator extends Readonly<IForwardIterator<Key, InputIterator>>>
		(begin: InputIterator, end: InputIterator): void;

	/* ---------------------------------------------------------
		ERASE
	--------------------------------------------------------- */
	/**
	 * @inheritDoc
	 */
	public erase(key: Key): number;

	/**
	 * @inheritDoc
	 */
	public erase(pos: IteratorT): IteratorT;

	/**
	 * @inheritDoc
	 */
	public erase(first: IteratorT, last: IteratorT): IteratorT;

	public erase(...args: any[]): any
	{
		if (args.length === 1 && !(args[0] instanceof this._Get_iterator_type() && (args[0] as IteratorT).source() === <any>this))
			return this._Erase_by_val(args[0]);
		else if (args.length === 1)
			return this._Erase_by_range(args[0]);
		else
			return this._Erase_by_range(args[0], args[1]);
	}

	/**
	 * @hidden
	 */
	protected abstract _Erase_by_val(key: Key): number;

	/**
	 * @hidden
	 */
	protected _Erase_by_range(first: IteratorT, last: IteratorT = first.next()): IteratorT
	{
		// ERASE
		let it = this.data_.erase(first, last);
		
		// POST-PROCESS
		this._Handle_erase(first, last);

		return it; 
	}

	/* ---------------------------------------------------------
		UTILITY
	--------------------------------------------------------- */
	/**
	 * @hidden
	 */
	public abstract swap(obj: Source): void;

	/**
	 * @inheritDoc
	 */
	public abstract merge(source: Source): void;

	/* ---------------------------------------------------------
		POST-PROCESS
	--------------------------------------------------------- */
	/**
	 * @hidden
	 */
	protected abstract _Handle_insert(first: IteratorT, last: IteratorT): void;

	/**
	 * @hidden
	 */
	protected abstract _Handle_erase(first: IteratorT, last: IteratorT): void;

	/**
	 * @hidden
	 */
	protected abstract _Get_iterator_type(): any;
}

export namespace SetContainer
{
	export type InsertRet<Key, 
			Unique extends boolean, 
			Source extends SetContainer<Key, Unique, Source, IteratorT, ReverseT>,
			IteratorT extends ISetIterator<Key, Unique, Source, IteratorT, ReverseT>,
			ReverseT extends ISetReverseIterator<Key, Unique, Source, IteratorT, ReverseT>>
		= Unique extends true
			? Pair<IteratorT, boolean>
			: IteratorT;
}