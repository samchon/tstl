/// <reference path="../../API.ts" />

/// <reference path="_ListIteratorBase.ts" />

namespace std.base
{
	/**
	 * An iterator of a Set.
	 * 
	 * <a href="http://samchon.github.io/tstl/images/class_diagram/set_containers.png" target="_blank"> 
	 * <img src="http://samchon.github.io/tstl/images/class_diagram/set_containers.png" style="max-width: 100%" /></a>
	 * 
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export class SetIterator<T, Source extends ISetContainer<T>>
		extends _ListIteratorBase<T>
		implements IComparable<SetIterator<T, Source>>
	{
		/**
		 * @hidden
		 */
		private source_: _SetElementList<T, Source>;

		/* ---------------------------------------------------------
			CONSTRUCTORS
		--------------------------------------------------------- */
		/**
		 * Construct from source and index number.
		 *
		 * #### Note
		 * Do not create iterator directly.
		 * 
		 * Use begin(), find() or end() in Map instead. 
		 *
		 * @param map The source Set to reference.
		 * @param index Sequence number of the element in the source Set.
		 */
		public constructor(source: _SetElementList<T, Source>, prev: SetIterator<T, Source>, next: SetIterator<T, Source>, val: T)
		{
			super(prev, next, val);

			this.source_ = source;
		}

		/* ---------------------------------------------------------
			ACCESSORS
		--------------------------------------------------------- */
		/**
		 * @inheritdoc
		 */
		public source(): Source
		{
			return this.source_.associative();
		}

		/**
		 * @inheritdoc
		 */
		public prev(): SetIterator<T, Source>
		{
			return this.prev_ as SetIterator<T, Source>;
		}

		/**
		 * @inheritdoc
		 */
		public next(): SetIterator<T, Source>
		{
			return this.next_ as SetIterator<T, Source>;
		}

		/**
		 * @inheritdoc
		 */
		public advance(size: number): SetIterator<T, Source>
		{
			return super.advance(size) as SetIterator<T, Source>;
		}
		
		/* ---------------------------------------------------------
			COMPARISONS
		--------------------------------------------------------- */
		/**
		 * @inheritdoc
		 */
		public less(obj: SetIterator<T, Source>): boolean
		{
			return less(this.value, obj.value);
		}
		
		/**
		 * @inheritdoc
		 */
		public equals(obj: SetIterator<T, Source>): boolean 
		{
			return this == obj;
		}

		/**
		 * @inheritdoc
		 */
		public hashCode(): number
		{
			return hash(this.value);
		}

		/**
		 * @inheritdoc
		 */
		public swap(obj: SetIterator<T, Source>): void
		{
			super.swap(obj);
		}
	}
}

namespace std.base
{
	/**
	 * A reverse-iterator of Set.
	 * 
	 * <a href="http://samchon.github.io/tstl/images/class_diagram/set_containers.png" target="_blank"> 
	 * <img src="http://samchon.github.io/tstl/images/class_diagram/set_containers.png" style="max-width: 100%" /></a>
	 *
	 * @param <T> Type of the elements.
	 *
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export class SetReverseIterator<T, Source extends ISetContainer<T>>
		extends ReverseIterator<T, SetContainer<T, Source>, SetIterator<T, Source>, SetReverseIterator<T, Source>>
		implements IComparable<SetReverseIterator<T, Source>>
	{
		/* ---------------------------------------------------------
			CONSTRUCTORS
		--------------------------------------------------------- */
		/**
		 * Construct from base iterator.
		 * 
		 * @param base A reference of the base iterator, which iterates in the opposite direction.
		 */
		public constructor(base: SetIterator<T, Source>)
		{
			super(base);
		}

		/**
		 * @hidden
		 */
		protected _Create_neighbor(base: SetIterator<T, Source>): SetReverseIterator<T, Source>
		{
			return new SetReverseIterator<T, Source>(base);
		}
	}
}
