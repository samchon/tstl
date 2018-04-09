/// <reference path="../../API.ts" />

namespace std.base
{
	/**
	 * @hidden
	 */
	const MIN_BUCKET_COUNT = 10;

	/**
	 * @hidden
	 */
	const DEFAULT_MAX_FACTOR = 1.0;

	/**
	 * @hidden
	 */
	export abstract class _HashBuckets<T>
	{
		private buckets_: Vector<Vector<T>>;
		private item_size_: number;
		private max_load_factor_: number;

		/* ---------------------------------------------------------
			CONSTRUCTORS
		--------------------------------------------------------- */
		protected constructor()
		{
			this.clear();
			
			this.max_load_factor_ = DEFAULT_MAX_FACTOR;
		}

		public clear(): void
		{
			this.buckets_ = new Vector<Vector<T>>();
			this.item_size_ = 0;

			for (let i: number = 0; i < MIN_BUCKET_COUNT; ++i)
				this.buckets_.push_back(new Vector<T>());
		}

		public rehash(size: number): void
		{
			if (size < MIN_BUCKET_COUNT)
				size = MIN_BUCKET_COUNT;

			let prev_matrix: Vector<Vector<T>> = this.buckets_;
			this.buckets_ = new Vector<Vector<T>>();

			for (let i: number = 0; i < size; ++i)
				this.buckets_.push_back(new Vector<T>());

			for (let row of prev_matrix)
				for (let col of row)
				{
					let index: number = this.hash_index(col);
					let bucket: std.Vector<T> = this.buckets_.at(index);
					
					bucket.push_back(col);
					++this.item_size_;
				}
		}

		public reserve(size: number): void
		{
			this.item_size_ += size;

			if (this.item_size_ > this.capacity())
				this.rehash(Math.max(this.item_size_, this.capacity() * 2));
		}

		/* ---------------------------------------------------------
			ACCESSORS
		--------------------------------------------------------- */
		public size(): number
		{
			return this.buckets_.size();
		}
		public capacity(): number
		{
			return this.buckets_.size() * this.max_load_factor_;
		}


		public at(index: number): Vector<T>
		{
			return this.buckets_.at(index);
		}
		public abstract hash_index(val: T): number;

		public load_factor(): number
		{
			return this.item_size_ / this.size();
		}
		public max_load_factor(): number;
		public max_load_factor(z: number): void;
		public max_load_factor(z: number = null)
		{
			if (z === null)
				return this.max_load_factor_;
			else
				this.max_load_factor_ = z;
		}

		/* ---------------------------------------------------------
			ELEMENTS I/O
		--------------------------------------------------------- */
		public insert(val: T): void
		{
			let capacity: number = this.capacity();
			if (++this.item_size_ > capacity)
				this.rehash(capacity * 2);

			let index: number = this.hash_index(val);
			this.buckets_.at(index).push_back(val);
		}

		public erase(val: T): void
		{
			let index: number = this.hash_index(val);
			let bucket: Vector<T> = this.buckets_.at(index);

			for (let i: number = 0; i < bucket.size(); ++i)
				if (bucket.at(i) === val)
				{
					bucket.erase(bucket.begin().advance(i));
					--this.item_size_;

					break;
				}
		}
	}
}