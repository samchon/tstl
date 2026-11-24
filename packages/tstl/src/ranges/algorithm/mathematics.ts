//================================================================

/**
 * @packageDocumentation
 * @module std.ranges
 */
//================================================================
import * as base from "../../algorithm/mathematics";
import { equal_to, less } from "../../functional/comparators";
import { Comparator } from "../../internal/functional/Comparator";
import { Temporary } from "../../internal/functional/Temporary";
import { begin, end } from "../../iterator/factory";
import { size } from "../../iterator/global";
import { Pair } from "../../utility/Pair";
import { IBidirectionalContainer } from "../container/IBidirectionalContainer";
import { IForwardContainer } from "../container/IForwardContainer";

/* ---------------------------------------------------------
    MIN & MAX
--------------------------------------------------------- */
/**
 * Find the first minimum element according to `comp`.
 *
 * @param range Input range.
 * @param comp Strict ordering predicate. Return `true` when the first argument
 * precedes the second. Defaults to {@link less}.
 *
 * @return The first minimum, or the end of the range if it is empty.
 */
export function min_element<Range extends Array<any> | IForwardContainer<any>>(
  range: Range,
  comp: Comparator<IForwardContainer.ValueType<Range>> = less,
): IForwardContainer.IteratorType<Range> {
  return base.min_element(begin(range), end(range), comp);
}

/**
 * Find the first maximum element according to `comp`.
 *
 * @param range Input range.
 * @param comp Strict ordering predicate. Return `true` when the first argument
 * precedes the second. Defaults to {@link less}.
 *
 * @return The first maximum, or the end of the range if it is empty.
 */
export function max_element<Range extends Array<any> | IForwardContainer<any>>(
  range: Range,
  comp: Comparator<IForwardContainer.ValueType<Range>> = less,
): IForwardContainer.IteratorType<Range> {
  return base.max_element(begin(range), end(range), comp);
}

/**
 * Find the first minimum and the last maximum according to `comp`.
 *
 * @param range Input range.
 * @param comp Strict ordering predicate. Return `true` when the first argument
 * precedes the second. Defaults to {@link less}.
 *
 * @return A pair of iterators. Both equal the end of the range when it is
 * empty.
 */
export function minmax_element<
  Range extends Array<any> | IForwardContainer<any>,
>(
  range: Range,
  comp: Comparator<IForwardContainer.ValueType<Range>> = less,
): Pair<
  IForwardContainer.IteratorType<Range>,
  IForwardContainer.IteratorType<Range>
> {
  return base.minmax_element(begin(range), end(range), comp);
}

/* ---------------------------------------------------------
    PERMUATATIONS
--------------------------------------------------------- */
/**
 * Test whether the compared elements can be reordered to match, including
 * duplicates.
 *
 * @param range1 First input range.
 * @param range2 Second input range.
 * @param pred Predicate for equivalence. Defaults to {@link equal_to}.
 *
 * @return Whether the ranges are permutations of each other.
 */
export function is_permutation<
  Range1 extends Array<any> | IForwardContainer<any>,
  Range2 extends IForwardContainer.SimilarType<Range1>,
>(
  range1: Range1,
  range2: Range2,
  pred: Comparator<IForwardContainer.ValueType<Range1>> = <any>equal_to,
): boolean {
  if (size(range1) !== size(range2)) return false;
  else
    return base.is_permutation(
      begin(range1),
      end(range1),
      <Temporary>begin(range2),
      pred,
    );
}

/**
 * Rearrange the range into the previous lexicographic permutation. Wrap around
 * to the largest permutation when there is no previous one.
 *
 * @param range Input range.
 * @param comp Strict ordering predicate. Return `true` when the first argument
 * precedes the second. Defaults to {@link less}.
 *
 * @return Whether a previous permutation existed.
 */
export function prev_permutation<
  Range extends Array<any> | IBidirectionalContainer<any, any>,
>(
  range: Range,
  comp: Comparator<IForwardContainer.ValueType<Range>> = less,
): boolean {
  return base.prev_permutation(begin(range), end(range), comp);
}

/**
 * Rearrange the range into the next lexicographic permutation. Wrap around to
 * the smallest permutation when there is no next one.
 *
 * @param range Input range.
 * @param comp Strict ordering predicate. Return `true` when the first argument
 * precedes the second. Defaults to {@link less}.
 *
 * @return Whether a next permutation existed.
 */
export function next_permutation<
  Range extends Array<any> | IBidirectionalContainer<any, any>,
>(
  range: Range,
  comp: Comparator<IForwardContainer.ValueType<Range>> = less,
): boolean {
  return base.next_permutation(begin(range), end(range), comp);
}
