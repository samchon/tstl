import { ArrayIteratorBase, ArrayReverseIteratorBase } from "./ArrayIteratorBase";

import { ArrayContainer } from "../container/ArrayContainer";

export class ArrayIterator<T, 
        SourceT extends ArrayContainer<T, 
            SourceT, SourceT, 
            ArrayIterator<T, SourceT>, 
            ArrayReverseIterator<T, SourceT>, 
            T>>
    extends ArrayIteratorBase<T, SourceT, SourceT, 
        ArrayIterator<T, SourceT>,
        ArrayReverseIterator<T, SourceT>, 
        T>
{
    /**
     * @inheritDoc
     */
    public reverse(): ArrayReverseIterator<T, SourceT>
    {
        return new ArrayReverseIterator(this);
    }

    /**
     * @inheritDoc
     */
    public source(): SourceT
    {
        return this._Get_array();
    }
}

export class ArrayReverseIterator<T, 
        SourceT extends ArrayContainer<T, 
            SourceT, SourceT, 
            ArrayIterator<T, SourceT>, 
            ArrayReverseIterator<T, SourceT>, 
            T>>
    extends ArrayReverseIteratorBase<T, SourceT, SourceT, 
        ArrayIterator<T, SourceT>,
        ArrayReverseIterator<T, SourceT>, 
        T>
{
    /**
     * @hidden
     */
    protected _Create_neighbor(base: ArrayIterator<T, SourceT>): ArrayReverseIterator<T, SourceT>
    {
        return new ArrayReverseIterator(base);
    }
}