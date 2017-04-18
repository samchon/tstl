/// <reference path="../../API.ts" />

namespace std.base
{
	export class ForOfAdaptor<T> implements IterableIterator<T>
	{
		private it_: Iterator<T>;
		private last_: Iterator<T>;

		public constructor(first: Iterator<T>, last: Iterator<T>)
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
				let it: Iterator<T> = this.it_;
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