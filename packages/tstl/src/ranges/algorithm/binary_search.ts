//================================================================

/**
 * @packageDocumentation
 * @module std.ranges
 */
//================================================================
import * as base from "../../algorithm/binary_search";
import { less } from "../../functional/comparators";
import { Comparator } from "../../internal/functional/Comparator";
import { begin, end } from "../../iterator/factory";
import { Pair } from "../../utility/Pair";
import { IForwardContainer } from "../container/IForwardContainer";

/* =========================================================
    BINARY SEARCH
========================================================= */
/**
 * Find the first position where the sorted range's elements do not precede
 * `val` .
 *
 * @param range Sorted input range.
 * @param val Value to look for.
 * @param comp Strict ordering predicate. Return `true` when the first argument
 * precedes the second. Defaults to {@link less} .
 *
 * @return The lower bound, or the end of the range.
 */
export function lower_bound<Range extends Array<any> | IForwardContainer<any>>(
  range: Range,
  val: IForwardContainer.ValueType<Range>,
  comp: Comparator<IForwardContainer.ValueType<Range>> = less,
): IForwardContainer.IteratorType<Range> {
  return base.lower_bound(begin(range), end(range), val, comp);
}

/**
 * Find the first position where `val` precedes an element of the sorted range.
 *
 * @param range Sorted input range.
 * @param val Value to look for.
 * @param comp Strict ordering predicate. Return `true` when the first argument
 * precedes the second. Defaults to {@link less} .
 *
 * @return The upper bound, or the end of the range.
 */
export function upper_bound<Range extends Array<any> | IForwardContainer<any>>(
  range: Range,
  val: IForwardContainer.ValueType<Range>,
  comp: Comparator<IForwardContainer.ValueType<Range>> = less,
): IForwardContainer.IteratorType<Range> {
  return base.upper_bound(begin(range), end(range), val, comp);
}

/**
 * Find the half-open subrange of a sorted range whose elements are equivalent
 * to `val` .
 *
 * @param range Sorted input range.
 * @param val Value to look for.
 * @param comp Strict ordering predicate. Return `true` when the first argument
 * precedes the second. Defaults to {@link less} .
 *
 * @return The lower and upper bounds. They coincide when there is no
 * equivalent element.
 */
export function equal_range<Range extends Array<any> | IForwardContainer<any>>(
  range: Range,
  val: IForwardContainer.ValueType<Range>,
  comp: Comparator<IForwardContainer.ValueType<Range>> = less,
): Pair<
  IForwardContainer.IteratorType<Range>,
  IForwardContainer.IteratorType<Range>
> {
  return base.equal_range(begin(range), end(range), val, comp);
}

/**
 * Test whether a sorted range contains an element equivalent to `val` .
 *
 * @param range Sorted input range.
 * @param val Value to look for.
 * @param comp Strict ordering predicate. Return `true` when the first argument
 * precedes the second. Defaults to {@link less} .
 *
 * @return Whether an equivalent element exists.
 */
export function binary_search<
  Range extends Array<any> | IForwardContainer<any>,
>(
  range: Range,
  val: IForwardContainer.ValueType<Range>,
  comp: Comparator<IForwardContainer.ValueType<Range>> = less,
): boolean {
  return base.binary_search(begin(range), end(range), val, comp);
}
