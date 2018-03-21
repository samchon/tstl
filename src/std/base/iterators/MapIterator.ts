/// <reference path="../../API.ts" />

/// <reference path="ListIterator.ts" />

namespace std.base
{
	/**
	 * Iterator of Map Containers.
	 * 
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export class MapIterator<Key, T, Source extends MapContainer<Key, T, Source>>
		extends ListIterator<Entry<Key, T>, 
			Source, 
			MapIterator<Key, T, Source>, 
			MapReverseIterator<Key, T, Source>>
	{
		/**
		 * @hidden
		 */
		private source_: _MapElementList<Key, T, Source>;

		/* ---------------------------------------------------------
			CONSTRUCTORS
		--------------------------------------------------------- */
		/**
		 * @hidden
		 */
		public constructor(list: _MapElementList<Key, T, Source>, prev: MapIterator<Key, T, Source>, next: MapIterator<Key, T, Source>, val: Entry<Key, T>)
		{
			super(prev, next, val);
			this.source_ = list;
		}

		/**
		 * @inheritDoc
		 */
		public reverse(): MapReverseIterator<Key, T, Source>
		{
			return new MapReverseIterator(this);
		}

		/* ---------------------------------------------------------
			ACCESSORS
		--------------------------------------------------------- */
		/**
		 * @inheritDoc
		 */
		public source(): Source
		{
			return this.source_.associative();
		}

		/**
		 * Get the first, key element.
		 * 
		 * @return The first element.
		 */
		public get first(): Key
		{
			return this.value.first;
		}

		/**
		 * Get the second, stored element.
		 * 
		 * @return The second element.
		 */
		public get second(): T
		{
			return this.value.second;
		}

		/**
		 * Set the second, stored element.
		 * 
		 * @param val The value to set.
		 */
		public set second(val: T)
		{
			this.value.second = val;
		}
	}
}

namespace std.base
{
	/**
	 * Reverse iterator of Map Containers.
	 * 
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export class MapReverseIterator<Key, T, Source extends MapContainer<Key, T, Source>>
		extends ReverseIterator<Entry<Key, T>, 
			Source, 
			MapIterator<Key, T, Source>, 
			MapReverseIterator<Key, T, Source>>
	{
		/* ---------------------------------------------------------
			CONSTRUCTORS
		--------------------------------------------------------- */
		/**
		 * Initializer Constructor.
		 * 
		 * @param base The base iterator.
		 */
		public constructor(base: MapIterator<Key, T, Source>)
		{
			super(base);
		}

		/**
		 * @hidden
		 */
		protected _Create_neighbor(base: MapIterator<Key, T, Source>): MapReverseIterator<Key, T, Source>
		{
			return new MapReverseIterator(base);
		}

		/* ---------------------------------------------------------
			ACCESSORS
		--------------------------------------------------------- */
		/**
		 * Get the first, key element.
		 * 
		 * @return The first element.
		 */
		public get first(): Key
		{
			return this.base_.first;
		}

		/**
		 * Get the second, stored element.
		 * 
		 * @return The second element.
		 */
		public get second(): T
		{
			return this.base_.second;
		}

		/**
		 * Set the second, stored element.
		 * 
		 * @param val The value to set.
		 */
		public set second(val: T)
		{
			this.base_.second = val;
		}
	}
}
