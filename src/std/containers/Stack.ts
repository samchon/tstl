/// <reference path="../API.ts" />

namespace std
{
	export class Stack<T>
	{
		private container_: base.ILinearContainer<T>;

		/* ---------------------------------------------------------
			CONSTRUCTORS
		--------------------------------------------------------- */
		public constructor();

		public constructor(stack: Stack<T>);

		public constructor(stack: Stack<T> = null)
		{
			this.container_ = new List<T>();

			if (stack != null)
				this.container_.assign(stack.container_.begin(), stack.container_.end());
		}

		/* ---------------------------------------------------------
			ACCESSORS
		--------------------------------------------------------- */
		public size(): number
		{
			return this.container_.size();
		}

		public empty(): boolean
		{
			return this.container_.empty();
		}

		public top(): T
		{
			return this.container_.back();
		}

		/* ---------------------------------------------------------
			ELEMENTS I/O
		--------------------------------------------------------- */
		public push(val: T): void
		{
			this.container_.push_back(val);
		}

		public pop(): void
		{
			this.container_.pop_back();
		}

		public swap(obj: Stack<T>): void
		{
			this.container_.swap(obj.container_);
		}
	}
}