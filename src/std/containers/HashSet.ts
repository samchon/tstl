/// <reference path="../API.ts" />

/// <reference path="../base/containers/UniqueSet.ts" />
/// <reference path="../base/iterators/SetIterator.ts" />

namespace std
{
	/**
	 * Hashed, unordered set.
	 *
	 * {@link HashSet}s are containers that store unique elements in no particular order, and which 
	 * allow for fast retrieval of individual elements based on their value.
	 *
	 * In an {@link HashSet}, the value of an element is at the same time its <i>key</i>, that 
	 * identifies it uniquely. Keys are immutable, therefore, the elements in an {@link HashSet} cannot be 
	 * modified once in the container - they can be inserted and removed, though.
	 *
	 * Internally, the elements in the {@link HashSet} are not sorted in any particular order, but 
	 * organized into buckets depending on their hash values to allow for fast access to individual elements 
	 * directly by their <i>values</i> (with a constant average time complexity on average).
	 *
	 * {@link HashSet} containers are faster than {@link TreeSet} containers to access individual 
	 * elements by their <i>key</i>, although they are generally less efficient for range iteration through a 
	 * subset of their elements.
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
		extends base.UniqueSet<T, HashSet<T>>
		implements base.IHashSet<T, HashSet<T>>
	{
		/**
		 * @hidden
		 */
		private hash_buckets_: base._SetHashBuckets<T, HashSet<T>>;

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
		public constructor(container: HashSet<T>);

		/**
		 * Construct from range iterators.
		 */
		public constructor(begin: IForwardIterator<T>, end: IForwardIterator<T>);

		public constructor(...args: any[])
		{
			// INIT MEMBERS
			super();
			this.hash_buckets_ = new base._SetHashBuckets<T, HashSet<T>>(this);

			// BRANCH - METHOD OVERLOADINGS
			if (args.length == 0)
			{
				// DO NOTHING
			}
			else if (args.length == 1 && args[0] instanceof HashSet)
			{
				// COPY CONSTRUCTOR
				let container: HashSet<T> = args[0];

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
		public find(key: T): HashSet.Iterator<T>
		{
			return this.hash_buckets_.find(key);
		}

		/**
		 * @inheritdoc
		 */
		public begin(): HashSet.Iterator<T>;

		/**
		 * @inheritdoc
		 */
		public begin(index: number): HashSet.Iterator<T>;

		public begin(index: number = -1): HashSet.Iterator<T>
		{
			if (index == -1)
				return super.begin();
			else
				return this.hash_buckets_.at(index).front();
		}

		/**
		 * @inheritdoc
		 */
		public end(): HashSet.Iterator<T>;

		/**
		 * @inheritdoc
		 */
		public end(index: number): HashSet.Iterator<T>

		public end(index: number = -1): HashSet.Iterator<T>
		{
			if (index == -1)
				return super.end();
			else
				return this.hash_buckets_.at(index).back().next();
		}

		/**
		 * @inheritdoc
		 */
		public rbegin(): HashSet.ReverseIterator<T>;

		/**
		 * @inheritdoc
		 */
		public rbegin(index: number): HashSet.ReverseIterator<T>;

		public rbegin(index: number = -1): HashSet.ReverseIterator<T>
		{
			if (index == -1)
				return super.rbegin();
			else
				return new base.SetReverseIterator<T, HashSet<T>>(this.end(index));
		}

		/**
		 * @inheritdoc
		 */
		public rend(): HashSet.ReverseIterator<T>;

		/**
		 * @inheritdoc
		 */
		public rend(index: number): HashSet.ReverseIterator<T>;

		public rend(index: number = -1): HashSet.ReverseIterator<T>
		{
			if (index == -1)
				return super.rend();
			else
				return new base.SetReverseIterator<T, HashSet<T>>(this.begin(index));
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
		protected _Insert_by_val(val: T): Pair<HashSet.Iterator<T>, boolean>
		{
			// TEST WHETHER EXIST
			let it: HashSet.Iterator<T> = this.find(val);
			if (it.equals(this.end()) == false)
				return make_pair(it, false);

			// INSERT
			this["data_"].push(val);
			it = it.prev();

			// POST-PROCESS
			this._Handle_insert(it, it.next());

			return make_pair(it, true);
		}

		/**
		 * @hidden
		 */
		protected _Insert_by_hint(hint: HashSet.Iterator<T>, val: T): HashSet.Iterator<T>
		{
			// FIND DUPLICATED KEY
			let it: HashSet.Iterator<T> = this.find(val);
			if (it.equals(this.end()) == true)
			{
				// INSERT
				it = this["data_"].insert(hint, val);

				// POST-PROCESS
				this._Handle_insert(it, it.next());
			}
			return it;
		}

		/**
		 * @hidden
		 */
		protected _Insert_by_range<U extends T, InputIterator extends IForwardIterator<U>>
			(first: InputIterator, last: InputIterator): void
		{
			let my_first: HashSet.Iterator<T> = this.end().prev();
			let size: number = 0;

			for (; !first.equals(last); first = first.next() as InputIterator)
			{
				// TEST WHETER EXIST
				if (this.has(first.value))
					continue;
				
				// INSERTS
				this["data_"].push(first.value);
				size++;
			}
			my_first = my_first.next();
			
			// IF NEEDED, HASH_BUCKET TO HAVE SUITABLE SIZE
			if (this.size() + size > this.hash_buckets_.size() * base._Hash.MAX_RATIO)
				this.hash_buckets_.rehash((this.size() + size) * base._Hash.RATIO);

			// INSERTS
			this._Handle_insert(my_first, this.end());
		}

		/* ---------------------------------------------------------
			POST-PROCESS
		--------------------------------------------------------- */
		/**
		 * @hidden
		 */
		protected _Handle_insert(first: HashSet.Iterator<T>, last: HashSet.Iterator<T>): void
		{
			for (; !first.equals(last); first = first.next())
				this.hash_buckets_.insert(first);
		}

		/**
		 * @hidden
		 */
		protected _Handle_erase(first: HashSet.Iterator<T>, last: HashSet.Iterator<T>): void
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
		 * {@link HashSet set} of the same type. Sizes abd container type may differ.
		 * 
		 * After the call to this member function, the elements in this container are those which were 
		 * in <i>obj</i> before the call, and the elements of <i>obj</i> are those which were in this. All 
		 * iterators, references and pointers remain valid for the swapped objects.
		 *
		 * Notice that a non-member function exists with the same name, {@link swap swap}, overloading that 
		 * algorithm with an optimization that behaves like this member function.
		 * 
		 * @param obj Another {@link HashSet set container} of the same type of elements as this (i.e.,
		 *			  with the same template parameters, <b>Key</b> and <b>T</b>) whose content is swapped 
		 *			  with that of this {@link HashSet container}.
		 */
		public swap(obj: HashSet<T>): void
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
namespace std.HashSet
{
	//----
	// PASCAL NOTATION
	//----
	// HEAD
	export type Iterator<T> = base.SetIterator<T, HashSet<T>>;
	export type ReverseIterator<T> = base.SetReverseIterator<T, HashSet<T>>;

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
