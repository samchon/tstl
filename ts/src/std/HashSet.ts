/// <reference path="API.ts" />

/// <reference path="base/UniqueSet.ts" />
/// <reference path="base/MultiSet.ts" />

namespace std
{
	/**
	 * <p> Hashed, unordered set. </p>
	 *
	 * <p> {@link HashSet}s are containers that store unique elements in no particular order, and which 
	 * allow for fast retrieval of individual elements based on their value. </p>
	 *
	 * <p> In an {@link HashSet}, the value of an element is at the same time its <i>key</i>, that 
	 * identifies it uniquely. Keys are immutable, therefore, the elements in an {@link HashSet} cannot be 
	 * modified once in the container - they can be inserted and removed, though. </p>
	 *
	 * <p> Internally, the elements in the {@link HashSet} are not sorted in any particular order, but 
	 * organized into buckets depending on their hash values to allow for fast access to individual elements 
	 * directly by their <i>values</i> (with a constant average time complexity on average). </p>
	 *
	 * <p> {@link HashSet} containers are faster than {@link TreeSet} containers to access individual 
	 * elements by their <i>key</i>, although they are generally less efficient for range iteration through a 
	 * subset of their elements. </p>
	 * 
	 * <p> <img src="../assets/images/design/set_containers.png" width="100%" /> </p>
	 * 
	 * <h3> Container properties </h3>
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
	 *	<dt> Unique keys </dt>
	 *	<dd> No two elements in the container can have equivalent <i>keys</i>. </dd>
	 * </dl>
	 * 
	 * @param <T> Type of the elements. 
	 *			  Each element in an {@link HashSet} is also uniquely identified by this value.
	 *
	 * @reference http://www.cplusplus.com/reference/unordered_set/unordered_set
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export class HashSet<T>
		extends base.UniqueSet<T>
	{
		private hash_buckets_: base.SetHashBuckets<T> = new base.SetHashBuckets<T>(this);

		/* =========================================================
			CONSTRUCTORS & SEMI-CONSTRUCTORS
				- CONSTRUCTORS
				- ASSIGN & CLEAR
		============================================================
			CONSTURCTORS
		--------------------------------------------------------- */
		/////
		// using super::constructor
		/////

		/**
		 * @hidden
		 */
		protected init(): void
		{
			super.init();

			this.hash_buckets_ = new base.SetHashBuckets<T>(this);
		}

		/**
		 * @hidden
		 */
		protected construct_from_array(items: Array<T>): void
		{
			this.hash_buckets_.rehash(items.length * base.Hash.RATIO);

			super.construct_from_array(items);
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
		public begin(): SetIterator<T>;

		/**
		 * @inheritdoc
		 */
		public begin(index: number): SetIterator<T>;

		public begin(index?: number): SetIterator<T>
		{
			if (index == undefined)
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

		public end(index?: number): SetIterator<T>
		{
			if (index == undefined)
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

		public rbegin(index?: number): SetReverseIterator<T>
		{
			if (index == undefined)
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

		public rend(index?: number): SetReverseIterator<T>
		{
			if (index == undefined)
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

		public max_load_factor(z?: number): any
		{
			if (z == undefined)
				return this.size() / this.bucket_count();
			else
				this.rehash(Math.ceil(this.bucket_count() / z));
		}

		/**
		 * @inheritdoc
		 */
		public bucket(key: T): number
		{
			return std.hash(key) % this.hash_buckets_.size();
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
		============================================================
			INSERT
		--------------------------------------------------------- */
		/**
		 * @hidden
		 */
		protected insert_by_val(val: T): any
		{
			// TEST WHETHER EXIST
			let it = this.find(val);
			if (it.equal_to(this.end()) == false)
				return make_pair(it, false);

			// INSERT
			this.data_.push_back(val);
			it = it.prev();

			// POST-PROCESS
			this.handle_insert(it, it.next());

			return make_pair(it, true);
		}

		/**
		 * @hidden
		 */
		protected insert_by_hint(hint: SetIterator<T>, val: T): SetIterator<T>
		{
			// FIND KEY
			if (this.has(val) == true)
				return this.end();

			// INSERT
			let list_iterator = this.data_.insert(hint.get_list_iterator(), val);

			// POST-PROCESS
			let it = new SetIterator<T>(this, list_iterator);
			this.handle_insert(it, it.next());

			return it;
		}

		/**
		 * @hidden
		 */
		protected insert_by_range<U extends T, InputIterator extends Iterator<U>>
			(first: InputIterator, last: InputIterator): void
		{
			let my_first: SetIterator<T> = this.end().prev();
			let size: number = 0;

			for (; !first.equal_to(last); first = first.next() as InputIterator)
			{
				// TEST WHETER EXIST
				if (this.has(first.value))
					continue;
				
				// INSERTS
				this.data_.push_back(first.value);
				size++;
			}
			my_first = my_first.next();
			
			// IF NEEDED, HASH_BUCKET TO HAVE SUITABLE SIZE
			if (this.size() + size > this.hash_buckets_.size() * base.Hash.MAX_RATIO)
				this.hash_buckets_.rehash((this.size() + size) * base.Hash.RATIO);

			// INSERTS
			this.handle_insert(my_first, this.end());
		}

		/* ---------------------------------------------------------
			POST-PROCESS
		--------------------------------------------------------- */
		/**
		 * @inheritdoc
		 */
		protected handle_insert(first: SetIterator<T>, last: SetIterator<T>): void
		{
			for (; !first.equal_to(last); first = first.next())
				this.hash_buckets_.insert(first);
		}

		/**
		 * @inheritdoc
		 */
		protected handle_erase(first: SetIterator<T>, last: SetIterator<T>): void
		{
			for (; !first.equal_to(last); first = first.next())
				this.hash_buckets_.erase(first);
		}

		/* ===============================================================
			UTILITIES
		=============================================================== */
		/**
		 * @inheritdoc
		 */
		public swap(obj: base.UniqueSet<T>): void
		{
			if (obj instanceof HashSet)
				this.swap_tree_set(obj);
			else
				super.swap(obj);
		}

		/**
		 * @hidden
		 */
		private swap_tree_set(obj: HashSet<T>): void
		{
			[this.data_, obj.data_] = [obj.data_, this.data_];
			[this.hash_buckets_, obj.hash_buckets_] = [obj.hash_buckets_, this.hash_buckets_];
		}
	}
}

namespace std
{
	/**
	 * <p> Hashed, unordered Multiset. </p>
	 *
	 * <p> {@link HashMultiSet HashMultiSets} are containers that store elements in no particular order, allowing fast 
	 * retrieval of individual elements based on their value, much like {@link HashSet} containers, 
	 * but allowing different elements to have equivalent values. </p>
	 *
	 * <p> In an {@link HashMultiSet}, the value of an element is at the same time its <i>key</i>, used to 
	 * identify it. <i>Keys</i> are immutable, therefore, the elements in an {@link HashMultiSet} cannot be 
	 * modified once in the container - they can be inserted and removed, though. </p>
	 *
	 * <p> Internally, the elements in the {@link HashMultiSet} are not sorted in any particular, but 
	 * organized into <i>buckets</i> depending on their hash values to allow for fast access to individual 
	 * elements directly by their <i>values</i> (with a constant average time complexity on average). </p>
	 * 
	 * <p> Elements with equivalent values are grouped together in the same bucket and in such a way that an 
	 * iterator can iterate through all of them. Iterators in the container are doubly linked iterators. </p>
	 *
	 * <p> <img src="../assets/images/design/set_containers.png" width="100%" /> </p>
	 * 
	 * <h3> Container properties </h3>
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
		private hash_buckets_: base.SetHashBuckets<T> = new base.SetHashBuckets<T>(this);

		/* =========================================================
			CONSTRUCTORS & SEMI-CONSTRUCTORS
				- CONSTRUCTORS
				- ASSIGN & CLEAR
		============================================================
			CONSTURCTORS
		--------------------------------------------------------- */
		/////
		// using super::constructor
		/////

		/**
		 * @hidden
		 */
		protected init(): void
		{
			super.init();

			this.hash_buckets_ = new base.SetHashBuckets<T>(this);
		}

		/**
		 * @hidden
		 */
		protected construct_from_array(items: Array<T>): void
		{
			this.hash_buckets_.rehash(items.length * base.Hash.RATIO);

			super.construct_from_array(items);
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
			let index = std.hash(key) % this.hash_buckets_.item_size();
			let bucket = this.hash_buckets_.at(index);

			// ITERATE THE BUCKET
			let cnt: number = 0;
			for (let i = 0; i < bucket.length; i++)
				if (std.equal_to(bucket[i].value, key))
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

		public begin(index?: number): SetIterator<T>
		{
			if (index == undefined)
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

		public end(index?: number): SetIterator<T>
		{
			if (index == undefined)
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

		public rbegin(index?: number): SetReverseIterator<T>
		{
			if (index == undefined)
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

		public rend(index?: number): SetReverseIterator<T>
		{
			if (index == undefined)
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

		public max_load_factor(z?: number): any
		{
			if (z == undefined)
				return this.size() / this.bucket_count();
			else
				this.rehash(Math.ceil(this.bucket_count() / z));
		}

		/**
		 * @inheritdoc
		 */
		public bucket(key: T): number
		{
			return std.hash(key) % this.hash_buckets_.size();
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
		============================================================
			INSERT
		--------------------------------------------------------- */
		/**
		 * @hidden
		 */
		protected insert_by_val(val: T): any
		{
			// INSERT
			let it = new SetIterator<T>(this, this.data_.insert(this.data_.end(), val));

			this.handle_insert(it, it.next()); // POST-PROCESS
			return it;
		}

		/**
		 * @hidden
		 */
		protected insert_by_hint(hint: SetIterator<T>, val: T): SetIterator<T>
		{
			// INSERT
			let list_iterator = this.data_.insert(hint.get_list_iterator(), val);

			// POST-PROCESS
			let it = new SetIterator<T>(this, list_iterator);
			this.handle_insert(it, it.next());

			return it;
		}

		/**
		 * @hidden
		 */
		protected insert_by_range<U extends T, InputIterator extends Iterator<U>>
			(first: InputIterator, last: InputIterator): void
		{
			// INSERT ELEMENTS
			let list_iterator = this.data_.insert(this.data_.end(), first, last);
			let my_first = new SetIterator<T>(this, list_iterator);

			// IF NEEDED, HASH_BUCKET TO HAVE SUITABLE SIZE
			if (this.size() > this.hash_buckets_.item_size() * base.Hash.MAX_RATIO)
				this.hash_buckets_.rehash(this.size() * base.Hash.RATIO);

			// POST-PROCESS
			this.handle_insert(my_first, this.end());
		}

		/* ---------------------------------------------------------
			POST-PROCESS
		--------------------------------------------------------- */
		/**
		 * @inheritdoc
		 */
		protected handle_insert(first: SetIterator<T>, last: SetIterator<T>): void
		{
			for (; !first.equal_to(last); first = first.next())
				this.hash_buckets_.insert(first);
		}

		/**
		 * @inheritdoc
		 */
		protected handle_erase(first: SetIterator<T>, last: SetIterator<T>): void
		{
			for (; !first.equal_to(last); first = first.next())
				this.hash_buckets_.erase(first);
		}

		/* ===============================================================
			UTILITIES
		=============================================================== */
		/**
		 * @inheritdoc
		 */
		public swap(obj: base.MultiSet<T>): void
		{
			if (obj instanceof HashMultiSet)
				this.swap_tree_set(obj);
			else
				super.swap(obj);
		}

		/**
		 * @hidden
		 */
		private swap_tree_set(obj: HashMultiSet<T>): void
		{
			[this.data_, obj.data_] = [obj.data_, this.data_];
			[this.hash_buckets_, obj.hash_buckets_] = [obj.hash_buckets_, this.hash_buckets_];
		}
	}
}