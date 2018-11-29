//================================================================ 
/** @module std.base */
//================================================================
import { IForwardIterator } from "../../iterator/IForwardIterator";

import { Writeonly } from "../../iterator/IFake";

/**
 * @hidden
 */
export abstract class _InsertIterator<T, This extends _InsertIterator<T, This>>
	implements Writeonly<IForwardIterator<T, This>>
{
	/**
	 * Set value.
	 * 
	 * @param val The value to set.
	 */
	public abstract set value(val: T);

	/**
	 * @inheritDoc
	 */
	public next(): This
	{
		return <any>this;
	}

	/**
	 * @inheritDoc
	 */
	public abstract equals(obj: This): boolean;
}