/// <reference path="MapContainer.ts" />

namespace std.base
{
	export abstract class UniqueMap<K, T>
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
			return this.find(key).equals(this.end()) ? 0 : 1;
		}

		/* ---------------------------------------------------------
		    ELEMENTS I/O
	    --------------------------------------------------------- */
		public insert<L extends K, U extends T>(pair: Pair<L, U>): Pair<MapIterator<K, T>, boolean>;

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