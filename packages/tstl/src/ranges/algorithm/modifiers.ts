//================================================================

/**
 * @packageDocumentation
 * @module std.ranges
 */
//================================================================
import * as base from "../../algorithm/modifiers";
import { IPointer } from "../../functional/IPointer";
import { equal_to } from "../../functional/comparators";
import { BinaryPredicator } from "../../internal/functional/BinaryPredicator";
import { Temporary } from "../../internal/functional/Temporary";
import { UnaryPredicator } from "../../internal/functional/UnaryPredicator";
import { Writeonly } from "../../internal/functional/Writeonly";
import { IBidirectionalIterator } from "../../iterator/IBidirectionalIterator";
import { IForwardIterator } from "../../iterator/IForwardIterator";
import { begin, end } from "../../iterator/factory";
import { IBidirectionalContainer } from "../container/IBidirectionalContainer";
import { IForwardContainer } from "../container/IForwardContainer";
import { IRandomAccessContainer } from "../container/IRandomAccessContainer";

type UnaryOperatorInferrer<
  Range extends Array<any> | IForwardContainer<any>,
  OutputIterator extends Writeonly<
    IForwardIterator<IPointer.ValueType<OutputIterator>, OutputIterator>
  >,
> = (
  val: IForwardContainer.ValueType<Range>,
) => IPointer.ValueType<OutputIterator>;

type BinaryOperatorInferrer<
  Range1 extends Array<any> | IForwardContainer<any>,
  Range2 extends Array<any> | IForwardContainer<any>,
  OutputIterator extends Writeonly<
    IForwardIterator<IPointer.ValueType<OutputIterator>, OutputIterator>
  >,
> = (
  x: IForwardContainer.ValueType<Range1>,
  y: IForwardContainer.ValueType<Range2>,
) => IPointer.ValueType<OutputIterator>;

/* ---------------------------------------------------------
    FILL
--------------------------------------------------------- */
/**
 * Copy elements in traversal order. The destination must have room for the
 * entire range, or accept inserted elements.
 *
 * @param range Input range.
 * @param output Iterator to the start of the destination.
 *
 * @return The iterator immediately after the last value written.
 */
export function copy<
  Range extends Array<any> | IForwardContainer<any>,
  OutputIterator extends Writeonly<
    IForwardIterator<IForwardContainer.ValueType<Range>, OutputIterator>
  >,
>(range: Range, output: OutputIterator): OutputIterator {
  return base.copy(begin(range), end(range), output);
}

/**
 * Copy `n` consecutive elements from the start position. The input must
 * contain at least `n` elements.
 *
 * @param range Input range.
 * @param n Number of elements to copy.
 * @param output Iterator to the start of the destination.
 *
 * @return The iterator immediately after the last value written.
 */
export function copy_n<
  Range extends Array<any> | IForwardContainer<any>,
  OutputIterator extends Writeonly<
    IForwardIterator<IForwardContainer.ValueType<Range>, OutputIterator>
  >,
>(range: Range, n: number, output: OutputIterator): OutputIterator {
  return base.copy_n(begin(range), n, output);
}

/**
 * Copy elements that satisfy `pred` , preserving their relative order.
 *
 * @param range Input range.
 * @param output Iterator to the start of the destination.
 * @param pred Predicate to test each element.
 *
 * @return The iterator immediately after the last value written.
 */
export function copy_if<
  Range extends Array<any> | IForwardContainer<any>,
  OutputIterator extends Writeonly<
    IForwardIterator<IForwardContainer.ValueType<Range>, OutputIterator>
  >,
>(
  range: Range,
  output: OutputIterator,
  pred: UnaryPredicator<IForwardContainer.ValueType<Range>>,
): OutputIterator {
  return base.copy_if(begin(range), end(range), output, pred);
}

/**
 * Copy the range into the destination by writing from the end toward the
 * beginning. The copied elements retain their order.
 *
 * @param range Input range.
 * @param output Exclusive end of the destination range.
 *
 * @return The beginning of the destination range.
 */
export function copy_backward<
  Range extends Array<any> | IBidirectionalContainer<any, any>,
  OutputIterator extends Writeonly<
    IBidirectionalIterator<
      IBidirectionalContainer.ValueType<Range>,
      OutputIterator
    >
  >,
>(range: Range, output: OutputIterator): OutputIterator {
  return base.copy_backward(begin(range), end(range), <Temporary>output);
}

/**
 * Assign the same value to every element in the range.
 *
 * @param range Range modified in place.
 * @param value Value to assign to each element.
 */
export function fill<Range extends Array<any> | IForwardContainer<any>>(
  range: Range,
  value: IForwardContainer.ValueType<Range>,
): void {
  return base.fill(begin(range), end(range), value);
}

/**
 * Assign the same value to the first `n` positions.
 *
 * @param range Range modified in place.
 * @param n Number of elements to fill.
 * @param value Value to assign to each element.
 *
 * @return The iterator immediately after the last position filled.
 */
export function fill_n<Range extends Array<any> | IForwardContainer<any>>(
  range: Range,
  n: number,
  value: IForwardContainer.ValueType<Range>,
): IForwardContainer.IteratorType<Range> {
  return base.fill_n(begin(range), n, value);
}

/**
 * Apply a unary transformation to each input element and write the results in
 * traversal order.
 *
 * @param range Input range.
 * @param result Iterator to the start of the destination.
 * @param op Unary transformation.
 *
 * @return The iterator immediately after the last value written.
 */
export function transform<
  Range extends Array<any> | IForwardContainer<any>,
  OutputIterator extends Writeonly<
    IForwardIterator<IPointer.ValueType<OutputIterator>, OutputIterator>
  >,
>(
  range: Range,
  result: OutputIterator,
  op: UnaryOperatorInferrer<Range, OutputIterator>,
): OutputIterator;

/**
 * Apply a binary transformation to corresponding input pairs and write the
 * results in traversal order.
 *
 * @param range Input range.
 * @param first Second input range, with at least as many elements as `range`.
 * @param result Iterator to the start of the destination.
 * @param op Binary transformation.
 *
 * @return The iterator immediately after the last value written.
 */
export function transform<
  Range1 extends Array<any> | IForwardContainer<any>,
  Range2 extends Array<any> | IForwardContainer<any>,
  OutputIterator extends Writeonly<
    IForwardIterator<IPointer.ValueType<OutputIterator>, OutputIterator>
  >,
>(
  range: Range1,
  first: Range2,
  result: OutputIterator,
  op: BinaryOperatorInferrer<Range1, Range2, OutputIterator>,
): OutputIterator;

export function transform<Range1 extends Array<any> | IForwardContainer<any>>(
  range1: Range1,
  ...args: any[]
): any {
  const fn: Function = base.transform.bind(
    undefined,
    begin(range1),
    end(range1),
  );
  if (args.length === 2) return fn(...args);
  return fn(begin(args[0]), args[1], args[2]);
}

/**
 * Assign successive results of `gen()` to the range in traversal order.
 *
 * @param range Range modified in place.
 * @param gen Function invoked once for each assigned element.
 */
export function generate<Range extends Array<any> | IForwardContainer<any>>(
  range: Range,
  gen: () => IForwardContainer.ValueType<Range>,
): void {
  return base.generate(begin(range), end(range), gen);
}

/**
 * Assign `n` successive results of `gen()` in traversal order.
 *
 * @param range Range modified in place.
 * @param n Number of elements to generate.
 * @param gen Function invoked once for each assigned element.
 *
 * @return The iterator immediately after the last value written.
 */
export function generate_n<Range extends Array<any> | IForwardContainer<any>>(
  range: Range,
  n: number,
  gen: () => IForwardContainer.ValueType<Range>,
): IForwardContainer.IteratorType<Range> {
  return base.generate_n(begin(range), n, gen);
}

/* ---------------------------------------------------------
    REMOVE
--------------------------------------------------------- */
/**
 * Test whether the range has no adjacent equivalent elements.
 *
 * @param range Input range.
 * @param pred Predicate for equivalence. Defaults to {@link equal_to} .
 *
 * @returns Whether there is no adjacent equivalent pair.
 */
export function is_unique<Range extends Array<any> | IForwardContainer<any>>(
  range: Range,
  pred: BinaryPredicator<IForwardContainer.ValueType<Range>> = equal_to,
): boolean {
  return base.is_unique(begin(range), end(range), pred);
}

/**
 * Compact consecutive equivalent elements in place, keeping the first element
 * of each run. Erase the trailing range separately if the container should
 * shrink.
 *
 * @param range Range modified in place.
 * @param pred Predicate for equivalence. Defaults to {@link equal_to} .
 *
 * @return The new logical end of the compacted range.
 */
export function unique<Range extends Array<any> | IForwardContainer<any>>(
  range: Range,
  pred: BinaryPredicator<IForwardContainer.ValueType<Range>> = equal_to,
): IForwardContainer.IteratorType<Range> {
  return base.unique(begin(range), end(range), pred);
}

/**
 * Copy only the first element of each consecutive run of equivalent elements.
 *
 * @param range Input range.
 * @param output Iterator to the start of the destination.
 * @param pred Predicate for equivalence. Defaults to {@link equal_to} .
 *
 * @return The iterator immediately after the last value written.
 */
export function unique_copy<
  Range extends Array<any> | IForwardContainer<any>,
  OutputIterator extends Writeonly<
    IForwardIterator<IForwardContainer.ValueType<Range>, OutputIterator>
  >,
>(
  range: Range,
  output: OutputIterator,
  pred: BinaryPredicator<IForwardContainer.ValueType<Range>> = equal_to,
): OutputIterator {
  return base.unique_copy(begin(range), end(range), output, pred);
}

/**
 * Compact elements that are unequal to `val` in place, preserving their order.
 * Erase the trailing range separately if the container should shrink.
 *
 * @param range Range modified in place.
 * @param val Value to exclude.
 *
 * @return The new logical end of the retained elements.
 */
export function remove<Range extends Array<any> | IForwardContainer<any>>(
  range: Range,
  val: IForwardContainer.ValueType<Range>,
): IForwardContainer.IteratorType<Range> {
  return base.remove(begin(range), end(range), val);
}

/**
 * Compact elements that fail `pred` in place, preserving their order. Erase
 * the trailing range separately if the container should shrink.
 *
 * @param range Range modified in place.
 * @param pred Predicate selecting elements to exclude.
 *
 * @return The new logical end of the retained elements.
 */
export function remove_if<Range extends Array<any> | IForwardContainer<any>>(
  range: Range,
  pred: UnaryPredicator<IForwardContainer.ValueType<Range>>,
): IForwardContainer.IteratorType<Range> {
  return base.remove_if(begin(range), end(range), pred);
}

/**
 * Copy elements that are unequal to `val` , preserving their order.
 *
 * @param range Input range.
 * @param output Iterator to the start of the destination.
 * @param val Value to exclude.
 *
 * @return The iterator immediately after the last value written.
 */
export function remove_copy<
  Range extends Array<any> | IForwardContainer<any>,
  OutputIterator extends Writeonly<
    IForwardIterator<IForwardContainer.ValueType<Range>, OutputIterator>
  >,
>(
  range: Range,
  output: OutputIterator,
  val: IForwardContainer.ValueType<Range>,
): OutputIterator {
  return base.remove_copy(begin(range), end(range), output, val);
}

/**
 * Copy elements that fail `pred` , preserving their order.
 *
 * @param range Input range.
 * @param output Iterator to the start of the destination.
 * @param pred Predicate selecting elements to exclude.
 *
 * @return The iterator immediately after the last value written.
 */
export function remove_copy_if<
  Range extends Array<any> | IForwardContainer<any>,
  OutputIterator extends Writeonly<
    IForwardIterator<IForwardContainer.ValueType<Range>, OutputIterator>
  >,
>(
  range: Range,
  output: OutputIterator,
  pred: UnaryPredicator<IForwardContainer.ValueType<Range>>,
): OutputIterator {
  return base.remove_copy_if(begin(range), end(range), output, pred);
}

/* ---------------------------------------------------------
    REPLACE & SWAP
--------------------------------------------------------- */
/**
 * Replace every element equal to `old_val` with `new_val` in place.
 *
 * @param range Range modified in place.
 * @param old_val Value to replace.
 * @param new_val Replacement value.
 */
export function replace<Range extends Array<any> | IForwardContainer<any>>(
  range: Range,
  old_val: IForwardContainer.ValueType<Range>,
  new_val: IForwardContainer.ValueType<Range>,
): void {
  return base.replace(begin(range), end(range), old_val, new_val);
}

/**
 * Assign `new_val` to every element that satisfies `pred` .
 *
 * @param range Range modified in place.
 * @param pred Predicate selecting elements to replace.
 * @param new_val Replacement value.
 */
export function replace_if<Range extends Array<any> | IForwardContainer<any>>(
  range: Range,
  pred: UnaryPredicator<IForwardContainer.ValueType<Range>>,
  new_val: IForwardContainer.ValueType<Range>,
): void {
  return base.replace_if(begin(range), end(range), pred, new_val);
}

/**
 * Copy the range, substituting `new_val` for each element equal to `old_val` .
 *
 * @param range Input range.
 * @param output Iterator to the start of the destination.
 * @param old_val Value to replace.
 * @param new_val Replacement value.
 *
 * @return The iterator immediately after the last value written.
 */
export function replace_copy<
  Range extends Array<any> | IForwardContainer<any>,
  OutputIterator extends Writeonly<
    IForwardIterator<IForwardContainer.ValueType<Range>, OutputIterator>
  >,
>(
  range: Range,
  output: OutputIterator,
  old_val: IForwardContainer.ValueType<Range>,
  new_val: IForwardContainer.ValueType<Range>,
): OutputIterator {
  return base.replace_copy(begin(range), end(range), output, old_val, new_val);
}

/**
 * Copy the range, substituting `new_val` for every element that satisfies
 * `pred` .
 *
 * @param range Input range.
 * @param output Iterator to the start of the destination.
 * @param pred Predicate selecting elements to replace.
 * @param new_val Replacement value.
 *
 * @return The iterator immediately after the last value written.
 */
export function replace_copy_if<
  Range extends Array<any> | IForwardContainer<any>,
  OutputIterator extends Writeonly<
    IForwardIterator<IForwardContainer.ValueType<Range>, OutputIterator>
  >,
>(
  range: Range,
  output: OutputIterator,
  pred: UnaryPredicator<IForwardContainer.ValueType<Range>>,
  new_val: IForwardContainer.ValueType<Range>,
): OutputIterator {
  return base.replace_copy_if(begin(range), end(range), output, pred, new_val);
}

/**
 * Exchange corresponding elements. The second range must contain at least as
 * many elements as the first.
 *
 * @param range1 First input range.
 * @param range2 Second range, which must contain at least as many elements as
 * the first.
 *
 * @return The iterator immediately after the last element swapped in the
 * second range.
 */
export function swap_ranges<
  Range1 extends Array<any> | IForwardContainer<any>,
  Range2 extends IForwardContainer.SimilarType<Range1>,
>(range1: Range1, range2: Range2): IForwardContainer.IteratorType<Range2> {
  return base.swap_ranges(begin(range1), end(range1), <Temporary>begin(range2));
}

/* ---------------------------------------------------------
    RE-ARRANGEMENT
--------------------------------------------------------- */
/**
 * Reverse the order of the elements in place.
 *
 * @param range Range modified in place.
 */
export function reverse<
  Range extends Array<any> | IBidirectionalContainer<any, any>,
>(range: Range): void {
  return base.reverse(begin(range), end(range));
}

/**
 * Copy the range in reverse order.
 *
 * @param range Input range.
 * @param output Iterator to the start of the destination.
 *
 * @return The iterator immediately after the last value written.
 */
export function reverse_copy<
  Range extends Array<any> | IBidirectionalContainer<any, any>,
  OutputIterator extends Writeonly<
    IForwardIterator<IForwardContainer.ValueType<Range>, OutputIterator>
  >,
>(range: Range, output: OutputIterator): OutputIterator {
  return base.reverse_copy(begin(range), end(range), output);
}

export function shift_left<Range extends Array<any> | IForwardContainer<any>>(
  range: Range,
  n: number,
): void {
  return base.shift_left(begin(range), end(range), n);
}

export function shift_right<
  Range extends Array<any> | IBidirectionalContainer<any, any>,
>(range: Range, n: number): void {
  return base.shift_right(begin(range), end(range), n);
}

/**
 * Rotate the range in place so that `middle` becomes its first position in the
 * resulting order.
 *
 * @param range Range modified in place.
 * @param middle Original position of the element that will come first.
 *
 * @return The new position of the original first element. If the split is at
 * the start or end, the result is the opposite boundary.
 */
export function rotate<Range extends Array<any> | IForwardContainer<any>>(
  range: Range,
  middle: IForwardContainer.IteratorType<Range>,
): IForwardContainer.IteratorType<Range> {
  return base.rotate(begin(range), middle, end(range));
}

/**
 * Copy the elements from `middle` to the end, then copy the elements before
 * `middle` .
 *
 * @param range Input range to copy in rotated order.
 * @param middle Original position of the element that will come first.
 * @param output Iterator to the start of the destination.
 *
 * @return The iterator immediately after the last value written.
 */
export function rotate_copy<
  Range extends Array<any> | IForwardContainer<any>,
  OutputIterator extends Writeonly<
    IForwardIterator<IForwardContainer.ValueType<Range>, OutputIterator>
  >,
>(
  range: Range,
  middle: IForwardContainer.IteratorType<Range>,
  output: OutputIterator,
): OutputIterator {
  return base.rotate_copy(begin(range), middle, end(range), output);
}

/**
 * Randomly permute the range in place using `Math.random` .
 *
 * @param range Range modified in place.
 */
export function shuffle<Range extends Array<any> | IRandomAccessContainer<any>>(
  range: Range,
): void {
  return base.shuffle(begin(range), end(range));
}
