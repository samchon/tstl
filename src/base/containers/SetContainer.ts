import { Container } from "./Container";
import { _IAssociativeContainer } from "./_IAssociativeContainer";

import { _SetElementList } from "./_SetElementList";
import { SetIterator, SetReverseIterator } from "../iterators/SetIterator";

import { IForwardIterator } from "../../iterators/IForwardIterator";
import { _NativeArrayIterator } from "../iterators/_NativeArrayIterator";
import { Pair } from "../../utilities/Pair";

/**
 * Base class for Set Containers.
 * 
 * @author Jeongho Nam <http://samchon.org>
 */
export abstract class SetContainer<Key, Unique extends boolean, Source extends SetContainer<Key, Unique, Source>>
	extends Container<Key, 
		Source, 
		SetIterator<Key, Unique, Source>, 
		SetReverseIterator<Key, Unique, Source>>
	implements _IAssociativeContainer<Key, SetIterator<Key, Unique, Source>>
{
	/**
	 * @hidden
	 */
	private data_: _SetElementList<Key, Unique, Source>;
	
	/* ---------------------------------------------------------
		CONSTURCTORS
	--------------------------------------------------------- */
	/**
	 * Default Constructor.
	 */
	protected constructor()
	{
		super();

		this.data_ = new _SetElementList<Key, Unique, Source>(this as any);
	}

	/**
	 * @inheritDoc
	 */
	public assign<U extends Key, InputIterator extends Readonly<IForwardIterator<U, InputIterator>>>
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
	public abstract find(key: Key): SetIterator<Key, Unique, Source>;

	/**
	 * @inheritDoc
	 */
	public begin(): SetIterator<Key, Unique, Source>
	{
		return this.data_.begin();
	}

	/**
	 * @inheritDoc
	 */
	public end(): SetIterator<Key, Unique, Source>
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
		if (items.length == 0)
			return this.size();

		// INSERT BY RANGE
		let first: _NativeArrayIterator<Key> = new _NativeArrayIterator(items, 0);
		let last: _NativeArrayIterator<Key> = new _NativeArrayIterator(items, items.length);

		this._Insert_by_range(first, last);

		// RETURN SIZE
		return this.size();
	}
	
	public insert(key: Key): SetContainer.InsertRet<Key, Unique, Source>;
	public insert(hint: SetIterator<Key, Unique, Source>, key: Key): SetIterator<Key, Unique, Source>;
	public insert<U extends Key, InputIterator extends Readonly<IForwardIterator<U, InputIterator>>>
		(first: InputIterator, last: InputIterator): void;

	public insert(...args: any[]): any
	{
		if (args.length == 1)
			return this._Insert_by_key(args[0]);
		else if (args[0].next instanceof Function && args[1].next instanceof Function)
			return this._Insert_by_range(args[0], args[1]);
		else
			return this._Insert_by_hint(args[0], args[1]);
	}

	/**
	 * @hidden
	 */
	protected abstract _Insert_by_key(key: Key): SetContainer.InsertRet<Key, Unique, Source>;
	
	/**
	 * @hidden
	 */
	protected abstract _Insert_by_hint(hint: SetIterator<Key, Unique, Source>, key: Key): SetIterator<Key, Unique, Source>;
	
	/**
	 * @hidden
	 */
	protected abstract _Insert_by_range<U extends Key, InputIterator extends Readonly<IForwardIterator<U, InputIterator>>>
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
	public erase(it: SetIterator<Key, Unique, Source>): SetIterator<Key, Unique, Source>;
	/**
	 * @inheritDoc
	 */
	public erase(begin: SetIterator<Key, Unique, Source>, end: SetIterator<Key, Unique, Source>): SetIterator<Key, Unique, Source>;

	public erase(...args: any[]): any
	{
		if (args.length == 1 && !(args[0] instanceof SetIterator && (args[0] as SetIterator<Key, Unique, Source>).source() as any == this))
			return this._Erase_by_val(args[0]);
		else if (args.length == 1)
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
	protected _Erase_by_range(first: SetIterator<Key, Unique, Source>, last: SetIterator<Key, Unique, Source> = first.next()): SetIterator<Key, Unique, Source>
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
	public swap(obj: Source): void
	{
		// CHANGE CONTENTS
		[this.data_ as any, obj.data_] = [obj.data_, this.data_];

		// CHANGE ITERATORS' SOURCES
		[this.data_["associative_"], obj.data_["associative_"]] = [obj.data_["associative_"], this.data_["associative_"]];
	}

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
	protected abstract _Handle_insert(first: SetIterator<Key, Unique, Source>, last: SetIterator<Key, Unique, Source>): void;

	/**
	 * @hidden
	 */
	protected abstract _Handle_erase(first: SetIterator<Key, Unique, Source>, last: SetIterator<Key, Unique, Source>): void;
}

export namespace SetContainer
{
	export type InsertRet<Key, Unique extends boolean, Source extends SetContainer<Key, Unique, Source>>
		= Unique extends true
			? Pair<SetIterator<Key, Unique, Source>, boolean>
			: SetIterator<Key, Unique, Source>;
}