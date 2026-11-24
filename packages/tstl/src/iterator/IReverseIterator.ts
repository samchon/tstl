//================================================================

/**
 * @packageDocumentation
 * @module std
 */
//================================================================
import { IBidirectionalIterator } from "./IBidirectionalIterator";
import { IReversableIterator } from "./IReversableIterator";

/**
 * Iterator that traverses an underlying range in reverse order.
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export interface IReverseIterator<
  T,
  Base extends IReversableIterator<T, Base, This>,
  This extends IReverseIterator<T, Base, This>,
> extends IBidirectionalIterator<T, This> {
  /**
   * Get the underlying forward iterator. It is one forward step past the
   * element that the reverse iterator designates.
   *
   * @return The base iterator of this reverse position.
   */
  base(): Base;
}
