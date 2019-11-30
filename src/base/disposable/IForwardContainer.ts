//================================================================ 
/** @module std.base */
//================================================================
import { IForwardIterator } from "../../iterator/IForwardIterator";
import { IPointer } from "../../functional";

/**
 * @hidden
 */
export interface IForwardContainer<Iterator extends IForwardIterator<IPointer.ValueType<Iterator>, Iterator>>
{
    /**
     * Iterator to the first element.
     * 
     * @return Iterator to the first element.
     */
    begin(): Iterator;

    /**
     * Iterator to the end.
     * 
     * @return Iterator to the end.
     */
    end(): Iterator;
}

export namespace IForwardContainer
{
    export type IteratorType<Container extends IForwardContainer<any>>
        = Container extends IForwardContainer<infer Iterator>
            ? Iterator
            : unknown;

    export type ValueType<Container extends IForwardContainer<any>>
        = IPointer.ValueType<IteratorType<Container>>;

    export interface IErasable<Iterator extends IForwardIterator<IPointer.ValueType<Iterator>, Iterator>>
        extends IForwardContainer<Iterator>
    {
        erase(first: Iterator, last: Iterator): Iterator;
    }
}