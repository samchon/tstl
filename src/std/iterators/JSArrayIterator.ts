/// <reference path="../API.ts" />

namespace std.JSArray
{
	export class Iterator<T> implements IRandomAccessIterator<T>
	{
		/**
		 * @hidden
		 */
		private source_: Array<T>;

		/**
		 * @hidden
		 */
		private index_: number;

		/* ---------------------------------------------------------
			CONSTRUCTORS
		--------------------------------------------------------- */
		public constructor(source: Array<T>, index: number)
		{
			this.source_ = source;
			this.index_ = index;
		}

		/* ---------------------------------------------------------
			ACCESSORS
		--------------------------------------------------------- */
		public source(): Array<T>
		{
			return this.source_;
		}

		public index(): number
		{
			return this.index_;
		}

		public get value(): T
		{
			return this.source_[this.index_];
		}
		
		public set value(val: T)
		{
			this.source_[this.index_] = val;
		}

		/* ---------------------------------------------------------
			MOVERS
		--------------------------------------------------------- */
		public prev(): Iterator<T>
		{
			if (this.index_ == -1)
				return new Iterator<T>(this.source_, this.source_.length - 1);
			else if (this.index_ - 1 < 0)
				return this._End();
			else
				return new Iterator<T>(this.source_, this.index_ - 1);
		}

		public next(): Iterator<T>
		{
			if (this.index_ >= this.source_.length - 1)
				return this._End();
			else
				return new Iterator<T>(this.source(), this.index_ + 1);
		}

		public advance(n: number): Iterator<T>
		{
			let new_index: number;
			if (n < 0 && this.index_ == -1)
				new_index = this.source_.length + n;
			else
				new_index = this.index_ + n;
			
			if (new_index < 0 || new_index >= this.source_.length)
				return this._End();
			else
				return new Iterator<T>(this.source_, new_index);
		}

		private _End(): Iterator<T>
		{
			return new Iterator<T>(this.source_, -1);
		}

		/* ---------------------------------------------------------
			COMPARES
		--------------------------------------------------------- */
		public equals(obj: Iterator<T>): boolean
		{
			return this.source_ == obj.source_ && this.index_ == obj.index_;
		}

		public swap(obj: Iterator<T>): void
		{
			[this.value, obj.value] = [obj.value, this.value];
		}
	}

	export class ReverseIterator<T> implements IRandomAccessIterator<T>
	{
		/**
		 * @hidden
		 */
		private base_: Iterator<T>;

		/* ---------------------------------------------------------
			CONSTRUCTORS
		--------------------------------------------------------- */
		public constructor(base: Iterator<T>)
		{
			this.base_ = base.prev();
		}

		/* ---------------------------------------------------------
			ACCESSORS
		--------------------------------------------------------- */
		public base(): Iterator<T>
		{
			return this.base_.next();
		}

		public source(): Array<T>
		{
			return this.source();
		}

		public index(): number
		{
			return this.base_.index();
		}

		public get value(): T
		{
			return this.base_.value;
		}
		public set value(val: T)
		{
			this.base_.value = val;
		}

		/* ---------------------------------------------------------
			MOVERS
		--------------------------------------------------------- */
		public prev(): ReverseIterator<T>
		{
			// RI of this.base().next()
			return new ReverseIterator<T>(this.base_);
		}

		public next(): ReverseIterator<T>
		{
			return new ReverseIterator<T>(this.base_.advance(-2));
		}

		public advance(n: number): ReverseIterator<T>
		{
			return new ReverseIterator<T>(this.base_.advance(-n-1));
		}

		/* ---------------------------------------------------------
			COMPARES
		--------------------------------------------------------- */
		public equals(obj: ReverseIterator<T>): boolean
		{
			return this.base_.equals(obj.base_);
		}

		public swap(obj: ReverseIterator<T>): void
		{
			this.base_.swap(obj.base_);
		}
	}
}
