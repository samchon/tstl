/// <reference path="API.ts" />

namespace std
{
	/**
	 * LIFO stack.
	 * 
	 * {@link Stack}s are a type of container adaptor, specifically designed to operate in a LIFO context 
	 * (last-in first-out), where elements are inserted and extracted only from one end of the 
	 * 
	 * {@link Stack}s are implemented as containers adaptors, which are classes that use an encapsulated object of 
	 * a specific container class as its <i>underlying container</i>, providing a specific set of member functions to 
	 * access its elements. Elements are pushed/popped from the {@link ILinearContainer.back back()} of the 
	 * {@link ILinearContainer specific container}, which is known as the top of the {@link Stack}.
	 * 
	 * {@link container_ The underlying container} may be any of the standard container class templates or some 
	 * other specifically designed container class. The container shall support the following operations:
	 * 
	 * - {@link ILinearContainer.empty empty}
	 * - {@link ILinearContainer.size size}
	 * - {@link ILinearContainer.front front}
	 * - {@link ILinearContainer.back back}
	 * - {@link ILinearContainer.push_back push_back}
	 * - {@link ILinearContainer.pop_back pop_back}
	 * 
	 * The standard container classes {@link Vector}, {@link Deque} and {@link List} fulfill these requirements. 
	 * By default, if no container class is specified for a particular {@link Stack} class instantiation, the standard 
	 * container {@link List} is used.
	 * 
	 * <a href="http://samchon.github.io/tstl/images/class_diagram/linear_containers.png" target="_blank"> 
	 * <img src="http://samchon.github.io/tstl/images/class_diagram/linear_containers.png" style="max-width: 100%" /></a>
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
		 * Return size.
		 * 
		 * Returns the number of elements in the {@link Stack}. 
		 *
		 * This member function effectively calls member {@link ILinearContainer.size size()} of the 
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
		 * returns whether the {@link Stack} is empty: i.e. whether its <i>size</i> is zero.
		 *
		 * This member function effectively calls member {@link ILinearContainer.empty empty()} of the
		 * {@link container_ underlying container} object.
		 *
		 * @return <code>true</code> if the <i>underlying container</i>'s size is 0, 
		 *		   <code>false</code> otherwise.
		 */
		public empty(): boolean
		{
			return this.container_.empty();
		}

		/**
		 * Access next element.
		 *
		 * Returns a value of the top element in the {@link Stack}. 
		 *
		 * Since {@link Stack}s are last-in first-out containers, the top element is the last element inserted into 
		 * the {@link Stack}.
		 *
		 * This member function effectively calls member {@link ILinearContainer.back back()} of the 
		 * {@link container_ underlying container} object.
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
		 * Insert element.
		 *
		 * Inserts a new element at the top of the {@link Stack}, above its current top element.
		 *
		 * This member function effectively calls the member function 
		 * {@link ILinearContainer.push_back push_back()} of the {@link container_ underlying container} object.
		 *
		 * @param val Value to which the inserted element is initialized.
		 */
		public push(val: T): void
		{
			this.container_.push_back(val);
		}

		/**
		 * Remove top element.
		 *
		 * Removes the element on top of the {@link Stack}, effectively reducing its size by one.
		 *
		 * The element removed is the latest element inserted into the {@link Stack}, whose value can be retrieved 
		 * by calling member {@link top Stack.top()}.
		 *
		 * This member function effectively calls the member function {@link ILinearContainer.pop_back pop_back()} 
		 * of the {@link container_ underlying container} object.
		 */
		public pop(): void
		{
			this.container_.pop_back();
		}

		/**
		 * Swap contents.
		 * 
		 * Exchanges the contents of the container adaptor (<i>this</i>) by those of <i>obj</i>.
		 * 
		 * This member function calls the non-member function {@link Container.swap swap} (unqualified) to swap 
		 * the {@link container_ underlying containers}.
		 * 
		 * @param obj Another {@link Stack} container adaptor of the same type (i.e., instantiated with the same 
		 *			  template parameter, <b>T</b>). Sizes may differ.
		 */
		public swap(obj: Stack<T>): void
		{
			this.container_.swap(obj.container_);
		}
	}
}