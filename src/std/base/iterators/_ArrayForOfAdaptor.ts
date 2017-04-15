/// <reference path="../../API.ts" />

namespace std.base
{
	/**
	 * @hidden
	 */
	export class _ArrayForOfAdaptor<T> implements IterableIterator<T>
	{
		private container_: IArrayContainer<T>;
		private index_: number;

		public constructor(container: IArrayContainer<T>)
		{
			this.container_ = container;
			this.index_ = 0;
		}

		public next(): IteratorResult<T>
		{
			if (this.index_ == this.container_.size())
				return {
					done: true,
					value: undefined
				};
			else
				return {
					done: false,
					value: this.container_.at(this.index_++)
				};
		}

		public [Symbol.iterator](): IterableIterator<T>
		{
			return this;
		}
	}
}