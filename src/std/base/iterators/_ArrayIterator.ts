/// <reference path="../../Iterator.ts" />

namespace std.base
{
	/**
	 * @hidden
	 */
	export class _ArrayIterator<T> extends Iterator<T>
	{
		private data_: Array<T>;
		private index_: number;

		/* ---------------------------------------------------------
			CONSTRUCTORS
		--------------------------------------------------------- */
		public constructor(data: Array<T>, index: number)
		{
			super(null);

			this.data_ = data;
			this.index_ = index;
		}

		/* ---------------------------------------------------------
			ACCESSORS
		--------------------------------------------------------- */
		public source(): Container<T>
		{
			return null;
		}

		public index(): number
		{
			return this.index_;
		}

		public get value(): T
		{
			return this.data_[this.index_];
		}

		/* ---------------------------------------------------------
			MOVERS
		--------------------------------------------------------- */
		public prev(): _ArrayIterator<T>
		{
			this.index_--;
			return this;
		}
		public next(): _ArrayIterator<T>
		{
			this.index_++;
			return this;
		}

		public advance(n: number): _ArrayIterator<T>
		{
			this.index_ += n;
			return this;
		}

		/* ---------------------------------------------------------
			COMPARES
		--------------------------------------------------------- */
		public equals(obj: _ArrayIterator<T>): boolean
		{
			return this.data_ == obj.data_ && this.index_ == obj.index_;
		}

		public swap(obj: _ArrayIterator<T>): void
		{
			[this.data_, obj.data_] = [obj.data_, this.data_];
			[this.index_, obj.index_] = [obj.index_, this.index_];
		}
	}
}