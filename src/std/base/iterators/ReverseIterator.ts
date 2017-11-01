/// <reference path="../../API.ts" />

/// <reference path="Iterator.ts" />

namespace std.base
{
	export abstract class ReverseIterator<T, Source extends Container<T>, Base extends Iterator<T>, This extends ReverseIterator<T, Source, Base, This>>
		extends Iterator<T>
		implements IForwardIterator<T>, IComparable<ReverseIterator<T, Source, Base, This>>
	{
		/**
		 * @hidden
		 */
		protected base_: Base;

		/* ---------------------------------------------------------
			CONSTRUCTORS
		--------------------------------------------------------- */
		protected constructor(base: Base)
		{
			super();
			
			this.base_ = base.prev() as Base;
		}

		// CREATE A NEW OBJECT WITH SAME (DERIVED) TYPE
		/**
		 * @hidden
		 */
		protected abstract _Create_neighbor(base: Base): This;

		/* ---------------------------------------------------------
			ACCESSORS
		--------------------------------------------------------- */
		public source(): Source
		{
			return this.base_.source() as Source;
		}

		public base(): Base
		{
			return this.base_.next() as Base;
		}
		
		public get value(): T
		{
			return this.base_.value;
		}

		/* ---------------------------------------------------------
			MOVERS
		--------------------------------------------------------- */
		public prev(): This
		{
			return this._Create_neighbor(this.base_);
		}

		public next(): This
		{
			return this._Create_neighbor(this.base().prev() as Base);
		}

		public advance(n: number): This
		{
			return this._Create_neighbor(this.base().advance(-n) as Base);
		}

		/* ---------------------------------------------------------
			COMPARES
		--------------------------------------------------------- */
		public equals(obj: This): boolean;
		public equals(obj: Base): boolean;

		public equals(obj: This | Base): boolean
		{
			if (obj instanceof ReverseIterator)
				return this.base_.equals(obj.base_);
			else
				return this.base_.equals(obj as Base);
		}

		public swap(obj: This): void
		{
			this.base_.swap(obj.base_);
		}
	}
}
