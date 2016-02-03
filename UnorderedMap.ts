/// <reference path="base/container/UniqueMap.ts" />

namespace std
{
	/**
	 * <p> Unordered Map, another word, Hash Map. </p>
	 *
	 * <p> Unordered maps are associative containers that store elements formed by the combination of a key value 
	 * and a mapped value, and which allows for fast retrieval of individual elements based on their keys. </p>
	 *
	 * <p> In an <code>UnorderedMap</code>, the key value is generally used to uniquely identify the element, 
	 * while the mapped value is an object with the content associated to this key. Types of key and mapped 
	 * value may differ. </p>
	 *
	 * <p> Internally, the elements in the <code>UnorderedMap</code> are not sorted in any particular order with 
	 * respect to either their key or mapped values, but organized into buckets depending on their hash values to 
	 * allow for fast access to individual elements directly by their key values (with a constant average time 
	 * complexity on average). </p>
	 *
	 * <p> <code>UnorderedMap</code> containers are faster than map containers to access individual elements by 
	 * their key, although they are generally less efficient for range iteration through a subset of their 
	 * elements. </p>
	 *
	 * <p> Unordered maps implement the direct access operator (<code>get()</code>) which allows for direct access 
	 * of the mapped value using its key value as argument. </p>
	 *
	 * <ul>
	 *  <li> Designed by C++ Reference: http://www.cplusplus.com/reference/unordered_map/unordered_map/ </li>
	 * </ul>
	 *
	 * @param <K> Type of the key values. 
	 *			  Each element in an <code>UnorderedMap</code> is uniquely identified by its key value.
	 * @param <T> Type of the mapped value. 
	 *			  Each element in an <code>UnorderedMap</code> is used to store some data as its mapped value.
	 *
	 * @author Migrated by Jeongho Nam
	 */
	export class UnorderedMap<K, T>
		extends base.container.UniqueMap<K, T>
	{
		private hashBuckets: base.hash.MapHashBuckets<K, T>;
	
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
		public constructor(array: Array<Pair<K, T>>);

		/**
		 * Copy Constructor.
		 */
		public constructor(container: base.container.MapContainer<K, T>);

		/**
		 * Construct from range iterators.
		 */
		public constructor(begin: MapIterator<K, T>, end: MapIterator<K, T>);

		public constructor(...args: any[])
		{
			super();

			// HASH_BUCKET
			this.hashBuckets = new base.hash.MapHashBuckets<K, T>(this);

			// OVERLOADINGS
			if (args.length == 1 && args[0] instanceof Array)
			{
				this.constructByArray(args[0]);
			}
			else if (args.length == 1 && args[0] instanceof base.container.MapContainer)
			{
				this.constructByContainer(args[0]);
			}
			else if (args.length == 2 && args[0] instanceof MapIterator && args[1] instanceof MapIterator)
			{
				this.constructByRange(args[0], args[1]);
			}
		}

		protected constructByArray(items: Array<Pair<K, T>>): void
		{
			this.hashBuckets.reserve(items.length * base.hash.RATIO);

			super.constructByArray(items);
		}
		
		/* ---------------------------------------------------------
			ASSIGN & CLEAR
		--------------------------------------------------------- */
		/**
		 * @inheritdoc
		 */
		public assign<L extends K, U extends T>
			(begin: MapIterator<L, U>, end: MapIterator<L, U>): void
		{
			let it: MapIterator<L, U>;
			let size: number = 0;
			
			// RESERVE HASH_BUCKET SIZE
			for (it = begin; it.equals(end) == false; it = it.next())
				size++;

			this.hashBuckets.clear();
			this.hashBuckets.reserve(size * base.hash.RATIO);

			// SUPER; INSERT
			super.assign(begin, end);
		}
		
		/**
		 * @inheritdoc
		 */
		public clear(): void
		{
			super.clear();

			this.hashBuckets.clear();
		}

		/* =========================================================
			ACCESSORS
		========================================================= */
		/**
		 * @inheritdoc
		 */
		public find(key: K): MapIterator<K, T>
		{
			return this.hashBuckets.find(key);
		}

		/* =========================================================
			ELEMENTS I/O
				- INSERT
				- POST-PROCESS
		============================================================
			INSERT
		--------------------------------------------------------- */
		protected insertByPair<L extends K, U extends T>(pair: Pair<L, U>): any
		{
			// TEST WHETHER EXIST
			let it = this.find(pair.first);
			if (it.equals(this.end()) == false)
				return new Pair<MapIterator<K, T>, boolean>(it, false);

			// INSERT
			this.data.pushBack(pair);
			it = it.prev();

			// POST-PROCESS
			this.handleInsert(<MapIterator<K, T>>it);

			return new Pair<MapIterator<K, T>, boolean>(it, true);
		}

		protected insertByRange<L extends K, U extends T>
			(begin: MapIterator<L, U>, end: MapIterator<L, U>): void
		{
			// CALCULATE INSERTING SIZE
			let size: number = 0;
			for (let it = begin; it.equals(end) == false; it = it.next())
				size++;

			// IF NEEDED, HASH_BUCKET TO HAVE SUITABLE SIZE
			if (this.size() + size > this.hashBuckets.itemSize() * base.hash.MAX_RATIO)
				this.hashBuckets.reserve((this.size() + size) * base.hash.RATIO);

			// INSERTS
			super.insertByRange(begin, end);
		}

		/* ---------------------------------------------------------
			POST-PROCESS
		--------------------------------------------------------- */
		/**
		 * @inheritdoc
		 */
		protected handleInsert(it: MapIterator<K, T>): void
		{
			this.hashBuckets.insert(it);
		}

		/**
		 * @inheritdoc
		 */
		protected handleErase(it: MapIterator<K, T>): void
		{
			this.hashBuckets.erase(it);
		}
	}
}