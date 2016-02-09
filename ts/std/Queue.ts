/// <reference path="base/container/FOContainer.ts" />

namespace std
{
	/**
	 * <p> FIFO queue. </p>
	 * 
	 * <p> <code>Queue</code>s are a type of container adaptor, specifically designed to operate in a FIFO 
	 * context (first-in first-out), where elements are inserted into one end of the container and extracted 
	 * from the other. </p>
	 * 
	 * <p> <code>Queue</code>s are implemented as containers adaptors, which are classes that use an encapsulated 
	 * object of a specific container class as its underlying container, providing a specific set of member 
	 * functions to access its elements. Elements are pushed into the <code>back()</code> of the specific 
	 * container and popped from its <code>front()</code>. </p>
	 * 
	 * <p> The underlying container may be one of the standard container class template or some other specifically 
	 * designed container class. This underlying container shall support at least the following operations: </p>
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
	 * By default, if no container class is specified for a particular <code>Queue</code> class instantiation, 
	 * the standard container <code>List</code> is used. </p>
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
		 * <p> Returns a value of the next element in the <code>Queue</code>. </p>
		 *
		 * <p> The next element is the "oldest" element in the <code>Queue</code> and the same element that is 
		 * popped out from the queue when <code>Queue::pop()</code> is called. </p>
		 *
		 * <p> This member function effectively calls <code>member()</code> front of the <i>underlying container</i> sobject. </p>
		 *
		 * @return A value of the next element in the <code>Queue</code>.
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
		 * <p> This member function effectively calls member <code>back()</code> of the 
		 * <i>underlying container</i> object. </p>
		 *
		 * @return A value of the last element in the <code>Queue</code>.
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
		 * <p> Inserts a new element at the end of the <code>Queue</code>, after its current last element. 
		 * The content of this new element is initialized to val. </p>
		 *
		 * <p> This member function effectively calls the member function <code>pushBack()</code> of the 
		 * <i>underlying container</i> object. </p>
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
		 * <p> Removes the next element in the <code>Queue</code>, effectively reducing its size by one. </p>
		 *
		 * <p> The element removed is the "oldest" element in the <code>Queue</code> whose value can be retrieved 
		 * by calling member <code>Queue::front()</code> </p>.
		 *
		 * <p> This member function effectively calls the member function <code>popFront()</code> of the 
		 * <i>underlying container</i> object. </p>
		 */
		public pop(): void
		{
			this.data.popFront();
		}
	}
}