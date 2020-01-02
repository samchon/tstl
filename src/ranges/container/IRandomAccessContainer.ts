//================================================================ 
/** @module std.ranges */
//================================================================
import { IForwardContainer } from "./IForwardContainer";
import { IRandomAccessIterator } from "../../iterator";
import { IPointer } from "../../functional/IPointer";
import { Vector } from "../../container/Vector";

export interface IRandomAccessContainer<IteratorT extends IRandomAccessIterator<IPointer.ValueType<IteratorT>, IteratorT>>
    extends IForwardContainer<IteratorT>
{
}

export namespace IRandomAccessContainer
{
    export type IteratorType<Container extends Array<any> | IRandomAccessContainer<any>>
        = Container extends Array<infer T>
            ? Vector.Iterator<T>
            : Container extends IRandomAccessContainer<infer Iterator>
                ? Iterator
                : unknown;

    export type ValueType<Container extends Array<any> | IRandomAccessContainer<any>>
        = IForwardContainer.ValueType<IteratorType<Container>>;
}