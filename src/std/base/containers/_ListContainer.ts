/// <reference path="../../API.ts" />

/// <reference path="Container.ts" />

namespace std.base
{
	/**
	 * @hidden
	 */
	export abstract class _ListContainer<T, BidirectionalIterator extends _ListIteratorBase<T>>
		extends Container<T>
		implements IDequeContainer<T>
	{
		/**
		 * @hidden
		 */
		private begin_: BidirectionalIterator;
		
		/**
		 * @hidden
		 */
		private end_: BidirectionalIterator;
		
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
		protected abstract _Create_iterator(prev: BidirectionalIterator, next: BidirectionalIterator, val: T): BidirectionalIterator;

		/**
		 * @hidden
		 */
		protected _Set_begin(it: BidirectionalIterator): void
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
		public begin(): BidirectionalIterator
		{
			return this.begin_;
		}

		public end(): BidirectionalIterator
		{
			return this.end_;
		}

		public size(): number
		{
			return this.size_;
		}

		public front(): T;

		public front(val: T): void;

		public front(val: T = null): T | void
		{
			if (val == null)
				return this.begin_.value;
			else
				this.begin_["value_"] = val;
		}

		public back(): T;

		public back(val: T): void;

		public back(val: T = null): T | void
		{
			let it: _ListIteratorBase<T> = this.end().prev();
			if (val == null)
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
			this.erase(this.end_.prev() as BidirectionalIterator);
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

		public insert(position: BidirectionalIterator, val: T): BidirectionalIterator;
		public insert(position: BidirectionalIterator, size: number, val: T): BidirectionalIterator;
		public insert<U extends T, InputIterator extends IForwardIterator<U>>
			(position: BidirectionalIterator, begin: InputIterator, end: InputIterator): BidirectionalIterator;

		public insert(pos: BidirectionalIterator, ...args: any[]): BidirectionalIterator
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
		private _Insert_by_repeating_val(position: BidirectionalIterator, n: number, val: T): BidirectionalIterator
		{
			let first: base._Repeater<T> = new base._Repeater<T>(0, val);
			let last: base._Repeater<T> = new base._Repeater<T>(n);

			return this._Insert_by_range(position, first, last);
		}

		/**
		 * @hidden
		 */
		protected _Insert_by_range<U extends T, InputIterator extends IForwardIterator<U>>
			(position: BidirectionalIterator, begin: InputIterator, end: InputIterator): BidirectionalIterator
		{
			let prev: BidirectionalIterator = <BidirectionalIterator>position.prev();
			let first: BidirectionalIterator = null;

			let size: number = 0;

			for (let it = begin; it.equals(end) == false; it = it.next() as InputIterator) 
			{
				// CONSTRUCT ITEM, THE NEW ELEMENT
				let item: BidirectionalIterator = this._Create_iterator(prev, null, it.value);
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
		public erase(position: BidirectionalIterator): BidirectionalIterator;
		public erase(begin: BidirectionalIterator, end: BidirectionalIterator): BidirectionalIterator;

		public erase(first: BidirectionalIterator, last: BidirectionalIterator = first.next() as BidirectionalIterator): BidirectionalIterator
		{
			return this._Erase_by_range(first, last);
		}

		/**
		 * @hidden
		 */
		protected _Erase_by_range(first: BidirectionalIterator, last: BidirectionalIterator): BidirectionalIterator
		{
			// VALIDATION
			if (first.source() != this.end_.source() || last.source() != this.end_.source())
				throw new InvalidArgument("Parametric iterator is not this container's own.");

			// FIND PREV AND NEXT
			let prev: BidirectionalIterator = <BidirectionalIterator>first.prev();
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
		public swap(obj: _ListContainer<T, BidirectionalIterator>): void
		{
			[this.begin_, obj.begin_] = [obj.begin_, this.begin_];
			[this.end_, obj.end_] = [obj.end_, this.end_];
			[this.size_, obj.size_] = [obj.size_, this.size_];
		}
	}
}
