//================================================================

/**
 * @packageDocumentation
 * @module std.ranges
 */
//================================================================
import * as base from "../../algorithm/sorting";
import { less } from "../../functional/comparators";
import { Comparator } from "../../internal/functional/Comparator";
import { begin, end } from "../../iterator/factory";
import { IForwardContainer } from "../container/IForwardContainer";
import { IRandomAccessContainer } from "../container/IRandomAccessContainer";

/* ---------------------------------------------------------
    SORT
--------------------------------------------------------- */
/**
 * Sort the range in place under `comp`. Equivalent elements can change
 * relative order.
 *
 * @param range Range modified in place.
 * @param comp Strict ordering predicate. Return `true` when the first argument
 * precedes the second. Defaults to {@link less}.
 */
export function sort<Range extends Array<any> | IRandomAccessContainer<any>>(
  range: Range,
  comp: Comparator<IForwardContainer.ValueType<Range>> = less,
): void {
  return base.sort(begin(range), end(range), comp);
}

/**
 * Sort the range in place under `comp`, preserving the relative order of
 * equivalent elements.
 *
 * @param range Range modified in place.
 * @param comp Strict ordering predicate. Return `true` when the first argument
 * precedes the second. Defaults to {@link less}.
 */
export function stable_sort<
  Range extends Array<any> | IRandomAccessContainer<any>,
>(
  range: Range,
  comp: Comparator<IForwardContainer.ValueType<Range>> = less,
): void {
  return base.stable_sort(begin(range), end(range), comp);
}

/**
 * Place the smallest elements in sorted order before `middle`. The remaining
 * elements have unspecified order.
 *
 * @param range Range modified in place.
 * @param middle Exclusive end of the prefix to sort.
 * @param comp Strict ordering predicate. Return `true` when the first argument
 * precedes the second. Defaults to {@link less}.
 */
export function partial_sort<
  Range extends Array<any> | IRandomAccessContainer<any>,
>(
  range: Range,
  middle: IRandomAccessContainer.IteratorType<Range>,
  comp: Comparator<IForwardContainer.ValueType<Range>> = less,
): void {
  return base.partial_sort(begin(range), <any>middle, end(range), comp);
}

/**
 * Write the smallest elements in sorted order until the output range is full
 * or the input is exhausted.
 *
 * @param range Input range.
 * @param output Destination range that limits the number of copied elements.
 *
 * @return The iterator immediately after the last value written.
 */
export function partial_sort_copy<
  Range extends Array<any> | IForwardContainer<any>,
  Output extends Array<any> | IForwardContainer<any>,
>(
  range: Range,
  output: Output,
  comp: Comparator<IForwardContainer.ValueType<Range>> = less,
): IForwardContainer.IteratorType<Output> {
  return base.partial_sort_copy(
    begin(range),
    end(range),
    begin(output),
    end(output),
    comp,
  );
}

/**
 * Partition the range so that `nth` holds the element it would have after
 * sorting. No element after `nth` precedes an element before it. Passing the
 * end as `nth` leaves the range unchanged.
 *
 * @param range Range modified in place.
 * @param nth Position to select. Use the end iterator to leave the range
 * unchanged.
 * @param comp Strict ordering predicate. Return `true` when the first argument
 * precedes the second. Defaults to {@link less}.
 */
export function nth_element<
  Range extends Array<any> | IRandomAccessContainer<any>,
>(
  range: Range,
  nth: IRandomAccessContainer.IteratorType<Range>,
  comp: Comparator<IForwardContainer.ValueType<Range>> = less,
): void {
  return base.nth_element(begin(range), <any>nth, end(range), comp);
}

/* ---------------------------------------------------------
    INSPECTOR
--------------------------------------------------------- */
/**
 * Test whether the range is in nondecreasing order under `comp`.
 *
 * @param range Input range.
 * @param comp Strict ordering predicate. Return `true` when the first argument
 * precedes the second. Defaults to {@link less}.
 *
 * @return Whether the entire range is sorted.
 */
export function is_sorted<Range extends Array<any> | IForwardContainer<any>>(
  range: Range,
  comp: Comparator<IForwardContainer.ValueType<Range>> = less,
): boolean {
  return base.is_sorted(begin(range), end(range), comp);
}

/**
 * Find the end of the longest sorted prefix under `comp`.
 *
 * @param range Input range.
 * @param comp Strict ordering predicate. Return `true` when the first argument
 * precedes the second. Defaults to {@link less}.
 *
 * @return The first iterator out of order, or the end of the range if it is
 * sorted.
 */
export function is_sorted_until<
  Range extends Array<any> | IForwardContainer<any>,
>(
  range: Range,
  comp: Comparator<IForwardContainer.ValueType<Range>> = less,
): IForwardContainer.IteratorType<Range> {
  return base.is_sorted_until(begin(range), end(range), comp);
}
