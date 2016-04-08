/// <reference path="base/container/Iterator.ts" />

namespace std
{
	/**
	 * <p> A bi-directional iterator of a Set. </p>
	 *
	 * @param <T> Type of the elements.
	 * 
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export class VectorIterator<T>
		extends base.container.Iterator<T>
		implements base.container.IArrayIterator<T>
	{
		/**
		 * Sequence number of iterator in the source {@link Vector}.
		 */
		private index_: number;

		/* ---------------------------------------------------------
			CONSTRUCTORS
		--------------------------------------------------------- */
		/**
		 * <p> Construct from the source {@link Vector container}. </p>
		 *
		 * <h4> Note </h4>
		 * <p> Do not create the iterator directly, by yourself. </p>
		 * <p> Use {@link Vector.begin begin()}, {@link Vector.end end()} in {@link Vector container} instead. </p> 
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
		 * @hidden
		 */
		public get vector(): Vector<T>
		{
			return this.source_ as Vector<T>;
		}

		/**
		 * @inheritdoc
		 */
		public get value(): T
		{
			return this.vector.at(this.index_);
		}

		/**
		 * @inheritdoc
		 */
		public set value(val: T)
		{
			this.vector.set(this.index_, val);
		}
		
		/**
		 * @inheritdoc
		 */
		public equals<U extends T>(obj: VectorIterator<U>): boolean
		{
			return super.equals(obj) && this.index_ == obj.index_;
		}

		/**
		 * @inheritdoc
		 */
		public get index(): number
		{
			return this.index_;
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
				return new VectorIterator(this.vector, this.vector.size() - 1);
			else if (this.index_ - 1 < 0)
				return this.vector.end();
			else
				return new VectorIterator<T>(this.vector, this.index_ - 1);
		}

		/**
		 * @inheritdoc
		 */
		public next(): VectorIterator<T>
		{
			if (this.index_ >= this.source_.size() - 1)
				return this.vector.end();
			else
				return new VectorIterator<T>(this.vector, this.index_ + 1);
		}

		/**
		 * @inheritdoc
		 */
		public advance(n: number): VectorIterator<T>
		{
			let newIndex: number = this.index_ + n;

			if (newIndex < 0 || newIndex >= this.vector.size())
				return this.vector.end();
			else
				return new VectorIterator<T>(this.vector, newIndex);
		}

		/**
		 * @inheritdoc
		 */
		public swap(obj: VectorIterator<T>): void
		{
			let supplement = this.value;

			this.value = obj.value;
			obj.value = supplement;
		}
	}
}