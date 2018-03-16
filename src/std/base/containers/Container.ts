/// <reference path="../../API.ts" />

namespace std.base
{
	export abstract class Container<T, 
			SourceT extends Container<T, SourceT, IteratorT, ReverseIteratorT>,
			IteratorT extends Iterator<T, SourceT, IteratorT, ReverseIteratorT>,
			ReverseIteratorT extends ReverseIterator<T, SourceT, IteratorT, ReverseIteratorT>>
		implements Iterable<T>, IBidirectionalContainer<T, IteratorT, ReverseIteratorT>
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
		public abstract assign<U extends T, InputIterator extends Readonly<IForwardIterator<U, InputIterator>>>
			(first: InputIterator, last: InputIterator): void;

		/**
		 * Clear elements.
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
		 * Number of elements in the container.
		 */
		public abstract size(): number;
		
		/**
		 * Test whether container is empty.
		 */
		public empty(): boolean
		{
			return this.size() == 0;
		}

		/* ---------------------------------------------------------
			ITERATORS
		--------------------------------------------------------- */
		/**
		 * Iterator to the first element.
		 * 
		 * @return Iterator to the first element.
		 */
		public abstract begin(): IteratorT;

		/**
		 * Iterator to the end.
		 * 
		 * @return Iterator to the end.
		 */
		public abstract end(): IteratorT;

		/**
		 * Reverse iterator to the first element in reverse.
		 */
		public rbegin(): ReverseIteratorT
		{
			return this.end().reverse();
		}

		/**
		 * Reverse iterator to the reverse end.
		 */
		public rend(): ReverseIteratorT
		{
			return this.begin().reverse();
		}

		/**
		 * Native function for `for ... of` iteration.
		 * 
		 * @return For ... of iterator
		 */
		public [Symbol.iterator](): IterableIterator<T>
		{
			return new ForOfAdaptor(this.begin(), this.end());
		}

		/* ---------------------------------------------------------
			ELEMENTS I/O
		--------------------------------------------------------- */
		/**
		 * Insert items at the end.
		 * 
		 * @param items Items to insert.
		 * @return Number of elements in the container after insertion.
		 */
		public abstract push(...items: T[]): number;

		/**
		 * Insert a single element.
		 * 
		 * @param pos Position to insert.
		 * @param val Value to insert.
		 */
		public abstract insert(pos: IteratorT, val: T): IteratorT;

		/**
		 * Erase an element.
		 * 
		 * @param pos Position to erase.
		 * @return Iterator following the *pos*, strained by the erasing.
		 */
		public abstract erase(pos: IteratorT): IteratorT;

		/**
		 * Erase elements in range.
		 * 
		 * @param first Range of the first position to erase.
		 * @param last Rangee of the last position to erase.
		 * @return Iterator following the last removed element, strained by the erasing.
		 */
		public abstract erase(first: IteratorT, last: IteratorT): IteratorT;

		/* ---------------------------------------------------------------
			UTILITIES
		--------------------------------------------------------------- */
		/**
		 * Swap elements.
		 * 
		 * @param obj Target container to swap.
		 */
		public abstract swap(obj: SourceT): void;

		/**
		 * Native function for `JSON.stringify()`.
		 * 
		 * @return An array containing children elements.
		 */
		public toJSON(): Array<T>
		{
			let ret: Array<T> = [];
			for (let elem of this)
				ret.push(elem);

			return ret;
		}
	}
}