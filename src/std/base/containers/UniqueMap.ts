/// <reference path="../../API.ts" />

/// <reference path="MapContainer.ts" />

namespace std.base
{
	export abstract class UniqueMap<Key, T, Source extends UniqueMap<Key, T, Source>>
		extends MapContainer<Key, T, Source>
	{
		/* ---------------------------------------------------------
			ACCESSORS
		--------------------------------------------------------- */
		public count(key: Key): number
		{
			return this.find(key).equals(this.end()) ? 0 : 1;
		}

		public get(key: Key): T
		{
			let it = this.find(key);
			if (it.equals(this.end()) == true)
				throw new OutOfRange("unable to find the matched key.");

			return it.second;
		}

		public set(key: Key, val: T): void
		{
			this.insert_or_assign(key, val);
		}

		/* ---------------------------------------------------------
			INSERT
		--------------------------------------------------------- */
		public emplace(key: Key, value: T): Pair<MapIterator<Key, T, Source>, boolean>;
		public emplace(pair: IPair<Key, T>): Pair<MapIterator<Key, T, Source>, boolean>;

		public emplace(...args: any[]): Pair<MapIterator<Key, T, Source>, boolean>
		{
			if (args.length == 1)
				return this._Emplace(args[0].first, args[0].second);
			else
				return this._Emplace(args[0], args[1]);
		}

		public insert(pair: IPair<Key, T>): Pair<MapIterator<Key, T, Source>, boolean>;
		public insert(hint: MapIterator<Key, T, Source>, pair: IPair<Key, T>): MapIterator<Key, T, Source>;
		public insert<L extends Key, U extends T, InputIterator extends Readonly<IForwardIterator<IPair<L, U>, InputIterator>>>
			(first: InputIterator, last: InputIterator): void

		public insert(...args: any[]): any
		{
			return super.insert.apply(this, args);
		}

		public insert_or_assign(key: Key, value: T): Pair<MapIterator<Key, T, Source>, boolean>;
		public insert_or_assign(hint: MapIterator<Key, T, Source>, key: Key, value: T): MapIterator<Key, T, Source>;

		public insert_or_assign(...args: any[]): any
		{
			if (args.length == 2)
			{
				return this._Insert_or_assign_with_key_value(args[0], args[1]);
			}
			else if (args.length == 3)
			{
				// INSERT OR ASSIGN AN ELEMENT
				return this._Insert_or_assign_with_hint(args[0], args[1], args[2]);
			}
		}

		/**
		 * @hidden
		 */
		private _Insert_or_assign_with_key_value(key: Key, value: T): Pair<MapIterator<Key, T, Source>, boolean>
		{
			let it = this.find(key);

			if (it.equals(this.end()) == true)
				return this._Emplace(key, value);
			else
			{
				it.second = value;
				return make_pair(it, false);
			}
		}

		/**
		 * @hidden
		 */
		private _Insert_or_assign_with_hint(hint: MapIterator<Key, T, Source>, key: Key, value: T): MapIterator<Key, T, Source>
		{
			let it = this._Emplace_hint(hint, key, value);
			if (it.second != value)
				it.second = value;

			return it;
		}

		/* ---------------------------------------------------------
			ERASE
		--------------------------------------------------------- */
		public extract(key: Key): Entry<Key, T>;
		public extract(it: MapIterator<Key, T, Source>): MapIterator<Key, T, Source>;

		public extract(param: Key | MapIterator<Key, T, Source>): any
		{
			if (param instanceof MapIterator)
				return this._Extract_by_iterator(param);
			else
				return this._Extract_by_key(param);
		}

		/**
		 * @hidden
		 */
		private _Extract_by_key(key: Key): Entry<Key, T>
		{
			let it = this.find(key);
			if (it.equals(this.end()) == true)
				throw new OutOfRange("No such key exists.");

			let ret: Entry<Key, T> = it.value;
			this.erase(it);

			return ret;
		}

		/**
		 * @hidden
		 */
		private _Extract_by_iterator(it: MapIterator<Key, T, Source>): MapIterator<Key, T, Source>
		{
			if (it.equals(this.end()) == true)
				return this.end();

			this.erase(it);
			return it;
		}

		/* ---------------------------------------------------------
			UTILITY
		--------------------------------------------------------- */
		public merge(source: Source): void
		{
			for (let it = source.begin(); !it.equals(source.end());)
			{
				if (this.has(it.first) == false)
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