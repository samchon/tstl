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
import { Writeonly } from "../internal/functional/Writeonly";
import { IBidirectionalIterator } from "../iterator/IBidirectionalIterator";
import { IForwardIterator } from "../iterator/IForwardIterator";
import { back_inserter } from "../iterator/factory";
import { copy } from "./modifiers";

/* =========================================================
    MERGE & SET OPERATIONS
        - MERGE
        - SET OPERATION
============================================================
    MERGE
--------------------------------------------------------- */
/**
 * Stably merge two sorted ranges into an output range. Equivalent elements
 * from the first range precede those from the second. The destination must not
 * overlap either input range.
 *
 * @param first1 Start of the first sorted range.
 * @param last1 Exclusive end of the first sorted range.
 * @param first2 Start of the second sorted range.
 * @param last2 Exclusive end of the second sorted range.
 * @param output Iterator to the start of the destination.
 * @param comp Strict ordering predicate. Return `true` when the first argument
 * precedes the second. Defaults to {@link less}.
 *
 * @return The iterator immediately after the last value written.
 */
export function merge<
  InputIterator1 extends Readonly<
    IForwardIterator<IPointer.ValueType<InputIterator1>, InputIterator1>
  >,
  InputIterator2 extends Readonly<
    IForwardIterator<IPointer.ValueType<InputIterator1>, InputIterator2>
  >,
  OutputIterator extends Writeonly<
    IForwardIterator<IPointer.ValueType<InputIterator1>, OutputIterator>
  >,
>(
  first1: InputIterator1,
  last1: InputIterator1,
  first2: InputIterator2,
  last2: InputIterator2,
  output: OutputIterator,
  comp: Comparator<IPointer.ValueType<InputIterator1>> = less,
): OutputIterator {
  while (true) {
    if (first1.equals(last1)) return copy(<Temporary>first2, last2, output);
    else if (first2.equals(last2)) return copy(first1, last1, output);

    if (!comp(first2.value, first1.value)) {
      output.value = first1.value;
      first1 = first1.next();
    } else {
      output.value = first2.value;
      first2 = first2.next();
    }
    output = output.next();
  }
}

/**
 * Stably merge the sorted ranges `[first, middle)` and `[middle, last)` in
 * place.
 *
 * @param first Start of the range.
 * @param middle Start of the second sorted range.
 * @param last Exclusive end of the range.
 * @param comp Strict ordering predicate. Return `true` when the first argument
 * precedes the second. Defaults to {@link less}.
 */
export function inplace_merge<
  BidirectionalIterator extends General<
    IBidirectionalIterator<
      IPointer.ValueType<BidirectionalIterator>,
      BidirectionalIterator
    >
  >,
>(
  first: BidirectionalIterator,
  middle: BidirectionalIterator,
  last: BidirectionalIterator,
  comp: Comparator<IPointer.ValueType<BidirectionalIterator>> = less,
): void {
  const vector: Vector<IPointer.ValueType<BidirectionalIterator>> =
    new Vector();
  merge(first, middle, middle, last, back_inserter(vector), comp);

  copy(vector.begin(), vector.end(), first);
}

/* ---------------------------------------------------------
    SET OPERATIONS
--------------------------------------------------------- */
/**
 * Check whether the first sorted range contains the elements of the second,
 * accounting for repetitions.
 *
 * @param first1 Start of the first sorted range.
 * @param last1 Exclusive end of the first sorted range.
 * @param first2 Start of the second sorted range.
 * @param last2 Exclusive end of the second sorted range.
 * @param comp Strict ordering predicate. Return `true` when the first argument
 * precedes the second. Defaults to {@link less}.
 *
 * @return Whether the first range contains each value at least as many times
 * as the second.
 */
export function includes<
  InputIterator1 extends Readonly<
    IForwardIterator<IPointer.ValueType<InputIterator1>, InputIterator1>
  >,
  InputIterator2 extends Readonly<
    IForwardIterator<IPointer.ValueType<InputIterator1>, InputIterator2>
  >,
>(
  first1: InputIterator1,
  last1: InputIterator1,
  first2: InputIterator2,
  last2: InputIterator2,
  comp: Comparator<IPointer.ValueType<InputIterator1>> = less,
): boolean {
  while (!first2.equals(last2)) {
    if (first1.equals(last1) || comp(first2.value, first1.value)) return false;
    else if (!comp(first1.value, first2.value)) first2 = first2.next();

    first1 = first1.next();
  }

  return true;
}

/**
 * Write the union of two sorted ranges. For each equivalent value, write the
 * greater of its two multiplicities.
 *
 * @param first1 Start of the first sorted range.
 * @param last1 Exclusive end of the first sorted range.
 * @param first2 Start of the second sorted range.
 * @param last2 Exclusive end of the second sorted range.
 * @param output Iterator to the start of the destination.
 * @param comp Strict ordering predicate. Return `true` when the first argument
 * precedes the second. Defaults to {@link less}.
 *
 * @return The iterator immediately after the last value written.
 */
export function set_union<
  InputIterator1 extends Readonly<
    IForwardIterator<IPointer.ValueType<InputIterator1>, InputIterator1>
  >,
  InputIterator2 extends Readonly<
    IForwardIterator<IPointer.ValueType<InputIterator1>, InputIterator2>
  >,
  OutputIterator extends Writeonly<
    IForwardIterator<IPointer.ValueType<InputIterator1>, OutputIterator>
  >,
>(
  first1: InputIterator1,
  last1: InputIterator1,
  first2: InputIterator2,
  last2: InputIterator2,
  output: OutputIterator,
  comp: Comparator<IPointer.ValueType<InputIterator1>> = less,
): OutputIterator {
  while (true) {
    if (first1.equals(last1)) return copy(<Temporary>first2, last2, output);
    else if (first2.equals(last2)) return copy(first1, last1, output);

    if (comp(first1.value, first2.value)) {
      output.value = first1.value;
      first1 = first1.next();
    } else if (comp(first2.value, first1.value)) {
      output.value = first2.value;
      first2 = first2.next();
    } else {
      // equals
      output.value = first1.value;

      first1 = first1.next();
      first2 = first2.next();
    }

    output = output.next();
  }
}

/**
 * Write the intersection of two sorted ranges. For each equivalent value,
 * write the smaller of its two multiplicities.
 *
 * @param first1 Start of the first sorted range.
 * @param last1 Exclusive end of the first sorted range.
 * @param first2 Start of the second sorted range.
 * @param last2 Exclusive end of the second sorted range.
 * @param output Iterator to the start of the destination.
 * @param comp Strict ordering predicate. Return `true` when the first argument
 * precedes the second. Defaults to {@link less}.
 *
 * @return The iterator immediately after the last value written.
 */
export function set_intersection<
  InputIterator1 extends Readonly<
    IForwardIterator<IPointer.ValueType<InputIterator1>, InputIterator1>
  >,
  InputIterator2 extends Readonly<
    IForwardIterator<IPointer.ValueType<InputIterator1>, InputIterator2>
  >,
  OutputIterator extends Writeonly<
    IForwardIterator<IPointer.ValueType<InputIterator1>, OutputIterator>
  >,
>(
  first1: InputIterator1,
  last1: InputIterator1,
  first2: InputIterator2,
  last2: InputIterator2,
  output: OutputIterator,
  comp: Comparator<IPointer.ValueType<InputIterator1>> = less,
): OutputIterator {
  while (!first1.equals(last1) && !first2.equals(last2))
    if (comp(first1.value, first2.value)) first1 = first1.next();
    else if (comp(first2.value, first1.value)) first2 = first2.next();
    else {
      output.value = first1.value;

      output = output.next();
      first1 = first1.next();
      first2 = first2.next();
    }
  return output;
}

/**
 * Write the elements of the first sorted range left after removing one match
 * for each equivalent element in the second.
 *
 * @param first1 Start of the first sorted range.
 * @param last1 Exclusive end of the first sorted range.
 * @param first2 Start of the second sorted range.
 * @param last2 Exclusive end of the second sorted range.
 * @param output Iterator to the start of the destination.
 * @param comp Strict ordering predicate. Return `true` when the first argument
 * precedes the second. Defaults to {@link less}.
 *
 * @return The iterator immediately after the last value written.
 */
export function set_difference<
  InputIterator1 extends Readonly<
    IForwardIterator<IPointer.ValueType<InputIterator1>, InputIterator1>
  >,
  InputIterator2 extends Readonly<
    IForwardIterator<IPointer.ValueType<InputIterator1>, InputIterator2>
  >,
  OutputIterator extends Writeonly<
    IForwardIterator<IPointer.ValueType<InputIterator1>, OutputIterator>
  >,
>(
  first1: InputIterator1,
  last1: InputIterator1,
  first2: InputIterator2,
  last2: InputIterator2,
  output: OutputIterator,
  comp: Comparator<IPointer.ValueType<InputIterator1>> = less,
): OutputIterator {
  while (!first1.equals(last1) && !first2.equals(last2))
    if (comp(first1.value, first2.value)) {
      output.value = first1.value;

      output = output.next();
      first1 = first1.next();
    } else if (comp(first2.value, first1.value)) first2 = first2.next();
    else {
      first1 = first1.next();
      first2 = first2.next();
    }
  return copy(first1, last1, output);
}

/**
 * Write elements present in excess on either side of two sorted ranges, after
 * canceling matching pairs.
 *
 * @param first1 Start of the first sorted range.
 * @param last1 Exclusive end of the first sorted range.
 * @param first2 Start of the second sorted range.
 * @param last2 Exclusive end of the second sorted range.
 * @param output Iterator to the start of the destination.
 * @param comp Strict ordering predicate. Return `true` when the first argument
 * precedes the second. Defaults to {@link less}.
 *
 * @return The iterator immediately after the last value written.
 */
export function set_symmetric_difference<
  InputIterator1 extends Readonly<
    IForwardIterator<IPointer.ValueType<InputIterator1>, InputIterator1>
  >,
  InputIterator2 extends Readonly<
    IForwardIterator<IPointer.ValueType<InputIterator1>, InputIterator2>
  >,
  OutputIterator extends Writeonly<
    IForwardIterator<IPointer.ValueType<InputIterator1>, OutputIterator>
  >,
>(
  first1: InputIterator1,
  last1: InputIterator1,
  first2: InputIterator2,
  last2: InputIterator2,
  output: OutputIterator,
  comp: Comparator<IPointer.ValueType<InputIterator1>> = less,
): OutputIterator {
  while (true) {
    if (first1.equals(last1)) return copy(<Temporary>first2, last2, output);
    else if (first2.equals(last2)) return copy(first1, last1, output);

    if (comp(first1.value, first2.value)) {
      output.value = first1.value;

      output = output.next();
      first1 = first1.next();
    } else if (comp(first2.value, first1.value)) {
      output.value = first2.value;

      output = output.next();
      first2 = first2.next();
    } else {
      // equals
      first1 = first1.next();
      first2 = first2.next();
    }
  }
}
