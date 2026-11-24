//================================================================

/**
 * @packageDocumentation
 * @module std.base
 */
//================================================================
import { IRandomAccessIterator } from "../../iterator/IRandomAccessIterator";
import { ILinearContainer } from "./ILinearContainer";

/**
 * Indexed sequence with random-access iterators.
 *
 * @template T Stored elements' type
 * @template SourceT Derived type extending this {@link IArrayContainer}
 * @template IteratorT Iterator type
 * @template ReverseT Reverse iterator type
 * @template PElem Parent type of *T*, used for inserting elements through {@link assign} and {@link insert}.
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export interface IArrayContainer<
  T extends PElem,
  SourceT extends IArrayContainer<T, SourceT, IteratorT, ReverseT, T>,
  IteratorT extends IArrayContainer.Iterator<
    T,
    SourceT,
    IteratorT,
    ReverseT,
    T
  >,
  ReverseT extends IArrayContainer.ReverseIterator<
    T,
    SourceT,
    IteratorT,
    ReverseT,
    T
  >,
  PElem = T,
> extends ILinearContainer<T, SourceT, IteratorT, ReverseT, PElem> {
  /**
   * Get the iterator for a zero-based position. An index equal to `size()`
   * designates the end iterator.
   *
   * @param index Zero-based iterator position.
   * @return The iterator for the requested position.
   */
  nth(index: number): IteratorT;

  /**
   * Read the element at a valid zero-based index.
   *
   * @param index Index in the range from `0` to `size() - 1` .
   * @return The element at that index.
   */
  at(index: number): T;

  /**
   * Replace the element at a valid zero-based index.
   *
   * @param index Index in the range from `0` to `size() - 1` .
   * @param val New value for the element.
   */
  set(index: number, val: T): void;
}

export namespace IArrayContainer {
  /**
   * Iterator over the elements of `IArrayContainer` .
   *
   * @author Jenogho Nam <http://samchon.org>
   */
  export type Iterator<
    T extends ElemT,
    SourceT extends IArrayContainer<T, SourceT, IteratorT, ReverseT, T>,
    IteratorT extends IArrayContainer.Iterator<
      T,
      SourceT,
      IteratorT,
      ReverseT,
      T
    >,
    ReverseT extends IArrayContainer.ReverseIterator<
      T,
      SourceT,
      IteratorT,
      ReverseT,
      T
    >,
    ElemT = T,
  > = ILinearContainer.Iterator<T, SourceT, IteratorT, ReverseT, ElemT> &
    IRandomAccessIterator<T, IteratorT>;

  /**
   * Iterator for reverse traversal of `IArrayContainer` .
   *
   * @author Jeongho Nam - https://github.com/samchon
   */
  export type ReverseIterator<
    T extends ElemT,
    SourceT extends IArrayContainer<T, SourceT, IteratorT, ReverseT, T>,
    IteratorT extends IArrayContainer.Iterator<
      T,
      SourceT,
      IteratorT,
      ReverseT,
      T
    >,
    ReverseT extends IArrayContainer.ReverseIterator<
      T,
      SourceT,
      IteratorT,
      ReverseT,
      T
    >,
    ElemT = T,
  > = ILinearContainer.ReverseIterator<T, SourceT, IteratorT, ReverseT, ElemT> &
    IRandomAccessIterator<T, ReverseT>;
}
