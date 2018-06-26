import { _InsertIterator } from "../base/iterators/_InsertIterator";

import { _IInsert } from "../base/disposable/IPartialContainers";
import { IForwardIterator } from "./IForwardIterator";
import { equal_to } from "../functional/comparators";

/**
 * Insert iterator.
 * 
 * @author Jeongho Nam <http://samchon.org>
 */
export class InsertIterator<T, 
		Container extends _IInsert<T, Iterator>, 
		Iterator extends IForwardIterator<T, Iterator>>
	extends _InsertIterator<T, InsertIterator<T, Container, Iterator>>
{
	/**
	 * @hidden
	 */
	private container_: Container;

	/**
	 * @hidden
	 */
	private it_: Iterator;

	/* ---------------------------------------------------------
		METHODS
	--------------------------------------------------------- */
	/**
	 * Initializer Constructor.
	 * 
	 * @param container Target container to insert.
	 * @param it Iterator to the position to insert.
	 */
	public constructor(container: Container, it: Iterator)
	{
		super();

		this.container_ = container;
		this.it_ = it;
	}

	/**
	 * @inheritDoc
	 */
	public set value(val: T)
	{
		this.container_.insert(this.it_, val);
		this.it_ = this.it_.next() as Iterator;
	}

	/**
	 * @inheritDoc
	 */
	public equals(obj: InsertIterator<T, Container, Iterator>): boolean
	{
		return equal_to(this.it_, obj.it_);
	}
}