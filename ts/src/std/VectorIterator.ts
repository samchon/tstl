/// <reference path="base/container/Iterator.ts" />

namespace std
{
	/**
	 * <p> An iterator of Vector. </p>
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
		protected index_: number;

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
		protected get vector(): Vector<T>
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
		 * Set value.
		 */
		public set value(val: T)
		{
			this.vector.set(this.index_, val);
		}
		
		/**
		 * <p> Whether an iterator is equal with the iterator. </p>
		 * 
		 * <p> Compare two iterators and returns whether they are equal or not. </p>
		 * 
		 * <h4> Note </h4> 
		 * <p> Iterator's equal_to() only compare souce container and index number. </p>
		 *
		 * <p> Although elements in a pair, key and value are equal_to, if the source map or
		 * index number is different, then the {@link equal_to equal_to()} will return false. If you want to
		 * compare the elements of a pair, compare them directly by yourself. </p>
		 *
		 * @param obj An iterator to compare
		 * @return Indicates whether equal or not.
		 */
		public equal_to<U extends T>(obj: VectorIterator<U>): boolean
		{
			return super.equal_to(obj) && this.index_ == obj.index_;
		}

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
			[this.value, obj.value] = [obj.value, this.value];
		}
	}
}