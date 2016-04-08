namespace std.base.container
{
	/**
	 * <p> Linear container. </p>
	 *
	 * @author Jeonngho Nam
	 */
	export interface ILinearContainer<T> 
		extends IContainer<T>
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
		 * <p> Assign container content. </p>
		 *
		 * <p> Assigns new contents to the {@link IList container}, replacing its current contents, 
		 * and modifying its {@link size} accordingly. </p>
		 *
		 * @param n New size for the container.
		 * @param val Value to fill the container with. Each of the <u>n</u> elements in the container will 
		 *			  be initialized to a copy of this value.
		 */
		assign(n: number, val: T): void;

		/* ---------------------------------------------------------
			ACCESSORS
		--------------------------------------------------------- */
		/**
		 * <p> Access first element. </p>
		 * <p> Returns a value of the first element in the {@link IList container}. </p>
		 *
		 * <p> Unlike member {@link end end()}, which returns an iterator just past this element, 
		 * this function returns a direct value. </p>
		 *
		 * <p> Calling this function on an {@link empty} {@link IList container} causes undefined behavior. </p>
		 *
		 * @return A value of the first element of the {@link IList container}.
		 */
		front(): T;

		/**
		 * <p> Access last element. </p>
		 * <p> Returns a value of the last element in the {@link IList container}. </p>
		 *
		 * <p> Unlike member {@link end end()}, which returns an iterator just past this element, 
		 * this function returns a direct value. </p>
		 *
		 * <p> Calling this function on an {@link empty} {@link IList container} causes undefined behavior. </p>
		 *
		 * @return A value of the last element of the {@link IList container}.
		 */
		back(): T;

		/* ---------------------------------------------------------
			ELEMENTS I/O
		--------------------------------------------------------- */
		/**
		 * <p> Add element at the end. </p> 
		 *
		 * <p> Adds a new element at the end of the {@link IList container}, after its current last element. 
		 * This effectively increases the {@link IList container} {@link size} by one. </p>
		 *
		 * @param val Value to be copied to the new element.
		 */
		push_back(val: T): void;

		/**
		 * <p> Delete last element. </p>
		 * 
		 * <p> Removes the last element in the {@link IList container}, effectively reducing the 
		 * {@link IList container} {@link size} by one. </p>
		 */
		pop_back(): void;

		/**
		 * <p> Insert an element. </p>
		 *
		 * <p> The {@link IList conatiner} is extended by inserting new element before the element at the 
		 * specified <i>position</i>, effectively increasing the {@link IList container} {@link size} by 
		 * one. </p>
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
		 * <p> Insert elements by range iterators. </p>
		 *
		 * <p> The {@link IList container} is extended by inserting new elements before the element at the 
		 * specified <i>position</i>, effectively increasing the {@link IList container} {@link size} by 
		 * the number of repeating elements </i>n</i>. </p>
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
		 * <p> Insert elements by range iterators. </p>
		 *
		 * <p> The {@link IList container} is extended by inserting new elements before the element at the 
		 * specified <i>position</i>, effectively increasing the {@link IList container} {@link size} by 
		 * the number of elements inserted by range iterators. </p>
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
}