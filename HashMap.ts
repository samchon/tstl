/// <reference path="base/container/UniqueMap.ts" />

namespace std
{
	/**
	 * <p> Hashed, unordered map. </p>
	 *
	 * <p> <code>HashMap</code>s are associative containers that store elements formed by the 
	 * combination of a <i>key value</i> and a <i>mapped value</i>, and which allows for fast 
	 * retrieval of individual elements based on their <i>keys</i>. </p>
	 *
	 * <p> In an <code>HashMap</code>, the <i>key value</i> is generally used to uniquely identify  
	 * the element, while the <i>mapped value</i> is an object with the content associated to this 
	 * <i>key</i>. Types of <i>key</i> and <i>mapped value</i> may differ. </p>
	 *
	 * <p> Internally, the elements in the <code>HashMap</code> are not sorted in any particular order 
	 * with respect to either their <i>key</i> or <i>mapped values</i>, but organized into <i>buckets</i> 
	 * depending on their hash values to allow for fast access to individual elements directly by 
	 * their <i>key values</i> (with a constant average time complexity on average). </p>
	 *
	 * <p> <code>HashMap</code> containers are faster than <code>TreeMap</code> containers to access 
	 * individual elements by their <i>key</i>, although they are generally less efficient for range 
	 * iteration through a subset of their elements. </p>
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
	 * <ul>
	 *  <li> Reference: http://www.cplusplus.com/reference/unordered_map/unordered_map/ </li>
	 * </ul>
	 *
	 * @param <K> Type of the key values. 
	 *			  Each element in an <code>HashMap</code> is uniquely identified by its key value.
	 * @param <T> Type of the mapped value. 
	 *			  Each element in an <code>HashMap</code> is used to store some data as its mapped value.
	 *
	 * @author Jeongho Nam
	 */
	export class HashMap<K, T>
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

		/**
		 * @private
		 */
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
		/**
		 * @private
		 */
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

		/**
		 * @private
		 */
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