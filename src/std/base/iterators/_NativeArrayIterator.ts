/// <reference path="../../API.ts" />

namespace std.base
{
	/**
	 * @hidden
	 */
	export class _NativeArrayIterator<T> 
		implements Readonly<IForwardIterator<T, _NativeArrayIterator<T>>>
	{
		private data_: Array<T>;
		private index_: number;

		/* ---------------------------------------------------------
			CONSTRUCTORS
		--------------------------------------------------------- */
		public constructor(data: Array<T>, index: number)
		{
			this.data_ = data;
			this.index_ = index;
		}

		/* ---------------------------------------------------------
			ACCESSORS
		--------------------------------------------------------- */
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
		public prev(): _NativeArrayIterator<T>
		{
			this.index_--;
			return this;
		}
		public next(): _NativeArrayIterator<T>
		{
			this.index_++;
			return this;
		}

		public advance(n: number): _NativeArrayIterator<T>
		{
			this.index_ += n;
			return this;
		}

		/* ---------------------------------------------------------
			COMPARES
		--------------------------------------------------------- */
		public equals(obj: _NativeArrayIterator<T>): boolean
		{
			return this.data_ == obj.data_ && this.index_ == obj.index_;
		}

		public swap(obj: _NativeArrayIterator<T>): void
		{
			[this.data_, obj.data_] = [obj.data_, this.data_];
			[this.index_, obj.index_] = [obj.index_, this.index_];
		}
	}
}