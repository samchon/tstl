import { Container } from "../containers/Container";
import { Iterator } from "./Iterator";
import { IBidirectionalIterator } from "../../iterators/IBidirectionalIterator";

export abstract class ReverseIterator<T, 
		Source extends Container<T, Source, Base, This>, 
		Base extends Iterator<T, Source, Base, This>, 
		This extends ReverseIterator<T, Source, Base, This>>
	implements Readonly<IBidirectionalIterator<T, This>>
{
	/**
	 * @hidden
	 */
	protected base_: Base;

	/* ---------------------------------------------------------
		CONSTRUCTORS
	--------------------------------------------------------- */
	protected constructor(base: Base)
	{
		this.base_ = base.prev();
	}

	// CREATE A NEW OBJECT WITH SAME (DERIVED) TYPE
	/**
	 * @hidden
	 */
	protected abstract _Create_neighbor(base: Base): This;

	/* ---------------------------------------------------------
		ACCESSORS
	--------------------------------------------------------- */
	public source(): Source
	{
		return this.base_.source();
	}

	public base(): Base
	{
		return this.base_.next();
	}
	
	public get value(): T
	{
		return this.base_.value;
	}

	/* ---------------------------------------------------------
		MOVERS
	--------------------------------------------------------- */
	public prev(): This
	{
		// this.base().next()
		return this._Create_neighbor(this.base_);
	}

	public next(): This
	{
		// this.base().prev()
		return this._Create_neighbor(this.base().prev());
	}

	/* ---------------------------------------------------------
		COMPARES
	--------------------------------------------------------- */
	public equals(obj: This): boolean
	{
		return this.base_.equals(obj.base_);
	}
}