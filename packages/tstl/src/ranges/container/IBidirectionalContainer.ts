//================================================================

/**
 * @packageDocumentation
 * @module std.ranges
 */
//================================================================
import { Vector } from "../../container/Vector";
import { IPointer } from "../../functional/IPointer";
import { IReversableIterator } from "../../iterator/IReversableIterator";
import { IReverseIterator } from "../../iterator/IReverseIterator";
import { IForwardContainer } from "./IForwardContainer";

/**
 * Range interface with iterators that move in either direction.
 *
 * @template Iterator Iterator type
 * @author Jeongho Nam - https://github.com/samchon
 */
export interface IBidirectionalContainer<
  IteratorT extends IReversableIterator<
    IPointer.ValueType<IteratorT>,
    IteratorT,
    ReverseIteratorT
  >,
  ReverseIteratorT extends IReverseIterator<
    IPointer.ValueType<IteratorT>,
    IteratorT,
    ReverseIteratorT
  >,
> extends IForwardContainer<IteratorT> {
  /**
   * Get the start of reverse traversal.
   *
   * @return An iterator to the last element, or `rend()` when the container is
   * empty.
   */
  rbegin(): ReverseIteratorT;

  /**
   * Get the exclusive end of reverse traversal.
   *
   * @return The reverse past-the-end iterator.
   */
  rend(): ReverseIteratorT;
}

export namespace IBidirectionalContainer {
  /**
   * Extract the iterator type from the supplied container type.
   */
  export type IteratorType<
    Container extends Array<any> | IBidirectionalContainer<any, any>,
  > = Container extends Array<infer T>
    ? Vector.Iterator<T>
    : Container extends IBidirectionalContainer<infer Iterator, any>
    ? Iterator
    : unknown;

  /**
   * Extract the reverse-iterator type from the supplied container type.
   */
  export type ReverseIteratorType<
    Container extends Array<any> | IBidirectionalContainer<any, any>,
  > = Container extends Array<infer T>
    ? Vector.ReverseIterator<T>
    : Container extends IBidirectionalContainer<any, infer ReverseIterator>
    ? ReverseIterator
    : unknown;

  /**
   * Extract the element type from the supplied type.
   */
  export type ValueType<
    Container extends Array<any> | IBidirectionalContainer<any, any>,
  > = IPointer.ValueType<IteratorType<Container>>;
}
