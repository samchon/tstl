import { ListIterator } from "./ListIterator";
import { ReverseIterator } from "./ReverseIterator";

import { SetContainer } from "../containers/SetContainer";
import { _SetElementList } from "../containers/_SetElementList";

/**
 * Iterator of Set Containers.
 * 
 * @author Jeongho Nam <http://samchon.org>
 */
export class SetIterator<Key, Unique extends boolean, Source extends SetContainer<Key, Unique, Source>>
	extends ListIterator<Key, 
		Source, 
		SetIterator<Key, Unique, Source>, 
		SetReverseIterator<Key, Unique, Source>>
{
	/**
	 * @hidden
	 */
	private source_: _SetElementList<Key, Unique, Source>;

	/* ---------------------------------------------------------
		CONSTRUCTORS
	--------------------------------------------------------- */
	/**
	 * @hidden
	 */
	public constructor(list: _SetElementList<Key, Unique, Source>, prev: SetIterator<Key, Unique, Source>, next: SetIterator<Key, Unique, Source>, key: Key)
	{
		super(prev, next, key);

		this.source_ = list;
	}

	/**
	 * @inheritDoc
	 */
	public reverse(): SetReverseIterator<Key, Unique, Source>
	{
		return new SetReverseIterator(this);
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
}

/**
 * Reverse iterator of Set Containers.
 * 
 * @author Jeongho Nam <http://samchon.org>
 */
export class SetReverseIterator<Key, Unique extends boolean, Source extends SetContainer<Key, Unique, Source>>
	extends ReverseIterator<Key, 
		Source, 
		SetIterator<Key, Unique, Source>, 
		SetReverseIterator<Key, Unique, Source>>
{
	/* ---------------------------------------------------------
		CONSTRUCTORS
	--------------------------------------------------------- */
	/**
	 * Initializer Constructor.
	 * 
	 * @param base The base iterator.
	 */
	public constructor(base: SetIterator<Key, Unique, Source>)
	{
		super(base);
	}

	/**
	 * @hidden
	 */
	protected _Create_neighbor(base: SetIterator<Key, Unique, Source>): SetReverseIterator<Key, Unique, Source>
	{
		return new SetReverseIterator(base);
	}
}