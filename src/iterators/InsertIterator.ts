import { IForwardIterator } from "./IForwardIterator";

import { _IInsert } from "../base/disposable/IPartialContainers";
import { equal_to } from "../functors/functional/comparisons";

export class InsertIterator<T, 
		Container extends _IInsert<T, Iterator>, 
		Iterator extends IForwardIterator<T, Iterator>>
	implements IForwardIterator<T, InsertIterator<T, Container, Iterator>>
{
	private container_: Container;
	private it_: Iterator;

	public constructor(container: Container, it: Iterator)
	{
		this.container_ = container;
		this.it_ = it;
	}

	public set value(val: T)
	{
		this.container_.insert(this.it_, val);
		this.it_ = this.it_.next() as Iterator;
	}

	public next(): InsertIterator<T, Container, Iterator>
	{
		return this;
	}

	public equals(obj: InsertIterator<T, Container, Iterator>): boolean
	{
		return equal_to(this.it_, obj.it_);
	}
}

export type insert_iterator<T, 
		Container extends _IInsert<T, Iterator>, 
		Iterator extends IForwardIterator<T, Iterator>> 
	= InsertIterator<T, Container, Iterator>;
export var insert_iterator = InsertIterator;