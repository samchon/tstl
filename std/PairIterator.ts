/// <reference path="PairContainer.ts" />

namespace std
{
    export abstract class PairIterator<K, T>
    {
        protected source: PairContainer<K, T>;

        /* ---------------------------------------------------------
		    CONSTRUCTORS
	    --------------------------------------------------------- */
        /**
         * Construct from the source PairContainer. 
         *
         * @param source The source PairContainer.
         */
        public constructor(source: PairContainer<K, T>)
        {
            this.source = source;
        }

        /* ---------------------------------------------------------
		    MOVERS
	    --------------------------------------------------------- */
        /**
         * Get iterator to previous element.
         */
        public abstract prev(): PairIterator<K, T>;

        /**
         * Get iterator to next element.
         */
        public abstract next(): PairIterator<K, T>;

        /**
         * Advances the Iterator by n element positions.
         *
         * @param n Number of element positions to advance.
         * @return An advanced Iterator.
         */
        public advance(n: number): PairIterator<K, T>
        {
            var it: PairIterator<K, T> = this;
            var i: number;

            if (n >= 0 )
            {
                for (i = 0; i < n; i++)
                    if (it.equals(this.source.end()))
                        return this.source.end();
                    else
                        it = it.next();
            }
            else
            {
                n = n * -1;

                for (i = 0; i < n; i++)
                    if (it.equals(this.source.end()))
                        return this.source.end();
                    else
                        it = it.prev();
            }

            return it;
        }

        /* ---------------------------------------------------------
		    ACCESSORS
	    --------------------------------------------------------- */
        /**
         * Get source.
         */
        public getSource(): PairContainer<K, T>
        {
            return this.source;
        }
        
        public equals<L extends K, U extends T>(obj: PairIterator<L, U>): boolean 
        {
            return this.source == obj.source;
        }
        
        /**
         * Get first, key element.
         */
        public get first(): K
        {
            throw new LogicError("Have to be overriden.");
        }

        /**
         * Get second, value element.
         */
        public get second(): T
        {
            throw new LogicError("Have to be overriden.");
        }

        public set first(val: K)
        {
            throw new LogicError("Have to be overriden.");
        }
        public set second(val: T)
        {
            throw new LogicError("Have to be overriden.");
        }
    }
}