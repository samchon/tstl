/// <reference path="base/container/Iterator.ts" />

namespace std
{
	/**
	 * An iterator of {@link Deque}.
	 *
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export class DequeIterator<T>
		extends base.container.Iterator<T>
		implements base.container.IArrayIterator<T>
	{
		private get deque(): Deque<T> { return this.source_ as Deque<T>; }

		/**
		 * Sequence number in the source Deque.
		 */
		private index_: number;

		/* ---------------------------------------------------------
			CONSTRUCTORS
		--------------------------------------------------------- */
		/**
		 * <p> Construct from the source {@link Deque container}. </p>
		 *
		 * <h4> Note </h4>
		 * <p> Do not create the iterator directly, by yourself. </p>
		 * <p> Use {@link Deque.begin begin()}, {@link Deque.end end()} in {@link Deque container} instead. </p> 
		 *
		 * @param vector The source {@link Deque container} to reference.
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
		public get value(): T
		{
			return this.deque.at(this.index_);
		}

		public set value(val: T)
		{
			this.deque.set(this.index_, val);
		}

		/**
		 * @inheritdoc
		 */
		public equals<U extends T>(obj: DequeIterator<U>): boolean
		{
			return super.equals(obj) && this.index_ == obj.index_;
		}

		/**
		 * Get index.
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
		public prev(): DequeIterator<T>
		{
			if (this.index_ == -1)
				return new DequeIterator(this.deque, this.deque.size() - 1);
			else if (this.index_ - 1 < 0)
				return this.deque.end();
			else
				return new DequeIterator<T>(this.deque, this.index_ - 1);
		}

		/**
		 * @inheritdoc
		 */
		public next(): DequeIterator<T>
		{
			if (this.index_ >= this.source_.size() - 1)
				return this.deque.end();
			else
				return new DequeIterator<T>(this.deque, this.index_ + 1);
		}

		/**
		 * @inheritdoc
		 */
		public advance(n: number): DequeIterator<T>
		{
			let new_index: number = this.index_ + n;

			if (new_index < 0 || new_index >= this.deque.size())
				return this.deque.end();
			else
				return new DequeIterator<T>(this.deque, new_index);
		}

		public swap(obj: DequeIterator<T>): void
		{
			let supplement = this.value;

			this.value = obj.value;
			obj.value = supplement;
		}
	}
}