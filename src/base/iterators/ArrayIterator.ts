import { ArrayContainer } from "../containers/ArrayContainer";
import { Iterator } from "./Iterator";
import { ReverseIterator } from "./ReverseIterator";

import { IRandomAccessIterator } from "../../iterators/IRandomAccessIterator";
import { equal_to } from "../../functional/comparators";

/**
 * Iterator of Array Containers.
 * 
 * @author Jeongho Nam <http://samchon.org>
 */
export class ArrayIterator<T, Source extends ArrayContainer<T, Source>>
	implements Iterator<T, Source, ArrayIterator<T, Source>, ArrayReverseIterator<T, Source>>,
		IRandomAccessIterator<T, ArrayIterator<T, Source>>
{
	/**
	 * @hidden
	 */
	private source_: Source;

	/**
	 * @hidden
	 */
	private index_: number;
	
	/* ---------------------------------------------------------
		CONSTRUCTORS
	--------------------------------------------------------- */
	/**
	 * Initializer Constructor.
	 * 
	 * @param source Source container.
	 * @param index Index number.
	 */
	public constructor(source: Source, index: number)
	{
		this.source_ = source;
		this.index_ = index;
	}

	/**
	 * @inheritDoc
	 */
	public reverse(): ArrayReverseIterator<T, Source>
	{
		return new ArrayReverseIterator(this);
	}

	/* ---------------------------------------------------------
		ACCESSORS
	--------------------------------------------------------- */
	/**
	 * @inheritDoc
	 */
	public source(): Source
	{
		return this.source_;
	}

	/**
	 * @inheritDoc
	 */
	public index(): number
	{
		return this.index_;
	}

	/**
	 * @inheritDoc
	 */
	public get value(): T
	{
		return this.source().at(this.index_)
	}

	/**
	 * @inheritDoc
	 */
	public set value(val: T)
	{
		this.source().set(this.index_, val);
	}

	/* ---------------------------------------------------------
		MOVERS
	--------------------------------------------------------- */
	/**
	 * @inheritDoc
	 */
	public prev(): ArrayIterator<T, Source>
	{
		return new ArrayIterator(this.source(), this.index_ - 1);
	}

	/**
	 * @inheritDoc
	 */
	public next(): ArrayIterator<T, Source>
	{
		return new ArrayIterator(this.source(), this.index_ + 1);
	}

	/**
	 * @inheritDoc
	 */
	public advance(n: number): ArrayIterator<T, Source>
	{
		return new ArrayIterator(this.source(), this.index_ + n);
	}

	/* ---------------------------------------------------------
		COMPARES
	--------------------------------------------------------- */
	/**
	 * @inheritDoc
	 */
	public equals(obj: ArrayIterator<T, Source>): boolean
	{
		return equal_to(this.source_, obj.source_) && this.index_ === obj.index_;
	}
}

/**
 * Reverse iterator of Array Containers.
 * 
 * @author Jeongho Nam <http://samchon.org>
 */
export class ArrayReverseIterator<T, Source extends ArrayContainer<T, Source>>
	extends ReverseIterator<T, Source, ArrayIterator<T, Source>, ArrayReverseIterator<T, Source>>
	implements IRandomAccessIterator<T, ArrayReverseIterator<T, Source>>
{
	/* ---------------------------------------------------------
		CONSTRUCTORS
	--------------------------------------------------------- */
	/**
	 * Initializer Constructor.
	 * 
	 * @param base The base iterator.
	 */
	public constructor(base: ArrayIterator<T, Source>)
	{
		super(base);
	}

	/**
	 * @hidden
	 */
	protected _Create_neighbor(base: ArrayIterator<T, Source>): ArrayReverseIterator<T, Source>
	{
		return new ArrayReverseIterator(base);
	}

	/**
	 * @inheritDoc
	 */
	public advance(n: number): ArrayReverseIterator<T, Source>
	{
		return this._Create_neighbor(this.base().advance(-n));
	}

	/* ---------------------------------------------------------
		ACCESSORS
	--------------------------------------------------------- */
	/**
	 * @inheritDoc
	 */
	public index(): number
	{
		return this.base_.index();
	}

	/**
	 * @inheritDoc
	 */
	public get value(): T
	{
		return this.base_.value;
	}

	/**
	 * @inheritDoc
	 */
	public set value(val: T)
	{
		this.base_.value = val;
	}
}