//================================================================

/**
 * @packageDocumentation
 * @module std.ranges
 */
//================================================================
import * as base from "../../algorithm/iterations";
import { equal_to, less } from "../../functional/comparators";
import { BinaryPredicator } from "../../internal/functional/BinaryPredicator";
import { Comparator } from "../../internal/functional/Comparator";
import { Temporary } from "../../internal/functional/Temporary";
import { UnaryPredicator } from "../../internal/functional/UnaryPredicator";
import { begin, end } from "../../iterator/factory";
import { size } from "../../iterator/global";
import { Pair } from "../../utility/Pair";
import { IForwardContainer } from "../container/IForwardContainer";

type BinaryPredicatorInferrer<
  Range1 extends Array<any> | IForwardContainer<any>,
  Range2 extends Array<any> | IForwardContainer<any>,
> = BinaryPredicator<
  IForwardContainer.ValueType<Range1>,
  IForwardContainer.ValueType<Range2>
>;

/* ---------------------------------------------------------
    FOR_EACH
--------------------------------------------------------- */
/**
 * Invoke `fn` for each element in traversal order.
 *
 * @param range Input range.
 * @param fn Function invoked for each element.
 *
 * @return The function that was applied.
 */
export function for_each<
  Range extends Array<any> | IForwardContainer<any>,
  Func extends (val: IForwardContainer.ValueType<Range>) => any,
>(range: Range, fn: Func): Func {
  return base.for_each(begin(range), end(range), fn);
}

/**
 * Invoke `fn` for the first `n` elements starting at `first` , in traversal
 * order.
 *
 * @param range Input range.
 * @param n Steps to maximum advance.
 * @param fn Function invoked for each element.
 *
 * @return The iterator immediately after the visited elements.
 */
export function for_each_n<
  Range extends Array<any> | IForwardContainer<any>,
  Func extends (val: IForwardContainer.ValueType<Range>) => any,
>(range: Range, n: number, fn: Func): IForwardContainer.IteratorType<Range> {
  return base.for_each_n(begin(range), n, fn);
}

/* ---------------------------------------------------------
    AGGREGATE CONDITIONS
--------------------------------------------------------- */
/**
 * Test whether every element satisfies `pred` . An empty range satisfies this
 * condition.
 *
 * @param range Input range.
 * @param pred Predicate to test each element.
 *
 * @return Whether every element satisfies the predicate.
 */
export function all_of<Range extends Array<any> | IForwardContainer<any>>(
  range: Range,
  pred: UnaryPredicator<IForwardContainer.ValueType<Range>>,
): boolean {
  return base.all_of(begin(range), end(range), pred);
}

/**
 * Test whether at least one element satisfies `pred` .
 *
 * @param range Input range.
 * @param pred Predicate to test each element.
 *
 * @return Whether any element satisfies the predicate.
 */
export function any_of<Range extends Array<any> | IForwardContainer<any>>(
  range: Range,
  pred: UnaryPredicator<IForwardContainer.ValueType<Range>>,
): boolean {
  return base.any_of(begin(range), end(range), pred);
}

/**
 * Test whether no element satisfies `pred` . An empty range satisfies this
 * condition.
 *
 * @param range Input range.
 * @param pred Predicate to test each element.
 *
 * @return Whether no element satisfies the predicate.
 */
export function none_of<Range extends Array<any> | IForwardContainer<any>>(
  range: Range,
  pred: UnaryPredicator<IForwardContainer.ValueType<Range>>,
): boolean {
  return base.none_of(begin(range), end(range), pred);
}

/**
 * Compare corresponding elements in traversal order. Both ranges must have the
 * same size to compare equal.
 *
 * @param range1 First input range.
 * @param range2 Second input range.
 *
 * @return Whether both ranges have the same size and all corresponding
 * elements match.
 */
export function equal<
  Range1 extends Array<any> | IForwardContainer<any>,
  Range2 extends IForwardContainer.SimilarType<Range1>,
>(range1: Range1, range2: Range2): boolean;

/**
 * Compare corresponding elements in traversal order. Both ranges must have the
 * same size to compare equal.
 *
 * @param range1 First input range.
 * @param range2 Second input range.
 * @param pred Predicate for equivalence.
 *
 * @return Whether both ranges have the same size and all corresponding
 * elements match.
 */
export function equal<
  Range1 extends Array<any> | IForwardContainer<any>,
  Range2 extends Array<any> | IForwardContainer<any>,
>(
  range1: Range1,
  range2: Range2,
  pred: BinaryPredicatorInferrer<Range1, Range2>,
): boolean;

export function equal<
  Range1 extends Array<any> | IForwardContainer<any>,
  Range2 extends Array<any> | IForwardContainer<any>,
>(
  range1: Range1,
  range2: Range2,
  pred: BinaryPredicatorInferrer<Range1, Range2> = <any>equal_to,
): boolean {
  if (size(range1) !== size(range2)) return false;
  else return base.equal(begin(range1), end(range1), begin(range2), pred);
}

/**
 * Compare two ranges lexicographically. A proper prefix precedes the longer
 * range.
 *
 * @param range1 First input range.
 * @param range2 Second input range.
 * @param comp Strict ordering predicate. Return `true` when the first argument
 * precedes the second. Defaults to {@link less} .
 *
 * @return Whether the first range precedes the second.
 */
export function lexicographical_compare<
  Range1 extends Array<any> | IForwardContainer<any>,
  Range2 extends IForwardContainer.SimilarType<Range1>,
>(
  range1: Range1,
  range2: Range2,
  comp: BinaryPredicatorInferrer<Range1, Range1> = less,
): boolean {
  return base.lexicographical_compare(
    begin(range1),
    end(range1),
    <Temporary>begin(range2),
    end(range2),
    comp,
  );
}

/* ---------------------------------------------------------
    FINDERS
--------------------------------------------------------- */
/**
 * Find the first occurrence of `val` .
 *
 * @param range Range to search.
 * @param val Value to look for.
 *
 * @return The first matching iterator, or the end of the range.
 */
export function find<Range extends Array<any> | IForwardContainer<any>>(
  range: Range,
  val: IForwardContainer.ValueType<Range>,
): IForwardContainer.IteratorType<Range> {
  return base.find(begin(range), end(range), val);
}

/**
 * Find the first element that satisfies `pred` .
 *
 * @param range Range to search.
 * @param pred Predicate to test each element.
 *
 * @return The first matching iterator, or the end of the range.
 */
export function find_if<Range extends Array<any> | IForwardContainer<any>>(
  range: Range,
  pred: UnaryPredicator<IForwardContainer.ValueType<Range>>,
): IForwardContainer.IteratorType<Range> {
  return base.find_if(begin(range), end(range), pred);
}

/**
 * Find the first element that fails `pred` .
 *
 * @param range Range to search.
 * @param pred Predicate to test each element.
 *
 * @return The first matching iterator, or the end of the range.
 */
export function find_if_not<Range extends Array<any> | IForwardContainer<any>>(
  range: Range,
  pred: UnaryPredicator<IForwardContainer.ValueType<Range>>,
): IForwardContainer.IteratorType<Range> {
  return base.find_if_not(begin(range), end(range), pred);
}

/**
 * Find the last contiguous occurrence of the second range in the first range.
 *
 * @param range1 First input range.
 * @param range2 Second input range.
 *
 * @return The start of the last match, or the end of the first range if no
 * match exists.
 */
export function find_end<
  Range1 extends Array<any> | IForwardContainer<any>,
  Range2 extends IForwardContainer.SimilarType<Range1>,
>(range1: Range1, range2: Range2): IForwardContainer.IteratorType<Range1>;

/**
 * Find the last contiguous occurrence of the second range in the first range.
 *
 * @param range1 First input range.
 * @param range2 Second input range.
 * @param pred Predicate for equivalence.
 *
 * @return The start of the last match, or the end of the first range if no
 * match exists.
 */
export function find_end<
  Range1 extends Array<any> | IForwardContainer<any>,
  Range2 extends Array<any> | IForwardContainer<any>,
>(
  range1: Range1,
  range2: Range2,
  pred: BinaryPredicatorInferrer<Range1, Range2>,
): IForwardContainer.IteratorType<Range1>;

export function find_end<
  Range1 extends Array<any> | IForwardContainer<any>,
  Range2 extends Array<any> | IForwardContainer<any>,
>(
  range1: Range1,
  range2: Range2,
  pred: BinaryPredicatorInferrer<Range1, Range2> = <any>equal_to,
): IForwardContainer.IteratorType<Range1> {
  return base.find_end(
    begin(range1),
    end(range1),
    begin(range2),
    end(range2),
    pred,
  );
}

/**
 * Find the first element of the first range that matches any element of the
 * second range.
 *
 * @param range1 First input range.
 * @param range2 Second input range.
 *
 * @return The first matching iterator, or the end of the first range.
 */
export function find_first_of<
  Range1 extends Array<any> | IForwardContainer<any>,
  Range2 extends IForwardContainer.SimilarType<Range1>,
>(range1: Range1, range2: Range2): IForwardContainer.IteratorType<Range1>;

/**
 * Find the first element of the first range that matches any element of the
 * second range.
 *
 * @param range1 First input range.
 * @param range2 Second input range.
 * @param pred Predicate for equivalence.
 *
 * @return The first matching iterator, or the end of the first range.
 */
export function find_first_of<
  Range1 extends Array<any> | IForwardContainer<any>,
  Range2 extends Array<any> | IForwardContainer<any>,
>(
  range1: Range1,
  range2: Range2,
  pred: BinaryPredicatorInferrer<Range1, Range2>,
): IForwardContainer.IteratorType<Range1>;

export function find_first_of<
  Range1 extends Array<any> | IForwardContainer<any>,
  Range2 extends Array<any> | IForwardContainer<any>,
>(
  range1: Range1,
  range2: Range2,
  pred: BinaryPredicatorInferrer<Range1, Range2> = <any>equal_to,
): IForwardContainer.IteratorType<Range1> {
  return base.find_first_of(
    begin(range1),
    end(range1),
    begin(range2),
    end(range2),
    pred,
  );
}

/**
 * Find the first adjacent pair that satisfies `pred` .
 *
 * @param range Range to search.
 * @param pred Predicate for equivalence. Defaults to {@link equal_to} .
 *
 * @return The first iterator in the matching pair, or the end of the range.
 */
export function adjacent_find<
  Range extends Array<any> | IForwardContainer<any>,
>(
  range: Range,
  pred: Comparator<IForwardContainer.ValueType<Range>> = equal_to,
): IForwardContainer.IteratorType<Range> {
  return base.adjacent_find(begin(range), end(range), pred);
}

/**
 * Find the first contiguous occurrence of the second range in the first range.
 *
 * @param range1 First input range.
 * @param range2 Second input range.
 *
 * @return The start of the match, or the end of the first range if no match
 * exists.
 */
export function search<
  Range1 extends Array<any> | IForwardContainer<any>,
  Range2 extends Array<any> | IForwardContainer.SimilarType<Range1>,
>(range1: Range1, range2: Range2): IForwardContainer.IteratorType<Range1>;

/**
 * Find the first contiguous occurrence of the second range in the first range.
 *
 * @param range1 First input range.
 * @param range2 Second input range.
 * @param pred Predicate for equivalence.
 *
 * @return The start of the match, or the end of the first range if no match
 * exists.
 */
export function search<
  Range1 extends Array<any> | IForwardContainer<any>,
  Range2 extends Array<any> | IForwardContainer<any>,
>(
  range1: Range1,
  range2: Range2,
  pred: BinaryPredicatorInferrer<Range1, Range2>,
): IForwardContainer.IteratorType<Range1>;

export function search<
  Range1 extends Array<any> | IForwardContainer<any>,
  Range2 extends Array<any> | IForwardContainer<any>,
>(
  range1: Range1,
  range2: Range2,
  pred: BinaryPredicatorInferrer<Range1, Range2> = <any>equal_to,
): IForwardContainer.IteratorType<Range1> {
  return base.search(
    begin(range1),
    end(range1),
    begin(range2),
    end(range2),
    pred,
  );
}

/**
 * Find the first run of `count` consecutive elements that match `val` .
 *
 * @param range Range to search.
 * @param count Length of the requested run.
 * @param val Value to look for.
 * @param pred Predicate for equivalence. Defaults to {@link equal_to} .
 *
 * @return The first iterator for a nonpositive count, the start of the run
 * when found, or the end of the range.
 */
export function search_n<Range extends Array<any> | IForwardContainer<any>>(
  range: Range,
  count: number,
  val: IForwardContainer.ValueType<Range>,
  pred: Comparator<IForwardContainer.ValueType<Range>> = equal_to,
): IForwardContainer.IteratorType<Range> {
  return base.search_n(begin(range), end(range), count, val, pred);
}

/**
 * Find the first pair of corresponding elements that fails the equality test.
 *
 * @param range1 First input range.
 * @param range2 Second input range.
 *
 * @return A pair at the first mismatch, or both current positions when either
 * range ends.
 */
export function mismatch<
  Range1 extends Array<any> | IForwardContainer<any>,
  Range2 extends Array<any> | IForwardContainer.SimilarType<Range1>,
>(
  range1: Range1,
  range2: Range2,
): Pair<
  IForwardContainer.IteratorType<Range1>,
  IForwardContainer.IteratorType<Range2>
>;

/**
 * Find the first pair of corresponding elements that fails the equality test.
 *
 * @param range1 First input range.
 * @param range2 Second input range.
 * @param pred Predicate for equivalence.
 *
 * @return A pair at the first mismatch, or both current positions when either
 * range ends.
 */
export function mismatch<
  Range1 extends Array<any> | IForwardContainer<any>,
  Range2 extends Array<any> | IForwardContainer<any>,
>(
  range1: Range1,
  range2: Range2,
  pred: BinaryPredicatorInferrer<Range1, Range2>,
): Pair<
  IForwardContainer.IteratorType<Range1>,
  IForwardContainer.IteratorType<Range2>
>;

export function mismatch<
  Range1 extends Array<any> | IForwardContainer<any>,
  Range2 extends Array<any> | IForwardContainer<any>,
>(
  range1: Range1,
  range2: Range2,
  pred: BinaryPredicatorInferrer<Range1, Range2> = <any>equal_to,
): Pair<
  IForwardContainer.IteratorType<Range1>,
  IForwardContainer.IteratorType<Range2>
> {
  if (size(range1) === size(range2))
    return base.mismatch(begin(range1), end(range1), begin(range2), pred);

  const limit: number = Math.min(size(range1), size(range2));
  let x: IForwardContainer.IteratorType<Range1> = begin(range1);
  let y: IForwardContainer.IteratorType<Range2> = begin(range2);

  for (let i: number = 0; i < limit; ++i) {
    if (pred(x.value, y.value) === false) break;

    x = x.next();
    y = y.next();
  }
  return new Pair(x, y);
}

/* ---------------------------------------------------------
    COUNTERS
--------------------------------------------------------- */
/**
 * Count the elements equal to `val` .
 *
 * @param range Input range.
 * @param val The value to count.
 *
 * @return The number of matching elements.
 */
export function count<Range extends Array<any> | IForwardContainer<any>>(
  range: Range,
  val: IForwardContainer.ValueType<Range>,
): number {
  return base.count(begin(range), end(range), val);
}

/**
 * Count the elements that satisfy `pred` .
 *
 * @param range Input range.
 * @param pred Predicate to test each element.
 *
 * @return The number of matching elements.
 */
export function count_if<Range extends Array<any> | IForwardContainer<any>>(
  range: Range,
  pred: UnaryPredicator<IForwardContainer.ValueType<Range>>,
): number {
  return base.count_if(begin(range), end(range), pred);
}
