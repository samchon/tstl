/// <reference path="PairContainer.ts" />

/// <reference path="MapIterator.ts" />
/// <reference path="List.ts" />

namespace std
{
    /**
     * Abstract Map.
     *
     * @tparam K Type of the key values. 
     *           Each element in an <code>UnorderedMap</code> is uniquely identified by its key value.
     * @tparam T Type of the mapped value. 
     *           Each element in an <code>UnorderedMap</code> is used to store some data as its mapped value.
     *
     * @author Jeongho Nam
     */
    export abstract class AbstractMap<K, T>
        extends PairContainer<K, T>
    {
	    private data: List<Pair<K, T>>;
        
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
        public constructor(container: PairContainer<K, T>);

        /**
         * Construct from range iterators.
         */
        public constructor(begin: PairIterator<K, T>, end: PairIterator<K, T>);

	    public constructor(...args: any[])
	    {
            super();
            
            // INITIALIZATION
            this.data = new List<Pair<K, T>>();

            // OVERLOADINGS
            if (args.length == 1 && args[0] instanceof Array && args[0] instanceof Vector == false)
            {
                this.constructByArray(args[0]);
            }
            else if (args.length == 1 && args[0] instanceof PairContainer)
            {
                this.constructByContainer(args[0]);
            }
            else if (args.length == 2 && args[0] instanceof PairIterator && args[1] instanceof PairIterator)
            {
                this.constructByRange(args[0], args[1]);
            }
	    }

        protected constructByArray(items: Array<Pair<K, T>>): void
        {
            for (var i: number = 0; i < items.length; i++)
            {
                if (this.has(items[i].first) == true)
                    continue;

                this.insert(items[i]);
            }
        }
        private constructByContainer(container: PairContainer<K, T>): void
        {
            this.constructByRange(container.begin(), container.end());
        }
        private constructByRange(begin: PairIterator<K, T>, end: PairIterator<K, T>): void
        {
            this.assign(begin, end);
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
            // INSERT
            for (var it = begin; it.equals(end) == false; it = it.next())
                this.insert(new Pair<K, T>(it.first, it.second));
        }

        /**
         * @inheritdoc
         */
        public clear(): void
        {
            this.data.clear();
        }

	    /* =========================================================
		    ACCESSORS
                - ITERATORS
                - ELEMENTS
	    ============================================================
            ITERATOR
        --------------------------------------------------------- */
        /**
         * <p> Get iterator to element. </p>
         * 
         * <p> Searches the container for an element with <code>key</code> as value and returns an iterator to it 
         * if found, otherwise it returns an iterator to <code>end()</code> (the element past the end of the 
         * container). </p>
         *
         * <p> Another member function, <code>count()</code>, can be used to just check whether a particular 
         * element exists. </p>
         *
         * @param key Key to be searched for.
         *
         * @return An iterator to the element, if the specified pair is found, 
         *         or <code>end()</code> if it is not found in the container.
         */
        public abstract find(key: K): PairIterator<K, T>;

	    /**
	     * @inheritdoc
	     */
	    public begin(): PairIterator<K, T>
	    {
            return new MapIterator<K, T>(this, <ListIterator<Pair<K, T>>>this.data.begin());
	    }

	    /**
	     * @inheritdoc
	     */
        public end(): PairIterator<K, T>
	    {
            return new MapIterator<K, T>(this, <ListIterator<Pair<K, T>>>this.data.end());
	    }

        /* ---------------------------------------------------------
		    ELEMENTS
	    --------------------------------------------------------- */
        /**
	     * <p> Whether have the item or not. </p>
	     * <p> Indicates whether a map has an item having the specified identifier. </p>
	     *
	     * @param key Key value of the element whose mapped value is accessed.
	     * @return Whether the map has an item having the specified identifier.
	     */
        public has(key: K): boolean
        {
            return this.count(key) != 0;
        }
        
        /**
	     * <p> Get element by key. </p>
	     * <p> Returns a reference to the mapped value of the element identified with key. </p>
	     *
	     * @param key Key value of the element whose mapped value is accessed.
	     * @throw exception out of range.
	     *
	     * @return A reference object of the mapped value (_Ty)
	     */
	    public get(key: K): T
	    {
            var it = this.find(key);

            if (it.equals(this.end()) == true)
                throw new OutOfRange("cannot find the specified key");

            return it.second;
	    }

        /**
	     * <p> Set element. </p>
	     * <p> Set an item as the specified identifier. </p>
	     * 
	     * <p> If the identifier is already in map, change value of the identifier.
	     * If not, then insert the object with the identifier. </p>
	     * 
	     * @param key Key value of the element whose mapped value is accessed.
	     * @param val Value, the item.
	     */
	    public set(key: K, value: T): void
	    {
            var it = this.find(key);

            if (it.equals(this.end()) == true)
                this.insert(new Pair<K, T>(key, value));
            else
                it.second = value;
	    }
        
        /**
         * <p> Count elements with a specific key. </p>
         * <p> Searches the container for elements with a value of k and returns the number of elements found. </p>
         *
         * @param key Key value of the elements to be counted.
         *
         * @return The number of elements in the container with a <code>key</code>.
         */
        public count(key: K): number
        {
            return (this.find(key).equals(this.end()) == false) ? 1 : 0;
        }

        /**
         * @inheritdoc
         */
        public size(): number
        {
            return this.data.size();
        }

	    /* =========================================================
		    ELEMENTS I/O
                - INSERT
                - ERASE
                - POST-PROCESS
                - HASH CODE
	    ============================================================
		    INSERT
	    --------------------------------------------------------- */
        public insert(pair: Pair<K, T>): Pair<PairIterator<K, T>, boolean>;
        public insert(hint: PairIterator<K, T>, pair: Pair<K, T>): PairIterator<K, T>;
        public insert<L extends K, U extends T>
            (begin: PairIterator<L, U>, end: PairIterator<L, U>): void;

        public insert(...args: any[]): any
        {
            if (args.length == 1 && args[0] instanceof Pair)
                return this.insertByPair(args[0]);
            else if (args.length == 2 && args[0] instanceof PairIterator && args[1] instanceof Pair)
                return this.insertByHint(args[0], args[1]);
            else if (args.length == 2 && args[0] instanceof PairIterator && args[1] instanceof PairIterator)
                return this.insertByRange(args[0], args[1]);
        }

        private insertByPair(pair: Pair<K, T>): Pair<PairIterator<K, T>, boolean>
        {
            // TEST WHETHER EXISTS
            var it = this.find(pair.first);
            if (it.equals(this.end()) == false)
                return new Pair<PairIterator<K, T>, boolean>(it, false);

            // INSERT
            this.data.pushBack(pair);
            it = it.prev();

            // POST-PROCESS
            this.handleInsert(<MapIterator<K, T>>it);

            return new Pair<PairIterator<K, T>, boolean>(it, true);
        }
        private insertByHint(hint: PairIterator<K, T>, pair: Pair<K, T>): PairIterator<K, T>
        {
            // INSERT
            var list_it: ListIterator<Pair<K, T>> = (<MapIterator<K, T>>hint).getListIterator();
            
            list_it = <ListIterator<Pair<K, T>>>
                this.data.insert((<MapIterator<K, T>>hint).getListIterator(), pair);

            // POST-PROCESS
            var it = new MapIterator<K, T>(this, list_it);
            
            this.handleInsert(it);

            return it;
        }
        protected insertByRange<L extends K, U extends T>
            (begin: PairIterator<L, U>, end: PairIterator<L, U>): void
        {
            for (var it = begin; it.equals(end) == false; it = it.next())
                this.insertByPair(new Pair<K, T>(it.first, it.second));
        }

        /* ---------------------------------------------------------
		    ERASE
	    --------------------------------------------------------- */
        public erase(key: K): number;
        public erase(it: PairIterator<K, T>): PairIterator<K, T>;
        public erase(begin: PairIterator<K, T>, end: PairIterator<K, T>): PairIterator<K, T>;

        public erase(...args: any[]): any 
        {
            if (args.length == 1)
                if (args[0] instanceof PairIterator && args[0].getSource() == this)
                    return this.eraseByIterator(args[0]);
                else
                    return this.eraseByKey(args[0]);
            else if (args.length == 2 && args[0] instanceof PairIterator && args[1] instanceof PairIterator)
                return this.eraseByRange(args[0], args[1]);
        }

        private eraseByKey(key: K): number
        {
            var it = this.find(key);
            if (it.equals(this.end()) == true)
                return 0;

            this.eraseByIterator(it);
            return 1;
        }
        private eraseByIterator(it: PairIterator<K, T>): PairIterator<K, T>
        {
            // ERASE
            var listIterator = <ListIterator<Pair<K, T>>>
                this.data.erase((<MapIterator<K, T>>it).getListIterator());
            
            // POST-PROCESS
            this.handleErase(<MapIterator<K, T>>it);

            return new MapIterator<K, T>(this, listIterator);;
        }
        private eraseByRange(begin: PairIterator<K, T>, end: PairIterator<K, T>): PairIterator<K, T>
        {
            // ERASE
            var listIterator = <ListIterator<Pair<K, T>>>
                this.data.erase
                (
                    (<MapIterator<K, T>>begin).getListIterator(), 
                    (<MapIterator<K, T>>end).getListIterator()
                );
            
            // POST-PROCESS
            for (var it = begin; it.equals(this.end()) == false; it = it.next())
                this.handleErase(<MapIterator<K, T>>it);

            return new MapIterator<K, T>(this, listIterator);
        }

        /* ---------------------------------------------------------
		    POST-PROCESS
	    --------------------------------------------------------- */
        protected abstract handleInsert(item: MapIterator<K, T>): void;

        protected abstract handleErase(item: MapIterator<K, T>): void;

	    /* ---------------------------------------------------------
		    COMPARE
	    --------------------------------------------------------- */
	    ///**
	    // * <p> Whether a Map is equal with the Map. </p>
	    // *
	    // * <p> Map::equals() does not compare reference(address of pointer) of Maps or elements 
	    // * in the two Maps. The target of comparison are the key and value in all children elements(pairs). 
	    // * It's not a matter that order sequence of children are different between two Maps. </p>
	    // *
	    // * <p> If stored key or value in a pair (element) in those Maps are not number or string, but an object
	    // * like a class or struct, the comparison will be executed by a member method (SomeObject)::equals(). If
	    // * the object does not have the member method equals(), only address of pointer will be compared. </p>
	    // *
	    // * @param obj A Map to compare
	    // * @return Indicates whether equal or not.
	    // */
	    //public equals(obj: UnorderedMap<K, T>): boolean
	    //{
		   // return false;
	    //}
    }
}