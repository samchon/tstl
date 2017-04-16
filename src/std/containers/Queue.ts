/// <reference path="../API.ts" />

namespace std
{
	/**
	 * FIFO queue.
	 * 
	 * {@link Queue}s are a type of container adaptor, specifically designed to operate in a FIFO context 
	 * (first-in first-out), where elements are inserted into one end of the container and extracted from the other. 
	 * 
	 * {@link Queue}s are implemented as containers adaptors, which are classes that use an encapsulated object of 
	 * a specific container class as its underlying container, providing a specific set of member functions to access 
	 * its elements. Elements are pushed into the {@link IDeque.back back()} of the specific container and popped from 
	 * its {@link IDeque.front front()}.
	 * 
	 * {@link container_ The underlying container} may be one of the standard container class template or some 
	 * other specifically designed container class. This underlying container shall support at least the following 
	 * operations:
	 * 
	 * - {@link IDequeContainer.empty empty}
	 * - {@link IDequeContainer.size size}
	 * - {@link IDequeContainer.front front}
	 * - {@link IDequeContainer.back back}
	 * - {@link IDequeContainer.push_back push_back}
	 * - {@link IDequeContainer.pop_front pop_front}
	 * 
	 * The standard container classes {@link Deque} and {@link List} fulfill these requirements. 
	 * By default, if no container class is specified for a particular {@link Queue} class instantiation, the standard 
	 * container {@link List} is used.
	 * 
	 * <a href="http://samchon.github.io/tstl/images/class_diagram/linear_containers.png" target="_blank"> 
	 * <img src="http://samchon.github.io/tstl/images/class_diagram/linear_containers.png" style="max-width: 100%" /></a>
	 * 
	 * @param <T> Type of elements.
	 * 
	 * @reference http://www.cplusplus.com/reference/queue/queue
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export class Queue<T>
	{
		/**
		 * The <i>underlying object</i> for implementing the <i>FIFO</i> 
		 */
		private container_: base.IDequeContainer<T>;

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
			this.container_ = new List<T>();

			if (queue != null)
				this.container_.assign(queue.container_.begin(), queue.container_.end());
		}

		/* ---------------------------------------------------------
			ACCESSORS
		--------------------------------------------------------- */
		/**
		 * Return size.
		 * 
		 * Returns the number of elements in the {@link Queue}. 
		 *
		 * This member function effectively calls member {@link IDeque.size size()} of the 
		 * {@link container_ underlying container} object.
		 *
		 * @return The number of elements in the {@link container_ underlying container}.
		 */
		public size(): number
		{
			return this.container_.size();
		}

		/**
		 * Test whether container is empty.
		 * 
		 * returns whether the {@link Queue} is empty: i.e. whether its <i>size</i> is zero.
		 *
		 * This member function efeectively calls member {@link IDeque.empty empty()} of the 
		 * {@link container_ underlying container} object.
		 *
		 * @return <code>true</code> if the {@link container_ underlying container}'s size is 0, 
		 *		   <code>false</code> otherwise.
		 */
		public empty(): boolean
		{
			return this.container_.empty();
		}
		
		/**
		 * Access next element.
		 * 
		 * Returns a value of the next element in the {@link Queue}.
		 *
		 * The next element is the "oldest" element in the {@link Queue} and the same element that is popped out 
		 * from the queue when {@link pop Queue.pop()} is called.
		 *
		 * This member function effectively calls member {@link IDeque.front front()} of the 
		 * {@link container_ underlying container} object.
		 *
		 * @return A value of the next element in the {@link Queue}.
		 */
		public front(): T
		{
			return this.container_.front();
		}

		/**
		 * Access last element.
		 *
		 * Returns a vaue of the last element in the queue. This is the "newest" element in the queue (i.e. the 
		 * last element pushed into the queue).
		 *
		 * This member function effectively calls the member function {@link IDeque.back back()} of the
		 * {@link container_ underlying container} object.
		 *
		 * @return A value of the last element in the {@link Queue}.
		 */
		public back(): T
		{
			return this.container_.back();
		}

		/* ---------------------------------------------------------
			ELEMENTS I/O
		--------------------------------------------------------- */
		/**
		 * Insert element.
		 *
		 * Inserts a new element at the end of the {@link Queue}, after its current last element. 
		 * The content of this new element is initialized to <i>val</i>.
		 *
		 * This member function effectively calls the member function {@link IDeque.push_back push_back()} of the 
		 * {@link container_ underlying container} object.
		 *
		 * @param val Value to which the inserted element is initialized.
		 */
		public push(val: T): void
		{
			this.container_.push_back(val);
		}

		/**
		 * Remove next element.
		 *
		 * Removes the next element in the {@link Queue}, effectively reducing its size by one.
		 *
		 * The element removed is the "oldest" element in the {@link Queue} whose value can be retrieved by calling 
		 * member {@link front Queue.front()}.
		 *
		 * This member function effectively calls the member function {@link IDeque.pop_front pop_front()} of the 
		 * {@link container_ underlying container} object.
		 */
		public pop(): void
		{
			this.container_.pop_front();
		}

		/**
		 * Swap contents.
		 * 
		 * Exchanges the contents of the container adaptor (<i>this</i>) by those of <i>obj</i>.
		 * 
		 * This member function calls the non-member function {@link Container.swap swap} (unqualified) to swap 
		 * the {@link container_ underlying containers}.
		 * 
		 * @param obj Another {@link Queue} container adaptor of the same type (i.e., instantiated with the same 
		 *			  template parameter, <b>T</b>). Sizes may differ.
		 */
		public swap(obj: Queue<T>): void
		{
			this.container_.swap(obj.container_);
		}
	}
}