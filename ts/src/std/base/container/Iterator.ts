namespace std.base.container
{
	/**
	 * <p> Bi-directional iterator. </p>
	 *
	 * <p> {@link Iterator Bidirectional iterators} are iterators that can be used to access the sequence of elements 
	 * in a range in both directions (towards the end and towards the beginning). </p>
	 *
	 * <p> All {@link IArrayIterator random-access iterators} are also valid 
	 * {@link Iterrator bidirectional iterators}. </p>
	 *
	 * <p> There is not a single type of {@link Iterator bidirectional iterator}: {@link IContainer Each container} 
	 * may define its own specific iterator type able to iterate through it and access its elements. </p>
	 *
	 * <ul>
	 *	<li> Reference: http://www.cplusplus.com/reference/iterator/BidirectionalIterator/ </li>
	 * </ul>
	 *
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export abstract class Iterator<T>
	{
		/**
		 * Source container of the iteerator is directing for.
		 */
		protected source_: IContainer<T>;

		/* ---------------------------------------------------------
			CONSTRUCTORS
		--------------------------------------------------------- */
		/**
		 * Construct from the source {@link IContainer container}.
		 *
		 * @param source The source container.
		 */
		public constructor(source: IContainer<T>)
		{
			this.source_ = source;
		}

		/* ---------------------------------------------------------
			MOVERS
		--------------------------------------------------------- */
		/**
		 * <p> Get iterator to previous element. </p>
		 * <p> If current iterator is the first item(equal with {@link IContainer.begin IContainer.begin()}), 
		 * returns {@link IContainer.end IContainer.end()}. </p>
		 *
		 * @return An iterator of the previous item. 
		 */
		public abstract prev(): Iterator<T>;

		/**
		 * <p> Get iterator to next element. </p>
		 * <p> If current iterator is the last item, returns {@link IContainer.end IContainer.end()}. </p>
		 *
		 * @return An iterator of the next item.
		 */
		public abstract next(): Iterator<T>;

		/**
		 * Advances the {@link Iterator} by <i>n</i> element positions.
		 *
		 * @param n Number of element positions to advance.
		 * @return An advanced iterator.
		 */
		public advance(n: number): Iterator<T>
		{
			let it: Iterator<T> = this;
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
		 * Get source container.
		 */
		public get_source(): Container<T>
		{
			return this.source_;
		}

		/**
		 * <p> Whether an iterator is equal with the iterator. </p>
		 * <p> Compare two iterators and returns whether they are equal or not. </p>
		 * 
		 * <h4> Note </h4> 
		 * <p> Iterator's equals() only compare souce map and index number. </p>
		 *
		 * <p> Although elements in a pair, key and value are equals, if the source map or
		 * index number is different, then the {@link equals equals()} will return false. If you want to
		 * compare the elements of a pair, compare them directly by yourself. </p>
		 *
		 * @param obj An iterator to compare
		 * @return Indicates whether equal or not.
		 */
		public equals<U extends T>(obj: Iterator<U>): boolean
		{
			return this.source_ == obj.source_;
		}
		
		/**
		 * <p> Get value of the iterator is pointing. </p>
		 * 
		 * @return A value of the iterator.
		 */
		public get value(): T
		{
			throw new LogicError("Have to be overriden.");
		}

		public abstract swap(obj: Iterator<T>): void;
	}
}