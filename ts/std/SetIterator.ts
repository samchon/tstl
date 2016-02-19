/// <refe0rence path="base/container/Iterator.ts" />

namespace std
{
	/**
	 * <p> An iterator of a Set. </p>
	 * 
	 * @author Jeongho Nam
	 */
	export class SetIterator<T>
		extends base.container.Iterator<T>
		implements IComparable<SetIterator<T>>
	{
		private listIterator: ListIterator<T>;

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

			this.listIterator = it;
		}

		public getListIterator(): ListIterator<T>
		{
			return this.listIterator;
		}

		/* ---------------------------------------------------------
			MOVERS
		--------------------------------------------------------- */
		/**
		 * @inheritdoc
		 */
		public prev(): SetIterator<T>
		{
			return new SetIterator<T>(this.set, this.listIterator.prev());
		}

		/**
		 * @inheritdoc
		 */
		public next(): SetIterator<T>
		{
			return new SetIterator<T>(<base.container.SetContainer<T>>this.source, this.listIterator.next());
		}

		/**
		 * @inheritdoc
		 */
		public advance(size: number): SetIterator<T>
		{
			return new SetIterator<T>(this.set, this.listIterator.advance(size));
		}

		/* ---------------------------------------------------------
			ACCESSORS
		--------------------------------------------------------- */
		private get set(): TreeSet<T>
		{
			return <TreeSet<T>>this.source;
		}

		/**
		 * @inheritdoc
		 */
		public get value(): T
		{
			return this.listIterator.value;
		}
		
		/* ---------------------------------------------------------
			COMPARISONS
		--------------------------------------------------------- */
		/**
		 * @inheritdoc
		 */
		public equals<U extends T>(obj: SetIterator<U>): boolean 
		{
			return super.equals(obj) && this.listIterator == obj.listIterator;
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
		public hashCode(): number
		{
			return base.hash.code(this.value);
		}
	}
}