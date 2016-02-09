/// <reference path="base/container/FOContainer.ts" />

namespace std
{
	/**
	 * <p> LIFO stack. </p>
	 * 
	 * <p> <code>Stack</code>s are a type of container adaptor, specifically designed to operate in a LIFO context 
	 * (last-in first-out), where elements are inserted and extracted only from one end of the container. </p>
	 * 
	 * <p> <code>Stack</code>s are implemented as containers adaptors, which are classes that use an encapsulated 
	 * object of a specific container class as its <i>underlying container</i>, providing a specific set of member 
	 * functions to access its elements. Elements are pushed/popped from the <code>back()</code> of the specific 
	 * container, which is known as the top of the <code>Stack</code>. </p>
	 * 
	 * <p> The underlying container may be any of the standard container class templates or some other 
	 * specifically designed container class. The container shall support the following operations: </p>
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
	 * <p> The standard container classes <code>Deque</code> and <code>List</code> fulfill these requirements. 
	 * By default, if no container class is specified for a particular <code>Stack</code> class instantiation, 
	 * the standard container <code>List</code> is used. </p>
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
		extends base.container.FOContainer<T>
	{
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
		 * @param container An abstract container of LIFO and FIFO.
		 */
		public constructor(container: base.container.FOContainer<T>);

		public constructor(container: base.container.FOContainer<T> = null)
		{
			super(container);
		}

		/* ---------------------------------------------------------
			ACCESSORS
		--------------------------------------------------------- */
		/**
		 * <p> Access next element. </p>
		 *
		 * <p> Returns a value of the top element in the <code>Stack</code> </p>. 
		 *
		 * <p> Since <code>Stack</code>s are last-in first-out containers, the top element is the last element 
		 * inserted into the <code>Stack</code>. </p>
		 *
		 * <p> This member function effectively calls member <code>back()</code> of the 
		 * <i>underlying container</i> object. </p> 
		 *
		 * @return A value of the top element in the <code>Stack</code>.
		 */
		public top(): T
		{
			return this.data.front();
		}

		/* ---------------------------------------------------------
			ELEMENTS I/O
		--------------------------------------------------------- */
		/**
		 * <p> Insert element. </p>
		 *
		 * <p> Inserts a new element at the top of the <code>Stack</code>, above its current top element. </p>
		 *
		 * <p> This member function effectively calls the member function <code>pushBack()</code> of the 
		 * <i>underlying container</i> object. </p>
		 *
		 * @param val Value to which the inserted element is initialized.
		 */
		public push(val: T): void
		{
			this.data.pushFront(val);
		}

		/**
		 * <p> Remove top element. </p>
		 *
		 * <p> Removes the element on top of the <code>Stack</code>, effectively reducing its size by one. </p>
		 *
		 * <p> The element removed is the latest element inserted into the <code>Stack</code>, whose value can be 
		 * retrieved by calling member <code>Stack::top()</code> </p>.
		 *
		 * <p> This member function effectively calls the member function <code>popBack()</code> of the 
		 * <i>underlying container</i> object. </p>
		 */
		public pop(): void
		{
			this.data.popFront();
		}
	}
}