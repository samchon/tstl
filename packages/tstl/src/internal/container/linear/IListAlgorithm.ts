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
   * @param binary_pred Predicate for equivalence. Defaults to {@link equal_to}.
   */
  unique(binary_pred?: BinaryPredicator<T>): void;

  /**
   * Erase all elements equivalent to `val`, preserving the order of the
   * remaining nodes.
   *
   * @param val Value to erase.
   */
  remove(val: T): void;

  /**
   * Erase the elements that satisfy `pred`, preserving the order of the
   * remaining nodes.
   *
   * @param pred Predicate selecting nodes to erase.
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
   * @param comp Strict ordering predicate. Return `true` when the first
   * argument precedes the second. Defaults to {@link less}.
   */
  merge(from: Source, comp?: Comparator<T>): void;

  /**
   * Stably sort the elements while preserving their iterators.
   *
   * @param comp Strict ordering predicate. Return `true` when the first
   * argument precedes the second. Defaults to {@link less}.
   */
  sort(comp?: Comparator<T>): void;

  /**
   * Reverse the sequence by relinking nodes. Existing iterators continue to
   * designate the same elements.
   */
  reverse(): void;

  /**
   * Exchange the contents of the two containers.
   *
   * @param obj Other container whose contents are exchanged with this one.
   */
  swap(obj: Source): void;
}
