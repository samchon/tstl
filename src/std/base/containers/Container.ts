/// <reference path="../../API.ts" />

namespace std.base
{
	export abstract class Container<T> implements Iterable<T>
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
		public abstract begin(): Iterator<T>;

		public abstract end(): Iterator<T>;

		public abstract rbegin(): IReverseIterator<T>;

		public abstract rend(): IReverseIterator<T>;

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
		public abstract push(...items: T[]): number;

		public abstract insert(position: Iterator<T>, val: T): Iterator<T>;

		/* ---------------------------------------------------------
			ERASE
		--------------------------------------------------------- */
		public abstract erase(position: Iterator<T>): Iterator<T>;

		public abstract erase(begin: Iterator<T>, end: Iterator<T>): Iterator<T>;

		/* ---------------------------------------------------------------
			UTILITIES
		--------------------------------------------------------------- */
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