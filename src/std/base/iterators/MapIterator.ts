/// <reference path="../../API.ts" />

/// <reference path="_ListIteratorBase.ts" />

namespace std.base
{
	export class MapIterator<Key, T, Source extends IMapContainer<Key, T>>
		extends base._ListIteratorBase<Entry<Key, T>>
		implements IComparable<MapIterator<Key, T, Source>>
	{
		/**
		 * @hidden
		 */
		private source_: base._MapElementList<Key, T, Source>;

		/* ---------------------------------------------------------
			CONSTRUCTORS
		--------------------------------------------------------- */
		/**
		 * @hidden
		 */
		public constructor(associative: base._MapElementList<Key, T, Source>, prev: MapIterator<Key, T, Source>, next: MapIterator<Key, T, Source>, val: Pair<Key, T>)
		{
			super(prev, next, val);

			this.source_ = associative;
		}

		/* ---------------------------------------------------------
			MOVERS
		--------------------------------------------------------- */
		public prev(): MapIterator<Key, T, Source>
		{
			return this.prev_ as MapIterator<Key, T, Source>;
		}

		public next(): MapIterator<Key, T, Source>
		{
			return this.next_ as MapIterator<Key, T, Source>;
		}

		public advance(step: number): MapIterator<Key, T, Source>
		{
			return super.advance(step) as MapIterator<Key, T, Source>;
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
		
		public equals(obj: MapIterator<Key, T, Source>): boolean 
		{
			return this == obj;
		}

		public hashCode(): number
		{
			return hash(this.first);
		}

		public swap(obj: MapIterator<Key, T, Source>): void
		{
			super.swap(obj);
		}
	}
}

namespace std.base
{
	export class MapReverseIterator<Key, T, Source extends IMapContainer<Key, T>>
		extends base.ReverseIterator<Pair<Key, T>, base.MapContainer<Key, T, Source>, MapIterator<Key, T, Source>, MapReverseIterator<Key, T, Source>>
		implements IComparable<MapReverseIterator<Key, T, Source>>
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
