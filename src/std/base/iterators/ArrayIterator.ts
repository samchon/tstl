/// <reference path="../../API.ts" />

/// <reference path="Iterator.ts" />

namespace std.base
{
	/**
	 * @hidden
	 */
	export class ArrayIterator<T, Source extends IArrayContainer<T>>
		extends Iterator<T>
		implements IArrayIterator<T>
	{
		/**
		 * @hidden
		 */
		private index_: number;
		
		/* ---------------------------------------------------------
			CONSTRUCTORS
		--------------------------------------------------------- */
		/**
		 * Construct from the source {@link ArrayContainer container}.
		 *
		 * #### Note
		 * Do not create the iterator directly, by yourself.
		 * 
		 * Use {@link ArrayContainer.begin begin()}, {@link ArrayContainer.end end()} in {@link ArrayContainer container} instead. 
		 *
		 * @param source The source {@link ArrayContainer container} to reference.
		 * @param index Sequence number of the element in the source {@link ArrayContainer}.
		 */
		public constructor(source: Source, index: number)
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
		public source(): Source
		{
			return this.source_ as Source;
		};

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
			return this.source().at(this.index_)
		};

		/**
		 * Set value of the iterator is pointing to.
		 * 
		 * @param val Value to set.
		 */
		public set value(val: T)
		{
			this.source().set(this.index_, val);
		};

		/* ---------------------------------------------------------
			MOVERS
		--------------------------------------------------------- */
		/**
		 * @inheritdoc
		 */
		public prev(): ArrayIterator<T, Source>
		{
			if (this.index_ == -1)
				return new ArrayIterator<T, Source>(this.source(), this.source_.size() - 1);
			else if (this.index_ - 1 < 0)
				return this.source().end() as ArrayIterator<T, Source>;
			else
				return new ArrayIterator<T, Source>(this.source(), this.index_ - 1);
		}

		/**
		 * @inheritdoc
		 */
		public next(): ArrayIterator<T, Source>
		{
			if (this.index_ >= this.source_.size() - 1)
				return this.source().end() as ArrayIterator<T, Source>;
			else
				return new ArrayIterator<T, Source>(this.source(), this.index_ + 1);
		}

		/**
		 * @inheritdoc
		 */
		public advance(n: number): ArrayIterator<T, Source>
		{
			let new_index: number;
			if (n < 0 && this.index_ == -1)
				new_index = this.source_.size() + n;
			else
				new_index = this.index_ + n;

			if (new_index < 0 || new_index >= this.source_.size())
				return this.source().end() as ArrayIterator<T, Source>;
			else
				return new ArrayIterator<T, Source>(this.source(), new_index);
		}

		/* ---------------------------------------------------------
			COMPARES
		--------------------------------------------------------- */
		/**
		 * @inheritdoc
		 */
		public equals(obj: ArrayIterator<T, Source>): boolean
		{
			return this.source_ == obj.source_ && this.index_ == obj.index_;
		}

		/**
		 * @inheritdoc
		 */
		public swap(obj: ArrayIterator<T, Source>): void
		{
			[this.value, obj.value] = [obj.value, this.value];
		};
	}
}

namespace std.base
{
	/**
	 * @hidden
	 */
	export class ArrayReverseIterator<T, Source extends IArrayContainer<T>>
		extends ReverseIterator<T, Source, ArrayIterator<T, Source>, ArrayReverseIterator<T, Source>>
	{
		/* ---------------------------------------------------------
			CONSTRUCTORS
		--------------------------------------------------------- */
		/**
		 * Construct from base iterator.
		 * 
		 * @param base A reference of the base iterator, which iterates in the opposite direction.
		 */
		public constructor(base: ArrayIterator<T, Source>)
		{
			super(base);
		}

		/**
		 * @hidden
		 */
		protected _Create_neighbor(base: ArrayIterator<T, Source>): ArrayReverseIterator<T, Source>
		{
			return new ArrayReverseIterator<T, Source>(base);
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
		 * @inheritdoc
		 */
		public set value(val: T)
		{
			this.base_.value = val;
		}
	}
}
