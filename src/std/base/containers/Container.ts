/// <reference path="../../API.ts" />

namespace std.base
{
	/**
	 * An abstract container.
	 * 
	 * <a href="http://samchon.github.io/tstl/images/class_diagram/abstract_containers.png" target="_blank"> 
	 * <img src="http://samchon.github.io/tstl/images/class_diagram/abstract_containers.png" style="max-width: 100%" /> 
	 * </a>
	 *
	 * ### Container properties
	 * <dl>
	 * 	<dt> Sequence </dt>
	 * 	<dd> Elements in sequence containers are ordered in a strict linear sequence. Individual elements are 
	 *		 accessed by their position in this sequence. </dd>
	 *
	 * 	<dt> Doubly-linked list </dt>
	 *	<dd> Each element keeps information on how to locate the next and the previous elements, allowing 
	 *		 constant time insert and erase operations before or after a specific element (even of entire ranges), 
	 *		 but no direct random access. </dd>
	 * </dl>
	 *
	 * @param <T> Type of elements.
	 * 
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export abstract class Container<T> implements Iterable<T>
	{
		/* =========================================================
			CONSTRUCTORS & SEMI-CONSTRUCTORS
				- CONSTRUCTORS
				- ASSIGN & CLEAR
		============================================================
			CONSTURCTORS
		--------------------------------------------------------- */
		/**
		 * Default Constructor.
		 */
		protected constructor()
		{
			// THIS IS ABSTRACT CLASS
			// NOTHING TO DO ESPECIALLY
		}

		/* ---------------------------------------------------------
			ASSIGN & CLEAR
		--------------------------------------------------------- */
		/**
		 * Assign new content to content.
		 *
		 * Assigns new contents to the container, replacing its current contents, and modifying its 
		 * {@link size} accordingly.
		 *
		 * @param begin Input interator of the initial position in a sequence.
		 * @param end Input interator of the final position in a sequence.
		 */
		public abstract assign<U extends T, InputIterator extends Iterator<U>>
			(begin: InputIterator, end: InputIterator): void;

		/**
		 * Clear content.
		 *
		 * Removes all elements from the Container, leaving the container with a size of 0.
		 */
		public clear(): void
		{
			this.erase(this.begin(), this.end());
		}
		
		/* =========================================================
			ACCESSORS
				- SIZE
				- ITERATORS
		============================================================
			SIZE
		--------------------------------------------------------- */
		/**
		 * Return the number of elements in the {@link Container}.
		 *
		 * @return The number of elements in the container.
		 */
		public abstract size(): number;
		
		/**
		 * Test whether the container is empty.
		 * Returns whether the container is empty (i.e. whether its size is 0).
		 *
		 * This function does not modify the container in any way. To clear the content of the container,
		 * see {@link clear clear()}.
		 *
		 * @return <code>true</code> if the container size is 0, <code>false</code> otherwise.
		 */
		public empty(): boolean
		{
			return this.size() == 0;
		}

		/* ---------------------------------------------------------
			ITERATORS
		--------------------------------------------------------- */
		/**
		 * Return iterator to beginning.
		 *
		 * Returns an iterator referring the first element in the 
		 *
		 * #### Note
		 * If the container is {@link empty}, the returned iterator is same with {@link end end()}.
		 *
		 * @return An iterator to the first element in the  The iterator containes the first element's value.
		 */
		public abstract begin(): Iterator<T>;

		/**
		 * Return iterator to end.
		 * Returns an iterator referring to the past-the-end element in the 
		 *
		 * The past-the-end element is the theoretical element that would follow the last element in the  
		 * It does not point to any element, and thus shall not be dereferenced.
		 *
		 * Because the ranges used by functions of the Container do not include the element reference by their 
		 * closing iterator, this function is often used in combination with {@link Container}.{@link begin} to 
		 * specify a range including all the elements in the container.
		 *
		 * #### Note
		 * Returned iterator from {@link Container}.{@link end} does not refer any element. Trying to accessing 
		 * element by the iterator will cause throwing exception ({@link OutOfRange}).
		 * 
		 * If the container is {@link empty}, this function returns the same as {@link Container}.{@link begin}. 
		 *
		 * 
		 * @return An iterator to the end element in the 
		 */
		public abstract end(): Iterator<T>;

		/**
		 * Return {@link ReverseIterator reverse iterator} to <i>reverse beginning</i>.
		 * 
		 * Returns a {@link ReverseIterator reverse iterator} pointing to the last element in the container (i.e., 
		 * its <i>reverse beginning</i>).
		 * 
		 * {@link ReverseIterator reverse iterators} iterate backwards: increasing them moves them towards the 
		 * beginning of the 
		 * 
		 * {@link rbegin} points to the element right before the one that would be pointed to by member {@link end}.
		 *
		 * 
		 * @return A {@link ReverseIterator reverse iterator} to the <i>reverse beginning</i> of the sequence 
		 */
		public abstract rbegin(): IReverseIterator<T>;

		/**
		 * Return {@link ReverseIterator reverse iterator} to <i>reverse end</i>.
		 * 
		 * Returns a {@link ReverseIterator reverse iterator} pointing to the theoretical element preceding the 
		 * first element in the container (which is considered its <i>reverse end</i>).
		 * 
		 * The range between {@link Container}.{@link rbegin} and {@link Container}.{@link rend} contains all 
		 * the elements of the container (in reverse order).
		 * 
		 * @return A {@link ReverseIterator reverse iterator} to the <i>reverse end</i> of the sequence 
		 */
		public abstract rend(): IReverseIterator<T>;

		/**
		 * To the `for of` statement.
		 * 
		 * The {@link [Symbol.iterator]} is a method returns an `IterableIterator` instance, who can implement the
		 * `for of` statement, supporting the *full-forward-iteration*. You don't need to call this method, but just
		 * use the `for of` statement such below:
		 * 
		 * ```typescript
		 * let container: std.base.Container<number>;
		 * container.push(1, 2, 3, 4);
		 * 
		 * for (let elem of container) // elem: number
		 *     console.log("An element in the container: " + elem);
		 * 
		 * //--------
		 * // elem is the element in the container
		 * //--------
		 * // An element in the container: 1
		 * // An element in the container: 2
		 * // An element in the container: 3
		 * // An element in the container: 4
		 * ```
		 * 
		 * @return An `IterableIterator` instance, but do not consider about it. Just use the `for of` statement.
		 */
		public [Symbol.iterator](): IterableIterator<T>
		{
			return new ForOfAdaptor<T>(this.begin(), this.end());
		}

		/* =========================================================
			ELEMENTS I/O
				- INSERT
				- ERASE
		============================================================
			INSERT
		--------------------------------------------------------- */
		/**
		 * Insert elements.
		 *
		 * Appends new elements to the container, and returns the new size of the 
		 * 
		 * @param items New elements to insert.
		 * 
		 * @return New size of the Container.
		 */
		public abstract push(...items: T[]): number;

		/**
		 * Insert an element.
		 *
		 * The container is extended by inserting a new element before the element at the specified
		 * <i>position</i>. This effectively increases the {@link Container.size container size} by the amount of
		 * elements inserted.
		 *
		 * @param position Position in the {@link Container} where the new element is inserted.
		 *				   {@link iterator} is a member type, defined as a {@link Iterator random access iterator}
		 *				   type that points to elements.
		 * @param val Value to be copied to the inserted element.
		 *
		 * @re
		public abstract insert(position: Iterator<T>, val: T): Iterator<T>;

		/* ---------------------------------------------------------
			ERASE
		--------------------------------------------------------- */
		/**
		 * Erase an element.
		 *
		 * Removes from the container a single element.
		 *
		 * This effectively reduces the container size by the number of element removed.
		 *
		 * @param position Iterator pointing to a single element to be removed from the Container.
		 *
		 * @return An iterator pointing to the element that followed the last element erased by the function 
		 *		   call. This is the {@link end Container.end} if the operation erased the last element in the 
		 *		   sequence.
		 */
		public abstract erase(position: Iterator<T>): Iterator<T>;

		/**
		 * Erase elements.
		 *
		 * Removes from the container a range of elements.
		 *
		 * This effectively reduces the container size by the number of elements removed.
		 *
		 * @param begin An iterator specifying a range of beginning to erase.
		 * @param end An iterator specifying a range of end to erase.
		 *
		 * @return An iterator pointing to the element that followed the last element erased by the function 
		 *		   call. This is the {@link end Container.end} if the operation erased the last element in 
		 *		   the sequence.
		 */
		public abstract erase<U extends T>(begin: Iterator<U>, end: Iterator<U>): Iterator<T>;

		/* ---------------------------------------------------------------
			UTILITIES
		--------------------------------------------------------------- */
		/**
		 * Swap content.
		 * 
		 * Exchanges the content of the container by the content of <i>obj</i>, which is another 
		 * {@link Container container} object with same type of elements. Sizes and container type may differ.
		 * 
		 * After the call to this member function, the elements in this container are those which were in <i>obj</i> 
		 * before the call, and the elements of <i>obj</i> are those which were in this. All iterators, references and 
		 * pointers remain valid for the swapped objects.
		 *
		 * Notice that a non-member function exists with the same name, {@link swap swap}, overloading that 
		 * algorithm with an optimization that behaves like this member function.
		 * 
		 * @param obj Another {@link Container container} of the same type of elements (i.e., instantiated 
		 *			  with the same template parameter, <b>T</b>) whose content is swapped with that of this 
		 *			  {@link Container container}.
		 */
		public swap(obj: Container<T>): void
		{
			let supplement: Vector<T> = new Vector<T>(this.begin(), this.end());

			this.assign(obj.begin(), obj.end());
			obj.assign(supplement.begin(), supplement.end());
		}
	}

	export interface IReverseIterator<T>
		extends ReverseIterator<T, Container<T>, Iterator<T>, IReverseIterator<T>>
	{
	}
}