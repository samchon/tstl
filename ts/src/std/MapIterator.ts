namespace std
{
	export class MapIterator<Key, T>
		implements IComparable<MapIterator<Key, T>>
	{
		protected source_: base.container.MapContainer<Key, T>;

		protected list_iterator_: ListIterator<Pair<Key, T>>;

		/* ---------------------------------------------------------
			CONSTRUCTORS
		--------------------------------------------------------- */
		/**
		 * Construct from the source PairContainer. 
		 *
		 * @param source The source PairContainer.
		 */
		public constructor(source: base.container.MapContainer<Key, T>, listIterator: ListIterator<Pair<Key, T>>)
		{
			this.source_ = source;

			this.list_iterator_ = listIterator;
		}

		/**
		 * Get listIterator.
		 */
		public get_list_iterator(): ListIterator<Pair<Key, T>>
		{
			return this.list_iterator_;
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
		 * @param n Number of element positions to advance.
		 * @return An advanced Iterator.
		 */
		public advance(n: number): MapIterator<Key, T>
		{
			let it: MapIterator<Key, T> = this;
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
		public get_source(): base.container.MapContainer<Key, T>
		{
			return this.source_;
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
		public equals<L extends Key, U extends T>(obj: MapIterator<L, U>): boolean 
		{
			return this.source_ == obj.source_ && this.list_iterator_ == obj.list_iterator_;
		}

		/**
		 * @inheritdoc
		 */
		public less<L extends Key, U extends T>(obj: MapIterator<L, U>): boolean
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

		/**
		 * @inheritdoc
		 */
		public swap(obj: MapIterator<Key, T>): void
		{
			this.list_iterator_.swap(obj.list_iterator_);
		}
	}
}