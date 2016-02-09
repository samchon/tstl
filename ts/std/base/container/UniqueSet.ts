/// <reference path="SetContainer.ts" />

namespace std.base.container
{
	export abstract class UniqueSet<T>
		extends SetContainer<T>
	{
		/* =========================================================
			CONSTRUCTORS
		========================================================= */
		/**
		 * Default Constructor.
		 */
		public constructor()
		{
			super();
		}

		public count(key: T): number
		{
			return this.find(key).equals(this.end()) ? 0 : 1;
		}

		/* =========================================================
			ELEMENTS I/O
		========================================================= */
		public insert(val: T): Pair<SetIterator<T>, boolean>;

		public insert(hint: SetIterator<T>, val: T): SetIterator<T>;

		public insert<U extends T>(begin: Iterator<U>, end: Iterator<U>): SetIterator<T>;

		public insert(...args: any[]): any
		{
			return super.insert.apply(this, args);
		}
	}
}