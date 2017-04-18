/// <reference path="../API.ts" />

namespace std
{
	/**
	 * Priority queue.
	 * 
	 * {@link PriorityQueue Priority queues} are a type of container adaptors, specifically designed such that its
	 * first element is always the greatest of the elements it contains, according to some <i>strict weak ordering</i>
	 * criterion.
	 * 
	 * This context is similar to a <i>heap</i>, where elements can be inserted at any moment, and only the 
	 * <i>max heap</i> element can be retrieved (the one at the top in the {@link PriorityQueue priority queue}).
	 * 
	 * {@link PriorityQueue Priority queues} are implemented as <i>container adaptors</i>, which are classes that 
	 * use an encapsulated object of a specific container class as its {@link container_ underlying container}, 
	 * providing a specific set of member functions to access its elements. Elements are popped from the <i>"back"</i> 
	 * of the specific container, which is known as the <i>top</i> of the {@link PriorityQueue Priority queue}.
	 * 
	 * The {@link container_ underlying container} may be any of the standard container class templates or some 
	 * other specifically designed container class. The container shall be accessible through 
	 * {@link IArrayIterator random access iterators} and support the following operations:
	 * 
	 * - {@link IArrayContainer.empty empty()}
	 * - {@link IArrayContainer.size size()}
	 * - {@link IArrayContainer.front front()}
	 * - {@link IArrayContainer.push_back push_back()}
	 * - {@link IArrayContainer.pop_back pop_back()}
	 * 
	 * The standard container classes {@link Vector} and {@link Deque} fulfill these requirements. By default, if 
	 * no container class is specified for a particular {@link PriorityQueue} class instantiation, the standard 
	 * container {@link Vector} is used.
	 * 
	 * Support of {@link IArrayIterator random access iterators} is required to keep a heap structure internally 
	 * at all times. This is done automatically by the container adaptor by automatically calling the algorithm 
	 * functions <i>make_heap</i>, <i>push_heap</i> and <i>pop_heap</i> when needed.
	 * 
	 * @param <T> Type of the elements.
	 * 
	 * @reference http://www.cplusplus.com/reference/queue/priority_queue/
	 * @author Jeongho Nam
	 */
	export class PriorityQueue<T>
	{
		//--------
		// The <i>underlying container</i> for implementing the <i>priority queue</i>.
		//
		// Following standard definition from the C++ committee, the <i>underlying container</i> should be one of
		// {@link Vector} or {@link Deque}, however, I've adopted {@link TreeMultiSet} instead of them. Of course,
		// there are proper reasons for adapting the {@link TreeMultiSet} even violating standard advice.
		//
		// <i>Underlying container</i> of {@link PriorityQueue} must keep a condition; the highest (or lowest)
		// element must be placed on the terminal node for fast retrieval and deletion. To keep the condition with
		// {@link Vector} or {@link Deque}, lots of times will only be spent for re-arranging elements. It calls
		// rearrangement functions like <i>make_heap</i>, <i>push_heap</i> and <i>pop_head</i> for rearrangement.
		//
		// However, the {@link TreeMultiSet} container always keeps arrangment automatically without additional
		// operations and it even meets full criteria of {@link PriorityQueue}. Those are the reason why I've adopted
		// {@link TreeMultiSet} as the <i>underlying container</i> of {@link PriorityQueue}.
		//--------
		/**
		 * @hidden
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
		public constructor(begin: base.Iterator<T>, end: base.Iterator<T>, compare: (left: T, right: T) => boolean);

		public constructor(...args: any[])
		{
			// INIT MEMBER
			this.container_ = new TreeMultiSet<T>();

			if (args.length >= 1 && args[0] instanceof base.Container)
			{
				// COPY CONSTRUCTOR
				let container: base.Container<T> = args[0]; // PARAMETER
				if (args.length == 2) // SPECIFIED COMPARISON FUNCTION
					this.container_["tree_"]["compare_"] = (args[1]);

				this.container_.assign(container.begin(), container.end());
			}
			else if (args.length >= 1 && args[0] instanceof Array)
			{
				// INITIALIZER LIST CONSTRUCTOR
				let items: T[] = args[0]; // PARAMETER
				if (args.length == 2) // SPECIFIED COMPARISON FUNCTION
					this.container_["tree_"]["compare_"] = (args[1]);

				this.container_.push(...items);
			}
			else if (args.length >= 2 && args[0] instanceof base.Iterator && args[1] instanceof base.Iterator)
			{
				// RANGE CONSTRUCTOR
				let first: base.Iterator<T> = args[0]; // PARAMETER 1
				let last: base.Iterator<T> = args[1]; // PARAMETER 2
				if (args.length == 2) // SPECIFIED COMPARISON FUNCTION
					this.container_["tree_"]["compare_"] = (args[2]);

				this.container_.assign(first, last);
			}
			else if (args.length == 1)
			{
				// DEFAULT CONSTRUCTOR WITH SPECIFIED COMPARISON FUNCTION
				this.container_["tree_"]["compare_"] = (args[0]);
			}
		}

		/* ---------------------------------------------------------
			ACCESSORS
		--------------------------------------------------------- */
		/**
		 * Return size.
		 * 
		 * Returns the number of elements in the {@link PriorityQueue}.
		 * 
		 * This member function effectively calls member {@link IArrayContainer.size size} of the 
		 * {@link IArrayContainer underlying container} object.
		 *
		 * @return The number of elements in the underlying 
		 */
		public size(): number
		{
			return this.container_.size();
		}

		/**
		 * Test whether container is empty.
		 * 
		 * Returns whether the {@link PriorityQueue} is empty: i.e. whether its {@link size} is zero.
		 * 
		 * This member function effectively calls member {@link IARray.empty empty} of the 
		 * {@link IArrayContainer underlying container} object.
		 */
		public empty(): boolean
		{
			return this.container_.empty();
		}

		/* ---------------------------------------------------------
			ELEMENTS I/O
		--------------------------------------------------------- */
		/**
		 * Access top element.
		 * 
		 * Returns a constant reference to the top element in the {@link PriorityQueue}.
		 * 
		 * The top element is the element that compares higher in the {@link PriorityQueue}, and the next that is 
		 * removed from the container when {@link PriorityQueue.pop} is called.
		 * 
		 * This member function effectively calls member {@link IArrayContainer.front front} of the 
		 * {@link IArrayContainer underlying container} object.
		 *
		 * @return A reference to the top element in the {@link PriorityQueue}.
		 */
		public top(): T
		{
			return this.container_.begin().value;
		}

		/**
		 * Insert element.
		 * 
		 * Inserts a new element in the {@link PriorityQueue}. The content of this new element is initialized to 
		 * <i>val</i>.
		 * 
		 * This member function effectively calls the member function {@link IArrayContainer.push_back push_back} of the 
		 * {@link IArrayContainer underlying container} object, and then reorders it to its location in the heap by calling
		 * the <i>push_heap</i> algorithm on the range that includes all the elements of the 
		 * 
		 * @param val Value to which the inserted element is initialized.
		 */
		public push(val: T): void
		{
			this.container_.insert(val);
		}

		/**
		 * Remove top element.
		 * 
		 * Removes the element on top of the {@link PriorityQueue}, effectively reducing its {@link size} by one. 
		 * The element removed is the one with the highest (or lowest) value.
		 * 
		 * The value of this element can be retrieved before being popped by calling member 
		 * {@link PriorityQueue.top}.
		 * 
		 * This member function effectively calls the <i>pop_heap</i> algorithm to keep the heap property of 
		 * {@link PriorityQueue PriorityQueues} and then calls the member function {@link IArrayContainer.pop_back pop_back} of 
		 * the {@link IArrayContainer underlying container} object to remove the element.
		 */
		public pop(): void
		{
			this.container_.erase(this.container_.begin());
		}

		/**
		 * Swap contents.
		 * 
		 * Exchanges the contents of the container adaptor by those of <i>obj</i>, swapping both the 
		 * {@link IArrayContainer underlying container} value and their comparison function using the corresponding
		 * {@link swap swap} non-member functions (unqualified).
		 * 
		 * This member function has a <i>noexcept</i> specifier that matches the combined <i>noexcept</i> of the 
		 * {@link IArrayContainer.swap swap} operations on the {@link IArrayContainer underlying container} and the comparison
		 * functions.
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