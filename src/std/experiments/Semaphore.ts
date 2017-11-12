/// <reference path="../API.ts" />

namespace std.experiments
{
	export class Semaphore implements ILockable
	{
		/**
		 * @hidden
		 */
		private hold_count_: number;

		/**
		 * @hidden
		 */
		private locked_count_: number;

		/**
		 * @hidden
		 */
		private size_: number;

		/**
		 * @hidden
		 */
		private listeners_: Queue<Pair<IListener, number>>;

		/* ---------------------------------------------------------
			CONSTRUCTORS
		--------------------------------------------------------- */
		public constructor(size: number)
		{
			this.hold_count_ = 0;
			this.locked_count_ = 0;
			this.size_ = size;

			this.listeners_ = new Queue<Pair<IListener, number>>();
		}

		public size(): number
		{
			return this.size_;
		}

		/**
		 * @hidden
		 */
		private _Compute_excess_count(count: number): number
		{
			return Math.max(0, Math.min(this.locked_count_, this.size_) + count - this.size_);
		}

		/* ---------------------------------------------------------
			ACQURE & RELEASE
		--------------------------------------------------------- */
		public lock(): Promise<void>;
		public lock(count: number): Promise<void>;

		public lock(count: number = 1): Promise<void>
		{
			return new Promise<void>((resolve, reject) =>
			{
				let exceeded_count: number = this._Compute_excess_count(count);

				// INCREASE COUNT PROPERTIES
				this.hold_count_ += exceeded_count;
				this.locked_count_ += count;

				// BRANCH; KEEP OR GO?
				if (exceeded_count > 0)
					this.listeners_.push(make_pair(resolve, exceeded_count));
				else
					resolve();
			});
		}

		public try_lock(): boolean;
		public try_lock(count: number): boolean;

		public try_lock(count: number = 1): boolean
		{
			// ALL OR NOTHING
			if (this.locked_count_ + count > this.size_)
				return false;
			
			this.locked_count_ += count;
			return true;
		}

		public unlock(): void;
		public unlock(count: number): void;

		public unlock(count: number = 1): void
		{
			let resolved_count: number = Math.min(count, this.hold_count_);

			// DECREASE COUNT PROPERTIES
			this.hold_count_ -= resolved_count;
			this.locked_count_ -= count;

			while (resolved_count != 0)
			{
				let front: Pair<IListener, number> = this.listeners_.front();

				if (front.second > resolved_count)
				{
					front.second -= resolved_count;
					resolved_count = 0;
				}
				else
				{
					let fn: IListener = front.first;

					// POP AND DECREAE COUNT FIRST
					resolved_count -= front.second;
					this.listeners_.pop();

					fn(); // AND CALL LATER
				}
			}
		}
	}

	interface IListener
	{
		(): void;
	}
}