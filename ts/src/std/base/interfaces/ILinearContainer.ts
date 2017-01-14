namespace std.base
{
	/**
	 * An interface for linear containers. 
	 * 
	 * <a href="http://samchon.github.io/tstl/images/class_diagram/linear_containers.png" target="_blank"> 
	 * <img src="http://samchon.github.io/tstl/images/class_diagram/linear_containers.png" style="max-width: 100%" /></a> 
	 *
	 *
	 * @author Jeonngho Nam
	 */
	export interface ILinearContainer<T> 
		extends Container<T>
	{
		/* ---------------------------------------------------------
			CONSTRUCTORS
		--------------------------------------------------------- */
		/**
		 * @inheritdoc
		 */
		assign<U extends T, InputIterator extends Iterator<U>>
			(begin: InputIterator, end: InputIterator): void;
		
		/**
		 * Assign container content.
		 *
		 * Assigns new contents to the {@link IList container}, replacing its current contents, 
		 * and modifying its {@link size} accordingly.
		 *
		 * @param n New size for the 
		 * @param val Value to fill the container with. Each of the <u>n</u> elements in the container will 
		 *			  be initialized to a copy of this value.
		 */
		assign(n: number, val: T): void;

		/* ---------------------------------------------------------
			ACCESSORS
		--------------------------------------------------------- */
		/**
		 * Access first element.
		 * Returns a value of the first element in the {@link IList container}.
		 *
		 * Unlike member {@link end end()}, which returns an iterator just past this element, 
		 * this function returns a direct value.
		 *
		 * Calling this function on an {@link empty} {@link IList container} causes undefined behavior.
		 *
		 * @return A value of the first element of the {@link IList container}.
		 */
		front(): T;

		/**
		 * Access last element.
		 * Returns a value of the last element in the {@link IList container}.
		 *
		 * Unlike member {@link end end()}, which returns an iterator just past this element, 
		 * this function returns a direct value.
		 *
		 * Calling this function on an {@link empty} {@link IList container} causes undefined behavior.
		 *
		 * @return A value of the last element of the {@link IList container}.
		 */
		back(): T;

		/* ---------------------------------------------------------
			ELEMENTS I/O
		--------------------------------------------------------- */
		/**
		 * Add element at the end. 
		 *
		 * Adds a new element at the end of the {@link IList container}, after its current last element. 
		 * This effectively increases the {@link IList container} {@link size} by one.
		 *
		 * @param val Value to be copied to the new element.
		 */
		push_back(val: T): void;

		/**
		 * Delete last element.
		 * 
		 * Removes the last element in the {@link IList container}, effectively reducing the 
		 * {@link IList container} {@link size} by one.
		 */
		pop_back(): void;

		/**
		 * Insert an element.
		 *
		 * The {@link IList conatiner} is extended by inserting new element before the element at the 
		 * specified <i>position</i>, effectively increasing the {@link IList container} {@link size} by 
		 * one.
		 *
		 * @param position Position in the {@link IList container} where the new elements are inserted.
		 *				   {@link iterator} is a member type, defined as a {@link iterator random access iterator} 
		 *				   type that points to elements.
		 * @param val Value to be copied to the inserted element.
		 *
		 * @return An iterator that points to the newly inserted element.
		 */
		insert(position: Iterator<T>, val: T): Iterator<T>;

		/**
		 * Insert elements by range iterators.
		 *
		 * The {@link IList container} is extended by inserting new elements before the element at the 
		 * specified <i>position</i>, effectively increasing the {@link IList container} {@link size} by 
		 * the number of repeating elements </i>n</i>.
		 * 
		 * @param position Position in the {@link IList container} where the new elements are inserted.
		 *				   {@link iterator} is a member type, defined as a {@link iterator random access iterator} 
		 *				   type that points to elements.
		 * @param n Number of elements to insert. Each element is initialized to a copy of <i>val</i>.
		 * @param val Value to be copied (or moved) to the inserted elements.
		 *
		 * @return An iterator that points to the first of the newly inserted elements.
		 */
		insert(position: Iterator<T>, n: number, val: T): Iterator<T>;

		/**
		 * Insert elements by range iterators.
		 *
		 * The {@link IList container} is extended by inserting new elements before the element at the 
		 * specified <i>position</i>, effectively increasing the {@link IList container} {@link size} by 
		 * the number of elements inserted by range iterators.
		 *
		 * @param position Position in the {@link IList container} where the new elements are inserted.
		 *				   {@link iterator} is a member type, defined as a {@link iterator random access iterator} 
		 *				   type that points to elements.
		 * @param begin Input interator of the initial position in a sequence.
		 * @param end Input interator of the final position in a sequence.
		 *
		 * @return An iterator that points to the first of the newly inserted elements.
		 */
		insert<U extends T, InputIterator extends Iterator<U>>
			(position: Iterator<T>, begin: InputIterator, end: InputIterator): Iterator<T>;
	}

	/**
	 * An interface for iterators from linear containers.
	 * 
	 * {@link ILieanerIterator} is an bi-directional iterator which is created from the related 
	 * {@link ILinearContainer linear containers}. Not only accessing to {@link value} of the pointed element from 
	 * this {@link ILieanerIterator}, but also modifying the {@link value} is possible.
	 * 
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export interface ILinearIterator<T>
		extends Iterator<T>
	{
		/**
		 * @inheritdoc
		 */
		source(): ILinearContainer<T>;

		/**
		 * @inheritdoc
		 */
		value: T;

		/**
		 * @inheritdoc
		 */
		prev(): ILinearIterator<T>;

		/**
		 * @inheritdoc
		 */
		next(): ILinearIterator<T>;
	}
}