/// <reference path="../../API.ts" />

namespace std.base
{
	/**
	 * @hidden
	 */
	export class _Repeater<T> implements Readonly<IForwardIterator<T, _Repeater<T>>>
	{
		private index_: number;
		private value_: T;

		/* ---------------------------------------------------------
			CONSTRUCTORS
		--------------------------------------------------------- */
		public constructor(index: number, value: T = null)
		{
			this.index_ = index;
			this.value_ = value;
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
			return this.value_;
		}

		/* ---------------------------------------------------------
			MOVERS & COMPARE
		--------------------------------------------------------- */
		public next(): _Repeater<T>
		{
			++this.index_;
			return this;
		}
		
		public equals(obj: _Repeater<T>): boolean
		{
			return this.index_ == obj.index_;
		}
	}
}