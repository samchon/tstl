/// <reference path="../../API.ts" />

namespace std.base
{
	/**
	 * @hidden
	 */
	export class _DequeForOfAdaptor<T> implements IterableIterator<T>
	{
		private matrix_: T[][];
		private row_: number;
		private col_: number;

		public constructor(matrix: T[][])
		{
			this.matrix_ = matrix;
			this.row_ = 0;
			this.col_ = 0;
		}

		public next(): IteratorResult<T>
		{
			if (this.row_ == this.matrix_.length)
				return {
					done: true,
					value: undefined
				}
			else
			{
				let val: T = this.matrix_[this.row_][this.col_];
				if (++this.col_ == this.matrix_[this.row_].length)
				{
					this.row_++;
					this.col_ = 0;
				}

				return {
					done: false,
					value: val
				}
			}
		}

		public [Symbol.iterator](): IterableIterator<T>
		{
			return this;
		}
	}
}