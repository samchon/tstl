/// <reference path="base/MultiSet.ts" />

/// <reference path="base/SetHashBuckets.ts" />

namespace std
{
    /**
     * <p> Unordered Multiset, in another word, Hashed MultiSet. </p>
     *
     * <p> Unordered multisets are containers that store elements in no particular order, allowing fast retrieval 
	 * of individual elements based on their value, much like UnorderedSet containers, but allowing different 
	 * elements to have equivalent values. </p>
	 *
	 * <p> In an UnorderedMultiSet, the value of an element is at the same time its key, used to identify it. 
	 * Keys are immutable, therefore, the elements in an unordered_multiset cannot be modified once in the 
	 * container - they can be inserted and removed, though. </p>
	 *
	 * <p> Internally, the elements in the unordered_multiset are not sorted in any particular, but organized 
	 * into buckets depending on their hash values to allow for fast access to individual elements directly by 
	 * their values (with a constant average time complexity on average). </p>
	 * 
	 * <p> Elements with equivalent values are grouped together in the same bucket and in such a way that an 
	 * iterator can iterate through all of them. Iterators in the container are doubly linked iterators. </p>
	 * 
     * <ul>
     *  <li> Designed by C++ Reference: http://www.cplusplus.com/reference/unordered_set/unordered_multiset/ </li>
     * </ul>
     *
     * @param <T> Type of the elements. 
     *           Each element in an <code>UnorderedMultiSet</code> is also identified by this value..
     *
     * @author Migrated by Jeongho Nam
     */
    export class UnorderedMultiSet<T>
        extends base.MultiSet<T>
    {
        private hashBuckets: base.SetHashBuckets<T>;

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
        public constructor(container: base.IContainer<T>);

        /**
         * Construct from range iterators.
         */
        public constructor(begin: Iterator<T>, end: Iterator<T>);

        public constructor(...args: any[])
        {
			super();
            
			// BUCKET
			this.hashBuckets = new base.SetHashBuckets<T>(this);

            // OVERLOADINGS
            if (args.length == 1 && args[0] instanceof Array && args[0] instanceof Vector == false)
            {
                this.constructByArray(args[0]);
            }
            else if (args.length == 1 && args[0] instanceof base.Container)
           { 
                this.constructByContainer(args[0]);
            }
            else if (args.length == 2 && args[0] instanceof Iterator && args[1] instanceof Iterator)
            {
                this.constructByRange(args[0], args[1]);
            }
        }

        protected constructByArray(items: Array<T>): void
        {
            this.hashBuckets.reserve(items.length * base.Hash.RATIO);

            super.constructByArray(items);
        }

        /* ---------------------------------------------------------
		    ASSIGN & CLEAR
	    --------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        public assign<U extends T>(begin: Iterator<U>, end: Iterator<U>): void
        {
            var it: Iterator<U>;
            var size: number = 0;
            
            // RESERVE HASH_BUCKET SIZE
            for (it = begin; it.equals(end) == false; it = it.next())
                size++;

            this.hashBuckets.clear();
            this.hashBuckets.reserve(size * base.Hash.RATIO);

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
        public find(val: T): Iterator<T>
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
		protected insertByVal(val: T): any
		{
            // INSERT
            var listIterator = <ListIterator<T>>this.data.insert(this.data.end(), val);

			var it = new SetIterator<T>(this, listIterator);

			// POST-PROCESS
			this.handleInsert(it);

			return it;
		}

        protected insertByRange(begin: Iterator<T>, end: Iterator<T>): void
        {
            // CALCULATE INSERTING SIZE
            var size: number = 0;
            for (var it = begin; it.equals(end) == false; it = it.next())
                size++;

            // IF NEEDED, HASH_BUCKET TO HAVE SUITABLE SIZE
            if (this.size() + size > this.hashBuckets.itemSize() * base.Hash.MAX_RATIO)
                this.hashBuckets.reserve((this.size() + size) * base.Hash.RATIO);

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