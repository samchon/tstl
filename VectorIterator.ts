/// <reference path="Iterator.ts" />

/// <reference path="Vector.ts" />

namespace std
{
    /**
     * <p> A bi-directional iterator of a Set. </p>
     *
     * @tparam T Type of the elements.
     * 
     * @author Jeongho Nam
     */
    export class VectorIterator<T>
        extends Iterator<T>
    {
        /**
	     * <p> Sequence number of iterator in the source Vector. </p>
	     */
        private index: number;

        /* ---------------------------------------------------------
		    CONSTRUCTORS
	    --------------------------------------------------------- */
        /**
         * <p> Construct from source and index number. </p>
         *
         * <h4> Note </h4>
         * <p> Do not create iterator directly. </p>
         * <p> Use begin(), find() or end() in Vector instead. </p> 
         *
         * @param vector The source vector to reference.
         * @param index Sequence number of the element in the surce vector.
         */
        public constructor(source: Vector<T>, index: number)
        {
            super(source);

            this.index = index;
        }

        /* ---------------------------------------------------------
		    ACCESSORS
	    --------------------------------------------------------- */
        public get vector(): Vector<T>
        {
            return <Vector<T>>this.source;
        }

        /**
         * @inheritdoc
         */
        public get value(): T
        {
            return this.vector.at(this.index);
        }

        /**
         * @inheritdoc
         */
        public set value(val: T)
        {
            this.vector.set(this.index, val);
        }
        
	    /**
         * @inheritdoc
         */
        public equals<U extends T>(obj: Iterator<U>): boolean
	    {
            return super.equals(obj) && this.index == (<VectorIterator<U>>obj).index;
	    }

        /**
         * Get index.
         */
        public getIndex(): number
        {
            return this.index;
        }

        /* ---------------------------------------------------------
		    MOVERS
	    --------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        public prev(): Iterator<T>
        {
            if (this.index <= 0)
                return this.source.end();
            else
                return new VectorIterator<T>(this.vector, this.index - 1);
        }

        /**
         * @inheritdoc
         */
        public next(): Iterator<T>
        {
            if (this.index >= this.source.size() - 1)
                return this.source.end();
            else
                return new VectorIterator<T>(this.vector, this.index + 1);
        }

        /**
         * @inheritdoc
         */
        public advance(n: number): Iterator<T>
        {
            var newIndex: number = this.index + n;

            if (newIndex < 0 || newIndex >= this.source.size())
                return this.source.end();
            else
                return new VectorIterator<T>(this.vector, newIndex);
        }
    }
}