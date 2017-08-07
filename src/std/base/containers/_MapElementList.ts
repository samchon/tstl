/// <reference path="../../API.ts" />

/// <reference path="_ListContainer.ts" />

namespace std.base
{
	/**
	 * @hidden
	 */
	export class _MapElementList<Key, T> 
		extends _ListContainer<Pair<Key, T>, MapIterator<Key, T>>
	{
		/**
		 * @hidden
		 */
		private associative_: MapContainer<Key, T>;

		/**
		 * @hidden
		 */
		private rend_: MapReverseIterator<Key, T>;

		/* ---------------------------------------------------------
			CONSTRUCTORS
		--------------------------------------------------------- */
		public constructor(associative: MapContainer<Key, T>)
		{
			super();

			this.associative_ = associative;
		}

		protected _Create_iterator(prev: MapIterator<Key, T>, next: MapIterator<Key, T>, val: Pair<Key, T>): MapIterator<Key, T>
		{
			return new MapIterator<Key, T>(this, prev, next, val);
		}
		protected _Set_begin(it: MapIterator<Key, T>): void
		{
			super._Set_begin(it);
			this.rend_ = new MapReverseIterator<Key, T>(it);
		}

		/* ---------------------------------------------------------
			ACCESSORS
		--------------------------------------------------------- */
		public associative(): MapContainer<Key, T>
		{
			return this.associative_;
		}

		public rbegin(): MapReverseIterator<Key, T>
		{
			return new MapReverseIterator<Key, T>(this.end());
		}
		public rend(): MapReverseIterator<Key, T>
		{
			return this.rend_;
		}
	}
}