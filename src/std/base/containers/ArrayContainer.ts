/// <reference path="../../API.ts" />

/// <reference path="Container.ts" />

namespace std.base
{
	/**
	 * @hidden
	 */
	export abstract class ArrayContainer<T, Source extends IArrayContainer<T>> 
		extends Container<T>
		implements IArrayContainer<T>
	{
		/**
		 * @hidden
		 */
		private begin_: ArrayIterator<T, Source>;

		/**
		 * @hidden
		 */
		private end_: ArrayIterator<T, Source>;

		/**
		 * @hidden
		 */
		private rend_: ArrayReverseIterator<T, Source>;

		/* ---------------------------------------------------------
			CONSTRUCTORS
		--------------------------------------------------------- */
		protected constructor()
		{
			super();

			this.begin_ = new ArrayIterator<T, Source>(this as IArrayContainer<T> as Source, 0);
			this.end_ = new ArrayIterator<T, Source>(this as IArrayContainer<T> as Source, -1);
			this.rend_ = new ArrayReverseIterator<T, Source>(this.begin_);
		}

		/* =========================================================
			ACCESSORS
				- ITERATORS
				- INDEXES
		============================================================
			ITERATORS
		--------------------------------------------------------- */
		public begin(): ArrayIterator<T, Source>
		{
			if (this.empty() == true)
				return this.end_;
			else
				return this.begin_;
		}

		public end(): ArrayIterator<T, Source>
		{
			return this.end_;
		}

		public rbegin(): ArrayReverseIterator<T, Source>
		{
			return new ArrayReverseIterator<T, Source>(this.end_);
		}

		public rend(): ArrayReverseIterator<T, Source>
		{
			if (this.empty() == true)
				return new ArrayReverseIterator<T, Source>(this.end_);
			else
				return this.rend_;
		}

		/* ---------------------------------------------------------
			INDEXES
		--------------------------------------------------------- */
		public abstract at(index: number): T;

		public abstract set(index: number, val: T): void;

		public front(): T;

		public front(val: T): void;

		public front(val: T = null): T | void
		{
			if (val == null)
				return this.at(0);
			else
				this.set(0, val);
		}

		public back(): T;

		public back(val: T): void;

		public back(val: T = null): T | void
		{
			let index: number = this.size() - 1;
			if (val == null)
				return this.at(index);
			else
				this.set(index, val);
		}

		/* =========================================================
			ELEMENTS I/O
				- INSERT
				- ERASE
				- SWAP
		============================================================
			INSERT
		--------------------------------------------------------- */
		public abstract push_back(val: T): void;

		public insert(pos: ArrayIterator<T, Source>, val: T): ArrayIterator<T, Source>;
		
		public insert(pos: ArrayIterator<T, Source>, n: number, val: T): ArrayIterator<T, Source>;
		
		public insert<U extends T, InputIterator extends IForwardIterator<U>>
			(pos: ArrayIterator<T, Source>, first: InputIterator, last: InputIterator): ArrayIterator<T, Source>;

		public insert(pos: ArrayReverseIterator<T, Source>, val: T): ArrayIterator<T, Source>;
		
		public insert(pos: ArrayReverseIterator<T, Source>, n: number, val: T): ArrayIterator<T, Source>;
		
		public insert<U extends T, InputIterator extends IForwardIterator<U>>
			(pos: ArrayReverseIterator<T, Source>, first: InputIterator, last: InputIterator): ArrayIterator<T, Source>;

		public insert(...args: any[]): ArrayIterator<T, Source> | ArrayReverseIterator<T, Source>
		{
			// VALIDATION
			if (args[0].source() != this)
				throw new InvalidArgument("Parametric iterator is not this container's own.");

			// REVERSE_ITERATOR TO ITERATOR
			let ret: ArrayIterator<T, Source>;
			let is_reverse_iterator: boolean = false;

			if (args[0] instanceof ArrayReverseIterator)
			{
				is_reverse_iterator = true;
				args[0] = (args[0] as ArrayReverseIterator<T, Source>).base().prev();
			}

			// BRANCHES
			if (args.length == 2)
				ret = this._Insert_by_val(args[0], args[1]);
			else if (args.length == 3 && typeof args[1] == "number")
				ret = this._Insert_by_repeating_val(args[0], args[1], args[2]);
			else
				ret = this._Insert_by_range(args[0], args[1], args[2]);

			// RETURNS
			if (is_reverse_iterator == true)
				return new ArrayReverseIterator<T, Source>(ret.next());
			else
				return ret;
		}

		/**
		 * @hidden
		 */
		private _Insert_by_val(position: ArrayIterator<T, Source>, val: T): ArrayIterator<T, Source>
		{
			return this._Insert_by_repeating_val(position, 1, val);
		}

		/**
		 * @hidden
		 */
		private _Insert_by_repeating_val(position: ArrayIterator<T, Source>, n: number, val: T): ArrayIterator<T, Source>
		{
			let first: base._Repeater<T> = new base._Repeater<T>(0, val);
			let last: base._Repeater<T> = new base._Repeater<T>(n);

			return this._Insert_by_range(position, first, last);
		}

		/**
		 * @hidden
		 */
		protected abstract _Insert_by_range<U extends T, InputIterator extends IForwardIterator<U>>
			(pos: ArrayIterator<T, Source>, first: InputIterator, last: InputIterator): ArrayIterator<T, Source>;

		/* ---------------------------------------------------------
			ERASE
		--------------------------------------------------------- */
		public abstract pop_back(): void;

		public erase(it: ArrayIterator<T, Source>): ArrayIterator<T, Source>;

		public erase(first: ArrayIterator<T, Source>, last: ArrayIterator<T, Source>): ArrayIterator<T, Source>;

		public erase(it: ArrayReverseIterator<T, Source>): ArrayReverseIterator<T, Source>;

		public erase(first: ArrayReverseIterator<T, Source>, last: ArrayReverseIterator<T, Source>): ArrayReverseIterator<T, Source>;

		public erase(first: any, last: any = first.next()): any
		{
			// VALIDATION
			if (first.source() != this || last.source() != this)
				throw new InvalidArgument("Parametric iterator is not this container's own.");

			let ret: ArrayIterator<T, Source>;
			let is_reverse_iterator: boolean = false;

			// REVERSE_ITERATOR TO ITERATOR
			if (first instanceof ArrayReverseIterator)
			{
				is_reverse_iterator = true;

				let first_it = (last as ArrayReverseIterator<T, Source>).base();
				let last_it = (first as ArrayReverseIterator<T, Source>).base();

				first = first_it;
				last = last_it;
			}

			// ERASE ELEMENTS
			ret = this._Erase_by_range(first, last);

			// RETURN BRANCHES
			if (is_reverse_iterator == true)
				return new ArrayReverseIterator<T, Source>(ret.next());
			else
				return ret;
		}

		/**
		 * @hidden
		 */
		protected abstract _Erase_by_range
			(first: ArrayIterator<T, Source>, last: ArrayIterator<T, Source>): ArrayIterator<T, Source>;
	}
}
