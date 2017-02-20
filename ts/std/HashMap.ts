/// <reference path="API.ts" />

/// <reference path="base/UniqueMap.ts" />
/// <reference path="base/MultiMap.ts" />

namespace std.HashMap
{
	export type iterator<Key, T> = MapIterator<Key, T>;
	export type reverse_iterator<Key, T> = MapReverseIterator<Key, T>;
}

namespace std
{
	/**
	 * Hashed, unordered map.
	 *
	 * {@link HashMap}s are associative containers that store elements formed by the combination of a <i>key value</i> 
	 * and a <i>mapped value</i>, and which allows for fast retrieval of individual elements based on their <i>keys</i>. 
	 *
	 * In an {@link HashMap}, the <i>key value</i> is generally used to uniquely identify the element, while the 
	 * <i>mapped value</i> is an object with the content associated to this <i>key</i>. Types of <i>key</i> and 
	 * <i>mapped value</i> may differ.
	 *
	 * Internally, the elements in the {@link HashMap} are not sorted in any particular order with respect to either 
	 * their <i>key</i> or <i>mapped values</i>, but organized into <i>buckets</i> depending on their hash values to allow 
	 * for fast access to individual elements directly by their <i>key values</i> (with a constant average time complexity 
	 * on average).
	 *
	 * {@link HashMap} containers are faster than {@link TreeMap} containers to access individual elements by their 
	 * <i>key</i>, although they are generally less efficient for range iteration through a subset of their elements.
	 *
	 * <a href="http://samchon.github.io/tstl/images/design/class_diagram/map_containers.png" target="_blank"> 
	 * <img src="http://samchon.github.io/tstl/images/design/class_diagram/map_containers.png" style="max-width: 100%" /> </a> 
	 * 
	 * ### Container properties
	 * <dl>
	 * 	<dt> Associative </dt>
	 * 	<dd> Elements in associative containers are referenced by their <i>key</i> and not by their absolute 
	 *		 position in the container. </dd>
	 * 
	 * 	<dt> Hashed </dt>
	 * 	<dd> Hashed containers organize their elements using hash tables that allow for fast access to elements 
	 *		 by their <i>key</i>. </dd>
	 * 
	 * 	<dt> Map </dt>
	 * 	<dd> Each element associates a <i>key</i> to a <i>mapped value</i>: 
	 *		 <i>Keys</i> are meant to identify the elements whose main content is the <i>mapped value</i>. </dd>
	 * 
	 * 	<dt> Unique keys </dt>
	 * 	<dd> No two elements in the container can have equivalent keys. </dd>
	 * </dl>
	 *
	 * @param <Key> Type of the key values. 
	 *				Each element in an {@link HashMap} is uniquely identified by its key value.
	 * @param <T> Type of the mapped value. 
	 *			  Each element in an {@link HashMap} is used to store some data as its mapped value.
	 *
	 * @reference http://www.cplusplus.com/reference/unordered_map/unordered_map
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export class HashMap<Key, T>
		extends base.UniqueMap<Key, T>
		implements base.IHashMap<Key, T>
	{
		/**
		 * @hidden
		 */
		private hash_buckets_: base._MapHashBuckets<Key, T>;
	
		/* =========================================================
			CONSTRUCTORS & SEMI-CONSTRUCTORS
				- CONSTRUCTORS
				- ASSIGN & CLEAR
		============================================================
			CONSTURCTORS
		--------------------------------------------------------- */
		/**
		 * Default Constructor.
		 */
		public constructor();

		/**
		 * Construct from elements.
		 */
		public constructor(items: Pair<Key, T>[]);

		/**
		 * Contruct from tuples.
		 *
		 * @param array Tuples to be contained.
		 */
		public constructor(array: [Key, T][]);

		/**
		 * Copy Constructor.
		 */
		public constructor(container: HashMap<Key, T>);

		/**
		 * Construct from range iterators.
		 */
		public constructor(begin: Iterator<Pair<Key, T>>, end: Iterator<Pair<Key, T>>);

		public constructor(...args: any[])
		{
			// INIT MEMBERS
			super();
			this.hash_buckets_ = new base._MapHashBuckets<Key, T>(this);

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
				let items: Pair<Key, T>[] = args[0];

				this.rehash(items.length * base._Hash.RATIO);
				this.push(...items);
			}
			else if (args.length == 2 && args[0] instanceof Iterator && args[1] instanceof Iterator)
			{
				// RANGE CONSTRUCTOR
				let first: Iterator<Pair<Key, T>> = args[0];
				let last: Iterator<Pair<Key, T>> = args[1];

				this.assign(first, last);
			}
		}
		
		/* ---------------------------------------------------------
			ASSIGN & CLEAR
		--------------------------------------------------------- */
		/**
		 * @inheritdoc
		 */
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
		/**
		 * @inheritdoc
		 */
		public find(key: Key): MapIterator<Key, T>
		{
			return this.hash_buckets_.find(key);
		}

		/**
		 * @inheritdoc
		 */
		public begin(): MapIterator<Key, T>;

		/**
		 * @inheritdoc
		 */
		public begin(index: number): MapIterator<Key, T>;

		public begin(index: number = -1): MapIterator<Key, T>
		{
			if (index == -1)
				return super.begin();
			else
				return this.hash_buckets_.at(index).front();
		}

		/**
		 * @inheritdoc
		 */
		public end(): MapIterator<Key, T>;

		/**
		 * @inheritdoc
		 */
		public end(index: number): MapIterator<Key, T>

		public end(index: number = -1): MapIterator<Key, T>
		{
			if (index == -1)
				return super.end();
			else
				return this.hash_buckets_.at(index).back().next();
		}

		/**
		 * @inheritdoc
		 */
		public rbegin(): MapReverseIterator<Key, T>;

		/**
		 * @inheritdoc
		 */
		public rbegin(index: number): MapReverseIterator<Key, T>;

		public rbegin(index: number = -1): MapReverseIterator<Key, T>
		{
			if (index == -1)
				return super.rbegin();
			else
				return new MapReverseIterator<Key, T>(this.end(index));
		}

		/**
		 * @inheritdoc
		 */
		public rend(): MapReverseIterator<Key, T>;

		/**
		 * @inheritdoc
		 */
		public rend(index: number): MapReverseIterator<Key, T>;

		public rend(index: number = -1): MapReverseIterator<Key, T>
		{
			if (index == -1)
				return super.rend();
			else
				return new MapReverseIterator<Key, T>(this.begin(index));
		}

		/* ---------------------------------------------------------
			HASH
		--------------------------------------------------------- */
		/**
		 * @inheritdoc
		 */
		public bucket_count(): number
		{
			return this.hash_buckets_.size();
		}

		/**
		 * @inheritdoc
		 */
		public bucket_size(index: number): number
		{
			return this.hash_buckets_.at(index).size();
		}

		/**
		 * @inheritdoc
		 */
		public max_load_factor(): number;

		/**
		 * @inheritdoc
		 */
		public max_load_factor(z: number): void;

		public max_load_factor(z: number = -1): any
		{
			if (z == -1)
				return this.size() / this.bucket_count();
			else
				this.rehash(Math.ceil(this.bucket_count() / z));
		}

		/**
		 * @inheritdoc
		 */
		public bucket(key: Key): number
		{
			return hash(key) % this.hash_buckets_.size();
		}

		/**
		 * @inheritdoc
		 */
		public reserve(n: number): void
		{
			this.hash_buckets_.rehash(Math.ceil(n * this.max_load_factor()));
		}

		/**
		 * @inheritdoc
		 */
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
		protected _Insert_by_pair(pair: Pair<Key, T>): Pair<MapIterator<Key, T>, boolean>
		{
			// TEST WHETHER EXIST
			let it: MapIterator<Key, T> = this.find(pair.first);
			if (it.equals(this.end()) == false)
				return make_pair(it, false);

			// INSERT
			this["data_"].push_back(pair);
			it = it.prev();

			// POST-PROCESS
			this._Handle_insert(it, it.next());

			return make_pair(it, true);
		}

		/**
		 * @hidden
		 */
		protected _Insert_by_hint(hint: MapIterator<Key, T>, pair: Pair<Key, T>): MapIterator<Key, T>
		{
			// FIND DUPLICATED KEY
			let it: MapIterator<Key, T> = this.find(pair.first);
			if (it.equals(this.end()) == true)
			{
				// INSERT
				it = this["data_"].insert(hint, pair);

				// POST-PROCESS
				this._Handle_insert(it, it.next());
			}
			return it;
		}

		/**
		 * @hidden
		 */
		protected _Insert_by_range<L extends Key, U extends T, InputIterator extends Iterator<Pair<L, U>>>
			(first: InputIterator, last: InputIterator): void
		{
			let my_first: MapIterator<Key, T> = this.end().prev();
			let size: number = 0;

			// INSERT ELEMENTS
			for (; !first.equals(last); first = first.next() as InputIterator)
			{
				// TEST WHETER EXIST
				if (this.has(first.value.first))
					continue;

				// INSERTS
				this["data_"].push_back(make_pair<Key, T>(first.value.first, first.value.second));
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
		protected _Handle_insert(first: MapIterator<Key, T>, last: MapIterator<Key, T>): void
		{
			for (; !first.equals(last); first = first.next())
				this.hash_buckets_.insert(first);
		}

		/**
		 * @hidden
		 */
		protected _Handle_erase(first: MapIterator<Key, T>, last: MapIterator<Key, T>): void
		{
			for (; !first.equals(last); first = first.next())
				this.hash_buckets_.erase(first);
		}

		/* ---------------------------------------------------------
			SWAP
		--------------------------------------------------------- */
		/**
		 * Swap content.
		 * 
		 * Exchanges the content of the container by the content of <i>obj</i>, which is another 
		 * {@link HashMap map} of the same type. Sizes abd container type may differ.
		 * 
		 * After the call to this member function, the elements in this container are those which were 
		 * in <i>obj</i> before the call, and the elements of <i>obj</i> are those which were in this. All 
		 * iterators, references and pointers remain valid for the swapped objects.
		 *
		 * Notice that a non-member function exists with the same name, {@link swap swap}, overloading that 
		 * algorithm with an optimization that behaves like this member function.
		 * 
		 * @param obj Another {@link HashMap map container} of the same type of elements as this (i.e.,
		 *			  with the same template parameters, <b>Key</b> and <b>T</b>) whose content is swapped 
		 *			  with that of this {@link HashMap container}.
		 */
		public swap(obj: HashMap<Key, T>): void;

		/**
		 * @inheritdoc
		 */
		public swap(obj: base.Container<Pair<Key, T>>): void;

		/**
		 * @inheritdoc
		 */
		public swap(obj: HashMap<Key, T> | base.Container<Pair<Key, T>>): void
		{
			if (obj instanceof HashMap)
			{
				this._Swap(obj);
				[this.hash_buckets_, obj.hash_buckets_] = [obj.hash_buckets_, this.hash_buckets_];
			}
			else
				super.swap(obj);
		}
	}
}