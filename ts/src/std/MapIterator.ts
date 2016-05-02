namespace std
{
	/**
	 * An iterator of {@link MapColntainer map container}.
	 *
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export class MapIterator<Key, T>
		implements IComparable<MapIterator<Key, T>>
	{
		/**
		 * The source {@link MapContainer} of the iterator is directing for.
		 */
		protected source_: base.container.MapContainer<Key, T>;

		/**
		 * A {@link ListIterator} pointing {@link Pair} of <i>key</i> and <i>value</i>.
		 */
		protected list_iterator_: ListIterator<Pair<Key, T>>;

		/* ---------------------------------------------------------
			CONSTRUCTORS
		--------------------------------------------------------- */
		/**
		 * Construct from the {@link MapContainer source map} and {@link ListIterator list iterator}. 
		 *
		 * @param source The source {@link MapContainer}.
		 * @param list_iterator A {@link ListIterator} pointing {@link Pair} of <i>key</i> and <i>value</i>.
		 */
		public constructor(source: base.container.MapContainer<Key, T>, list_iterator: ListIterator<Pair<Key, T>>)
		{
			this.source_ = source;

			this.list_iterator_ = list_iterator;
		}

		/* ---------------------------------------------------------
			MOVERS
		--------------------------------------------------------- */
		/**
		 * Get iterator to previous element.
		 */
		public prev(): MapIterator<Key, T>
		{
			return new MapIterator<Key, T>
				(
					<base.container.MapContainer<Key, T>>this.source_,
					this.list_iterator_.prev()
				);
		}

		/**
		 * Get iterator to next element.
		 */
		public next(): MapIterator<Key, T>
		{
			return new MapIterator<Key, T>
				(
					<base.container.MapContainer<Key, T>>this.source_,
					this.list_iterator_.next()
				);
		}

		/**
		 * Advances the Iterator by n element positions.
		 *
		 * @param step Number of element positions to advance.
		 * @return An advanced Iterator.
		 */
		public advance(step: number): MapIterator<Key, T>
		{
			return new MapIterator<Key, T>
				(
					<base.container.MapContainer<Key, T>>this.source_,
					this.list_iterator_.advance(step)
				);
		}

		/* ---------------------------------------------------------
			ACCESSORS
		--------------------------------------------------------- */
		/**
		 * Get source.
		 */
		public get_source(): base.container.MapContainer<Key, T>
		{
			return this.source_;
		}

		/**
		 * Get ListIterator.
		 */
		public get_list_iterator(): ListIterator<Pair<Key, T>>
		{
			return this.list_iterator_;
		}
		
		/**
		 * Get first, key element.
		 */
		public get first(): Key
		{
			return this.list_iterator_.value.first;
		}

		/**
		 * Get second, value element.
		 */
		public get second(): T
		{
			return this.list_iterator_.value.second;
		}

		/**
		 * Set second value.
		 */
		public set second(val: T)
		{
			this.list_iterator_.value.second = val;
		}

		/* ---------------------------------------------------------
			COMPARISONS
		--------------------------------------------------------- */
		/**
		 * <p> Whether an iterator is equal with the iterator. </p>
		 * 
		 * <p> Compare two iterators and returns whether they are equal or not. </p>
		 *
		 * @param obj An iterator to compare
		 * @return Indicates whether equal or not.
		 */
		public equals<L extends Key, U extends T>(obj: MapIterator<L, U>): boolean 
		{
			return this.source_ == obj.source_ && this.list_iterator_ == obj.list_iterator_;
		}
		
		public less<L extends Key, U extends T>(obj: MapIterator<L, U>): boolean
		{
			return std.less(this.first, obj.first);
		}
		
		public hash_code(): number
		{
			return std.hash(this.first);
		}
		
		public swap(obj: MapIterator<Key, T>): void
		{
			this.list_iterator_.swap(obj.list_iterator_);
		}
	}
}