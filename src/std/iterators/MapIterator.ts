/// <reference path="../API.ts" />

/// <reference path="../base/iterators/_ListIteratorBase.ts" />

namespace std
{
	/**
	 * An iterator of {@link MapContainer map container}.
	 * 
	 * <a href="http://samchon.github.io/tstl/images/design/class_diagram" target="_blank"> 
	 * <img src="http://samchon.github.io/tstl/images/design/class_diagram" style="max-width: 100%" /></a>
	 *
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export class MapIterator<Key, T>
		extends base._ListIteratorBase<Pair<Key, T>>
		implements IComparable<MapIterator<Key, T>>
	{
		/* ---------------------------------------------------------
			CONSTRUCTORS
		--------------------------------------------------------- */
		/**
		 * Construct from the {@link MapContainer source map} and {@link ListIterator list iterator}. 
		 *
		 * @param source The source {@link MapContainer}.
		 * @param list_iterator A {@link ListIterator} pointing {@link Pair} of <i>key</i> and <i>value</i>.
		 */
		public constructor(source: base._MapElementList<Key, T>, prev: MapIterator<Key, T>, next: MapIterator<Key, T>, val: Pair<Key, T>)
		{
			super(source, prev, next, val);
		}

		/* ---------------------------------------------------------
			MOVERS
		--------------------------------------------------------- */
		/**
		 * Get iterator to previous element.
		 */
		public prev(): MapIterator<Key, T>
		{
			return this.prev_ as MapIterator<Key, T>;
		}

		/**
		 * Get iterator to next element.
		 */
		public next(): MapIterator<Key, T>
		{
			return this.next_ as MapIterator<Key, T>;
		}

		/**
		 * Advances the Iterator by n element positions.
		 *
		 * @param step Number of element positions to advance.
		 * @return An advanced Iterator.
		 */
		public advance(step: number): MapIterator<Key, T>
		{
			return super.advance(step) as MapIterator<Key, T>;
		}

		/* ---------------------------------------------------------
			ACCESSORS
		--------------------------------------------------------- */
		/**
		 * @hidden
		 */
		public source(): base.MapContainer<Key, T>
		{
			return (this.source_ as base._MapElementList<Key, T>).associative();
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
		public less(obj: MapIterator<Key, T>): boolean
		{
			return less(this.first, obj.first);
		}
		
		/**
		 * @inheritdoc
		 */
		public equals(obj: MapIterator<Key, T>): boolean 
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
		public swap(obj: MapIterator<Key, T>): void
		{
			super.swap(obj);
		}
	}
}

namespace std
{
	/**
	 * A reverse-iterator of {@link MapContainer map container}.
	 * 
	 * <a href="http://samchon.github.io/tstl/images/design/class_diagram" target="_blank"> 
	 * <img src="http://samchon.github.io/tstl/images/design/class_diagram" style="max-width: 100%" /></a>
	 *
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export class MapReverseIterator<Key, T>
		extends base.ReverseIterator<Pair<Key, T>, base.MapContainer<Key, T>, MapIterator<Key, T>, MapReverseIterator<Key, T>>
		implements IComparable<MapReverseIterator<Key, T>>
	{
		/* ---------------------------------------------------------
			CONSTRUCTORS
		--------------------------------------------------------- */
		/**
		 * Construct from base iterator.
		 * 
		 * @param base A reference of the base iterator, which iterates in the opposite direction.
		 */
		public constructor(base: MapIterator<Key, T>)
		{
			super(base);
		}

		/**
		 * @hidden
		 */
		protected _Create_neighbor(base: MapIterator<Key, T>): MapReverseIterator<Key, T>
		{
			return new MapReverseIterator<Key, T>(base);
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
