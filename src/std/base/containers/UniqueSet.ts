/// <reference path="../../API.ts" />

/// <reference path="SetContainer.ts" />

namespace std.base
{
	export abstract class UniqueSet<T, Source extends UniqueSet<T, Source>>
		extends SetContainer<T, Source>
	{
		/* ---------------------------------------------------------
			ACCESSOR
		--------------------------------------------------------- */
		public count(key: T): number
		{
			return this.find(key).equals(this.end()) ? 0 : 1;
		}

		/* ---------------------------------------------------------
			INSERT
		--------------------------------------------------------- */
		public insert(val: T): Pair<SetIterator<T, Source>, boolean>;
		public insert(hint: SetIterator<T, Source>, val: T): SetIterator<T, Source>;
		public insert<U extends T, InputIterator extends Readonly<IForwardIterator<U, InputIterator>>>
			(first: InputIterator, last: InputIterator): void;

		public insert(...args: any[]): any
		{
			return super.insert.apply(this, args);
		}

		/* ---------------------------------------------------------
			ERASE
		--------------------------------------------------------- */
		public extract(val: T): T;
		public extract(it: SetIterator<T, Source>): SetIterator<T, Source>;

		public extract(param: T | SetIterator<T, Source>): any
		{
			if (param instanceof SetIterator)
				return this._Extract_by_iterator(param);
			else
				return this._Extract_by_val(param);
		}

		/**
		 * @hidden
		 */
		private _Extract_by_val(val: T): T
		{
			let it = this.find(val);
			if (it.equals(this.end()) == true)
				throw new OutOfRange("No such key exists.");

			this._Erase_by_range(it);
			return val;
		}

		/**
		 * @hidden
		 */
		private _Extract_by_iterator(it: SetIterator<T, Source>): SetIterator<T, Source>
		{
			if (it.equals(this.end()) == true || this.has(it.value) == false)
				return this.end();

			this._Erase_by_range(it);
			return it;
		}

		/**
		 * @hidden
		 */
		protected _Erase_by_val(val: T): number
		{
			let it = this.find(val);
			if (it.equals(this.end()) == true)
				return 0;

			this._Erase_by_range(it);
			return 1;
		}

		/* ---------------------------------------------------------
			UTILITY
		--------------------------------------------------------- */
		public merge(source: Source): void
		{
			for (let it = source.begin(); !it.equals(source.end());)
			{
				if (this.has(it.value) == false)
				{
					this.insert(it.value);
					it = source.erase(it);
				}
				else
					it = it.next();
			}
		}
	}
}