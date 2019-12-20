//================================================================ 
/** @module std.base */
//================================================================
import { VectorContainer } from "./VectorContainer";

import { ArrayIteratorBase, ArrayReverseIteratorBase } from "../iterator/ArrayIteratorBase";
import { IMapIterator, IMapReverseIterator } from "../iterator/IMapIterator";

import { MapContainer } from "./MapContainer";
import { IPair } from "../../utility/IPair";
import { Entry } from "../../utility/Entry";

/**
 * @hidden
 */
export class MapElementVector<Key, T,
        Unique extends boolean,
        Source extends MapContainer<Key, T,
            Unique, 
            Source,
            MapElementVector.Iterator<Key, T, Unique, Source>,
            MapElementVector.ReverseIterator<Key, T, Unique, Source>>>
    extends VectorContainer<Entry<Key, T>,
        Source,
        MapElementVector<Key, T, Unique, Source>,
        MapElementVector.Iterator<Key, T, Unique, Source>,
        MapElementVector.ReverseIterator<Key, T, Unique, Source>>
{
    private associative_: Source;

    /* ---------------------------------------------------------
        CONSTRUCTORS
    --------------------------------------------------------- */
    public constructor(associative: Source)
    {
        super();

        this.data_ = [];
        this.associative_ = associative;
    }
    
    public nth(index: number): MapElementVector.Iterator<Key, T, Unique, Source>
    {
        return new MapElementVector.Iterator(this, index);
    }

    /**
     * @internal
     */
    public static _Swap_associative<Key, T, 
            Unique extends boolean, 
            Source extends MapContainer<Key, T, 
                Unique, 
                Source, 
                MapElementVector.Iterator<Key, T, Unique, Source>, 
                MapElementVector.ReverseIterator<Key, T, Unique, Source>>>
        (x: MapElementVector<Key, T, Unique, Source>, y: MapElementVector<Key, T, Unique, Source>): void
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

export namespace MapElementVector
{
    export class Iterator<Key, T, 
            Unique extends boolean, 
            Source extends MapContainer<Key, T, 
                Unique, 
                Source, 
                Iterator<Key, T, Unique, Source>, 
                ReverseIterator<Key, T, Unique, Source>>>
        extends ArrayIteratorBase<Entry<Key, T>, 
            Source, 
            MapElementVector<Key, T, Unique, Source>,
            Iterator<Key, T, Unique, Source>, 
            ReverseIterator<Key, T, Unique, Source>,
            IPair<Key, T>>
        implements IMapIterator<Key, T, 
            Unique, 
            Source, 
            Iterator<Key, T, Unique, Source>, 
            ReverseIterator<Key, T, Unique, Source>>
    {
        /* ---------------------------------------------------------
            CONSTRUCTORS
        --------------------------------------------------------- */
        /**
         * @inheritDoc
         */
        public source(): Source
        {
            return this._Get_array().associative();
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
            Source extends MapContainer<Key, T, 
                Unique, 
                Source, 
                Iterator<Key, T, Unique, Source>, 
                ReverseIterator<Key, T, Unique, Source>>>
        extends ArrayReverseIteratorBase<Entry<Key, T>, 
            Source, 
            MapElementVector<Key, T, Unique, Source>,
            Iterator<Key, T, Unique, Source>, 
            ReverseIterator<Key, T, Unique, Source>,
            IPair<Key, T>>
        implements IMapReverseIterator<Key, T, 
            Unique, 
            Source, 
            Iterator<Key, T, Unique, Source>, 
            ReverseIterator<Key, T, Unique, Source>>
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
}