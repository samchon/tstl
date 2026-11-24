//================================================================

/**
 * @packageDocumentation
 * @module std.ranges
 */
//================================================================
import * as base from "../../algorithm/partition";
import { UnaryPredicator } from "../../internal/functional/UnaryPredicator";
import { Writeonly } from "../../internal/functional/Writeonly";
import { IForwardIterator } from "../../iterator/IForwardIterator";
import { begin, end } from "../../iterator/factory";
import { Pair } from "../../utility/Pair";
import { IBidirectionalContainer } from "../container/IBidirectionalContainer";
import { IForwardContainer } from "../container/IForwardContainer";

/**
 * Test whether all elements satisfying `pred` precede all elements that fail
 * it.
 *
 * @param range Input range.
 * @param pred Predicate selecting the elements in the first partition.
 *
 * @return Whether the range is partitioned by the predicate.
 */
export function is_partitioned<
  Range extends Array<any> | IForwardContainer<any>,
>(
  range: Range,
  pred: UnaryPredicator<IForwardContainer.ValueType<Range>>,
): boolean {
  return base.is_partitioned(begin(range), end(range), pred);
}

/**
 * Find where a range already partitioned by `pred` changes from matching to
 * nonmatching elements.
 *
 * @param range Input range.
 * @param pred Predicate selecting the elements in the first partition.
 *
 * @return The first nonmatching iterator, or the end of the range.
 */
export function partition_point<
  Range extends Array<any> | IForwardContainer<any>,
>(
  range: Range,
  pred: UnaryPredicator<IForwardContainer.ValueType<Range>>,
): IForwardContainer.IteratorType<Range> {
  return base.partition_point(begin(range), end(range), pred);
}

/**
 * Reorder the range so that elements satisfying `pred` precede the others.
 *
 * @param range Range modified in place.
 * @param pred Predicate selecting the elements in the first partition.
 *
 * @return The beginning of the nonmatching group, or the end if all elements
 * match.
 */
export function partition<
  Range extends Array<any> | IBidirectionalContainer<any, any>,
>(
  range: Range,
  pred: UnaryPredicator<IForwardContainer.ValueType<Range>>,
): IBidirectionalContainer.IteratorType<Range> {
  return <any>base.partition(begin(range), end(range), pred);
}

/**
 * Group matching elements before nonmatching elements, preserving the order
 * within each group.
 *
 * @param range Range modified in place.
 * @param pred Predicate selecting the elements in the first partition.
 *
 * @return The beginning of the nonmatching group, or the end if all elements
 * match.
 */
export function stable_partition<
  Range extends Array<any> | IBidirectionalContainer<any, any>,
>(
  range: Range,
  pred: UnaryPredicator<IForwardContainer.ValueType<Range>>,
): IBidirectionalContainer.IteratorType<Range> {
  return <any>base.stable_partition(begin(range), end(range), pred);
}

/**
 * Copy matching and nonmatching elements to separate destinations, preserving
 * their order within each destination.
 *
 * @param range Input range.
 * @param output_true Start of the output for matching elements.
 * @param output_false Start of the output for nonmatching elements.
 * @param pred Predicate selecting the elements in the first partition.
 *
 * @return A pair containing the end of the matching output and the end of the
 * nonmatching output.
 */
export function partition_copy<
  Range extends Array<any> | IForwardContainer<any>,
  OutputIterator1 extends Writeonly<
    IForwardIterator<IForwardContainer.ValueType<Range>, OutputIterator1>
  >,
  OutputIterator2 extends Writeonly<
    IForwardIterator<IForwardContainer.ValueType<Range>, OutputIterator2>
  >,
>(
  range: Range,
  output_true: OutputIterator1,
  output_false: OutputIterator2,
  pred: UnaryPredicator<IForwardContainer.ValueType<Range>>,
): Pair<OutputIterator1, OutputIterator2> {
  return base.partition_copy(
    begin(range),
    end(range),
    output_true,
    output_false,
    pred,
  );
}
