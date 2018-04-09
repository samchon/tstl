/// <reference path="../API.ts" />

/// <reference path="../base/containers/MultiSet.ts" />
/// <reference path="../base/iterators/SetIterator.ts" />

namespace std
{
	/**
	 * Multiple-key Set based on Hash buckets.
	 * 
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export class HashMultiSet<Key>
		extends base.MultiSet<Key, HashMultiSet<Key>>
		implements base.IHashSet<Key, HashMultiSet<Key>>
	{
		/**
		 * @hidden
		 */
		private buckets_: base._SetHashBuckets<Key, HashMultiSet<Key>>;

		/* =========================================================
			CONSTRUCTORS & SEMI-CONSTRUCTORS
				- CONSTRUCTORS
				- ASSIGN & CLEAR
		============================================================
			CONSTURCTORS
		--------------------------------------------------------- */
		/**
		 * Default Constructor.
		 * 
		 * @param hash An unary function returns hash code. Default is {hash}.
		 * @param equal A binary function predicates two arguments are equal. Default is {@link equal_to}.
		 */
		public constructor(hash?: (key: Key) => number, equal?: (x: Key, y: Key) => boolean);
		
		/**
		 * Initializer Constructor.
		 * 
		 * @param items Items to assign.
		 * @param hash An unary function returns hash code. Default is {hash}.
		 * @param equal A binary function predicates two arguments are equal. Default is {@link equal_to}.
		 */
		public constructor(items: Key[], hash?: (key: Key) => number, equal?: (x: Key, y: Key) => boolean);
		
		/**
		 * Copy Constructor.
		 * 
		 * @param obj Object to copy. 
		 */
		public constructor(obj: HashMultiSet<Key>);

		/**
		 * Range Constructor.
		 * 
		 * @param first Input iterator of the first position.
		 * @param last Input iterator of the last position.
		 * @param hash An unary function returns hash code. Default is {hash}.
		 * @param equal A binary function predicates two arguments are equal. Default is {@link equal_to}.
		 */
		public constructor
		(
			first: Readonly<IForwardIterator<Key>>, 
			last: Readonly<IForwardIterator<Key>>, 
			hash?: (key: Key) => number, equal?: (x: Key, y: Key) => boolean
		);

		public constructor(...args: any[])
		{
			super();

			// DECLARE MEMBERS
			let hash_function: (key: Key) => number = std.hash;
			let key_eq: (x: Key, y: Key) => boolean = std.equal_to;
			let post_process: () => void = null;

			//----
			// INITIALIZE MEMBERS AND POST-PROCESS
			//----
			// BRANCH - METHOD OVERLOADINGS
			if (args.length === 1 && args[0] instanceof HashMultiSet)
			{
				// PARAMETERS
				let container: std.HashMultiSet<Key> = args[0];
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
				if (args.length === 3)	key_eq = args[2];

				// INITIALIZER LIST CONSTRUCTOR
				post_process = () =>
				{
					let items: Key[] = args[0];

					this.reserve(items.length);
					this.push(...items);
				};
			}
			else if (args.length >= 2 && args[0].next instanceof Function && args[1].next instanceof Function)
			{
				// FUNCTION TEMPLATES
				if (args.length >= 3)	hash_function = args[2];
				if (args.length === 4)	key_eq = args[3];

				// RANGE CONSTRUCTOR
				post_process = () =>
				{
					let first: Readonly<IForwardIterator<Key>> = args[0];
					let last: Readonly<IForwardIterator<Key>> = args[1];

					this.assign(first, last);
				};
			}
			else
			{
				// FUNCTION TEMPLATES
				if (args.length >= 1)	hash_function = args[0];
				if (args.length === 2)	key_eq = args[1];
			}

			//----
			// DO PROCESS
			//----
			// CONSTRUCT BUCKET
			this.buckets_ = new base._SetHashBuckets(this, hash_function, key_eq);

			// ACT POST-PROCESS
			if (post_process !==null)
				post_process();
		}

		/* ---------------------------------------------------------
			ASSIGN & CLEAR
		--------------------------------------------------------- */
		/**
		 * @inheritDoc
		 */
		public clear(): void
		{
			this.buckets_.clear();

			super.clear();
		}

		/**
		 * @inheritDoc
		 */
		public swap(obj: HashMultiSet<Key>): void
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
		/**
		 * @inheritDoc
		 */
		public find(key: Key): HashMultiSet.Iterator<Key>
		{
			return this.buckets_.find(key);
		}

		/**
		 * @inheritDoc
		 */
		public count(key: Key): number
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

		/**
		 * @inheritDoc
		 */
		public begin(): HashMultiSet.Iterator<Key>;
		/**
		 * @inheritDoc
		 */
		public begin(index: number): HashMultiSet.Iterator<Key>;
		public begin(index: number = null): HashMultiSet.Iterator<Key>
		{
			if (index === null)
				return super.begin();
			else
				return this.buckets_.at(index).front();
		}

		/**
		 * @inheritDoc
		 */
		public end(): HashMultiSet.Iterator<Key>;
		/**
		 * @inheritDoc
		 */
		public end(index: number): HashMultiSet.Iterator<Key>
		public end(index: number = null): HashMultiSet.Iterator<Key>
		{
			if (index === null)
				return super.end();
			else
				return this.buckets_.at(index).back().next();
		}

		/**
		 * @inheritDoc
		 */
		public rbegin(): HashMultiSet.ReverseIterator<Key>;
		/**
		 * @inheritDoc
		 */
		public rbegin(index: number): HashMultiSet.ReverseIterator<Key>;
		public rbegin(index: number = null): HashMultiSet.ReverseIterator<Key>
		{
			return this.end(index).reverse();
		}

		/**
		 * @inheritDoc
		 */
		public rend(): HashMultiSet.ReverseIterator<Key>;
		/**
		 * @inheritDoc
		 */
		public rend(index: number): HashMultiSet.ReverseIterator<Key>;
		public rend(index: number = null): HashMultiSet.ReverseIterator<Key>
		{
			return this.begin(index).reverse();
		}

		/* ---------------------------------------------------------
			HASH
		--------------------------------------------------------- */
		/**
		 * @inheritDoc
		 */
		public bucket_count(): number
		{
			return this.buckets_.size();
		}

		/**
		 * @inheritDoc
		 */
		public bucket_size(n: number): number
		{
			return this.buckets_.at(n).size();
		}

		/**
		 * @inheritDoc
		 */
		public load_factor(): number
		{
			return this.buckets_.load_factor();
		}

		/**
		 * @inheritDoc
		 */
		public hash_function(): (key: Key) => number
		{
			return this.buckets_.hash_function();
		}

		/**
		 * @inheritDoc
		 */
		public key_eq(): (x: Key, y: Key) => boolean
		{
			return this.buckets_.key_eq();
		}

		/**
		 * @inheritDoc
		 */
		public bucket(key: Key): number
		{
			return this.hash_function()(key) % this.buckets_.size();
		}

		/**
		 * @inheritDoc
		 */
		public max_load_factor(): number;
		/**
		 * @inheritDoc
		 */
		public max_load_factor(z: number): void;
		public max_load_factor(z: number = null): any
		{
			return this.buckets_.max_load_factor(z);
		}

		/**
		 * @inheritDoc
		 */
		public reserve(n: number): void
		{
			this.buckets_.rehash(Math.ceil(n * this.max_load_factor()));
		}
		
		/**
		 * @inheritDoc
		 */
		public rehash(n: number): void
		{
			if (n <= this.bucket_count())
				return;

			this.buckets_.rehash(n);
		}

		/**
		 * @hidden
		 */
		protected _Key_eq(x: Key, y: Key): boolean
		{
			return this.key_eq()(x, y);
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
		protected _Insert_by_key(key: Key): HashMultiSet.Iterator<Key>
		{
			// INSERT
			let it = this["data_"].insert(this["data_"].end(), key);

			this._Handle_insert(it, it.next()); // POST-PROCESS
			return it;
		}

		/**
		 * @hidden
		 */
		protected _Insert_by_hint(hint: HashMultiSet.Iterator<Key>, key: Key): HashMultiSet.Iterator<Key>
		{
			// INSERT
			let it = this["data_"].insert(hint, key);

			// POST-PROCESS
			this._Handle_insert(it, it.next());

			return it;
		}

		/**
		 * @hidden
		 */
		protected _Insert_by_range<U extends Key, InputIterator extends Readonly<IForwardIterator<U, InputIterator>>>
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
		protected _Handle_insert(first: HashMultiSet.Iterator<Key>, last: HashMultiSet.Iterator<Key>): void
		{
			for (; !first.equals(last); first = first.next())
				this.buckets_.insert(first);
		}

		/**
		 * @hidden
		 */
		protected _Handle_erase(first: HashMultiSet.Iterator<Key>, last: HashMultiSet.Iterator<Key>): void
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
	export type Iterator<Key> = base.SetIterator<Key, HashMultiSet<Key>>;
	export type ReverseIterator<Key> = base.SetReverseIterator<Key, HashMultiSet<Key>>;

	// BODY
	export const Iterator = base.SetIterator;
	export const ReverseIterator = base.SetReverseIterator;

	//----
	// SNAKE NOTATION
	//----
	// HEAD
	export type iterator<Key> = Iterator<Key>;
	export type reverse_iterator<Key> = ReverseIterator<Key>;

	// BODY
	export const iterator = Iterator;
	export const reverse_iterator = ReverseIterator;
}
