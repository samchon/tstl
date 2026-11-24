//================================================================

/**
 * @packageDocumentation
 * @module std.base
 */
//================================================================
import { IEmpty } from "../../internal/container/partial/IEmpty";
import { IPush } from "../../internal/container/partial/IPush";
import { ISize } from "../../internal/container/partial/ISize";
import { IForwardIterator } from "../../iterator/IForwardIterator";
import { IReversableIterator } from "../../iterator/IReversableIterator";
import { IReverseIterator } from "../../iterator/IReverseIterator";
import { IBidirectionalContainer } from "../../ranges/container/IBidirectionalContainer";

/**
 * Common interface for containers that support iteration, assignment, and
 * erasure.
 *
 * @template T Stored elements' type
 * @template SourceT Derived type extending this {@link IContainer}
 * @template IteratorT Iterator type
 * @template ReverseT Reverse iterator type
 * @template PElem Parent type of *T* accepted by insertion and assignment operations.
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export interface IContainer<
  T extends PElem,
  SourceT extends IContainer<T, SourceT, IteratorT, ReverseT, PElem>,
  IteratorT extends IContainer.Iterator<T, SourceT, IteratorT, ReverseT, PElem>,
  ReverseT extends IContainer.ReverseIterator<
    T,
    SourceT,
    IteratorT,
    ReverseT,
    PElem
  >,
  PElem = T,
> extends IBidirectionalContainer<
      IContainer.Iterator<T, SourceT, IteratorT, ReverseT, PElem>,
      ReverseT
    >,
    Iterable<T>,
    IEmpty,
    ISize,
    IPush<PElem> {
  /* ---------------------------------------------------------
        ASSIGN & CLEAR
    --------------------------------------------------------- */
  /**
   * Replace the contents with the elements in the half-open input range.
   *
   * @param first Start of the input range.
   * @param last Exclusive end of the input range.
   */
  assign<
    InputIterator extends Readonly<IForwardIterator<PElem, InputIterator>>,
  >(
    first: InputIterator,
    last: InputIterator,
  ): void;

  /**
   * @inheritDoc
   */
  clear(): void;

  /* =========================================================
        ACCESSORS
            - SIZE
            - ITERATORS
    ============================================================
        SIZE
    --------------------------------------------------------- */
  /**
   * @inheritDoc
   */
  size(): number;

  /**
   * @inheritDoc
   */
  empty(): boolean;

  /* ---------------------------------------------------------
        ITERATORS
    --------------------------------------------------------- */
  /**
   * @inheritDoc
   */
  begin(): IteratorT;

  /**
   * @inheritDoc
   */
  end(): IteratorT;

  /**
   * @inheritDoc
   */
  rbegin(): ReverseT;

  /**
   * @inheritDoc
   */
  rend(): ReverseT;

  /**
   * @inheritDoc
   */
  [Symbol.iterator](): IterableIterator<T>;

  /* ---------------------------------------------------------
        ELEMENTS I/O
    --------------------------------------------------------- */
  push(...items: PElem[]): number;

  /**
   * Erase the element at `pos` .
   *
   * @param pos Iterator to the element to erase.
   * @return An iterator to the following position, or the end of the
   * container.
   */
  erase(pos: IteratorT): IteratorT;

  /**
   * Erase the elements in the half-open range `[first, last)` .
   *
   * @param first Start of the range to erase.
   * @param last Exclusive end of the range to erase.
   * @return An iterator to the position following the erased range.
   */
  erase(first: IteratorT, last: IteratorT): IteratorT;

  /* ---------------------------------------------------------------
        UTILITIES
    --------------------------------------------------------------- */
  /**
   * Exchange the contents of the two containers.
   *
   * @param obj Other container whose contents are exchanged with this one.
   */
  swap(obj: SourceT): void;

  /**
   * Return the elements in traversal order for JSON serialization.
   *
   * @return An array of the elements in traversal order.
   */
  toJSON(): Array<T>;
}

export namespace IContainer {
  /**
   * Iterator over the elements of `IContainer` .
   *
   * @author Jeongho Nam - https://github.com/samchon
   */
  export interface Iterator<
    T extends Elem,
    SourceT extends IContainer<T, SourceT, IteratorT, ReverseIteratorT, Elem>,
    IteratorT extends Iterator<T, SourceT, IteratorT, ReverseIteratorT, Elem>,
    ReverseIteratorT extends ReverseIterator<
      T,
      SourceT,
      IteratorT,
      ReverseIteratorT,
      Elem
    >,
    Elem = T,
  > extends Readonly<IReversableIterator<T, IteratorT, ReverseIteratorT>> {
    /**
     * Get the container associated with this iterator.
     *
     * @return The source container.
     */
    source(): SourceT;

    /**
     * @inheritDoc
     */
    reverse(): ReverseIteratorT;
  }

  /**
   * Iterator for reverse traversal of `IContainer` .
   *
   * @author Jeongho Nam - https://github.com/samchon
   */
  export interface ReverseIterator<
    T extends Elem,
    Source extends IContainer<T, Source, IteratorT, ReverseT, Elem>,
    IteratorT extends Iterator<T, Source, IteratorT, ReverseT, Elem>,
    ReverseT extends ReverseIterator<T, Source, IteratorT, ReverseT, Elem>,
    Elem = T,
  > extends Readonly<IReverseIterator<T, IteratorT, ReverseT>> {
    /**
     * Get the container associated with this iterator.
     *
     * @return The source container.
     */
    source(): Source;
  }
}
