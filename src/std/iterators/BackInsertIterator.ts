/// <reference path="../API.ts" />

namespace std
{
	export class BackInsertIterator<T, Source extends base._IPushBack<T>>
		implements Readonly<IForwardIterator<T>>
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
			return std.equal_to(this.source_, obj.source_);
		}

		public set value(val: T)
		{
			this.source_.push_back(val);
		}
	}
}