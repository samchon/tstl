/// <reference path="API.ts" />

/// <reference path="base/Container.ts" />
/// <reference path="base/Iterator.ts" />
/// <reference path="base/ReverseIterator.ts" />

namespace std
{
	/**
	 * <p> Doubly linked list. </p>
	 *
	 * <p> {@link List}s are sequence containers that allow constant time insert and erase operations anywhere within the 
	 * sequence, and iteration in both directions. </p>
	 *
	 * <p> List containers are implemented as doubly-linked lists; Doubly linked lists can store each of the elements they 
	 * contain in different and unrelated storage locations. The ordering is kept internally by the association to each 
	 * element of a link to the element preceding it and a link to the element following it. </p>
	 *
	 * <p> They are very similar to forward_list: The main difference being that forward_list objects are single-linked 
	 * lists, and thus they can only be iterated forwards, in exchange for being somewhat smaller and more efficient. </p>
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
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export class List<T>
		extends base.Container<T>
		implements base.IDeque<T>
	{
		/**
		 * An iterator of beginning.
		 */
		protected begin_: ListIterator<T>;

		/**
		 * An iterator of end. 
		 */
		protected end_: ListIterator<T>;

		/**
		 * Number of elements in the {@link List}.
		 */
		protected size_: number;

		/* =========================================================
			CONSTRUCTORS & SEMI-CONSTRUCTORS
				- CONSTRUCTORS
				- ASSIGN & CLEAR
		============================================================
			CONSTURCTORS
		--------------------------------------------------------- */
		/**
		 * <p> Default Constructor. </p>
		 *
		 * <p> Constructs an empty container, with no elements. </p>
		 */
		public constructor();

		/**
		 * <p> Initializer list Constructor. </p>
		 *
		 * <p> Constructs a container with a copy of each of the elements in <i>array</i>, in the same order. </p>
		 *
		 * @param array An array containing elements to be copied and contained.
		 */
		public constructor(items: Array<T>);

		/**
		 * <p> Fill Constructor. </p>
		 *
		 * <p> Constructs a container with <i>n</i> elements. Each element is a copy of <i>val</i> (if provided). </p>
		 *
		 * @param n Initial container size (i.e., the number of elements in the container at construction).
		 * @param val Value to fill the container with. Each of the <i>n</i> elements in the container is 
		 *			  initialized to a copy of this value.
		 */
		public constructor(size: number, val: T);

		/**
		 * <p> Copy Constructor. </p>
		 *
		 * <p> Constructs a container with a copy of each of the elements in <i>container</i>, in the same order. </p>
		 *
		 * @param container Another container object of the same type (with the same class template 
		 *					arguments <i>T</i>), whose contents are either copied or acquired.
		 */
		public constructor(container: base.IContainer<T>);

		/**
		 * <p> Range Constructor. </p>
		 *
		 * <p> Constructs a container with as many elements as the range (<i>begin</i>, <i>end<i>), with each 
		 * element emplace-constructed from its corresponding element in that range, in the same order. </p>
		 *
		 * @param begin Input interator of the initial position in a sequence.
		 * @param end Input interator of the final position in a sequence.
		 */
		public constructor(begin: base.Iterator<T>, end: base.Iterator<T>);

		public constructor(...args: any[])
		{
			super();

			if (args.length == 0) 
			{
				this.clear();
			}
			else if (args.length == 1 && args[0] instanceof Array) 
			{
				let array: Array<T> = args[0];

				this.clear();
				this.push(...array);
			}
			else if (args.length == 1 && (args[0] instanceof Vector || args[0] instanceof base.Container)) 
			{
				let container: base.IContainer<T> = args[0];

				this.assign(container.begin(), container.end());
			}
			else if (args.length == 2 && args[0] instanceof base.Iterator && args[1] instanceof base.Iterator) 
			{
				let begin: base.Iterator<T> = args[0];
				let end: base.Iterator<T> = args[1];

				this.assign(begin, end);
			}
			else if (args.length == 2 && typeof args[0] == "number")
			{
				let size: number = args[0];
				let val: T = <T>args[1];

				this.assign(size, val);
			}
		}

		/* ---------------------------------------------------------
			ASSIGN & CLEAR
		--------------------------------------------------------- */
		/**
		 * @inheritdoc
		 */
		public assign(n: number, val: T): void;

		/**
		 * @inheritdoc
		 */
		public assign<U extends T, InputIterator extends base.Iterator<U>>
			(begin: InputIterator, end: InputIterator): void;

		public assign<U extends T, InputIterator extends base.Iterator<U>>
			(par1: any, par2: any): void
		{
			this.clear();
			this.insert(this.end(), par1, par2);
		}

		/**
		 * @inheritdoc
		 */
		public clear(): void
		{
			if (this.empty() == true)
				return;

			let it = new ListIterator(this, null, null, null);
			it.setPrev(it);
			it.setNext(it);

			let prev_begin = this.begin_;
			let prev_end = this.end_;

			this.begin_ = it;
			this.end_ = it;
			this.size_ = 0;

			this.handle_erase(prev_begin, prev_end);
		}
		
		/* =========================================================
			ACCESSORS
		========================================================= */
		/**
		 * @inheritdoc
		 */
		public begin(): ListIterator<T>
		{
			return this.begin_;
		}

		/**
		 * @inheritdoc
		 */
		public end(): ListIterator<T>
		{
			return this.end_;
		}

		/**
		 * @inheritdoc
		 */
		public rbegin(): ListReverseIterator<T>
		{
			if (this.empty() == true)
				return this.rend();
			else
				return new ListReverseIterator<T>(this.end().prev());
		}

		/**
		 * @inheritdoc
		 */
		public rend(): ListReverseIterator<T>
		{
			return new ListReverseIterator<T>(this.end());
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
		public push<U extends T>(...items: U[]): number 
		{
			let prev: ListIterator<T> = this.end().prev();
			let first: ListIterator<T> = null;

			for (let i: number = 0; i < items.length; i++) 
			{
				// CONSTRUCT ITEM, THE NEW ELEMENT
				let item: ListIterator<T> = new ListIterator(this, prev, null, items[i]);
				if (i == 0)
					first = item;

				prev.setNext(item);
				prev = item;
			}

			// IF WAS EMPTY, VAL IS THE BEGIN
			if (this.empty() == true || first.prev().equal_to(this.end()) == true)
				this.begin_ = first;

			// CONNECT BETWEEN LAST INSERTED ITEM AND POSITION
			prev.setNext(this.end_);
			this.end_.setPrev(prev);

			this.size_ += items.length;
			return this.size();
		}
		
		/**
		 * @inheritdoc
		 */
		public push_front(val: T): void
		{
			this.insert(this.begin(), val);
		}

		/**
		 * @inheritdoc
		 */
		public push_back(val: T): void
		{
			this.insert(this.end(), val);
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
			this.erase(this.end_.prev());
		}
		
		/* ---------------------------------------------------------
			INSERT
		--------------------------------------------------------- */
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
		public insert(position: ListIterator<T>, val: T): ListIterator<T>;

		/**
		 * <p> Insert elements by repeated filling. </p> 
		 *
		 * @param position Position in the container where the new elements are inserted. The {@link iterator} is a 
		 *				   member type, defined as a {@link ListIterator bidirectional iterator} type that points to 
		 *				   elements.
		 * @param size Number of elements to insert.
		 * @param val Value to be inserted as an element.
		 *
		 * @return An iterator that points to the first of the newly inserted elements.
		 */
		public insert(position: ListIterator<T>, size: number, val: T): ListIterator<T>;

		/**
		 * 
		 * @param position Position in the container where the new elements are inserted. The {@link iterator} is a 
		 *				   member type, defined as a {@link ListIterator bidirectional iterator} type that points to 
		 *				   elements.
		 * @param begin An iterator specifying range of the begining element.
		 * @param end An iterator specifying range of the ending element.
		 *
		 * @return An iterator that points to the first of the newly inserted elements.
		 */
		public insert<U extends T, InputIterator extends base.Iterator<U>>
			(position: ListIterator<T>, begin: InputIterator, end: InputIterator): ListIterator<T>;

		public insert(...args: any[]): ListIterator<T>
		{
			if (args.length == 2)
				return this.insert_by_val(args[0], args[1]);
			else if (args.length == 3 && typeof args[1] == "number")
			{
				return this.insert_by_repeating_val(args[0], args[1], args[2]);
			}
			else
				return this.insert_by_range(args[0], args[1], args[2]);
		}

		/**
		 * @hidden
		 */
		private insert_by_val(position: ListIterator<T>, val: T): ListIterator<T>
		{
			// SHIFT TO INSERT OF THE REPEATING VAL
			return this.insert_by_repeating_val(position, 1, val);
		}

		/**
		 * @hidden
		 */
		private insert_by_repeating_val(position: ListIterator<T>, size: number, val: T): ListIterator<T>
		{
			if (this != position.get_source())
				throw new InvalidArgument("Parametric iterator is not this container's own.");
			
			let prev: ListIterator<T> = <ListIterator<T>>position.prev();
			let first: ListIterator<T> = null;

			for (let i: number = 0; i < size; i++) 
			{
				// CONSTRUCT ITEM, THE NEW ELEMENT
				let item: ListIterator<T> = new ListIterator(this, prev, null, val);
				if (i == 0) 
					first = item;
				
				prev.setNext(item);
				
				// SHIFT ITEM LEFT TO BE PREV
				prev = item;
			}

			// IF WAS EMPTY, VAL IS THE BEGIN
			if (this.empty() == true || first.prev().equal_to(this.end()) == true)
				this.begin_ = first;

			// CONNECT BETWEEN LAST INSERTED ITEM AND POSITION
			prev.setNext(position);
			position.setPrev(prev);
			
			this.size_ += size;
			
			// POST-PROCESS
			this.handle_insert(first, position);

			return first;
		}

		/**
		 * @hidden
		 */
		private insert_by_range<U extends T, InputIterator extends base.Iterator<U>>
			(position: ListIterator<T>, begin: InputIterator, end: InputIterator): ListIterator<T>
		{
			if (this != position.get_source())
				throw new InvalidArgument("Parametric iterator is not this container's own.");

			let prev: ListIterator<T> = <ListIterator<T>>position.prev();
			let first: ListIterator<T> = null;

			let size: number = 0;

			for (let it = begin; it.equal_to(end) == false; it = it.next() as InputIterator) 
			{
				// CONSTRUCT ITEM, THE NEW ELEMENT
				let item: ListIterator<T> = new ListIterator(this, prev, null, it.value);

				if (size == 0) first = item;
				if (prev != null) prev.setNext(item);

				// SHIFT CURRENT ITEM TO PREVIOUS
				prev = item;
				size++;
			}

			// IF WAS EMPTY, FIRST ELEMENT IS THE BEGIN
			if (this.empty() == true)
				this.begin_ = first;

			// CONNECT BETWEEN LAST AND POSITION
			prev.setNext(position);
			position.setPrev(prev);

			this.size_ += size;

			// POST-PROCESS
			this.handle_insert(first, position);

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
		public erase(position: ListIterator<T>): ListIterator<T>;
		
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
		public erase(begin: ListIterator<T>, end: ListIterator<T>): ListIterator<T>;

		public erase(...args: any[]): ListIterator<T>
		{
			if (args.length == 1)
				return this.erase_by_iterator(args[0]);
			else if (args.length == 2)
				return this.erase_by_range(args[0], args[1]);
		}

		/**
		 * @hidden
		 */
		private erase_by_iterator(it: ListIterator<T>): ListIterator<T>
		{
			if (it.equal_to(this.end_))
				throw new LogicError("Unable to erase end iterator.");

			return this.erase_by_range(it, it.next());
		}

		/**
		 * @hidden
		 */
		private erase_by_range(first: ListIterator<T>, last: ListIterator<T>): ListIterator<T>
		{
			// FIND PREV AND NEXT
			let prev: ListIterator<T> = <ListIterator<T>>first.prev();

			// CALCULATE THE SIZE
			let size: number = 0;

			for (let it = first; it.equal_to(last) == false; it = it.next())
				size++;

			// SHRINK
			prev.setNext(last);
			last.setPrev(prev);

			this.size_ -= size;
			if (this.size_ == 0)
				this.begin_ = last;

			// POST-PROCESS
			this.handle_erase(first, last);

			return last;
		}

		/* ---------------------------------------------------------------
			POST-PROCESS
		--------------------------------------------------------------- */
		protected handle_insert(first: ListIterator<T>, last: ListIterator<T>): void
		{
			// NOTHING TO DO ESPECIALLY
			// IF YOU WANT TO SPECIFY, EXTENDS AND OVERRIDES THIS
		}

		protected handle_erase(first: ListIterator<T>, last: ListIterator<T>): void
		{
			// NOTHING TO DO ESPECIALLY
			// IF YOU WANT TO SPECIFY, EXTENDS AND OVERRIDES THIS
		}

		/* ===============================================================
			ALGORITHMS
				- UNIQUE & REMOVE (IF)
				- MERGE & SPLICE
				- SORT
				- SWAP
		==================================================================
			UNIQUE & REMOVE (IF)
		--------------------------------------------------------------- */
		/**
		 * <p> Remove duplicate values. </p>
		 *
		 * <p> Removes all but the first element from every consecutive group of equal elements in the  </p>
		 *
		 * <p> Notice that an element is only removed from the {@link List} container if it compares equal to the 
		 * element immediately preceding it. Thus, this function is especially useful for sorted lists. </p>
		 */
		public unique(): void;

		/**
		 * <p> Remove duplicate values. </p>
		 * 
		 * <p> Removes all but the first element from every consecutive group of equal elements in the  </p>
		 * 
		 * <p> The argument <i>binary_pred</i> is a specific comparison function that determine the <u>uniqueness</u> 
		 * of an element. In fact, any behavior can be implemented (and not only an equality comparison), but notice 
		 * that the function will call <code>binary_pred(it.value, it.prev().value)</code> for all pairs of elements 
		 * (where <code>it</code> is an iterator to an element, starting from the second) and remove <code>it</code> 
		 * from the {@link List} if the predicate returns <code>true</code>.
		 *
		 * <p> Notice that an element is only removed from the {@link List} container if it compares equal to the 
		 * element immediately preceding it. Thus, this function is especially useful for sorted lists. </p>
		 * 
		 * @param binary_pred Binary predicate that, taking two values of the same type than those contained in the 
		 *					  {@link List}, returns <code>true</code> to remove the element passed as first argument 
		 *					  from the container, and <code>false</code> otherwise. This shall be a function pointer 
		 *					  or a function object.
		 */
		public unique(binary_pred: (left: T, right: T) => boolean): void;

		public unique(binary_pred: (left: T, right: T) => boolean = std.equal_to): void
		{
			let it = this.begin().next();

			while (!it.equal_to(this.end()))
			{
				if (std.equal_to(it.value, it.prev().value) == true)
					it = this.erase(it);
				else
					it = it.next();
			}
		}

		/**
		 * <p> Remove elements with specific value. </p>
		 * 
		 * <p> Removes from the container all the elements that compare equal to <i>val</i>. This calls the 
		 * destructor of these objects and reduces the container {@link size} by the number of elements removed. </p>
		 * 
		 * <p> Unlike member function {@link List.erase}, which erases elements by their position (using an 
		 * iterator), this function ({@link List.remove}) removes elements by their value. </p>
		 * 
		 * <p> A similar function, {@link List.remove_if}, exists, which allows for a condition other than an 
		 * equality comparison to determine whether an element is removed. </p>
		 *
		 * @param val Value of the elements to be removed.
		 */
		public remove(val: T): void
		{
			let it = this.begin();

			while (!it.equal_to(this.end()))
			{
				if (std.equal_to(it.value, val) == true)
					it = this.erase(it);
				else
					it = it.next();
			}
		}

		/**
		 * <p> Remove elements fulfilling condition. </p>
		 * 
		 * <p> Removes from the container all the elements for which <i>pred</i> returns <code>true</code>. This 
		 * calls the destructor of these objects and reduces the container {@link size} by the number of elements 
		 * removed. </p>
		 * 
		 * <p> The function calls <code>pred(it.value)</code> for each element (where <code>it</code> is an iterator 
		 * to that element). Any of the elements in the list for which this returns <code>true</code>, are removed 
		 * from the  </p>
		 * 
		 * @param pred Unary predicate that, taking a value of the same type as those contained in the forward_list 
		 *			   object, returns <code>true</code> for those values to be removed from the container, and 
		 *			   <code>false</code> for those remaining. This can either be a function pointer or a function 
		 *			   object.
		 */
		public remove_if(pred: (val: T) => boolean): void
		{
			let it = this.begin();

			while (!it.equal_to(this.end()))
			{
				if (pred(it.value) == true)
					it = this.erase(it);
				else
					it = it.next();
			}
		}

		/* ---------------------------------------------------------
			MERGE & SPLICE
		--------------------------------------------------------- */
		/**
		 * <p> Merge sorted {@link List Lists}. </p>
		 *
		 * <p> Merges <i>obj</i> into the {@link List} by transferring all of its elements at their respective 
		 * ordered positions into the container (<font color='red'>both containers shall already be ordered</font>). 
		 * </p>
		 * 
		 * <p> This effectively removes all the elements in <i>obj</i> (which becomes {@link empty}), and inserts 
		 * them into their ordered position within container (which expands in {@link size} by the number of elements 
		 * transferred). The operation is performed without constructing nor destroying any element: they are 
		 * transferred, no matter whether <i>obj</i> is an lvalue or an rvalue, or whether the value_type supports 
		 * move-construction or not. </p>
		 * 
		 * <p> This function requires that the {@link List} containers have their elements already ordered by value 
		 * ({@link less}) before the call. For an alternative on unordered {@link List Lists}, see 
		 * {@link List.splice}. </p>
		 * 
		 * <p> Assuming such ordering, each element of <i>obj</i> is inserted at the position that corresponds to its 
		 * value according to the strict weak ordering defined by {@link less}. The resulting order of equivalent 
		 * elements is stable (i.e., equivalent elements preserve the relative order they had before the call, and 
		 * existing elements precede those equivalent inserted from <i>obj</i>). </p>
		 * 
		 * The function does nothing if <code>this == obj</code>.
		 * 
		 * @param obj A {@link List} object of the same type (i.e., with the same template parameters, <b>T</b>).
		 * 			  Note that this function modifies <i>obj</i> no matter whether an lvalue or rvalue reference is 
		 *			  passed.
		 */
		public merge<U extends T>(obj: List<U>): void;

		/**
		 * <p> Merge sorted {@link List Lists}. </p>
		 *
		 * <p> Merges <i>obj</i> into the {@link List} by transferring all of its elements at their respective 
		 * ordered positions into the container (<font color='red'>both containers shall already be ordered</font>). 
		 * </p>
		 * 
		 * <p> This effectively removes all the elements in <i>obj</i> (which becomes {@link empty}), and inserts 
		 * them into their ordered position within container (which expands in {@link size} by the number of elements 
		 * transferred). The operation is performed without constructing nor destroying any element: they are 
		 * transferred, no matter whether <i>obj</i> is an lvalue or an rvalue, or whether the value_type supports 
		 * move-construction or not. </p>
		 *
		 * <p> The argument <i>compare</i> is a specific predicate to perform the comparison operation between 
		 * elements. This comparison shall produce a strict weak ordering of the elements (i.e., a consistent 
		 * transitive comparison, without considering its reflexiveness).
		 * 
		 * <p> This function requires that the {@link List} containers have their elements already ordered by 
		 * <i>compare</i> before the call. For an alternative on unordered {@link List Lists}, see 
		 * {@link List.splice}. </p>
		 * 
		 * <p> Assuming such ordering, each element of <i>obj</i> is inserted at the position that corresponds to its 
		 * value according to the strict weak ordering defined by <i>compare</i>. The resulting order of equivalent 
		 * elements is stable (i.e., equivalent elements preserve the relative order they had before the call, and 
		 * existing elements precede those equivalent inserted from <i>obj</i>). </p>
		 * 
		 * The function does nothing if <code>this == obj</code>.
		 * 
		 * @param obj A {@link List} object of the same type (i.e., with the same template parameters, <b>T</b>).
		 * 			  Note that this function modifies <i>obj</i> no matter whether an lvalue or rvalue reference is 
		 *			  passed.
		 * @param compare Binary predicate that, taking two values of the same type than those contained in the 
		 *				  {@link list}, returns <code>true</code> if the first argument is considered to go before 
		 *				  the second in the strict weak ordering it defines, and <code>false</code> otherwise. 
		 *				  This shall be a function pointer or a function object.
		 */
		public merge<U extends T>(obj: List<U>, compare: (left: T, right: T) => boolean): void;

		public merge<U extends T>(obj: List<U>, compare: (left: T, right: T) => boolean = std.less): void
		{
			if (this == <List<T>>obj)
				return;

			let it = this.begin();

			while (obj.empty() == false)
			{
				let begin = obj.begin();
				while (!it.equal_to(this.end()) && compare(it.value, begin.value) == true)
					it = it.next();

				this.splice(it, obj, begin);
			}
		}

		/**
		 * <p> Transfer elements from {@link List} to {@link List}. </p>
		 * 
		 * <p> Transfers elements from <i>obj</i> into the container, inserting them at <i>position</i>. </p>
		 * 
		 * <p> This effectively inserts all elements into the container and removes them from <i>obj</i>, altering 
		 * the sizes of both containers. The operation does not involve the construction or destruction of any 
		 * element. They are transferred, no matter whether <i>obj</i> is an lvalue or an rvalue, or whether the 
		 * value_type supports move-construction or not. </p>
		 *
		 * <p> This first version (1) transfers all the elements of <i>obj</i> into the  </p>
		 * 
		 * @param position Position within the container where the elements of <i>obj</i> are inserted.
		 * @param obj A {@link List} object of the same type (i.e., with the same template parameters, <b>T</b>).
		 */
		public splice<U extends T>(position: ListIterator<T>, obj: List<U>): void;
		
		/**
		 * <p> Transfer an element from {@link List} to {@link List}. </p>
		 * 
		 * <p> Transfers an element from <i>obj</i>, which is pointed by an {@link ListIterator iterator} <i>it</i>, 
		 * into the container, inserting the element at specified <i>position</i>. </p>
		 * 
		 * <p> This effectively inserts an element into the container and removes it from <i>obj</i>, altering the 
		 * sizes of both containers. The operation does not involve the construction or destruction of any element. 
		 * They are transferred, no matter whether <i>obj</i> is an lvalue or an rvalue, or whether the value_type 
		 * supports move-construction or not. </p>
		 *
		 * <p> This second version (2) transfers only the element pointed by <i>it</i> from <i>obj</i> into the 
		 *  </p>
		 * 
		 * @param position Position within the container where the element of <i>obj</i> is inserted.
		 * @param obj A {@link List} object of the same type (i.e., with the same template parameters, <b>T</b>).
		 *			  This parameter may be <code>this</code> if <i>position</i> points to an element not actually 
		 *			  being spliced.
		 * @param it {@link ListIterator Iterator} to an element in <i>obj</i>. Only this single element is 
		 *			 transferred.
		 */
		public splice<U extends T>(position: ListIterator<T>, obj: List<U>, it: ListIterator<U>): void;
		
		/**
		 * <p> Transfer elements from {@link List} to {@link List}. </p>
		 *
		 * <p> Transfers elements from <i>obj</i> into the container, inserting them at <i>position</i>. </p>
		 *
		 * <p> This effectively inserts those elements into the container and removes them from <i>obj</i>, altering 
		 * the sizes of both containers. The operation does not involve the construction or destruction of any 
		 * element. They are transferred, no matter whether <i>obj</i> is an lvalue or an rvalue, or whether the 
		 * value_type supports move-construction or not. </p>
		 *
		 * <p> This third version (3) transfers the range [<i>begin</i>, <i>end</i>) from <i>obj</i> into the 
		 *  </p>
		 * 
		 * @param position Position within the container where the elements of <i>obj</i> are inserted.
		 * @param obj A {@link List} object of the same type (i.e., with the same template parameters, <b>T</b>).
		 *			  This parameter may be <code>this</code> if <i>position</i> points to an element not actually
		 *			  being spliced.
		 * @param begin {@link ListIterator An Iterator} specifying initial position of a range of elements in
		 *				<i>obj</i>. Transfers the elements in the range [<b><i>begin</i></b>, <i>end</i>) to 
		 *				<i>position</i>.
		 * @param end {@link ListIterator An Iterator} specifying final position of a range of elements in
		 *			  <i>obj</i>. Transfers the elements in the range [<i>begin</i>, <b><i>end</i></b>) to
		 *			  <i>position</i>. Notice that the range includes all the elements between <i>begin<i/> and 
		 *			  <i>end</i>, including the element pointed by <i>begin</i> but not the one pointed by <i>end</i>.
		 */
		public splice<U extends T>
			(position: ListIterator<T>, obj: List<U>, begin: ListIterator<U>, end: ListIterator<U>): void;

		public splice<U extends T>
			(
				position: ListIterator<T>, obj: List<U>, 
				begin: ListIterator<U> = null, end: ListIterator<U> = null): void
		{
			if (begin == null)
			{
				begin = obj.begin();
				end = obj.end();
			}
			else if (end == null)
			{
				end = begin.next();
			}

			this.insert(position, begin, end);
			obj.erase(begin, end);
		}

		/* ---------------------------------------------------------
			SORT
		--------------------------------------------------------- */
		/**
		 * <p> Sort elements in  </p>
		 * 
		 * <p> Sorts the elements in the {@link List}, altering their position within the  </p>
		 * 
		 * <p> The sorting is performed by applying an algorithm that uses {@link less}. This comparison shall 
		 * produce a strict weak ordering of the elements (i.e., a consistent transitive comparison, without 
		 * considering its reflexiveness). </p>
		 * 
		 * <p> The resulting order of equivalent elements is stable: i.e., equivalent elements preserve the relative 
		 * order they had before the call. </p>
		 * 
		 * <p> The entire operation does not involve the construction, destruction or copy of any element object. 
		 * Elements are moved within the  </p>
		 */
		public sort(): void;

		/**
		 * <p> Sort elements in  </p>
		 * 
		 * <p> Sorts the elements in the {@link List}, altering their position within the  </p>
		 * 
		 * <p> The sorting is performed by applying an algorithm that uses <i>compare</i>. This comparison shall 
		 * produce a strict weak ordering of the elements (i.e., a consistent transitive comparison, without 
		 * considering its reflexiveness). </p>
		 * 
		 * <p> The resulting order of equivalent elements is stable: i.e., equivalent elements preserve the relative 
		 * order they had before the call. </p>
		 * 
		 * <p> The entire operation does not involve the construction, destruction or copy of any element object. 
		 * Elements are moved within the  </p>
		 *
		 * @param compare Binary predicate that, taking two values of the same type of those contained in the 
		 *				  {@link List}, returns <code>true</code> if the first argument goes before the second 
		 *				  argument in the strict weak ordering it defines, and <code>false</code> otherwise. This 
		 *				  shall be a function pointer or a function object.
		 */
		public sort(compare: (left: T, right: T) => boolean): void;

		public sort(compare: (left: T, right: T) => boolean = std.less): void
		{
			let vector: Vector<T> = new Vector<T>(this.begin(), this.end());
			sort(vector.begin(), vector.end());

			// IT CALLS HANDLE_INSERT
			// this.assign(vector.begin(), vector.end());

			///////
			// INSTEAD OF ASSIGN
			///////
			let prev: ListIterator<T> = this.end_;
			let first: ListIterator<T> = null;

			for (let i: number = 0; i < vector.length; i++) 
			{
				// CONSTRUCT ITEM, THE NEW ELEMENT
				let item: ListIterator<T> = new ListIterator(this, prev, null, vector[i]);
				if (i == 0)
					first = item;

				prev.setNext(item);
				prev = item;
			}

			this.begin_ = first;

			// CONNECT BETWEEN LAST INSERTED ITEM AND POSITION
			prev.setNext(this.end_);
			this.end_.setPrev(prev);
		}

		/* ---------------------------------------------------------
			SWAP
		--------------------------------------------------------- */
		/**
		 * @inheritdoc
		 */
		public swap(obj: base.IContainer<T>): void
		{
			if (obj instanceof List)
				this.swap_list(obj);
			else
				super.swap(obj);
		}

		/**
		 * @hidden
		 */
		private swap_list(obj: List<T>): void
		{
			[this.begin_, obj.begin_] = [obj.begin_, this.begin_];
			[this.end_,   obj.end_	] = [obj.end_,   this.end_  ];
			[this.size_,  obj.size_	] = [obj.size_,  this.size_ ];
		}
	}

	/**
	 * An iterator, node of a List.
	 */
	export class ListIterator<T>
		extends base.Iterator<T>
	{
		protected prev_: ListIterator<T>;
		protected next_: ListIterator<T>;

		protected value_: T;

		/* ---------------------------------------------------------------
			CONSTRUCTORS
		--------------------------------------------------------------- */
		/**
		 * <p> Construct from the source {@link List container}. </p>
		 *
		 * <h4> Note </h4>
		 * <p> Do not create the iterator directly, by yourself. </p>
		 * <p> Use {@link List.begin begin()}, {@link List.end end()} in {@link List container} instead. </p> 
		 *
		 * @param source The source {@link List container} to reference.
		 * @param prev A refenrece of previous node ({@link ListIterator iterator}).
		 * @param next A refenrece of next node ({@link ListIterator iterator}).
		 * @param value Value to be stored in the node (iterator).
		 */
		public constructor(source: List<T>, prev: ListIterator<T>, next: ListIterator<T>, value: T)
		{
			super(source);
			
			this.prev_ = prev;
			this.next_ = next;

			this.value_ = value;
		}

		/**
		 * @inheritdoc
		 */
		public setPrev(prev: ListIterator<T>): void
		{
			this.prev_ = prev;
		}

		/**
		 * @inheritdoc
		 */
		public setNext(next: ListIterator<T>): void
		{
			this.next_ = next;
		}

		/* ---------------------------------------------------------------
			ACCESSORS
		--------------------------------------------------------------- */
		/**
		 * @inheritdoc
		 */
		public equal_to(obj: ListIterator<T>): boolean
		{
			return this == obj;
		}
		
		/**
		 * @inheritdoc
		 */
		public prev(): ListIterator<T>
		{
			return this.prev_;
		}

		/**
		 * @inheritdoc
		 */
		public next(): ListIterator<T>
		{
			return this.next_;
		}

		 /**
		  * @inheritdoc
		  */
		public advance(step: number): ListIterator<T>
		{
			let it: ListIterator<T> = this;
			
			if (step >= 0)
			{
				for (let i: number = 0; i < step; i++)
				{
					it = it.next();

					if (it.equal_to(this.source_.end() as ListIterator<T>))
						return it;
				}
			}
			else
			{
				for (let i: number = 0; i < step; i++)
				{
					it = it.prev();

					if (it.equal_to(this.source_.end() as ListIterator<T>))
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

		public set value(val: T)
		{
			this.value_ = val;
		}

		/**
		 * @inheritdoc
		 */
		public swap(obj: ListIterator<T>): void
		{
			let supp_prev: ListIterator<T> = this.prev_;
			let supp_next: ListIterator<T> = this.next_;

			this.prev_ = obj.prev_;
			this.next_ = obj.next_;
			obj.prev_ = supp_prev;
			obj.next_ = supp_next;

			if (this.source_.end() == this)
				(<any>this.source_).end_ = obj;
			else if (this.source_.end() == obj)
				(<any>this.source_).end_ = this;

			if (this.source_.begin() == this)
				(<any>this.source_).begin_ = obj;
			else if (this.source_.begin() == obj)
				(<any>this.source_).begin_ = this;
		}
	}

	/**
	 * <p> A reverse-iterator of List. </p>
	 *
	 * @param <T> Type of the elements.
	 *
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export class ListReverseIterator<T>
		extends base.ReverseIterator<T>
	{
		/* ---------------------------------------------------------------
			CONSTRUCTORS
		--------------------------------------------------------------- */
		public constructor(iterator: ListIterator<T>)
		{
			super(iterator);
		}

		/* ---------------------------------------------------------
			ACCESSORS
		--------------------------------------------------------- */
		/**
		 * @hidden
		 */
		private get list_iterator(): ListIterator<T>
		{
			return this.iterator_ as ListIterator<T>;
		}

		public set value(val: T)
		{
			this.list_iterator.value = val;
		}

		/* ---------------------------------------------------------
			MOVERS
		--------------------------------------------------------- */
		/**
		 * @inheritdoc
		 */
		public prev(): ListReverseIterator<T>
		{
			return new ListReverseIterator<T>(this.list_iterator.next());
		}

		/**
		 * @inheritdoc
		 */
		public next(): ListReverseIterator<T>
		{
			return new ListReverseIterator<T>(this.list_iterator.prev());
		}

		/**
		 * @inheritdoc
		 */
		public advance(n: number): ListReverseIterator<T>
		{
			return new ListReverseIterator<T>(this.list_iterator.advance(-1 * n));
		}
	}
}