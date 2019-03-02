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
		return SetIterator.create(this, prev, next, val);
	}

	/**
	 * @internal
	 */
	public static _Swap_associative<Key, Unique extends boolean, Source extends SetContainer<Key, Unique, Source>>
		(x: _SetElementList<Key, Unique, Source>, y: _SetElementList<Key, Unique, Source>): void
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