/// <reference path="../../API.ts" />

/// <reference path="SetContainer.ts" />

namespace std.base
{
	export abstract class MultiSet<T, Source extends MultiSet<T, Source>>
		extends SetContainer<T, Source>
	{
		/* ---------------------------------------------------------
			INSERT
		--------------------------------------------------------- */
		public insert(val: T): SetIterator<T, Source>;
		public insert(hint: SetIterator<T, Source>, val: T): SetIterator<T, Source>;
		public insert<U extends T, InputIterator extends Readonly<IForwardIterator<U, InputIterator>>>
			(begin: InputIterator, end: InputIterator): void;

		public insert(...args: any[]): any
		{
			return super.insert.apply(this, args);
		}

		/* ---------------------------------------------------------
			ERASE
		--------------------------------------------------------- */
		/**
		 * @hidden
		 */
		protected abstract _Key_eq(x: T, y: T): boolean;

		/**
		 * @hidden
		 */
		protected _Erase_by_val(val: T): number
		{
			let first = this.find(val);
			if (first.equals(this.end()) == true)
				return 0;

			let last = first.next();
			let ret: number = 1;

			while (!last.equals(this.end()) && this._Key_eq(val, last.value))
			{
				last = last.next();
				++ret;
			}
			this._Erase_by_range(first, last);
			return ret;
		}

		/* ---------------------------------------------------------
			UTILITY
		--------------------------------------------------------- */
		public merge(source: Source): void
		{
			this.insert(source.begin(), source.end());
			source.clear();
		}
	}
}