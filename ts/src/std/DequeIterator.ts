/// <reference path="base/Iterator.ts" />

namespace std
{
	/**
	 * An iterator of {@link Deque}.
	 *
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export class DequeIterator<T>
		extends base.Iterator<T>
		implements base.IArrayIterator<T>
	{
		private get deque(): Deque<T> { return this.source_ as Deque<T>; }

		/**
		 * Sequence number of iterator in the source {@link Deque}.
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
		public get value(): T
		{
			return this.deque.at(this.index_);
		}

		public set value(val: T)
		{
			this.deque.set(this.index_, val);
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
		public equal_to<U extends T>(obj: DequeIterator<U>): boolean
		{
			return super.equal_to(obj) && this.index_ == obj.index_;
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

		/**
		 * @inheritdoc
		 */
		public swap(obj: DequeIterator<T>): void
		{
			[this.value, obj.value] = [obj.value, this.value];
		}
	}
}