/// <reference path="AbstractSet.ts" />

namespace std
{
    export class Set<T>
        extends AbstractSet<T>
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

        public constructor(container: Container<T>);

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
                - POST-PROCESS
	    ============================================================
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