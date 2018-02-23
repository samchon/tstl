/// <reference path="../../API.ts" />

/// <reference path="Iterator.ts" />

namespace std.base
{
	export abstract class ReverseIterator<T, Source extends Container<T>, Base extends Iterator<T>, This extends ReverseIterator<T, Source, Base, This>>
		extends Iterator<T>
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
			// this.base().next()
			return this._Create_neighbor(this.base_);
		}

		public next(): This
		{
			// this.base().prev()
			return this._Create_neighbor(this.base().prev() as Base);
		}

		public advance(n: number): This
		{
			// this.base().advance(-n)
			return this._Create_neighbor(this.base().advance(-n) as Base);
		}

		/* ---------------------------------------------------------
			COMPARES
		--------------------------------------------------------- */
		public equals(obj: This): boolean
		{
			return this.base_.equals(obj.base_);
		}
	}
}
