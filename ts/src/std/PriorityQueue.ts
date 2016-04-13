namespace std
{
	export class PriorityQueue<T>
	{
		private container_: TreeMultiSet<T>;

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
			return this.container_.begin().value;
		}

		public push(val: T): void
		{
			this.container_.insert(val);
		}

		public pop(): void
		{
			this.container_.erase(this.container_.begin());
		}

		public swap(obj: PriorityQueue<T>): void
		{
			this.container_.swap(obj.container_);
		}
	}
}