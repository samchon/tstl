/// <reference path="../../API.ts" />

namespace std.base
{
	export abstract class Container<T, 
			SourceT extends Container<T, SourceT, IteratorT, ReverseIteratorT>,
			IteratorT extends Iterator<T, SourceT, IteratorT, ReverseIteratorT>,
			ReverseIteratorT extends ReverseIterator<T, SourceT, IteratorT, ReverseIteratorT>>
		implements Iterable<T>
	{
		/* =========================================================
			CONSTRUCTORS & SEMI-CONSTRUCTORS
				- CONSTRUCTORS
				- ASSIGN & CLEAR
		============================================================
			CONSTURCTORS
		--------------------------------------------------------- */
		protected constructor()
		{
			// THIS IS ABSTRACT CLASS
			// NOTHING TO DO ESPECIALLY
		}

		/* ---------------------------------------------------------
			ASSIGN & CLEAR
		--------------------------------------------------------- */
		public abstract assign<U extends T, InputIterator extends Readonly<IForwardIterator<U, InputIterator>>>
			(begin: InputIterator, end: InputIterator): void;

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
		public abstract size(): number;
		
		public empty(): boolean
		{
			return this.size() == 0;
		}

		/* ---------------------------------------------------------
			ITERATORS
		--------------------------------------------------------- */
		public abstract begin(): IteratorT;
		public abstract end(): IteratorT;

		public abstract rbegin(): ReverseIteratorT;
		public abstract rend(): ReverseIteratorT;

		public [Symbol.iterator](): IterableIterator<T>
		{
			return new ForOfAdaptor(this.begin(), this.end());
		}

		/* ---------------------------------------------------------
			ELEMENTS I/O
		--------------------------------------------------------- */
		public abstract push(...items: T[]): number;
		public abstract insert(position: IteratorT, val: T): IteratorT;

		public abstract erase(position: IteratorT): IteratorT;
		public abstract erase(begin: IteratorT, end: IteratorT): IteratorT;

		/* ---------------------------------------------------------------
			UTILITIES
		--------------------------------------------------------------- */
		public abstract swap(obj: SourceT): void;

		public toJSON(): Array<T>
		{
			let ret: Array<T> = [];
			for (let elem of this)
				ret.push(elem);

			return ret;
		}
	}
}