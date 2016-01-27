/// <reference path="AbstractMap.ts" />

namespace std
{
    export class Map<K, T>
        extends AbstractMap<K, T>
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

        public constructor(array: Array<Pair<K, T>>);

        public constructor(container: PairContainer<K, T>);

        public constructor(begin: PairIterator<K, T>, end: PairIterator<K, T>);
        
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
        public assign<L extends K, U extends T>
            (begin: PairIterator<L, U>, end: PairIterator<L, U>): void
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
        public find(key: K): PairIterator<K, T>
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
        protected handleInsert(item: PairIterator<K, T>): void
        {
            
        }

        /**
         * @inheritdoc
         */
        protected handleErase(item: PairIterator<K, T>): void
        {
            
        }
    }
}