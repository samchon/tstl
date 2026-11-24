//================================================================

/**
 * @packageDocumentation
 * @module std
 */
//================================================================
import { IPointer } from "../functional/IPointer";
import { equal_to, less } from "../functional/comparators";
import { Comparator } from "../internal/functional/Comparator";
import { General } from "../internal/functional/General";
import { Temporary } from "../internal/functional/Temporary";
import { IBidirectionalIterator } from "../iterator/IBidirectionalIterator";
import { IForwardIterator } from "../iterator/IForwardIterator";
import { advance, distance } from "../iterator/global";
import { Pair } from "../utility/Pair";
import { count_if, find_if, mismatch } from "./iterations";
import { iter_swap, reverse } from "./modifiers";

/* =========================================================
    MATHMATICS
        - MIN & MAX
        - PERMUTATION
============================================================
    MIN & MAX
--------------------------------------------------------- */
/**
 * Find the first minimum in a nonempty array under `comp` .
 *
 * @param items Items to search through.
 * @param comp Strict ordering predicate. Return `true` when the first argument
 * precedes the second. Defaults to {@link less} .
 *
 * @return The minimum value.
 */
export function min<T>(items: T[], comp: Comparator<T> = less): T {
  let minimum: T = items[0];

  for (let i: number = 1; i < items.length; ++i)
    if (comp(items[i], minimum)) minimum = items[i];

  return minimum;
}

/**
 * Find the first maximum in a nonempty array under `comp` .
 *
 * @param items Items to search through.
 * @param comp Strict ordering predicate. Return `true` when the first argument
 * precedes the second. Defaults to {@link less} .
 *
 * @return The maximum value.
 */
export function max<T>(items: T[], comp: Comparator<T> = less): T {
  let maximum: T = items[0];

  for (let i: number = 1; i < items.length; ++i)
    if (comp(maximum, items[i])) maximum = items[i];

  return maximum;
}

/**
 * Find the first minimum and first maximum in a nonempty array under `comp` .
 *
 * @param items Items to search through.
 * @param comp Strict ordering predicate. Return `true` when the first argument
 * precedes the second. Defaults to {@link less} .
 *
 * @return A {@link Pair} of minimum & maximum values.
 */
export function minmax<T>(items: T[], comp: Comparator<T> = less): Pair<T, T> {
  let minimum: T = items[0];
  let maximum: T = items[0];

  for (let i: number = 1; i < items.length; ++i) {
    if (comp(items[i], minimum)) minimum = items[i];
    if (comp(maximum, items[i])) maximum = items[i];
  }
  return new Pair(minimum, maximum);
}

/**
 * Find the first minimum element according to `comp` .
 *
 * @param first Start of the range.
 * @param last Exclusive end of the range.
 * @param comp Strict ordering predicate. Return `true` when the first argument
 * precedes the second. Defaults to {@link less} .
 *
 * @return The first minimum, or the end of the range if it is empty.
 */
export function min_element<
  ForwardIterator extends Readonly<
    IForwardIterator<IPointer.ValueType<ForwardIterator>, ForwardIterator>
  >,
>(
  first: ForwardIterator,
  last: ForwardIterator,
  comp: Comparator<IPointer.ValueType<ForwardIterator>> = less,
): ForwardIterator {
  if (first.equals(last)) return last;

  let smallest: ForwardIterator = first;
  first = first.next();

  for (; !first.equals(last); first = first.next())
    if (comp(first.value, smallest.value)) smallest = first;

  return smallest;
}

/**
 * Find the first maximum element according to `comp` .
 *
 * @param first Start of the range.
 * @param last Exclusive end of the range.
 * @param comp Strict ordering predicate. Return `true` when the first argument
 * precedes the second. Defaults to {@link less} .
 *
 * @return The first maximum, or the end of the range if it is empty.
 */
export function max_element<
  ForwardIterator extends Readonly<
    IForwardIterator<IPointer.ValueType<ForwardIterator>, ForwardIterator>
  >,
>(
  first: ForwardIterator,
  last: ForwardIterator,
  comp: Comparator<IPointer.ValueType<ForwardIterator>> = less,
): ForwardIterator {
  if (first.equals(last)) return last;

  let largest: ForwardIterator = first;
  first = first.next();

  for (; !first.equals(last); first = first.next())
    if (comp(largest.value, first.value)) largest = first;

  return largest;
}

/**
 * Find the first minimum and the last maximum according to `comp` .
 *
 * @param first Start of the range.
 * @param last Exclusive end of the range.
 * @param comp Strict ordering predicate. Return `true` when the first argument
 * precedes the second. Defaults to {@link less} .
 *
 * @return A pair of iterators. Both equal the end of the range when it is
 * empty.
 */
export function minmax_element<
  ForwardIterator extends Readonly<
    IForwardIterator<IPointer.ValueType<ForwardIterator>, ForwardIterator>
  >,
>(
  first: ForwardIterator,
  last: ForwardIterator,
  comp: Comparator<IPointer.ValueType<ForwardIterator>> = less,
): Pair<ForwardIterator, ForwardIterator> {
  if (first.equals(last)) return new Pair(last, last);

  let smallest: ForwardIterator = first;
  let largest: ForwardIterator = first;

  let it = first.next();
  if (!it.equals(last)) {
    if (comp(it.value, first.value)) smallest = it;
    else largest = it;
    it = it.next();
  }
  while (!it.equals(last)) {
    let low = it;
    let high = it;
    it = it.next();
    if (!it.equals(last)) {
      if (comp(it.value, low.value)) low = it;
      else high = it;
      it = it.next();
    }
    if (comp(low.value, smallest.value)) smallest = low;
    if (!comp(high.value, largest.value)) largest = high;
  }
  return new Pair(smallest, largest);
}

/**
 * Bound `v` to the inclusive interval from `lo` to `hi` under `comp` . The
 * upper bound must not precede the lower bound.
 *
 * @param v The value to clamp.
 * @param lo Lower value than *hi*.
 * @param hi Higher value than *lo*.
 * @param comp Strict ordering predicate. Return `true` when the first argument
 * precedes the second. Defaults to {@link less} .
 *
 * @return `lo` when `v` precedes it, `hi` when `v` follows it, or `v`
 * otherwise.
 */
export function clamp<T>(v: T, lo: T, hi: T, comp: Comparator<T> = less): T {
  return comp(v, lo) ? lo : comp(hi, v) ? hi : v;
}

/* ---------------------------------------------------------
    PERMUATATIONS
--------------------------------------------------------- */
/**
 * Test whether the compared elements can be reordered to match, including
 * duplicates.
 *
 * @param first1 Start of the first range.
 * @param last1 Exclusive end of the first range.
 * @param first2 Start of the second range, which must contain at least as many
 * elements as the first.
 * @param pred Predicate for equivalence. Defaults to {@link equal_to} .
 *
 * @return Whether the ranges are permutations of each other.
 */
export function is_permutation<
  ForwardIterator1 extends Readonly<
    IForwardIterator<IPointer.ValueType<ForwardIterator1>, ForwardIterator1>
  >,
  ForwardIterator2 extends Readonly<
    IForwardIterator<IPointer.ValueType<ForwardIterator1>, ForwardIterator2>
  >,
>(
  first1: ForwardIterator1,
  last1: ForwardIterator1,
  first2: ForwardIterator2,
  pred: Comparator<IPointer.ValueType<ForwardIterator1>> = equal_to,
): boolean {
  // find the mismatched
  const pair: Pair<ForwardIterator1, ForwardIterator2> = <Temporary>(
    mismatch(first1, last1, <Temporary>first2, pred)
  );
  first1 = pair.first;
  first2 = pair.second;

  if (first1.equals(last1)) return true;

  const last2: ForwardIterator2 = advance(
    <Temporary>first2,
    distance(first1, last1),
  ) as ForwardIterator2;

  for (let it = first1; !it.equals(last1); it = it.next()) {
    const lambda = (val: IPointer.ValueType<ForwardIterator1>) =>
      pred(val, it.value);

    if (find_if(first1, it, lambda).equals(it)) {
      const n: number = count_if(<Temporary>first2, <Temporary>last2, lambda);
      if (n === 0 || count_if(it, last1, lambda) !== n) return false;
    }
  }
  return true;
}

/**
 * Rearrange the range into the previous lexicographic permutation. Wrap around
 * to the largest permutation when there is no previous one.
 *
 * @param first Start of the range.
 * @param last Exclusive end of the range.
 * @param comp Strict ordering predicate. Return `true` when the first argument
 * precedes the second. Defaults to {@link less} .
 *
 * @return Whether a previous permutation existed.
 */
export function prev_permutation<
  BidirectionalIterator extends General<
    IBidirectionalIterator<
      IPointer.ValueType<BidirectionalIterator>,
      BidirectionalIterator
    >
  >,
>(
  first: BidirectionalIterator,
  last: BidirectionalIterator,
  comp: Comparator<IPointer.ValueType<BidirectionalIterator>> = less,
): boolean {
  if (first.equals(last) === true) return false;

  let previous: BidirectionalIterator = last.prev();
  if (first.equals(previous) === true) return false;

  while (true) {
    let x: BidirectionalIterator = previous;
    previous = previous.prev();

    if (comp(x.value, previous.value) === true) {
      let y: BidirectionalIterator = last.prev();
      while (comp(y.value, previous.value) === false) y = y.prev();

      iter_swap(previous, y);
      reverse(x, last);
      return true;
    }

    if (previous.equals(first) === true) {
      reverse(first, last);
      return false;
    }
  }
}

/**
 * Rearrange the range into the next lexicographic permutation. Wrap around to
 * the smallest permutation when there is no next one.
 *
 * @param first Start of the range.
 * @param last Exclusive end of the range.
 * @param comp Strict ordering predicate. Return `true` when the first argument
 * precedes the second. Defaults to {@link less} .
 *
 * @return Whether a next permutation existed.
 */
export function next_permutation<
  BidirectionalIterator extends General<
    IBidirectionalIterator<
      IPointer.ValueType<BidirectionalIterator>,
      BidirectionalIterator
    >
  >,
>(
  first: BidirectionalIterator,
  last: BidirectionalIterator,
  comp: Comparator<IPointer.ValueType<BidirectionalIterator>> = less,
): boolean {
  if (first.equals(last) === true) return false;

  let previous: BidirectionalIterator = last.prev();
  if (first.equals(previous) === true) return false;

  while (true) {
    const x: BidirectionalIterator = previous;
    previous = previous.prev();

    if (comp(previous.value, x.value) === true) {
      let y: BidirectionalIterator = last.prev();
      while (comp(previous.value, y.value) === false) y = y.prev();

      iter_swap(previous, y);
      reverse(x, last);
      return true;
    }

    if (previous.equals(first) === true) {
      reverse(first, last);
      return false;
    }
  }
}
