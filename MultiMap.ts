/// <reference path="base/container/MultiMap.ts" />

namespace std
{
    export class MultiMap<K, T>
        extends base.container.MultiMap<K, T>
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
			var it: MapIterator<K, T>;

			if (node == null)
			{
				it = this.end();
			}
			else if (std.equals(node.value.first, pair.first) == true)
			{
				it = node.value.next();
			}
			else if (std.less(node.value.first, pair.first) == true)
			{
				it = node.value.next();

				while (it.equals(this.end()) == false && std.less(it.first, pair.first))
					it = it.next();
			}
			else
				it = node.value;

			// ITERATOR TO RETURN
			return this.insert(it, pair);
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