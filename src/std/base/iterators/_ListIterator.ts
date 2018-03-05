/// <reference path="../../API.ts" />

/// <reference path="Iterator.ts" />
/// <reference path="ReverseIterator.ts" />

namespace std.base
{
	/**
	 * @hidden
	 */
	export abstract class _ListIterator<T, 
			SourceT extends Container<T, SourceT, IteratorT, ReverseIteratorT>,
			IteratorT extends _ListIterator<T, SourceT, IteratorT, ReverseIteratorT>,
			ReverseIteratorT extends ReverseIterator<T, SourceT, IteratorT, ReverseIteratorT>>
		extends Iterator<T, SourceT, IteratorT, ReverseIteratorT>
	{
		/**
		 * @hidden
		 */
		private prev_: IteratorT;

		/**
		 * @hidden
		 */
		private next_: IteratorT;

		/**
		 * @hidden
		 */
		private value_: T;

		/**
		 * @hidden
		 */
		protected constructor(prev: IteratorT, next: IteratorT, value: T)
		{
			super();

			this.prev_ = prev;
			this.next_ = next;
			this.value_ = value;
		}

		/* ---------------------------------------------------------------
			ACCESSORS
		--------------------------------------------------------------- */
		public prev(): IteratorT
		{
			return this.prev_;
		}

		public next(): IteratorT
		{
			return this.next_;
		}

		public get value(): T
		{
			return this.value_;
		}

		/* ---------------------------------------------------------------
			COMPARISON
		--------------------------------------------------------------- */
		public equals(obj: IteratorT): boolean
		{
			return this == <any>obj;
		}
	}
}
