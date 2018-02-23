/// <reference path="../../API.ts" />

/// <reference path="Container.ts" />

namespace std.base
{
	/**
	 * @hidden
	 */
	export abstract class _ListContainer<T, 
			Source extends IContainer<T>,
			Iterator extends _IListIterator<T>,
			ReverseIterator extends IReverseIterator<T>>
		extends Container<T, Source, Iterator, ReverseIterator>
	{
		/**
		 * @hidden
		 */
		private begin_: Iterator;
		
		/**
		 * @hidden
		 */
		private end_: Iterator;
		
		/**
		 * @hidden
		 */
		private size_: number;

		/* ---------------------------------------------------------
			CONSTRUCTORS
		--------------------------------------------------------- */
		protected constructor()
		{
			super();

			// INIT MEMBERS
			this.end_ = this._Create_iterator(null, null, null);
			this.end_["prev_"] = this.end_;
			this.end_["next_"] = this.end_;

			this._Set_begin(this.end_);
			this.size_ = 0;
		}

		/**
		 * @hidden
		 */
		protected abstract _Create_iterator(prev: Iterator, next: Iterator, val: T): Iterator;

		/**
		 * @hidden
		 */
		protected _Set_begin(it: Iterator): void
		{
			this.begin_ = it;
		}

		public assign<U extends T, InputIterator extends IForwardIterator<U>>
			(first: InputIterator, last: InputIterator): void
		{
			this.clear();
			this.insert(this.end(), first, last);
		}

		public clear(): void
		{
			// DISCONNECT NODES
			this._Set_begin(this.end_);
			this.end_["prev_"] = (this.end_);
			this.end_["next_"] = (this.end_);

			// RE-SIZE -> 0
			this.size_ = 0;
		}

		/* ---------------------------------------------------------
			ACCESSORS
		--------------------------------------------------------- */
		public begin(): Iterator
		{
			return this.begin_;
		}

		public end(): Iterator
		{
			return this.end_;
		}

		public size(): number
		{
			return this.size_;
		}

		public front(): T;
		public front(val: T): void;

		public front(val: T = undefined): T | void
		{
			if (val == undefined)
				return this.begin_.value;
			else
				this.begin_["value_"] = val;
		}

		public back(): T;
		public back(val: T): void;

		public back(val: T = undefined): T | void
		{
			let it = this.end().prev();
			if (val == undefined)
				return it.value;
			else
				it["value_"] = val;
		}

		/* =========================================================
			ELEMENTS I/O
				- PUSH & POP
				- INSERT
				- ERASE
				- POST-PROCESS
		============================================================
					PUSH & POP
		--------------------------------------------------------- */
		public push_front(val: T): void
		{
			this.insert(this.begin_, val);
		}

		public push_back(val: T): void
		{
			this.insert(this.end_, val);
		}

		public pop_front(): void
		{
			this.erase(this.begin_);
		}

		public pop_back(): void
		{
			this.erase(this.end_.prev() as Iterator);
		}

		/* ---------------------------------------------------------
			INSERT
		--------------------------------------------------------- */
		public push(...items: T[]): number 
		{
			if (items.length == 0)
				return this.size();

			// INSERT BY RANGE
			let first: _NativeArrayIterator<T> = new _NativeArrayIterator<T>(items, 0);
			let last: _NativeArrayIterator<T> = new _NativeArrayIterator<T>(items, items.length);

			this._Insert_by_range(this.end(), first, last);

			// RETURN SIZE
			return this.size();
		}

		public insert(position: Iterator, val: T): Iterator;
		public insert(position: Iterator, size: number, val: T): Iterator;
		public insert<U extends T, InputIterator extends IForwardIterator<U>>
			(position: Iterator, begin: InputIterator, end: InputIterator): Iterator;

		public insert(pos: Iterator, ...args: any[]): Iterator
		{
			// VALIDATION
			if (pos.source() != this.end_.source())
				throw new InvalidArgument("Parametric iterator is not this container's own.");

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
		private _Insert_by_repeating_val(position: Iterator, n: number, val: T): Iterator
		{
			let first: base._Repeater<T> = new base._Repeater<T>(0, val);
			let last: base._Repeater<T> = new base._Repeater<T>(n);

			return this._Insert_by_range(position, first, last);
		}

		/**
		 * @hidden
		 */
		protected _Insert_by_range<U extends T, InputIterator extends IForwardIterator<U>>
			(position: Iterator, begin: InputIterator, end: InputIterator): Iterator
		{
			let prev: Iterator = <Iterator>position.prev();
			let first: Iterator = null;

			let size: number = 0;

			for (let it = begin; it.equals(end) == false; it = it.next() as InputIterator) 
			{
				// CONSTRUCT ITEM, THE NEW ELEMENT
				let item: Iterator = this._Create_iterator(prev, null, it.value);
				if (size == 0)
					first = item;

				// PLACE ITEM ON THE NEXT OF "PREV"
				prev["next_"] = item;

				// SHIFT CURRENT ITEM TO PREVIOUS
				prev = item;
				size++;
			}

			// WILL FIRST BE THE BEGIN?
			if (position.equals(this.begin()) == true)
				this._Set_begin(first);

			// CONNECT BETWEEN LAST AND POSITION
			prev["next_"] = position;
			position["prev_"] = prev;

			this.size_ += size;

			return first;
		}

		/* ---------------------------------------------------------
			ERASE
		--------------------------------------------------------- */
		public erase(position: Iterator): Iterator;
		public erase(begin: Iterator, end: Iterator): Iterator;

		public erase(first: Iterator, last: Iterator = first.next() as Iterator): Iterator
		{
			return this._Erase_by_range(first, last);
		}

		/**
		 * @hidden
		 */
		protected _Erase_by_range(first: Iterator, last: Iterator): Iterator
		{
			// VALIDATION
			if (first.source() != this.end_.source() || last.source() != this.end_.source())
				throw new InvalidArgument("Parametric iterator is not this container's own.");

			// FIND PREV AND NEXT
			let prev: Iterator = <Iterator>first.prev();
			let size: number = distance(first, last);

			// SHRINK
			prev["next_"] = (last);
			last["prev_"] = (prev);

			this.size_ -= size;
			if (first.equals(this.begin_))
				this._Set_begin(last);

			return last;
		}

		/* ---------------------------------------------------------
			SWAP
		--------------------------------------------------------- */
		public swap(obj: Source): void
		{
			[this.begin_, (obj as any).begin_] = [(obj as any).begin_, this.begin_];
			[this.end_, (obj as any).end_] = [(obj as any).end_, this.end_];
			[this.size_, (obj as any).size_] = [(obj as any).size_, this.size_];
		}
	}
}
