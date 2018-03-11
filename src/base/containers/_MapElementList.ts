import { ListContainer } from "./ListContainer";

import { MapContainer } from "./MapContainer";
import { MapIterator, MapReverseIterator } from "../iterators/MapIterator";

import { Entry } from "../../functors/utilities/Entry";

/**
 * @hidden
 */
export class _MapElementList<Key, T, Source extends MapContainer<Key, T, Source>> 
	extends ListContainer<Entry<Key, T>, 
		Source, 
		MapIterator<Key, T, Source>,
		MapReverseIterator<Key, T, Source>>
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
	protected _Create_iterator(prev: MapIterator<Key, T, Source>, next: MapIterator<Key, T, Source>, val: Entry<Key, T>): MapIterator<Key, T, Source>
	{
		return new MapIterator<Key, T, Source>(this, prev, next, val);
	}

	/* ---------------------------------------------------------
		ACCESSORS
	--------------------------------------------------------- */
	public associative(): Source
	{
		return this.associative_;
	}
}