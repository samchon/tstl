//================================================================ 
/** @module std.base */
//================================================================
import { ListContainer } from "./ListContainer";

import { MapContainer } from "./MapContainer";
import { MapIterator, MapReverseIterator } from "../iterator/MapIterator";
import { Entry } from "../../utility/Entry";

/**
 * @hidden
 */
export class _MapElementList<Key, T, Unique extends boolean, Source extends MapContainer<Key, T, Unique, Source>> 
	extends ListContainer<Entry<Key, T>, 
		Source, 
		MapIterator<Key, T, Unique, Source>,
		MapReverseIterator<Key, T, Unique, Source>>
{
	/**
	 * @hidden
	 */
	private associative_: Source;

	/* ---------------------------------------------------------
		CONSTRUCTORS
	--------------------------------------------------------- */
	public constructor(associative: Source)
	{
		super();

		this.associative_ = associative;
	}

	/**
	 * @hidden
	 */
	protected _Create_iterator(prev: MapIterator<Key, T, Unique, Source>, next: MapIterator<Key, T, Unique, Source>, val: Entry<Key, T>): MapIterator<Key, T, Unique, Source>
	{
		return new MapIterator<Key, T, Unique, Source>(this, prev, next, val);
	}

	/**
	 * @internal
	 */
	public static _Swap_associative<Key, T, Unique extends boolean, Source extends MapContainer<Key, T, Unique, Source>>
		(x: _MapElementList<Key, T, Unique, Source>, y: _MapElementList<Key, T, Unique, Source>): void
	{
		[x.associative_, y.associative_] = [y.associative_, x.associative_];
	}

	/* ---------------------------------------------------------
		ACCESSORS
	--------------------------------------------------------- */
	public associative(): Source
	{
		return this.associative_;
	}
}