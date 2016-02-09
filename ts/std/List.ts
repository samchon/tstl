/// <reference path="base/container/Container.ts" />

namespace std
{
	/**
	 * <p> Doubly linked list. </p>
	 *
	 * <p> <code>List</code>s are sequence containers that allow constant time insert and erase operations 
	 * anywhere within the sequence, and iteration in both directions. </p>
	 *
	 * <p> List containers are implemented as doubly-linked lists; Doubly linked lists can store each of 
	 * the elements they contain in different and unrelated storage locations. The ordering is kept 
	 * internally by the association to each element of a link to the element preceding it and a link to 
	 * the element following it. </p>
	 *
	 * <p> They are very similar to forward_list: The main difference being that forward_list objects are 
	 * single-linked lists, and thus they can only be iterated forwards, in exchange for being somewhat 
	 * smaller and more efficient. </p>
	 *
	 * <p> Compared to other base standard sequence containers (array, vector and deque), lists perform 
	 * generally better in inserting, extracting and moving elements in any position within the container 
	 * for which an iterator has already been obtained, and therefore also in algorithms that make 
	 * intensive use of these, like sorting algorithms. </p>
	 *
	 * <p> The main drawback of lists and forward_lists compared to these other sequence containers is that 
	 * they lack direct access to the elements by their position; For example, to access the sixth element 
	 * in a list, one has to iterate from a known position (like the beginning or the end) to that position, 
	 * which takes linear time in the distance between these. They also consume some extra memory to keep 
	 * the linking information associated to each element (which may be an important factor for large lists 
	 * of small-sized elements). </p>
	 *
	 * <h3> Container properties </h3>
	 * <dl>
	 * 	<dt> Sequence </dt>
	 * 	<dd> Elements in sequence containers are ordered in a strict linear sequence. Individual elements are 
	 *		 accessed by their position in this sequence. </dd>
	 *
	 * 	<dt> Doubly-linked list </dt>
	 *	<dd> Each element keeps information on how to locate the next and the previous elements, allowing 
	 *		 constant time insert and erase operations before or after a specific element (even of entire ranges), 
	 *		 but no direct random access. </dd>
	 * </dl>
	 *
	 * <ul>
	 *  <li> Reference: http://www.cplusplus.com/reference/list/list/
	 * </ul>
	 *
	 * @param <T> Type of the elements.
	 *
	 * @author Jeongho Nam
	 */
	export class List<T>
		extends base.container.Container<T>
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
		 * Number of elements in the <code>List</code>.
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
		 * @inheritdoc
		 */
		public constructor();

		/**
		 * @inheritdoc
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
		 * @inheritdoc
		 */
		public constructor(container: base.container.IContainer<T>);

		/**
		 * @inheritdoc
		 */
		public constructor(begin: base.container.Iterator<T>, end: base.container.Iterator<T>);

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
			else if (args.length == 1 && (args[0] instanceof Vector || args[0] instanceof base.container.Container)) 
			{
				let container: base.container.IContainer<T> = args[0];

				this.assign(container.begin(), container.end());
			}
			else if (args.length == 2 && args[0] instanceof base.container.Iterator && args[1] instanceof base.container.Iterator) 
			{
				let begin: base.container.Iterator<T> = args[0];
				let end: base.container.Iterator<T> = args[1];

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
		 * <p> Assign container content. </p>
		 *
		 * <p> Assigns new contents to the Container, replacing its current contents, and modifying its size 
		 * accordingly. </p>
		 *
		 * @param size New size of the container.
		 * @param val Value to fill the container with. Each of the <i>n</i> elements in the container will be 
		 *			  initialized to a copy of this value.
		 */
		public assign(size: number, val: T): void;

		/**
		 * @inheritdoc
		 */
		public assign(begin: base.container.Iterator<T>, end: base.container.Iterator<T>): void;

		public assign(par1: any, par2: any): void
		{
			if (par1 instanceof base.container.Iterator && par2 instanceof base.container.Iterator) {
				// PARAMETERS
				let begin: base.container.Iterator<T> = par1;
				let end: base.container.Iterator<T> = par2;

				// BODY
				let prev: ListIterator<T> = null;
				let item: ListIterator<T>;

				let it = begin;

				while (true) 
				{
					// CONSTRUCT ELEMENT ITEM
					item = new ListIterator<T>
					(
						this,
						prev,
						null,
						(it != end ? it.value : null)
					);

					// SET PREVIOUS NEXT POINTER
					if (prev != null)
						prev.setNext(item);

					// CONSTRUCT BEGIN AND END
					if (it == begin)
						this.begin_ = item;
					else if (it == end) {
						this.end_ = item;
						break;
					}

					// ADD COUNTS AND STEP TO THE NEXT
					this.size_++;
					it = it.next();
				}
			}
		}

		/**
		 * @inheritdoc
		 */
		public clear(): void
		{
			let it = new ListIterator(this, null, null, null);
			it.setPrev(it);
			it.setNext(it);

			this.begin_ = it;
			this.end_ = it;

			this.size_ = 0;
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
		public size(): number
		{
			return this.size_;
		}
		
		/**
		 * <p> Access first element. </p>
		 * <p> Returns a value in the first element of the List. </p>
		 *
		 * <p> Unlike member <code>List.end()</code>, which returns an iterator just past this element, 
		 * this function returns a direct value. </p>
		 *
		 * <p> Calling this function on an empty container causes undefined behavior. </p>
		 *
		 * @return A value in the first element of the List.
		 */
		public front(): T
		{
			return this.begin_.value;
		}

		/**
		 * <p> Access last element. </p>
		 * <p> Returns a value in the last element of the List. </p>
		 *
		 * <p> Unlike member <code>List.end()</code>, which returns an iterator just past this element, 
		 * this function returns a direct value. </p>
		 *
		 * <p> Calling this function on an empty container causes undefined behavior. </p>
		 *
		 * @return A value in the last element of the List.
		 */
		public back(): T
		{
			return this.end_.prev().value;
		}

		/* =========================================================
			ELEMENTS I/O
				- ITERATOR FACTORY
				- PUSH & POP
				- INSERT
				- ERASE
		============================================================
			PUSH & POP
		--------------------------------------------------------- */
		/**
		 * @inheritdoc
		 */
		public push(...items: T[]): number 
		{
			for (let i: number = 0; i < items.length; i++)
				this.pushBack(items[i]);

			return this.size();
		}
		
		/**
		 * <p> Insert element at beginning. </p>
		 *
		 * <p> Inserts a new element at the beginning of the list, right before its current first element.
		 * This effectively increases the container size by one. </p>
		 *
		 * @param val Value to be inserted as an element.
		 */
		public pushFront(val: T): void
		{
			let item: ListIterator<T> = new ListIterator(this, null, this.begin_, val);

			// CONFIGURE BEGIN AND NEXT
			this.begin_.setPrev(item);

			if (this.size_ == 0) 
			{
				// IT WAS EMPTY
				this.end_ = new ListIterator(this, item, item, null);
				item.setNext(this.end_);
			}
			else
				this.end_.setNext(item);

			// SET
			this.begin_ = item;
			this.size_++;
		}

		/**
		 * <p> Add element at the end. </p> 
		 *
		 * <p> Adds a new element at the lend of the <code>List</code> container, after its current last
		 * element. This effectively increases the container <code>size</code> by one. </p>
		 *
		 * @param val Value to be copied to the new element.
		 */
		public pushBack(val: T): void
		{
			let prev: ListIterator<T> = <ListIterator<T>>this.end_.prev();
			let item: ListIterator<T> = new ListIterator(this, <ListIterator<T>>this.end_.prev(), this.end_, val);

			prev.setNext(item);
			this.end_.setPrev(item);

			if (this.empty() == true) {
				this.begin_ = item;
				item.setPrev(this.end_);
			}
			this.size_++;
		}

		/**
		 * <p> Delete first element. </p>
		 * 
		 * <p> Removes first last element in the List container, effectively reducing the container 
		 * <code>size</code> by one. </p>
		 */
		public popFront(): void
		{
			this.erase(this.begin_);
		}

		/**
		 * <p> Delete last element. </p>
		 * 
		 * <p> Removes the last element in the List container, effectively reducing the container 
		 * <code>size</code> by one. </p>
		 */
		public popBack(): void
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
		 * <code>position</code>. This effectively increases the List size by the amount of elements inserted. </p>
		 *
		 * <p> Unlike other standard sequence containers, <code>List</code> is specifically designed to be 
		 * efficient inserting and removing elements in any position, even in the middle of the sequence. </p>
		 *
		 * <p> The arguments determine how many elements are inserted and to which values they are initialized. </p>
		 *
		 * @param position Position in the container where the new element is inserted.
		 *				 <code>iterator</code> is a member type, defined as a <code>bidirectional iterator</code>
		 *				 type that points to elements.
		 * @param val Value to be inserted as an element.
		 *
		 * @return An iterator that points to the newly inserted element; <code>val</code>.
		 */
		public insert(position: ListIterator<T>, val: T): ListIterator<T>;

		/**
		 * <p> Insert elements by repeated filling. </p> 
		 *
		 * @param position Position in the container where the new elements are inserted.
		 *				 <code>iterator</code> is a member type, defined as a <code>bidirectional iterator</code>
		 *				 type that points to elements.
		 * @param size Number of elements to insert.
		 * @param val Value to be inserted as an element.
		 *
		 * @return An iterator that points to the first of the newly inserted elements.
		 */
		public insert(position: ListIterator<T>, size: number, val: T): ListIterator<T>;

		/**
		 * 
		 * @param position Position in the container where the new elements are inserted.
		 *				   <code>iterator</code> is a member type, defined as a <code>bidirectional iterator</code>
		 *				   type that points to elements.
		 * @param begin An iterator specifying range of the begining element.
		 * @param end An iterator specifying range of the ending element.
		 *
		 * @return An iterator that points to the first of the newly inserted elements.
		 */
		public insert(position: ListIterator<T>, begin: base.container.Iterator<T>, end: base.container.Iterator<T>): ListIterator<T>;

		public insert(...args: any[]): ListIterator<T>
		{
			if (args.length = 2)
				return this.insertByVal(args[0], args[1]);
			else if (args.length == 3 && typeof args[1] == "number")
				return this.insertByRepeatingVal(args[0], args[1], args[2]);
			else
				return this.insertByRange(args[0], args[1], args[2]);
		}

		/**
		 * @private
		 */
		private insertByVal(position: ListIterator<T>, val: T): ListIterator<T>
		{
			// SHIFT TO INSERT OF THE REPEATING VAL
			return this.insertByRepeatingVal(position, 1, val);
		}

		/**
		 * @private
		 */
		private insertByRepeatingVal(position: ListIterator<T>, size: number, val: T): ListIterator<T>
		{
			if (this != position.getSource())
				throw new InvalidArgument("Parametric iterator is not this container's own.");

			let prev: ListIterator<T> = <ListIterator<T>>position.prev();
			let first: ListIterator<T> = null;

			for (let i: number = 0; i < size; i++) {
				// CONSTRUCT ITEM, THE NEW ELEMENT
				let item: ListIterator<T> = new ListIterator(this, prev, null, val);

				if (i == 0) first = item;
				if (prev != null) prev.setNext(item);
				
				// SHIFT CURRENT ITEM TO PREVIOUS
				prev = item;
			}

			// IF WAS EMPTY, VAL IS THE BEGIN
			if (this.empty() == true || first.prev().equals(this.end()) == true)
				this.begin_ = first;

			// CONNECT BETWEEN LAST AND POSITION
			prev.setNext(<ListIterator<T>>position);
			(<ListIterator<T>>position).setPrev(prev);

			this.size_ += size;

			return first;
		}

		/**
		 * @private
		 */
		private insertByRange(position: ListIterator<T>, 
			begin: base.container.Iterator<T>, end: base.container.Iterator<T>): ListIterator<T>
		{
			if (this != position.getSource())
				throw new InvalidArgument("Parametric iterator is not this container's own.");

			let prev: ListIterator<T> = <ListIterator<T>>position.prev();
			let first: ListIterator<T> = null;

			let size: number = 0;

			for (let it = begin; it.equals(end) == false; it = it.next()) 
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
			prev.setNext(<ListIterator<T>>position);
			(<ListIterator<T>>position).setPrev(prev);

			this.size_ += size;

			return first;
		}

		/* ---------------------------------------------------------
			ERASE
		--------------------------------------------------------- */
		/**
		 * <p> Erase an element. </p>
		 *
		 * <p> Removes from the <code>List</code> either a single element; <i>position</i>. </p>
		 *
		 * <p> This effectively reduces the container size by the number of element removed. </p>
		 *
		 * <p> Unlike other standard sequence containers, <code>List</code> objects are specifically designed to 
		 * be efficient inserting and removing elements in any position, even in the middle of the sequence. </p>
		 * 
		 * @param position Iterator pointing to a single element to be removed from the <code>List</code>.
		 *
		 * @return An iterator pointing to the element that followed the last element erased by the function 
		 *		   call. This is the <code>List.end</code> if the operation erased the last element in the 
		 *		   sequence.
		 */
		public erase(position: ListIterator<T>): ListIterator<T>;
		
		/**
		 * <p> Erase elements. </p>
		 *
		 * <p> Removes from the <code>List</code> container a range of elements. </p>
		 *
		 * <p> This effectively reduces the container <code>size</code> by the number of elements removed. </p>
		 *
		 * <p> Unlike other standard sequence containers, <code>List</code> objects are specifically designed to 
		 * be efficient inserting and removing elements in any position, even in the middle of the sequence. </p>
		 *
		 * @param begin An iterator specifying a range of beginning to erase.
		 * @param end An iterator specifying a range of end to erase.
		 * 
		 * @return An iterator pointing to the element that followed the last element erased by the function 
		 *		   call. This is the <code>List.end</code> if the operation erased the last element in the 
		 *		   sequence.
		 */
		public erase(begin: ListIterator<T>, end: ListIterator<T>): ListIterator<T>;

		public erase(...args: any[]): ListIterator<T>
		{
			if (args.length == 1)
				return this.eraseByIterator(args[0]);
			else if (args.length == 2)
				return this.eraseByRange(args[0], args[1]);
		}

		/**
		 * @private
		 */
		private eraseByIterator(it: ListIterator<T>): ListIterator<T>
		{
			return this.eraseByRange(it, it.next());
		}

		/**
		 * @private
		 */
		private eraseByRange(begin: ListIterator<T>, end: ListIterator<T>): ListIterator<T>
		{
			if (this != begin.getSource() || begin.getSource() != end.getSource())
				throw new InvalidArgument("Parametric iterator is not this container's own.");

			// FIND PREV AND NEXT
			let prev: ListIterator<T> = <ListIterator<T>>begin.prev();
			let next: ListIterator<T> = <ListIterator<T>>end;

			// CALCULATE THE SIZE
			let size: number = 0;

			for (let it = begin; it.equals(end) == false; it = it.next())
				size++;

			// SHRINK
			prev.setNext(next);
			next.setPrev(prev);

			if (next.prev().equals(this.end()) == true)
				this.begin_ = next;

			this.size_ -= size;

			return prev;
		}
	}
}