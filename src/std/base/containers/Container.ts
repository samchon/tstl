/// <reference path="../../API.ts" />

namespace std.base
{
	export abstract class Container<T, 
			SourceT extends IContainer<T, SourceT, IteratorT, ReverseIteratorT>,
			IteratorT extends Iterator<T, SourceT, IteratorT, ReverseIteratorT>,
			ReverseIteratorT extends ReverseIterator<T, SourceT, IteratorT, ReverseIteratorT>>
		implements Iterable<T>, IBidirectionalContainer<T, IteratorT, ReverseIteratorT>
	{
		/* ---------------------------------------------------------
			ASSIGN & CLEAR
		--------------------------------------------------------- */
		/**
		 * @inheritDoc
		 */
		public abstract assign<U extends T, InputIterator extends Readonly<IForwardIterator<U, InputIterator>>>
			(first: InputIterator, last: InputIterator): void;

		/**
		 * @inheritDoc
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
		 * @inheritDoc
		 */
		public abstract size(): number;
		
		/**
		 * @inheritDoc
		 */
		public empty(): boolean
		{
			return this.size() == 0;
		}

		/* ---------------------------------------------------------
			ITERATORS
		--------------------------------------------------------- */
		/**
		 * @inheritDoc
		 */
		public abstract begin(): IteratorT;

		/**
		 * @inheritDoc
		 */
		public abstract end(): IteratorT;

		/**
		 * @inheritDoc
		 */
		public rbegin(): ReverseIteratorT
		{
			return this.end().reverse();
		}

		/**
		 * @inheritDoc
		 */
		public rend(): ReverseIteratorT
		{
			return this.begin().reverse();
		}

		/**
		 * @inheritDoc
		 */
		public [Symbol.iterator](): IterableIterator<T>
		{
			return new ForOfAdaptor(this.begin(), this.end());
		}

		/* ---------------------------------------------------------
			ELEMENTS I/O
		--------------------------------------------------------- */
		/**
		 * @inheritDoc
		 */
		public abstract push(...items: T[]): number;

		/**
		 * @inheritDoc
		 */
		public abstract insert(pos: IteratorT, val: T): IteratorT;

		/**
		 * @inheritDoc
		 */
		public abstract erase(pos: IteratorT): IteratorT;

		/**
		 * @inheritDoc
		 */
		public abstract erase(first: IteratorT, last: IteratorT): IteratorT;

		/* ---------------------------------------------------------------
			UTILITIES
		--------------------------------------------------------------- */
		/**
		 * @inheritDoc
		 */
		public abstract swap(obj: SourceT): void;

		/**
		 * @inheritDoc
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