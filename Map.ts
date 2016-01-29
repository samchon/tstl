/// <reference path="base/UniqueMap.ts" />

namespace std
{
    export class Map<K, T>
        extends base.UniqueMap<K, T>
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

        public constructor(container: base.MapContainer<K, T>);

        public constructor(begin: MapIterator<K, T>, end: MapIterator<K, T>);
        
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
            (begin: MapIterator<L, U>, end: MapIterator<L, U>): void
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
        public find(key: K): MapIterator<K, T>
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
		protected insertByPair<L extends K, U extends T>(pair: Pair<L, U>): any
		{
		}

		/* ---------------------------------------------------------
		    POST-PROCESS
	    --------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        protected handleInsert(item: MapIterator<K, T>): void
        {
            
        }

        /**
         * @inheritdoc
         */
        protected handleErase(item: MapIterator<K, T>): void
        {
            
        }
    }
}