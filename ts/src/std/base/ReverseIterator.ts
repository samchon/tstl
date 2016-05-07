/// <reference path="Iterator.ts" />

namespace std.base
{
	/**
	 * A reverse and bi-directional iterator. </p>
	 * 
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export abstract class ReverseIterator<T>
		extends Iterator<T>
	{
		protected iterator_: Iterator<T>;

		/* ---------------------------------------------------------------
			CONSTRUCTORS
		--------------------------------------------------------------- */
		public constructor(iterator: Iterator<T>)
		{
			super(iterator.get_source());

			this.iterator_ = iterator;
		}
		
		/* ---------------------------------------------------------------
			ACCESSORS
		--------------------------------------------------------------- */
		public equal_to<U extends T>(obj: Iterator<U>): boolean;

		public equal_to<U extends T>(obj: ReverseIterator<U>): boolean;

		public equal_to<U extends T>(obj: Iterator<U>): boolean
		{
			if (obj instanceof ReverseIterator)
			{
				return this.iterator_.equal_to((obj as ReverseIterator<U>).iterator_);
			}
			else
				return this.iterator_.equal_to(obj);
		}

		/**
		 * @inheritdoc
		 */
		public get value(): T
		{
			return this.iterator_.value;
		}

		public swap(obj: Iterator<T>): void;

		public swap(obj: ReverseIterator<T>): void;

		public swap(obj: Iterator<T>): void
		{
			if (obj instanceof ReverseIterator)
				this.iterator_.swap((obj as ReverseIterator<T>).iterator_);
			else
				this.iterator_.swap(obj);
		}
	}
}