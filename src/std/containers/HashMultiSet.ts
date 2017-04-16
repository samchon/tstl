/// <reference path="../API.ts" />

/// <reference path="../base/containers/MultiSet.ts" />

namespace std.HashMultiSet
{
	export type iterator<T> = SetIterator<T>;
	export type reverse_iterator<T> = SetReverseIterator<T>;
}

namespace std
{
	/**
	 * Hashed, unordered Multiset.
	 *
	 * {@link HashMultiSet HashMultiSets} are containers that store elements in no particular order, allowing fast 
	 * retrieval of individual elements based on their value, much like {@link HashMultiSet} containers, 
	 * but allowing different elements to have equivalent values.
	 *
	 * In an {@link HashMultiSet}, the value of an element is at the same time its <i>key</i>, used to 
	 * identify it. <i>Keys</i> are immutable, therefore, the elements in an {@link HashMultiSet} cannot be 
	 * modified once in the container - they can be inserted and removed, though.
	 *
	 * Internally, the elements in the {@link HashMultiSet} are not sorted in any particular, but 
	 * organized into <i>buckets</i> depending on their hash values to allow for fast access to individual 
	 * elements directly by their <i>values</i> (with a constant average time complexity on average).
	 * 
	 * Elements with equivalent values are grouped together in the same bucket and in such a way that an 
	 * iterator can iterate through all of them. Iterators in the container are doubly linked iterators.
	 *
	 * <a href="http://samchon.github.io/tstl/images/design/class_diagram/set_containers.png" target="_blank"> 
	 * <img src="http://samchon.github.io/tstl/images/design/class_diagram/set_containers.png" style="max-width: 100%" /></a>
	 * 
	 * ### Container properties
	 * <dl>
	 *	<dt> Associative </dt>
	 *	<dd> Elements in associative containers are referenced by their <i>key</i> and not by their absolute 
	 *		 position in the container. </dd>
	 *
	 *	<dt> Hashed </dt>
	 *	<dd> Hashed containers organize their elements using hash tables that allow for fast access to elements 
	 *		 by their <i>key</i>. </dd>
	 *
	 *	<dt> Set </dt>
	 *	<dd> The value of an element is also the <i>key</i> used to identify it. </dd>
	 *
	 *	<dt> Multiple equivalent keys </dt>
	 *	<dd> The container can hold multiple elements with equivalent <i>keys</i>. </dd>
	 * </dl> 
	 *
	 * @param <T> Type of the elements. 
	 *		   Each element in an {@link UnorderedMultiSet} is also identified by this value..
	 *
	 * @reference http://www.cplusplus.com/reference/unordered_set/unordered_multiset
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export class HashMultiSet<T>
		extends base.MultiSet<T>
	{
		/**
		 * @hidden
		 */
		private hash_buckets_: base._SetHashBuckets<T>;

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
		public constructor(items: T[]);

		/**
		 * Copy Constructor.
		 */
		public constructor(container: HashMultiSet<T>);

		/**
		 * Construct from range iterators.
		 */
		public constructor(begin: base.Iterator<T>, end: base.Iterator<T>);

		public constructor(...args: any[])
		{
			// INIT MEMBERS
			super();
			this.hash_buckets_ = new base._SetHashBuckets<T>(this);

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
			else if (args.length == 2 && args[0] instanceof base.Iterator && args[1] instanceof base.Iterator)
			{
				// RANGE CONSTRUCTOR
				let first: base.Iterator<T> = args[0];
				let last: base.Iterator<T> = args[1];

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
		public find(key: T): SetIterator<T>
		{
			return this.hash_buckets_.find(key);
		}

		/**
		 * @inheritdoc
		 */
		public count(key: T): number
		{
			// FIND MATCHED BUCKET
			let index = hash(key) % this.hash_buckets_.item_size();
			let bucket = this.hash_buckets_.at(index);

			// ITERATE THE BUCKET
			let cnt: number = 0;
			for (let i = 0; i < bucket.size(); i++)
				if (equal_to(bucket.at(i).value, key))
					cnt++;

			return cnt;
		}

		/**
		 * @inheritdoc
		 */
		public begin(): SetIterator<T>;

		/**
		 * @inheritdoc
		 */
		public begin(index: number): SetIterator<T>;

		public begin(index: number = -1): SetIterator<T>
		{
			if (index == -1)
				return super.begin();
			else
				return this.hash_buckets_.at(index).front();
		}

		/**
		 * @inheritdoc
		 */
		public end(): SetIterator<T>;

		/**
		 * @inheritdoc
		 */
		public end(index: number): SetIterator<T>

		public end(index: number = -1): SetIterator<T>
		{
			if (index == -1)
				return super.end();
			else
				return this.hash_buckets_.at(index).back().next();
		}

		/**
		 * @inheritdoc
		 */
		public rbegin(): SetReverseIterator<T>;

		/**
		 * @inheritdoc
		 */
		public rbegin(index: number): SetReverseIterator<T>;

		public rbegin(index: number = -1): SetReverseIterator<T>
		{
			if (index == -1)
				return super.rbegin();
			else
				return new SetReverseIterator<T>(this.end(index));
		}

		/**
		 * @inheritdoc
		 */
		public rend(): SetReverseIterator<T>;

		/**
		 * @inheritdoc
		 */
		public rend(index: number): SetReverseIterator<T>;

		public rend(index: number = -1): SetReverseIterator<T>
		{
			if (index == -1)
				return super.rend();
			else
				return new SetReverseIterator<T>(this.begin(index));
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
		public bucket_size(n: number): number
		{
			return this.hash_buckets_.at(n).size();
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
		public bucket(key: T): number
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
		protected _Insert_by_val(val: T): SetIterator<T>
		{
			// INSERT
			let it = this["data_"].insert(this["data_"].end(), val);

			this._Handle_insert(it, it.next()); // POST-PROCESS
			return it;
		}

		/**
		 * @hidden
		 */
		protected _Insert_by_hint(hint: SetIterator<T>, val: T): SetIterator<T>
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
		protected _Insert_by_range<U extends T, InputIterator extends base.Iterator<U>>
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
		protected _Handle_insert(first: SetIterator<T>, last: SetIterator<T>): void
		{
			for (; !first.equals(last); first = first.next())
				this.hash_buckets_.insert(first);
		}

		/**
		 * @hidden
		 */
		protected _Handle_erase(first: SetIterator<T>, last: SetIterator<T>): void
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
		 * {@link HashMultiSet set} of the same type. Sizes abd container type may differ.
		 * 
		 * After the call to this member function, the elements in this container are those which were 
		 * in <i>obj</i> before the call, and the elements of <i>obj</i> are those which were in this. All 
		 * iterators, references and pointers remain valid for the swapped objects.
		 *
		 * Notice that a non-member function exists with the same name, {@link swap swap}, overloading that 
		 * algorithm with an optimization that behaves like this member function.
		 * 
		 * @param obj Another {@link HashMultiSet set container} of the same type of elements as this (i.e.,
		 *			  with the same template parameters, <b>Key</b> and <b>T</b>) whose content is swapped 
		 *			  with that of this {@link HashMultiSet container}.
		 */
		public swap(obj: HashMultiSet<T>): void;

		/**
		 * @inheritdoc
		 */
		public swap(obj: base.Container<T>): void;

		public swap(obj: HashMultiSet<T> | base.Container<T>): void
		{
			if (obj instanceof HashMultiSet)
			{
				this._Swap(obj);
				[this.hash_buckets_, obj.hash_buckets_] = [obj.hash_buckets_, this.hash_buckets_];
			}
			else
				super.swap(obj);
		}
	}
}