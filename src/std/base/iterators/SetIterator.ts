/// <reference path="../../API.ts" />

/// <reference path="_ListIteratorBase.ts" />

namespace std.base
{
	export class SetIterator<T, Source extends ISetContainer<T>>
		extends _ListIteratorBase<T>
		implements IComparable<SetIterator<T, Source>>
	{
		/**
		 * @hidden
		 */
		private source_: _SetElementList<T, Source>;

		/* ---------------------------------------------------------
			CONSTRUCTORS
		--------------------------------------------------------- */
		public constructor(source: _SetElementList<T, Source>, prev: SetIterator<T, Source>, next: SetIterator<T, Source>, val: T)
		{
			super(prev, next, val);

			this.source_ = source;
		}

		/* ---------------------------------------------------------
			ACCESSORS
		--------------------------------------------------------- */
		public source(): Source
		{
			return this.source_.associative();
		}

		public prev(): SetIterator<T, Source>
		{
			return this.prev_ as SetIterator<T, Source>;
		}

		public next(): SetIterator<T, Source>
		{
			return this.next_ as SetIterator<T, Source>;
		}

		public advance(size: number): SetIterator<T, Source>
		{
			return super.advance(size) as SetIterator<T, Source>;
		}
		
		/* ---------------------------------------------------------
			COMPARISONS
		--------------------------------------------------------- */
		public less(obj: SetIterator<T, Source>): boolean
		{
			return less(this.value, obj.value);
		}
		
		public equals(obj: SetIterator<T, Source>): boolean 
		{
			return this == obj;
		}

		public hashCode(): number
		{
			return hash(this.value);
		}
	}
}

namespace std.base
{
	export class SetReverseIterator<T, Source extends ISetContainer<T>>
		extends ReverseIterator<T, SetContainer<T, Source>, SetIterator<T, Source>, SetReverseIterator<T, Source>>
		implements IComparable<SetReverseIterator<T, Source>>
	{
		/* ---------------------------------------------------------
			CONSTRUCTORS
		--------------------------------------------------------- */
		public constructor(base: SetIterator<T, Source>)
		{
			super(base);
		}

		/**
		 * @hidden
		 */
		protected _Create_neighbor(base: SetIterator<T, Source>): SetReverseIterator<T, Source>
		{
			return new SetReverseIterator<T, Source>(base);
		}
	}
}
