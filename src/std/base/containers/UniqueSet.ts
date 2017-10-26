/// <reference path="../../API.ts" />

/// <reference path="SetContainer.ts" />

namespace std.base
{
	export abstract class UniqueSet<T, Source extends IUniqueSet<T>>
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

		public insert(hint: SetReverseIterator<T, Source>, val: T): SetReverseIterator<T, Source>;

		public insert<U extends T, InputIterator extends Iterator<U>>
			(begin: InputIterator, end: InputIterator): void;

		public insert(...args: any[]): any
		{
			return super.insert.apply(this, args);
		}

		/* ---------------------------------------------------------
			ERASE
		--------------------------------------------------------- */
		public extract(val: T): T;

		public extract(it: SetIterator<T, Source>): SetIterator<T, Source>;

		public extract(it: SetReverseIterator<T, Source>): SetReverseIterator<T, Source>;

		public extract(param: T | SetIterator<T, Source> | SetReverseIterator<T, Source>): any
		{
			if (param instanceof SetIterator)
				return this._Extract_by_iterator(param);
			else if (param instanceof SetReverseIterator)
				return this._Extract_by_reverse_iterator(param);
			else
				return this._Extract_by_key(param);
		}

		/**
		 * @hidden
		 */
		private _Extract_by_key(val: T): T
		{
			let it = this.find(val);
			if (it.equals(this.end()) == true)
				throw new OutOfRange("No such key exists.");

			this.erase(val);
			return val;
		}

		/**
		 * @hidden
		 */
		private _Extract_by_iterator(it: SetIterator<T, Source>): SetIterator<T, Source>
		{
			if (it.equals(this.end()) == true || this.has(it.value) == false)
				return this.end();

			this.erase(it);
			return it;
		}

		/**
		 * @hidden
		 */
		private _Extract_by_reverse_iterator(it: SetReverseIterator<T, Source>): SetReverseIterator<T, Source>
		{
			this._Extract_by_iterator(it.base().next());
			return it;
		}

		/* ---------------------------------------------------------
			UTILITY
		--------------------------------------------------------- */
		public merge(source: SetContainer<T, Source>): void
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