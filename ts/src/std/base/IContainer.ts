/// <reference path="../API.ts" />

namespace std.base
{
	/**
	 * <p> An interface of  </p>
	 *
	 * <p> {@link IContainer} is an interface designed for sequence containers. Sequence containers of STL
	 * (Standard Template Library) are based on the {@link IContainer}. </p>
	 *
	 * <h3> Container properties </h3>
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
	export interface IContainer<T>
	{
		/* ---------------------------------------------------------------
			SEMI-CONSTRUCTORS
		--------------------------------------------------------------- */
		/**
		 * <p> Assign new content to content. </p>
		 *
		 * <p> Assigns new contents to the container, replacing its current contents, and modifying its 
		 * {@link size} accordingly. </p>
		 *
		 * @param begin Input interator of the initial position in a sequence.
		 * @param end Input interator of the final position in a sequence.
		 */
		assign<U extends T, InputIterator extends Iterator<U>>
			(begin: InputIterator, end: InputIterator): void;

		/**
		 * <p> Clear content. </p>
		 *
		 * <p> Removes all elements from the Container, leaving the container with a size of 0. </p>
		 */
		clear(): void;

		/* ---------------------------------------------------------------
			GETTERS
		--------------------------------------------------------------- */
		/**
		 * <p> Return iterator to beginning. </p>
		 *
		 * <p> Returns an iterator referring the first element in the  </p>
		 *
		 * <h4> Note </h4>
		 * <p> If the container is {@link empty}, the returned iterator is same with {@link end end()}. </p>
		 *
		 * @return An iterator to the first element in the  The iterator containes the first element's value.
		 */
		begin(): Iterator<T>;

		/**
		 * <p> Return iterator to end. </p>
		 * <p> Returns an iterator referring to the past-the-end element in the  </p>
		 *
		 * <p> The past-the-end element is the theoretical element that would follow the last element in the  
		 * It does not point to any element, and thus shall not be dereferenced. </p>
		 *
		 * <p> Because the ranges used by functions of the Container do not include the element reference by their 
		 * closing iterator, this function is often used in combination with {@link IContainer}.{@link begin} to 
		 * specify a range including all the elements in the  </p>
		 *
		 * <h4> Note </h4>
		 * <p> Returned iterator from {@link IContainer}.{@link end} does not refer any element. Trying to accessing 
		 * element by the iterator will cause throwing exception ({@link OutOfRange}). </p>
		 * 
		 * <p> If the container is {@link empty}, this function returns the same as {@link Container}.{@link begin}. 
		 * </p>
		 * 
		 * @return An iterator to the end element in the 
		 */
		end(): Iterator<T>;

		/**
		 * <p> Return {@link ReverseIterator reverse iterator} to <i>reverse beginning</i>. </p>
		 * 
		 * <p> Returns a {@link ReverseIterator reverse iterator} pointing to the last element in the container (i.e., 
		 * its <i>reverse beginning</i>). </p>
		 * 
		 * <p> {@link ReverseIterator reverse iterators} iterate backwards: increasing them moves them towards the 
		 * beginning of the  </p>
		 * 
		 * <p> {@link rbegin} points to the element right before the one that would be pointed to by member {@link end}.
		 * </p>
		 * 
		 * @return A {@link ReverseIterator reverse iterator} to the <i>reverse beginning</i> of the sequence 
		 */
		rbegin(): base.IReverseIterator<T>;

		/**
		 * <p> Return {@link ReverseIterator reverse iterator} to <i>reverse end</i>. </p>
		 * 
		 * <p> Returns a {@link ReverseIterator reverse iterator} pointing to the theoretical element preceding the 
		 * first element in the container (which is considered its <i>reverse end</i>). </p>
		 * 
		 * <p> The range between {@link IContainer}.{@link rbegin} and {@link IContainer}.{@link rend} contains all 
		 * the elements of the container (in reverse order).
		 * 
		 * @return A {@link ReverseIterator reverse iterator} to the <i>reverse end</i> of the sequence 
		 */
		rend(): base.IReverseIterator<T>;

		/**
		 * Return the number of elements in the Container.
		 *
		 * @return The number of elements in the 
		 */
		size(): number;

		/**
		 * <p> Test whether the container is empty. </p>
		 * <p> Returns whether the container is empty (i.e. whether its size is 0). </p>
		 *
		 * <p> This function does not modify the container in any way. To clear the content of the container,
		 * see {@link clear clear()}. </p>
		 *
		 * @return <code>true</code> if the container size is 0, <code>false</code> otherwise.
		 */
		empty(): boolean;

		/* ---------------------------------------------------------------
			ELEMENTS I/O
		--------------------------------------------------------------- */
		/**
		 * <p> Insert elements. </p>
		 *
		 * <p> Appends new elements to the container, and returns the new size of the  </p>
		 * 
		 * @param items New elements to insert.
		 * 
		 * @return New size of the Container.
		 */
		push<U extends T>(...items: U[]): number;

		/**
		 * <p> Insert an element. </p>
		 *
		 * <p> The container is extended by inserting a new element before the element at the specified 
		 * <i>position</i>. This effectively increases the {@link IContainer.size container size} by the amount of 
		 * elements inserted. </p>
		 *
		 * @param position Position in the {@link IContainer} where the new element is inserted.
		 *				   {@link iterator} is a member type, defined as a {@link Iterator random access iterator} 
		 *				   type that points to elements.
		 * @param val Value to be copied to the inserted element.
		 *
		 * @return An iterator that points to the newly inserted element.
		 */
		insert(position: Iterator<T>, val: T): Iterator<T>;

		/**
		 * <p> Erase an element. </p>
		 *
		 * <p> Removes from the container a single element. </p>
		 *
		 * <p> This effectively reduces the container size by the number of element removed. </p>
		 *
		 * @param position Iterator pointing to a single element to be removed from the Container.
		 *
		 * @return An iterator pointing to the element that followed the last element erased by the function 
		 *		   call. This is the {@link end Container.end} if the operation erased the last element in the 
		 *		   sequence.
		 */
		erase(position: Iterator<T>): Iterator<T>;

		/**
		 * <p> Erase elements. </p>
		 *
		 * <p> Removes from the container a range of elements. </p>
		 *
		 * <p> This effectively reduces the container size by the number of elements removed. </p>
		 *
		 * @param begin An iterator specifying a range of beginning to erase.
		 * @param end An iterator specifying a range of end to erase.
		 *
		 * @return An iterator pointing to the element that followed the last element erased by the function 
		 *		   call. This is the {@link end Container.end} if the operation erased the last element in 
		 *		   the sequence.
		 */
		erase(begin: Iterator<T>, end: Iterator<T>): Iterator<T>;

		/* ---------------------------------------------------------------
			UTILITIES
		--------------------------------------------------------------- */
		/**
		 * <p> Swap content. </p>
		 * 
		 * <p> Exchanges the content of the container by the content of <i>obj</i>, which is another 
		 * {@link IContainer container} object with same type of elements. Sizes and container type may differ. </p>
		 * 
		 * <p> After the call to this member function, the elements in this container are those which were in <i>obj</i> 
		 * before the call, and the elements of <i>obj</i> are those which were in this. All iterators, references and 
		 * pointers remain valid for the swapped objects. </p>
		 *
		 * <p> Notice that a non-member function exists with the same name, {@link std.swap swap}, overloading that 
		 * algorithm with an optimization that behaves like this member function. </p>
		 * 
		 * @param obj Another {@link IContainer container} of the same type of elements (i.e., instantiated 
		 *			  with the same template parameter, <b>T</b>) whose content is swapped with that of this 
		 *			  {@link container IContainer}.
		 */
		swap(obj: IContainer<T>): void;
	}

	export interface IReverseIterator<T>
		extends ReverseIterator<T, Iterator<T>, IReverseIterator<T>>
	{
	}
}