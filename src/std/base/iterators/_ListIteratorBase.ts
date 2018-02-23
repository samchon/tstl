/// <reference path="../../API.ts" />

/// <reference path="Iterator.ts" />
/// <reference path="ReverseIterator.ts" />

namespace std.base
{
	/**
	 * @hidden
	 */
	export abstract class _ListIteratorBase<T>
		extends Iterator<T>
		implements IComparable<_ListIteratorBase<T>>
	{
		/**
		 * @hidden
		 */
		protected prev_: _ListIteratorBase<T>;

		/**
		 * @hidden
		 */
		protected next_: _ListIteratorBase<T>;

		/**
		 * @hidden
		 */
		protected value_: T;

		/**
		 * @hidden
		 */
		protected constructor(prev: _ListIteratorBase<T>, next: _ListIteratorBase<T>, value: T)
		{
			super();

			this.prev_ = prev;
			this.next_ = next;
			this.value_ = value;
		}

		/* ---------------------------------------------------------------
			ACCESSORS
		--------------------------------------------------------------- */
		public prev(): _ListIteratorBase<T>
		{
			return this.prev_;
		}

		public next(): _ListIteratorBase<T>
		{
			return this.next_;
		}

		public advance(step: number): _ListIteratorBase<T>
		{
			let it: _ListIteratorBase<T> = this;
			
			if (step >= 0)
			{
				for (let i: number = 0; i < step; i++)
				{
					it = it.next();

					if (it.equals(this.source().end() as _ListIteratorBase<T>))
						return it;
				}
			}
			else
			{
				for (let i: number = 0; i < step; i++)
				{
					it = it.prev();

					if (it.equals(this.source().end() as _ListIteratorBase<T>))
						return it;
				}
			}	
			return it;
		}

		public get value(): T
		{
			return this.value_;
		}

		/* ---------------------------------------------------------------
			COMPARISON
		--------------------------------------------------------------- */
		public equals(obj: _ListIteratorBase<T>): boolean
		{
			return this == obj;
		}
	}
}
