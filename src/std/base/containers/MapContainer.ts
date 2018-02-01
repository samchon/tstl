/// <reference path="../../API.ts" />

namespace std.base
{
	export abstract class MapContainer<Key, T, Source extends IMapContainer<Key, T>>
		extends Container<Entry<Key, T>>
	{
		/**
		 * @hidden
		 */
		private data_: _MapElementList<Key, T, Source>;

		/* ---------------------------------------------------------
			CONSTURCTORS
		--------------------------------------------------------- */
		protected constructor()
		{
			super();
			
			this.data_ = new _MapElementList<Key, T, Source>(this as any);
		}
		
		public assign<L extends Key, U extends T, InputIterator extends IForwardIterator<IPair<L, U>>>
			(first: InputIterator, last: InputIterator): void
		{
			// INSERT
			this.clear();
			this.insert(first, last);
		}

		public clear(): void
		{
			// TO BE ABSTRACT
			this.data_.clear();
		}

		/* =========================================================
			ACCESSORS
				- ITERATORS
				- ELEMENTS
		============================================================
			ITERATOR
		--------------------------------------------------------- */
		public abstract find(key: Key): MapIterator<Key, T, Source>;

		public begin(): MapIterator<Key, T, Source>
		{
			return this.data_.begin();
		}

		public end(): MapIterator<Key, T, Source>
		{
			return this.data_.end();
		}

		public rbegin(): MapReverseIterator<Key, T, Source>
		{
			return this.data_.rbegin();
		}

		public rend(): MapReverseIterator<Key, T, Source>
		{
			return this.data_.rend();
		}

		/* ---------------------------------------------------------
			ELEMENTS
		--------------------------------------------------------- */
		public has(key: Key): boolean
		{
			return !this.find(key).equals(this.end());
		}

		public abstract count(key: Key): number;

		public size(): number
		{
			return this.data_.size();
		}
		
		/* =========================================================
			ELEMENTS I/O
				- INSERT
				- ERASE
				- UTILITY
				- POST-PROCESS
		============================================================
			INSERT
		--------------------------------------------------------- */
		public push(...items: IPair<Key, T>[]): number
		{
			// INSERT BY RANGE
			let first = new _NativeArrayIterator(items, 0);
			let last = new _NativeArrayIterator(items, items.length);

			this.insert(first, last);

			// RETURN SIZE
			return this.size();
		}

		public emplace_hint(hint: MapIterator<Key, T, Source>, key: Key, val: T): MapIterator<Key, T, Source>;

		public emplace_hint(hint: MapReverseIterator<Key, T, Source>, key: Key, val: T): MapReverseIterator<Key, T, Source>;

		public emplace_hint(hint: MapIterator<Key, T, Source>, pair: IPair<Key, T>): MapIterator<Key, T, Source>;

		public emplace_hint(hint: MapReverseIterator<Key, T, Source>, pair: IPair<Key, T>): MapReverseIterator<Key, T, Source>;

		public emplace_hint(hint: any, ...args: any[]): any
		{
			if (args.length == 1)
				return this._Emplace_hint(hint, args[0].first, args[0].second);
			else
				return this._Emplace_hint(hint, args[0], args[1]);
		}

		public insert(hint: MapIterator<Key, T, Source>, pair: IPair<Key, T>): MapIterator<Key, T, Source>;

		public insert(hint: MapReverseIterator<Key, T, Source>, pair: IPair<Key, T>): MapReverseIterator<Key, T, Source>;
		
		public insert<L extends Key, U extends T, InputIterator extends IForwardIterator<IPair<L, U>>>
			(first: InputIterator, last: InputIterator): void;

		public insert(...args: any[]): any
		{
			if (args.length == 1)
			{
				return this._Emplace(args[0].first, args[0].second);
			}
			else if (args.length == 2 && args[0].next instanceof Function && args[1].next instanceof Function)
			{
				return this._Insert_by_range(args[0], args[1]);
			}
			else
			{
				let ret: MapIterator<Key, T, Source>;
				let is_reverse_iterator: boolean = false;

				// REVERSE_ITERATOR TO ITERATOR
				if (args[0] instanceof MapReverseIterator)
				{
					is_reverse_iterator = true;
					args[0] = (args[0] as MapReverseIterator<Key, T, Source>).base().prev();
				}

				// INSERT AN ELEMENT
				ret = this._Emplace_hint(args[0], args[1].first, args[1].second);

				// RETURN BRANCHES
				if (is_reverse_iterator == true)
					return new MapReverseIterator<Key, T, Source>(ret.next());
				else
					return ret;
			}
		}

		/**
		 * @hidden
		 */
		protected abstract _Emplace(key: Key, val: T): any;

		/**
		 * @hidden
		 */
		protected abstract _Emplace_hint(hint: MapIterator<Key, T, Source>, key: Key, val: T): MapIterator<Key, T, Source>;

		/**
		 * @hidden
		 */
		protected abstract _Insert_by_range<L extends Key, U extends T, InputIterator extends IForwardIterator<IPair<L, U>>>
			(first: InputIterator, last: InputIterator): void;

		/* ---------------------------------------------------------
			ERASE
		--------------------------------------------------------- */
		public erase(key: Key): number;
		
		public erase(it: MapIterator<Key, T, Source>): MapIterator<Key, T, Source>;
		
		public erase(begin: MapIterator<Key, T, Source>, end: MapIterator<Key, T, Source>): MapIterator<Key, T, Source>;

		public erase(it: MapReverseIterator<Key, T, Source>): MapReverseIterator<Key, T, Source>;

		public erase(begin: MapReverseIterator<Key, T, Source>, end: MapReverseIterator<Key, T, Source>): MapReverseIterator<Key, T, Source>;

		public erase(...args: any[]): any 
		{
			if (args.length == 1 && (args[0] instanceof Iterator == false || (args[0] as MapIterator<Key, T, Source>).source() as any != this))
				return this._Erase_by_key(args[0]);
			else
				if (args.length == 1)
					return this._Erase_by_iterator(args[0]);
				else
					return this._Erase_by_iterator(args[0], args[1]);
		}

		/**
		 * @hidden
		 */
		private _Erase_by_key(key: Key): number
		{
			let it = this.find(key);
			if (it.equals(this.end()) == true)
				return 0;

			this._Erase_by_iterator(it);
			return 1;
		}

		/**
		 * @hidden
		 */
		private _Erase_by_iterator(first: any, last: any = first.next()): any
		{
			let ret: MapIterator<Key, T, Source>;
			let is_reverse_iterator: boolean = false;

			// REVERSE ITERATOR TO ITERATOR
			if (first instanceof MapReverseIterator)
			{
				is_reverse_iterator = true;

				let first_it = (last as MapReverseIterator<Key, T, Source>).base();
				let last_it = (first as MapReverseIterator<Key, T, Source>).base();

				first = first_it;
				last = last_it;
			}

			// ERASE ELEMENTS
			ret = this._Erase_by_range(first, last);

			// RETURN BRANCHES
			if (is_reverse_iterator == true)
				return new MapReverseIterator<Key, T, Source>(ret.next());
			else
				return ret;
		}

		/**
		 * @hidden
		 */
		private _Erase_by_range(first: MapIterator<Key, T, Source>, last: MapIterator<Key, T, Source>): MapIterator<Key, T, Source>
		{
			// ERASE
			let it = this.data_.erase(first, last);
			
			// POST-PROCESS
			this._Handle_erase(first, last);

			return it; 
		}

		/* ---------------------------------------------------------
			UTILITY
		--------------------------------------------------------- */
		/**
		 * @hidden
		 */
		public swap(obj: MapContainer<Key, T, Source>): void
		{
			// CHANGE CONTENTS
			[this.data_, obj.data_] = [obj.data_, this.data_];

			// CHANGE ITERATORS' SOURCES
			[this.data_["associative_"], obj.data_["associative_"]] = [obj.data_["associative_"], this.data_["associative_"]];
		}

		public abstract merge(source: MapContainer<Key, T, Source>): void;

		/* ---------------------------------------------------------
			POST-PROCESS
		--------------------------------------------------------- */
		/**
		 * @hidden
		 */
		protected abstract _Handle_insert(first: MapIterator<Key, T, Source>, last: MapIterator<Key, T, Source>): void;

		/**
		 * @hidden
		 */
		protected abstract _Handle_erase(first: MapIterator<Key, T, Source>, last: MapIterator<Key, T, Source>): void;
	}
}
