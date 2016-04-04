namespace std.base.hash
{
	export class HashBuckets<T>
	{
		private buckets: Vector<Vector<T>>;
		private itemSize_: number;

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
			if (size < hash.MIN_SIZE)
				size = hash.MIN_SIZE;

			let prevMatrix: Vector<Vector<T>> = this.buckets;
			this.buckets = new Vector<Vector<T>>();

			for (let i: number = 0; i < size; i++)
				this.buckets.pushBack(new Vector<T>());

			for (let i: number = 0; i < prevMatrix.size(); i++)
				for (let j: number = 0; j < prevMatrix.at(i).size(); j++)
				{
					let val: T = prevMatrix.at(i).at(j);

					this.buckets.at(this.hashIndex(val)).pushBack(val);
					this.itemSize_++;
				}
		}

		public clear(): void
		{
			this.buckets = new Vector<Vector<T>>();
			this.itemSize_ = 0;

			for (let i: number = 0; i < hash.MIN_SIZE; i++)
				this.buckets.pushBack(new Vector<T>());
		}

		/* ---------------------------------------------------------
			ACCESSORS
		--------------------------------------------------------- */
		public size(): number
		{
			return this.buckets.size();
		}

		public itemSize(): number
		{
			return this.itemSize_;
		}


		public at(index: number): Vector<T>
		{
			return this.buckets.at(index);
		}

		private hashIndex(val: T): number
		{
			return hash.code(val) % this.buckets.size();
		}

		/* ---------------------------------------------------------
			ELEMENTS I/O
		--------------------------------------------------------- */
		public insert(val: T): void
		{
			this.buckets.at(this.hashIndex(val)).pushBack(val);

			if (++this.itemSize_ > this.buckets.size() * hash.MAX_RATIO)
				this.reserve(this.itemSize_ * hash.RATIO);
		}

		public erase(val: T): void
		{
			let hashes: Vector<T> = this.buckets.at(this.hashIndex(val));

			for (let i: number = 0; i < hashes.size(); i++)
				if (hashes.at(i) == val)
				{
					hashes.splice(i, 1);
					this.itemSize_--;

					break;
				}
		}
	}
}