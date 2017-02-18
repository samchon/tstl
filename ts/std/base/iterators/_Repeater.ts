/// <reference path="../../Iterator.ts" />

namespace std.base
{
	/**
	 * @hidden
	 */
	export class _Repeater<T>
		extends Iterator<T>
	{
		private index_: number;
		private value_: T;

		/* ---------------------------------------------------------
			CONSTRUCTORS
		--------------------------------------------------------- */
		public constructor(index: number, value: T = null)
		{
			super(null);

			this.index_ = index;
			this.value_ = value;
		}

		/* ---------------------------------------------------------
			ACCESSORS
		--------------------------------------------------------- */
		public source(): base.Container<T>
		{
			return null;
		}

		public index(): number
		{
			return this.index_;
		}

		public get value(): T
		{
			return this.value_;
		}

		/* ---------------------------------------------------------
			MOVERS
		--------------------------------------------------------- */
		public prev(): _Repeater<T>
		{
			this.index_--;
			return this;
		}
		public next(): _Repeater<T>
		{
			this.index_++;
			return this;
		}

		public advance(n: number): _Repeater<T>
		{
			this.index_ += n;
			return this;
		}

		/* ---------------------------------------------------------
			COMPARES
		--------------------------------------------------------- */
		public equals(obj: _Repeater<T>): boolean
		{
			return this.index_ == obj.index_;
		}

		public swap(obj: _Repeater<T>): void
		{
			[this.index_, obj.index_] = [obj.index_, this.index_];
		}
	}
}