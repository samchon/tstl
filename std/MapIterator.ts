/// <refe0rence path="PairIterator.ts" />

/// <reference path="AbstractMap.ts" />
/// <reference path="ListIterator.ts" />

namespace std
{
    /**
     * <p> A bi-directional iterator. </p>
     * 
     * @tparam K Type of the keys. Each element in a map is uniquely identified by its key value.
     * @tparam T Type of the mapped value. Each element in a map stores some data as its mapped value.
     * 
     * @author Jeongho Nam
     */
    export class MapIterator<K, T>
        extends PairIterator<K, T>
    {
	    private listIterator: ListIterator<Pair<K, T>>;

        /**
         * <p> Construct from source and index number. </p>
         *
         * <h4> Note </h4>
         * <p> Do not create iterator directly. </p>
         * <p> Use begin(), find() or end() in Map instead. </p> 
         *
         * @param map The source map to reference
         * @param index Sequence number of the element in the source map
         */
        constructor(source: AbstractMap<K, T>, it: ListIterator<Pair<K, T>>)
	    {
            super(source);

		    this.listIterator = it;
	    }

        /**
         * Get listIterator.
         */
        public getListIterator(): ListIterator<Pair<K, T>>
        {
            return this.listIterator;
        }

        /* ---------------------------------------------------------
		    MOVERS
	    --------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        public prev(): PairIterator<K, T>
        {
            return new MapIterator<K, T>
                (
                    <AbstractMap<K, T>>this.source, 
                    <ListIterator<Pair<K, T>>>this.listIterator.prev()
                );
        }

        /**
         * @inheritdoc
         */
        public next(): PairIterator<K, T>
        {
            return new MapIterator<K, T>
                (
                    <AbstractMap<K, T>>this.source, 
                    <ListIterator<Pair<K, T>>>this.listIterator.next()
                );
        }

        /**
         * @inheritdoc
         */
        public advance(size: number): PairIterator<K, T>
        {
            return new MapIterator<K, T>
                (
                    <AbstractMap<K, T>>this.source, 
                    <ListIterator<Pair<K, T>>>this.listIterator.advance(size)
                );
        }

        /* ---------------------------------------------------------
		    ACCESSORS
	    --------------------------------------------------------- */
	    /**
	     * @inheritdoc
	     */
        public equals(obj: PairIterator<K, T>): boolean
	    {
            return super.equals(obj) && this.listIterator == (<MapIterator<K, T>>obj).listIterator;
	    }
        
        /**
         * @inheritdoc
         */
	    public get first(): K
	    {
		    return this.listIterator.value.first;
	    }

	    /**
         * @inheritdoc
         */
	    public get second(): T
	    {
		    return this.listIterator.value.second;
	    }
        
	    /**
         * @inheritdoc
         */
	    public set first(key: K)
	    {
		    this.listIterator.value.first = key;
	    }

	    /**
         * @inheritdoc
         */
	    public set second(val: T)
	    {
		    this.listIterator.value.second = val;
	    }
    }
}