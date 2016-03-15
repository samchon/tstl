namespace std
{
	/**
	 * <p> FIFO queue. </p>
	 * 
	 * <p> {@link Queue}s are a type of container adaptor, specifically designed to operate in a FIFO 
	 * context (first-in first-out), where elements are inserted into one end of the container and extracted 
	 * from the other. </p>
	 * 
	 * <p> {@link Queue}s are implemented as containers adaptors, which are classes that use an encapsulated 
	 * object of a specific container class as its underlying container, providing a specific set of member 
	 * functions to access its elements. Elements are pushed into the {@link IDeque.back back()} of the specific 
	 * container and popped from its {@link IDeque.front front()}. </p>
	 * 
	 * <p> {@link data The underlying container} may be one of the standard container class template or some other 
	 * specifically designed container class. This underlying container shall support at least the following 
	 * operations: </p>
	 * 
	 * <ul>
	 *	<li> empty </li>
	 *	<li> size </li>
	 *	<li> front </li>
	 *	<li> back </li>
	 *	<li> pushBack </li>
	 *	<li> popFront </li>
	 * </ul>
	 * 
	 * <p> The standard container classes {@link Deque} and {@link List} fulfill these requirements. 
	 * By default, if no container class is specified for a particular {@link Queue} class instantiation, 
	 * the standard container {@link List} is used. </p>
	 * 
	 * <ul>
	 *	<li> Reference: http://www.cplusplus.com/reference/queue/queue/ </li>
	 * </ul>
	 * 
	 * @param <T> Type of elements.
	 * 
	 * @author Jeongho Nam
	 */
	export class Queue<T>
	{
		/**
		 * The <i>underlying object</i> for implementing the <i>FIFO</i> container.
		 */
		private data: base.container.IDeque<T>;

		/* ---------------------------------------------------------
			CONSTRUCTORS
		--------------------------------------------------------- */
		/**
		 * Default Constructor.
		 */
		public constructor();

		/**
		 * Copy Constructor.
		 */
		public constructor(container: Queue<T>);

		public constructor(queue: Queue<T> = null)
		{
			this.data = new List<T>();

			if (queue != null)
				this.data.assign(queue.data.begin(), queue.data.end());
		}

		/* ---------------------------------------------------------
			ACCESSORS
		--------------------------------------------------------- */
		/**
		 * <p> Return size. </p>
		 * <p> Returns the number of elements in the {@link Queue}. </p> 
		 *
		 * <p> This member function effectively calls member {@link IDeque.size size()} of the 
		 * {@link data underlying container} object. </p>
		 *
		 * @return The number of elements in the {@link data underlying container}.
		 */
		public size(): number
		{
			return this.data.size();
		}

		/**
		 * <p> Test whether container is empty. </p>
		 * <p> returns whether the {@link Queue} is empty: i.e. whether its <i>size</i> is zero. </p>
		 *
		 * <p> This member function efeectively calls member {@link IDeque.empty empty()} of the
		 * {@link data underlying container} object. </p>
		 *
		 * @return <code>true</code> if the {@link data underlying container}'s size is 0,
		 *		   <code>false</code> otherwise. </p>
		 */
		public empty(): boolean
		{
			return this.data.empty();
		}
		
		/**
		 * <p> Access next element. </p>
		 * <p> Returns a value of the next element in the {@link Queue}. </p>
		 *
		 * <p> The next element is the "oldest" element in the {@link Queue} and the same element that is 
		 * popped out from the queue when {@link pop Queue.pop()} is called. </p>
		 *
		 * <p> This member function effectively calls member {@link IDeque.front front()} of the 
		 * {@link data underlying container} object. </p>
		 *
		 * @return A value of the next element in the {@link Queue}.
		 */
		public front(): T
		{
			return this.data.front();
		}

		/**
		 * <p> Access last element. </p>
		 *
		 * <p> Returns a vaue of the last element in the queue. This is the "newest" element in the queue 
		 * (i.e. the last element pushed into the queue). </p>
		 *
		 * <p> This member function effectively calls the member function {@link IDeque.back back()} of the
		 * {@link data underlying container} object. </p>
		 *
		 * @return A value of the last element in the {@link Queue}.
		 */
		public back(): T
		{
			return this.data.back();
		}

		/* ---------------------------------------------------------
			ELEMENTS I/O
		--------------------------------------------------------- */
		/**
		 * <p> Insert element. </p>
		 *
		 * <p> Inserts a new element at the end of the {@link Queue}, after its current last element. 
		 * The content of this new element is initialized to val. </p>
		 *
		 * <p> This member function effectively calls the member function {@link IDeque.pushBack pushBack()} of 
		 * the {@link data underlying container} object. </p>
		 *
		 * @param val Value to which the inserted element is initialized.
		 */
		public push(val: T): void
		{
			this.data.pushBack(val);
		}

		/**
		 * <p> Remove next element. </p>
		 *
		 * <p> Removes the next element in the {@link Queue}, effectively reducing its size by one. </p>
		 *
		 * <p> The element removed is the "oldest" element in the {@link Queue} whose value can be retrieved 
		 * by calling member {@link front Queue.front()} </p>.
		 *
		 * <p> This member function effectively calls the member function {@link IDeque.popFront popFront()} of 
		 * the {@link data underlying container} object. </p>
		 */
		public pop(): void
		{
			this.data.popFront();
		}
	}
}