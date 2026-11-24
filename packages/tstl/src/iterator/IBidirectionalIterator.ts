//================================================================

/**
 * @packageDocumentation
 * @module std
 */
//================================================================
import { IForwardIterator } from "./IForwardIterator";

/**
 * Iterator that can advance or retreat by one position.
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export interface IBidirectionalIterator<
  T,
  Iterator extends IBidirectionalIterator<T, Iterator> = IBidirectionalIterator<
    T,
    any
  >,
> extends IForwardIterator<T, Iterator> {
  /**
   * Return an iterator one position back without changing this iterator.
   *
   * @return The preceding iterator.
   */
  prev(): Iterator;
}
