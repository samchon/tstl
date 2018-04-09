/// <reference path="../API.ts" />

/// <reference path="../base/containers/MultiMap.ts" />
/// <reference path="../base/iterators/MapIterator.ts" />

namespace std
{
	/**
	 * Multiple-key Map based on Hash buckets.
	 * 
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export class HashMultiMap<Key, T>
		extends base.MultiMap<Key, T, HashMultiMap<Key, T>>
		implements base.IHashMap<Key, T, HashMultiMap<Key, T>>
	{
		/**
		 * @hidden
		 */
		private buckets_: base._MapHashBuckets<Key, T, HashMultiMap<Key, T>>;

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
		public constructor(items: IPair<Key, T>[], hash?: (key: Key) => number, equal?: (x: Key, y: Key) => boolean);
		
		/**
		 * Copy Constructor.
		 * 
		 * @param obj Object to copy. 
		 */
		public constructor(obj: HashMultiMap<Key, T>);
		
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
			first: Readonly<IForwardIterator<IPair<Key, T>>>, 
			last: Readonly<IForwardIterator<IPair<Key, T>>>, 
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
			if (args.length === 1 && args[0] instanceof HashMultiMap)
			{
				// PARAMETERS
				let container: std.HashMultiMap<Key, T> = args[0];
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
					let items: Array<IPair<Key, T>> = args[0];

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
					let first: Readonly<IForwardIterator<IPair<Key, T>>> = args[0];
					let last: Readonly<IForwardIterator<IPair<Key, T>>> = args[1];

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
			this.buckets_ = new base._MapHashBuckets(this, hash_function, key_eq);

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
		public swap(obj: HashMultiMap<Key, T>): void
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
		public find(key: Key): HashMultiMap.Iterator<Key, T>
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
				if (this.buckets_.key_eq()(it.first, key))
					++cnt;

			return cnt;
		}

		/**
		 * @inheritDoc
		 */
		public begin(): HashMultiMap.Iterator<Key, T>;
		/**
		 * @inheritDoc
		 */
		public begin(index: number): HashMultiMap.Iterator<Key, T>;
		public begin(index: number = null): HashMultiMap.Iterator<Key, T>
		{
			if (index === null)
				return super.begin();
			else
				return this.buckets_.at(index).front();
		}

		/**
		 * @inheritDoc
		 */
		public end(): HashMultiMap.Iterator<Key, T>;
		/**
		 * @inheritDoc
		 */
		public end(index: number): HashMultiMap.Iterator<Key, T>
		public end(index: number = null): HashMultiMap.Iterator<Key, T>
		{
			if (index === null)
				return super.end();
			else
				return this.buckets_.at(index).back().next();
		}

		/**
		 * @inheritDoc
		 */
		public rbegin(): HashMultiMap.ReverseIterator<Key, T>;
		/**
		 * @inheritDoc
		 */
		public rbegin(index: number): HashMultiMap.ReverseIterator<Key, T>;
		public rbegin(index: number = null): HashMultiMap.ReverseIterator<Key, T>
		{
			return this.end(index).reverse();
		}

		/**
		 * @inheritDoc
		 */
		public rend(): HashMultiMap.ReverseIterator<Key, T>;
		/**
		 * @inheritDoc
		 */
		public rend(index: number): HashMultiMap.ReverseIterator<Key, T>;
		public rend(index: number = null): HashMultiMap.ReverseIterator<Key, T>
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
		public bucket_size(index: number): number
		{
			return this.buckets_.at(index).size();
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
			this.buckets_.reserve(n);
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
		 * @inheritDoc
		 */
		public emplace(key: Key, val: T): HashMultiMap.Iterator<Key, T>
		{
			// INSERT
			let it = this["data_"].insert(this["data_"].end(), new Entry(key, val));

			this._Handle_insert(it, it.next()); // POST-PROCESS
			return it;
		}

		/**
		 * @inheritDoc
		 */
		public emplace_hint(hint: HashMultiMap.Iterator<Key, T>, key: Key, val: T): HashMultiMap.Iterator<Key, T>
		{
			// INSERT
			let it = this["data_"].insert(hint, new Entry(key, val));

			// POST-PROCESS
			this._Handle_insert(it, it.next());

			return it;
		}

		/**
		 * @hidden
		 */
		protected _Insert_by_range<L extends Key, U extends T, InputIterator extends Readonly<IForwardIterator<IPair<L, U>, InputIterator>>>
			(first: InputIterator, last: InputIterator): void
		{
			//--------
			// INSERTIONS
			//--------
			// PRELIMINARIES
			let entries: Array<Entry<Key, T>> = [];
			for (let it = first; !it.equals(last); it = it.next())
				entries.push(new Entry(it.value.first, it.value.second));
			
			// INSERT ELEMENTS
			let my_first = this["data_"].insert
				(
					this["data_"].end(), 
					new base._NativeArrayIterator(entries, 0), 
					new base._NativeArrayIterator(entries, entries.length)
				);

			//--------
			// HASHING INSERTED ITEMS
			//--------
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
		protected _Handle_insert(first: HashMultiMap.Iterator<Key, T>, last: HashMultiMap.Iterator<Key, T>): void
		{
			for (; !first.equals(last); first = first.next())
				this.buckets_.insert(first);
		}

		/**
		 * @hidden
		 */
		protected _Handle_erase(first: HashMultiMap.Iterator<Key, T>, last: HashMultiMap.Iterator<Key, T>): void
		{
			for (; !first.equals(last); first = first.next())
				this.buckets_.erase(first);
		}
	}
}

namespace std.HashMultiMap
{
	//----
	// PASCAL NOTATION
	//----
	// HEAD
	export type Iterator<Key, T> = base.MapIterator<Key, T, HashMultiMap<Key, T>>;
	export type ReverseIterator<Key, T> = base.MapReverseIterator<Key, T, HashMultiMap<Key, T>>;

	// BODY
	export const Iterator = base.MapIterator;
	export const ReverseIterator = base.MapReverseIterator;

	//----
	// SNAKE NOTATION
	//----
	// HEAD
	export type iterator<Key, T> = Iterator<Key, T>;
	export type reverse_iterator<Key, T> = ReverseIterator<Key, T>;

	// BODY
	export const iterator = Iterator;
	export const reverse_iterator = ReverseIterator;
}