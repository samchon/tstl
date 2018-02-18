/// <reference path="../API.ts" />

namespace std
{
	export class FrontInsertIterator<T, Source extends base.IPushFrontContainer<T>>
		implements IOutputIterator<T>
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
			return std.equal_to(this.source_, obj.source_);
		}

		public set value(val: T)
		{
			this.source_.push_front(val);
		}
	}
}