/// <reference path="../API.ts" />

namespace std.experiments
{
	export class Semaphore
	{
		private acquired_count_: number;
		private size_: number;

		private listeners_: Queue<Pair<()=>void, number>>;

		/* ---------------------------------------------------------
			CONSTRUCTORS
		--------------------------------------------------------- */
		public constructor(size: number)
		{
			this.acquired_count_ = 0;
			this.size_ = size;

			this.listeners_ = new Queue<Pair<()=>void, number>>();
		}

		public size(): number
		{
			return this.size_;
		}

		public expand(size: number): void
		{
			this.size_ = size;
		}

		/* ---------------------------------------------------------
			ACQURE & RELEASE
		--------------------------------------------------------- */
		public acquire(): Promise<void>;
		public acquire(count: number): Promise<void>;

		public acquire(count: number = 1): Promise<void>
		{
			return new Promise<void>((resolve, reject) =>
			{
				let prev_acqured_count: number = this.acquired_count_;
				this.acquired_count_ += count;

				if (prev_acqured_count + count <= this.size_)
					resolve();
				else
					this.listeners_.push(make_pair(resolve, count));
			});
		}

		public try_acquire(): boolean;
		public try_acquire(count: number): boolean;

		public try_acquire(count: number = 1): boolean
		{
			if (this.acquired_count_ + count > this.size_)
				return false;
			
			this.acquired_count_ += count;
			return true;
		}

		public release(): void;
		public release(count: number): void;

		public release(count: number = 1): void
		{
			this.acquired_count_ -= count;

			while (count != 0)
			{
				if (this.listeners_.front().second > count)
				{
					this.listeners_.front().second -= count;
					count = 0;
				}
				else
				{
					count -= this.listeners_.front().second;
					this.listeners_.front().first();

					this.listeners_.pop();
				}
			}
		}
	}
}
