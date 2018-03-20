/// <reference path="../API.ts" />

/// <reference path="../base/iterators/_InsertIterator.ts" />

namespace std
{
	export class FrontInsertIterator<T, Source extends base._IPushFront<T>>
		extends base._InsertIterator<T, FrontInsertIterator<T, Source>>
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
			return std.equal_to(this.source_, obj.source_);
		}
	}
}