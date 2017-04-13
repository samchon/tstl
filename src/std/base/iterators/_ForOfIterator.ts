/// <reference path="../../API.ts" />

namespace std.base
{
	/**
	 * @hidden
	 */
	export class _ForOfIterator<T> implements IterableIterator<T>
	{
		private it_: Iterator<T>;
		private end_: Iterator<T>;

		public constructor(container: Container<T>)
		{
			this.it_ = container.begin();
			this.end_ = container.end();
		}

		public next(): IteratorResult<T>
		{
			if (this.it_.equals(this.end_))
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