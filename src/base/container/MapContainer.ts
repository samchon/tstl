//================================================================ 
/** @module std.base */
//================================================================
import { Container } from "./Container";
import { _IAssociativeContainer } from "./_IAssociativeContainer";

import { _MapElementList } from "./_MapElementList";
import { MapIterator, MapReverseIterator } from "../iterator/MapIterator";
import { Entry } from "../../utility/Entry";

import { IForwardIterator } from "../../iterator/IForwardIterator";
import { _NativeArrayIterator } from "../iterator/_NativeArrayIterator";
import { IPair } from "../../utility/IPair";
import { Pair } from "../../utility/Pair";

/**
 * Base class for Map Containers.
 * 
 * @author Jeongho Nam <http://samchon.org>
 */
export abstract class MapContainer<Key, T, Unique extends boolean, Source extends MapContainer<Key, T, Unique, Source>>
	extends Container<Entry<Key, T>,
		Source,
		MapIterator<Key, T, Unique, Source>,
		MapReverseIterator<Key, T, Unique, Source>,
		IPair<Key, T>>
	implements _IAssociativeContainer<Key, Entry<Key, T>,
		Source, 
		MapIterator<Key, T, Unique, Source>,
		MapReverseIterator<Key, T, Unique, Source>,
		IPair<Key, T>>
{
	/**
	 * @hidden
	 */
	protected data_: _MapElementList<Key, T, Unique, Source>;

	/* ---------------------------------------------------------
		CONSTURCTORS
	--------------------------------------------------------- */
	/**
	 * Default Constructor.
	 */
	protected constructor()
	{
		super();
		
		this.data_ = new _MapElementList(<any>this);
	}
	
	/**
	 * @inheritDoc
	 */
	public assign<InputIterator extends Readonly<IForwardIterator<IPair<Key, T>, InputIterator>>>
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
	public abstract find(key: Key): MapIterator<Key, T, Unique, Source>;

	/**
	 * @inheritDoc
	 */
	public begin(): MapIterator<Key, T, Unique, Source>
	{
		return this.data_.begin();
	}
	
	/**
	 * @inheritDoc
	 */
	public end(): MapIterator<Key, T, Unique, Source>
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
	public push(...items: IPair<Key, T>[]): number
	{
		// INSERT BY RANGE
		let first = new _NativeArrayIterator(items, 0);
		let last = new _NativeArrayIterator(items, items.length);

		this.insert(first, last);

		// RETURN SIZE
		return this.size();
	}
	
	public abstract emplace(key: Key, val: T): MapContainer.InsertRet<Key, T, Unique, Source>;
	public abstract emplace_hint(hint: MapIterator<Key, T, Unique, Source>, key: Key, val: T): MapIterator<Key, T, Unique, Source>;

	public insert(pair: IPair<Key, T>): MapContainer.InsertRet<Key, T, Unique, Source>;
	public insert(hint: MapIterator<Key, T, Unique, Source>, pair: IPair<Key, T>): MapIterator<Key, T, Unique, Source>;
	public insert<L extends Key, U extends T, InputIterator extends Readonly<IForwardIterator<IPair<L, U>, InputIterator>>>
		(first: InputIterator, last: InputIterator): void;

	public insert(...args: any[]): any
	{
		if (args.length === 1)
			return this.emplace(args[0].first, args[0].second);
		else if (args[0].next instanceof Function && args[1].next instanceof Function)
			return this._Insert_by_range(args[0], args[1]);
		else
			return this.emplace_hint(args[0], args[1].first, args[1].second);
	}

	/**
	 * @hidden
	 */
	protected abstract _Insert_by_range<L extends Key, U extends T, InputIterator extends Readonly<IForwardIterator<IPair<L, U>, InputIterator>>>
		(first: InputIterator, last: InputIterator): void;

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
	public erase(it: MapIterator<Key, T, Unique, Source>): MapIterator<Key, T, Unique, Source>;

	/**
	 * @inheritDoc
	 */
	public erase(begin: MapIterator<Key, T, Unique, Source>, end: MapIterator<Key, T, Unique, Source>): MapIterator<Key, T, Unique, Source>;

	public erase(...args: any[]): any 
	{
		if (args.length === 1 && (args[0] instanceof MapIterator === false || (args[0] as MapIterator<Key, T, Unique, Source>).source() as any !== this))
			return this._Erase_by_key(args[0]);
		else
			if (args.length === 1)
				return this._Erase_by_range(args[0]);
			else
				return this._Erase_by_range(args[0], args[1]);
	}

	/**
	 * @hidden
	 */
	protected abstract _Erase_by_key(key: Key): number;

	/**
	 * @hidden
	 */
	protected _Erase_by_range(first: MapIterator<Key, T, Unique, Source>, last: MapIterator<Key, T, Unique, Source> = first.next()): MapIterator<Key, T, Unique, Source>
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
	 * @inheritDoc
	 */
	public swap(obj: Source): void
	{
		// CHANGE CONTENTS
		[this.data_, obj.data_] = [obj.data_, this.data_];

		// CHANGE ITERATORS' SOURCES
		_MapElementList._Swap_associative(this.data_, obj.data_);
	}

	/**
	 * Merge two containers.
	 * 
	 * @param source Source container to transfer.
	 */
	public abstract merge(source: Source): void;

	/* ---------------------------------------------------------
		POST-PROCESS
	--------------------------------------------------------- */
	/**
	 * @hidden
	 */
	protected abstract _Handle_insert(first: MapIterator<Key, T, Unique, Source>, last: MapIterator<Key, T, Unique, Source>): void;

	/**
	 * @hidden
	 */
	protected abstract _Handle_erase(first: MapIterator<Key, T, Unique, Source>, last: MapIterator<Key, T, Unique, Source>): void;
}

export namespace MapContainer
{
	export type InsertRet<Key, T, 
			Unique extends boolean, 
			Source extends MapContainer<Key, T, Unique, Source>>
		= Unique extends true 
			? Pair<MapIterator<Key, T, Unique, Source>, boolean> 
			: MapIterator<Key, T, Unique, Source>;
}
