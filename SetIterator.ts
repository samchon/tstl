/// <refe0rence path="Iterator.ts" />

/// <reference path="base/SetContainer.ts" />
/// <reference path="ListIterator.ts" />

namespace std
{
    /**
     * <p> An iterator of a Set. </p>
     * 
     * @author Jeongho Nam
     */
    export class SetIterator<T>
        extends Iterator<T>
    {
        private listIterator: ListIterator<T>;

        /**
         * <p> Construct from source and index number. </p>
         *
         * <h4> Note </h4>
         * <p> Do not create iterator directly. </p>
         * <p> Use begin(), find() or end() in Map instead. </p> 
         *
         * @param map The source Set to reference.
         * @param index Sequence number of the element in the source Set.
         */
        public constructor(source: base.SetContainer<T>, it: ListIterator<T>)
        {
            super(source);

            this.listIterator = it;
        }

        public getListIterator(): ListIterator<T>
        {
            return this.listIterator;
        }

        /* ---------------------------------------------------------
		    MOVERS
	    --------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        public prev(): Iterator<T>
        {
            return new SetIterator<T>(<base.SetContainer<T>>this.source, <ListIterator<T>>this.listIterator.prev());
        }

        /**
         * @inheritdoc
         */
        public next(): Iterator<T>
        {
            return new SetIterator<T>(<base.SetContainer<T>>this.source, <ListIterator<T>>this.listIterator.next());
        }

        /**
         * @inheritdoc
         */
        public advance(size: number): Iterator<T>
        {
            return new SetIterator<T>(<base.SetContainer<T>>this.source, <ListIterator<T>>this.listIterator.advance(size));
        }

        /* ---------------------------------------------------------
		    ACCESSORS
	    --------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        public get value(): T
        {
            return this.listIterator.value;
        }

        /**
         * @inheritdoc
         */
        public set value(val: T)
        {
            this.listIterator.value = val;
        }

		/* ---------------------------------------------------------
		    COMPARISONS
	    --------------------------------------------------------- */
		/**
         * @inheritdoc
         */
        public equals<U extends T>(obj: Iterator<U>): boolean 
        {
            return super.equals(obj) && this.listIterator == (<SetIterator<U>>obj).listIterator;
        }

		public less<U extends T>(obj: Iterator<U>): boolean
		{
			return std.less(this.value, obj.value);
		}

		public hashCode(): number
		{
			return base.Hash.code(this.value);
		}
    }
}