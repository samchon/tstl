namespace std.base.container
{
	/**
	 * <p> First-out container. </p>
	 *
	 * <p> <code>FOContainer</code> is an abstract class, a type of container adaptor, specifically designed to
	 * operate in a FIFO and LIFO, like <code>Queue</code> and <code>Stack</code>. </p>
	 *
	 * <p> <code>FOContainer</code>s are implemented as containers adaptors, which are classes that use an 
	 * encapsulated object of a specific container class as its <i>underlying container</i>, providing a specific 
	 * set of member functions to access its elements. Elements are pushed/popped from the <code>accessor</code>
	 * method of the (derived) specific container. </p>
	 *
	 * <p> The standard container classes {@link Deque} and {@link List} fulfill these requirements. 
	 * By default, if no container class is specified for a particular <code>FOContainer</code> class 
	 * instantiation, the standard container {@link List} is used. </p>
	 *
	 * @param <T> Type of elements.
	 * 
	 * @author Jeongho Nam
	 */
	export abstract class FOContainer<T>
	{
		/**
		 * The <i>underlying object</i> for implementing the <i>First-out</i>.
		 */
		protected data: List<T>;

		/* ---------------------------------------------------------
			CONSTRUCTORS
		--------------------------------------------------------- */
		/**
		 * Default Constructor.
		 */
		public constructor();

		/**
		 * Construct from a LIFO or FIFO container. 
		 *
		 * @param container An abstract container of LIFO and FIFO to copy.
		 */
		public constructor(container: FOContainer<T>);

		public constructor(container: FOContainer<T> = null)
		{
			this.data = new List<T>();

			if (container != null)
				this.data.assign(container.data.begin(), container.data.end());
		}

		/* ---------------------------------------------------------
			ACCESSORS
		--------------------------------------------------------- */
		/**
		 * <p> Return size. </p>
		 * <p> Returns the number of elements in the <code>FOStack</code>. </p> 
		 *
		 * <p> This member function effectively calls member {@link size} of the 
		 * <i>underlying container</i> object. </p>
		 *
		 * @return The number of elements in the <i>underlying container</i>.
		 */
		public size(): number
		{
			return this.data.size();
		}

		/**
		 * <p> Test whether container is empty. </p>
		 * <p> returns whether the <code>FOContainer</code> is empty: i.e. whether its <i>size</i> is zero. </p>
		 *
		 * <p> This member function efeectively calls member <code>empty()</code> of the 
		 * <i>underlying container</i> object. </p>
		 *
		 * @return <code>true</code> if the <i>underlying container</i>'s size is 0, 
		 *		   <code>false</code> otherwise. </p>
		 */
		public empty(): boolean
		{
			return this.data.empty();
		}

		/* ---------------------------------------------------------
			ELEMENTS I/O
		--------------------------------------------------------- */
		/**
		 * <p> Insert element. </p>
		 *
		 * <p> Inserts a new element at the first or last of the <code>FOContainer</code>. </p>
		 *
		 * <p> This member function effectively calls the member function <code>pushFront()</code> or 
		 * <code>pushBack()</code> of the <i>underlying container</i> object. </p>
		 *
		 * @param val Value to which the inserted element is initialized.
		 */
		public abstract push(val: T): void;

		/**
		 * <p> Remove next element. </p>
		 *
		 * <p> Removes the next element in the <code>FOContainer</code>, effectively reducing its size by one. </p>
		 *
		 * <p> The element removed is the "first" or "last" element in the <code>FOContainer</code> whose value 
		 * can be retrieved by calling member its derived <code>accessor</code> method. </p>.
		 *
		 * <p> This member function effectively calls the member function <code>popFront()</code>
		 * <code>popBack()</code> of the <i>underlying container</i> object. </p>
		 */
		public abstract pop(): void;
	}
}