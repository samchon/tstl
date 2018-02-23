/// <reference path="../../API.ts" />

/// <reference path="_ListContainer.ts" />

namespace std.base
{
	export abstract class SetContainer<T, Source extends ISetContainer<T>>
		extends Container<T>
	{
		/**
		 * @hidden
		 */
		private data_: _SetElementList<T, Source>;
		
		/* ---------------------------------------------------------
			CONSTURCTORS
		--------------------------------------------------------- */
		protected constructor()
		{
			super();

			this.data_ = new _SetElementList<T, Source>(this as any);
		}

		public assign<U extends T, InputIterator extends IForwardIterator<U>>
			(begin: InputIterator, end: InputIterator): void
		{
			// INSERT
			this.clear();
			this.insert(begin, end);
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
		public abstract find(val: T): SetIterator<T, Source>;

		public begin(): SetIterator<T, Source>
		{
			return this.data_.begin();
		}

		public end(): SetIterator<T, Source>
		{
			return this.data_.end();
		}

		public rbegin(): SetReverseIterator<T, Source>
		{
			return this.data_.rbegin();
		}

		public rend(): SetReverseIterator<T, Source>
		{
			return this.data_.rend();
		}

		/* ---------------------------------------------------------
			ELEMENTS
		--------------------------------------------------------- */
		public has(val: T): boolean
		{
			return !this.find(val).equals(this.end());
		}

		public abstract count(val: T): number;

		public size(): number
		{
			return this.data_.size();
		}

		///**
		// * @hidden
		// */
		//protected _Get_data(): List<T>
		//{
		//	return this.data_;
		//}

		/* =========================================================
			ELEMENTS I/O
				- INSERT
				- ERASE
				- UTILITY
				- POST-PROCESS
		============================================================
			INSERT
		--------------------------------------------------------- */
		public push(...items: T[]): number
		{
			if (items.length == 0)
				return this.size();

			// INSERT BY RANGE
			let first: _NativeArrayIterator<T> = new _NativeArrayIterator<T>(items, 0);
			let last: _NativeArrayIterator<T> = new _NativeArrayIterator<T>(items, items.length);

			this._Insert_by_range(first, last);

			// RETURN SIZE
			return this.size();
		}
		
		public insert(hint: SetIterator<T, Source>, val: T): SetIterator<T, Source>;
		public insert<U extends T, InputIterator extends IForwardIterator<U>>
			(begin: InputIterator, end: InputIterator): void;

		public insert(...args: any[]): any
		{
			if (args.length == 1)
				return this._Insert_by_val(args[0]);
			else if (args.length == 2)
			{
				if (args[0].next instanceof Function && args[1].next instanceof Function)
				{
					// IT DOESN'T CONTAIN POSITION
					// RANGES TO INSERT ONLY
					return this._Insert_by_range(args[0], args[1]);
				}
				else
				{
					// INSERT AN ELEMENT
					return this._Insert_by_hint(args[0], args[1]);
				}
			}
		}

		/**
		 * @hidden
		 */
		protected abstract _Insert_by_val(val: T): any;
		
		/**
		 * @hidden
		 */
		protected abstract _Insert_by_hint(hint: SetIterator<T, Source>, val: T): SetIterator<T, Source>;
		
		/**
		 * @hidden
		 */
		protected abstract _Insert_by_range<U extends T, InputIterator extends IForwardIterator<U>>
			(begin: InputIterator, end: InputIterator): void;

		/* ---------------------------------------------------------
			ERASE
		--------------------------------------------------------- */
		public erase(val: T): number;
		public erase(it: SetIterator<T, Source>): SetIterator<T, Source>;
		public erase(begin: SetIterator<T, Source>, end: SetIterator<T, Source>): SetIterator<T, Source>;

		public erase(...args: any[]): any
		{
			if (args.length == 1 && !(args[0] instanceof SetIterator && (args[0] as SetIterator<T, Source>).source() as any == this))
				return this._Erase_by_val(args[0]);
			else if (args.length == 1)
				return this._Erase_by_range(args[0]);
			else
				return this._Erase_by_range(args[0], args[1]);
		}

		/**
		 * @hidden
		 */
		private _Erase_by_val(val: T): number
		{
			// TEST WHETHER EXISTS
			let it = this.find(val);
			if (it.equals(this.end()) == true)
				return 0;

			// ERASE
			this._Erase_by_range(it);
			return 1;
		}

		/**
		 * @hidden
		 */
		private _Erase_by_range(first: SetIterator<T, Source>, last: SetIterator<T, Source> = first.next()): SetIterator<T, Source>
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
		public swap(obj: SetContainer<T, Source>): void
		{
			// CHANGE CONTENTS
			[this.data_, obj.data_] = [obj.data_, this.data_];

			// CHANGE ITERATORS' SOURCES
			[this.data_["associative_"], obj.data_["associative_"]] = [obj.data_["associative_"], this.data_["associative_"]];
		}

		public abstract merge(source: SetContainer<T, Source>): void;

		/* ---------------------------------------------------------
			POST-PROCESS
		--------------------------------------------------------- */
		/**
		 * @hidden
		 */
		protected abstract _Handle_insert(first: SetIterator<T, Source>, last: SetIterator<T, Source>): void;

		/**
		 * @hidden
		 */
		protected abstract _Handle_erase(first: SetIterator<T, Source>, last: SetIterator<T, Source>): void;
	}
}
