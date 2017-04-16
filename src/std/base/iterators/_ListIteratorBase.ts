/// <reference path="../../API.ts" />

/// <reference path="Iterator.ts" />

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
		 * Initializer Constructor.
		 * 
		 * @param source The source {@link Container} to reference.
		 * @param prev A refenrece of previous node ({@link ListIterator iterator}).
		 * @param next A refenrece of next node ({@link ListIterator iterator}).
		 * @param value Value to be stored in the node (iterator).
		 */
		protected constructor(source: Container<T>, prev: _ListIteratorBase<T>, next: _ListIteratorBase<T>, value: T)
		{
			super(source);

			this.prev_ = prev;
			this.next_ = next;
			this.value_ = value;
		}

		/* ---------------------------------------------------------------
			ACCESSORS
		--------------------------------------------------------------- */
		/**
		 * @inheritdoc
		 */
		public prev(): _ListIteratorBase<T>
		{
			return this.prev_;
		}

		/**
		 * @inheritdoc
		 */
		public next(): _ListIteratorBase<T>
		{
			return this.next_;
		}

		 /**
		  * @inheritdoc
		  */
		public advance(step: number): _ListIteratorBase<T>
		{
			let it: _ListIteratorBase<T> = this;
			
			if (step >= 0)
			{
				for (let i: number = 0; i < step; i++)
				{
					it = it.next();

					if (it.equals(this.source_.end() as _ListIteratorBase<T>))
						return it;
				}
			}
			else
			{
				for (let i: number = 0; i < step; i++)
				{
					it = it.prev();

					if (it.equals(this.source_.end() as _ListIteratorBase<T>))
						return it;
				}
			}
			
			return it;
		}

		/**
		 * @inheritdoc
		 */
		public get value(): T
		{
			return this.value_;
		}

		/* ---------------------------------------------------------------
			COMPARISON
		--------------------------------------------------------------- */
		/**
		 * @inheritdoc
		 */
		public equals(obj: _ListIteratorBase<T>): boolean
		{
			return this == obj;
		}

		/**
		 * @inheritdoc
		 */
		public swap(obj: _ListIteratorBase<T>): void
		{
			let source: _ListContainer<T, _ListIteratorBase<T>> = this.source_ as _ListContainer<T, _ListIteratorBase<T>>;
			let supp_prev: _ListIteratorBase<T> = this.prev_;
			let supp_next: _ListIteratorBase<T> = this.next_;

			this.prev_ = obj.prev_;
			this.next_ = obj.next_;
			obj.prev_ = supp_prev;
			obj.next_ = supp_next;

			if (source.end() == this)
				source["end_"] = obj;
			else if (source.end() == obj)
				source["end_"] = this;

			if (source.begin() == this)
				source["begin_"] = obj;
			else if (source.begin() == obj)
				source["begin_"] = this;
		}
	}
}
