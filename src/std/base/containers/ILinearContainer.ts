namespace std.base
{
	/**
	 * Interface for linear containers.
	 * 
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export interface ILinearContainer<T, 
			SourceT extends IContainer<T, SourceT, IteratorT, ReverseIteratorT>, 
			IteratorT extends Iterator<T, SourceT, IteratorT, ReverseIteratorT>, 
			ReverseIteratorT extends ReverseIterator<T, SourceT, IteratorT, ReverseIteratorT>>
		extends IContainer<T, SourceT, IteratorT, ReverseIteratorT>
	{
		/* ---------------------------------------------------------
			CONSTRUCTORS
		--------------------------------------------------------- */
		/**
		 * Fill Assigner.
		 * 
		 * @param n Initial size.
		 * @param val Value to fill.
		 */
		assign(n: number, val: T): void;

		/**
		 * Range Assigner.
		 * 
		 * @param first Input iterator of the first position.
		 * @param last Input iterator of the last position.
		 */
		assign<U extends T, InputIterator extends Readonly<IForwardIterator<U, InputIterator>>>
			(first: InputIterator, last: InputIterator): void;

		/**
		 * Resize this {@link Vector} forcibly.
		 * 
		 * @param n New container size.
		 */
		resize(n: number): void;

		/* ---------------------------------------------------------
			ACCESSORS
		--------------------------------------------------------- */
		/**
		 * Get the first element.
		 * 
		 * @return The first element.
		 */
		front(): T;

		/**
		 * Change the first element.
		 */
		front(val: T): void;

		/**
		 * Get the last element.
		 * 
		 * @return The last element.
		 */
		back(): T;

		/**
		 * Change the last element.
		 */
		back(val: T): void;

		/* ---------------------------------------------------------
			ELEMENTS I/O
		--------------------------------------------------------- */
		/**
		 * Insert an element at the end.
		 * 
		 * @param val Value to insert.
		 */
		push_back(val: T): void;

		/**
		 * Erase the last element.
		 */
		pop_back(): void;

		/**
		 * Insert a single element.
		 * 
		 * @param pos Position to insert.
		 * @param val Value to insert.
		 * @return An iterator to the newly inserted element.
		 */
		insert(pos: IteratorT, val: T): IteratorT;

		/**
		 * Insert repeated elements.
		 * 
		 * @param pos Position to insert.
		 * @param n Number of elements to insert.
		 * @param val Value to insert repeatedly.
		 * @return An iterator to the first of the newly inserted elements.
		 */
		insert(pos: IteratorT, n: number, val: T): IteratorT;

		/**
		 * Insert range elements.
		 * 
		 * @param pos Position to insert.
		 * @param first Input iterator of the first position.
		 * @param last Input iteartor of the last position.
		 * @return An iterator to the first of the newly inserted elements.
		 */
		insert<U extends T, InputIterator extends Readonly<IForwardIterator<U, InputIterator>>>
			(pos: IteratorT, first: InputIterator, last: InputIterator): IteratorT;
	}
}
