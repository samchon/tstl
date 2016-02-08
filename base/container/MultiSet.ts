/// <reference path="SetContainer.ts" />

namespace std.base.container
{
	export abstract class MultiSet<T>
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
			let myIt = this.find(val);
			if (myIt.equals(this.end()))
				return 0;

			let size: number = 0;
			for (let it = myIt; !it.equals(this.end()) && std.equals(val, it.value); it = it.next())
				size++;

			return size;
		}

		/* ---------------------------------------------------------
			ELEMENTS I/O
		--------------------------------------------------------- */
		public insert(val: T): SetIterator<T>;

		public insert(hint: SetIterator<T>, val: T): SetIterator<T>;

		public insert<U extends T>(begin: Iterator<U>, end: Iterator<U>): SetIterator<T>;

		public insert(...args: any[]): any
		{
			return super.insert.apply(this, args);
		}
	}
}