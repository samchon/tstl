/// <reference path="../../API.ts" />

/// <reference path="Container.ts" />

namespace std.base
{
	export abstract class ArrayContainer<T, SourceT extends ArrayContainer<T, SourceT>>
		extends Container<T, SourceT, ArrayIterator<T, SourceT>, ArrayReverseIterator<T, SourceT>>
	{
		protected constructor()
		{
			super();
		}

		/* =========================================================
			ACCESSORS
				- ITERATORS
				- INDEXES
		============================================================
			ITERATORS
		--------------------------------------------------------- */
		public begin(): ArrayIterator<T, SourceT>
		{
			return new ArrayIterator(<any>this, 0);
		}

		public end(): ArrayIterator<T, SourceT>
		{
			return new ArrayIterator(<any>this, this.size());
		}

		public rbegin(): ArrayReverseIterator<T, SourceT>
		{
			return new ArrayReverseIterator(this.end());
		}

		public rend(): ArrayReverseIterator<T, SourceT>
		{
			return new ArrayReverseIterator(this.begin());
		}

		/* ---------------------------------------------------------
			INDEXES
		--------------------------------------------------------- */
		public abstract at(index: number): T;
		public abstract set(index: number, val: T): void;

		public front(): T;
		public front(val: T): void;
		public front(val: T = undefined): T | void
		{
			if (val == undefined)
				return this.at(0);
			else
				this.set(0, val);
		}

		public back(): T;
		public back(val: T): void;
		public back(val: T = undefined): T | void
		{
			let index: number = this.size() - 1;
			if (val == undefined)
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

		public insert(pos: ArrayIterator<T, SourceT>, val: T): ArrayIterator<T, SourceT>;
		public insert(pos: ArrayIterator<T, SourceT>, n: number, val: T): ArrayIterator<T, SourceT>;
		public insert<U extends T, InputIterator extends Readonly<IForwardIterator<U>>>
			(pos: ArrayIterator<T, SourceT>, first: InputIterator, last: InputIterator): ArrayIterator<T, SourceT>;

		public insert(pos: ArrayIterator<T, SourceT>, ...args: any[]): ArrayIterator<T, SourceT>
		{
			// VALIDATION
			if (pos.source() != <any>this)
				throw new InvalidArgument("Parametric iterator is not this container's own.");
			else if (pos.index() < 0)
				throw new LengthError("Parametric iterator is directing invalid position.");
			else if (pos.index() > this.size())
				pos = this.end();

			// BRANCHES
			if (args.length == 1)
				return this._Insert_by_repeating_val(pos, 1, args[0]);
			else if (args.length == 2 && typeof args[0] == "number")
				return this._Insert_by_repeating_val(pos, args[0], args[1]);
			else
				return this._Insert_by_range(pos, args[0], args[1]);
		}

		/**
		 * @hidden
		 */
		protected _Insert_by_repeating_val(position: ArrayIterator<T, SourceT>, n: number, val: T): ArrayIterator<T, SourceT>
		{
			let first: base._Repeater<T> = new base._Repeater<T>(0, val);
			let last: base._Repeater<T> = new base._Repeater<T>(n);

			return this._Insert_by_range(position, first, last);
		}

		/**
		 * @hidden
		 */
		protected abstract _Insert_by_range<U extends T, InputIterator extends Readonly<IForwardIterator<U>>>
			(pos: ArrayIterator<T, SourceT>, first: InputIterator, last: InputIterator): ArrayIterator<T, SourceT>;

		/* ---------------------------------------------------------
			ERASE
		--------------------------------------------------------- */
		public abstract pop_back(): void;

		public erase(it: ArrayIterator<T, SourceT>): ArrayIterator<T, SourceT>;
		public erase(first: ArrayIterator<T, SourceT>, last: ArrayIterator<T, SourceT>): ArrayIterator<T, SourceT>;

		public erase(first: ArrayIterator<T, SourceT>, last: ArrayIterator<T, SourceT> = first.next()): ArrayIterator<T, SourceT>
		{
			// VALIDATION
			if (first.source() != <any>this || last.source() != <any>this)
				throw new InvalidArgument("Parametric iterator is not this container's own.");
			else if (first.index() < 0)
				throw new LengthError("Invalid parameter: first is directing negative index.");

			// ADJUSTMENTS
			if (first.index() >= this.size())
				return this.end();
			else if (first.index() > last.index())
				throw new RangeError("Invalid range. Paramter first is greater than last.");

			// ERASE ELEMENTS
			return this._Erase_by_range(first, last);
		}

		/**
		 * @hidden
		 */
		protected abstract _Erase_by_range
			(first: ArrayIterator<T, SourceT>, last: ArrayIterator<T, SourceT>): ArrayIterator<T, SourceT>;
	}
}
