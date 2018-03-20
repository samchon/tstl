namespace std.base
{
	export interface IContainer<T, 
			SourceT extends IContainer<T, SourceT, IteratorT, ReverseIteratorT>,
			IteratorT extends Iterator<T, SourceT, IteratorT, ReverseIteratorT>,
			ReverseIteratorT extends ReverseIterator<T, SourceT, IteratorT, ReverseIteratorT>>
		extends IBidirectionalContainer<T, IteratorT, ReverseIteratorT>, 
			Iterable<T>, _IEmpty, _ISize, _IPush<T>
	{
		/* ---------------------------------------------------------
			ASSIGN & CLEAR
		--------------------------------------------------------- */
		/**
		 * Range Assigner.
		 * 
		 * @param first Input iteartor of the first position.
		 * @param last Input iterator of the last position.
		 */
		assign<U extends T, InputIterator extends Readonly<IForwardIterator<U, InputIterator>>>
			(first: InputIterator, last: InputIterator): void;

		/**
		 * Clear elements.
		 */
		clear(): void;

		/* =========================================================
			ACCESSORS
				- SIZE
				- ITERATORS
		============================================================
			SIZE
		--------------------------------------------------------- */
		/**
		 * @inheritDoc
		 */
		size(): number;
		
		/**
		 * @inheritDoc
		 */
		empty(): boolean;

		/* ---------------------------------------------------------
			ITERATORS
		--------------------------------------------------------- */
		/**
		 * Iterator to the first element.
		 * 
		 * @return Iterator to the first element.
		 */
		begin(): IteratorT;

		/**
		 * Iterator to the end.
		 * 
		 * @return Iterator to the end.
		 */
		end(): IteratorT;

		/**
		 * Reverse iterator to the first element in reverse.
		 */
		rbegin(): ReverseIteratorT;

		/**
		 * Reverse iterator to the reverse end.
		 */
		rend(): ReverseIteratorT;

		/**
		 * Native function for `for ... of` iteration.
		 * 
		 * @return For ... of iterator
		 */
		[Symbol.iterator](): IterableIterator<T>;

		/* ---------------------------------------------------------
			ELEMENTS I/O
		--------------------------------------------------------- */
		/**
		 * @inheritDoc
		 */
		push(...items: T[]): number;

		/**
		 * Insert a single element.
		 * 
		 * @param pos Position to insert.
		 * @param val Value to insert.
		 */
		insert(pos: IteratorT, val: T): IteratorT;

		/**
		 * Erase an element.
		 * 
		 * @param pos Position to erase.
		 * @return Iterator following the *pos*, strained by the erasing.
		 */
		erase(pos: IteratorT): IteratorT;

		/**
		 * Erase elements in range.
		 * 
		 * @param first Range of the first position to erase.
		 * @param last Rangee of the last position to erase.
		 * @return Iterator following the last removed element, strained by the erasing.
		 */
		erase(first: IteratorT, last: IteratorT): IteratorT;

		/* ---------------------------------------------------------------
			UTILITIES
		--------------------------------------------------------------- */
		/**
		 * Swap elements.
		 * 
		 * @param obj Target container to swap.
		 */
		swap(obj: SourceT): void;

		/**
		 * Native function for `JSON.stringify()`.
		 * 
		 * @return An array containing children elements.
		 */
		toJSON(): Array<T>;
	}
}