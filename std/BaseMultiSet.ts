/// <reference path="SetContainer.ts" />

namespace std
{
	export abstract class BaseMultiSet<T>
		extends SetContainer<T>
	{
		/* ---------------------------------------------------------
		    CONSTRUCTORS
	    --------------------------------------------------------- */
		/**
		 * Default Constructor.
		 */
		public constructor()
		{
			super();
		}

		public count(val: T): number
		{
			var myIt = this.find(val);
			if (myIt.equals(this.end()))
				return 0;

			var size: number = -1;

			for (let it = myIt; !it.equals(this.end()) && std.equals(val, it.value); it = it.prev())
				size++;

			for (let it = myIt; !it.equals(this.end()) && std.equals(val, it.value); it = it.next())
				size++;

			return size;
		}

		/* ---------------------------------------------------------
		    ELEMENTS I/O
	    --------------------------------------------------------- */
		public insert(val: T): Iterator<T>;

		public insert(hint: Iterator<T>, val: T): Iterator<T>;

		public insert<U extends T>(begin: Iterator<U>, end: Iterator<U>): Iterator<T>;

		public insert(...args: any[]): any
		{
			return super.insert.apply(this, args);
		}
	}
}