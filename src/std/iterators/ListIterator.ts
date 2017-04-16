/// <reference path="../API.ts" />

/// <reference path="../base/iterators/_ListIteratorBase.ts" />

namespace std
{
	/**
	 * An iterator, node of a List.
	 * 
	 * <a href="http://samchon.github.io/tstl/images/design/class_diagram/linear_containers.png" target="_blank"> 
	 * <img src="http://samchon.github.io/tstl/images/design/class_diagram/linear_containers.png" style="max-width: 100%" /></a>
	 * 
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export class ListIterator<T>
		extends base._ListIteratorBase<T>
		implements IComparable<ListIterator<T>>
	{
		/* ---------------------------------------------------------------
			CONSTRUCTORS
		--------------------------------------------------------------- */
		/**
		 * Initializer Constructor.
		 *
		 * #### Note
		 * Do not create the iterator directly, by yourself.
		 * 
		 * Use {@link List.begin begin()}, {@link List.end end()} in {@link List container} instead.
		 *
		 * @param source The source {@link List container} to reference.
		 * @param prev A refenrece of previous node ({@link ListIterator iterator}).
		 * @param next A refenrece of next node ({@link ListIterator iterator}).
		 * @param value Value to be stored in the node (iterator).
		 */
		public constructor(source: List<T>, prev: ListIterator<T>, next: ListIterator<T>, value: T)
		{
			super(source, prev, next, value);
		}

		/* ---------------------------------------------------------------
			ACCESSORS
		--------------------------------------------------------------- */
		/**
		 * @inheritdoc
		 */
		public source(): List<T>
		{
			return this.source_ as List<T>;
		}

		/**
		 * @inheritdoc
		 */
		public get value(): T
		{
			return this.value_;
		}

		/**
		 * Set value of the iterator is pointing to.
		 * 
		 * @param val Value to set.
		 */
		public set value(val: T)
		{
			this.value_ = val;
		}

		/* ---------------------------------------------------------
			MOVERS
		--------------------------------------------------------- */
		/**
		 * @inheritdoc
		 */
		public prev(): ListIterator<T>
		{
			return this.prev_ as ListIterator<T>;
		}

		/**
		 * @inheritdoc
		 */
		public next(): ListIterator<T>
		{
			return this.next_ as ListIterator<T>;
		}

		 /**
		  * @inheritdoc
		  */
		public advance(step: number): ListIterator<T>
		{
			return super.advance(step) as ListIterator<T>;
		}

		/* ---------------------------------------------------------------
			COMPARISON
		--------------------------------------------------------------- */
		/**
		 * @inheritdoc
		 */
		public equals(obj: ListIterator<T>): boolean
		{
			return this == obj;
		}

		/**
		 * @inheritdoc
		 */
		public swap(obj: ListIterator<T>): void
		{
			super.swap(obj);
		}
	}
}

namespace std
{
	/**
	 * A reverse-iterator of List.
	 * 
	 * <a href="http://samchon.github.io/tstl/images/design/class_diagram/linear_containers.png" target="_blank"> 
	 * <img src="http://samchon.github.io/tstl/images/design/class_diagram/linear_containers.png" style="max-width: 100%" /></a>
	 *
	 * @param <T> Type of the elements.
	 *
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export class ListReverseIterator<T>
		extends base.ReverseIterator<T, List<T>, ListIterator<T>, ListReverseIterator<T>>
		implements base.ILinearIterator<T>, IComparable<ListReverseIterator<T>>
	{
		/* ---------------------------------------------------------------
			CONSTRUCTORS
		--------------------------------------------------------------- */
		/**
		 * Construct from base iterator.
		 * 
		 * @param base A reference of the base iterator, which iterates in the opposite direction.
		 */
		public constructor(base: ListIterator<T>)
		{
			super(base);
		}

		/**
		 * @hidden
		 */
		protected _Create_neighbor(base: ListIterator<T>): ListReverseIterator<T>
		{
			return new ListReverseIterator<T>(base);
		}

		/* ---------------------------------------------------------
			ACCESSORS
		--------------------------------------------------------- */
		/**
		 * @inheritdoc
		 */
		public get value(): T
		{
			return this.base_.value;
		}

		/**
		 * Set value of the iterator is pointing to.
		 * 
		 * @param val Value to set.
		 */
		public set value(val: T)
		{
			this.base_.value = val;
		}
	}
}

