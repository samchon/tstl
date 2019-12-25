//================================================================ 
/** @module std.base */
//================================================================
import { VectorContainer } from "../../../base/container/VectorContainer";

import { ArrayIteratorBase, ArrayReverseIteratorBase } from "../../iterator/ArrayIteratorBase";
import { ISetIterator, ISetReverseIterator } from "../../../base/iterator/ISetIterator";

import { SetContainer } from "../../../base/container/SetContainer";

/**
 * @hidden
 */
export class SetElementVector<Key, 
        Unique extends boolean, 
        Source extends SetContainer<Key, 
            Unique, 
            Source,
            SetElementVector.Iterator<Key, Unique, Source>,
            SetElementVector.ReverseIterator<Key, Unique, Source>>>
    extends VectorContainer<Key, 
        Source,
        SetElementVector<Key, Unique, Source>,
        SetElementVector.Iterator<Key, Unique, Source>,
        SetElementVector.ReverseIterator<Key, Unique, Source>>
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
    
    public nth(index: number): SetElementVector.Iterator<Key, Unique, Source>
    {
        return new SetElementVector.Iterator(this, index);
    }

    /**
     * @internal
     */
    public static _Swap_associative<Key,
            Unique extends boolean, 
            Source extends SetContainer<Key,
                Unique, 
                Source, 
                SetElementVector.Iterator<Key, Unique, Source>, 
                SetElementVector.ReverseIterator<Key, Unique, Source>>>
        (x: SetElementVector<Key, Unique, Source>, y: SetElementVector<Key, Unique, Source>): void
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

export namespace SetElementVector
{
    export class Iterator<Key,
            Unique extends boolean, 
            Source extends SetContainer<Key, 
                Unique, 
                Source,
                SetElementVector.Iterator<Key, Unique, Source>,
                SetElementVector.ReverseIterator<Key, Unique, Source>>>
        extends ArrayIteratorBase<Key,
            Source,
            SetElementVector<Key, Unique, Source>,
            SetElementVector.Iterator<Key, Unique, Source>,
            SetElementVector.ReverseIterator<Key, Unique, Source>,
            Key>
        implements ISetIterator<Key, 
            Unique, 
            Source,
            SetElementVector.Iterator<Key, Unique, Source>,
            SetElementVector.ReverseIterator<Key, Unique, Source>>
    {
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
        public reverse(): ReverseIterator<Key, Unique, Source>
        {
            return new ReverseIterator(this);
        }
    }

    export class ReverseIterator<Key,
            Unique extends boolean, 
            Source extends SetContainer<Key, 
                Unique, 
                Source,
                SetElementVector.Iterator<Key, Unique, Source>,
                SetElementVector.ReverseIterator<Key, Unique, Source>>>
        extends ArrayReverseIteratorBase<Key,
            Source,
            SetElementVector<Key, Unique, Source>,
            SetElementVector.Iterator<Key, Unique, Source>,
            SetElementVector.ReverseIterator<Key, Unique, Source>,
            Key>
        implements ISetReverseIterator<Key, 
            Unique, 
            Source,
            SetElementVector.Iterator<Key, Unique, Source>,
            SetElementVector.ReverseIterator<Key, Unique, Source>>
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