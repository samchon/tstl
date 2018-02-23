/// <reference path="../../API.ts" />

namespace std.base
{
	export abstract class Container<T, 
			Source extends IContainer<T>,
			Iterator extends IIterator<T>,
			ReverseIterator extends IReverseIterator<T>>
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
		public abstract assign<U extends T, InputIterator extends IForwardIterator<U>>
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
		public abstract begin(): Iterator;
		public abstract end(): Iterator;

		public abstract rbegin(): ReverseIterator;
		public abstract rend(): ReverseIterator;

		public [Symbol.iterator](): IterableIterator<T>
		{
			return new ForOfAdaptor<T>(this.begin(), this.end());
		}

		/* ---------------------------------------------------------
			ELEMENTS I/O
		--------------------------------------------------------- */
		public abstract push(...items: T[]): number;
		public abstract insert(position: Iterator, val: T): Iterator;

		public abstract erase(position: Iterator): Iterator;
		public abstract erase(begin: Iterator, end: Iterator): Iterator;

		/* ---------------------------------------------------------------
			UTILITIES
		--------------------------------------------------------------- */
		public abstract swap(obj: Source): void;

		public toJSON(): Array<T>
		{
			let ret: Array<T> = [];
			for (let elem of this)
				ret.push(elem);

			return ret;
		}
	}
}