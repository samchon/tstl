/// <reference path="../API.ts" />

/// <reference path="../base/iterators/_ListIteratorBase.ts" />

namespace std
{
	/**
	 * An iterator of a Set.
	 * 
	 * <a href="http://samchon.github.io/tstl/images/class_diagram/set_containers.png" target="_blank"> 
	 * <img src="http://samchon.github.io/tstl/images/class_diagram/set_containers.png" style="max-width: 100%" /></a>
	 * 
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export class SetIterator<T>
		extends base._ListIteratorBase<T>
		implements IComparable<SetIterator<T>>
	{
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
		public constructor(source: base._SetElementList<T>, prev: SetIterator<T>, next: SetIterator<T>, val: T)
		{
			super(source, prev, next, val);
		}

		/* ---------------------------------------------------------
			ACCESSORS
		--------------------------------------------------------- */
		/**
		 * @inheritdoc
		 */
		public source(): base.SetContainer<T>
		{
			return (this.source_ as base._SetElementList<T>).associative();
		}

		/**
		 * @inheritdoc
		 */
		public prev(): SetIterator<T>
		{
			return this.prev_ as SetIterator<T>;
		}

		/**
		 * @inheritdoc
		 */
		public next(): SetIterator<T>
		{
			return this.next_ as SetIterator<T>;
		}

		/**
		 * @inheritdoc
		 */
		public advance(size: number): SetIterator<T>
		{
			return super.advance(size) as SetIterator<T>;
		}
		
		/* ---------------------------------------------------------
			COMPARISONS
		--------------------------------------------------------- */
		/**
		 * @inheritdoc
		 */
		public less(obj: SetIterator<T>): boolean
		{
			return less(this.value, obj.value);
		}
		
		/**
		 * @inheritdoc
		 */
		public equals(obj: SetIterator<T>): boolean 
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
		public swap(obj: SetIterator<T>): void
		{
			super.swap(obj);
		}
	}
}

namespace std
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
	export class SetReverseIterator<T>
		extends base.ReverseIterator<T, base.SetContainer<T>, SetIterator<T>, SetReverseIterator<T>>
		implements IComparable<SetReverseIterator<T>>
	{
		/* ---------------------------------------------------------
			CONSTRUCTORS
		--------------------------------------------------------- */
		/**
		 * Construct from base iterator.
		 * 
		 * @param base A reference of the base iterator, which iterates in the opposite direction.
		 */
		public constructor(base: SetIterator<T>)
		{
			super(base);
		}

		/**
		 * @hidden
		 */
		protected _Create_neighbor(base: SetIterator<T>): SetReverseIterator<T>
		{
			return new SetReverseIterator<T>(base);
		}
	}
}
