import { ListContainer } from "./ListContainer";

import { SetContainer } from "./SetContainer";
import { SetIterator, SetReverseIterator } from "../iterators/SetIterator";

/**
 * @hidden
 */
export class _SetElementList<T, Source extends SetContainer<T, Source>> 
	extends ListContainer<T, 
		Source,
		SetIterator<T, Source>,
		SetReverseIterator<T, Source>>
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
	protected _Create_iterator(prev: SetIterator<T, Source>, next: SetIterator<T, Source>, val: T): SetIterator<T, Source>
	{
		return new SetIterator<T, Source>(this, prev, next, val);
	}

	/* ---------------------------------------------------------
		ACCESSORS
	--------------------------------------------------------- */
	public associative(): Source
	{
		return this.associative_;
	}
}