/// <reference path="../../API.ts" />

/// <reference path="_ListIterator.ts" />

namespace std.base
{
	export class MapIterator<Key, T, Source extends IMapContainer<Key, T>>
		extends _ListIterator<Entry<Key, T>, Source, MapIterator<Key, T, Source>>
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
		public constructor(associative: _MapElementList<Key, T, Source>, prev: MapIterator<Key, T, Source>, next: MapIterator<Key, T, Source>, val: Pair<Key, T>)
		{
			super(prev, next, val);

			this.source_ = associative;
		}

		/* ---------------------------------------------------------
			ACCESSORS
		--------------------------------------------------------- */
		/**
		 * @hidden
		 */
		public source(): Source
		{
			return this.source_.associative();
		}

		public get first(): Key
		{
			return this.value.first;
		}

		public get second(): T
		{
			return this.value.second;
		}

		public set second(val: T)
		{
			this.value.second = val;
		}

		/* ---------------------------------------------------------
			COMPARISONS
		--------------------------------------------------------- */
		public less(obj: MapIterator<Key, T, Source>): boolean
		{
			return less(this.first, obj.first);
		}
		
		public hashCode(): number
		{
			return hash(this.first);
		}
	}
}

namespace std.base
{
	export class MapReverseIterator<Key, T, Source extends IMapContainer<Key, T>>
		extends ReverseIterator<Entry<Key, T>, 
			MapContainer<Key, T, Source>, 
			MapIterator<Key, T, Source>, 
			MapReverseIterator<Key, T, Source>>
	{
		/* ---------------------------------------------------------
			CONSTRUCTORS
		--------------------------------------------------------- */
		public constructor(base: MapIterator<Key, T, Source>)
		{
			super(base);
		}

		/**
		 * @hidden
		 */
		protected _Create_neighbor(base: MapIterator<Key, T, Source>): MapReverseIterator<Key, T, Source>
		{
			return new MapReverseIterator<Key, T, Source>(base);
		}

		/* ---------------------------------------------------------
			ACCESSORS
		--------------------------------------------------------- */
		public get first(): Key
		{
			return this.base_.first;
		}

		public get second(): T
		{
			return this.base_.second;
		}

		public set second(val: T)
		{
			this.base_.second = val;
		}
	}
}
