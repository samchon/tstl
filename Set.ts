/// <reference path="base/container/UniqueSet.ts" />

namespace std
{
	/**
	 * <p> Set, in other word, Tree Set. </p>
	 *
	 * <p> Sets are containers that store unique elements following a specific order. </p>
	 *
	 * <p> In a set, the value of an element also identifies it (the value is itself the key, of type T), and each 
	 * value must be unique. The value of the elements in a set cannot be modified once in the container 
	 * (the elements are always const), but they can be inserted or removed from the container. </p>
	 *
	 * <p> Internally, the elements in a set are always sorted following a specific strict weak ordering criterion 
	 * indicated by its internal comparison object (of type Compare). </p>
	 *
	 * <p> Set containers are generally slower than unordered_set containers to access individual elements by 
	 * their key, but they allow the direct iteration on subsets based on their order. </p>
	 *
	 * <p> Sets are typically implemented as binary search trees. </p>
	 *
	  * <ul>
     *  <li> Designed by C++ Reference: http://www.cplusplus.com/reference/set/set/ </li>
     * </ul>
	 *
	 * @param <T> Type of the elements. 
     *			  Each element in an <code>Set</code> is also uniquely identified by this value.
	 *
	 * @author Migrated by Jeongho Nam
	 */
    export class Set<T>
        extends base.container.UniqueSet<T>
    {
        /* =========================================================
		    CONSTRUCTORS & SEMI-CONSTRUCTORS
                - CONSTRUCTORS
                - ASSIGN & CLEAR
                - TREE
	    ============================================================
            CONSTURCTORS
        --------------------------------------------------------- */
        /**
         * Default Constructor
         */
        public constructor();

        public constructor(array: Array<T>);

        public constructor(container: base.container.Container<T>);

        public constructor(begin: Iterator<T>, end: Iterator<T>);
        
        public constructor(...args: any[])
        {
            super();
        }

        /* ---------------------------------------------------------
		    ASSIGN & CLEAR
	    --------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        public assign<U extends T>(begin: Iterator<U>, end: Iterator<U>): void
        {
            super.assign(begin, end);
        }

        /**
         * @inheritdoc
         */
        public clear(): void
        {
            super.clear();
        }

        /* ---------------------------------------------------------
		    TREE
	    --------------------------------------------------------- */


        /* =========================================================
		    ACCESSORS
	    ========================================================= */
        /**
         * @inheritdoc
         */
        public find(val: T): Iterator<T>
        {
            return this.end();
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

		}

		/* ---------------------------------------------------------
		    POST-PROCESS
	    --------------------------------------------------------- */
		/**
         * @inheritdoc
         */
        protected handleInsert(item: SetIterator<T>): void
        {
            
        }

        /**
         * @inheritdoc
         */
        protected handleErase(item: SetIterator<T>): void
        {
            
        }
    }
}