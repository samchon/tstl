/// <reference path="../../API.ts" />

/// <reference path="_ListIteratorBase.ts" />

namespace std.base
{
	/**
	 * An iterator of {@link MapContainer map container}.
	 * 
	 * <a href="http://samchon.github.io/tstl/images/design/class_diagram" target="_blank"> 
	 * <img src="http://samchon.github.io/tstl/images/design/class_diagram" style="max-width: 100%" /></a>
	 *
	 * @author Jeongho Nam <http://samchon.org>
	 */
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
		/**
		 * Get iterator to previous element.
		 */
		public prev(): MapIterator<Key, T, Source>
		{
			return this.prev_ as MapIterator<Key, T, Source>;
		}

		/**
		 * Get iterator to next element.
		 */
		public next(): MapIterator<Key, T, Source>
		{
			return this.next_ as MapIterator<Key, T, Source>;
		}

		/**
		 * Advances the Iterator by n element positions.
		 *
		 * @param step Number of element positions to advance.
		 * @return An advanced Iterator.
		 */
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

		/**
		 * Get first, key element.
		 */
		public get first(): Key
		{
			return this.value.first;
		}

		/**
		 * Get second, value element.
		 */
		public get second(): T
		{
			return this.value.second;
		}

		/**
		 * Set second value.
		 */
		public set second(val: T)
		{
			this.value.second = val;
		}

		/* ---------------------------------------------------------
			COMPARISONS
		--------------------------------------------------------- */
		/**
		 * @inheritdoc
		 */
		public less(obj: MapIterator<Key, T, Source>): boolean
		{
			return less(this.first, obj.first);
		}
		
		/**
		 * @inheritdoc
		 */
		public equals(obj: MapIterator<Key, T, Source>): boolean 
		{
			return this == obj;
		}

		/**
		 * @inheritdoc
		 */
		public hashCode(): number
		{
			return hash(this.first);
		}

		/**
		 * @inheritdoc
		 */
		public swap(obj: MapIterator<Key, T, Source>): void
		{
			super.swap(obj);
		}
	}
}

namespace std.base
{
	/**
	 * A reverse-iterator of {@link MapContainer map container}.
	 * 
	 * <a href="http://samchon.github.io/tstl/images/design/class_diagram" target="_blank"> 
	 * <img src="http://samchon.github.io/tstl/images/design/class_diagram" style="max-width: 100%" /></a>
	 *
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export class MapReverseIterator<Key, T, Source extends IMapContainer<Key, T>>
		extends base.ReverseIterator<Pair<Key, T>, base.MapContainer<Key, T, Source>, MapIterator<Key, T, Source>, MapReverseIterator<Key, T, Source>>
		implements IComparable<MapReverseIterator<Key, T, Source>>
	{
		/* ---------------------------------------------------------
			CONSTRUCTORS
		--------------------------------------------------------- */
		/**
		 * Construct from base iterator.
		 * 
		 * @param base A reference of the base iterator, which iterates in the opposite direction.
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
			return new MapReverseIterator<Key, T, Source>(base);
		}

		/* ---------------------------------------------------------
			ACCESSORS
		--------------------------------------------------------- */
		/**
		 * Get first, key element.
		 */
		public get first(): Key
		{
			return this.base_.first;
		}

		/**
		 * Get second, value element.
		 */
		public get second(): T
		{
			return this.base_.second;
		}

		/**
		 * Set second value.
		 */
		public set second(val: T)
		{
			this.base_.second = val;
		}
	}
}
