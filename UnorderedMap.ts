/// <reference path="base/UniqueMap.ts" />

/// <reference path="base/Hash.ts" />

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
        extends base.UniqueMap<K, T>
    {
        private hashBucket: base.HashBucket<MapIterator<K, T>>;
	
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
        public constructor(container: base.MapContainer<K, T>);

        /**
         * Construct from range iterators.
         */
        public constructor(begin: MapIterator<K, T>, end: MapIterator<K, T>);

	    public constructor(...args: any[])
	    {
			super();

			// HASH_BUCKET
			this.hashBucket = new base.HashBucket<MapIterator<K, T>>();

			// OVERLOADINGS
			if (args.length == 1 && args[0] instanceof Array)
			{
				this.constructByArray(args[0]);
			}
			else if (args.length == 1 && args[0] instanceof base.MapContainer)
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
            this.hashBucket.reserve(items.length * base.Hash.RATIO);

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
            var it: MapIterator<L, U>;
            var size: number = 0;
            
            // RESERVE HASH_BUCKET SIZE
            for (it = begin; it.equals(end) == false; it = it.next())
                size++;

            this.hashBucket.clear();
            this.hashBucket.reserve(size * base.Hash.RATIO);

            // SUPER; INSERT
            super.assign(begin, end);
        }
        
        /**
         * @inheritdoc
         */
        public clear(): void
        {
            super.clear();

            this.hashBucket.clear();
        }

	    /* =========================================================
		    ACCESSORS
	    ========================================================= */
        /**
	     * @inheritdoc
	     */
        public find(key: K): MapIterator<K, T>
        {
            var hashIndex: number = base.Hash.code(key) % this.hashBucket.size();
            var hashArray = this.hashBucket.at(hashIndex);

            for (var i: number = 0; i < hashArray.size(); i++)
                if (std.equals(hashArray.at(i).first, key))
                    return hashArray.at(i);

            return this.end();
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
            var it = this.find(pair.first);
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
            var size: number = 0;
            for (var it = begin; it.equals(end) == false; it = it.next())
                size++;

            // IF NEEDED, HASH_BUCKET TO HAVE SUITABLE SIZE
            if (this.size() + size > this.hashBucket.itemSize() * base.Hash.MAX_RATIO)
                this.hashBucket.reserve((this.size() + size) * base.Hash.RATIO);

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
            this.hashBucket.insert(it);
        }

        /**
         * @inheritdoc
         */
        protected handleErase(it: MapIterator<K, T>): void
        {
            this.hashBucket.erase(it);
        }
    }
}