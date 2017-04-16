/// <reference path="../API.ts" />

/// <reference path="../base/iterators/Iterator.ts" />

namespace std
{
	/**
	 * An iterator of Vector.
	 * 
	 * <a href="http://samchon.github.io/tstl/images/design/class_diagram/linear_containers.png" target="_blank"> 
	 * <img src="http://samchon.github.io/tstl/images/design/class_diagram/linear_containers.png" style="max-width: 100%" /> 
	 *
	 * @param <T> Type of the elements.
	 * 
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export class VectorIterator<T>
		extends base.Iterator<T>
		implements base.IArrayIterator<T>, IComparable<VectorIterator<T>>
	{
		/**
		 * @hidden
		 */
		private index_: number;

		/* ---------------------------------------------------------
			CONSTRUCTORS
		--------------------------------------------------------- */
		/**
		 * Construct from the source {@link Vector container}.
		 *
		 * #### Note
		 * Do not create the iterator directly, by yourself.
		 * 
		 * Use {@link Vector.begin begin()}, {@link Vector.end end()} in {@link Vector container} instead. 
		 *
		 * @param source The source {@link Vector container} to reference.
		 * @param index Sequence number of the element in the source {@link Vector}.
		 */
		public constructor(source: Vector<T>, index: number)
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
		public source(): Vector<T>
		{
			return this.source_ as Vector<T>;
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
		public prev(): VectorIterator<T>
		{
			if (this.index_ == -1)
				return new VectorIterator(this.source(), this.source_.size() - 1);
			else if (this.index_ - 1 < 0)
				return this.source().end();
			else
				return new VectorIterator<T>(this.source(), this.index_ - 1);
		}

		/**
		 * @inheritdoc
		 */
		public next(): VectorIterator<T>
		{
			if (this.index_ >= this.source_.size() - 1)
				return this.source().end();
			else
				return new VectorIterator<T>(this.source(), this.index_ + 1);
		}

		/**
		 * @inheritdoc
		 */
		public advance(n: number): VectorIterator<T>
		{
			let new_index: number;
			if (n < 0 && this.index_ == -1)
				new_index = this.source_.size() + n;
			else
				new_index = this.index_ + n;

			if (new_index < 0 || new_index >= this.source_.size())
				return this.source().end();
			else
				return new VectorIterator<T>(this.source(), new_index);
		}

		/* ---------------------------------------------------------
			COMPARES
		--------------------------------------------------------- */
		/**
		 * @inheritdoc
		 */
		public equals(obj: VectorIterator<T>): boolean
		{
			return super.equals(obj) && this.index_ == obj.index_;
		}

		/**
		 * @inheritdoc
		 */
		public swap(obj: VectorIterator<T>): void
		{
			[this.value, obj.value] = [obj.value, this.value];
		}
	}
}

namespace std
{
	/**
	 * A reverse-iterator of Vector.
	 * 
	 * <a href="http://samchon.github.io/tstl/images/design/class_diagram/linear_containers.png" target="_blank"> 
	 * <img src="http://samchon.github.io/tstl/images/design/class_diagram/linear_containers.png" style="max-width: 100%" /> 
	 *
	 * @param <T> Type of the elements.
	 * 
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export class VectorReverseIterator<T>
		extends base.ReverseIterator<T, Vector<T>, VectorIterator<T>, VectorReverseIterator<T>>
		implements base.IArrayIterator<T>, IComparable<VectorReverseIterator<T>>
	{
		/* ---------------------------------------------------------
			CONSTRUCTORS
		--------------------------------------------------------- */
		/**
		 * Construct from base iterator.
		 * 
		 * @param base A reference of the base iterator, which iterates in the opposite direction.
		 */
		public constructor(base: VectorIterator<T>)
		{
			super(base);
		}

		/**
		 * @hidden
		 */
		protected _Create_neighbor(base: VectorIterator<T>): VectorReverseIterator<T>
		{
			return new VectorReverseIterator<T>(base);
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