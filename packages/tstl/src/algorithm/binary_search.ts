//================================================================

/**
 * @packageDocumentation
 * @module std
 */
//================================================================
import { IPointer } from "../functional/IPointer";
import { less } from "../functional/comparators";
import { Comparator } from "../internal/functional/Comparator";
import { IForwardIterator } from "../iterator/IForwardIterator";
import { advance, distance } from "../iterator/global";
import { Pair } from "../utility/Pair";

/* =========================================================
    BINARY SEARCH
========================================================= */
/**
 * Find the first position where the sorted range's elements do not precede
 * `val` .
 *
 * @param first Start of the sorted range.
 * @param last Exclusive end of the sorted range.
 * @param val Value to look for.
 * @param comp Strict ordering predicate. Return `true` when the first argument
 * precedes the second. Defaults to {@link less} .
 *
 * @return The lower bound, or the end of the range.
 */
export function lower_bound<
  ForwardIterator extends Readonly<
    IForwardIterator<IPointer.ValueType<ForwardIterator>, ForwardIterator>
  >,
>(
  first: ForwardIterator,
  last: ForwardIterator,
  val: IPointer.ValueType<ForwardIterator>,
  comp: Comparator<IPointer.ValueType<ForwardIterator>> = less,
): ForwardIterator {
  let count: number = distance(first, last);

  while (count > 0) {
    const step: number = Math.floor(count / 2);
    const it: ForwardIterator = advance(first, step);

    if (comp(it.value, val)) {
      first = it.next();
      count -= step + 1;
    } else count = step;
  }
  return first;
}

/**
 * Find the first position where `val` precedes an element of the sorted range.
 *
 * @param first Start of the sorted range.
 * @param last Exclusive end of the sorted range.
 * @param val Value to look for.
 * @param comp Strict ordering predicate. Return `true` when the first argument
 * precedes the second. Defaults to {@link less} .
 *
 * @return The upper bound, or the end of the range.
 */
export function upper_bound<
  ForwardIterator extends Readonly<
    IForwardIterator<IPointer.ValueType<ForwardIterator>, ForwardIterator>
  >,
>(
  first: ForwardIterator,
  last: ForwardIterator,
  val: IPointer.ValueType<ForwardIterator>,
  comp: Comparator<IPointer.ValueType<ForwardIterator>> = less,
): ForwardIterator {
  let count: number = distance(first, last);

  while (count > 0) {
    const step: number = Math.floor(count / 2);
    const it: ForwardIterator = advance(first, step);

    if (!comp(val, it.value)) {
      first = it.next();
      count -= step + 1;
    } else count = step;
  }
  return first;
}

/**
 * Find the half-open subrange of a sorted range whose elements are equivalent
 * to `val` .
 *
 * @param first Start of the sorted range.
 * @param last Exclusive end of the sorted range.
 * @param val Value to look for.
 * @param comp Strict ordering predicate. Return `true` when the first argument
 * precedes the second. Defaults to {@link less} .
 *
 * @return The lower and upper bounds. They coincide when there is no
 * equivalent element.
 */
export function equal_range<
  ForwardIterator extends Readonly<
    IForwardIterator<IPointer.ValueType<ForwardIterator>, ForwardIterator>
  >,
>(
  first: ForwardIterator,
  last: ForwardIterator,
  val: IPointer.ValueType<ForwardIterator>,
  comp: Comparator<IPointer.ValueType<ForwardIterator>> = less,
): Pair<ForwardIterator, ForwardIterator> {
  first = lower_bound(first, last, val, comp);
  const second: ForwardIterator = upper_bound(first, last, val, comp);

  return new Pair(first, second);
}

/**
 * Test whether a sorted range contains an element equivalent to `val` .
 *
 * @param first Start of the sorted range.
 * @param last Exclusive end of the sorted range.
 * @param val Value to look for.
 * @param comp Strict ordering predicate. Return `true` when the first argument
 * precedes the second. Defaults to {@link less} .
 *
 * @return Whether an equivalent element exists.
 */
export function binary_search<
  ForwardIterator extends Readonly<
    IForwardIterator<IPointer.ValueType<ForwardIterator>, ForwardIterator>
  >,
>(
  first: ForwardIterator,
  last: ForwardIterator,
  val: IPointer.ValueType<ForwardIterator>,
  comp: Comparator<IPointer.ValueType<ForwardIterator>> = less,
): boolean {
  first = lower_bound(first, last, val, comp);

  return !first.equals(last) && !comp(val, first.value);
}
