namespace std
{
	/**
	 * <p> Priority queue. </p>
	 * 
	 * <p> {@link PriorityQueue Priority queues} are a type of container adaptors, specifically designed such that its
	 * first element is always the greatest of the elements it contains, according to some <i>strict weak ordering</i>
	 * criterion. </p>
	 * 
	 * <p> This context is similar to a <i>heap</i>, where elements can be inserted at any moment, and only the 
	 * <i>max heap</i> element can be retrieved (the one at the top in the {@link PriorityQueue priority queue}). </p>
	 * 
	 * <p> {@link PriorityQueue Priority queues} are implemented as <i>container adaptors</i>, which are classes that 
	 * use an encapsulated object of a specific container class as its {@link container_ underlying container}, 
	 * providing a specific set of member functions to access its elements. Elements are popped from the <i>"back"</i> 
	 * of the specific container, which is known as the <i>top</i> of the {@link PriorityQueue Priority queue}. </p>
	 * 
	 * <p> The {@link container_ underlying container} may be any of the standard container class templates or some 
	 * other specifically designed container class. The container shall be accessible through 
	 * {@link IArrayIterator random access iterators} and support the following operations: </p>
	 * 
	 * <ul>
	 *	<li> empty() </li>
	 *	<li> size() </li>
	 *	<li> front() </li>
	 *	<li> push_back() </li>
	 *	<li> pop_back() </li>
	 * </ul>
	 * 
	 * <p> The standard container classes {@link Vector} and {@link Deque} fulfill these requirements. By default, if 
	 * no container class is specified for a particular {@link PriorityQueue} class instantiation, the standard 
	 * container {@link Vector} is used. </p>
	 * 
	 * <p> Support of {@link IArrayIterator random access iterators} is required to keep a heap structure internally 
	 * at all times. This is done automatically by the container adaptor by automatically calling the algorithm 
	 * functions <i>make_heap</i>, <i>push_heap</i> and <i>pop_heap</i> when needed. </p>
	 * 
	 * @param <T> Type of the elements.
	 * 
	 * @reference http://www.cplusplus.com/reference/queue/priority_queue/
	 * @author Jeongho Nam
	 */
	export class PriorityQueue<T>
	{
		/**
		 * <p> The <i>underlying container</i> for implementing the <i>priority queue</i>. </p>
		 *
		 * <p> Following standard definition from the C++ committee, the <i>underlying container</i> should be one of 
		 * {@link Vector} or {@link Deque}, however, I've adopted {@link TreeMultiSet} instead of them. Of course,
		 * there are proper reasons for adapting the {@link TreeMultiSet} even violating standard advice. </p>
		 *
		 * <p> <i>Underlying container</i> of {@link PriorityQueue} must keep a condition; the highest (or lowest)
		 * element must be placed on the terminal node for fast retrieval and deletion. To keep the condition with 
		 * {@link Vector} or {@link Deque}, lots of times will only be spent for re-arranging elements. It calls
		 * rearrangement functions like <i>make_heap</i>, <i>push_heap</i> and <i>pop_head</i> for rearrangement. </p>
		 * 
		 * <p> However, the {@link TreeMultiSet} container always keeps arrangment automatically without additional
		 * operations and it even meets full criteria of {@link PriorityQueue}. Those are the reason why I've adopted 
		 * {@link TreeMultiSet} as the <i>underlying container</i> of {@link PriorityQueue}. </p> 
		 */
		private container_: TreeMultiSet<T>;

		/* =========================================================
			CONSTRUCTORS & SEMI-CONSTRUCTORS
				- CONSTRUCTORS
				- ASSIGN & CLEAR
		============================================================
			CONSTURCTORS
		--------------------------------------------------------- */
		/**
		 * Default Constructor.
		 */
		public constructor();

		/**
		 * Construct from compare.
		 * 
		 * @param compare A binary predicate determines order of elements.
		 */
		public constructor(compare: (left: T, right: T) => boolean);

		/**
		 * Contruct from elements.
		 *
		 * @param array Elements to be contained.
		 */
		public constructor(array: Array<T>);

		/**
		 * Contruct from elements with compare.
		 *
		 * @param array Elements to be contained.
		 * @param compare A binary predicate determines order of elements.
		 */
		public constructor(array: Array<T>, compare: (left: T, right: T) => boolean);

		/**
		 * Copy Constructor.
		 */
		public constructor(container: base.Container<T>);

		/**
		 * Copy Constructor with compare.
		 * 
		 * @param container A container to be copied.
		 * @param compare A binary predicate determines order of elements.
		 */
		public constructor(container: base.Container<T>, compare: (left: T, right: T) => boolean);

		/**
		 * Range Constructor.
		 *
		 * @param begin Input interator of the initial position in a sequence.
		 * @param end Input interator of the final position in a sequence.
		 */
		public constructor(begin: base.Iterator<T>, end: base.Iterator<T>);

		/**
		 * Range Constructor with compare.
		 * 
		 * @param begin Input interator of the initial position in a sequence.
		 * @param end Input interator of the final position in a sequence.
		 * @param compare A binary predicate determines order of elements.
		 */
		public constructor
			(
				begin: base.Iterator<T>, end: base.Iterator<T>,
				compare: (left: T, right: T) => boolean
			);

		public constructor(...args: any[])
		{
			// CONSTRUCT UNDERLYING CONTAINER WITH COMPARE
			let compare: (left: T, right: T) => boolean;

			if (args.length == 0 || args[args.length - 1] instanceof Function == false)
				compare = std.greater;
			else
				compare = args[args.length - 1];

			this.container_ = new TreeMultiSet(compare);

			// OVERLOADINGS
			if (args.length >= 1 && args[0] instanceof Array)
			{
				this.construct_from_array(args[0]);
			}
			else if (args.length >= 1 && args[0] instanceof base.SetContainer)
			{
				this.construct_from_container(args[0]);
			}
			else if (args.length >= 2 && args[0] instanceof SetIterator && args[1] instanceof SetIterator)
			{
				this.construct_from_range(args[0], args[1]);
			}
		}

		/**
		 * @hidden
		 */
		protected construct_from_array(items: Array<T>): void
		{
			for (let i: number = 0; i < items.length; i++)
				this.container_.push(...items);
		}

		/**
		 * @hidden
		 */
		protected construct_from_container(container: base.IContainer<T>): void
		{
			this.construct_from_range(container.begin(), container.end());
		}

		/**
		 * @hidden
		 */
		protected construct_from_range(begin: base.Iterator<T>, end: base.Iterator<T>): void
		{
			this.container_.assign(begin, end);
		}

		/* ---------------------------------------------------------
			ACCESSORS
		--------------------------------------------------------- */
		/**
		 * <p> Return size. </p>
		 * 
		 * <p> Returns the number of elements in the {@link PriorityQueue}. </p>
		 * 
		 * <p> This member function effectively calls member {@link IArray.size size} of the 
		 * {@link container_ underlying container} object. </p>
		 *
		 * @return The number of elements in the underlying 
		 */
		public size(): number
		{
			return this.container_.size();
		}

		/**
		 * <p> Test whether container is empty. </p>
		 * 
		 * <p> Returns whether the {@link PriorityQueue} is empty: i.e. whether its {@link size} is zero. </p>
		 * 
		 * <p> This member function effectively calls member {@link IARray.empty empty} of the 
		 * {@link container_ underlying container} object. </p>
		 */
		public empty(): boolean
		{
			return this.container_.empty();
		}

		/* ---------------------------------------------------------
			ELEMENTS I/O
		--------------------------------------------------------- */
		/**
		 * <p> Access top element. </p>
		 * 
		 * <p> Returns a constant reference to the top element in the {@link PriorityQueue}. </p>
		 * 
		 * <p> The top element is the element that compares higher in the {@link PriorityQueue}, and the next that is 
		 * removed from the container when {@link PriorityQueue.pop} is called. </p>
		 * 
		 * <p> This member function effectively calls member {@link IArray.front front} of the 
		 * {@link container_ underlying container} object. </p>
		 *
		 * @return A reference to the top element in the {@link PriorityQueue}.
		 */
		public top(): T
		{
			return this.container_.begin().value;
		}

		/**
		 * <p> Insert element. </p>
		 * 
		 * <p> Inserts a new element in the {@link PriorityQueue}. The content of this new element is initialized to 
		 * <i>val</i>.
		 * 
		 * <p> This member function effectively calls the member function {@link IArray.push_back push_back} of the 
		 * {@link container_ underlying container} object, and then reorders it to its location in the heap by calling 
		 * the <i>push_heap</i> algorithm on the range that includes all the elements of the  </p>
		 * 
		 * @param val Value to which the inserted element is initialized.
		 */
		public push(val: T): void
		{
			this.container_.insert(val);
		}

		/**
		 * <p> Remove top element. </p>
		 * 
		 * <p> Removes the element on top of the {@link PriorityQueue}, effectively reducing its {@link size} by one. 
		 * The element removed is the one with the highest (or lowest) value. </p>
		 * 
		 * <p> The value of this element can be retrieved before being popped by calling member 
		 * {@link PriorityQueue.top}. </p>
		 * 
		 * <p> This member function effectively calls the <i>pop_heap</i> algorithm to keep the heap property of 
		 * {@link PriorityQueue PriorityQueues} and then calls the member function {@link IArray.pop_back pop_back} of 
		 * the {@link container_ underlying container} object to remove the element. </p>
		 */
		public pop(): void
		{
			this.container_.erase(this.container_.begin());
		}

		/**
		 * <p> Swap contents. </p>
		 * 
		 * <p> Exchanges the contents of the container adaptor by those of <i>obj</i>, swapping both the 
		 * {@link container_ underlying container} value and their comparison function using the corresponding 
		 * {@link std.swap swap} non-member functions (unqualified). </p>
		 * 
		 * <p> This member function has a <i>noexcept</i> specifier that matches the combined <i>noexcept</i> of the 
		 * {@link IArray.swap swap} operations on the {@link container_ underlying container} and the comparison 
		 * functions. </p>
		 * 
		 * @param obj {@link PriorityQueue} container adaptor of the same type (i.e., instantiated with the same 
		 *			  template parameters, <b>T</b>). Sizes may differ.
		 */
		public swap(obj: PriorityQueue<T>): void
		{
			this.container_.swap(obj.container_);
		}
	}
}