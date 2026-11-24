//================================================================

/**
 * @packageDocumentation
 * @module std.internal
 */
//================================================================
import { BinaryPredicator } from "../../functional/BinaryPredicator";
import { Comparator } from "../../functional/Comparator";
import { UnaryPredicator } from "../../functional/UnaryPredicator";

export interface IListAlgorithm<T, Source> {
  /* ---------------------------------------------------------
        UNIQUE & REMOVE
    --------------------------------------------------------- */
  /**
   * Remove all but the first element of each run of equivalent elements.
   *
   * @param binary_pred A binary function predicates two arguments are equal. Default is {@link equal_to}.
   */
  unique(binary_pred?: BinaryPredicator<T>): void;

  /**
   * Remove elements with specific value.
   *
   * @param val The value to remove.
   */
  remove(val: T): void;

  /**
   * Remove elements with specific function.
   *
   * @param pred A unary function determines whether remove or not.
   */
  remove_if(pred: UnaryPredicator<T>): void;

  /* ---------------------------------------------------------
        SEQUENCE
    --------------------------------------------------------- */
  /**
   * Stably merge two sorted containers, emptying the source. Iterators to moved
   * elements follow them into the destination.
   *
   * @param from Source container to transfer.
   * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Default is {@link less}.
   */
  merge(from: Source, comp?: Comparator<T>): void;

  /**
   * Stably sort the elements while preserving their iterators.
   *
   * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Default is {@link less}.
   */
  sort(comp?: Comparator<T>): void;

  /**
   * Reverse the order while preserving iterators to elements.
   */
  reverse(): void;

  /**
   * Swap elements.
   *
   * @param obj Target container to swap.
   */
  swap(obj: Source): void;
}
