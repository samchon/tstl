/// <reference path="../API.ts" />

/// <reference path="Container.ts" />
/// <reference path="../Iterator.ts" />

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
		/**
		 * Default Constructor.
		 */
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

		/**
		 * @inheritdoc
		 */
		public assign<U extends T, InputIterator extends Iterator<U>>
			(first: InputIterator, last: InputIterator): void
		{
			this.clear();
			this.insert(this.end(), first, last);
		}

		/**
		 * @inheritdoc
		 */
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
		/**
		 * @inheritdoc
		 */
		public begin(): BidirectionalIterator
		{
			return this.begin_;
		}

		/**
		 * @inheritdoc
		 */
		public end(): BidirectionalIterator
		{
			return this.end_;
		}

		/**
		 * @inheritdoc
		 */
		public size(): number
		{
			return this.size_;
		}

		/**
		 * @inheritdoc
		 */
		public front(): T
		{
			return this.begin_.value;
		}

		/**
		 * @inheritdoc
		 */
		public back(): T
		{
			return this.end_.prev().value;
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
		/**
		 * @inheritdoc
		 */
		public push_front(val: T): void
		{
			this.insert(this.begin_, val);
		}

		/**
		 * @inheritdoc
		 */
		public push_back(val: T): void
		{
			this.insert(this.end_, val);
		}

		/**
		 * @inheritdoc
		 */
		public pop_front(): void
		{
			this.erase(this.begin_);
		}

		/**
		 * @inheritdoc
		 */
		public pop_back(): void
		{
			this.erase(this.end_.prev() as BidirectionalIterator);
		}

		/* ---------------------------------------------------------
			INSERT
		--------------------------------------------------------- */
		/**
		 * @inheritdoc
		 */
		public push(...items: T[]): number 
		{
			if (items.length == 0)
				return this.size();

			// INSERT BY RANGE
			let first: _ArrayIterator<T> = new _ArrayIterator<T>(items, 0);
			let last: _ArrayIterator<T> = new _ArrayIterator<T>(items, items.length);

			this._Insert_by_range(this.end(), first, last);

			// RETURN SIZE
			return this.size();
		}

		/**
		 * Insert an element.
		 *
		 * The container is extended by inserting a new element before the element at the specified 
		 * <i>position</i>. This effectively increases the {@link List.size List size} by the amount of elements 
		 * inserted.
		 *
		 * Unlike other standard sequence containers, {@link List} is specifically designed to be efficient 
		 * inserting and removing elements in any position, even in the middle of the sequence.
		 *
		 * @param position Position in the container where the new element is inserted.
		 *				   {@link iterator}> is a member type, defined as a 
		 *				   {@link ListIterator bidirectional iterator} type that points to elements.
		 * @param val Value to be inserted as an element.
		 *
		 * @return An iterator that points to the newly inserted element; <i>val</i>.
		 */
		public insert(position: BidirectionalIterator, val: T): BidirectionalIterator;

		/**
		 * Insert elements by repeated filling. 
		 * 
		 * The container is extended by inserting a new element before the element at the specified
		 * <i>position</i>. This effectively increases the {@link List.size List size} by the amount of elements
		 * inserted.
		 *
		 * Unlike other standard sequence containers, {@link List} is specifically designed to be efficient
		 * inserting and removing elements in any position, even in the middle of the sequence.
		 *
		 * @param position Position in the container where the new elements are inserted. The {@link iterator} is a 
		 *				   member type, defined as a {@link ListIterator bidirectional iterator} type that points to 
		 *				   elements.
		 * @param size Number of elements to insert.
		 * @param val Value to be inserted as an element.
		 *
		 * @return An iterator that points to the first of the newly inserted elements.
		 */
		public insert(position: BidirectionalIterator, size: number, val: T): BidirectionalIterator;

		/**
		 * Insert elements by range iterators.
		 * 
		 * The container is extended by inserting a new element before the element at the specified
		 * <i>position</i>. This effectively increases the {@link List.size List size} by the amount of elements
		 * inserted.
		 *
		 * Unlike other standard sequence containers, {@link List} is specifically designed to be efficient
		 * inserting and removing elements in any position, even in the middle of the sequence.
		 * 
		 * @param position Position in the container where the new elements are inserted. The {@link iterator} is a 
		 *				   member type, defined as a {@link ListIterator bidirectional iterator} type that points to 
		 *				   elements.
		 * @param begin An iterator specifying range of the begining element.
		 * @param end An iterator specifying range of the ending element.
		 *
		 * @return An iterator that points to the first of the newly inserted elements.
		 */
		public insert<U extends T, InputIterator extends Iterator<U>>
			(position: BidirectionalIterator, begin: InputIterator, end: InputIterator): BidirectionalIterator;

		public insert(...args: any[]): BidirectionalIterator
		{
			let ret: BidirectionalIterator;

			// BRANCHES
			if (args.length == 2)
				ret = this._Insert_by_repeating_val(args[0], 1, args[1]);
			else if (args.length == 3 && typeof args[1] == "number")
				ret = this._Insert_by_repeating_val(args[0], args[1], args[2]);
			else
				ret = this._Insert_by_range(args[0], args[1], args[2]);
			
			// RETURNS
			return ret;
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
		protected _Insert_by_range<U extends T, InputIterator extends Iterator<U>>
			(position: BidirectionalIterator, begin: InputIterator, end: InputIterator): BidirectionalIterator
		{
			// INVALID ITERATOR
			if (this != position["source_"])
				throw new InvalidArgument("Parametric iterator is not this container's own.");

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
		/**
		 * Erase an element.
		 *
		 * Removes from the {@link List} either a single element; <i>position</i>.
		 *
		 * This effectively reduces the container size by the number of element removed.
		 *
		 * Unlike other standard sequence containers, {@link List} objects are specifically designed to be 
		 * efficient inserting and removing elements in any position, even in the middle of the sequence.
		 * 
		 * @param position Iterator pointing to a single element to be removed from the {@link List}.
		 *
		 * @return An iterator pointing to the element that followed the last element erased by the function call. 
		 *		   This is the {@link end end()} if the operation erased the last element in the sequence.
		 */
		public erase(position: BidirectionalIterator): BidirectionalIterator;
		
		/**
		 * Erase elements.
		 *
		 * Removes from the {@link List} container a range of elements.
		 *
		 * This effectively reduces the container {@link size} by the number of elements removed.
		 *
		 * Unlike other standard sequence containers, {@link List} objects are specifically designed to be 
		 * efficient inserting and removing elements in any position, even in the middle of the sequence.
		 *
		 * @param begin An iterator specifying a range of beginning to erase.
		 * @param end An iterator specifying a range of end to erase.
		 * 
		 * @return An iterator pointing to the element that followed the last element erased by the function call. 
		 *		   This is the {@link end end()} if the operation erased the last element in the sequence.
		 */
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
			// FIND PREV AND NEXT
			let prev: BidirectionalIterator = <BidirectionalIterator>first.prev();

			// CALCULATE THE SIZE
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
		/**
		 * Swap content.
		 * 
		 * Exchanges the content of the container by the content of <i>obj</i>, which is another 
		 * {@link List container} object with same type of elements. Sizes and container type may differ.
		 * 
		 * After the call to this member function, the elements in this container are those which were in <i>obj</i> 
		 * before the call, and the elements of <i>obj</i> are those which were in this. All iterators, references and 
		 * pointers remain valid for the swapped objects.
		 *
		 * Notice that a non-member function exists with the same name, {@link swap swap}, overloading that 
		 * algorithm with an optimization that behaves like this member function.
		 * 
		 * @param obj Another {@link List container} of the same type of elements (i.e., instantiated
		 *			  with the same template parameter, <b>T</b>) whose content is swapped with that of this 
		 *			  {@link List container}.
		 */
		public swap(obj: _ListContainer<T, BidirectionalIterator>): void

		/**
		 * @inheritdoc
		 */
		public swap(obj: Container<T>): void;

		public swap(obj: _ListContainer<T, BidirectionalIterator> | Container<T>): void
		{
			if (obj instanceof _ListContainer)
			{
				[this.begin_, obj.begin_] = [obj.begin_, this.begin_];
				[this.end_, obj.end_] = [obj.end_, this.end_];
				[this.size_, obj.size_] = [obj.size_, this.size_];
			}
			else
				super.swap(obj);
		}
	}
}

namespace std.base
{
	/**
	 * @hidden
	 */
	export abstract class _ListIteratorBase<T>
		extends Iterator<T>
	{
		/**
		 * @hidden
		 */
		protected prev_: _ListIteratorBase<T>;

		/**
		 * @hidden
		 */
		protected next_: _ListIteratorBase<T>;

		/**
		 * @hidden
		 */
		protected value_: T;

		/**
		 * Initializer Constructor.
		 * 
		 * @param source The source {@link Container} to reference.
		 * @param prev A refenrece of previous node ({@link ListIterator iterator}).
		 * @param next A refenrece of next node ({@link ListIterator iterator}).
		 * @param value Value to be stored in the node (iterator).
		 */
		protected constructor(source: Container<T>, prev: _ListIteratorBase<T>, next: _ListIteratorBase<T>, value: T)
		{
			super(source);

			this.prev_ = prev;
			this.next_ = next;
			this.value_ = value;
		}

		/* ---------------------------------------------------------------
			ACCESSORS
		--------------------------------------------------------------- */
		/**
		 * @inheritdoc
		 */
		public prev(): _ListIteratorBase<T>
		{
			return this.prev_;
		}

		/**
		 * @inheritdoc
		 */
		public next(): _ListIteratorBase<T>
		{
			return this.next_;
		}

		 /**
		  * @inheritdoc
		  */
		public advance(step: number): _ListIteratorBase<T>
		{
			let it: _ListIteratorBase<T> = this;
			
			if (step >= 0)
			{
				for (let i: number = 0; i < step; i++)
				{
					it = it.next();

					if (it.equals(this.source_.end() as _ListIteratorBase<T>))
						return it;
				}
			}
			else
			{
				for (let i: number = 0; i < step; i++)
				{
					it = it.prev();

					if (it.equals(this.source_.end() as _ListIteratorBase<T>))
						return it;
				}
			}
			
			return it;
		}

		/**
		 * @inheritdoc
		 */
		public get value(): T
		{
			return this.value_;
		}

		/* ---------------------------------------------------------------
			COMPARISON
		--------------------------------------------------------------- */
		/**
		 * @inheritdoc
		 */
		public equals(obj: _ListIteratorBase<T>): boolean
		{
			return this == obj;
		}

		/**
		 * @inheritdoc
		 */
		public swap(obj: _ListIteratorBase<T>): void
		{
			let source: _ListContainer<T, _ListIteratorBase<T>> = this.source_ as _ListContainer<T, _ListIteratorBase<T>>;
			let supp_prev: _ListIteratorBase<T> = this.prev_;
			let supp_next: _ListIteratorBase<T> = this.next_;

			this.prev_ = obj.prev_;
			this.next_ = obj.next_;
			obj.prev_ = supp_prev;
			obj.next_ = supp_next;

			if (source.end() == this)
				source["end_"] = obj;
			else if (source.end() == obj)
				source["end_"] = this;

			if (source.begin() == this)
				source["begin_"] = obj;
			else if (source.begin() == obj)
				source["begin_"] = this;
		}
	}
}