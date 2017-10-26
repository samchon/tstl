/// <reference path="../API.ts" />

namespace std
{
	export class Queue<T>
	{
		private container_: base.IDequeContainer<T>;

		/* ---------------------------------------------------------
			CONSTRUCTORS
		--------------------------------------------------------- */
		public constructor();

		public constructor(container: Queue<T>);

		public constructor(queue: Queue<T> = null)
		{
			this.container_ = new List<T>();

			if (queue != null)
				this.container_.assign(queue.container_.begin(), queue.container_.end());
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
		
		public front(): T
		{
			return this.container_.front();
		}

		public back(): T
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
			this.container_.pop_front();
		}

		public swap(obj: Queue<T>): void
		{
			this.container_.swap(obj.container_);
		}
	}
}