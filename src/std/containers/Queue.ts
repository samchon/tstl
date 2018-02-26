/// <reference path="../API.ts" />

namespace std
{
	export class Queue<T>
	{
		private source_: List<T>;

		/* ---------------------------------------------------------
			CONSTRUCTORS
		--------------------------------------------------------- */
		public constructor();

		public constructor(container: Queue<T>);

		public constructor(queue: Queue<T> = null)
		{
			this.source_ = new List<T>();

			if (queue != null)
				this.source_.assign(queue.source_.begin(), queue.source_.end());
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
		
		public front(): T
		{
			return this.source_.front();
		}

		public back(): T
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
			this.source_.pop_front();
		}

		public swap(obj: Queue<T>): void
		{
			[this.source_, obj.source_] = [obj.source_, this.source_];
		}
	}
}