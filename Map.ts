/// <reference path="base/container/UniqueMap.ts" />

namespace std
{
    export class Map<K, T>
        extends base.container.UniqueMap<K, T>
    {
		private tree: base.tree.PairTree<K, T>;

        /* =========================================================
		    CONSTRUCTORS & SEMI-CONSTRUCTORS
                - CONSTRUCTORS
                - ASSIGN & CLEAR
	    ============================================================
            CONSTURCTORS
        --------------------------------------------------------- */
        /**
         * Default Constructor
         */
        public constructor();

        public constructor(array: Array<Pair<K, T>>);

        public constructor(container: base.container.MapContainer<K, T>);

        public constructor(begin: MapIterator<K, T>, end: MapIterator<K, T>);
        
        public constructor(...args: any[])
        {
            super();

			this.tree = new base.tree.PairTree<K, T>();
        }

        /* ---------------------------------------------------------
		    ASSIGN & CLEAR
	    --------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        //public assign<L extends K, U extends T>
        //    (begin: MapIterator<L, U>, end: MapIterator<L, U>): void
        //{
        //    super.assign(begin, end);
        //}

        /**
         * @inheritdoc
         */
        public clear(): void
        {
            super.clear();
        }

        /* =========================================================
		    ACCESSORS
	    ========================================================= */
        /**
         * @inheritdoc
         */
        public find(key: K): MapIterator<K, T>
        {
            var node = this.tree.find(key);

			if (node == null || std.equals(node.value.first, key) == false)
				return this.end();
			else
				return node.value;
        }

		public findNear(key: K): MapIterator<K, T>
		{
			var node = this.tree.find(key);

			if (node == null)
				return this.end();
			else
				return node.value;
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
			var node = this.tree.find(pair.first);

			// IF EQUALS, THEN RETURN FALSE
			if (node != null && std.equals(node.value.first, pair.first) == true)
				return new Pair<MapIterator<K, T>, boolean>(node.value, false);
			
			// INSERTS
			var it: MapIterator<K, T>;

			if (node == null)
				it = this.end();
			else if (std.less(node.value.first, pair.first) == true)
				it = node.value.next();
			else
				it = node.value;

			// ITERATOR TO RETURN
			it = this.insert(it, pair);

			return new Pair<MapIterator<K, T>, boolean>(it, true);
		}

		/* ---------------------------------------------------------
		    POST-PROCESS
	    --------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        protected handleInsert(item: MapIterator<K, T>): void
        {
            this.tree.insert(item);
        }

        /**
         * @inheritdoc
         */
        protected handleErase(item: MapIterator<K, T>): void
        {
            this.tree.erase(item);
        }
    }
}