/// <reference path="../API.ts" />

namespace std
{
	export class InsertIterator<T, 
			Container extends base.IInsertContainer<T, Iterator>, 
			Iterator extends Readonly<IForwardIterator<T>>
		>
	{
		private container_: Container;
		private it_: Iterator;

		public constructor(container: Container, it: Iterator)
		{
			this.container_ = container;
			this.it_ = it;
		}

		public set value(val: T)
		{
			this.container_.insert(this.it_, val);
			this.it_ = this.it_.next() as Iterator;
		}

		public next(): InsertIterator<T, Container, Iterator>
		{
			return this;
		}

		public equals(obj: InsertIterator<T, Container, Iterator>): boolean
		{
			return std.equal_to(this.it_, obj.it_);
		}
	}
}