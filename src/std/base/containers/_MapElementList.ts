/// <reference path="../../API.ts" />

/// <reference path="_ListContainer.ts" />

namespace std.base
{
	/**
	 * @hidden
	 */
	export class _MapElementList<Key, T, Source extends IMapContainer<Key, T>> 
		extends _ListContainer<Entry<Key, T>, 
			Source, 
			MapIterator<Key, T, Source>,
			MapReverseIterator<Key, T, Source>>
	{
		/**
		 * @hidden
		 */
		private associative_: Source;

		/**
		 * @hidden
		 */
		private rend_: MapReverseIterator<Key, T, Source>;

		/* ---------------------------------------------------------
			CONSTRUCTORS
		--------------------------------------------------------- */
		public constructor(associative: Source)
		{
			super();

			this.associative_ = associative;
		}

		protected _Create_iterator(prev: MapIterator<Key, T, Source>, next: MapIterator<Key, T, Source>, val: Entry<Key, T>): MapIterator<Key, T, Source>
		{
			return new MapIterator<Key, T, Source>(this, prev, next, val);
		}
		protected _Set_begin(it: MapIterator<Key, T, Source>): void
		{
			super._Set_begin(it);
			this.rend_ = new MapReverseIterator<Key, T, Source>(it);
		}

		/* ---------------------------------------------------------
			ACCESSORS
		--------------------------------------------------------- */
		public associative(): Source
		{
			return this.associative_;
		}

		public rbegin(): MapReverseIterator<Key, T, Source>
		{
			return new MapReverseIterator<Key, T, Source>(this.end());
		}
		public rend(): MapReverseIterator<Key, T, Source>
		{
			return this.rend_;
		}
	}
}