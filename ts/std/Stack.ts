namespace std
{
	/**
	 * <p> LIFO stack. </p>
	 * 
	 * <p> {@link Stack}s are a type of container adaptor, specifically designed to operate in a LIFO context 
	 * (last-in first-out), where elements are inserted and extracted only from one end of the container. </p>
	 * 
	 * <p> {@link Stack}s are implemented as containers adaptors, which are classes that use an encapsulated 
	 * object of a specific container class as its <i>underlying container</i>, providing a specific set of member 
	 * functions to access its elements. Elements are pushed/popped from the {@link ILinearContainer.back back()} 
	 * of the {@link ILinearContainer specific container}, which is known as the top of the {@link Stack}. </p>
	 * 
	 * <p> {@link data The underlying container} may be any of the standard container class templates or some other 
	 * specifically designed container class. The container shall support the following operations: </p>
	 * 
	 * <ul>
	 *	<li> empty </li>
	 *	<li> size </li>
	 *	<li> front </li>
	 *	<li> back </li>
	 *	<li> pushBack </li>
	 *	<li> popBack </li>
	 * </ul>
	 * 
	 * <p> The standard container classes {@link Vector}, {@link Deque} and {@link List} fulfill these requirements. 
	 * By default, if no container class is specified for a particular {@link Stack} class instantiation, 
	 * the standard container {@link List} is used. </p>
	 * 
	 * <ul>
	 *	<li> Reference: http://www.cplusplus.com/reference/stack/stack/ </li>
	 * </ul>
	 * 
	 * @param <T> Type of elements.
	 * 
	 * @author Jeongho Nam
	 */
	export class Stack<T>
	{
		/**
		 * The <i>underlying object</i> for implementing the <i>LIFO</i> container.
		 */
		protected data: base.container.ILinearContainer<T>;

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
		public constructor(stack: Stack<T>);

		public constructor(stack: Stack<T> = null)
		{
			this.data = new List<T>();

			if (stack != null)
				this.data.assign(stack.data.begin(), stack.data.end());
		}

		/* ---------------------------------------------------------
			ACCESSORS
		--------------------------------------------------------- */
		/**
		 * <p> Return size. </p>
		 * <p> Returns the number of elements in the {@link Stack}. </p> 
		 *
		 * <p> This member function effectively calls member {@link ILinearContainer.size size()} of the 
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
		 * <p> returns whether the {@link Stack} is empty: i.e. whether its <i>size</i> is zero. </p>
		 *
		 * <p> This member function effectively calls member {@link ILinearContainer.empty empty()} of the
		 * {@link data underlying container} object. </p>
		 *
		 * @return <code>true</code> if the <i>underlying container</i>'s size is 0, 
		 *		   <code>false</code> otherwise. </p>
		 */
		public empty(): boolean
		{
			return this.data.empty();
		}

		/**
		 * <p> Access next element. </p>
		 *
		 * <p> Returns a value of the top element in the {@link Stack} </p>. 
		 *
		 * <p> Since {@link Stack}s are last-in first-out containers, the top element is the last element 
		 * inserted into the {@link Stack}. </p>
		 *
		 * <p> This member function effectively calls member {@link ILinearContainer.back back()} of the 
		 * {@link data underlying container} object. </p>
		 *
		 * @return A value of the top element in the {@link Stack}.
		 */
		public top(): T
		{
			return this.data.back();
		}

		/* ---------------------------------------------------------
			ELEMENTS I/O
		--------------------------------------------------------- */
		/**
		 * <p> Insert element. </p>
		 *
		 * <p> Inserts a new element at the top of the {@link Stack}, above its current top element. </p>
		 *
		 * <p> This member function effectively calls the member function 
		 * {@link ILinearContainer.pushBack pushBack()} of the {@link data underlying container} object. </p>
		 *
		 * @param val Value to which the inserted element is initialized.
		 */
		public push(val: T): void
		{
			this.data.pushBack(val);
		}

		/**
		 * <p> Remove top element. </p>
		 *
		 * <p> Removes the element on top of the {@link Stack}, effectively reducing its size by one. </p>
		 *
		 * <p> The element removed is the latest element inserted into the {@link Stack}, whose value can be 
		 * retrieved by calling member {@link top Stack.top()} </p>.
		 *
		 * <p> This member function effectively calls the member function 
		 * {@link ILinearContainer.popBack popBack()} of the {@link data underlying container} object. </p>
		 */
		public pop(): void
		{
			this.data.popBack();
		}
	}
}