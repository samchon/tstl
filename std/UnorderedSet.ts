/// <reference path="AbstractSet.ts" />

/// <reference path="Hash.ts" />

namespace std
{
    /**
     * <p> Unordered Set. </p>
     *
     * <p> Unordered sets are containers that store unique elements in no particular order, and which allow for 
     * fast retrieval of individual elements based on their value. </p>
     *
     * <p> In an <code>UnorderedSet</code>, the value of an element is at the same time its key, that identifies 
     * it uniquely. Keys are immutable, therefore, the elements in an <code>UnorderedSet</code> cannot be modified 
     * once in the container - they can be inserted and removed, though. </p>
     *
     * <p> Internally, the elements in the <code>UnorderedSet</code> are not sorted in any particular order, but 
     * organized into buckets depending on their hash values to allow for fast access to individual elements directly 
     * by their values (with a constant average time complexity on average). </p>
     *
     * <p> <code>UnorderedSet</code> containers are faster than <codeSet<code> containers to access individual 
     * elements by their key, although they are generally less efficient for range iteration through a subset of 
     * their elements. </p>
     *
     * <ul>
     *  <li> Designed by C++ Reference: http://www.cplusplus.com/reference/unordered_set/unordered_set/ </li>
     * </ul>
     *
     * @tparam T Type of the elements. 
     *           Each element in an <code>UnorderedSet</code> is also uniquely identified by this value.
     *
     * @author Migrated by Jeongho Nam
     */
    export class UnorderedSet<T>
        extends AbstractSet<T>
    {
        private hashGroup: Vector<Vector<SetIterator<T>>>;

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
        public constructor(items: Array<T>);

        /**
         * Copy Constructor.
         */
        public constructor(container: IContainer<T>);

        /**
         * Construct from range iterators.
         */
        public constructor(begin: Iterator<T>, end: Iterator<T>);

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
        
        protected constructByArray(items: Array<T>): void
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
        public assign<U extends T>(begin: Iterator<U>, end: Iterator<U>): void
        {
            var it: Iterator<U>;
            var size: number = 0;
            
            // REVERSE HASH_GROUP SIZE
            for (it = begin; it.equals(end) == false; it = it.next())
                size++;

            this.constructHashGroup(size * Hash.RATIO);

            // SUPER; INSERT
            super.assign(begin, end);
        }

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
            this.hashGroup = new Vector<Vector<SetIterator<T>>>();

            // AND INSERTS WITHI CAPACITY SIZE
            for (var i: number = 0; i < size; i++)
                this.hashGroup.pushBack(new Vector<SetIterator<T>>());
        }

        private reconstructHashGroup(size: number = -1): void
        {
            if (size == -1)
                size = this.size() * Hash.RATIO;

            // CONSTURCT HASH_GROUP
            this.constructHashGroup(size);

            //RE-INSERT ELEMENTS TO HASH GROUP
            for (var it = this.begin(); it.equals(this.end()) == false; it = it.next())
                this.handleInsert(<SetIterator<T>>it);
        }

        /* =========================================================
		    ACCESSORS
	    ========================================================= */
        /**
         * @inheritdoc
         */
        public find(val: T): Iterator<T>
        {
            var hashIndex: number = this.hashIndex(val);
            var hashArray = this.hashGroup.at(hashIndex);

            for (var i: number = 0; i < hashArray.size(); i++)
                if (std.equals(hashArray.at(i).value, val))
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
        protected insertByRange(begin: Iterator<T>, end: Iterator<T>): void
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
        protected handleInsert(item: SetIterator<T>): void
        {
            if (this.size() > this.hashGroup.size() * Hash.MAX_RATIO)
                this.reconstructHashGroup();

            var index: number = this.hashIndex(item.value);
            this.hashGroup.at(index).push(item);
        }

        /**
         * @inheritdoc
         */
        protected handleErase(item: SetIterator<T>): void
        {
            var index: number = this.hashIndex(item.value);
            var hashArray = this.hashGroup.at(index);
            
            for (var it = hashArray.begin(); it.equals(hashArray.end()) == false; it = it.next())
                if (it.value == item)
                {
                    hashArray.erase(it);
                    break;
                }
        }
        
        private hashIndex(val: any): number
        {
            return Hash.code(val) % this.hashGroup.size();
        }
    }
}