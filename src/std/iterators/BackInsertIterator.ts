/// <reference path="../API.ts" />

/// <reference path="../base/iterators/_InsertIterator.ts" />

namespace std
{
	export class BackInsertIterator<T, Source extends base._IPushBack<T>>
		extends base._InsertIterator<T, BackInsertIterator<T, Source>>
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
			return std.equal_to(this.source_, obj.source_);
		}
	}
}