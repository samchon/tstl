namespace std
{
	export class MapIterator<K, T>
		implements IComparable<MapIterator<K, T>>
	{
		protected source_: base.container.MapContainer<K, T>;

		protected list_iterator_: ListIterator<Pair<K, T>>;

		/* ---------------------------------------------------------
			CONSTRUCTORS
		--------------------------------------------------------- */
		/**
		 * Construct from the source PairContainer. 
		 *
		 * @param source The source PairContainer.
		 */
		public constructor(source: base.container.MapContainer<K, T>, listIterator: ListIterator<Pair<K, T>>)
		{
			this.source_ = source;

			this.list_iterator_ = listIterator;
		}

		/**
		 * Get listIterator.
		 */
		public get_list_iterator(): ListIterator<Pair<K, T>>
		{
			return this.list_iterator_;
		}

		/* ---------------------------------------------------------
			MOVERS
		--------------------------------------------------------- */
		/**
		 * Get iterator to previous element.
		 */
		public prev(): MapIterator<K, T>
		{
			return new MapIterator<K, T>
			(
				<base.container.MapContainer<K, T>>this.source_,
				this.list_iterator_.prev()
			);
		}

		/**
		 * Get iterator to next element.
		 */
		public next(): MapIterator<K, T>
		{
			return new MapIterator<K, T>
			(
				<base.container.MapContainer<K, T>>this.source_,
				this.list_iterator_.next()
			);
		}

		/**
		 * Advances the Iterator by n element positions.
		 *
		 * @param n Number of element positions to advance.
		 * @return An advanced Iterator.
		 */
		public advance(n: number): MapIterator<K, T>
		{
			let it: MapIterator<K, T> = this;
			let i: number;

			if (n >= 0 )
			{
				for (i = 0; i < n; i++)
					if (it.equals(this.source_.end()))
						return this.source_.end();
					else
						it = it.next();
			}
			else
			{
				n = n * -1;

				for (i = 0; i < n; i++)
					if (it.equals(this.source_.end()))
						return this.source_.end();
					else
						it = it.prev();
			}

			return it;
		}

		/* ---------------------------------------------------------
			ACCESSORS
		--------------------------------------------------------- */
		/**
		 * Get source.
		 */
		public get_source(): base.container.MapContainer<K, T>
		{
			return this.source_;
		}
		
		/**
		 * Get first, key element.
		 */
		public get first(): K
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

		public set second(val: T)
		{
			this.list_iterator_.value.second = val;
		}

		/* ---------------------------------------------------------
			COMPARISONS
		--------------------------------------------------------- */
		/**
		 * @inheritdoc
		 */
		public equals<L extends K, U extends T>(obj: MapIterator<L, U>): boolean 
		{
			return this.source_ == obj.source_ && this.list_iterator_ == obj.list_iterator_;
		}

		/**
		 * @inheritdoc
		 */
		public less<L extends K, U extends T>(obj: MapIterator<L, U>): boolean
		{
			return std.less(this.first, obj.first);
		}

		/**
		 * @inheritdoc
		 */
		public hash(): number
		{
			return std.hash(this.first);
		}
	}
}