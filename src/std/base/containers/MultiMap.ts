/// <reference path="../../API.ts" />

/// <reference path="MapContainer.ts" />

namespace std.base
{
	export abstract class MultiMap<Key, T, Source extends IMultiMap<Key, T>>
		extends MapContainer<Key, T, Source>
	{
		/* ---------------------------------------------------------
			INSERT
		--------------------------------------------------------- */
		public emplace(key: Key, value: T): MapIterator<Key, T, Source>;

		public emplace(pair: IPair<Key, T>): MapIterator<Key, T, Source>;

		public emplace(...args: any[]): MapIterator<Key, T, Source>
		{
			if (args.length == 1)
				return this._Emplace(args[0].first, args[0].second);
			else
				return this._Emplace(args[0], args[1]);
		}

		public insert(pair: IPair<Key, T>): MapIterator<Key, T, Source>;

		public insert(hint: MapIterator<Key, T, Source>, pair: IPair<Key, T>): MapIterator<Key, T, Source>;

		public insert(hint: MapReverseIterator<Key, T, Source>, pair: IPair<Key, T>): MapReverseIterator<Key, T, Source>;
		
		public insert<L extends Key, U extends T, InputIterator extends IForwardIterator<IPair<L, U>>>
			(first: InputIterator, last: InputIterator): void

		public insert(...args: any[]): any
		{
			return super.insert.apply(this, args);
		}

		/* ---------------------------------------------------------
			UTILITY
		--------------------------------------------------------- */
		public merge(source: MapContainer<Key, T, Source>): void
		{
			this.insert(source.begin(), source.end());
			source.clear();
		}
	}
}