//================================================================

/**
 * @packageDocumentation
 * @module std.ranges
 */
//================================================================
import * as base from "../../algorithm/merge";
import { less } from "../../functional/comparators";
import { Comparator } from "../../internal/functional/Comparator";
import { Temporary } from "../../internal/functional/Temporary";
import { Writeonly } from "../../internal/functional/Writeonly";
import { IForwardIterator } from "../../iterator/IForwardIterator";
import { begin, end } from "../../iterator/factory";
import { size } from "../../iterator/global";
import { IBidirectionalContainer } from "../container/IBidirectionalContainer";
import { IForwardContainer } from "../container/IForwardContainer";

/* ---------------------------------------------------------
    MERGE
--------------------------------------------------------- */
/**
 * Stably merge two sorted ranges into an output range. Equivalent elements
 * from the first range precede those from the second. The destination must not
 * overlap either input range.
 *
 * @param range1 First sorted input range.
 * @param range2 Second sorted input range.
 * @param output Iterator to the start of the destination.
 * @param comp Strict ordering predicate. Return `true` when the first argument
 * precedes the second. Defaults to {@link less}.
 *
 * @return The iterator immediately after the last value written.
 */
export function merge<
  Range1 extends Array<any> | IForwardContainer<any>,
  Range2 extends IForwardContainer.SimilarType<Range1>,
  OutputIterator extends Writeonly<
    IForwardIterator<IForwardContainer.ValueType<Range1>, OutputIterator>
  >,
>(
  range1: Range1,
  range2: Range2,
  output: OutputIterator,
  comp: Comparator<IForwardContainer.ValueType<Range1>> = less,
): OutputIterator {
  return base.merge(
    begin(range1),
    end(range1),
    <Temporary>begin(range2),
    end(range2),
    output,
    comp,
  );
}

/**
 * Stably merge two consecutive sorted ranges in place. `middle` separates the
 * input ranges.
 *
 * @param range Sorted input range.
 * @param middle Start of the second sorted range.
 * @param comp Strict ordering predicate. Return `true` when the first argument
 * precedes the second. Defaults to {@link less}.
 */
export function inplace_merge<
  Range extends Array<any> | IBidirectionalContainer<any, any>,
>(
  range: Range,
  middle: IBidirectionalContainer.IteratorType<Range>,
  comp: Comparator<IForwardContainer.ValueType<Range>> = less,
): void {
  return base.inplace_merge(begin(range), <any>middle, end(range), comp);
}

/* ---------------------------------------------------------
    SET OPERATIONS
--------------------------------------------------------- */
/**
 * Check whether the first sorted range contains the elements of the second,
 * accounting for repetitions.
 *
 * @param range1 First sorted input range.
 * @param range2 Second sorted input range.
 * @param comp Strict ordering predicate. Return `true` when the first argument
 * precedes the second. Defaults to {@link less}.
 *
 * @return Whether the first range contains each value at least as many times
 * as the second.
 */
export function includes<
  Range1 extends Array<any> | IForwardContainer<any>,
  Range2 extends IForwardContainer.SimilarType<Range1>,
>(
  range1: Range1,
  range2: Range2,
  comp: Comparator<IForwardContainer.ValueType<Range1>> = less,
): boolean {
  if (size(range1) < size(range2)) return false;
  else
    return base.includes(
      begin(range1),
      end(range1),
      <Temporary>begin(range2),
      end(range2),
      comp,
    );
}

/**
 * Write the union of two sorted ranges. For each equivalent value, write the
 * greater of its two multiplicities.
 *
 * @param range1 First sorted input range.
 * @param range2 Second sorted input range.
 * @param output Iterator to the start of the destination.
 * @param comp Strict ordering predicate. Return `true` when the first argument
 * precedes the second. Defaults to {@link less}.
 *
 * @return The iterator immediately after the last value written.
 */
export function set_union<
  Range1 extends Array<any> | IForwardContainer<any>,
  Range2 extends IForwardContainer.SimilarType<Range1>,
  OutputIterator extends Writeonly<
    IForwardIterator<IForwardContainer.ValueType<Range1>, OutputIterator>
  >,
>(
  range1: Range1,
  range2: Range2,
  output: OutputIterator,
  comp: Comparator<IForwardContainer.ValueType<Range1>> = less,
): OutputIterator {
  return base.set_union(
    begin(range1),
    end(range1),
    <Temporary>begin(range2),
    end(range2),
    output,
    comp,
  );
}

/**
 * Write the intersection of two sorted ranges. For each equivalent value,
 * write the smaller of its two multiplicities.
 *
 * @param range1 First sorted input range.
 * @param range2 Second sorted input range.
 * @param output Iterator to the start of the destination.
 * @param comp Strict ordering predicate. Return `true` when the first argument
 * precedes the second. Defaults to {@link less}.
 *
 * @return The iterator immediately after the last value written.
 */
export function set_intersection<
  Range1 extends Array<any> | IForwardContainer<any>,
  Range2 extends IForwardContainer.SimilarType<Range1>,
  OutputIterator extends Writeonly<
    IForwardIterator<IForwardContainer.ValueType<Range1>, OutputIterator>
  >,
>(
  range1: Range1,
  range2: Range2,
  output: OutputIterator,
  comp: Comparator<IForwardContainer.ValueType<Range1>> = less,
): OutputIterator {
  return base.set_intersection(
    begin(range1),
    end(range1),
    <Temporary>begin(range2),
    end(range2),
    output,
    comp,
  );
}

/**
 * Write the elements of the first sorted range left after removing one match
 * for each equivalent element in the second.
 *
 * @param range1 First sorted input range.
 * @param range2 Second sorted input range.
 * @param output Iterator to the start of the destination.
 * @param comp Strict ordering predicate. Return `true` when the first argument
 * precedes the second. Defaults to {@link less}.
 *
 * @return The iterator immediately after the last value written.
 */
export function set_difference<
  Range1 extends Array<any> | IForwardContainer<any>,
  Range2 extends IForwardContainer.SimilarType<Range1>,
  OutputIterator extends Writeonly<
    IForwardIterator<IForwardContainer.ValueType<Range1>, OutputIterator>
  >,
>(
  range1: Range1,
  range2: Range2,
  output: OutputIterator,
  comp: Comparator<IForwardContainer.ValueType<Range1>> = less,
): OutputIterator {
  return base.set_difference(
    begin(range1),
    end(range1),
    <Temporary>begin(range2),
    end(range2),
    output,
    comp,
  );
}

/**
 * Write elements present in excess on either side of two sorted ranges, after
 * canceling matching pairs.
 *
 * @param range1 First sorted input range.
 * @param range2 Second sorted input range.
 * @param output Iterator to the start of the destination.
 * @param comp Strict ordering predicate. Return `true` when the first argument
 * precedes the second. Defaults to {@link less}.
 *
 * @return The iterator immediately after the last value written.
 */
export function set_symmetric_difference<
  Range1 extends Array<any> | IForwardContainer<any>,
  Range2 extends IForwardContainer.SimilarType<Range1>,
  OutputIterator extends Writeonly<
    IForwardIterator<IForwardContainer.ValueType<Range1>, OutputIterator>
  >,
>(
  range1: Range1,
  range2: Range2,
  output: OutputIterator,
  comp: Comparator<IForwardContainer.ValueType<Range1>> = less,
): OutputIterator {
  return base.set_symmetric_difference(
    begin(range1),
    end(range1),
    <Temporary>begin(range2),
    end(range2),
    output,
    comp,
  );
}
