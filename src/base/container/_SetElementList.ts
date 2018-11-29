//================================================================ 
/** @module std.base */
//================================================================
import { ListContainer } from "./ListContainer";

import { SetContainer } from "./SetContainer";
import { SetIterator, SetReverseIterator } from "../iterator/SetIterator";

/**
 * @hidden
 */
export class _SetElementList<Key, Unique extends boolean, Source extends SetContainer<Key, Unique, Source>> 
	extends ListContainer<Key, 
		Source,
		SetIterator<Key, Unique, Source>,
		SetReverseIterator<Key, Unique, Source>>
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
	protected _Create_iterator(prev: SetIterator<Key, Unique, Source>, next: SetIterator<Key, Unique, Source>, val: Key): SetIterator<Key, Unique, Source>
	{
		return new SetIterator<Key, Unique, Source>(this, prev, next, val);
	}

	/* ---------------------------------------------------------
		ACCESSORS
	--------------------------------------------------------- */
	public associative(): Source
	{
		return this.associative_;
	}
}