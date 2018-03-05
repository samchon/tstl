/// <reference path="../../API.ts" />

namespace std.base
{
	export abstract class Iterator<T, 
			SourceT extends Container<T, SourceT, IteratorT, ReverseIteratorT>, 
			IteratorT extends Iterator<T, SourceT, IteratorT, ReverseIteratorT>,
			ReverseIteratorT extends ReverseIterator<T, SourceT, IteratorT, ReverseIteratorT>>
	{
		/* ---------------------------------------------------------
			MOVERS
		--------------------------------------------------------- */
		public abstract prev(): IteratorT;
		public abstract next(): IteratorT;

		/* ---------------------------------------------------------
			ACCESSORS
		--------------------------------------------------------- */
		public abstract source(): SourceT;
		public abstract equals(obj: IteratorT): boolean;
		
		public abstract get value(): T; // TS2.0 New Feature
	}
}
