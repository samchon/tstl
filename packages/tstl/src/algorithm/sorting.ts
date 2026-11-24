//================================================================

/**
 * @packageDocumentation
 * @module std
 */
//================================================================
import { Vector } from "../container/Vector";
import { IPointer } from "../functional/IPointer";
import { less } from "../functional/comparators";
import { Comparator } from "../internal/functional/Comparator";
import { General } from "../internal/functional/General";
import { Temporary } from "../internal/functional/Temporary";
import { IForwardIterator } from "../iterator/IForwardIterator";
import { IRandomAccessIterator } from "../iterator/IRandomAccessIterator";
import { distance } from "../iterator/global";
import { make_heap, sort_heap } from "./heap";
import { copy, iter_swap } from "./modifiers";

/* =========================================================
    SORTINGS
        - SORT
        - INSPECTOR
        - BACKGROUND
============================================================
    SORT
--------------------------------------------------------- */
/**
 * Sort the range in place under `comp` . Equivalent elements can change
 * relative order. Uses `O(N log N)` comparisons for a range of `N` elements.
 *
 * @param first Start of the range.
 * @param last Exclusive end of the range.
 * @param comp Strict ordering predicate. Return `true` when the first argument
 * precedes the second. Defaults to {@link less} .
 */
export function sort<
  RandomAccessIterator extends General<
    IRandomAccessIterator<
      IPointer.ValueType<RandomAccessIterator>,
      RandomAccessIterator
    >
  >,
>(
  first: RandomAccessIterator,
  last: RandomAccessIterator,
  comp: Comparator<IPointer.ValueType<RandomAccessIterator>> = less,
): void {
  const length = distance(first, last);
  if (length < 2) return;

  _Intro_sort(
    first,
    last,
    length,
    2 * Math.floor(Math.log(length) / Math.LN2),
    comp,
  );
}

/**
 * Sort the range in place under `comp` , preserving the relative order of
 * equivalent elements.
 *
 * @param first Start of the range.
 * @param last Exclusive end of the range.
 * @param comp Strict ordering predicate. Return `true` when the first argument
 * precedes the second. Defaults to {@link less} .
 */
export function stable_sort<
  RandomAccessIterator extends General<
    IRandomAccessIterator<
      IPointer.ValueType<RandomAccessIterator>,
      RandomAccessIterator
    >
  >,
>(
  first: RandomAccessIterator,
  last: RandomAccessIterator,
  comp: Comparator<IPointer.ValueType<RandomAccessIterator>> = less,
): void {
  const entries: {
    value: IPointer.ValueType<RandomAccessIterator>;
    index: number;
  }[] = [];
  for (let it = first; !it.equals(last); it = it.next())
    entries.push({ value: it.value, index: entries.length });

  // Break ties by input position even on engines with an unstable Array.sort.
  entries.sort((x, y) => {
    const x_before_y = comp(x.value, y.value);
    const y_before_x = comp(y.value, x.value);
    if (x_before_y !== y_before_x) return x_before_y ? -1 : 1;
    return x.index - y.index;
  });

  for (const entry of entries) {
    first.value = entry.value;
    first = first.next();
  }
}

/**
 * Place the smallest elements in sorted order before `middle` . The remaining
 * elements have unspecified order.
 *
 * @param first Start of the range.
 * @param middle Exclusive end of the prefix to sort.
 * @param last Exclusive end of the range.
 * @param comp Strict ordering predicate. Return `true` when the first argument
 * precedes the second. Defaults to {@link less} .
 */
export function partial_sort<
  RandomAccessIterator extends General<
    IRandomAccessIterator<
      IPointer.ValueType<RandomAccessIterator>,
      RandomAccessIterator
    >
  >,
>(
  first: RandomAccessIterator,
  middle: RandomAccessIterator,
  last: RandomAccessIterator,
  comp: Comparator<IPointer.ValueType<RandomAccessIterator>> = less,
): void {
  for (let i = first; !i.equals(middle); i = i.next()) {
    let min: RandomAccessIterator = i;

    for (let j = i.next(); !j.equals(last); j = j.next())
      if (comp(j.value, min.value)) min = j;

    if (!i.equals(min)) iter_swap(i, min);
  }
}

/**
 * Write the smallest elements in sorted order until the output range is full
 * or the input is exhausted.
 *
 * @param first Start of the range.
 * @param last Exclusive end of the range.
 * @param output_first Start of the destination range.
 * @param output_last Exclusive end of the destination range.
 * @param comp Strict ordering predicate. Return `true` when the first argument
 * precedes the second. Defaults to {@link less} .
 *
 * @return The iterator immediately after the last value written.
 */
export function partial_sort_copy<
  InputIterator extends Readonly<
    IForwardIterator<IPointer.ValueType<InputIterator>, InputIterator>
  >,
  OutputIterator extends General<
    IForwardIterator<IPointer.ValueType<InputIterator>, OutputIterator>
  >,
>(
  first: InputIterator,
  last: InputIterator,
  output_first: OutputIterator,
  output_last: OutputIterator,
  comp: Comparator<IPointer.ValueType<InputIterator>> = less,
): OutputIterator {
  const input_size: number = distance(first, last);
  const result_size: number = distance(<Temporary>output_first, output_last);

  const vector: Vector<IPointer.ValueType<InputIterator>> = new Vector(
    first,
    last,
  );
  sort(vector.begin(), vector.end(), <Temporary>comp);

  if (input_size > result_size)
    output_first = copy(
      vector.begin(),
      vector.begin().advance(result_size),
      output_first,
    );
  else output_first = copy(vector.begin(), vector.end(), output_first);

  return output_first;
}

/**
 * Partition the range so that `nth` holds the element it would have after
 * sorting. No element after `nth` precedes an element before it. Passing the
 * end as `nth` leaves the range unchanged.
 *
 * @param first Start of the range.
 * @param nth Position to select. Use the end iterator to leave the range
 * unchanged.
 * @param last Exclusive end of the range.
 * @param comp Strict ordering predicate. Return `true` when the first argument
 * precedes the second. Defaults to {@link less} .
 */
export function nth_element<
  RandomAccessIterator extends General<
    IRandomAccessIterator<
      IPointer.ValueType<RandomAccessIterator>,
      RandomAccessIterator
    >
  >,
>(
  first: RandomAccessIterator,
  nth: RandomAccessIterator,
  last: RandomAccessIterator,
  comp: Comparator<IPointer.ValueType<RandomAccessIterator>> = less,
): void {
  if (nth.equals(last)) return;

  const target = distance(first, nth);
  let left = 0;
  let right = distance(first, last);
  let remaining_work = 4 * right;
  while (right - left > 1) {
    const length = right - left;
    remaining_work -= length;
    if (remaining_work < 0) {
      // Bound partitioning work when consecutive pivots shrink the range slowly.
      stable_sort(first.advance(left), first.advance(right), comp);
      return;
    }

    const [lower, upper] = _Partition(first, left, right, comp);
    if (target < lower) right = lower;
    else if (target >= upper) left = upper;
    else return;
  }
}

function _Intro_sort<
  Iterator extends General<
    IRandomAccessIterator<IPointer.ValueType<Iterator>, Iterator>
  >,
>(
  first: Iterator,
  last: Iterator,
  length: number,
  depth: number,
  comp: Comparator<IPointer.ValueType<Iterator>>,
): void {
  if (length < 2) return;
  if (depth === 0) {
    // Heap sort bounds the work even when consecutive pivots split unevenly.
    make_heap(first, last, comp);
    sort_heap(first, last, comp);
    return;
  }

  const [lower, upper] = _Partition(first, 0, length, comp);
  _Intro_sort(first, first.advance(lower), lower, depth - 1, comp);
  _Intro_sort(first.advance(upper), last, length - upper, depth - 1, comp);
}

function _Partition<
  Iterator extends General<
    IRandomAccessIterator<IPointer.ValueType<Iterator>, Iterator>
  >,
>(
  first: Iterator,
  left: number,
  right: number,
  comp: Comparator<IPointer.ValueType<Iterator>>,
): [number, number] {
  const pivot = first.advance(left + Math.floor((right - left) / 2)).value;
  let lower = left;
  let upper = right;
  let index = left;
  while (index < upper) {
    const current = first.advance(index);
    const value = current.value;
    const before = comp(value, pivot);
    const after = comp(pivot, value);
    // Preserve support for comparators that report equivalent elements in both directions.
    if (before === after) ++index;
    else if (before) {
      if (index !== lower) iter_swap(current, first.advance(lower));
      ++lower;
      ++index;
    } else {
      --upper;
      if (index !== upper) iter_swap(current, first.advance(upper));
    }
  }
  return [lower, upper];
}

/* ---------------------------------------------------------
    INSPECTOR
--------------------------------------------------------- */
/**
 * Test whether the range is in nondecreasing order under `comp` .
 *
 * @param first Start of the range.
 * @param last Exclusive end of the range.
 * @param comp Strict ordering predicate. Return `true` when the first argument
 * precedes the second. Defaults to {@link less} .
 *
 * @return Whether the entire range is sorted.
 */
export function is_sorted<
  InputIterator extends Readonly<
    IForwardIterator<IPointer.ValueType<InputIterator>, InputIterator>
  >,
>(
  first: InputIterator,
  last: InputIterator,
  comp: Comparator<IPointer.ValueType<InputIterator>> = less,
): boolean {
  return is_sorted_until(first, last, comp).equals(last);
}

/**
 * Find the end of the longest sorted prefix under `comp` .
 *
 * @param first Start of the range.
 * @param last Exclusive end of the range.
 * @param comp Strict ordering predicate. Return `true` when the first argument
 * precedes the second. Defaults to {@link less} .
 *
 * @return The first iterator out of order, or the end of the range if it is
 * sorted.
 */
export function is_sorted_until<
  InputIterator extends Readonly<
    IForwardIterator<IPointer.ValueType<InputIterator>, InputIterator>
  >,
>(
  first: InputIterator,
  last: InputIterator,
  comp: Comparator<IPointer.ValueType<InputIterator>> = less,
): InputIterator {
  if (first.equals(last)) return last;

  for (let next = first.next(); !next.equals(last); next = next.next())
    if (comp(next.value, first.value)) return next;
    else first = first.next();

  return last;
}
