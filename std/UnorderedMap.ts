/// <reference path="AbstractMap.ts" />

/// <reference path="Hash.ts" />

namespace std
{
    /**
     * <p> Unordered Map. </p>
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
     * @tparam K Type of the key values. 
     *           Each element in an <code>UnorderedMap</code> is uniquely identified by its key value.
     * @tparam T Type of the mapped value. 
     *           Each element in an <code>UnorderedMap</code> is used to store some data as its mapped value.
     *
     * @author Migrated by Jeongho Nam
     */
    export class UnorderedMap<K, T>
        extends AbstractMap<K, T>
    {
        private hashGroup: Vector<Vector<MapIterator<K, T>>>;
	
        /* =========================================================
		    CONSTRUCTORS & SEMI-CONSTRUCTORS
                - CONSTRUCTORS
                - ASSIGN & CLEAR
                - HASH GROUP
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
        public constructor(container: PairContainer<K, T>);

        /**
         * Construct from range iterators.
         */
        public constructor(begin: PairIterator<K, T>, end: PairIterator<K, T>);

	    public constructor(...args: any[])
	    {
            this.constructHashGroup();

            if (args.length == 0) 
            {
                super();
            }
            else if (args.length == 1) 
            {
                super(args[0]);
            }
            else if (args.length == 2) 
            {
                super(args[0], args[1]);
            }
        }

        protected constructByArray(items: Array<Pair<K, T>>): void
        {
            this.constructHashGroup(items.length * Hash.RATIO);

            super.constructByArray(items);
        }
        
        /* ---------------------------------------------------------
		    ASSIGN & CLEAR
	    --------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        public assign<L extends K, U extends T>
            (begin: PairIterator<L, U>, end: PairIterator<L, U>): void
        {
            var it: PairIterator<L, U>;
            var size: number = 0;
            
            // REVERSE HASH_GROUP SIZE
            for (it = begin; it.equals(end) == false; it = it.next())
                size++;

            this.constructHashGroup(size * Hash.RATIO);

            // SUPER; INSERT
            super.assign(begin, end);
        }
        0
        /**
         * @inheritdoc
         */
        public clear(): void
        {
            super.clear();

            this.constructHashGroup();
        }

        /* ---------------------------------------------------------
		    HASH GROUP
	    --------------------------------------------------------- */
        private constructHashGroup(size: number = -1): void 
        {
            if (size < Hash.MIN_SIZE)
                size = Hash.MIN_SIZE;

            // CLEAR
            this.hashGroup = new Vector<Vector<MapIterator<K, T>>>();

            // AND INSERTS WITHI CAPACITY SIZE
            for (var i: number = 0; i < size; i++)
                this.hashGroup.pushBack(new Vector<MapIterator<K, T>>());
        }

        private reconstructHashGroup(size: number = -1): void
        {
            if (size == -1)
                size = this.size() * Hash.RATIO;

            // CONSTURCT HASH_GROUP
            this.constructHashGroup(size);

            // INSERT ELEMENTS TO HASH GROUP
            for (var it = this.begin(); it.equals(this.end()) == false; it = it.next())
                this.handleInsert(<MapIterator<K, T>>it);
        }

	    /* =========================================================
		    ACCESSORS
	    ========================================================= */
        /**
	     * @inheritdoc
	     */
        public find(key: K): PairIterator<K, T>
        {
            var hashIndex: number = this.hashIndex(key);
            var hashArray = this.hashGroup.at(hashIndex);

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
        protected insertByRange<L extends K, U extends T>
            (begin: PairIterator<L, U>, end: PairIterator<L, U>): void
        {
            // CALCULATE INSERTING SIZE
            var size: number = 0;
            for (var it = begin; it.equals(end) == false; it = it.next())
                size++;

            // IF NEEDED, HASH_GROUP TO HAVE SUITABLE SIZE
            if (this.size() + size > this.hashGroup.size() * 2)
                this.reconstructHashGroup((this.size() + size) * Hash.RATIO);

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
            if (this.hashGroup.size() > this.size() * 2)
                this.reconstructHashGroup();

            var key: K = it.first;
            var hashIndex: number = this.hashIndex(key);

            this.hashGroup.at(hashIndex).pushBack(it);
        }

        /**
         * @inheritdoc
         */
        protected handleErase(it: MapIterator<K, T>): void
        {
            // FIND MATCHED HASHES
            var key: K = it.first;
            var hashIndex: number = this.hashIndex(key);
            
            var hashVector = this.hashGroup.at(hashIndex);

            // ERASE FROM THE HASHES
            for (var i: number = 0; i < hashVector.size(); i++)
            {
                if (std.equals(it.first, hashVector.at(i).first) == true)
                {
                    hashVector.erase(hashVector.begin().advance(i));
                    break;
                }
            }
        }

        private hashIndex(val: any): number
        {
            return Hash.code(val) % this.hashGroup.size();
        }
    }
}