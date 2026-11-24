//================================================================

/**
 * @packageDocumentation
 * @module std
 */
//================================================================
import { IBidirectionalIterator } from "./IBidirectionalIterator";
import { IReverseIterator } from "./IReverseIterator";

/**
 * Iterator that can construct a reverse iterator.
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export interface IReversableIterator<
  T,
  IteratorT extends IReversableIterator<T, IteratorT, ReverseT>,
  ReverseT extends IReverseIterator<T, IteratorT, ReverseT>,
> extends IBidirectionalIterator<T, IteratorT> {
  /**
   * Construct a reverse iterator whose base is this iterator.
   *
   * @return A reverse iterator based on this position.
   */
  reverse(): ReverseT;
}
