//================================================================

/**
 * @packageDocumentation
 * @module std.ranges
 */
//================================================================
import { Vector } from "../../container/Vector";
import { IPointer } from "../../functional/IPointer";
import { IRandomAccessIterator } from "../../iterator/IRandomAccessIterator";
import { IForwardContainer } from "./IForwardContainer";

/**
 * Range interface with iterators that can jump to an offset.
 *
 * @template Iterator Iterator type
 * @author Jeongho Nam - https://github.com/samchon
 */
export interface IRandomAccessContainer<
  IteratorT extends IRandomAccessIterator<
    IPointer.ValueType<IteratorT>,
    IteratorT
  >,
> extends IForwardContainer<IteratorT> {}

export namespace IRandomAccessContainer {
  /**
   * Extract the iterator type from the supplied container type.
   */
  export type IteratorType<
    Container extends Array<any> | IRandomAccessContainer<any>,
  > = Container extends Array<infer T>
    ? Vector.Iterator<T>
    : Container extends IRandomAccessContainer<infer Iterator>
    ? Iterator
    : unknown;

  /**
   * Extract the element type from the supplied type.
   */
  export type ValueType<
    Container extends Array<any> | IRandomAccessContainer<any>,
  > = IForwardContainer.ValueType<IteratorType<Container>>;
}
