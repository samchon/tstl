/// <reference path="base/container/MultiSet.ts" />

namespace std
{
	/**
	 * <p> Hashed, unordered Multiset. </p>
	 *
	 * <p> {@link HashMultiSet HashMultiSets} are containers that store elements in no particular order, allowing fast 
	 * retrieval of individual elements based on their value, much like {@link UnorderedSet} containers, 
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
	 * <ul>
	 *  <li> Reference: http://www.cplusplus.com/reference/unordered_set/unordered_multiset/ </li>
	 * </ul>
	 *
	 * @param <T> Type of the elements. 
	 *		   Each element in an {@link UnorderedMultiSet} is also identified by this value..
	 *
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export class HashMultiSet<T>
		extends base.container.MultiSet<T>
	{
		private hashBuckets: base.hash.SetHashBuckets<T>;

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
		public constructor(items: Array<T>);

		/**
		 * Copy Constructor.
		 */
		public constructor(container: base.container.IContainer<T>);

		/**
		 * Construct from range iterators.
		 */
		public constructor(begin: base.container.Iterator<T>, end: base.container.Iterator<T>);

		public constructor(...args: any[])
		{
			super();
			
			// BUCKET
			this.hashBuckets = new base.hash.SetHashBuckets<T>(this);

			// OVERLOADINGS
			if (args.length == 1 && args[0] instanceof Array && args[0] instanceof Vector == false)
			{
				this.constructByArray(args[0]);
			}
			else if (args.length == 1 && args[0] instanceof base.container.Container)
		   { 
				this.constructByContainer(args[0]);
			}
			else if (args.length == 2 && args[0] instanceof base.container.Iterator && args[1] instanceof base.container.Iterator)
			{
				this.constructByRange(args[0], args[1]);
			}
		}

		/**
		 * @private
		 */
		protected constructByArray(items: Array<T>): void
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
		public assign<U extends T>(begin: base.container.Iterator<U>, end: base.container.Iterator<U>): void
		{
			let it: base.container.Iterator<U>;
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
		public find(val: T): SetIterator<T>
		{
			return this.hashBuckets.find(val);
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
		protected insertByVal(val: T): any
		{
			// INSERT
			let listIterator = this.data.insert(this.data.end(), val);

			let it = new SetIterator<T>(this, listIterator);

			// POST-PROCESS
			this.handleInsert(it);

			return it;
		}

		/**
		 * @private
		 */
		protected insertByRange(begin: base.container.Iterator<T>, end: base.container.Iterator<T>): void
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
		protected handleInsert(it: SetIterator<T>): void
		{
			this.hashBuckets.insert(it);
		}

		/**
		 * @inheritdoc
		 */
		protected handleErase(it: SetIterator<T>): void
		{
			this.hashBuckets.erase(it);
		}
	}
}