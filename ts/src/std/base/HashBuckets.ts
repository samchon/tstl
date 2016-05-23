namespace std.base
{
	/**
	 * <p> Hask buckets. </p>
	 * 
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export abstract class HashBuckets<T>
	{
		private buckets_: Vector<Vector<T>>;

		private item_size_: number;

		/* ---------------------------------------------------------
			CONSTRUCTORS
		--------------------------------------------------------- */
		/**
		 * Default Constructor.
		 */
		public constructor()
		{
			this.clear();
		}

		/**
		 * Reserve the bucket size.
		 *
		 * @param size Number of bucket size to reserve.
		 */
		public reserve(size: number): void
		{
			if (size < MIN_SIZE)
				size = MIN_SIZE;

			let prevMatrix: Vector<Vector<T>> = this.buckets_;
			this.buckets_ = new Vector<Vector<T>>();

			for (let i: number = 0; i < size; i++)
				this.buckets_.push_back(new Vector<T>());

			for (let i: number = 0; i < prevMatrix.size(); i++)
				for (let j: number = 0; j < prevMatrix.at(i).size(); j++)
				{
					let val: T = prevMatrix.at(i).at(j);
					let bucket = this.buckets_.at(this.hash_index(val));

					bucket.push_back(val);
					this.item_size_++;
				}
		}

		public clear(): void
		{
			this.buckets_ = new Vector<Vector<T>>();
			this.item_size_ = 0;

			for (let i: number = 0; i < MIN_SIZE; i++)
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

			if (++this.item_size_ > this.buckets_.size() * MAX_RATIO)
				this.reserve(this.item_size_ * RATIO);
		}

		public erase(val: T): void
		{
			let hashes: Vector<T> = this.buckets_.at(this.hash_index(val));

			for (let i: number = 0; i < hashes.size(); i++)
				if (hashes.at(i) == val)
				{
					hashes.splice(i, 1);
					this.item_size_--;

					break;
				}
		}
	}
}