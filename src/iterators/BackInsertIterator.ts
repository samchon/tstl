import { IForwardIterator } from "./IForwardIterator";

import { _IPushBack } from "../base/disposable/IPartialContainers";
import { equal_to } from "../functors/functional/comparisons";

export class BackInsertIterator<T, Source extends _IPushBack<T>>
	implements IForwardIterator<T, BackInsertIterator<T, Source>>
{
	private source_: Source;

	public constructor(source: Source)
	{
		this.source_ = source;
	}

	public next(): BackInsertIterator<T, Source>
	{
		return this;
	}
	
	public equals(obj: BackInsertIterator<T, Source>): boolean
	{
		return equal_to(this.source_, obj.source_);
	}

	public set value(val: T)
	{
		this.source_.push_back(val);
	}
}

export type back_insert_iterator<T, Source extends _IPushBack<T>> = BackInsertIterator<T, Source>;
export var back_insert_iterator = BackInsertIterator;