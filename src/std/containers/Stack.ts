/// <reference path="../API.ts" />

namespace std
{
	export class Stack<T> 
		implements base.IAdaptorContainer<T, Stack<T>>
	{
		private source_: Vector<T>;

		/* ---------------------------------------------------------
			CONSTRUCTORS
		--------------------------------------------------------- */
		/**
		 * Default Constructor.
		 */
		public constructor();

		/**
		 * Copy Constructor.
		 * 
		 * @param obj Object to copy.
		 */
		public constructor(obj: Stack<T>);

		public constructor(obj: Stack<T> = null)
		{
			this.source_ = new Vector<T>();

			if (obj != null)
				this.source_.assign(obj.source_.begin(), obj.source_.end());
		}

		/* ---------------------------------------------------------
			ACCESSORS
		--------------------------------------------------------- */
		public size(): number
		{
			return this.source_.size();
		}

		public empty(): boolean
		{
			return this.source_.empty();
		}

		public top(): T
		{
			return this.source_.back();
		}

		/* ---------------------------------------------------------
			ELEMENTS I/O
		--------------------------------------------------------- */
		public push(...elems: T[]): void
		{
			this.source_.push(...elems);
		}

		public pop(): void
		{
			this.source_.pop_back();
		}

		public swap(obj: Stack<T>): void
		{
			[this.source_, obj.source_] = [obj.source_, this.source_];
		}
	}
}