import { ListIterator } from "./ListIterator";
import { ReverseIterator } from "./ReverseIterator";

import { MapContainer } from "../containers/MapContainer";
import { _MapElementList } from "../containers/_MapElementList";

import { Entry } from "../../functors/utilities/Entry";
import { less } from "../../functors/functional/comparisons";
import { hash } from "../../functors/functional/hash";

export class MapIterator<Key, T, Source extends MapContainer<Key, T, Source>>
	extends ListIterator<Entry<Key, T>, 
		Source, 
		MapIterator<Key, T, Source>, 
		MapReverseIterator<Key, T, Source>>
{
	/**
	 * @hidden
	 */
	private source_: _MapElementList<Key, T, Source>;

	/* ---------------------------------------------------------
		CONSTRUCTORS
	--------------------------------------------------------- */
	/**
	 * @hidden
	 */
	public constructor(associative: _MapElementList<Key, T, Source>, prev: MapIterator<Key, T, Source>, next: MapIterator<Key, T, Source>, val: Entry<Key, T>)
	{
		super(prev, next, val);
		this.source_ = associative;
	}

	public reverse(): MapReverseIterator<Key, T, Source>
	{
		return new MapReverseIterator(this);
	}

	/* ---------------------------------------------------------
		ACCESSORS
	--------------------------------------------------------- */
	/**
	 * @hidden
	 */
	public source(): Source
	{
		return this.source_.associative();
	}

	public get first(): Key
	{
		return this.value.first;
	}

	public get second(): T
	{
		return this.value.second;
	}

	public set second(val: T)
	{
		this.value.second = val;
	}

	/* ---------------------------------------------------------
		COMPARISONS
	--------------------------------------------------------- */
	public less(obj: MapIterator<Key, T, Source>): boolean
	{
		return less(this.first, obj.first);
	}
	
	public hashCode(): number
	{
		return hash(this.first);
	}
}

export class MapReverseIterator<Key, T, Source extends MapContainer<Key, T, Source>>
	extends ReverseIterator<Entry<Key, T>, 
		Source, 
		MapIterator<Key, T, Source>, 
		MapReverseIterator<Key, T, Source>>
{
	/* ---------------------------------------------------------
		CONSTRUCTORS
	--------------------------------------------------------- */
	public constructor(base: MapIterator<Key, T, Source>)
	{
		super(base);
	}

	/**
	 * @hidden
	 */
	protected _Create_neighbor(base: MapIterator<Key, T, Source>): MapReverseIterator<Key, T, Source>
	{
		return new MapReverseIterator(base);
	}

	/* ---------------------------------------------------------
		ACCESSORS
	--------------------------------------------------------- */
	public get first(): Key
	{
		return this.base_.first;
	}

	public get second(): T
	{
		return this.base_.second;
	}

	public set second(val: T)
	{
		this.base_.second = val;
	}
}