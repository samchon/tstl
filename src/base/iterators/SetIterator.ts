import { ListIterator } from "./ListIterator";
import { ReverseIterator } from "./ReverseIterator";

import { SetContainer } from "../containers/SetContainer";
import { _SetElementList } from "../containers/_SetElementList";

import { less } from "../../functors/functional/comparisons";
import { hash } from "../../functors/functional/hash";

export class SetIterator<T, Source extends SetContainer<T, Source>>
	extends ListIterator<T, 
		Source, 
		SetIterator<T, Source>, 
		SetReverseIterator<T, Source>>
{
	/**
	 * @hidden
	 */
	private source_: _SetElementList<T, Source>;

	/* ---------------------------------------------------------
		CONSTRUCTORS
	--------------------------------------------------------- */
	public constructor(source: _SetElementList<T, Source>, prev: SetIterator<T, Source>, next: SetIterator<T, Source>, val: T)
	{
		super(prev, next, val);

		this.source_ = source;
	}

	public reverse(): SetReverseIterator<T, Source>
	{
		return new SetReverseIterator(this);
	}

	/* ---------------------------------------------------------
		ACCESSORS
	--------------------------------------------------------- */
	public source(): Source
	{
		return this.source_.associative();
	}
	
	public less(obj: SetIterator<T, Source>): boolean
	{
		return less(this.value, obj.value);
	}

	public hashCode(): number
	{
		return hash(this.value);
	}
}

export class SetReverseIterator<T, Source extends SetContainer<T, Source>>
	extends ReverseIterator<T, 
		Source, 
		SetIterator<T, Source>, 
		SetReverseIterator<T, Source>>
{
	/* ---------------------------------------------------------
		CONSTRUCTORS
	--------------------------------------------------------- */
	public constructor(base: SetIterator<T, Source>)
	{
		super(base);
	}

	/**
	 * @hidden
	 */
	protected _Create_neighbor(base: SetIterator<T, Source>): SetReverseIterator<T, Source>
	{
		return new SetReverseIterator(base);
	}
}