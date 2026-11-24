//================================================================

/**
 * @packageDocumentation
 * @module std
 */
//================================================================
import { IBidirectionalIterator } from "./IBidirectionalIterator";

/**
 * Iterator that can move by an offset as well as step in either direction.
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export interface IRandomAccessIterator<
  T,
  Iterator extends IRandomAccessIterator<T, Iterator> = IRandomAccessIterator<
    T,
    any
  >,
> extends IBidirectionalIterator<T, Iterator> {
  /**
   * Get the index used by this iterator, relative to its storage.
   *
   * @return The index of the represented position.
   */
  index(): number;

  /**
   * Return an iterator at a signed offset from this position.
   *
   * @param n Offset in traversal order. Negative values move backward.
   * @return The iterator at the requested offset.
   */
  advance(n: number): Iterator;
}
