//================================================================ 
/** @module std.base */
//================================================================
import { Iterator } from "../../base/iterator/Iterator";
import { ReverseIterator } from "../../base/iterator/ReverseIterator";

import { IContainer } from "../../base/container/IContainer";
import { IRandomAccessIterator } from "../../iterator/IRandomAccessIterator";
import { ArrayContainer } from "../container/linear/ArrayContainer";

import { equal_to } from "../../functional/comparators";

/**
 * Iterator of Array Containers.
 * 
 * @author Jeongho Nam <http://samchon.org>
 */
export abstract class ArrayIteratorBase<T extends ElemT, 
        SourceT extends IContainer<T, SourceT, IteratorT, ReverseT, ElemT>,
        ArrayT extends ArrayContainer<T, SourceT, ArrayT, IteratorT, ReverseT, ElemT>,
        IteratorT extends ArrayIteratorBase<T, SourceT, ArrayT, IteratorT, ReverseT, ElemT>,
        ReverseT extends ArrayReverseIteratorBase<T, SourceT, ArrayT, IteratorT, ReverseT, ElemT>,
        ElemT>
    implements Iterator<T, SourceT, IteratorT, ReverseT, ElemT>,
        IRandomAccessIterator<T, IteratorT>
{
    /**
     * @hidden
     */
    private array_: ArrayT;

    /**
     * @hidden
     */
    private index_: number;
    
    /* ---------------------------------------------------------
        CONSTRUCTORS
    --------------------------------------------------------- */
    /**
     * Initializer Constructor.
     * 
     * @param source Source container.
     * @param index Index number.
     */
    public constructor(array: ArrayT, index: number)
    {
        this.array_ = array;
        this.index_ = index;
    }

    /**
     * @inheritDoc
     */
    public abstract reverse(): ReverseT;

    /* ---------------------------------------------------------
        ACCESSORS
    --------------------------------------------------------- */
    /**
     * @inheritDoc
     */
    public abstract source(): SourceT;

    /**
     * @internal
     */
    public _Get_array(): ArrayT
    {
        return this.array_;
    }

    /**
     * @inheritDoc
     */
    public index(): number
    {
        return this.index_;
    }

    /**
     * @inheritDoc
     */
    public get value(): T
    {
        return this.array_.at(this.index_)
    }

    /**
     * @inheritDoc
     */
    public set value(val: T)
    {
        this.array_.set(this.index_, val);
    }

    /* ---------------------------------------------------------
        MOVERS
    --------------------------------------------------------- */
    /**
     * @inheritDoc
     */
    public prev(): IteratorT
    {
        return this.advance(-1);
    }

    /**
     * @inheritDoc
     */
    public next(): IteratorT
    {
        return this.advance(1);
    }

    /**
     * @inheritDoc
     */
    public advance(n: number): IteratorT
    {
        return this.array_.nth(this.index_ + n);
    }

    /* ---------------------------------------------------------
        COMPARES
    --------------------------------------------------------- */
    /**
     * @inheritDoc
     */
    public equals(obj: IteratorT): boolean
    {
        return equal_to(this.array_, obj.array_) && this.index_ === obj.index_;
    }
}

/**
 * Reverse iterator of Array Containers.
 * 
 * @author Jeongho Nam <http://samchon.org>
 */
export abstract class ArrayReverseIteratorBase<T extends ElemT, 
        SourceT extends IContainer<T, SourceT, IteratorT, ReverseT, ElemT>,
        ArrayT extends ArrayContainer<T, SourceT, ArrayT, IteratorT, ReverseT, ElemT>,
        IteratorT extends ArrayIteratorBase<T, SourceT, ArrayT, IteratorT, ReverseT, ElemT>,
        ReverseT extends ArrayReverseIteratorBase<T, SourceT, ArrayT, IteratorT, ReverseT, ElemT>,
        ElemT>
    extends ReverseIterator<T, SourceT, IteratorT, ReverseT, ElemT>
    implements IRandomAccessIterator<T, ReverseT>
{
    /* ---------------------------------------------------------
        CONSTRUCTORS
    --------------------------------------------------------- */
    /**
     * @inheritDoc
     */
    public advance(n: number): ReverseT
    {
        return this._Create_neighbor(this.base().advance(-n));
    }

    /* ---------------------------------------------------------
        ACCESSORS
    --------------------------------------------------------- */
    /**
     * @inheritDoc
     */
    public index(): number
    {
        return this.base_.index();
    }

    /**
     * @inheritDoc
     */
    public get value(): T
    {
        return this.base_.value;
    }

    /**
     * @inheritDoc
     */
    public set value(val: T)
    {
        this.base_.value = val;
    }
}