namespace std.base.container
{
	/**
	 * <p> Array container. </p>
	 *
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export interface IArray<T> 
		extends ILinearContainer<T>
	{
		/* ---------------------------------------------------------
			CONSTRUCTORS
		--------------------------------------------------------- */
		/**
		 * <p> Request a change in capacity. </p>
		 * 
		 * <p> Requests that the {@link IArray container} {@link capacity} be at least enough to contain 
		 * <i>n</i> elements. </p>
		 * 
		 * <p> If <i>n</i> is greater than the current {@link IArray container} {@link capacity}, the 
		 * function causes the {@link IArray container} to reallocate its storage increasing its 
		 * {@link capacity} to <i>n</i> (or greater). </p>
		 * 
		 * <p> In all other cases, the function call does not cause a reallocation and the 
		 * {@link IArray container} {@link capacity} is not affected. </p>
		 * 
		 * <p> This function has no effect on the {@link IArray container} {@link size} and cannot alter 
		 * its elements. </p>
		 *
		 * @param n Minimum {@link capacity} for the {@link IArray container}.
		 *			Note that the resulting vector {@link capacity} may be equal or greater than <i>n</i>.
		 */
		reserve(n: number): void;

		/* ---------------------------------------------------------
			ACCESSORS
		--------------------------------------------------------- */
		/**
		 * <p> Return size of allocated storage capacity. </p>
		 * 
		 * <p> Returns the size of the storage space currently allocated for the {@link IArray container}, 
		 * expressed in terms of elements. </p>
		 * 
		 * <p> This {@link capacity} is not necessarily equal to the {@link IArray container} {@link size}. 
		 * It can be equal or greater, with the extra space allowing to accommodate for growth without the 
		 * need to reallocate on each insertion. </p>
		 * 
		 * <p> Notice that this {@link capacity} does not suppose a limit on the {@link size} of the 
		 * {@link IArray container}. When this {@link capacity} is exhausted and more is needed, it is 
		 * automatically expanded by the {@link IArray container} (reallocating it storage space). 
		 * The theoretical limit on the {@link size} of a {@link IArray container} is given by member 
		 * {@link max_size}. </p>
		 * 
		 * <p> The {@link capacity} of a {@link IArray container} can be explicitly altered by calling member 
		 * {@link IArray.reserve}. </p>
		 *
		 * @return The size of the currently allocated storage capacity in the {@link IArray container}, 
		 *		   measured in terms of the number elements it can hold.
		 */
		capacity(): number;

		/**
		 * <p> Access element. </p>
		 * <p> Returns a value to the element at position <i>index</i> in the {@link IArray container}.</p>
		 *
		 * <p> The function automatically checks whether <i>index</i> is within the bounds of valid elements 
		 * in the {@link IArray container}, throwing an {@link OutOfRange} exception if it is not (i.e., 
		 * if <i>index</i> is greater or equal than its {@link size}). </p>
		 *
		 * @param index Position of an element in the container.
		 *				If this is greater than or equal to the {@link IArray container} {@link size}, an 
		 *				exception of type {@link OutOfRange} is thrown. Notice that the first 
		 *				element has a position of 0 (not 1).
		 *
		 * @return The element at the specified position in the container.
		 */
		at(index: number): T;

		/**
		 * <p> Modify element. </p>
		 * <p> Replaces an element at the specified position (<i>index</i>) in this {@link IArray container} 
		 * with the specified element (<i>val</i>). </p>
		 *
		 * <p> The function automatically checks whether <i>index</i> is within the bounds of valid elements 
		 * in the {@link IArray container}, throwing an {@link OutOfRange} exception if it is not (i.e., if 
		 * <i>index</i> is greater or equal than its {@link size}). </p>
		 * 
		 * @param index A specified position of the value to replace.
		 * @param val A value to be stored at the specified position.
		 *
		 * @return The previous element had stored at the specified position.
		 */
		set(index: number, val: T): void;
	}
}