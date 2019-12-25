//================================================================ 
/** @module std.base */
//================================================================
import { ListContainer } from "../linear/ListContainer";

import { ISetIterator } from "../../../base/iterator/ISetIterator";
import { ListIterator } from "../../iterator/ListIterator";
import { ReverseIterator as _ReverseIterator } from "../../../base/iterator/ReverseIterator";

import { SetContainer } from "../../../base/container/SetContainer";

/**
 * @hidden
 */
export class SetElementList<Key, 
        Unique extends boolean, 
        Source extends SetContainer<Key, 
            Unique, 
            Source,
            SetElementList.Iterator<Key, Unique, Source>,
            SetElementList.ReverseIterator<Key, Unique, Source>>>
    extends ListContainer<Key, 
        Source,
        SetElementList.Iterator<Key, Unique, Source>,
        SetElementList.ReverseIterator<Key, Unique, Source>>
{
    /**
     * @hidden
     */
    private associative_: Source;

    /* ---------------------------------------------------------
        CONSTRUCTORS
    --------------------------------------------------------- */
    public constructor(associative: Source)
    {
        super();

        this.associative_ = associative;
    }

    /**
     * @hidden
     */
    protected _Create_iterator
        (
            prev: SetElementList.Iterator<Key, Unique, Source>, 
            next: SetElementList.Iterator<Key, Unique, Source>, 
            val: Key
        ): SetElementList.Iterator<Key, Unique, Source>
    {
        return SetElementList.Iterator.create(this, prev, next, val);
    }

    /**
     * @internal
     */
    public static _Swap_associative<Key, 
            Unique extends boolean, 
            Source extends SetContainer<Key, 
                Unique, 
                Source,
                SetElementList.Iterator<Key, Unique, Source>,
                SetElementList.ReverseIterator<Key, Unique, Source>>>
        (x: SetElementList<Key, Unique, Source>, y: SetElementList<Key, Unique, Source>): void
    {
        [x.associative_, y.associative_] = [y.associative_, x.associative_];
    }

    /* ---------------------------------------------------------
        ACCESSORS
    --------------------------------------------------------- */
    public associative(): Source
    {
        return this.associative_;
    }
}

export namespace SetElementList
{
    export class Iterator<Key,
            Unique extends boolean,
            Source extends SetContainer<Key, 
                Unique, 
                Source, 
                Iterator<Key, Unique, Source>, 
                ReverseIterator<Key, Unique, Source>>>
        extends ListIterator<Key,
            Source,
            Iterator<Key, Unique, Source>,
            ReverseIterator<Key, Unique, Source>,
            Key>
        implements ISetIterator<Key, 
            Unique, 
            Source,
            Iterator<Key, Unique, Source>,
            ReverseIterator<Key, Unique, Source>>
    {
        /**
         * @hidden
         */
        private source_: SetElementList<Key, Unique, Source>;

        /* ---------------------------------------------------------
            CONSTRUCTORS
        --------------------------------------------------------- */
        /**
         * @hidden
         */
        private constructor
            (
                list: SetElementList<Key, Unique, Source>, 
                prev: Iterator<Key, Unique, Source>,
                next: Iterator<Key, Unique, Source>,
                val: Key
            )
        {
            super(prev, next, val);
            this.source_ = list;
        }

        /**
         * @internal
         */
        public static create<Key,
                Unique extends boolean,
                Source extends SetContainer<Key, 
                    Unique, 
                    Source, 
                    Iterator<Key, Unique, Source>, 
                    ReverseIterator<Key, Unique, Source>>>
            (
                list: SetElementList<Key, Unique, Source>, 
                prev: Iterator<Key, Unique, Source>,
                next: Iterator<Key, Unique, Source>,
                val: Key
            )
        {
            return new Iterator(list, prev, next, val);
        }


        /**
         * @inheritDoc
         */
        public reverse(): ReverseIterator<Key, Unique, Source>
        {
            return new ReverseIterator(this);
        }

        /* ---------------------------------------------------------
            ACCESSORS
        --------------------------------------------------------- */
        /**
         * @inheritDoc
         */
        public source(): Source
        {
            return this.source_.associative();
        }
    }

    export class ReverseIterator<Key,
            Unique extends boolean,
            Source extends SetContainer<Key,
                Unique,
                Source,
                Iterator<Key, Unique, Source>,
                ReverseIterator<Key, Unique, Source>>>
        extends _ReverseIterator<Key,
            Source,
            Iterator<Key, Unique, Source>,
            ReverseIterator<Key, Unique, Source>,
            Key>
    {
        /**
         * @hidden
         */
        protected _Create_neighbor(base: Iterator<Key, Unique, Source>): ReverseIterator<Key, Unique, Source>
        {
            return new ReverseIterator(base);
        }
    }
}