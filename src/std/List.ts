/// <reference path="API.ts" />

/// <reference path="base/_ListContainer.ts" />

namespace std.List
{
	export type iterator<T> = ListIterator<T>;
	export type reverse_iterator<T> = ListReverseIterator<T>;
}

namespace std
{
	/**
	 * Doubly linked list.
	 *
	 * {@link List}s are sequence containers that allow constant time insert and erase operations anywhere within the 
	 * sequence, and iteration in both directions.
	 *
	 * List containers are implemented as doubly-linked lists; Doubly linked lists can store each of the elements they 
	 * contain in different and unrelated storage locations. The ordering is kept internally by the association to each 
	 * element of a link to the element preceding it and a link to the element following it.
	 * 
	 * Compared to other base standard sequence containers (array, vector and deque), lists perform generally better 
	 * in inserting, extracting and moving elements in any position within the container for which an iterator has already 
	 * been obtained, and therefore also in algorithms that make intensive use of these, like sorting algorithms.
	 *
	 * The main drawback of lists and forward_lists compared to these other sequence containers is that they lack 
	 * direct access to the elements by their position; For example, to access the sixth element in a list, one has to 
	 * iterate from a known position (like the beginning or the end) to that position, which takes linear time in the 
	 * distance between these. They also consume some extra memory to keep the linking information associated to each 
	 * element (which may be an important factor for large lists of small-sized elements).
	 *
	 * <a href="http://samchon.github.io/tstl/images/design/class_diagram/linear_containers.png" target="_blank"> 
	 * <img src="http://samchon.github.io/tstl/images/design/class_diagram/linear_containers.png" style="max-width: 100%" /></a>
	 *
	 * 
	 * ### Container properties
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
		extends base._ListContainer<T, ListIterator<T>>
	{
		private rend_: ListReverseIterator<T>;

		/* =========================================================
			CONSTRUCTORS & SEMI-CONSTRUCTORS
				- CONSTRUCTORS
				- ASSIGN & CLEAR
		============================================================
			CONSTURCTORS
		--------------------------------------------------------- */
		/**
		 * Default Constructor.
		 *
		 * Constructs an empty container, with no elements.
		 */
		public constructor();

		/**
		 * Initializer list Constructor.
		 *
		 * Constructs a container with a copy of each of the elements in <i>array</i>, in the same order.
		 *
		 * @param array An array containing elements to be copied and contained.
		 */
		public constructor(items: Array<T>);

		/**
		 * Fill Constructor.
		 *
		 * Constructs a container with <i>n</i> elements. Each element is a copy of <i>val</i> (if provided).
		 *
		 * @param n Initial container size (i.e., the number of elements in the container at construction).
		 * @param val Value to fill the container with. Each of the <i>n</i> elements in the container is 
		 *			  initialized to a copy of this value.
		 */
		public constructor(size: number, val: T);

		/**
		 * Copy Constructor.
		 *
		 * Constructs a container with a copy of each of the elements in <i>container</i>, in the same order.
		 *
		 * @param container Another container object of the same type (with the same class template 
		 *					arguments <i>T</i>), whose contents are either copied or acquired.
		 */
		public constructor(container: List<T>);

		/**
		 * Range Constructor.
		 *
		 * Constructs a container with as many elements as the range (<i>begin</i>, <i>end<i>), with each 
		 * element emplace-constructed from its corresponding element in that range, in the same order.
		 *
		 * @param begin Input interator of the initial position in a sequence.
		 * @param end Input interator of the final position in a sequence.
		 */
		public constructor(begin: Iterator<T>, end: Iterator<T>);

		public constructor(...args: any[])
		{
			super();

			// BRANCHES
			if (args.length == 0) 
			{
				// DO NOTHING
			}
			else if (args.length == 1 && args[0] instanceof Array) 
			{
				let array: Array<T> = args[0];

				this.push(...array);
			}
			else if (args.length == 1 && (args[0] instanceof List)) 
			{
				let container: List<T> = args[0];

				this.assign(container.begin(), container.end());
			}
			else if (args.length == 2 && args[0] instanceof Iterator && args[1] instanceof Iterator) 
			{
				let begin: Iterator<T> = args[0];
				let end: Iterator<T> = args[1];

				this.assign(begin, end);
			}
			else if (args.length == 2 && typeof args[0] == "number")
			{
				let size: number = args[0];
				let val: T = <T>args[1];

				this.assign(size, val);
			}
		}

		/**
		 * @hidden
		 */
		protected _Create_iterator(prev: ListIterator<T>, next: ListIterator<T>, val: T): ListIterator<T>
		{
			return new ListIterator<T>(this, prev as ListIterator<T>, next as ListIterator<T>, val);
		}

		/**
		 * @hidden
		 */
		protected _Set_begin(it: ListIterator<T>): void
		{
			super._Set_begin(it);
			this.rend_ = new ListReverseIterator<T>(it);
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
		public assign<U extends T, InputIterator extends Iterator<U>>
			(begin: InputIterator, end: InputIterator): void;

		public assign<U extends T, InputIterator extends Iterator<U>>
			(par1: any, par2: any): void
		{
			this.clear();
			this.insert(this.end(), par1, par2);
		}
		
		/* =========================================================
			ACCESSORS
		========================================================= */
		/**
		 * @inheritdoc
		 */
		public rbegin(): ListReverseIterator<T>
		{
			return new ListReverseIterator<T>(this.end());
		}

		/**
		 * @inheritdoc
		 */
		public rend(): ListReverseIterator<T>
		{
			return this.rend_;
		}

		/**
		 * @inheritdoc
		 */
		public front(): T
		{
			return this.begin().value;
		}

		/**
		 * @inheritdoc
		 */
		public back(): T
		{
			return this.end().prev().value;
		}

		/* =========================================================
			ELEMENTS I/O
				- INSERT
				- ERASE
				- POST-PROCESS
		============================================================
			INSERT
		--------------------------------------------------------- */
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
		public insert(position: ListIterator<T>, val: T): ListIterator<T>;

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
		public insert(position: ListIterator<T>, size: number, val: T): ListIterator<T>;

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
			(position: ListIterator<T>, begin: InputIterator, end: InputIterator): ListIterator<T>;
		
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
		 *				   {@link ListReverseIterator bidirectional iterator} type that points to elements.
		 * @param val Value to be inserted as an element.
		 *
		 * @return An iterator that points to the newly inserted element; <i>val</i>.
		 */
		public insert(position: ListReverseIterator<T>, val: T): ListReverseIterator<T>;

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
		 *				   member type, defined as a {@link ListReverseIterator bidirectional iterator} type that points to
		 *				   elements.
		 * @param size Number of elements to insert.
		 * @param val Value to be inserted as an element.
		 *
		 * @return An iterator that points to the first of the newly inserted elements.
		 */
		public insert(position: ListReverseIterator<T>, size: number, val: T): ListReverseIterator<T>;

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
		 *				   member type, defined as a {@link ListReverseIterator bidirectional iterator} type that points to
		 *				   elements.
		 * @param begin An iterator specifying range of the begining element.
		 * @param end An iterator specifying range of the ending element.
		 *
		 * @return An iterator that points to the first of the newly inserted elements.
		 */
		public insert<U extends T, InputIterator extends Iterator<U>>
			(position: ListReverseIterator<T>, begin: InputIterator, end: InputIterator): ListReverseIterator<T>;

		public insert(...args: any[]): ListIterator<T> | ListReverseIterator<T>
		{
			// REVERSE_ITERATOR TO ITERATOR
			let ret: ListIterator<T>;
			let is_reverse_iterator: boolean = false;

			if (args[0] instanceof ListReverseIterator)
			{
				is_reverse_iterator = true;
				args[0] = (args[0] as ListReverseIterator<T>).base().prev();
			}

			//----
			// DO INSERT VIA SUPER
			//----
			ret = super.insert.apply(this, args);
			
			// RETURNS
			if (is_reverse_iterator == true)
				return new ListReverseIterator<T>(ret.next());
			else
				return ret;
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
		public erase(position: ListIterator<T>): ListIterator<T>;
		
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
		public erase(begin: ListIterator<T>, end: ListIterator<T>): ListIterator<T>;

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
		 *		   This is the {@link rend rend()} if the operation erased the last element in the sequence.
		 */
		public erase(position: ListReverseIterator<T>): ListReverseIterator<T>;

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
		 *		   This is the {@link rend rend()} if the operation erased the last element in the sequence.
		 */
		public erase(begin: ListReverseIterator<T>, end: ListReverseIterator<T>): ListReverseIterator<T>;

		public erase(first: any, last: any = first.next()): ListIterator<T> | ListReverseIterator<T>
		{
			let ret: ListIterator<T>;
			let is_reverse_iterator: boolean = false;

			// REVERSE ITERATOR TO ITERATOR
			if (first instanceof ListReverseIterator)
			{
				is_reverse_iterator = true;

				let first_it = (last as ListReverseIterator<T>).base();
				let last_it = (first as ListReverseIterator<T>).base();

				first = first_it;
				last = last_it;
			}

			// ERASE ELEMENTS
			ret = this._Erase_by_range(first, last);

			// RETURN BRANCHES
			if (is_reverse_iterator == true)
				return new ListReverseIterator<T>(ret.next());
			else
				return ret;
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
		 * Remove duplicate values.
		 *
		 * Removes all but the first element from every consecutive group of equal elements in the 
		 *
		 * Notice that an element is only removed from the {@link List} container if it compares equal to the 
		 * element immediately preceding it. Thus, this function is especially useful for sorted lists.
		 */
		public unique(): void;

		/**
		 * Remove duplicate values.
		 * 
		 * Removes all but the first element from every consecutive group of equal elements in the 
		 * 
		 * The argument <i>binary_pred</i> is a specific comparison function that determine the <u>uniqueness</u> 
		 * of an element. In fact, any behavior can be implemented (and not only an equality comparison), but notice 
		 * that the function will call <code>binary_pred(it.value, it.prev().value)</code> for all pairs of elements 
		 * (where <code>it</code> is an iterator to an element, starting from the second) and remove <code>it</code> 
		 * from the {@link List} if the predicate returns <code>true</code>.
		 *
		 * Notice that an element is only removed from the {@link List} container if it compares equal to the 
		 * element immediately preceding it. Thus, this function is especially useful for sorted lists.
		 * 
		 * @param binary_pred Binary predicate that, taking two values of the same type than those contained in the 
		 *					  {@link List}, returns <code>true</code> to remove the element passed as first argument 
		 *					  from the container, and <code>false</code> otherwise. This shall be a function pointer 
		 *					  or a function object.
		 */
		public unique(binary_pred: (left: T, right: T) => boolean): void;

		public unique(binary_pred: (left: T, right: T) => boolean = equal_to): void
		{
			let it = this.begin().next();

			while (!it.equals(this.end()))
			{
				if (equal_to(it.value, it.prev().value) == true)
					it = this.erase(it);
				else
					it = it.next();
			}
		}

		/**
		 * Remove elements with specific value.
		 * 
		 * Removes from the container all the elements that compare equal to <i>val</i>. This calls the 
		 * destructor of these objects and reduces the container {@link size} by the number of elements removed.
		 * 
		 * Unlike member function {@link List.erase}, which erases elements by their position (using an 
		 * iterator), this function ({@link List.remove}) removes elements by their value.
		 * 
		 * A similar function, {@link List.remove_if}, exists, which allows for a condition other than an 
		 * equality comparison to determine whether an element is removed.
		 *
		 * @param val Value of the elements to be removed.
		 */
		public remove(val: T): void
		{
			let it = this.begin();

			while (!it.equals(this.end()))
			{
				if (equal_to(it.value, val) == true)
					it = this.erase(it);
				else
					it = it.next();
			}
		}

		/**
		 * Remove elements fulfilling condition.
		 * 
		 * Removes from the container all the elements for which <i>pred</i> returns <code>true</code>. This 
		 * calls the destructor of these objects and reduces the container {@link size} by the number of elements 
		 * removed.
		 * 
		 * The function calls <code>pred(it.value)</code> for each element (where <code>it</code> is an iterator 
		 * to that element). Any of the elements in the list for which this returns <code>true</code>, are removed 
		 * from the 
		 * 
		 * @param pred Unary predicate that, taking a value of the same type as those contained in the forward_list 
		 *			   object, returns <code>true</code> for those values to be removed from the container, and 
		 *			   <code>false</code> for those remaining. This can either be a function pointer or a function 
		 *			   object.
		 */
		public remove_if(pred: (val: T) => boolean): void
		{
			let it = this.begin();

			while (!it.equals(this.end()))
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
		 * Merge sorted {@link List Lists}.
		 *
		 * Merges <i>obj</i> into the {@link List} by transferring all of its elements at their respective 
		 * ordered positions into the container (<font color='red'>both containers shall already be ordered</font>). 
		 *
		 * 
		 * This effectively removes all the elements in <i>obj</i> (which becomes {@link empty}), and inserts 
		 * them into their ordered position within container (which expands in {@link size} by the number of elements 
		 * transferred). The operation is performed without constructing nor destroying any element: they are 
		 * transferred, no matter whether <i>obj</i> is an lvalue or an rvalue, or whether the value_type supports 
		 * move-construction or not.
		 * 
		 * This function requires that the {@link List} containers have their elements already ordered by value 
		 * ({@link less}) before the call. For an alternative on unordered {@link List Lists}, see 
		 * {@link List.splice}.
		 * 
		 * Assuming such ordering, each element of <i>obj</i> is inserted at the position that corresponds to its 
		 * value according to the strict weak ordering defined by {@link less}. The resulting order of equivalent 
		 * elements is stable (i.e., equivalent elements preserve the relative order they had before the call, and 
		 * existing elements precede those equivalent inserted from <i>obj</i>).
		 * 
		 * The function does nothing if <code>this == obj</code>.
		 * 
		 * @param obj A {@link List} object of the same type (i.e., with the same template parameters, <b>T</b>).
		 * 			  Note that this function modifies <i>obj</i> no matter whether an lvalue or rvalue reference is 
		 *			  passed.
		 */
		public merge<U extends T>(obj: List<U>): void;

		/**
		 * Merge sorted {@link List Lists}.
		 *
		 * Merges <i>obj</i> into the {@link List} by transferring all of its elements at their respective 
		 * ordered positions into the container (<font color='red'>both containers shall already be ordered</font>). 
		 *
		 * 
		 * This effectively removes all the elements in <i>obj</i> (which becomes {@link empty}), and inserts 
		 * them into their ordered position within container (which expands in {@link size} by the number of elements 
		 * transferred). The operation is performed without constructing nor destroying any element: they are 
		 * transferred, no matter whether <i>obj</i> is an lvalue or an rvalue, or whether the value_type supports 
		 * move-construction or not.
		 *
		 * The argument <i>compare</i> is a specific predicate to perform the comparison operation between 
		 * elements. This comparison shall produce a strict weak ordering of the elements (i.e., a consistent 
		 * transitive comparison, without considering its reflexiveness).
		 * 
		 * This function requires that the {@link List} containers have their elements already ordered by 
		 * <i>compare</i> before the call. For an alternative on unordered {@link List Lists}, see 
		 * {@link List.splice}.
		 * 
		 * Assuming such ordering, each element of <i>obj</i> is inserted at the position that corresponds to its 
		 * value according to the strict weak ordering defined by <i>compare</i>. The resulting order of equivalent 
		 * elements is stable (i.e., equivalent elements preserve the relative order they had before the call, and 
		 * existing elements precede those equivalent inserted from <i>obj</i>).
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

		public merge<U extends T>(obj: List<U>, compare: (left: T, right: T) => boolean = less): void
		{
			if (this == <List<T>>obj)
				return;

			let it = this.begin();

			while (obj.empty() == false)
			{
				let begin = obj.begin();
				while (!it.equals(this.end()) && compare(it.value, begin.value) == true)
					it = it.next();

				this.splice(it, obj, begin);
			}
		}

		/**
		 * Transfer elements from {@link List} to {@link List}.
		 * 
		 * Transfers elements from <i>obj</i> into the container, inserting them at <i>position</i>.
		 * 
		 * This effectively inserts all elements into the container and removes them from <i>obj</i>, altering 
		 * the sizes of both containers. The operation does not involve the construction or destruction of any 
		 * element. They are transferred, no matter whether <i>obj</i> is an lvalue or an rvalue, or whether the 
		 * value_type supports move-construction or not.
		 *
		 * This first version (1) transfers all the elements of <i>obj</i> into the 
		 * 
		 * @param position Position within the container where the elements of <i>obj</i> are inserted.
		 * @param obj A {@link List} object of the same type (i.e., with the same template parameters, <b>T</b>).
		 */
		public splice<U extends T>(position: ListIterator<T>, obj: List<U>): void;
		
		/**
		 * Transfer an element from {@link List} to {@link List}.
		 * 
		 * Transfers an element from <i>obj</i>, which is pointed by an {@link ListIterator iterator} <i>it</i>, 
		 * into the container, inserting the element at specified <i>position</i>.
		 * 
		 * This effectively inserts an element into the container and removes it from <i>obj</i>, altering the 
		 * sizes of both containers. The operation does not involve the construction or destruction of any element. 
		 * They are transferred, no matter whether <i>obj</i> is an lvalue or an rvalue, or whether the value_type 
		 * supports move-construction or not.
		 *
		 * This second version (2) transfers only the element pointed by <i>it</i> from <i>obj</i> into the 
		 * 
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
		 * Transfer elements from {@link List} to {@link List}.
		 *
		 * Transfers elements from <i>obj</i> into the container, inserting them at <i>position</i>.
		 *
		 * This effectively inserts those elements into the container and removes them from <i>obj</i>, altering 
		 * the sizes of both containers. The operation does not involve the construction or destruction of any 
		 * element. They are transferred, no matter whether <i>obj</i> is an lvalue or an rvalue, or whether the 
		 * value_type supports move-construction or not.
		 *
		 * This third version (3) transfers the range [<i>begin</i>, <i>end</i>) from <i>obj</i> into the 
		 * 
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
		 * Sort elements in 
		 * 
		 * Sorts the elements in the {@link List}, altering their position within the 
		 * 
		 * The sorting is performed by applying an algorithm that uses {@link less}. This comparison shall 
		 * produce a strict weak ordering of the elements (i.e., a consistent transitive comparison, without 
		 * considering its reflexiveness).
		 * 
		 * The resulting order of equivalent elements is stable: i.e., equivalent elements preserve the relative 
		 * order they had before the call.
		 * 
		 * The entire operation does not involve the construction, destruction or copy of any element object. 
		 * Elements are moved within the 
		 */
		public sort(): void;

		/**
		 * Sort elements in 
		 * 
		 * Sorts the elements in the {@link List}, altering their position within the 
		 * 
		 * The sorting is performed by applying an algorithm that uses <i>compare</i>. This comparison shall 
		 * produce a strict weak ordering of the elements (i.e., a consistent transitive comparison, without 
		 * considering its reflexiveness).
		 * 
		 * The resulting order of equivalent elements is stable: i.e., equivalent elements preserve the relative 
		 * order they had before the call.
		 * 
		 * The entire operation does not involve the construction, destruction or copy of any element object. 
		 * Elements are moved within the 
		 *
		 * @param compare Binary predicate that, taking two values of the same type of those contained in the 
		 *				  {@link List}, returns <code>true</code> if the first argument goes before the second 
		 *				  argument in the strict weak ordering it defines, and <code>false</code> otherwise. This 
		 *				  shall be a function pointer or a function object.
		 */
		public sort(compare: (left: T, right: T) => boolean): void;

		public sort(compare: (left: T, right: T) => boolean = less): void
		{
			this._Quick_sort(this.begin(), this.end().prev(), compare);
		}

		/**
		 * @hidden
		 */
		private _Quick_sort(first: ListIterator<T>, last: ListIterator<T>, compare: (left: T, right: T) => boolean): void
		{
			if (!first.equals(last) && !last.equals(this.end()) && !first.equals(last.next()))
			{
				let temp: ListIterator<T> = this._Quick_sort_partition(first, last, compare);

				this._Quick_sort(first, temp.prev(), compare);
				this._Quick_sort(temp.next(), last, compare);
			}
		}

		/**
		 * @hidden
		 */
		private _Quick_sort_partition(first: ListIterator<T>, last: ListIterator<T>, compare: (left: T, right: T) => boolean): ListIterator<T>
		{
			let standard: T = last.value; // TO BE COMPARED
			let prev: ListIterator<T> = first.prev(); // TO BE SMALLEST

			let it: ListIterator<T> = first;
			for (; !it.equals(last); it = it.next())
				if (compare(it.value, standard))
				{
					prev = prev.equals(this.end()) ? first : prev.next();
					[prev.value, it.value] = [it.value, prev.value];
				}

			prev = prev.equals(this.end()) ? first : prev.next();
			[prev.value, it.value] = [it.value, prev.value];
		
			return prev;
		}

		/**
		 * Reverse the order of elements.
		 *
		 * Reverses the order of the elements in the list container.
		 */
		public reverse(): void
		{
			let begin: ListIterator<T> = this.end().prev();
			let prev_of_end: ListIterator<T> = this.begin();

			for (let it = this.begin(); !it.equals(this.end()); )
			{
				let next = it.next();
				[it["prev_"], it["next_"]] = [it["next_"], it["prev_"]];

				it = next;
			}
			
			// ADJUST THE BEGIN AND END
			this._Set_begin(begin); // THE NEW BEGIN
			this.end()["prev_"] = prev_of_end;
			this.end()["next_"] = begin;
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
		public swap(obj: List<T>): void

		/**
		 * @inheritdoc
		 */
		public swap(obj: base.Container<T>): void;

		public swap(obj: List<T> | base.Container<T>): void
		{
			super.swap(obj);
		}
	}
}

namespace std
{
	/**
	 * An iterator, node of a List.
	 * 
	 * <a href="http://samchon.github.io/tstl/images/design/class_diagram/linear_containers.png" target="_blank"> 
	 * <img src="http://samchon.github.io/tstl/images/design/class_diagram/linear_containers.png" style="max-width: 100%" /></a>
	 * 
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export class ListIterator<T>
		extends base._ListIteratorBase<T>
	{
		/* ---------------------------------------------------------------
			CONSTRUCTORS
		--------------------------------------------------------------- */
		/**
		 * Initializer Constructor.
		 *
		 * #### Note
		 * Do not create the iterator directly, by yourself.
		 * 
		 * Use {@link List.begin begin()}, {@link List.end end()} in {@link List container} instead.
		 *
		 * @param source The source {@link List container} to reference.
		 * @param prev A refenrece of previous node ({@link ListIterator iterator}).
		 * @param next A refenrece of next node ({@link ListIterator iterator}).
		 * @param value Value to be stored in the node (iterator).
		 */
		public constructor(source: List<T>, prev: ListIterator<T>, next: ListIterator<T>, value: T)
		{
			super(source, prev, next, value);
		}

		/* ---------------------------------------------------------------
			ACCESSORS
		--------------------------------------------------------------- */
		/**
		 * @inheritdoc
		 */
		public source(): List<T>
		{
			return this.source_ as List<T>;
		}

		/**
		 * @inheritdoc
		 */
		public get value(): T
		{
			return this.value_;
		}

		/**
		 * Set value of the iterator is pointing to.
		 * 
		 * @param val Value to set.
		 */
		public set value(val: T)
		{
			this.value_ = val;
		}

		/* ---------------------------------------------------------
			MOVERS
		--------------------------------------------------------- */
		/**
		 * @inheritdoc
		 */
		public prev(): ListIterator<T>
		{
			return this.prev_ as ListIterator<T>;
		}

		/**
		 * @inheritdoc
		 */
		public next(): ListIterator<T>
		{
			return this.next_ as ListIterator<T>;
		}

		 /**
		  * @inheritdoc
		  */
		public advance(step: number): ListIterator<T>
		{
			return super.advance(step) as ListIterator<T>;
		}

		/* ---------------------------------------------------------------
			COMPARISON
		--------------------------------------------------------------- */
		/**
		 * @inheritdoc
		 */
		public equals(obj: ListIterator<T>): boolean
		{
			return this == obj;
		}

		/**
		 * @inheritdoc
		 */
		public swap(obj: ListIterator<T>): void
		{
			super.swap(obj);
		}
	}
}

namespace std
{
	/**
	 * A reverse-iterator of List.
	 * 
	 * <a href="http://samchon.github.io/tstl/images/design/class_diagram/linear_containers.png" target="_blank"> 
	 * <img src="http://samchon.github.io/tstl/images/design/class_diagram/linear_containers.png" style="max-width: 100%" /></a>
	 *
	 * @param <T> Type of the elements.
	 *
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export class ListReverseIterator<T>
		extends ReverseIterator<T, List<T>, ListIterator<T>, ListReverseIterator<T>>
		implements base.ILinearIterator<T>
	{
		/* ---------------------------------------------------------------
			CONSTRUCTORS
		--------------------------------------------------------------- */
		/**
		 * Construct from base iterator.
		 * 
		 * @param base A reference of the base iterator, which iterates in the opposite direction.
		 */
		public constructor(base: ListIterator<T>)
		{
			super(base);
		}

		/**
		 * @hidden
		 */
		protected _Create_neighbor(base: ListIterator<T>): ListReverseIterator<T>
		{
			return new ListReverseIterator<T>(base);
		}

		/* ---------------------------------------------------------
			ACCESSORS
		--------------------------------------------------------- */
		/**
		 * @inheritdoc
		 */
		public get value(): T
		{
			return this.base_.value;
		}

		/**
		 * Set value of the iterator is pointing to.
		 * 
		 * @param val Value to set.
		 */
		public set value(val: T)
		{
			this.base_.value = val;
		}
	}
}