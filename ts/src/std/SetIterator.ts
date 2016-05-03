/// <refe0rence path="base/container/Iterator.ts" />

namespace std
{
	/**
	 * <p> An iterator of a Set. </p>
	 * 
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export class SetIterator<T>
		extends base.container.Iterator<T>
		implements IComparable<SetIterator<T>>
	{
		private list_iterator_: ListIterator<T>;

		/**
		 * <p> Construct from source and index number. </p>
		 *
		 * <h4> Note </h4>
		 * <p> Do not create iterator directly. </p>
		 * <p> Use begin(), find() or end() in Map instead. </p> 
		 *
		 * @param map The source Set to reference.
		 * @param index Sequence number of the element in the source Set.
		 */
		public constructor(source: base.container.SetContainer<T>, it: ListIterator<T>)
		{
			super(source);

			this.list_iterator_ = it;
		}

		/* ---------------------------------------------------------
			MOVERS
		--------------------------------------------------------- */
		/**
		 * @inheritdoc
		 */
		public prev(): SetIterator<T>
		{
			return new SetIterator<T>(this.set, this.list_iterator_.prev());
		}

		/**
		 * @inheritdoc
		 */
		public next(): SetIterator<T>
		{
			return new SetIterator<T>(this.set, this.list_iterator_.next());
		}

		/**
		 * @inheritdoc
		 */
		public advance(size: number): SetIterator<T>
		{
			return new SetIterator<T>(this.set, this.list_iterator_.advance(size));
		}

		/* ---------------------------------------------------------
			ACCESSORS
		--------------------------------------------------------- */
		/**
		 * @hidden
		 */
		private get set(): TreeSet<T>
		{
			return <TreeSet<T>>this.source_;
		}

		public get_list_iterator(): ListIterator<T>
		{
			return this.list_iterator_;
		}

		/**
		 * @inheritdoc
		 */
		public get value(): T
		{
			return this.list_iterator_.value;
		}
		
		/* ---------------------------------------------------------
			COMPARISONS
		--------------------------------------------------------- */
		/**
		 * @inheritdoc
		 */
		public equal_to<U extends T>(obj: SetIterator<U>): boolean 
		{
			return super.equal_to(obj) && this.list_iterator_ == obj.list_iterator_;
		}

		/**
		 * @inheritdoc
		 */
		public less<U extends T>(obj: SetIterator<U>): boolean
		{
			return std.less(this.value, obj.value);
		}

		/**
		 * @inheritdoc
		 */
		public hash(): number
		{
			return base.hash.code(this.value);
		}

		/**
		 * @inheritdoc
		 */
		public swap(obj: SetIterator<T>): void
		{
			this.list_iterator_.swap(obj.list_iterator_);
		}
	}
}