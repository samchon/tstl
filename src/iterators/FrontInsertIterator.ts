import { _InsertIterator } from "../base/iterators/_InsertIterator";

import { _IPushFront } from "../base/disposable/IPartialContainers";
import { equal_to } from "../functional/comparators";

/**
 * Front insert iterator.
 * 
 * @author Jeongho Nam <http://samchon.org>
 */
export class FrontInsertIterator<T, Source extends _IPushFront<T>>
	extends _InsertIterator<T, FrontInsertIterator<T, Source>>
{
	/**
	 * @hidden
	 */
	private source_: Source;

	/* ---------------------------------------------------------
		METHODS
	--------------------------------------------------------- */
	/**
	 * Initializer Constructor.
	 * 
	 * @param source The source container.
	 */
	public constructor(source: Source)
	{
		super();
		this.source_ = source;
	}

	/**
	 * @inheritDoc
	 */
	public set value(val: T)
	{
		this.source_.push_front(val);
	}

	/**
	 * @inheritDoc
	 */
	public equals(obj: FrontInsertIterator<T, Source>): boolean
	{
		return equal_to(this.source_, obj.source_);
	}
}