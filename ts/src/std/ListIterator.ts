/// <reference path="base/container/Iterator.ts" />

namespace std
{
	export class ListIterator<T>
		extends base.container.Iterator<T>
	{
		protected prev_: ListIterator<T>;
		protected next_: ListIterator<T>;

		protected value_: T;

		/* ---------------------------------------------------------------
			CONSTRUCTORS
		--------------------------------------------------------------- */
		/**
		 * <p> Construct from the source {@link List container}. </p>
		 *
		 * <h4> Note </h4>
		 * <p> Do not create the iterator directly, by yourself. </p>
		 * <p> Use {@link List.begin begin()}, {@link List.end end()} in {@link List container} instead. </p> 
		 *
		 * @param source The source {@link List container} to reference.
		 * @param prev A refenrece of previous node ({@link ListIterator iterator}).
		 * @param next A refenrece of next node ({@link ListIterator iterator}).
		 * @param value Value to be stored in the node (iterator).
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
			return this == obj;
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

		/**
		 * @inheritdoc
		 */
		public swap(obj: ListIterator<T>): void
		{
			let supp_prev: ListIterator<T> = this.prev_;
			let supp_next: ListIterator<T> = this.next_;

			this.prev_ = obj.prev_;
			this.next_ = obj.next_;
			obj.prev_ = supp_prev;
			obj.next_ = supp_next;

			if (this.source_.end() == this)
				(<any>this.source_).end_ = obj;
			else if (this.source_.end() == obj)
				(<any>this.source_).end_ = this;

			if (this.source_.begin() == this)
				(<any>this.source_).begin_ = obj;
			else if (this.source_.begin() == obj)
				(<any>this.source_).begin_ = this;
		}
	}
}