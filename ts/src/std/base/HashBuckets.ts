/// <reference path="../API.ts" />

namespace std.base
{
	export enum Hash
	{
		MIN_SIZE = 10,
		RATIO = 1.0,
		MAX_RATIO = 2.0
	}

	/**
	 * <p> Hask buckets. </p>
	 * 
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export abstract class HashBuckets<T>
	{
		/**
		 * @hidden
		 */
		private buckets_: Vector<Vector<T>>;

		/**
		 * @hidden
		 */
		private item_size_: number;

		/* ---------------------------------------------------------
			CONSTRUCTORS
		--------------------------------------------------------- */
		/**
		 * Default Constructor.
		 */
		protected constructor()
		{
			this.clear();
		}

		/**
		 * <p> Reconstruction of hash table. </p>
		 * 
		 * <p> All the elements in the hash buckets are rearranged according to their hash value into the new set of 
		 * buckets. This may alter the order of iteration of elements within the container. </p>
		 *
		 * <p> Notice that {@link rehash rehashes} are automatically performed whenever its number of elements is going
		 * to greater than its own {@link capacity}. </p>
		 * 
		 * @param size Number of bucket size to rehash.
		 */
		public rehash(size: number): void
		{
			if (size < Hash.MIN_SIZE)
				size = Hash.MIN_SIZE;

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

			for (let i: number = 0; i < Hash.MIN_SIZE; i++)
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
			return this.buckets_.size() * Hash.MAX_RATIO;
		}


		public at(index: number): Vector<T>
		{
			return this.buckets_.at(index);
		}

		public hash_index(val: T): number
		{
			return std.hash(val) % this.buckets_.size();
		}

		/* ---------------------------------------------------------
			ELEMENTS I/O
		--------------------------------------------------------- */
		public insert(val: T): void
		{
			this.buckets_.at(this.hash_index(val)).push_back(val);

			if (++this.item_size_ > this.capacity())
				this.rehash(this.item_size_ * Hash.RATIO);
		}

		public erase(val: T): void
		{
			let bucket: Vector<T> = this.buckets_.at(this.hash_index(val));

			for (let i: number = 0; i < bucket.size(); i++)
				if (bucket.at(i) == val)
				{
					bucket.splice(i, 1);
					this.item_size_--;

					break;
				}
		}
	}
}