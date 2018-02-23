/// <reference path="../../API.ts" />

/// <reference path="Iterator.ts" />
/// <reference path="ReverseIterator.ts" />

namespace std.base
{
	/**
	 * @hidden
	 */
	export abstract class _ListIterator<T, 
			Source extends IContainer<T>,
			This extends _IListIterator<T>>
		extends Iterator<T, Source, This>
	{
		/**
		 * @hidden
		 */
		private prev_: This;

		/**
		 * @hidden
		 */
		private next_: This;

		/**
		 * @hidden
		 */
		private value_: T;

		/**
		 * @hidden
		 */
		protected constructor(prev: This, next: This, value: T)
		{
			super();

			this.prev_ = prev;
			this.next_ = next;
			this.value_ = value;
		}

		/* ---------------------------------------------------------------
			ACCESSORS
		--------------------------------------------------------------- */
		public prev(): This
		{
			return this.prev_;
		}

		public next(): This
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
		public equals(obj: This): boolean
		{
			return this == <any>obj;
		}
	}
}
