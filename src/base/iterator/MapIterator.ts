//================================================================ 
/** @module std.base */
//================================================================
import { ListIterator } from "./ListIterator";
import { ReverseIterator } from "./ReverseIterator";

import { MapContainer } from "../container/MapContainer";
import { _MapElementList } from "../container/_MapElementList";
import { Entry } from "../../utility/Entry";
import { IPair } from "../../utility";

/**
 * Iterator of Map Containers.
 * 
 * @author Jeongho Nam <http://samchon.org>
 */
export class MapIterator<Key, T, Unique extends boolean, Source extends MapContainer<Key, T, Unique, Source>>
	extends ListIterator<Entry<Key, T>, 
		Source, 
		MapIterator<Key, T, Unique, Source>, 
		MapReverseIterator<Key, T, Unique, Source>,
		IPair<Key, T>>
{
	/**
	 * @hidden
	 */
	private source_: _MapElementList<Key, T, Unique, Source>;

	/* ---------------------------------------------------------
		CONSTRUCTORS
	--------------------------------------------------------- */
	/**
	 * @hidden
	 */
	public constructor(list: _MapElementList<Key, T, Unique, Source>, prev: MapIterator<Key, T, Unique, Source>, next: MapIterator<Key, T, Unique, Source>, val: Entry<Key, T>)
	{
		super(prev, next, val);
		this.source_ = list;
	}

	/**
	 * @inheritDoc
	 */
	public reverse(): MapReverseIterator<Key, T, Unique, Source>
	{
		return new MapReverseIterator(this);
	}

	/* ---------------------------------------------------------
		ACCESSORS
	--------------------------------------------------------- */
	/**
	 * @inheritDoc
	 */
	public source(): Source
	{
		return this.source_.associative();
	}

	/**
	 * Get the first, key element.
	 * 
	 * @return The first element.
	 */
	public get first(): Key
	{
		return this.value.first;
	}

	/**
	 * Get the second, stored element.
	 * 
	 * @return The second element.
	 */
	public get second(): T
	{
		return this.value.second;
	}

	/**
	 * Set the second, stored element.
	 * 
	 * @param val The value to set.
	 */
	public set second(val: T)
	{
		this.value.second = val;
	}
}

/**
 * Reverse iterator of Map Containers.
 * 
 * @author Jeongho Nam <http://samchon.org>
 */
export class MapReverseIterator<Key, T, Unique extends boolean, Source extends MapContainer<Key, T, Unique, Source>>
	extends ReverseIterator<Entry<Key, T>, 
		Source, 
		MapIterator<Key, T, Unique, Source>, 
		MapReverseIterator<Key, T, Unique, Source>,
		IPair<Key, T>>
{
	/* ---------------------------------------------------------
		CONSTRUCTORS
	--------------------------------------------------------- */
	/**
	 * Initializer Constructor.
	 * 
	 * @param base The base iterator.
	 */
	public constructor(base: MapIterator<Key, T, Unique, Source>)
	{
		super(base);
	}

	/**
	 * @hidden
	 */
	protected _Create_neighbor(base: MapIterator<Key, T, Unique, Source>): MapReverseIterator<Key, T, Unique, Source>
	{
		return new MapReverseIterator(base);
	}

	/* ---------------------------------------------------------
		ACCESSORS
	--------------------------------------------------------- */
	/**
	 * Get the first, key element.
	 * 
	 * @return The first element.
	 */
	public get first(): Key
	{
		return this.base_.first;
	}

	/**
	 * Get the second, stored element.
	 * 
	 * @return The second element.
	 */
	public get second(): T
	{
		return this.base_.second;
	}

	/**
	 * Set the second, stored element.
	 * 
	 * @param val The value to set.
	 */
	public set second(val: T)
	{
		this.base_.second = val;
	}
}