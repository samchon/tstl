import { _InsertIterator } from "../base/iterators/_InsertIterator";

import { _IPushBack } from "../base/disposable/IPartialContainers";
import { equal_to } from "../functional/comparators";

/**
 * Back insert iterator.
 * 
 * @author Jeongho Nam <http://samchon.org>
 */
export class BackInsertIterator<T, Source extends _IPushBack<T>>
	extends _InsertIterator<T, BackInsertIterator<T, Source>>
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
		this.source_.push_back(val);
	}

	/**
	 * @inheritDoc
	 */
	public equals(obj: BackInsertIterator<T, Source>): boolean
	{
		return equal_to(this.source_, obj.source_);
	}
}