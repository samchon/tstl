/// <reference path="MapContainer.ts" />

namespace std.base
{
	export abstract class MultiMap<K, T>
		extends MapContainer<K, T>
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

		/**
		 * @inheritdoc
		 */
		public count(key: K): number
		{
			var myIt = this.find(key);
			if (myIt.equals(this.end()))
				return 0;

			var size: number = 0;
			for (let it = myIt.next(); !it.equals(this.end()) && std.equals(key, it.first); it = it.next())
				size++;

			return size;
		}

		/* ---------------------------------------------------------
		    ELEMENTS I/O
	    --------------------------------------------------------- */
		public insert<L extends K, U extends T>(pair: Pair<L, U>): MapIterator<K, T>;

		/**
		 * @inheritdoc
		 */
		public insert(hint: MapIterator<K, T>, pair: Pair<K, T>): MapIterator<K, T>;
		
		/**
		 * @inheritdoc
		 */
		public insert<L extends K, U extends T>
			(begin: MapIterator<L, U>, end: MapIterator<L, U>): void;

		public insert(...args: any[]): any
		{
			return super.insert.apply(this, args);
		}
	}
}