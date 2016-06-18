/// <reference path="API.ts" />

/// <reference path="base/UniqueMap.ts" />
/// <reference path="base/MultiMap.ts" />

namespace std.base
{
	/**
	 * <p> Common interface for hash map. </p>
	 * 
	 * <p> {@link IHashMap}s are associative containers that store elements formed by the combination of 
	 * a <i>key value</i> and a <i>mapped value</i>. </p>
	 *
	 * <p> In an {@link IHashMap}, the <i>key value</i> is generally used to uniquely identify the 
	 * element, while the <i>mapped value</i> is an object with the content associated to this <i>key</i>. 
	 * Types of <i>key</i> and <i>mapped value</i> may differ. </p>
	 *
	 * <p> Internally, the elements in the {@link IHashMap} are not sorted in any particular order with 
	 * respect to either their <i>key</i> or <i>mapped values</i>, but organized into <i>buckets</i> depending on 
	 * their hash values to allow for fast access to individual elements directly by their <i>key values</i> 
	 * (with a constant average time complexity on average). </p>
	 *
	 * <p> Elements with equivalent <i>keys</i> are grouped together in the same bucket and in such a way that 
	 * an iterator can iterate through all of them. Iterators in the container are doubly linked iterators. </p>
	 *
	 * <p> <img src="../assets/images/design/map_containers.png" width="100%" /> </p>
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
	 *	<dt> Map </dt>
	 *	<dd> Each element associates a <i>key</i> to a <i>mapped value</i>: 
	 *		 <i>Keys</i> are meant to identify the elements whose main content is the <i>mapped value</i>. </dd>
	 * </dl>
	 *
	 * @param <Key> Type of the key values. 
	 *				Each element in an {@link IHashMap} is identified by a key value.
	 * @param <T> Type of the mapped value. 
	 *			  Each element in an {@link IHashMap} is used to store some data as its mapped value.
	 *
	 * @reference http://www.cplusplus.com/reference/unordered_map
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export interface IHashMap<Key, T>
	{
		/* =========================================================
			ACCESSORS
				- MEMBER
				- HASH
		============================================================
			MEMBER
		--------------------------------------------------------- */
		/**
		 * <p> Return iterator to beginning. </p>
		 * 
		 * <p> Returns an iterator pointing to the first element in the {@link IHashMap}. </p>
		 * 
		 * <p> Notice that an {@link IHashMap} object makes no guarantees on which specific element is considered its
		 * first element. But, in any case, the range that goes from its begin to its end covers all the elements in the 
		 * container, until invalidated. </p>
		 * 
		 * @return An iterator to the first element in the container.
		 */
		begin(): MapIterator<Key, T>;

		/**
		 * <p> Return iterator to beginning. </p>
		 * 
		 * <p> Returns an iterator pointing to the first element in one of buckets in the {@link IHashMap}. </p>
		 * 
		 * <p> Notice that an {@link IHashMap} object makes no guarantees on which specific element is considered its
		 * first element. But, in any case, the range that goes from its begin to its end covers all the elements in the 
		 * bucket, until invalidated. </p>
		 * 
		 * @param index Bucket number. This shall be lower than {@link bucket_count}.
		 * 
		 * @return An iterator to the first element in the bucket.
		 */
		begin(index: number): MapIterator<Key, T>;

		/**
		 * <p> Return iterator to end. </p>
		 * 
		 * <p> Returns an iterator pointing to the past-the-end element in the {@link HaspMap} container. </p>
		 * 
		 * <p> The iterator returned by end does not point to any element, but to the position that follows the last 
		 * element in the {@link HaspMap} container (its <i>past-the-end</i> position). Thus, the value returned shall 
		 * not be dereferenced - it is generally used to describe the open-end of a range, such as 
		 * [<i>begin</i>, <i>end</i>). </p>
		 * 
		 * <p> Notice that an {@link IHashMap} object makes no guarantees on which order its elements follow. But, in any 
		 * case, the range that goes from its begin to its end covers all the elements in the container (or the bucket), 
		 * until invalidated. </p>
		 * 
		 * @return An iterator to the element past the end of the container.
		 */
		end(): MapIterator<Key, T>;

		/**
		 * <p> Return iterator to end. </p>
		 *
		 * <p> Returns an iterator pointing to the past-the-end element in the {@link HaspMap} container. </p>
		 *
		 * <p> The iterator returned by end does not point to any element, but to the position that follows the last
		 * element in the {@link HaspMap} container (its <i>past-the-end</i> position). Thus, the value returned shall
		 * not be dereferenced - it is generally used to describe the open-end of a range, such as
		 * [<i>begin</i>, <i>end</i>). </p>
		 *
		 * <p> Notice that an {@link IHashMap} object makes no guarantees on which order its elements follow. But, in any
		 * case, the range that goes from its begin to its end covers all the elements in the container (or the bucket),
		 * until invalidated. </p>
		 * 
		 * @param index Bucket number. This shall be lower than {@link bucket_count}.
		 * 
		 * @return An iterator to the element past the end of the bucket.
		 */
		end(index: number): MapIterator<Key, T>;

		rbegin(): MapReverseIterator<Key, T>;

		rbegin(index: number): MapReverseIterator<Key, T>;

		rend(): MapReverseIterator<Key, T>;

		rend(index: number): MapReverseIterator<Key, T>;

		/* ---------------------------------------------------------
			HASH
		--------------------------------------------------------- */
		/**
		 * <p> Return number of buckets. </p>
		 * 
		 * <p> Returns the number of buckets in the {@link IHashMap} container. </p>
		 * 
		 * <p> A bucket is a slot in the container's internal hash table to which elements are assigned based on the 
		 * hash value of their key. </p>
		 * 
		 * <p> The number of buckets influences directly the {@link load_factor load factor} of the container's hash 
		 * table (and thus the probability of collision). The container automatically increases the number of buckets to 
		 * keep the load factor below a specific threshold (its {@link max_load_factor}), causing a {@link rehash} each 
		 * time the number of buckets needs to be increased. </p>
		 * 
		 * @return The current amount of buckets.
		 */
		bucket_count(): number;

		/**
		 * <p> Return bucket size. </p>
		 * 
		 * <p> Returns the number of elements in bucket <i>n</i>. </p>
		 * 
		 * <p> A bucket is a slot in the container's internal hash table to which elements are assigned based on the hash 
		 * value of their key. </p>
		 * 
		 * <p> The number of elements in a bucket influences the time it takes to access a particular element in the 
		 * bucket. The container automatically increases the number of buckets to keep the {@link load_cator load factor} 
		 * (which is the average bucket size) below its {@link max_load_factor}. </p>
		 * 
		 * @param n Bucket number. This shall be lower than {@link bucket_count}.
		 * 
		 * @return The number of elements in bucket <i>n</i>.
		 */
		bucket_size(n: number): number;

		/**
		 * <p> Get maximum load factor. </p>
		 * 
		 * <p> Returns the current maximum load factor for the {@link HashMultiMap} container. </p>
		 * 
		 * <p> The load factor is the ratio between the number of elements in the container (its {@link size}) and the 
		 * number of buckets ({@link bucket_count}). </p>
		 * 
		 * <p> By default, {@link HashMultiMap} containers have a {@link max_load_factor} of 1.0. </p>
		 * 
		 * <p> The load factor influences the probability of collision in the hash table (i.e., the probability of two 
		 * elements being located in the same bucket). The container uses the value of max_load_factor as the threshold 
		 * that forces an increase in the number of buckets (and thus causing a {@link rehash}). </p>
		 * 
		 * <p> Note though, that implementations may impose an upper limit on the number of buckets (see 
		 * {@link max_bucket_count}), which may force the container to ignore the {@link max_load_factor}. </p>
		 * 
		 * @return The current load factor.
		 */
		max_load_factor(): number;

		/**
		 * <p> Set maximum load factor. </p>
		 * 
		 * <p> Sets <i>z</i> as the cnew maximum load factor for the {@link HashMultiMap} container. </p>
		 * 
		 * <p> The load factor is the ratio between the number of elements in the container (its {@link size}) and the 
		 * number of buckets ({@link bucket_count}). </p>
		 * 
		 * <p> By default, {@link HashMultiMap} containers have a {@link max_load_factor} of 1.0. </p>
		 * 
		 * <p> The load factor influences the probability of collision in the hash table (i.e., the probability of two 
		 * elements being located in the same bucket). The container uses the value of max_load_factor as the threshold 
		 * that forces an increase in the number of buckets (and thus causing a {@link rehash}). </p>
		 * 
		 * <p> Note though, that implementations may impose an upper limit on the number of buckets (see 
		 * {@link max_bucket_count}), which may force the container to ignore the {@link max_load_factor}. </p>
		 * 
		 * @param z The new maximum load factor.
		 */
		max_load_factor(z: number): void;

		/**
		 * <p> Locate element's bucket. </p>
		 * 
		 * <p> Returns the bucket number where the element with <i>key</i> is located. </p>
		 * 
		 * <p> A bucket is a slot in the container's internal hash table to which elements are assigned based on the 
		 * hash value of their <i>key</i>. Buckets are numbered from 0 to ({@link bucket_count} - 1). </p>
		 * 
		 * <p> Individual elements in a bucket can be accessed by means of the range iterators returned by 
		 * {@link begin} and {@link end}. </p>
		 * 
		 * @param key Key whose bucket is to be located.
		 */
		bucket(key: Key): number;

		/**
		 * <p> Request a capacity change. </p>
		 * 
		 * <p> Sets the number of buckets in the container ({@link bucket_count}) to the most appropriate to contain at 
		 * least <i>n</i> elements. </p>
		 * 
		 * <p> If <i>n</i> is greater than the current {@link bucket_count} multiplied by the {@link max_load_factor}, 
		 * the container's {@link bucket_count} is increased and a {@link rehash} is forced. </p>
		 * 
		 * <p> If <i>n</i> is lower than that, the function may have no effect. </p>
		 * 
		 * @param n The number of elements requested as minimum capacity.
		 */
		reserve(n: number): void;

		/**
		 * <p> Set number of buckets. </p>
		 * 
		 * <p> Sets the number of buckets in the container to <i>n</i> or more. </p>
		 * 
		 * <p> If <i>n</i> is greater than the current number of buckets in the container ({@link bucket_count}), a 
		 * {@link HashBuckets.rehash rehash} is forced. The new {@link bucket_count bucket count} can either be equal or 
		 * greater than <i>n</i>. </p>
		 * 
		 * <p> If <i>n</i> is lower than the current number of buckets in the container ({@link bucket_count}), the 
		 * function may have no effect on the {@link bucket_count bucket count} and may not force a 
		 * {@link HashBuckets.rehash rehash}. </p>
		 * 
		 * <p> A {@link HashBuckets.rehash rehash} is the reconstruction of the hash table: All the elements in the 
		 * container are rearranged according to their hash value into the new set of buckets. This may alter the order 
		 * of iteration of elements within the container. </p>
		 * 
		 * <p> {@link HashBuckets.rehash Rehashes} are automatically performed by the container whenever its 
		 * {@link load_factor load factor} is going to surpass its {@link max_load_factor} in an operation. </p>
		 * 
		 * <p> Notice that this function expects the number of buckets as argument. A similar function exists, 
		 * {@link reserve}, that expects the number of elements in the container as argument. </p>
		 * 
		 * @param n The minimum number of buckets for the container hash table.
		 */
		rehash(n: number): void;
	}
}

namespace std
{
	/**
	 * <p> Hashed, unordered map. </p>
	 *
	 * <p> {@link HashMap}s are associative containers that store elements formed by the combination of a <i>key value</i> 
	 * and a <i>mapped value</i>, and which allows for fast retrieval of individual elements based on their <i>keys</i>. 
	 * </p>
	 *
	 * <p> In an {@link HashMap}, the <i>key value</i> is generally used to uniquely identify the element, while the 
	 * <i>mapped value</i> is an object with the content associated to this <i>key</i>. Types of <i>key</i> and 
	 * <i>mapped value</i> may differ. </p>
	 *
	 * <p> Internally, the elements in the {@link HashMap} are not sorted in any particular order with respect to either 
	 * their <i>key</i> or <i>mapped values</i>, but organized into <i>buckets</i> depending on their hash values to allow 
	 * for fast access to individual elements directly by their <i>key values</i> (with a constant average time complexity 
	 * on average). </p>
	 *
	 * <p> {@link HashMap} containers are faster than {@link TreeMap} containers to access individual elements by their 
	 * <i>key</i>, although they are generally less efficient for range iteration through a subset of their elements. </p>
	 *
	 * <p> <img src="../assets/images/design/map_containers.png" width="100%" /> </p>
	 * 
	 * <h3> Container properties </h3>
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
		private hash_buckets_: base.MapHashBuckets<Key, T>;
	
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

			this.hash_buckets_ = new base.MapHashBuckets<Key, T>(this);
		}

		/**
		 * @hidden
		 */
		protected construct_from_array(items: Array<Pair<Key, T>>): void
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

		public begin(index?: number): MapIterator<Key, T>
		{
			if (index == undefined)
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

		public end(index?: number): MapIterator<Key, T>
		{
			if (index == undefined)
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

		public rbegin(index?: number): MapReverseIterator<Key, T>
		{
			if (index == undefined)
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

		public rend(index?: number): MapReverseIterator<Key, T>
		{
			if (index == undefined)
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
		public bucket(key: Key): number
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
		protected insert_by_pair(pair: Pair<Key, T>): any
		{
			// TEST WHETHER EXIST
			let it = this.find(pair.first);
			if (it.equal_to(this.end()) == false)
				return make_pair(it, false);

			// INSERT
			this.data_.push_back(pair);
			it = it.prev();

			// POST-PROCESS
			this.handle_insert(it, it.next());

			return make_pair(it, true);
		}

		/**
		 * @hidden
		 */
		protected insert_by_hint(hint: MapIterator<Key, T>, pair: Pair<Key, T>): MapIterator<Key, T>
		{
			// FIND KEY
			if (this.has(pair.first) == true)
				return this.end();

			// INSERT
			let list_it = this.data_.insert(hint.get_list_iterator(), pair);

			// POST-PROCESS
			let it = new MapIterator<Key, T>(this, list_it);
			this.handle_insert(it, it.next());

			return it;
		}

		/**
		 * @hidden
		 */
		protected insert_by_range<L extends Key, U extends T, InputIterator extends Iterator<Pair<L, U>>>
			(first: InputIterator, last: InputIterator): void
		{
			let my_first: MapIterator<Key, T> = this.end().prev();
			let size: number = 0;

			// INSERT ELEMENTS
			for (; !first.equal_to(last); first = first.next() as InputIterator)
			{
				// TEST WHETER EXIST
				if (this.has(first.value.first))
					continue;

				// INSERTS
				this.data_.push_back(make_pair<Key, T>(first.value.first, first.value.second));
				size++;
			}
			my_first = my_first.next();

			// IF NEEDED, HASH_BUCKET TO HAVE SUITABLE SIZE
			if (this.size() + size > this.hash_buckets_.size() * base.Hash.MAX_RATIO)
				this.hash_buckets_.rehash((this.size() + size) * base.Hash.RATIO);

			// POST-PROCESS
			this.handle_insert(my_first, this.end());
		}

		/* ---------------------------------------------------------
			POST-PROCESS
		--------------------------------------------------------- */
		/**
		 * @inheritdoc
		 */
		protected handle_insert(first: MapIterator<Key, T>, last: MapIterator<Key, T>): void
		{
			for (; !first.equal_to(last); first = first.next())
				this.hash_buckets_.insert(first);
		}

		/**
		 * @inheritdoc
		 */
		protected handle_erase(first: MapIterator<Key, T>, last: MapIterator<Key, T>): void
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
		public swap(obj: base.UniqueMap<Key, T>): void
		{
			if (obj instanceof HashMap)
				this.swap_hash_map(obj);
			else
				super.swap(obj);
		}

		/**
		 * @hidden
		 */
		private swap_hash_map(obj: HashMap<Key, T>): void
		{
			[this.data_, obj.data_] = [obj.data_, this.data_];
			[this.hash_buckets_, obj.hash_buckets_] = [obj.hash_buckets_, this.hash_buckets_];
		}
	}
}

namespace std
{
	/**
	 * <p> Hashed, unordered Multimap. </p>
	 * 
	 * <p> {@link HashMap}s are associative containers that store elements formed by the combination of 
	 * a <i>key value</i> and a <i>mapped value</i>, much like {@link HashMap} containers, but allowing 
	 * different elements to have equivalent <i>keys</i>. </p>
	 *
	 * <p> In an {@link HashMap}, the <i>key value</i> is generally used to uniquely identify the 
	 * element, while the <i>mapped value</i> is an object with the content associated to this <i>key</i>. 
	 * Types of <i>key</i> and <i>mapped value</i> may differ. </p>
	 *
	 * <p> Internally, the elements in the {@link HashMap} are not sorted in any particular order with 
	 * respect to either their <i>key</i> or <i>mapped values</i>, but organized into <i>buckets</i> depending on 
	 * their hash values to allow for fast access to individual elements directly by their <i>key values</i> 
	 * (with a constant average time complexity on average). </p>
	 *
	 * <p> Elements with equivalent <i>keys</i> are grouped together in the same bucket and in such a way that 
	 * an iterator can iterate through all of them. Iterators in the container are doubly linked iterators. </p>
	 *
	 * <p> <img src="../assets/images/design/map_containers.png" width="100%" /> </p>
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
	 *	<dt> Map </dt>
	 *	<dd> Each element associates a <i>key</i> to a <i>mapped value</i>: 
	 *		 <i>Keys</i> are meant to identify the elements whose main content is the <i>mapped value</i>. </dd>
	 * 
	 *	<dt> Multiple equivalent keys </dt>
	 *	<dd> The container can hold multiple elements with equivalent <i>keys</i>. </dd>
	 * </dl>
	 *
	 * @param <Key> Type of the key values. 
	 *				Each element in an {@link HashMap} is identified by a key value.
	 * @param <T> Type of the mapped value. 
	 *			  Each element in an {@link HashMap} is used to store some data as its mapped value.
	 *
	 * @reference http://www.cplusplus.com/reference/unordered_map/unordered_multimap
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export class HashMultiMap<Key, T>
		extends base.MultiMap<Key, T>
	{
		/**
		 * 
		 */
		private hash_buckets_: base.MapHashBuckets<Key, T>;

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

			this.hash_buckets_ = new base.MapHashBuckets<Key, T>(this);
		}

		/**
		 * @hidden
		 */
		protected construct_from_array(items: Array<Pair<Key, T>>): void
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
		public find(key: Key): MapIterator<Key, T>
		{
			return this.hash_buckets_.find(key);
		}

		/**
		 * @inheritdoc
		 */
		public count(key: Key): number
		{
			// FIND MATCHED BUCKET
			let index = std.hash(key) % this.hash_buckets_.item_size();
			let bucket = this.hash_buckets_.at(index);

			// ITERATE THE BUCKET
			let cnt: number = 0;
			for (let i = 0; i < bucket.length; i++)
				if (std.equal_to(bucket[i].first, key))
					cnt++;

			return cnt;
		}

		/**
		 * @inheritdoc
		 */
		public begin(): MapIterator<Key, T>;

		/**
		 * @inheritdoc
		 */
		public begin(index: number): MapIterator<Key, T>;
		
		public begin(index?: number): MapIterator<Key, T>
		{
			if (index == undefined)
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

		public end(index?: number): MapIterator<Key, T>
		{
			if (index == undefined)
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

		public rbegin(index?: number): MapReverseIterator<Key, T>
		{
			if (index == undefined)
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

		public rend(index?: number): MapReverseIterator<Key, T>
		{
			if (index == undefined)
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
		public bucket(key: Key): number
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
		protected insert_by_pair(pair: Pair<Key, T>): any
		{
			// INSERT
			let it = new MapIterator<Key, T>(this, this.data_.insert(this.data_.end(), pair));

			this.handle_insert(it, it.next()); // POST-PROCESS
			return it;
		}

		/**
		 * @hidden
		 */
		protected insert_by_hint(hint: MapIterator<Key, T>, pair: Pair<Key, T>): MapIterator<Key, T>
		{
			// INSERT
			let list_it = this.data_.insert(hint.get_list_iterator(), pair);

			// POST-PROCESS
			let it = new MapIterator<Key, T>(this, list_it);
			this.handle_insert(it, it.next());

			return it;
		}

		/**
		 * @hidden
		 */
		protected insert_by_range<L extends Key, U extends T, InputIterator extends Iterator<Pair<L, U>>>
			(first: InputIterator, last: InputIterator): void
		{
			// INSERT ELEMENTS
			let list_iterator = this.data_.insert(this.data_.end(), first, last);
			let my_first = new MapIterator<Key, T>(this, list_iterator);

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
		protected handle_insert(first: MapIterator<Key, T>, last: MapIterator<Key, T>): void
		{
			for (; !first.equal_to(last); first = first.next())
				this.hash_buckets_.insert(first);
		}

		/**
		 * @inheritdoc
		 */
		protected handle_erase(first: MapIterator<Key, T>, last: MapIterator<Key, T>): void
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
		public swap(obj: base.MultiMap<Key, T>): void
		{
			if (obj instanceof HashMultiMap)
				this.swap_hash_multimap(obj);
			else
				super.swap(obj);
		}

		/**
		 * @hidden
		 */
		private swap_hash_multimap(obj: HashMultiMap<Key, T>): void
		{
			[this.data_, obj.data_] = [obj.data_, this.data_];
			[this.hash_buckets_, obj.hash_buckets_] = [obj.hash_buckets_, this.hash_buckets_];
		}
	}
}