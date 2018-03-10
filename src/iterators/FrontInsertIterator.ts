import { IForwardIterator } from "./IForwardIterator";

import { _IPushFront } from "../base/disposable/IPartialContainers";
import { equal_to } from "../functional/comparisons";

export class FrontInsertIterator<T, Source extends _IPushFront<T>>
	implements IForwardIterator<T, FrontInsertIterator<T, Source>>
{
	private source_: Source;

	public constructor(source: Source)
	{
		this.source_ = source;
	}

	public next(): FrontInsertIterator<T, Source>
	{
		return this;
	}

	public equals(obj: FrontInsertIterator<T, Source>): boolean
	{
		return equal_to(this.source_, obj.source_);
	}

	public set value(val: T)
	{
		this.source_.push_front(val);
	}
}

export type front_insert_iterator<T, Source extends _IPushFront<T>> = FrontInsertIterator<T, Source>;
export var front_insert_iterator = FrontInsertIterator;