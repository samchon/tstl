//================================================================

/**
 * @packageDocumentation
 * @module std.internal
 */
//================================================================
import { IContainer } from "../../../base/container/IContainer";
import { IForwardIterator } from "../../../iterator/IForwardIterator";
import { IPushBack } from "../partial/IPushBack";

export interface ILinearContainerBase<
  T extends ElemT,
  SourceT extends IContainer<T, SourceT, IteratorT, ReverseT, T>,
  IteratorT extends IContainer.Iterator<T, SourceT, IteratorT, ReverseT, T>,
  ReverseT extends IContainer.ReverseIterator<
    T,
    SourceT,
    IteratorT,
    ReverseT,
    T
  >,
  ElemT = T,
> extends IContainer<T, SourceT, IteratorT, ReverseT, ElemT>,
    IPushBack<T> {
  /* ---------------------------------------------------------
        CONSTRUCTORS
    --------------------------------------------------------- */
  /**
   * Replace the contents with `n` copies of the supplied value.
   *
   * @param n Number of initial elements.
   * @param val Value assigned to each element.
   */
  assign(n: number, val: T): void;

  /**
   * Replace the contents with the elements in the half-open input range.
   *
   * @param first Start of the input range.
   * @param last Exclusive end of the input range.
   */
  assign<InputIterator extends Readonly<IForwardIterator<T, InputIterator>>>(
    first: InputIterator,
    last: InputIterator,
  ): void;

  /**
   * Resize the sequence to `n` elements. Shrinking erases elements from the
   * back.
   *
   * @param n New number of elements.
   */
  resize(n: number): void;

  /* ---------------------------------------------------------
        ELEMENTS I/O
    --------------------------------------------------------- */
  /**
   * @inheritDoc
   */
  push_back(val: T): void;

  /**
   * Remove the last element of the sequence.
   */
  pop_back(): void;

  /**
   * Insert one element at the given position.
   *
   * @param pos Position before which to insert.
   * @param val Value to insert.
   * @return An iterator to the inserted element.
   */
  insert(pos: IteratorT, val: T): IteratorT;

  /**
   * Insert `n` copies of the supplied value.
   *
   * @param pos Position before which to insert.
   * @param n Number of elements to insert.
   * @param val Value to insert repeatedly.
   * @return An iterator to the first inserted element.
   */
  insert(pos: IteratorT, n: number, val: T): IteratorT;

  /**
   * Insert the elements in the half-open input range.
   *
   * @param pos Position before which to insert.
   * @param first Start of the input range.
   * @param last Exclusive end of the input range.
   * @return An iterator to the first inserted element.
   */
  insert<InputIterator extends Readonly<IForwardIterator<T, InputIterator>>>(
    pos: IteratorT,
    first: InputIterator,
    last: InputIterator,
  ): IteratorT;
}
