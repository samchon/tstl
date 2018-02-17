/// <reference path="../API.ts" />

namespace std
{
	export class InsertIterator<T>
	{
		private container_: base.Container<T>;
		private it_: base.Iterator<T>;

		public constructor(container: base.Container<T>, it: base.Iterator<T>)
		{
			this.container_ = container;
			this.it_ = it;
		}

		/* ---------------------------------------------------------
			MOVERS
		--------------------------------------------------------- */
		public next(): InsertIterator<T>
		{
			return this;
		}

		public advance(n: number): InsertIterator<T>
		{
			n;
			return this;
		}

		/* ---------------------------------------------------------
			ACCESSORS
		--------------------------------------------------------- */
		public equals(obj: InsertIterator<T>): boolean
		{
			return std.equal_to(this.it_, obj.it_);
		}

		public set value(val: T)
		{
			this.container_.insert(this.it_, val);
			this.it_ = this.it_.next();
		}
	}
}