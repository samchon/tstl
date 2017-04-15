/// <reference path="../../API.ts" />

namespace std.base
{
	/**
	 * @hidden
	 */
	export class ForOfAdaptor<T> implements IterableIterator<T>
	{
		private it_: IForwardIterator<T>;
		private last_: IForwardIterator<T>;

		public constructor(first: IForwardIterator<T>, last: IForwardIterator<T>)
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
				let it: IForwardIterator<T> = this.it_;
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