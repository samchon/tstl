/// <reference path="../../API.ts" />

namespace std.base
{
	export abstract class Iterator<T, 
			Source extends IContainer<T>, 
			This extends IIterator<T>>
	{
		/* ---------------------------------------------------------
			MOVERS
		--------------------------------------------------------- */
		public abstract prev(): This;
		public abstract next(): This;

		/* ---------------------------------------------------------
			ACCESSORS
		--------------------------------------------------------- */
		public abstract source(): Source;
		public abstract equals(obj: This): boolean;
		
		public abstract get value(): T; // TS2.0 New Feature
	}
}
