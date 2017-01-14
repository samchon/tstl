/// <reference path="../../API.ts" />

namespace std.base
{
    /**
     * @hidden
     */
	export enum _Hash
	{
		MIN_SIZE = 10,
		RATIO = 1.0,
		MAX_RATIO = 2.0
	}

	/**
	 * @hidden
	 */
	export abstract class _HashBuckets<T>
	{
		private buckets_: Vector<Vector<T>>;
		private item_size_: number;

		/* ---------------------------------------------------------
			CONSTRUCTORS
		--------------------------------------------------------- */
		protected constructor()
		{
			this.clear();
        }

		public rehash(size: number): void
		{
			if (size < _Hash.MIN_SIZE)
				size = _Hash.MIN_SIZE;

			let prev_matrix: Vector<Vector<T>> = this.buckets_;
			this.buckets_ = new Vector<Vector<T>>();

			for (let i: number = 0; i < size; i++)
				this.buckets_.push_back(new Vector<T>());

			for (let i: number = 0; i < prev_matrix.size(); i++)
				for (let j: number = 0; j < prev_matrix.at(i).size(); j++)
				{
					let val: T = prev_matrix.at(i).at(j);
					let bucket = this.buckets_.at(this.hash_index(val));

					bucket.push_back(val);
					this.item_size_++;
				}
		}

		public clear(): void
		{
			this.buckets_ = new Vector<Vector<T>>();
			this.item_size_ = 0;

			for (let i: number = 0; i < _Hash.MIN_SIZE; i++)
				this.buckets_.push_back(new Vector<T>());
		}

		/* ---------------------------------------------------------
			ACCESSORS
		--------------------------------------------------------- */
		public size(): number
		{
			return this.buckets_.size();
		}

		public item_size(): number
		{
			return this.item_size_;
		}

		public capacity(): number
		{
			return this.buckets_.size() * _Hash.MAX_RATIO;
		}


		public at(index: number): Vector<T>
		{
			return this.buckets_.at(index);
		}

		public hash_index(val: T): number
		{
			return hash(val) % this.buckets_.size();
		}

		/* ---------------------------------------------------------
			ELEMENTS I/O
		--------------------------------------------------------- */
		public insert(val: T): void
		{
			this.buckets_.at(this.hash_index(val)).push_back(val);

			if (++this.item_size_ > this.capacity())
				this.rehash(this.item_size_ * _Hash.RATIO);
		}

		public erase(val: T): void
		{
			let bucket: Vector<T> = this.buckets_.at(this.hash_index(val));

			for (let i: number = 0; i < bucket.size(); i++)
				if (bucket.at(i) == val)
				{
					bucket.erase(bucket.begin().advance(i));
					this.item_size_--;

					break;
				}
		}
	}
}