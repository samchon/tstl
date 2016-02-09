/// <reference path="base/container/Iterator.ts" />

namespace std
{
	 export class ListIterator<T>
		 extends base.container.Iterator<T>
	{
		protected value_: T;

		protected prev_: ListIterator<T>;
		protected next_: ListIterator<T>;

		/* ---------------------------------------------------------------
			CONSTRUCTORS
		--------------------------------------------------------------- */
		/**
		 * <p> Construct from source List. </p>
		 *
		 * <h4> Note </h4>
		 * <p> Do not create iterator directly. </p>
		 * <p> Use begin(), find() or end() in List instead. </p> 
		 *
		 * @param list The source vector to reference.
		 */
		public constructor(source: List<T>, prev: ListIterator<T>, next: ListIterator<T>, value: T)
		{
			super(source);
			
			this.prev_ = prev;
			this.next_ = next;

			this.value_ = value;
		}

		/**
		 * @inheritdoc
		 */
		public setPrev(prev: ListIterator<T>): void
		{
			this.prev_ = prev;
		}

		/**
		 * @inheritdoc
		 */
		public setNext(next: ListIterator<T>): void
		{
			this.next_ = next;
		}

		/* ---------------------------------------------------------------
			ACCESSORS
		--------------------------------------------------------------- */
		/**
		 * @inheritdoc
		 */
		public equals(obj: ListIterator<T>): boolean
		{
			return super.equals(obj) == true && this.prev_ == obj.prev_ && this.next_ == obj.next_;
		}
		
		/**
		 * @inheritdoc
		 */
		public prev(): ListIterator<T>
		{
			return this.prev_;
		}

		/**
		 * @inheritdoc
		 */
		public next(): ListIterator<T>
		{
			return this.next_;
		}

		 /**
		  * @inheritdoc
		  */
		public advance(size: number): ListIterator<T>
		{
			let it: ListIterator<T> = this;
			for (let i: number = 0; i < size; i++)
				it = it.next();

			return it;
		}

		/**
		 * @inheritdoc
		 */
		public get value(): T
		{
			return this.value_;
		}

		/**
		 * @inheritdoc
		 */
		public set value(val: T)
		{
			this.value_ = val;
		}
	}
}