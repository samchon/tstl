//================================================================ 
/** @module std.base */
//================================================================
import { ListContainer } from "./ListContainer";

import { IMapIterator } from "../iterator/IMapIterator";
import { ListIterator } from "../iterator/ListIterator";
import { ReverseIterator as _ReverseIterator } from "../iterator/ReverseIterator";

import { MapContainer } from "./MapContainer";
import { IPair } from "../../utility/IPair";
import { Pair } from "../../utility/Pair";

/**
 * @hidden
 */
export class MapElementList<Key, T, 
        Unique extends boolean, 
        Source extends MapContainer<Key, T, 
            Unique, 
            Source, 
            MapElementList.Iterator<Key, T, Unique, Source>, 
            MapElementList.ReverseIterator<Key, T, Unique, Source>>> 
    extends ListContainer<Pair<Key, T>, 
        Source, 
        MapElementList.Iterator<Key, T, Unique, Source>,
        MapElementList.ReverseIterator<Key, T, Unique, Source>>
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
            prev: MapElementList.Iterator<Key, T, Unique, Source>, 
            next: MapElementList.Iterator<Key, T, Unique, Source>, 
            val: Pair<Key, T>
        ): MapElementList.Iterator<Key, T, Unique, Source>
    {
        return MapElementList.Iterator.create(this, prev, next, val);
    }

    /**
     * @internal
     */
    public static _Swap_associative<Key, T, 
            Unique extends boolean, 
            Source extends MapContainer<Key, T, 
                Unique, 
                Source, 
                MapElementList.Iterator<Key, T, Unique, Source>, 
                MapElementList.ReverseIterator<Key, T, Unique, Source>>>
        (x: MapElementList<Key, T, Unique, Source>, y: MapElementList<Key, T, Unique, Source>): void
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

export namespace MapElementList
{
    export class Iterator<Key, T, 
            Unique extends boolean, 
            Source extends MapContainer<Key, T, 
                Unique, 
                Source, 
                Iterator<Key, T, Unique, Source>, 
                ReverseIterator<Key, T, Unique, Source>>>
        extends ListIterator<Pair<Key, T>, 
            Source, 
            Iterator<Key, T, Unique, Source>, 
            ReverseIterator<Key, T, Unique, Source>,
            IPair<Key, T>>
        implements IMapIterator<Key, T, 
            Unique, 
            Source, 
            Iterator<Key, T, Unique, Source>, 
            ReverseIterator<Key, T, Unique, Source>>
    {
        /**
         * @hidden
         */
        private list_: MapElementList<Key, T, Unique, Source>;

        /* ---------------------------------------------------------
            CONSTRUCTORS
        --------------------------------------------------------- */
        /**
         * @hidden
         */
        private constructor
            (
                list: MapElementList<Key, T, Unique, Source>, 
                prev: Iterator<Key, T, Unique, Source>, 
                next: Iterator<Key, T, Unique, Source>, 
                val: Pair<Key, T>
            )
        {
            super(prev, next, val);
            this.list_ = list;
        }

        /**
         * @internal
         */
        public static create<Key, T, 
                Unique extends boolean, 
                Source extends MapContainer<Key, T, Unique, Source, Iterator<Key, T, Unique, Source>, ReverseIterator<Key, T, Unique, Source>>>
            (
                list: MapElementList<Key, T, Unique, Source>, 
                prev: Iterator<Key, T, Unique, Source>, 
                next: Iterator<Key, T, Unique, Source>, 
                val: Pair<Key, T>
            )
        {
            return new Iterator(list, prev, next, val);
        }

        /**
         * @inheritDoc
         */
        public reverse(): ReverseIterator<Key, T, Unique, Source>
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
            return this.list_.associative();
        }

        /**
         * @inheritDoc
         */
        public get first(): Key
        {
            return this.value.first;
        }

        /**
         * @inheritDoc
         */
        public get second(): T
        {
            return this.value.second;
        }

        /**
         * @inheritDoc
         */
        public set second(val: T)
        {
            this.value.second = val;
        }
    }

    export class ReverseIterator<Key, T, 
            Unique extends boolean, 
            Source extends MapContainer<Key, T, Unique, Source, Iterator<Key, T, Unique, Source>, ReverseIterator<Key, T, Unique, Source>>>
        extends _ReverseIterator<Pair<Key, T>, 
            Source, 
            Iterator<Key, T, Unique, Source>, 
            ReverseIterator<Key, T, Unique, Source>,
            IPair<Key, T>>
    {
        /* ---------------------------------------------------------
            CONSTRUCTORS
        --------------------------------------------------------- */
        /**
         * @hidden
         */
        protected _Create_neighbor(base: Iterator<Key, T, Unique, Source>): ReverseIterator<Key, T, Unique, Source>
        {
            return new ReverseIterator(base);
        }

        /* ---------------------------------------------------------
            ACCESSORS
        --------------------------------------------------------- */
        /**
         * Get the first, key element.
         * 
         * @return The first element.
         */
        public get first(): Key
        {
            return this.base_.first;
        }

        /**
         * Get the second, stored element.
         * 
         * @return The second element.
         */
        public get second(): T
        {
            return this.base_.second;
        }

        /**
         * Set the second, stored element.
         * 
         * @param val The value to set.
         */
        public set second(val: T)
        {
            this.base_.second = val;
        }
    }
}