//================================================================

/**
 * @packageDocumentation
 * @module std.ranges
 */
//================================================================
import * as base from "../../algorithm/heap";
import { less } from "../../functional/comparators";
import { Comparator } from "../../internal/functional/Comparator";
import { begin, end } from "../../iterator/factory";
import { IRandomAccessContainer } from "../container/IRandomAccessContainer";

/* ---------------------------------------------------------
    PUSH & POP
--------------------------------------------------------- */
/**
 * Rearrange the range into a heap under `comp` .
 *
 * @param range Input range.
 * @param comp Strict ordering predicate. Return `true` when the first argument
 * precedes the second. Defaults to {@link less} .
 */
export function make_heap<
  Range extends Array<any> | IRandomAccessContainer<any>,
>(
  range: Range,
  comp: Comparator<IRandomAccessContainer.ValueType<Range>> = less,
): void {
  return base.make_heap(begin(range), end(range), comp);
}

/**
 * Restore heap order after appending the last element. The preceding elements
 * must already form a heap.
 *
 * @param range Input range.
 * @param comp Strict ordering predicate. Return `true` when the first argument
 * precedes the second. Defaults to {@link less} .
 */
export function push_heap<
  Range extends Array<any> | IRandomAccessContainer<any>,
>(
  range: Range,
  comp: Comparator<IRandomAccessContainer.ValueType<Range>> = less,
): void {
  return base.push_heap(begin(range), end(range), comp);
}

/**
 * Move the root of a nonempty heap to the last position and restore heap order
 * in the remaining prefix.
 *
 * @param range Input range.
 * @param comp Strict ordering predicate. Return `true` when the first argument
 * precedes the second. Defaults to {@link less} .
 */
export function pop_heap<
  Range extends Array<any> | IRandomAccessContainer<any>,
>(
  range: Range,
  comp: Comparator<IRandomAccessContainer.ValueType<Range>> = less,
): void {
  return base.pop_heap(begin(range), end(range), comp);
}

/* ---------------------------------------------------------
    SORT
--------------------------------------------------------- */
/**
 * Test whether the entire range satisfies heap order under `comp` .
 *
 * @param range Input range.
 * @param comp Strict ordering predicate. Return `true` when the first argument
 * precedes the second. Defaults to {@link less} .
 *
 * @return Whether the entire range is a heap.
 */
export function is_heap<Range extends Array<any> | IRandomAccessContainer<any>>(
  range: Range,
  comp: Comparator<IRandomAccessContainer.ValueType<Range>> = less,
): boolean {
  return base.is_heap(begin(range), end(range), comp);
}

/**
 * Find the end of the longest prefix that is a heap under `comp` .
 *
 * @param range Input range.
 * @param comp Strict ordering predicate. Return `true` when the first argument
 * precedes the second. Defaults to {@link less} .
 *
 * @return The end of the heap prefix, or the end of the range when it is a
 * heap.
 */
export function is_heap_until<
  Range extends Array<any> | IRandomAccessContainer<any>,
>(
  range: Range,
  comp: Comparator<IRandomAccessContainer.ValueType<Range>> = less,
): IRandomAccessContainer.IteratorType<Range> {
  return base.is_heap_until(<any>begin(range), <any>end(range), <any>comp);
}

/**
 * Sort an existing heap in place under the same ordering used to build it.
 *
 * @param range Input range.
 * @param comp Strict ordering predicate. Return `true` when the first argument
 * precedes the second. Defaults to {@link less} .
 */
export function sort_heap<
  Range extends Array<any> | IRandomAccessContainer<any>,
>(
  range: Range,
  comp: Comparator<IRandomAccessContainer.ValueType<Range>> = less,
): void {
  return base.sort_heap(begin(range), end(range), comp);
}
