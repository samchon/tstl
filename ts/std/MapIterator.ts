namespace std
{
	export class MapIterator<K, T>
	{
		protected source: base.container.MapContainer<K, T>;

		protected listIterator: ListIterator<Pair<K, T>>;

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
			this.source = source;

			this.listIterator = listIterator;
		}

		/**
		 * Get listIterator.
		 */
		public getListIterator(): ListIterator<Pair<K, T>>
		{
			return this.listIterator;
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
				<base.container.MapContainer<K, T>>this.source,
				<ListIterator<Pair<K, T>>>this.listIterator.prev()
			);
		}

		/**
		 * Get iterator to next element.
		 */
		public next(): MapIterator<K, T>
		{
			return new MapIterator<K, T>
			(
				<base.container.MapContainer<K, T>>this.source,
				<ListIterator<Pair<K, T>>>this.listIterator.next()
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
					if (it.equals(this.source.end()))
						return this.source.end();
					else
						it = it.next();
			}
			else
			{
				n = n * -1;

				for (i = 0; i < n; i++)
					if (it.equals(this.source.end()))
						return this.source.end();
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
		public getSource(): base.container.MapContainer<K, T>
		{
			return this.source;
		}
		
		/**
		 * Get first, key element.
		 */
		public get first(): K
		{
			return this.listIterator.value.first;
		}

		/**
		 * Get second, value element.
		 */
		public get second(): T
		{
			return this.listIterator.value.second;
		}

		public set first(key: K)
		{
			this.listIterator.value.first = key;
		}
		public set second(val: T)
		{
			this.listIterator.value.second = val;
		}

		/* ---------------------------------------------------------
			COMPARISONS
		--------------------------------------------------------- */
		public equals<L extends K, U extends T>(obj: MapIterator<L, U>): boolean 
		{
			return this.source == obj.source && this.listIterator == obj.listIterator;
		}

		public less<L extends K, U extends T>(obj: MapIterator<L, U>): boolean
		{
			return std.less(this.first, obj.first);
		}

		public hashCode(): number
		{
			return std.hashCode(this.first);
		}
	}
}