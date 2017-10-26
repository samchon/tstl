/// <reference path="../API.ts" />

/// <reference path="../base/containers/UniqueMap.ts" />
/// <reference path="../base/iterators/MapIterator.ts" />

namespace std
{
	export class HashMap<Key, T>
		extends base.UniqueMap<Key, T, HashMap<Key, T>>
		implements base.IHashMap<Key, T, HashMap<Key, T>>
	{
		/**
		 * @hidden
		 */
		private hash_buckets_: base._MapHashBuckets<Key, T, HashMap<Key, T>>;
	
		/* =========================================================
			CONSTRUCTORS & SEMI-CONSTRUCTORS
				- CONSTRUCTORS
				- ASSIGN & CLEAR
		============================================================
			CONSTURCTORS
		--------------------------------------------------------- */
		public constructor();

		public constructor(items: Array<IPair<Key, T>>);

		public constructor(container: HashMap<Key, T>);

		public constructor(begin: IForwardIterator<IPair<Key, T>>, end: IForwardIterator<IPair<Key, T>>);

		public constructor(...args: any[])
		{
			// INIT MEMBERS
			super();
			this.hash_buckets_ = new base._MapHashBuckets<Key, T, HashMap<Key, T>>(this);

			// BRANCH - METHOD OVERLOADINGS
			if (args.length == 0) 
			{
				// DO NOTHING
			}
			else if (args.length == 1 && args[0] instanceof HashMap)
			{
				// COPY CONSTRUCTOR
				let container: HashMap<Key, T> = args[0];

				this.assign(container.begin(), container.end());
			}
			else if (args.length == 1 && args[0] instanceof Array)
			{
				// INITIALIZER LIST CONSTRUCTOR
				let items: Array<IPair<Key, T>> = args[0];

				this.rehash(items.length * base._Hash.RATIO);
				this.push(...items);
			}
			else if (args.length == 2 && args[0].next instanceof Function && args[1].next instanceof Function)
			{
				// RANGE CONSTRUCTOR
				let first: IForwardIterator<IPair<Key, T>> = args[0];
				let last: IForwardIterator<IPair<Key, T>> = args[1];

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
		public find(key: Key): HashMap.Iterator<Key, T>
		{
			return this.hash_buckets_.find(key);
		}

		public begin(): HashMap.Iterator<Key, T>;

		public begin(index: number): HashMap.Iterator<Key, T>;

		public begin(index: number = -1): HashMap.Iterator<Key, T>
		{
			if (index == -1)
				return super.begin();
			else
				return this.hash_buckets_.at(index).front();
		}

		public end(): HashMap.Iterator<Key, T>;

		public end(index: number): HashMap.Iterator<Key, T>

		public end(index: number = -1): HashMap.Iterator<Key, T>
		{
			if (index == -1)
				return super.end();
			else
				return this.hash_buckets_.at(index).back().next();
		}

		public rbegin(): HashMap.ReverseIterator<Key, T>;

		public rbegin(index: number): HashMap.ReverseIterator<Key, T>;

		public rbegin(index: number = -1): HashMap.ReverseIterator<Key, T>
		{
			if (index == -1)
				return super.rbegin();
			else
				return new base.MapReverseIterator<Key, T, HashMap<Key, T>>(this.end(index));
		}

		public rend(): HashMap.ReverseIterator<Key, T>;

		public rend(index: number): HashMap.ReverseIterator<Key, T>;

		public rend(index: number = -1): HashMap.ReverseIterator<Key, T>
		{
			if (index == -1)
				return super.rend();
			else
				return new base.MapReverseIterator<Key, T, HashMap<Key, T>>(this.begin(index));
		}

		/* ---------------------------------------------------------
			HASH
		--------------------------------------------------------- */
		public bucket_count(): number
		{
			return this.hash_buckets_.size();
		}

		public bucket_size(index: number): number
		{
			return this.hash_buckets_.at(index).size();
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

		public bucket(key: Key): number
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
		protected _Emplace(key: Key, val: T): Pair<HashMap.Iterator<Key, T>, boolean>
		{
			// TEST WHETHER EXIST
			let it: HashMap.Iterator<Key, T> = this.find(key);
			if (it.equals(this.end()) == false)
				return make_pair(it, false);

			// INSERT
			this["data_"].push(new Entry(key, val));
			it = it.prev();

			// POST-PROCESS
			this._Handle_insert(it, it.next());

			return make_pair(it, true);
		}

		/**
		 * @hidden
		 */
		protected _Emplace_hint(hint: HashMap.Iterator<Key, T>, key: Key, val: T): HashMap.Iterator<Key, T>
		{
			// FIND DUPLICATED KEY
			let it: HashMap.Iterator<Key, T> = this.find(key);
			if (it.equals(this.end()) == true)
			{
				// INSERT
				it = this["data_"].insert(hint, new Entry(key, val));

				// POST-PROCESS
				this._Handle_insert(it, it.next());
			}
			return it;
		}

		/**
		 * @hidden
		 */
		protected _Insert_range<L extends Key, U extends T, InputIterator extends IForwardIterator<IPair<L, U>>>
			(first: InputIterator, last: InputIterator): void
		{
			let my_first: HashMap.Iterator<Key, T> = this.end().prev();
			let size: number = 0;

			// INSERT ELEMENTS
			for (let it = first; !it.equals(last); it = it.next() as InputIterator)
			{
				// TEST WHETER EXIST
				if (this.has(it.value.first))
					continue;

				// INSERTS
				this["data_"].push(new Entry(it.value.first, it.value.second));
				size++;
			}
			my_first = my_first.next();

			// IF NEEDED, HASH_BUCKET TO HAVE SUITABLE SIZE
			if (this.size() + size > this.hash_buckets_.size() * base._Hash.MAX_RATIO)
				this.hash_buckets_.rehash((this.size() + size) * base._Hash.RATIO);

			// POST-PROCESS
			this._Handle_insert(my_first, this.end());
		}

		/* ---------------------------------------------------------
			POST-PROCESS
		--------------------------------------------------------- */
		/**
		 * @hidden
		 */
		protected _Handle_insert(first: HashMap.Iterator<Key, T>, last: HashMap.Iterator<Key, T>): void
		{
			for (; !first.equals(last); first = first.next())
				this.hash_buckets_.insert(first);
		}

		/**
		 * @hidden
		 */
		protected _Handle_erase(first: HashMap.Iterator<Key, T>, last: HashMap.Iterator<Key, T>): void
		{
			for (; !first.equals(last); first = first.next())
				this.hash_buckets_.erase(first);
		}

		/* ---------------------------------------------------------
			SWAP
		--------------------------------------------------------- */
		public swap(obj: HashMap<Key, T>): void
		{
			// SWAP CONTENTS
			super.swap(obj);

			// SWAP BUCKETS
			[this.hash_buckets_["source_"], obj.hash_buckets_["source_"]] = [obj.hash_buckets_["source_"], this.hash_buckets_["source_"]];
			[this.hash_buckets_, obj.hash_buckets_] = [obj.hash_buckets_, this.hash_buckets_];
		}
	}
}

namespace std.HashMap
{
	//----
	// PASCAL NOTATION
	//----
	// HEAD
	export type Iterator<Key, T> = base.MapIterator<Key, T, HashMap<Key, T>>;
	export type ReverseIterator<Key, T> = base.MapReverseIterator<Key, T, HashMap<Key, T>>;

	// BODY
	export var Iterator = base.MapIterator;
	export var ReverseIterator = base.MapReverseIterator;

	//----
	// SNAKE NOTATION
	//----
	// HEAD
	export type iterator<Key, T> = Iterator<Key, T>;
	export type reverse_iterator<Key, T> = ReverseIterator<Key, T>;

	// BODY
	export var iterator = Iterator;
	export var reverse_iterator = ReverseIterator;
}