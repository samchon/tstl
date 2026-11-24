//================================================================

/**
 * @packageDocumentation
 * @module std.ranges
 */
//================================================================
import { Vector } from "../../container/Vector";
import { IPointer } from "../../functional/IPointer";
import { ISize } from "../../internal/container/partial/ISize";
import { IForwardIterator } from "../../iterator/IForwardIterator";

/**
 * Range interface with iterators that move forward.
 *
 * @template Iterator Iterator type
 * @author Jeongho Nam - https://github.com/samchon
 */
export interface IForwardContainer<
  Iterator extends IForwardIterator<IPointer.ValueType<Iterator>, Iterator>,
> extends ISize {
  /**
   * Get the start of forward traversal.
   *
   * @return An iterator to the first element, or `end()` when the container is
   * empty.
   */
  begin(): Iterator;

  /**
   * Get the exclusive end of forward traversal.
   *
   * @return The past-the-end iterator.
   */
  end(): Iterator;
}

export namespace IForwardContainer {
  /**
   * Extract the iterator type from the supplied container type.
   */
  export type IteratorType<
    Container extends Array<any> | IForwardContainer<any>,
  > = Container extends Array<infer T>
    ? Vector.Iterator<T>
    : Container extends IForwardContainer<infer Iterator>
    ? Iterator
    : unknown;

  /**
   * Extract the element type from the supplied type.
   */
  export type ValueType<Container extends Array<any> | IForwardContainer<any>> =
    IPointer.ValueType<IteratorType<Container>>;

  /**
   * Choose an array or forward container whose element type matches the
   * supplied range type.
   */
  export type SimilarType<
    Container extends Array<any> | IForwardContainer<any>,
  > =
    | Array<ValueType<Container>>
    | IForwardContainer<IForwardIterator<ValueType<Container>, any>>;
}
