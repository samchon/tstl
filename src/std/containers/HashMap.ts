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
		private buckets_: base._MapHashBuckets<Key, T, HashMap<Key, T>>;
	
		/* =========================================================
			CONSTRUCTORS & SEMI-CONSTRUCTORS
				- CONSTRUCTORS
				- ASSIGN & CLEAR
		============================================================
			CONSTURCTORS
		--------------------------------------------------------- */
		public constructor();
		public constructor(hash: (key: Key) => number);
		public constructor(hash: (key: Key) => number, pred: (x: Key, y: Key) => boolean);

		public constructor(items: Array<IPair<Key, T>>);
		public constructor(items: Array<IPair<Key, T>>, hash: (key: Key) => number);
		public constructor(items: Array<IPair<Key, T>>, hash: (key: Key) => number, pred: (x: Key, y: Key) => boolean);

		public constructor(container: HashMap<Key, T>);
		public constructor(first: IForwardIterator<IPair<Key, T>>, last: IForwardIterator<IPair<Key, T>>);
		public constructor(first: IForwardIterator<IPair<Key, T>>, last: IForwardIterator<IPair<Key, T>>, hash: (key: Key) => number);
		public constructor(first: IForwardIterator<IPair<Key, T>>, last: IForwardIterator<IPair<Key, T>>, hash: (key: Key) => number, pred: (x: Key, y: Key) => boolean);

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
			if (args.length == 1 && args[0] instanceof HashMap)
			{
				// PARAMETERS
				let container: std.HashMap<Key, T> = args[0];
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
					let items: Array<IPair<Key, T>> = args[0];

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
					let first: IForwardIterator<IPair<Key, T>> = args[0];
					let last: IForwardIterator<IPair<Key, T>> = args[1];

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
			this.buckets_ = new base._MapHashBuckets(this, hash_function, key_eq);

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

		public swap(obj: HashMap<Key, T>): void
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
		public find(key: Key): HashMap.Iterator<Key, T>
		{
			return this.buckets_.find(key);
		}

		public begin(): HashMap.Iterator<Key, T>;
		public begin(index: number): HashMap.Iterator<Key, T>;
		public begin(index: number = null): HashMap.Iterator<Key, T>
		{
			if (index == null)
				return super.begin();
			else
				return this.buckets_.at(index).front();
		}

		public end(): HashMap.Iterator<Key, T>;
		public end(index: number): HashMap.Iterator<Key, T>
		public end(index: number = null): HashMap.Iterator<Key, T>
		{
			if (index == null)
				return super.end();
			else
				return this.buckets_.at(index).back().next();
		}

		public rbegin(): HashMap.ReverseIterator<Key, T>;
		public rbegin(index: number): HashMap.ReverseIterator<Key, T>;
		public rbegin(index: number = null): HashMap.ReverseIterator<Key, T>
		{
			if (index == null)
				return super.rbegin();
			else
				return new base.MapReverseIterator<Key, T, HashMap<Key, T>>(this.end(index));
		}

		public rend(): HashMap.ReverseIterator<Key, T>;
		public rend(index: number): HashMap.ReverseIterator<Key, T>;
		public rend(index: number = null): HashMap.ReverseIterator<Key, T>
		{
			if (index == null)
				return super.rend();
			else
				return new base.MapReverseIterator<Key, T, HashMap<Key, T>>(this.begin(index));
		}

		/* ---------------------------------------------------------
			HASH
		--------------------------------------------------------- */
		public bucket_count(): number
		{
			return this.buckets_.size();
		}
		public bucket_size(index: number): number
		{
			return this.buckets_.at(index).size();
		}
		public load_factor(): number
		{
			return this.buckets_.load_factor();
		}

		public hash_function(): (key: Key) => number
		{
			return this.buckets_.hash_function();
		}
		public key_eq(): (x: Key, y: Key) => boolean
		{
			return this.buckets_.key_eq();
		}
		public bucket(key: Key): number
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
			this.buckets_.reserve(n);
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
		protected _Insert_by_range<L extends Key, U extends T, InputIterator extends IForwardIterator<IPair<L, U>>>
			(first: InputIterator, last: InputIterator): void
		{
			//--------
			// INSERTIONS
			//--------
			// PRELIMINY
			let my_first: HashMap.Iterator<Key, T> = this.end().prev();

			// INSERT ELEMENTS
			for (let it = first; !it.equals(last); it = it.next() as InputIterator)
			{
				// TEST WHETER EXIST
				if (this.has(it.value.first))
					continue;

				// INSERTS
				this["data_"].push(new Entry(it.value.first, it.value.second));
			}
			my_first = my_first.next();

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
		protected _Handle_insert(first: HashMap.Iterator<Key, T>, last: HashMap.Iterator<Key, T>): void
		{
			for (; !first.equals(last); first = first.next())
				this.buckets_.insert(first);
		}

		/**
		 * @hidden
		 */
		protected _Handle_erase(first: HashMap.Iterator<Key, T>, last: HashMap.Iterator<Key, T>): void
		{
			for (; !first.equals(last); first = first.next())
				this.buckets_.erase(first);
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