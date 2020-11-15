/**
 * @packageDocumentation
 * @module std.ranges
 */
import { IForwardContainer } from "./IForwardContainer";
import { IRandomAccessIterator } from "../../iterator/IRandomAccessIterator";
import { IPointer } from "../../functional/IPointer";
import { Vector } from "../../container/Vector";
/**
 * Random-access iterable container.
 *
 * @template Iterator Iterator type
 * @author Jeongho Nam - https://github.com/samchon
 */
export interface IRandomAccessContainer<IteratorT extends IRandomAccessIterator<IPointer.ValueType<IteratorT>, IteratorT>> extends IForwardContainer<IteratorT> {
}
export declare namespace IRandomAccessContainer {
    /**
     * Deduct iterator type.
     */
    type IteratorType<Container extends Array<any> | IRandomAccessContainer<any>> = Container extends Array<infer T> ? Vector.Iterator<T> : Container extends IRandomAccessContainer<infer Iterator> ? Iterator : unknown;
    /**
     * Deduct value type.
     */
    type ValueType<Container extends Array<any> | IRandomAccessContainer<any>> = IForwardContainer.ValueType<IteratorType<Container>>;
}
//# sourceMappingURL=IRandomAccessContainer.d.ts.map