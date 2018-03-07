/// <reference path="../../API.ts" />

namespace std.base
{
	export class ForOfAdaptor<T, Iterator extends Readonly<IForwardIterator<T, Iterator>>> 
		implements IterableIterator<T>
	{
		private it_: Iterator;
		private last_: Iterator;

		public constructor(first: Iterator, last: Iterator)
		{
			this.it_ = first;
			this.last_ = last;
		}

		public next(): IteratorResult<T>
		{
			if (this.it_.equals(this.last_))
				return {
					done: true,
					value: undefined
				};
			else
			{
				let it: Iterator = this.it_;
				this.it_ = this.it_.next();

				return {
					done: false,
					value: it.value
				}
			}
		}

		public [Symbol.iterator](): IterableIterator<T>
		{
			return this;
		}
	}
}
