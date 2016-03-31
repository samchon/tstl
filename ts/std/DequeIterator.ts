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
		implements base.container.ILinearIterator<T>
	{
		private get deque(): Deque<T> { return <Deque<T>>this.source; }

		/**
		 * Sequence number in the source Deque.
		 */
		private index: number;

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

			this.index = index;
		}

		/* ---------------------------------------------------------
			ACCESSORS
		--------------------------------------------------------- */
		/**
		 * @inheritdoc
		 */
		public get value(): T
		{
			return this.deque.at(this.index);
		}

		public set value(val: T)
		{
			this.deque.set(this.index, val);
		}

		/**
		 * @inheritdoc
		 */
		public equals<U extends T>(obj: DequeIterator<U>): boolean
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
		public prev(): DequeIterator<T>
		{
			if (this.index == -1)
				return new DequeIterator(this.deque, this.deque.size() - 1);
			else if (this.index - 1 < 0)
				return this.deque.end();
			else
				return new DequeIterator<T>(this.deque, this.index - 1);
		}

		/**
		 * @inheritdoc
		 */
		public next(): DequeIterator<T>
		{
			if (this.index >= this.source.size() - 1)
				return this.deque.end();
			else
				return new DequeIterator<T>(this.deque, this.index + 1);
		}

		/**
		 * @inheritdoc
		 */
		public advance(n: number): DequeIterator<T>
		{
			let newIndex: number = this.index + n;

			if (newIndex < 0 || newIndex >= this.deque.size())
				return this.deque.end();
			else
				return new DequeIterator<T>(this.deque, newIndex);
		}

		public swap(obj: DequeIterator<T>): void
		{
			let supplement = this.value;

			this.value = obj.value;
			obj.value = supplement;
		}
	}
}