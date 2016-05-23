namespace std
{
	/**
	 * <p> LIFO stack. </p>
	 * 
	 * <p> {@link Stack}s are a type of container adaptor, specifically designed to operate in a LIFO context 
	 * (last-in first-out), where elements are inserted and extracted only from one end of the  </p>
	 * 
	 * <p> {@link Stack}s are implemented as containers adaptors, which are classes that use an encapsulated object of 
	 * a specific container class as its <i>underlying container</i>, providing a specific set of member functions to 
	 * access its elements. Elements are pushed/popped from the {@link ILinearContainer.back back()} of the 
	 * {@link ILinearContainer specific container}, which is known as the top of the {@link Stack}. </p>
	 * 
	 * <p> {@link container_ The underlying container} may be any of the standard container class templates or some 
	 * other specifically designed container class. The container shall support the following operations: </p>
	 * 
	 * <ul>
	 *	<li> empty </li>
	 *	<li> size </li>
	 *	<li> front </li>
	 *	<li> back </li>
	 *	<li> push_back </li>
	 *	<li> pop_back </li>
	 * </ul>
	 * 
	 * <p> The standard container classes {@link Vector}, {@link Deque} and {@link List} fulfill these requirements. 
	 * By default, if no container class is specified for a particular {@link Stack} class instantiation, the standard 
	 * container {@link List} is used. </p>
	 * 
	 * <p> <img src="../assets/images/design/linear_containers.png" width="100%" /> </p>
	 * 
	 * @param <T> Type of elements.
	 * 
	 * @reference http://www.cplusplus.com/reference/stack/stack
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export class Stack<T>
	{
		/**
		 * The <i>underlying object</i> for implementing the <i>LIFO</i> 
		 */
		private container_: base.ILinearContainer<T>;

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
			this.container_ = new List<T>();

			if (stack != null)
				this.container_.assign(stack.container_.begin(), stack.container_.end());
		}

		/* ---------------------------------------------------------
			ACCESSORS
		--------------------------------------------------------- */
		/**
		 * <p> Return size. </p>
		 * 
		 * <p> Returns the number of elements in the {@link Stack}. </p> 
		 *
		 * <p> This member function effectively calls member {@link ILinearContainer.size size()} of the 
		 * {@link container_ underlying container} object. </p>
		 *
		 * @return The number of elements in the {@link container_ underlying container}.
		 */
		public size(): number
		{
			return this.container_.size();
		}

		/**
		 * <p> Test whether container is empty. </p>
		 * 
		 * <p> returns whether the {@link Stack} is empty: i.e. whether its <i>size</i> is zero. </p>
		 *
		 * <p> This member function effectively calls member {@link ILinearContainer.empty empty()} of the
		 * {@link container_ underlying container} object. </p>
		 *
		 * @return <code>true</code> if the <i>underlying container</i>'s size is 0, 
		 *		   <code>false</code> otherwise. </p>
		 */
		public empty(): boolean
		{
			return this.container_.empty();
		}

		/**
		 * <p> Access next element. </p>
		 *
		 * <p> Returns a value of the top element in the {@link Stack} </p>. 
		 *
		 * <p> Since {@link Stack}s are last-in first-out containers, the top element is the last element inserted into 
		 * the {@link Stack}. </p>
		 *
		 * <p> This member function effectively calls member {@link ILinearContainer.back back()} of the 
		 * {@link container_ underlying container} object. </p>
		 *
		 * @return A value of the top element in the {@link Stack}.
		 */
		public top(): T
		{
			return this.container_.back();
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
		 * {@link ILinearContainer.push_back push_back()} of the {@link container_ underlying container} object. </p>
		 *
		 * @param val Value to which the inserted element is initialized.
		 */
		public push(val: T): void
		{
			this.container_.push_back(val);
		}

		/**
		 * <p> Remove top element. </p>
		 *
		 * <p> Removes the element on top of the {@link Stack}, effectively reducing its size by one. </p>
		 *
		 * <p> The element removed is the latest element inserted into the {@link Stack}, whose value can be retrieved 
		 * by calling member {@link top Stack.top()} </p>.
		 *
		 * <p> This member function effectively calls the member function {@link ILinearContainer.pop_back pop_back()} 
		 * of the {@link container_ underlying container} object. </p>
		 */
		public pop(): void
		{
			this.container_.pop_back();
		}

		/**
		 * <p> Swap contents. </p>
		 * 
		 * <p> Exchanges the contents of the container adaptor (<i>this</i>) by those of <i>obj</i>. </p>
		 * 
		 * <p> This member function calls the non-member function {@link IContainer.swap swap} (unqualified) to swap 
		 * the {@link container_ underlying containers}. </p>
		 * 
		 * @param obj Another {@link Stack} container adaptor of the same type (i.e., instantiated with the same 
		 *			  template parameter, <b>T</b>). Sizes may differ. </p>
		 */
		public swap(obj: Stack<T>): void
		{
			this.container_.swap(obj.container_);
		}
	}
}