/// <reference path="../../API.ts" />

namespace std.base
{
	export abstract class Iterator<T> 
		implements IBidirectionalIterator<T>, IComparable<Iterator<T>>
	{
		/* ---------------------------------------------------------
			MOVERS
		--------------------------------------------------------- */
		public abstract prev(): Iterator<T>;

		public abstract next(): Iterator<T>;

		public abstract advance(n: number): Iterator<T>;

		/* ---------------------------------------------------------
			ACCESSORS
		--------------------------------------------------------- */
		public abstract source(): Container<T>;

		public abstract equals(obj: Iterator<T>): boolean;
		
		public abstract get value(): T; // TS2.0 New Feature

		public abstract swap(obj: Iterator<T>): void;
	}
}
