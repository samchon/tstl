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
		private buckets_: base._SetHashBuckets<T, HashMultiSet<T>>;

		/* =========================================================
			CONSTRUCTORS & SEMI-CONSTRUCTORS
				- CONSTRUCTORS
				- ASSIGN & CLEAR
		============================================================
			CONSTURCTORS
		--------------------------------------------------------- */
		public constructor();
		public constructor(hash: (val: T) => number);
		public constructor(hash: (val: T) => number, equal: (x: T, y: T) => boolean);

		public constructor(items: T[]);
		public constructor(items: T[], hash: (val: T) => number);
		public constructor(items: T[], hash: (val: T) => number, equal: (x: T, y: T) => boolean);

		public constructor(container: HashMultiSet<T>);
		public constructor(first: Readonly<IForwardIterator<T>>, last: Readonly<IForwardIterator<T>>);
		public constructor(first: Readonly<IForwardIterator<T>>, last: Readonly<IForwardIterator<T>>, hash: (val: T) => number);
		public constructor(first: Readonly<IForwardIterator<T>>, last: Readonly<IForwardIterator<T>>, hash: (val: T) => number, equal: (x: T, y: T) => boolean);

		public constructor(...args: any[])
		{
			super();

			// DECLARE MEMBERS
			let hash_function: (val: T) => number = std.hash;
			let key_eq: (x: T, y: T) => boolean = std.equal_to;
			let post_process: () => void = null;

			//----
			// INITIALIZE MEMBERS AND POST-PROCESS
			//----
			// BRANCH - METHOD OVERLOADINGS
			if (args.length == 1 && args[0] instanceof HashMultiSet)
			{
				// PARAMETERS
				let container: std.HashMultiSet<T> = args[0];
				hash_function = container.hash_function();
				key_eq = container.key_eq();

				// COPY CONSTRUCTOR
				post_process = () =>
				{
					let first = container.begin();
					let last = container.end();

					this.assign(first, last);
				};
			}
			else if (args.length >= 1 && args[0] instanceof Array)
			{
				// FUNCTION TEMPLATES
				if (args.length >= 2)	hash_function = args[1];
				if (args.length == 3)	key_eq = args[2];

				// INITIALIZER LIST CONSTRUCTOR
				post_process = () =>
				{
					let items: T[] = args[0];

					this.reserve(items.length);
					this.push(...items);
				};
			}
			else if (args.length >= 2 && args[0].next instanceof Function && args[1].next instanceof Function)
			{
				// FUNCTION TEMPLATES
				if (args.length >= 3)	hash_function = args[2];
				if (args.length == 4)	key_eq = args[3];

				// RANGE CONSTRUCTOR
				post_process = () =>
				{
					let first: Readonly<IForwardIterator<T>> = args[0];
					let last: Readonly<IForwardIterator<T>> = args[1];

					this.assign(first, last);
				};
			}
			else
			{
				// FUNCTION TEMPLATES
				if (args.length >= 1)	hash_function = args[0];
				if (args.length == 2)	key_eq = args[1];
			}

			//----
			// DO PROCESS
			//----
			// CONSTRUCT BUCKET
			this.buckets_ = new base._SetHashBuckets(this, hash_function, key_eq);

			// ACT POST-PROCESS
			if (post_process != null)
				post_process();
		}

		/* ---------------------------------------------------------
			ASSIGN & CLEAR
		--------------------------------------------------------- */
		public clear(): void
		{
			this.buckets_.clear();

			super.clear();
		}

		public swap(obj: HashMultiSet<T>): void
		{
			// SWAP CONTENTS
			super.swap(obj);

			// SWAP BUCKETS
			[this.buckets_["source_"], obj.buckets_["source_"]] = [obj.buckets_["source_"], this.buckets_["source_"]];
			[this.buckets_, obj.buckets_] = [obj.buckets_, this.buckets_];
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
			return this.buckets_.find(key);
		}
		public count(key: T): number
		{
			// FIND MATCHED BUCKET
			let index = this.bucket(key);
			let bucket = this.buckets_.at(index);

			// ITERATE THE BUCKET
			let cnt: number = 0;
			for (let it of bucket)
				if (this.buckets_.key_eq()(it.value, key))
					++cnt;

			return cnt;
		}

		public begin(): HashMultiSet.Iterator<T>;
		public begin(index: number): HashMultiSet.Iterator<T>;
		public begin(index: number = null): HashMultiSet.Iterator<T>
		{
			if (index == null)
				return super.begin();
			else
				return this.buckets_.at(index).front();
		}

		public end(): HashMultiSet.Iterator<T>;
		public end(index: number): HashMultiSet.Iterator<T>
		public end(index: number = null): HashMultiSet.Iterator<T>
		{
			if (index == null)
				return super.end();
			else
				return this.buckets_.at(index).back().next();
		}

		public rbegin(): HashMultiSet.ReverseIterator<T>;
		public rbegin(index: number): HashMultiSet.ReverseIterator<T>;
		public rbegin(index: number = null): HashMultiSet.ReverseIterator<T>
		{
			return this.end(index).reverse();
		}

		public rend(): HashMultiSet.ReverseIterator<T>;
		public rend(index: number): HashMultiSet.ReverseIterator<T>;
		public rend(index: number = null): HashMultiSet.ReverseIterator<T>
		{
			return this.begin(index).reverse();
		}

		/* ---------------------------------------------------------
			HASH
		--------------------------------------------------------- */
		public bucket_count(): number
		{
			return this.buckets_.size();
		}
		public bucket_size(n: number): number
		{
			return this.buckets_.at(n).size();
		}
		public load_factor(): number
		{
			return this.buckets_.load_factor();
		}

		public hash_function(): (val: T) => number
		{
			return this.buckets_.hash_function();
		}
		public key_eq(): (x: T, y: T) => boolean
		{
			return this.buckets_.key_eq();
		}
		public bucket(key: T): number
		{
			return this.hash_function()(key) % this.buckets_.size();
		}

		public max_load_factor(): number;
		public max_load_factor(z: number): void;
		public max_load_factor(z: number = null): any
		{
			return this.buckets_.max_load_factor(z);
		}
		public reserve(n: number): void
		{
			this.buckets_.rehash(Math.ceil(n * this.max_load_factor()));
		}
		public rehash(n: number): void
		{
			if (n <= this.bucket_count())
				return;

			this.buckets_.rehash(n);
		}
		
		/* =========================================================
			ELEMENTS I/O
				- INSERT
				- POST-PROCESS
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
		protected _Insert_by_range<U extends T, InputIterator extends Readonly<IForwardIterator<U, InputIterator>>>
			(first: InputIterator, last: InputIterator): void
		{
			// INSERT ELEMENTS
			let my_first = this["data_"].insert(this["data_"].end(), first, last);

			// IF NEEDED, HASH_BUCKET TO HAVE SUITABLE SIZE
			if (this.size() > this.buckets_.capacity())
				this.reserve(Math.max(this.size(), this.buckets_.capacity() * 2));

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
				this.buckets_.insert(first);
		}

		/**
		 * @hidden
		 */
		protected _Handle_erase(first: HashMultiSet.Iterator<T>, last: HashMultiSet.Iterator<T>): void
		{
			for (; !first.equals(last); first = first.next())
				this.buckets_.erase(first);
		}
	}
}

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
