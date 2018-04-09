/// <reference path="../../API.ts" />

/// <reference path="Iterator.ts" />
/// <reference path="ReverseIterator.ts" />

namespace std.base
{
	/**
	 * @hidden
	 */
	export abstract class ListIterator<T, 
			SourceT extends IContainer<T, SourceT, IteratorT, ReverseIteratorT>,
			IteratorT extends ListIterator<T, SourceT, IteratorT, ReverseIteratorT>,
			ReverseIteratorT extends ReverseIterator<T, SourceT, IteratorT, ReverseIteratorT>>
		implements Readonly<Iterator<T, SourceT, IteratorT, ReverseIteratorT>>
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
			this.prev_ = prev;
			this.next_ = next;
			this.value_ = value;
		}

		/**
		 * @inheritDoc
		 */
		public abstract reverse(): ReverseIteratorT;

		/* ---------------------------------------------------------------
			ACCESSORS
		--------------------------------------------------------------- */
		/**
		 * @inheritDoc
		 */
		public abstract source(): SourceT;

		/**
		 * @inheritDoc
		 */
		public prev(): IteratorT
		{
			return this.prev_;
		}

		/**
		 * @inheritDoc
		 */
		public next(): IteratorT
		{
			return this.next_;
		}

		/**
		 * @inheritDoc
		 */
		public get value(): T
		{
			return this.value_;
		}

		/* ---------------------------------------------------------------
			COMPARISON
		--------------------------------------------------------------- */
		/**
		 * @inheritDoc
		 */
		public equals(obj: IteratorT): boolean
		{
			return this === <any>obj;
		}
	}
}
