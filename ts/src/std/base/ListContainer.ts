/// <reference path="../API.ts" />

/// <reference path="Container.ts" />
/// <reference path="../Iterator.ts" />

namespace std.base
{
	/**
	 * An abstract list.
	 * 
	 * <p> {@link ListContainer}s are sequence containers that allow constant time insert and erase operations anywhere 
	 * within the sequence, and iteration in both directions. </p>
	 *
	 * <p> List containers are implemented as doubly-linked lists; Doubly linked lists can store each of the elements they
	 * contain in different and unrelated storage locations. The ordering is kept internally by the association to each
	 * element of a link to the element preceding it and a link to the element following it. </p>
	 *
	 * <p> Compared to other base standard sequence containers (array, vector and deque), lists perform generally better
	 * in inserting, extracting and moving elements in any position within the container for which an iterator has already
	 * been obtained, and therefore also in algorithms that make intensive use of these, like sorting algorithms. </p>
	 *
	 * <p> The main drawback of lists and forward_lists compared to these other sequence containers is that they lack
	 * direct access to the elements by their position; For example, to access the sixth element in a list, one has to
	 * iterate from a known position (like the beginning or the end) to that position, which takes linear time in the
	 * distance between these. They also consume some extra memory to keep the linking information associated to each
	 * element (which may be an important factor for large lists of small-sized elements). </p>
	 * 
	 * <h3> Container properties </h3>
	 * <dl>
	 * 	<dt> Sequence </dt>
	 * 	<dd> Elements in sequence containers are ordered in a strict linear sequence. Individual elements are accessed by
	 *		 their position in this sequence. </dd>
	 *
	 * 	<dt> Doubly-linked list </dt>
	 *	<dd> Each element keeps information on how to locate the next and the previous elements, allowing constant time
	 *		 insert and erase operations before or after a specific element (even of entire ranges), but no direct random
	 *		 access. </dd>
	 * </dl>
	 * 
	 * @param <T> Type of the elements.
	 *
	 * @reference http://www.cplusplus.com/reference/list/list/
	 * 
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export abstract class ListContainer<T, BidrectionalIterator extends ListIteratorBase<T>>
		extends Container<T>
		implements IDequeContainer<T>
	{
		/**
		 * @hidden
		 */
		private begin_: BidrectionalIterator;
		
		/**
		 * @hidden
		 */
		private end_: BidrectionalIterator;
		
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

			this.begin_ = this.end_;
			this.size_ = 0;
		}

		protected abstract _Create_iterator(prev: BidrectionalIterator, next: BidrectionalIterator, val: T): BidrectionalIterator;

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
			this.begin_ = this.end_;
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
		public begin(): BidrectionalIterator
		{
			return this.begin_;
		}

		/**
		 * @inheritdoc
		 */
		public end(): BidrectionalIterator
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
			this.erase(this.end_.prev() as BidrectionalIterator);
		}

		/* ---------------------------------------------------------
			INSERT
		--------------------------------------------------------- */
		/**
		 * @inheritdoc
		 */
		public push(...items: T[]): number 
		{
			let prev: BidrectionalIterator = this.end().prev() as BidrectionalIterator;
			let first: BidrectionalIterator = null;

			for (let i: number = 0; i < items.length; i++) 
			{
				// CONSTRUCT ITEM, THE NEW ELEMENT
				let item: BidrectionalIterator = this._Create_iterator(prev, null, items[i]);
				if (i == 0)
					first = item;

				prev["next_"] = (item);
				prev = item;
			}

			// IF WAS EMPTY, VAL IS THE BEGIN
			if (this.empty() == true || first.prev().equal_to(this.end()) == true)
				this.begin_ = first;

			// CONNECT BETWEEN LAST INSERTED ITEM AND POSITION
			prev["next_"] = (this.end_);
			this.end_["prev_"] = (prev);

			this.size_ += items.length;
			return this.size();
		}

		/**
		 * <p> Insert an element. </p>
		 *
		 * <p> The container is extended by inserting a new element before the element at the specified 
		 * <i>position</i>. This effectively increases the {@link List.size List size} by the amount of elements 
		 * inserted. </p>
		 *
		 * <p> Unlike other standard sequence containers, {@link List} is specifically designed to be efficient 
		 * inserting and removing elements in any position, even in the middle of the sequence. </p>
		 *
		 * @param position Position in the container where the new element is inserted.
		 *				   {@link iterator}> is a member type, defined as a 
		 *				   {@link ListIterator bidirectional iterator} type that points to elements.
		 * @param val Value to be inserted as an element.
		 *
		 * @return An iterator that points to the newly inserted element; <i>val</i>.
		 */
		public insert(position: BidrectionalIterator, val: T): BidrectionalIterator;

		/**
		 * <p> Insert elements by repeated filling. </p> 
		 * 
		 * <p> The container is extended by inserting a new element before the element at the specified
		 * <i>position</i>. This effectively increases the {@link List.size List size} by the amount of elements
		 * inserted. </p>
		 *
		 * <p> Unlike other standard sequence containers, {@link List} is specifically designed to be efficient
		 * inserting and removing elements in any position, even in the middle of the sequence. </p>
		 *
		 * @param position Position in the container where the new elements are inserted. The {@link iterator} is a 
		 *				   member type, defined as a {@link ListIterator bidirectional iterator} type that points to 
		 *				   elements.
		 * @param size Number of elements to insert.
		 * @param val Value to be inserted as an element.
		 *
		 * @return An iterator that points to the first of the newly inserted elements.
		 */
		public insert(position: BidrectionalIterator, size: number, val: T): BidrectionalIterator;

		/**
		 * <p> Insert elements by range iterators. </p>
		 * 
		 * <p> The container is extended by inserting a new element before the element at the specified
		 * <i>position</i>. This effectively increases the {@link List.size List size} by the amount of elements
		 * inserted. </p>
		 *
		 * <p> Unlike other standard sequence containers, {@link List} is specifically designed to be efficient
		 * inserting and removing elements in any position, even in the middle of the sequence. </p>
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
			(position: BidrectionalIterator, begin: InputIterator, end: InputIterator): BidrectionalIterator;

		public insert(...args: any[]): BidrectionalIterator
		{
			let ret: BidrectionalIterator;

			// BRANCHES
			if (args.length == 2)
				ret = this.insert_by_val(args[0], args[1]);
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
		private insert_by_val(position: BidrectionalIterator, val: T): BidrectionalIterator
		{
			// SHIFT TO INSERT OF THE REPEATING VAL
			return this._Insert_by_repeating_val(position, 1, val);
		}

		/**
		 * @hidden
		 */
		protected _Insert_by_repeating_val(position: BidrectionalIterator, size: number, val: T): BidrectionalIterator
		{
			// INVALID ITERATOR
			if (this != position["source_"])
				throw new InvalidArgument("Parametric iterator is not this container's own.");
			
			let prev: BidrectionalIterator = <BidrectionalIterator>position.prev();
			let first: BidrectionalIterator = null;

			for (let i: number = 0; i < size; i++) 
			{
				// CONSTRUCT ITEM, THE NEW ELEMENT
				let item: BidrectionalIterator = this._Create_iterator(prev, null, val);
				if (i == 0) 
					first = item;
				
				prev["next_"] = (item);
				
				// SHIFT ITEM LEFT TO BE PREV
				prev = item;
			}

			// IF WAS EMPTY, VAL IS THE BEGIN
			if (this.empty() == true || first.prev().equal_to(this.end()) == true)
				this.begin_ = first;

			// CONNECT BETWEEN LAST INSERTED ITEM AND POSITION
			prev["next_"] = (position);
			position["prev_"] = (prev);
			
			this.size_ += size;

			return first;
		}

		/**
		 * @hidden
		 */
		protected _Insert_by_range<U extends T, InputIterator extends Iterator<U>>
			(position: BidrectionalIterator, begin: InputIterator, end: InputIterator): BidrectionalIterator
		{
			// INVALID ITERATOR
			if (this != position["source_"])
				throw new InvalidArgument("Parametric iterator is not this container's own.");

			let prev: BidrectionalIterator = <BidrectionalIterator>position.prev();
			let first: BidrectionalIterator = null;

			let size: number = 0;

			for (let it = begin; it.equal_to(end) == false; it = it.next() as InputIterator) 
			{
				// CONSTRUCT ITEM, THE NEW ELEMENT
				let item: BidrectionalIterator = this._Create_iterator(prev, null, it.value);

				if (size == 0) first = item;
				if (prev != null) prev["next_"] = (item);

				// SHIFT CURRENT ITEM TO PREVIOUS
				prev = item;
				size++;
			}

			// IF WAS EMPTY, FIRST ELEMENT IS THE BEGIN
			if (this.empty() == true)
				this.begin_ = first;

			// CONNECT BETWEEN LAST AND POSITION
			prev["next_"] = (position);
			position["prev_"] = (prev);

			this.size_ += size;

			return first;
		}

		/* ---------------------------------------------------------
			ERASE
		--------------------------------------------------------- */
		/**
		 * <p> Erase an element. </p>
		 *
		 * <p> Removes from the {@link List} either a single element; <i>position</i>. </p>
		 *
		 * <p> This effectively reduces the container size by the number of element removed. </p>
		 *
		 * <p> Unlike other standard sequence containers, {@link List} objects are specifically designed to be 
		 * efficient inserting and removing elements in any position, even in the middle of the sequence. </p>
		 * 
		 * @param position Iterator pointing to a single element to be removed from the {@link List}.
		 *
		 * @return An iterator pointing to the element that followed the last element erased by the function call. 
		 *		   This is the {@link end end()} if the operation erased the last element in the sequence.
		 */
		public erase(position: BidrectionalIterator): BidrectionalIterator;
		
		/**
		 * <p> Erase elements. </p>
		 *
		 * <p> Removes from the {@link List} container a range of elements. </p>
		 *
		 * <p> This effectively reduces the container {@link size} by the number of elements removed. </p>
		 *
		 * <p> Unlike other standard sequence containers, {@link List} objects are specifically designed to be 
		 * efficient inserting and removing elements in any position, even in the middle of the sequence. </p>
		 *
		 * @param begin An iterator specifying a range of beginning to erase.
		 * @param end An iterator specifying a range of end to erase.
		 * 
		 * @return An iterator pointing to the element that followed the last element erased by the function call. 
		 *		   This is the {@link end end()} if the operation erased the last element in the sequence.
		 */
		public erase(begin: BidrectionalIterator, end: BidrectionalIterator): BidrectionalIterator;

		public erase(first: BidrectionalIterator, last: BidrectionalIterator = first.next() as BidrectionalIterator): BidrectionalIterator
		{
			return this._Erase_by_range(first, last);
		}

		/**
		 * @hidden
		 */
		protected _Erase_by_range(first: BidrectionalIterator, last: BidrectionalIterator): BidrectionalIterator
		{
			// FIND PREV AND NEXT
			let prev: BidrectionalIterator = <BidrectionalIterator>first.prev();

			// CALCULATE THE SIZE
			let size: number = distance(first, last);

			// SHRINK
			prev["next_"] = (last);
			last["prev_"] = (prev);

			this.size_ -= size;
			if (first == this.begin_)
				this.begin_ = last;

			return last;
		}

		/* ---------------------------------------------------------
			SWAP
		--------------------------------------------------------- */
		/**
		 * <p> Swap content. </p>
		 * 
		 * <p> Exchanges the content of the container by the content of <i>obj</i>, which is another 
		 * {@link List container} object with same type of elements. Sizes and container type may differ. </p>
		 * 
		 * <p> After the call to this member function, the elements in this container are those which were in <i>obj</i> 
		 * before the call, and the elements of <i>obj</i> are those which were in this. All iterators, references and 
		 * pointers remain valid for the swapped objects. </p>
		 *
		 * <p> Notice that a non-member function exists with the same name, {@link std.swap swap}, overloading that 
		 * algorithm with an optimization that behaves like this member function. </p>
		 * 
		 * @param obj Another {@link List container} of the same type of elements (i.e., instantiated
		 *			  with the same template parameter, <b>T</b>) whose content is swapped with that of this 
		 *			  {@link container List}.
		 */
		public swap(obj: ListContainer<T, BidrectionalIterator>): void

		/**
		 * @inheritdoc
		 */
		public swap(obj: base.IContainer<T>): void;

		public swap(obj: ListContainer<T, BidrectionalIterator> | base.IContainer<T>): void
		{
			if (obj instanceof ListContainer)
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
	 * An iterator, node of a List-based container.
	 * 
	 * <a href="http://samchon.github.io/typescript-stl/images/design/class_diagram/linear_containers.png" target="_blank"> 
	 *	<img src="http://samchon.github.io/typescript-stl/images/design/class_diagram/linear_containers.png" style="max-width: 100%" />
	 * </a>
	 * 
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export abstract class ListIteratorBase<T>
		extends Iterator<T>
	{
		/**
		 * @hidden
		 */
		private prev_: ListIteratorBase<T>;

		/**
		 * @hidden
		 */
		private next_: ListIteratorBase<T>;

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
		protected constructor(source: Container<T>, prev: ListIteratorBase<T>, next: ListIteratorBase<T>, value: T)
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
		public prev(): ListIteratorBase<T>
		{
			return this.prev_;
		}

		/**
		 * @inheritdoc
		 */
		public next(): ListIteratorBase<T>
		{
			return this.next_;
		}

		 /**
		  * @inheritdoc
		  */
		public advance(step: number): ListIteratorBase<T>
		{
			let it: ListIteratorBase<T> = this;
			
			if (step >= 0)
			{
				for (let i: number = 0; i < step; i++)
				{
					it = it.next();

					if (it.equal_to(this.source_.end() as ListIteratorBase<T>))
						return it;
				}
			}
			else
			{
				for (let i: number = 0; i < step; i++)
				{
					it = it.prev();

					if (it.equal_to(this.source_.end() as ListIteratorBase<T>))
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
		public equal_to(obj: ListIteratorBase<T>): boolean
		{
			return this == obj;
		}

		/**
		 * @inheritdoc
		 */
		public swap(obj: ListIteratorBase<T>): void
		{
			let source: ListContainer<T, ListIteratorBase<T>> = this.source_ as ListContainer<T, ListIteratorBase<T>>;
			let supp_prev: ListIteratorBase<T> = this.prev_;
			let supp_next: ListIteratorBase<T> = this.next_;

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