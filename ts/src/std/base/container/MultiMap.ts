/// <reference path="MapContainer.ts" />

namespace std.base.container
{
	/**
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export abstract class MultiMap<Key, T>
		extends MapContainer<Key, T>
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
		public count(key: Key): number
		{
			let myIt = this.find(key);
			if (myIt.equals(this.end()))
				return 0;

			let size: number = 0;
			for (let it = myIt.next(); !it.equals(this.end()) && std.equals(key, it.first); it = it.next())
				size++;

			return size;
		}

		/* ---------------------------------------------------------
			ELEMENTS I/O
		--------------------------------------------------------- */
		/**
		 * 
		 * @param pair
		 */
		public insert(pair: Pair<Key, T>): MapIterator<Key, T>;

		/**
		 * 
		 * @param tuple
		 */
		public insert<L extends Key, U extends T>(tuple: [L, U]): MapIterator<Key, T>;

		/**
		 * @inheritdoc
		 */
		public insert(hint: MapIterator<Key, T>, pair: Pair<Key, T>): MapIterator<Key, T>;
		
		/**
		 * @inheritdoc
		 */
		public insert<L extends Key, U extends T>
			(hint: MapIterator<Key, T>, tuple: [L, U]): MapIterator<Key, T>;

		/**
		 * @inheritdoc
		 */
		public insert<L extends Key, U extends T, InputIterator extends MapIterator<L, U>>
			(begin: InputIterator, end: InputIterator): void;

		public insert(...args: any[]): any
		{
			return super.insert.apply(this, args);
		}
	}
}