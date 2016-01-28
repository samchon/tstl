/// <reference path="SetContainer.ts" />

namespace std
{
	export abstract class BaseSet<T>
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
		public insert(val: T): Pair<Iterator<T>, boolean>;

		public insert(hint: Iterator<T>, val: T): Iterator<T>;

		public insert<U extends T>(begin: Iterator<U>, end: Iterator<U>): Iterator<T>;

		public insert(...args: any[]): any
		{
			return super.insert.apply(this, args);
		}

		protected insertByVal(val: T): any
		{
            // TEST WHETHER EXIST
            var it = this.find(val);
            if (it.equals(this.end()) == false)
                return new Pair<Iterator<T>, boolean>(it, false);

            // INSERT
            this.data.pushBack(val);
            it = it.prev();

            // POST-PROCESS
            this.handleInsert(<SetIterator<T>>it);

            return new Pair<Iterator<T>, boolean>(it, true);
        }
	}
}