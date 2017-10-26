/// <reference path="../API.ts" />

/// <reference path="../base/containers/MultiSet.ts" />
/// <reference path="../base/iterators/SetIterator.ts" />

namespace std
{
	export class HashMultiSet<T>
		extends base.MultiSet<T, HashMultiSet<T>>
		implements base.IHashSet<T, HashMultiSet<T>>
	{
		/**
		 * @hidden
		 */
		private hash_buckets_: base._SetHashBuckets<T, HashMultiSet<T>>;

		/* =========================================================
			CONSTRUCTORS & SEMI-CONSTRUCTORS
				- CONSTRUCTORS
				- ASSIGN & CLEAR
		============================================================
			CONSTURCTORS
		--------------------------------------------------------- */
		public constructor();

		public constructor(items: T[]);

		public constructor(container: HashMultiSet<T>);

		public constructor(begin: IForwardIterator<T>, end: IForwardIterator<T>);

		public constructor(...args: any[])
		{
			// INIT MEMBERS
			super();
			this.hash_buckets_ = new base._SetHashBuckets<T, HashMultiSet<T>>(this);

			// BRANCH - METHOD OVERLOADINGS
			if (args.length == 0)
			{
				// DO NOTHING
			}
			else if (args.length == 1 && args[0] instanceof HashMultiSet)
			{
				// COPY CONSTRUCTOR
				let container: HashMultiSet<T> = args[0];

				this.assign(container.begin(), container.end());
			}
			else if (args.length == 1 && args[0] instanceof Array)
			{
				// INITIALIZER LIST CONSTRUCTOR
				let items: T[] = args[0];

				this.rehash(items.length * base._Hash.RATIO);
				this.push(...items);
			}
			else if (args.length == 2 && args[0].next instanceof Function && args[1].next instanceof Function)
			{
				// RANGE CONSTRUCTOR
				let first: IForwardIterator<T> = args[0];
				let last: IForwardIterator<T> = args[1];

				this.assign(first, last);
			}
		}

		/* ---------------------------------------------------------
			ASSIGN & CLEAR
		--------------------------------------------------------- */
		public clear(): void
		{
			this.hash_buckets_.clear();

			super.clear();
		}

		/* =========================================================
			ACCESSORS
				- MEMBER
				- HASH
		============================================================
			MEMBER
		--------------------------------------------------------- */
		public find(key: T): HashMultiSet.Iterator<T>
		{
			return this.hash_buckets_.find(key);
		}

		public count(key: T): number
		{
			// FIND MATCHED BUCKET
			let index = hash(key) % this.hash_buckets_.size();
			let bucket = this.hash_buckets_.at(index);

			// ITERATE THE BUCKET
			let cnt: number = 0;
			for (let i = 0; i < bucket.size(); i++)
				if (equal_to(bucket.at(i).value, key))
					cnt++;

			return cnt;
		}

		public begin(): HashMultiSet.Iterator<T>;

		public begin(index: number): HashMultiSet.Iterator<T>;

		public begin(index: number = -1): HashMultiSet.Iterator<T>
		{
			if (index == -1)
				return super.begin();
			else
				return this.hash_buckets_.at(index).front();
		}

		public end(): HashMultiSet.Iterator<T>;

		public end(index: number): HashMultiSet.Iterator<T>

		public end(index: number = -1): HashMultiSet.Iterator<T>
		{
			if (index == -1)
				return super.end();
			else
				return this.hash_buckets_.at(index).back().next();
		}

		public rbegin(): HashMultiSet.ReverseIterator<T>;

		public rbegin(index: number): HashMultiSet.ReverseIterator<T>;

		public rbegin(index: number = -1): HashMultiSet.ReverseIterator<T>
		{
			if (index == -1)
				return super.rbegin();
			else
				return new base.SetReverseIterator<T, HashMultiSet<T>>(this.end(index));
		}

		public rend(): HashMultiSet.ReverseIterator<T>;

		public rend(index: number): HashMultiSet.ReverseIterator<T>;

		public rend(index: number = -1): HashMultiSet.ReverseIterator<T>
		{
			if (index == -1)
				return super.rend();
			else
				return new base.SetReverseIterator<T, HashMultiSet<T>>(this.begin(index));
		}

		/* ---------------------------------------------------------
			HASH
		--------------------------------------------------------- */
		public bucket_count(): number
		{
			return this.hash_buckets_.size();
		}

		public bucket_size(n: number): number
		{
			return this.hash_buckets_.at(n).size();
		}

		public max_load_factor(): number;

		public max_load_factor(z: number): void;

		public max_load_factor(z: number = -1): any
		{
			if (z == -1)
				return this.size() / this.bucket_count();
			else
				this.rehash(Math.ceil(this.bucket_count() / z));
		}

		public bucket(key: T): number
		{
			return hash(key) % this.hash_buckets_.size();
		}

		public reserve(n: number): void
		{
			this.hash_buckets_.rehash(Math.ceil(n * this.max_load_factor()));
		}

		public rehash(n: number): void
		{
			if (n <= this.bucket_count())
				return;

			this.hash_buckets_.rehash(n);
		}
		
		/* =========================================================
			ELEMENTS I/O
				- INSERT
				- POST-PROCESS
				- SWAP
		============================================================
			INSERT
		--------------------------------------------------------- */
		/**
		 * @hidden
		 */
		protected _Insert_by_val(val: T): HashMultiSet.Iterator<T>
		{
			// INSERT
			let it = this["data_"].insert(this["data_"].end(), val);

			this._Handle_insert(it, it.next()); // POST-PROCESS
			return it;
		}

		/**
		 * @hidden
		 */
		protected _Insert_by_hint(hint: HashMultiSet.Iterator<T>, val: T): HashMultiSet.Iterator<T>
		{
			// INSERT
			let it = this["data_"].insert(hint, val);

			// POST-PROCESS
			this._Handle_insert(it, it.next());

			return it;
		}

		/**
		 * @hidden
		 */
		protected _Insert_by_range<U extends T, InputIterator extends IForwardIterator<U>>
			(first: InputIterator, last: InputIterator): void
		{
			// INSERT ELEMENTS
			let my_first = this["data_"].insert(this["data_"].end(), first, last);

			// IF NEEDED, HASH_BUCKET TO HAVE SUITABLE SIZE
			if (this.size() > this.hash_buckets_.item_size() * base._Hash.MAX_RATIO)
				this.hash_buckets_.rehash(this.size() * base._Hash.RATIO);

			// POST-PROCESS
			this._Handle_insert(my_first, this.end());
		}

		/* ---------------------------------------------------------
			POST-PROCESS
		--------------------------------------------------------- */
		/**
		 * @hidden
		 */
		protected _Handle_insert(first: HashMultiSet.Iterator<T>, last: HashMultiSet.Iterator<T>): void
		{
			for (; !first.equals(last); first = first.next())
				this.hash_buckets_.insert(first);
		}

		/**
		 * @hidden
		 */
		protected _Handle_erase(first: HashMultiSet.Iterator<T>, last: HashMultiSet.Iterator<T>): void
		{
			for (; !first.equals(last); first = first.next())
				this.hash_buckets_.erase(first);
		}

		/* ---------------------------------------------------------
			SWAP
		--------------------------------------------------------- */
		public swap(obj: HashMultiSet<T>): void
		{
			// SWAP CONTENTS
			super.swap(obj);

			// SWAP BUCKETS
			[this.hash_buckets_["source_"], obj.hash_buckets_["source_"]] = [obj.hash_buckets_["source_"], this.hash_buckets_["source_"]];
			[this.hash_buckets_, obj.hash_buckets_] = [obj.hash_buckets_, this.hash_buckets_];
		}
	}
}

/**
 * @hidden
 */
namespace std.HashMultiSet
{
	//----
	// PASCAL NOTATION
	//----
	// HEAD
	export type Iterator<T> = base.SetIterator<T, HashMultiSet<T>>;
	export type ReverseIterator<T> = base.SetReverseIterator<T, HashMultiSet<T>>;

	// BODY
	export var Iterator = base.ArrayIterator;
	export var ReverseIterator = base.ArrayReverseIterator;

	//----
	// SNAKE NOTATION
	//----
	// HEAD
	export type iterator<T> = Iterator<T>;
	export type reverse_iterator<T> = ReverseIterator<T>;

	// BODY
	export var iterator = Iterator;
	export var reverse_iterator = ReverseIterator;
}
