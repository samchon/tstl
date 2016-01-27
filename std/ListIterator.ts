/// <reference path="Iterator.ts" />

/// <reference path="List.ts" />

namespace std
{
     export class ListIterator<T>
        extends Iterator<T>
    {
        protected value_: T;

        protected prev_: ListIterator<T>;
        protected next_: ListIterator<T>;

        /* ---------------------------------------------------------------
            CONSTRUCTORS
        --------------------------------------------------------------- */
        /**
         * <p> Construct from source List. </p>
         *
         * <h4> Note </h4>
         * <p> Do not create iterator directly. </p>
         * <p> Use begin(), find() or end() in List instead. </p> 
         *
         * @param list The source vector to reference.
         */
        public constructor(source: List<T>, prev: ListIterator<T>, next: ListIterator<T>, value: T)
        {
            super(source);
            
            this.prev_ = prev;
            this.next_ = next;

            this.value_ = value;
        }

        /**
         * @inheritdoc
         */
        public setPrev(prev: ListIterator<T>): void
        {
            this.prev_ = prev;
        }

        /**
         * @inheritdoc
         */
        public setNext(next: ListIterator<T>): void
        {
            this.next_ = next;
        }

        /* ---------------------------------------------------------------
            ACCESSORS
        --------------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        public equals(obj: Iterator<T>): boolean
        {
            if (obj instanceof ListIterator == false)
                return false;

            var it: ListIterator<T> = <ListIterator<T>>obj;

            return super.equals(obj) == true && this.prev_ == it.prev_ && this.next_ == it.next_;
        }
        
        /**
         * @inheritdoc
         */
        public prev(): Iterator<T>
        {
            return this.prev_;
        }

        /**
         * @inheritdoc
         */
        public next(): Iterator<T>
        {
            return this.next_;
        }

        /**
         * @inheritdoc
         */
        public get value(): T
        {
            return this.value_;
        }

        /**
         * @inheritdoc
         */
        public set value(val: T)
        {
            this.value_ = val;
        }
    }
}