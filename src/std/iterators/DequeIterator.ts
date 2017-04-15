/// <reference path="../API.ts" />

/// <reference path="../base/iterators/Iterator.ts" />

namespace std
{
	/**
	 * An iterator of {@link Deque}.
	 * 
	 * <a href="http://samchon.github.io/tstl/images/design/class_diagram/linear_containers.png" target="_blank"> 
	 * <img src="http://samchon.github.io/tstl/images/design/class_diagram/linear_containers.png" style="max-width: 100%" /> </a>
	 *
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export class DequeIterator<T>
		extends base.Iterator<T>
		implements base.IArrayIterator<T>, IComparable<DequeIterator<T>>
	{
		/**
		 * @hidden
		 */
		private index_: number;

		/* ---------------------------------------------------------
			CONSTRUCTORS
		--------------------------------------------------------- */
		/**
		 * Construct from the source {@link Deque container}.
		 *
		 * #### Note
		 * Do not create the iterator directly, by yourself.
		 * 
		 * Use {@link Deque.begin begin()}, {@link Deque.end end()} in {@link Deque container} instead. 
		 *
		 * @param source The source {@link Deque container} to reference.
		 * @param index Sequence number of the element in the source {@link Deque}.
		 */
		public constructor(source: Deque<T>, index: number)
		{
			super(source);

			this.index_ = index;
		}

		/* ---------------------------------------------------------
			ACCESSORS
		--------------------------------------------------------- */
		/**
		 * @inheritdoc
		 */
		public source(): Deque<T>
		{
			return this.source_ as Deque<T>;
		}
		
		/**
		 * @inheritdoc
		 */
		public index(): number
		{
			return this.index_;
		}
		
		/**
		 * @inheritdoc
		 */
		public get value(): T
		{
			return this.source().at(this.index_);
		}

		/**
		 * Set value of the iterator is pointing to.
		 * 
		 * @param val Value to set.
		 */
		public set value(val: T)
		{
			this.source().set(this.index_, val);
		}

		/* ---------------------------------------------------------
			MOVERS
		--------------------------------------------------------- */
		/**
		 * @inheritdoc
		 */
		public prev(): DequeIterator<T>
		{
			if (this.index_ == -1)
				return new DequeIterator(this.source(), this.source_.size() - 1);
			else if (this.index_ - 1 < 0)
				return this.source().end();
			else
				return new DequeIterator<T>(this.source(), this.index_ - 1);
		}

		/**
		 * @inheritdoc
		 */
		public next(): DequeIterator<T>
		{
			if (this.index_ >= this.source_.size() - 1)
				return this.source().end();
			else
				return new DequeIterator<T>(this.source(), this.index_ + 1);
		}

		/**
		 * @inheritdoc
		 */
		public advance(n: number): DequeIterator<T>
		{
			let new_index: number;
			if (n < 0 && this.index_ == -1)
				new_index = this.source_.size() + n;
			else
				new_index = this.index_ + n;

			if (new_index < 0 || new_index >= this.source_.size())
				return this.source().end();
			else
				return new DequeIterator<T>(this.source(), new_index);
		}

		/* ---------------------------------------------------------
			COMPARES
		--------------------------------------------------------- */
		/**
		 * @inheritdoc
		 */
		public equals(obj: DequeIterator<T>): boolean
		{
			return super.equals(obj) && this.index_ == obj.index_;
		}

		/**
		 * @inheritdoc
		 */
		public swap(obj: DequeIterator<T>): void
		{
			[this.value, obj.value] = [obj.value, this.value];
		}
	}
}

namespace std
{
	/**
	 * A reverse-iterator of Deque.
	 * 
	 * <a href="http://samchon.github.io/tstl/images/design/class_diagram/linear_containers.png" target="_blank"> 
	 * <img src="http://samchon.github.io/tstl/images/design/class_diagram/linear_containers.png" style="max-width: 100%" /> </a>
	 *
	 * @param <T> Type of the elements.
	 * 
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export class DequeReverseIterator<T>
		extends base.ReverseIterator<T, Deque<T>, DequeIterator<T>, DequeReverseIterator<T>>
		implements base.IArrayIterator<T>
	{
		/* ---------------------------------------------------------
			CONSTRUCTORS
		--------------------------------------------------------- */
		/**
		 * Construct from base iterator.
		 * 
		 * @param base A reference of the base iterator, which iterates in the opposite direction.
		 */
		public constructor(base: DequeIterator<T>)
		{
			super(base);
		}

		/**
		 * @hidden
		 */
		protected _Create_neighbor(base: DequeIterator<T>): DequeReverseIterator<T>
		{
			return new DequeReverseIterator<T>(base);
		}

		/* ---------------------------------------------------------
			ACCESSORS
		--------------------------------------------------------- */
		/**
		 * @inheritdoc
		 */
		public index(): number
		{
			return this.base_.index();
		}
		
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