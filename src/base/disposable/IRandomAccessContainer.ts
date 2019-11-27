//================================================================ 
/** @module std.base */
//================================================================
import { IForwardContainer } from "./IForwardContainer";
import { IRandomAccessIterator } from "../../iterator";
import { IPointer } from "../../functional/IPointer";

/**
 * @hidden
 */
export interface IRandomAccessContainer<IteratorT extends IRandomAccessIterator<IPointer.ValueType<IteratorT>, IteratorT>>
    extends IForwardContainer<IteratorT>
{
}

export namespace IRandomAccessContainer
{
    export type IteratorType<Container extends IRandomAccessContainer<any>>
        = Container extends IRandomAccessContainer<infer Iterator>
            ? Iterator
            : unknown;

    export type ValueType<Container extends IRandomAccessContainer<any>>
        = IForwardContainer.ValueType<IteratorType<Container>>;
}