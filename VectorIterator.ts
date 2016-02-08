/// <reference path="base/container/Iterator.ts" />

namespace std
{
	/**
	 * <p> A bi-directional iterator of a Set. </p>
	 *
	 * @param <T> Type of the elements.
	 * 
	 * @author Jeongho Nam
	 */
	export class VectorIterator<T>
		extends base.container.Iterator<T>
	{
		/**
		 * <p> Sequence number of iterator in the source Vector. </p>
		 */
		private index: number;

		/* ---------------------------------------------------------
			CONSTRUCTORS
		--------------------------------------------------------- */
		/**
		 * <p> Construct from source and index number. </p>
		 *
		 * <h4> Note </h4>
		 * <p> Do not create iterator directly. </p>
		 * <p> Use begin(), find() or end() in Vector instead. </p> 
		 *
		 * @param vector The source vector to reference.
		 * @param index Sequence number of the element in the surce vector.
		 */
		public constructor(source: Vector<T>, index: number)
		{
			super(source);

			this.index = index;
		}

		/* ---------------------------------------------------------
			ACCESSORS
		--------------------------------------------------------- */
		private get vector(): Vector<T>
		{
			return <Vector<T>>this.source;
		}

		/**
		 * @inheritdoc
		 */
		public get value(): T
		{
			return this.vector.at(this.index);
		}

		/**
		 * @inheritdoc
		 */
		public set value(val: T)
		{
			this.vector.set(this.index, val);
		}
		
		/**
		 * @inheritdoc
		 */
		public equals<U extends T>(obj: VectorIterator<U>): boolean
		{
			return super.equals(obj) && this.index == obj.index;
		}

		/**
		 * Get index.
		 */
		public getIndex(): number
		{
			return this.index;
		}

		/* ---------------------------------------------------------
			MOVERS
		--------------------------------------------------------- */
		/**
		 * @inheritdoc
		 */
		public prev(): VectorIterator<T>
		{
			if (this.index <= 0)
				return this.vector.end();
			else
				return new VectorIterator<T>(this.vector, this.index - 1);
		}

		/**
		 * @inheritdoc
		 */
		public next(): VectorIterator<T>
		{
			if (this.index >= this.source.size() - 1)
				return this.vector.end();
			else
				return new VectorIterator<T>(this.vector, this.index + 1);
		}

		/**
		 * @inheritdoc
		 */
		public advance(n: number): VectorIterator<T>
		{
			let newIndex: number = this.index + n;

			if (newIndex < 0 || newIndex >= this.vector.size())
				return this.vector.end();
			else
				return new VectorIterator<T>(this.vector, newIndex);
		}
	}
}