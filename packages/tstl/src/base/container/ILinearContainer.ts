//================================================================

/**
 * @packageDocumentation
 * @module std.base
 */
//================================================================
import { ILinearContainerBase } from "../../internal/container/linear/ILinearContainerBase";
import { IFront } from "../../internal/container/partial/IFront";
import { IPushBack } from "../../internal/container/partial/IPushBack";
import { IForwardIterator } from "../../iterator/IForwardIterator";
import { IContainer } from "./IContainer";

/**
 * Sequence that supports positional insertion and resizing.
 *
 * @template T Stored elements' type
 * @template SourceT Derived type extending this {@link ILinearContainer}
 * @template IteratorT Iterator type
 * @template ReverseT Reverse iterator type
 * @template PElem Parent type of *T*, used for inserting elements through {@link assign} and {@link insert}.
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export interface ILinearContainer<
  T extends PElem,
  SourceT extends ILinearContainer<T, SourceT, IteratorT, ReverseT, T>,
  IteratorT extends ILinearContainer.Iterator<
    T,
    SourceT,
    IteratorT,
    ReverseT,
    T
  >,
  ReverseT extends ILinearContainer.ReverseIterator<
    T,
    SourceT,
    IteratorT,
    ReverseT,
    T
  >,
  PElem = T,
> extends ILinearContainerBase<T, SourceT, IteratorT, ReverseT, PElem>,
    IFront<T>,
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
   * Resize to `n` elements, removing from the back or appending default
   * values. The default value is determined by the concrete container.
   *
   * @param n New number of elements.
   */
  resize(n: number): void;

  /* ---------------------------------------------------------
        ACCESSORS
    --------------------------------------------------------- */
  /**
   * Read the last element of the nonempty container.
   *
   * @return The last element.
   */
  back(): T;

  /**
   * Replace the last element of the nonempty container.
   *
   * @param val New value for the last element.
   */
  back(val: T): void;

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

export namespace ILinearContainer {
  /**
   * Iterator over the elements of `ILinearContainer` .
   *
   * @author Jenogho Nam <http://samchon.org>
   */
  export type Iterator<
    T extends ElemT,
    SourceT extends ILinearContainer<T, SourceT, IteratorT, ReverseT, T>,
    IteratorT extends ILinearContainer.Iterator<
      T,
      SourceT,
      IteratorT,
      ReverseT,
      T
    >,
    ReverseT extends ILinearContainer.ReverseIterator<
      T,
      SourceT,
      IteratorT,
      ReverseT,
      T
    >,
    ElemT = T,
  > = IContainer.Iterator<T, SourceT, IteratorT, ReverseT, ElemT>;

  /**
   * Iterator for reverse traversal of `ILinearContainer` .
   *
   * @author Jenogho Nam <http://samchon.org>
   */
  export type ReverseIterator<
    T extends ElemT,
    SourceT extends ILinearContainer<T, SourceT, IteratorT, ReverseT, T>,
    IteratorT extends ILinearContainer.Iterator<
      T,
      SourceT,
      IteratorT,
      ReverseT,
      T
    >,
    ReverseT extends ILinearContainer.ReverseIterator<
      T,
      SourceT,
      IteratorT,
      ReverseT,
      T
    >,
    ElemT = T,
  > = IContainer.ReverseIterator<T, SourceT, IteratorT, ReverseT, ElemT>;
}
