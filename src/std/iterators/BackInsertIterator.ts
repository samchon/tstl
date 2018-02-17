/// <reference path="../API.ts" />

namespace std
{
	export class BackInsertIterator<T, Source extends base.ILinearContainer<T>>
		implements IOutputIterator<T>
	{
		private source_: Source;

		public constructor(source: Source)
		{
			this.source_ = source;
		}

		/* ---------------------------------------------------------
			MOVERS
		--------------------------------------------------------- */
		public next(): BackInsertIterator<T, Source>
		{
			return this;
		}

		public advance(n: number): BackInsertIterator<T, Source>
		{
			n;
			return this;
		}

		/* ---------------------------------------------------------
			ACCESSORS
		--------------------------------------------------------- */
		public equals(obj: BackInsertIterator<T, Source>): boolean
		{
			return std.equal_to(this.source_, obj.source_);
		}

		public set value(val: T)
		{
			this.source_.push_back(val);
		}
	}
}