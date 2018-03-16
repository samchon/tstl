/// <reference path="../../API.ts" />

/// <reference path="MapContainer.ts" />

namespace std.base
{
	export abstract class MultiMap<Key, T, Source extends MultiMap<Key, T, Source>>
		extends MapContainer<Key, T, Source>
	{
		/* ---------------------------------------------------------
			INSERT
		--------------------------------------------------------- */
		public emplace(key: Key, value: T): MapIterator<Key, T, Source>;
		public emplace(tuple: IPair<Key, T>): MapIterator<Key, T, Source>;

		public emplace(...args: any[]): MapIterator<Key, T, Source>
		{
			if (args.length == 1)
				return this._Emplace(args[0].first, args[0].second);
			else
				return this._Emplace(args[0], args[1]);
		}

		public insert(pair: IPair<Key, T>): MapIterator<Key, T, Source>;
		public insert(hint: MapIterator<Key, T, Source>, pair: IPair<Key, T>): MapIterator<Key, T, Source>;
		public insert<L extends Key, U extends T, InputIterator extends Readonly<IForwardIterator<IPair<L, U>, InputIterator>>>
			(first: InputIterator, last: InputIterator): void

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
		protected abstract _Key_eq(x: Key, y: Key): boolean;

		/**
		 * @hidden
		 */
		protected _Erase_by_key(key: Key): number
		{
			let first = this.find(key);
			if (first.equals(this.end()) == true)
				return 0;

			let last = first.next();
			let ret: number = 1;

			while (!last.equals(this.end()) && this._Key_eq(key, last.first))
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