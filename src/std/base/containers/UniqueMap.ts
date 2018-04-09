/// <reference path="../../API.ts" />

/// <reference path="MapContainer.ts" />

namespace std.base
{
	/**
	 * Base class for Unique-key Map Containers.
	 * 
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export abstract class UniqueMap<Key, T, Source extends UniqueMap<Key, T, Source>>
		extends MapContainer<Key, T, Source>
	{
		/* ---------------------------------------------------------
			ACCESSORS
		--------------------------------------------------------- */
		/**
		 * @inheritDoc
		 */
		public count(key: Key): number
		{
			return this.find(key).equals(this.end()) ? 0 : 1;
		}

		/**
		 * Get a value.
		 * 
		 * @param key Key to search for.
		 * @return The value mapped by the key.
		 */
		public get(key: Key): T
		{
			let it = this.find(key);
			if (it.equals(this.end()) === true)
				throw new OutOfRange("unable to find the matched key.");

			return it.second;
		}

		/**
		 * Set a value with key.
		 * 
		 * @param key Key to be mapped or search for.
		 * @param val Value to insert or assign.
		 */
		public set(key: Key, val: T): void
		{
			this.insert_or_assign(key, val);
		}

		/* ---------------------------------------------------------
			INSERT
		--------------------------------------------------------- */
		/**
		 * Construct and insert element.
		 * 
		 * @param key Key to be mapped or search for.
		 * @param value Value to emplace.
		 * @return {@link Pair} of an iterator to the newly inserted element and `true`, if the specified *key* doesn't exist, otherwise {@link Pair} of iterator to the ordinary element and `false`.
		 */
		public abstract emplace(key: Key, value: T): Pair<MapIterator<Key, T, Source>, boolean>;

		/**
		 * Construct and insert element with hint.
		 * 
		 * @param hint Hint for the position where the element can be inserted.
		 * @param key Key of the new element.
		 * @param val Value of the new element.
		 * @return An iterator to the newly inserted element, if the specified key doesn't exist, otherwise an iterator to the ordinary element.
		 */
		public abstract emplace_hint(hint: MapIterator<Key, T, Source>, key: Key, val: T): MapIterator<Key, T, Source>;

		/**
		 * Insert an element.
		 * 
		 * @param pair A tuple to be referenced for the insert.
		 * @return {@link Pair} of an iterator to the newly inserted element and `true`, if the specified *key* doesn't exist, otherwise {@link Pair} of iterator to the ordinary element and `false`.
		 */
		public insert(pair: IPair<Key, T>): Pair<MapIterator<Key, T, Source>, boolean>;

		/**
		 * Insert an element with hint.
		 * 
		 * @param hint Hint for the position where the element can be inserted.
		 * @param pair A tuple to be referenced for the insert.
		 * @return An iterator to the newly inserted element, if the specified key doesn't exist, otherwise an iterator to the ordinary element.
		 */
		public insert(hint: MapIterator<Key, T, Source>, pair: IPair<Key, T>): MapIterator<Key, T, Source>;
		
		/**
		 * Insert range elements.
		 * 
		 * @param first Input iterator of the first position.
		 * @param last Input iteartor of the last position.
		 */
		public insert<L extends Key, U extends T, InputIterator extends Readonly<IForwardIterator<IPair<L, U>, InputIterator>>>
			(first: InputIterator, last: InputIterator): void

		public insert(...args: any[]): any
		{
			if (args.length === 1)
				return this.emplace(args[0].first, args[0].second);
			else
				return super.insert.apply(this, args);
		}

		/* ---------------------------------------------------------
			ASSIGNS
		--------------------------------------------------------- */
		/**
		 * Insert or assign an element.
		 * 
		 * @param key Key to be mapped or search for.
		 * @param value Value to insert or assign.
		 * @return {@link Pair} of an iterator to the newly inserted element and `true`, if the specified *key* doesn't exist, otherwise {@link Pair} of iterator to the ordinary element and `false`.
		 */
		public insert_or_assign(key: Key, value: T): Pair<MapIterator<Key, T, Source>, boolean>;
		
		/**
		 * Insert or assign an element with hint.
		 * 
		 * @param hint Hint for the position where the element can be inserted.
		 * @param key Key to be mapped or search for.
		 * @param value Value to insert or assign.
		 * @return {@link Pair} of an iterator to the newly inserted element and `true`, if the specified *key* doesn't exist, otherwise {@link Pair} of iterator to the ordinary element and `false`.
		 */
		public insert_or_assign(hint: MapIterator<Key, T, Source>, key: Key, value: T): MapIterator<Key, T, Source>;

		public insert_or_assign(...args: any[]): any
		{
			if (args.length === 2)
			{
				return this._Insert_or_assign_with_key_value(args[0], args[1]);
			}
			else if (args.length === 3)
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
			let ret = this.emplace(key, value);
			if (ret.second === false)
				ret.first.second = value;

			return ret;
		}

		/**
		 * @hidden
		 */
		private _Insert_or_assign_with_hint(hint: MapIterator<Key, T, Source>, key: Key, value: T): MapIterator<Key, T, Source>
		{
			let ret = this.emplace_hint(hint, key, value);
			if (ret.second !==value)
				ret.second = value;

			return ret;
		}

		/* ---------------------------------------------------------
			ERASE
		--------------------------------------------------------- */
		/**
		 * Extract an element by key.
		 * 
		 * @param key Key to search for.
		 * @return The extracted element.
		 */
		public extract(key: Key): Entry<Key, T>;
		
		/**
		 * Extract an element by iterator.
		 * 
		 * @param pos The iterator to the element for extraction.
		 * @return Iterator following the *pos*, strained by the extraction.
		 */
		public extract(pos: MapIterator<Key, T, Source>): MapIterator<Key, T, Source>;

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
			if (it.equals(this.end()) === true)
				throw new OutOfRange("No such key exists.");

			let ret: Entry<Key, T> = it.value;
			this._Erase_by_range(it);

			return ret;
		}

		/**
		 * @hidden
		 */
		private _Extract_by_iterator(it: MapIterator<Key, T, Source>): MapIterator<Key, T, Source>
		{
			if (it.equals(this.end()) === true)
				return this.end();

			this._Erase_by_range(it);
			return it;
		}

		/**
		 * @hidden
		 */
		protected _Erase_by_key(key: Key): number
		{
			let it = this.find(key);
			if (it.equals(this.end()) === true)
				return 0;

			this._Erase_by_range(it);
			return 1;
		}

		/* ---------------------------------------------------------
			UTILITY
		--------------------------------------------------------- */
		/**
		 * @inheritDoc
		 */
		public merge(source: Source): void
		{
			for (let it = source.begin(); !it.equals(source.end());)
				if (this.has(it.first) === false)
				{
					this.insert(it.value);
					it = source.erase(it);
				}
				else
					it = it.next();
		}
	}
}