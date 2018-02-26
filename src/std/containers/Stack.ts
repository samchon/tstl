/// <reference path="../API.ts" />

namespace std
{
	export class Stack<T>
	{
		private source_: List<T>;

		/* ---------------------------------------------------------
			CONSTRUCTORS
		--------------------------------------------------------- */
		public constructor();

		public constructor(stack: Stack<T>);

		public constructor(stack: Stack<T> = null)
		{
			this.source_ = new List<T>();

			if (stack != null)
				this.source_.assign(stack.source_.begin(), stack.source_.end());
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
		public push(val: T): void
		{
			this.source_.push_back(val);
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