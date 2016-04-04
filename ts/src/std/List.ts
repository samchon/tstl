/// <reference path="base/container/Container.ts" />

namespace std
{
	/**
	 * <p> Doubly linked list. </p>
	 *
	 * <p> {@link List}s are sequence containers that allow constant time insert and erase operations 
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
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export class List<T>
		extends base.container.Container<T>
		implements base.container.IDeque<T>
	{
		public static get iterator() { return ListIterator; }

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
		public constructor(container: base.container.IContainer<T>);

		/**
		 * <p> Range Constructor. </p>
		 *
		 * <p> Constructs a container with as many elements as the range (<i>begin</i>, <i>end<i>), with each 
		 * element emplace-constructed from its corresponding element in that range, in the same order. </p>
		 *
		 * @param begin Input interator of the initial position in a sequence.
		 * @param end Input interator of the final position in a sequence.
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
		 * @inheritdoc
		 */
		public assign(n: number, val: T): void;

		/**
		 * @inheritdoc
		 */
		public assign<U extends T>(begin: base.container.Iterator<U>, end: base.container.Iterator<U>): void;

		public assign<U extends T>(par1: any, par2: any): void
		{
			if (par1 instanceof base.container.Iterator && par2 instanceof base.container.Iterator) {
				// PARAMETERS
				let begin: base.container.Iterator<U> = par1;
				let end: base.container.Iterator<U> = par2;

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
		public push<U extends T>(...items: U[]): number 
		{
			for (let i: number = 0; i < items.length; i++)
				this.pushBack(items[i]);

			return this.size();
		}
		
		/**
		 * @inheritdoc
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
		 * @inheritdoc
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
		 * @inheritdoc
		 */
		public popFront(): void
		{
			this.erase(this.begin_);
		}

		/**
		 * @inheritdoc
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
		 * <i>position</i>. This effectively increases the {@link List.size List size} by the amount of elements 
		 * inserted. </p>
		 *
		 * <p> Unlike other standard sequence containers, {@link List} is specifically designed to be 
		 * efficient inserting and removing elements in any position, even in the middle of the sequence. </p>
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
		 * @param position Position in the container where the new elements are inserted.
		 *				   {@link iterator}> is a member type, defined as a 
		 *				   {@link ListIterator bidirectional iterator} type that points to elements.
		 * @param size Number of elements to insert.
		 * @param val Value to be inserted as an element.
		 *
		 * @return An iterator that points to the first of the newly inserted elements.
		 */
		public insert(position: ListIterator<T>, size: number, val: T): ListIterator<T>;

		/**
		 * 
		 * @param position Position in the container where the new elements are inserted.
		 *				   {@link iterator}> is a member type, defined as a 
		 *				   {@link ListIterator bidirectional iterator} type that points to elements.
		 * @param begin An iterator specifying range of the begining element.
		 * @param end An iterator specifying range of the ending element.
		 *
		 * @return An iterator that points to the first of the newly inserted elements.
		 */
		public insert(position: ListIterator<T>, begin: base.container.Iterator<T>, end: base.container.Iterator<T>): ListIterator<T>;

		public insert(...args: any[]): ListIterator<T>
		{
			if (args.length == 2)
				return this.insertByVal(args[0], args[1]);
			else if (args.length == 3 && typeof args[1] == "number")
			{
				return this.insertByRepeatingVal(args[0], args[1], args[2]);
			}
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
			if (this.empty() == true || first.prev().equals(this.end()) == true)
				this.begin_ = first;

			// CONNECT BETWEEN LAST INSERTED ITEM AND POSITION
			prev.setNext(position);
			position.setPrev(prev);

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
		 * <p> Removes from the {@link List} either a single element; <i>position</i>. </p>
		 *
		 * <p> This effectively reduces the container size by the number of element removed. </p>
		 *
		 * <p> Unlike other standard sequence containers, {@link List} objects are specifically designed to 
		 * be efficient inserting and removing elements in any position, even in the middle of the sequence. </p>
		 * 
		 * @param position Iterator pointing to a single element to be removed from the {@link List}.
		 *
		 * @return An iterator pointing to the element that followed the last element erased by the function 
		 *		   call. This is the {@link end end()} if the operation erased the last element in the 
		 *		   sequence.
		 */
		public erase(position: ListIterator<T>): ListIterator<T>;
		
		/**
		 * <p> Erase elements. </p>
		 *
		 * <p> Removes from the {@link List} container a range of elements. </p>
		 *
		 * <p> This effectively reduces the container {@link size} by the number of elements removed. </p>
		 *
		 * <p> Unlike other standard sequence containers, {@link List} objects are specifically designed to 
		 * be efficient inserting and removing elements in any position, even in the middle of the sequence. </p>
		 *
		 * @param begin An iterator specifying a range of beginning to erase.
		 * @param end An iterator specifying a range of end to erase.
		 * 
		 * @return An iterator pointing to the element that followed the last element erased by the function 
		 *		   call. This is the {@link end end()} if the operation erased the last element in the 
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

			// CALCULATE THE SIZE
			let size: number = 0;

			for (let it = begin; it.equals(end) == false; it = it.next())
				size++;

			// SHRINK
			prev.setNext(end);
			end.setPrev(prev);

			this.size_ -= size;
			if (this.size_ == 0)
				this.begin_ = end;

			return end;
		}

		/* ===============================================================
			UTILITIES
		=============================================================== */
		public swap(obj: List<T>): void
		{
			let supplement: List<T> = <List<T>>new Object();
			supplement.begin_ = this.begin_;
			supplement.end_ = this.end_;
			supplement.size_ = this.size_;

			this.begin_ = obj.begin_;
			this.end_ = obj.end_;
			this.size_ = obj.size_;

			obj.begin_ = supplement.begin_;
			obj.end_ = supplement.end_;
			obj.size_ = supplement.size_;
		}
	}
}