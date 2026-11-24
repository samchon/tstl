//================================================================

/**
 * @packageDocumentation
 * @module std
 */
//================================================================
import { IPointer } from "../functional/IPointer";
import { equal_to, less } from "../functional/comparators";
import { BinaryPredicator } from "../internal/functional/BinaryPredicator";
import { UnaryPredicator } from "../internal/functional/UnaryPredicator";
import { IForwardIterator } from "../iterator/IForwardIterator";
import { distance } from "../iterator/global";
import { Pair } from "../utility/Pair";

/* =========================================================
    ITERATIONS (NON-MODIFYING SEQUENCE)
        - FOR_EACH
        - AGGREGATE CONDITIONS
        - FINDERS
        - COUNTERS
============================================================
    FOR_EACH
--------------------------------------------------------- */
/**
 * Invoke `fn` for each element in traversal order.
 *
 * @param first Start of the range.
 * @param last Exclusive end of the range.
 * @param fn Function invoked for each element.
 *
 * @return The function that was applied.
 */
export function for_each<
  InputIterator extends Readonly<
    IForwardIterator<IPointer.ValueType<InputIterator>, InputIterator>
  >,
  Func extends (val: IPointer.ValueType<InputIterator>) => any,
>(first: InputIterator, last: InputIterator, fn: Func): Func {
  for (let it = first; !it.equals(last); it = it.next()) fn(it.value);

  return fn;
}

/**
 * Invoke `fn` on `n` consecutive elements starting at `first`, in traversal
 * order. There must be at least `n` elements from that position.
 *
 * @param first Start of the range.
 * @param n Number of elements to visit.
 * @param fn Function invoked for each element.
 *
 * @return The iterator immediately after the visited elements.
 */
export function for_each_n<
  InputIterator extends Readonly<
    IForwardIterator<IPointer.ValueType<InputIterator>, InputIterator>
  >,
  Func extends (val: IPointer.ValueType<InputIterator>) => any,
>(first: InputIterator, n: number, fn: Func): InputIterator {
  for (let i: number = 0; i < n; ++i) {
    fn(first.value);
    first = first.next();
  }
  return first;
}

/* ---------------------------------------------------------
    AGGREGATE CONDITIONS
--------------------------------------------------------- */
/**
 * Test whether every element satisfies `pred`. An empty range satisfies this
 * condition.
 *
 * @param first Start of the range.
 * @param last Exclusive end of the range.
 * @param pred Predicate to test each element.
 *
 * @return Whether every element satisfies the predicate.
 */
export function all_of<
  InputIterator extends Readonly<
    IForwardIterator<IPointer.ValueType<InputIterator>, InputIterator>
  >,
>(
  first: InputIterator,
  last: InputIterator,
  pred: UnaryPredicator<IPointer.ValueType<InputIterator>>,
): boolean {
  for (let it = first; !it.equals(last); it = it.next())
    if (pred(it.value) === false) return false;

  return true;
}

/**
 * Test whether at least one element satisfies `pred`.
 *
 * @param first Start of the range.
 * @param last Exclusive end of the range.
 * @param pred Predicate to test each element.
 *
 * @return Whether any element satisfies the predicate.
 */
export function any_of<
  InputIterator extends Readonly<
    IForwardIterator<IPointer.ValueType<InputIterator>, InputIterator>
  >,
>(
  first: InputIterator,
  last: InputIterator,
  pred: UnaryPredicator<IPointer.ValueType<InputIterator>>,
): boolean {
  for (let it = first; !it.equals(last); it = it.next())
    if (pred(it.value) === true) return true;

  return false;
}

/**
 * Test whether no element satisfies `pred`. An empty range satisfies this
 * condition.
 *
 * @param first Start of the range.
 * @param last Exclusive end of the range.
 * @param pred Predicate to test each element.
 *
 * @return Whether no element satisfies the predicate.
 */
export function none_of<
  InputIterator extends Readonly<
    IForwardIterator<IPointer.ValueType<InputIterator>, InputIterator>
  >,
>(
  first: InputIterator,
  last: InputIterator,
  pred: UnaryPredicator<IPointer.ValueType<InputIterator>>,
): boolean {
  return !any_of(first, last, pred);
}

/**
 * Compare corresponding elements in traversal order.
 *
 * @param first1 Start of the first range.
 * @param last1 Exclusive end of the first range.
 * @param first2 Start of the second range, which must contain at least as many
 * elements as the first.
 *
 * @return Whether every element in the first range matches its counterpart in
 * the second.
 */
export function equal<
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
): boolean;

/**
 * Compare corresponding elements in traversal order.
 *
 * @param first1 Start of the first range.
 * @param last1 Exclusive end of the first range.
 * @param first2 Start of the second range, which must contain at least as many
 * elements as the first.
 * @param pred Predicate for equivalence.
 *
 * @return Whether every element in the first range matches its counterpart in
 * the second.
 */
export function equal<
  InputIterator1 extends Readonly<
    IForwardIterator<IPointer.ValueType<InputIterator1>, InputIterator1>
  >,
  InputIterator2 extends Readonly<
    IForwardIterator<IPointer.ValueType<InputIterator2>, InputIterator2>
  >,
>(
  first1: InputIterator1,
  last1: InputIterator1,
  first2: InputIterator2,
  pred: BinaryPredicator<
    IPointer.ValueType<InputIterator1>,
    IPointer.ValueType<InputIterator2>
  >,
): boolean;

export function equal<
  InputIterator1 extends Readonly<
    IForwardIterator<IPointer.ValueType<InputIterator1>, InputIterator1>
  >,
  InputIterator2 extends Readonly<
    IForwardIterator<IPointer.ValueType<InputIterator2>, InputIterator2>
  >,
>(
  first1: InputIterator1,
  last1: InputIterator1,
  first2: InputIterator2,
  pred: BinaryPredicator<
    IPointer.ValueType<InputIterator1>,
    IPointer.ValueType<InputIterator2>
  > = equal_to as any,
): boolean {
  while (!first1.equals(last1))
    if (!pred(first1.value, first2.value)) return false;
    else {
      first1 = first1.next();
      first2 = first2.next();
    }
  return true;
}

/**
 * Compare two ranges lexicographically. A proper prefix precedes the longer
 * range.
 *
 * @param first1 Start of the first range.
 * @param last1 Exclusive end of the first range.
 * @param first2 Start of the second range.
 * @param last2 Exclusive end of the second range.
 * @param comp Strict ordering predicate. Return `true` when the first argument
 * precedes the second. Defaults to {@link less}.
 *
 * @return Whether the first range precedes the second.
 */
export function lexicographical_compare<
  Iterator1 extends Readonly<
    IForwardIterator<IPointer.ValueType<Iterator1>, Iterator1>
  >,
  Iterator2 extends Readonly<
    IForwardIterator<IPointer.ValueType<Iterator1>, Iterator2>
  >,
>(
  first1: Iterator1,
  last1: Iterator1,
  first2: Iterator2,
  last2: Iterator2,
  comp: BinaryPredicator<IPointer.ValueType<Iterator1>> = less,
): boolean {
  while (!first1.equals(last1))
    if (first2.equals(last2) || comp(first2.value, first1.value)) return false;
    else if (comp(first1.value, first2.value)) return true;
    else {
      first1 = first1.next();
      first2 = first2.next();
    }

  return !first2.equals(last2);
}

/* ---------------------------------------------------------
    FINDERS
--------------------------------------------------------- */
/**
 * Find the first occurrence of `val`.
 *
 * @param first Start of the range.
 * @param last Exclusive end of the range.
 * @param val Value to look for.
 *
 * @return The first matching iterator, or the end of the range.
 */
export function find<
  InputIterator extends Readonly<
    IForwardIterator<IPointer.ValueType<InputIterator>, InputIterator>
  >,
>(
  first: InputIterator,
  last: InputIterator,
  val: IPointer.ValueType<InputIterator>,
): InputIterator {
  return find_if(first, last, (elem) => equal_to(elem, val));
}

/**
 * Find the first element that satisfies `pred`.
 *
 * @param first Start of the range.
 * @param last Exclusive end of the range.
 * @param pred Predicate to test each element.
 *
 * @return The first matching iterator, or the end of the range.
 */
export function find_if<
  InputIterator extends Readonly<
    IForwardIterator<IPointer.ValueType<InputIterator>, InputIterator>
  >,
>(
  first: InputIterator,
  last: InputIterator,
  pred: UnaryPredicator<IPointer.ValueType<InputIterator>>,
): InputIterator {
  for (let it = first; !it.equals(last); it = it.next())
    if (pred(it.value)) return it;

  return last;
}

/**
 * Find the first element that fails `pred`.
 *
 * @param first Start of the range.
 * @param last Exclusive end of the range.
 * @param pred Predicate to test each element.
 *
 * @return The first matching iterator, or the end of the range.
 */
export function find_if_not<
  InputIterator extends Readonly<
    IForwardIterator<IPointer.ValueType<InputIterator>, InputIterator>
  >,
>(
  first: InputIterator,
  last: InputIterator,
  pred: UnaryPredicator<IPointer.ValueType<InputIterator>>,
): InputIterator {
  return find_if(first, last, (elem) => !pred(elem));
}

/**
 * Find the last contiguous occurrence of the second range in the first range.
 *
 * @param first1 Start of the first range.
 * @param last1 Exclusive end of the first range.
 * @param first2 Start of the second range.
 * @param last2 Exclusive end of the second range.
 *
 * @return The start of the last match, or the end of the first range if no
 * match exists.
 */
export function find_end<
  Iterator1 extends Readonly<
    IForwardIterator<IPointer.ValueType<Iterator1>, Iterator1>
  >,
  Iterator2 extends Readonly<
    IForwardIterator<IPointer.ValueType<Iterator1>, Iterator2>
  >,
>(
  first1: Iterator1,
  last1: Iterator1,
  first2: Iterator2,
  last2: Iterator2,
): Iterator1;

/**
 * Find the last contiguous occurrence of the second range in the first range.
 *
 * @param first1 Start of the first range.
 * @param last1 Exclusive end of the first range.
 * @param first2 Start of the second range.
 * @param last2 Exclusive end of the second range.
 * @param pred Predicate for equivalence.
 *
 * @return The start of the last match, or the end of the first range if no
 * match exists.
 */
export function find_end<
  Iterator1 extends Readonly<
    IForwardIterator<IPointer.ValueType<Iterator1>, Iterator1>
  >,
  Iterator2 extends Readonly<
    IForwardIterator<IPointer.ValueType<Iterator2>, Iterator2>
  >,
>(
  first1: Iterator1,
  last1: Iterator1,
  first2: Iterator2,
  last2: Iterator2,
  pred: BinaryPredicator<
    IPointer.ValueType<Iterator1>,
    IPointer.ValueType<Iterator2>
  >,
): Iterator1;

export function find_end<
  Iterator1 extends Readonly<
    IForwardIterator<IPointer.ValueType<Iterator1>, Iterator1>
  >,
  Iterator2 extends Readonly<
    IForwardIterator<IPointer.ValueType<Iterator2>, Iterator2>
  >,
>(
  first1: Iterator1,
  last1: Iterator1,
  first2: Iterator2,
  last2: Iterator2,
  pred: BinaryPredicator<
    IPointer.ValueType<Iterator1>,
    IPointer.ValueType<Iterator2>
  > = <any>equal_to,
): Iterator1 {
  if (first2.equals(last2)) return last1;

  let ret: Iterator1 = last1;
  for (; !first1.equals(last1); first1 = first1.next()) {
    let it1: Iterator1 = first1;
    let it2: Iterator2 = first2;

    while (pred(it1.value, it2.value)) {
      it1 = it1.next();
      it2 = it2.next();

      if (it2.equals(last2)) {
        ret = first1;
        break;
      } else if (it1.equals(last1)) return ret;
    }
  }
  return ret;
}

/**
 * Find the first element of the first range that matches any element of the
 * second range.
 *
 * @param first1 Start of the first range.
 * @param last1 Exclusive end of the first range.
 * @param first2 Start of the second range.
 * @param last2 Exclusive end of the second range.
 *
 * @return The first matching iterator, or the end of the first range.
 */
export function find_first_of<
  Iterator1 extends Readonly<
    IForwardIterator<IPointer.ValueType<Iterator1>, Iterator1>
  >,
  Iterator2 extends Readonly<
    IForwardIterator<IPointer.ValueType<Iterator1>, Iterator2>
  >,
>(
  first1: Iterator1,
  last1: Iterator1,
  first2: Iterator2,
  last2: Iterator2,
): Iterator1;

/**
 * Find the first element of the first range that matches any element of the
 * second range.
 *
 * @param first1 Start of the first range.
 * @param last1 Exclusive end of the first range.
 * @param first2 Start of the second range.
 * @param last2 Exclusive end of the second range.
 * @param pred Predicate for equivalence.
 *
 * @return The first matching iterator, or the end of the first range.
 */
export function find_first_of<
  Iterator1 extends Readonly<
    IForwardIterator<IPointer.ValueType<Iterator1>, Iterator1>
  >,
  Iterator2 extends Readonly<
    IForwardIterator<IPointer.ValueType<Iterator2>, Iterator2>
  >,
>(
  first1: Iterator1,
  last1: Iterator1,
  first2: Iterator2,
  last2: Iterator2,
  pred: BinaryPredicator<
    IPointer.ValueType<Iterator1>,
    IPointer.ValueType<Iterator2>
  >,
): Iterator1;

export function find_first_of<
  Iterator1 extends Readonly<
    IForwardIterator<IPointer.ValueType<Iterator1>, Iterator1>
  >,
  Iterator2 extends Readonly<
    IForwardIterator<IPointer.ValueType<Iterator2>, Iterator2>
  >,
>(
  first1: Iterator1,
  last1: Iterator1,
  first2: Iterator2,
  last2: Iterator2,
  pred: BinaryPredicator<
    IPointer.ValueType<Iterator1>,
    IPointer.ValueType<Iterator2>
  > = <any>equal_to,
): Iterator1 {
  for (; !first1.equals(last1); first1 = first1.next())
    for (let it = first2; !it.equals(last2); it = it.next())
      if (pred(first1.value, it.value)) return first1;

  return last1;
}

/**
 * Find the first adjacent pair that satisfies `pred`.
 *
 * @param first Start of the range.
 * @param last Exclusive end of the range.
 * @param pred Predicate for equivalence. Defaults to {@link equal_to}.
 *
 * @return The first iterator in the matching pair, or the end of the range.
 */
export function adjacent_find<
  InputIterator extends Readonly<
    IForwardIterator<IPointer.ValueType<InputIterator>, InputIterator>
  >,
>(
  first: InputIterator,
  last: InputIterator,
  pred: BinaryPredicator<IPointer.ValueType<InputIterator>> = equal_to,
): InputIterator {
  if (!first.equals(last)) {
    let next: InputIterator = first.next();

    while (!next.equals(last)) {
      if (pred(first.value, next.value)) return first;

      first = first.next();
      next = next.next();
    }
  }
  return last;
}

/**
 * Find the first contiguous occurrence of the second range in the first range.
 *
 * @param first1 Start of the first range.
 * @param last1 Exclusive end of the first range.
 * @param first2 Start of the second range.
 * @param last2 Exclusive end of the second range.
 *
 * @return The start of the match, or the end of the first range if no match
 * exists.
 */
export function search<
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
  last2: ForwardIterator2,
): ForwardIterator1;

/**
 * Find the first contiguous occurrence of the second range in the first range.
 *
 * @param first1 Start of the first range.
 * @param last1 Exclusive end of the first range.
 * @param first2 Start of the second range.
 * @param last2 Exclusive end of the second range.
 * @param pred Predicate for equivalence.
 *
 * @return The start of the match, or the end of the first range if no match
 * exists.
 */
export function search<
  ForwardIterator1 extends Readonly<
    IForwardIterator<IPointer.ValueType<ForwardIterator1>, ForwardIterator1>
  >,
  ForwardIterator2 extends Readonly<
    IForwardIterator<IPointer.ValueType<ForwardIterator2>, ForwardIterator2>
  >,
>(
  first1: ForwardIterator1,
  last1: ForwardIterator1,
  first2: ForwardIterator2,
  last2: ForwardIterator2,
  pred: BinaryPredicator<
    IPointer.ValueType<ForwardIterator1>,
    IPointer.ValueType<ForwardIterator2>
  >,
): ForwardIterator1;

export function search<
  ForwardIterator1 extends Readonly<
    IForwardIterator<IPointer.ValueType<ForwardIterator1>, ForwardIterator1>
  >,
  ForwardIterator2 extends Readonly<
    IForwardIterator<IPointer.ValueType<ForwardIterator2>, ForwardIterator2>
  >,
>(
  first1: ForwardIterator1,
  last1: ForwardIterator1,
  first2: ForwardIterator2,
  last2: ForwardIterator2,
  pred: BinaryPredicator<
    IPointer.ValueType<ForwardIterator1>,
    IPointer.ValueType<ForwardIterator2>
  > = <any>equal_to,
): ForwardIterator1 {
  if (first2.equals(last2)) return first1;

  for (; !first1.equals(last1); first1 = first1.next()) {
    let it1: ForwardIterator1 = first1;
    let it2: ForwardIterator2 = first2;

    while (pred(it1.value, it2.value)) {
      if (it2.equals(last2)) return first1;
      else if (it1.equals(last1)) return last1;

      it1 = it1.next();
      it2 = it2.next();
    }
  }
  return last1;
}

/**
 * Find the first run of `count` consecutive elements that match `val`.
 *
 * @param first Start of the range.
 * @param last Exclusive end of the range.
 * @param count Length of the requested run.
 * @param val Value to look for.
 * @param pred Predicate for equivalence. Defaults to {@link equal_to}.
 *
 * @return The first iterator for a nonpositive count, the start of the run
 * when found, or the end of the range.
 */
export function search_n<
  ForwardIterator extends Readonly<
    IForwardIterator<IPointer.ValueType<ForwardIterator>, ForwardIterator>
  >,
>(
  first: ForwardIterator,
  last: ForwardIterator,
  count: number,
  val: IPointer.ValueType<ForwardIterator>,
  pred: BinaryPredicator<IPointer.ValueType<ForwardIterator>> = equal_to,
): ForwardIterator {
  if (count <= 0) return first;
  if (count > distance(first, last)) return last;

  let start = first;
  let matched = 0;
  for (let it = first; !it.equals(last); it = it.next()) {
    if (!pred(it.value, val)) {
      matched = 0;
      continue;
    }
    if (matched === 0) start = it;
    if (++matched === count) return start;
  }
  return last;
}

/**
 * Find the first pair of corresponding elements that fails the equality test.
 *
 * @param first1 Start of the first range.
 * @param last1 Exclusive end of the first range.
 * @param first2 Start of the second range, which must contain at least as many
 * elements as the first.
 *
 * @return The iterators at the first mismatch, or both current positions when
 * comparison stops.
 */
export function mismatch<
  Iterator1 extends Readonly<
    IForwardIterator<IPointer.ValueType<Iterator1>, Iterator1>
  >,
  Iterator2 extends Readonly<
    IForwardIterator<IPointer.ValueType<Iterator1>, Iterator2>
  >,
>(
  first1: Iterator1,
  last1: Iterator1,
  first2: Iterator2,
): Pair<Iterator1, Iterator2>;

/**
 * Find the first pair of corresponding elements that fails the equality test.
 *
 * @param first1 Start of the first range.
 * @param last1 Exclusive end of the first range.
 * @param first2 Start of the second range, which must contain at least as many
 * elements as the first.
 * @param pred Predicate for equivalence.
 *
 * @return The iterators at the first mismatch, or both current positions when
 * comparison stops.
 */
export function mismatch<
  Iterator1 extends Readonly<
    IForwardIterator<IPointer.ValueType<Iterator1>, Iterator1>
  >,
  Iterator2 extends Readonly<
    IForwardIterator<IPointer.ValueType<Iterator2>, Iterator2>
  >,
>(
  first1: Iterator1,
  last1: Iterator1,
  first2: Iterator2,
  pred: BinaryPredicator<
    IPointer.ValueType<Iterator1>,
    IPointer.ValueType<Iterator2>
  >,
): Pair<Iterator1, Iterator2>;

export function mismatch<
  Iterator1 extends Readonly<
    IForwardIterator<IPointer.ValueType<Iterator1>, Iterator1>
  >,
  Iterator2 extends Readonly<
    IForwardIterator<IPointer.ValueType<Iterator2>, Iterator2>
  >,
>(
  first1: Iterator1,
  last1: Iterator1,
  first2: Iterator2,
  pred: BinaryPredicator<
    IPointer.ValueType<Iterator1>,
    IPointer.ValueType<Iterator2>
  > = <any>equal_to,
): Pair<Iterator1, Iterator2> {
  while (!first1.equals(last1) && pred(first1.value, first2.value)) {
    first1 = first1.next();
    first2 = first2.next();
  }
  return new Pair(first1, first2);
}

/* ---------------------------------------------------------
    COUNTERS
--------------------------------------------------------- */
/**
 * Count the elements equal to `val`.
 *
 * @param first Start of the range.
 * @param last Exclusive end of the range.
 * @param val The value to count.
 *
 * @return The number of matching elements.
 */
export function count<
  InputIterator extends Readonly<
    IForwardIterator<IPointer.ValueType<InputIterator>, InputIterator>
  >,
>(
  first: InputIterator,
  last: InputIterator,
  val: IPointer.ValueType<InputIterator>,
): number {
  return count_if(first, last, (elem) => equal_to(elem, val));
}

/**
 * Count the elements that satisfy `pred`.
 *
 * @param first Start of the range.
 * @param last Exclusive end of the range.
 * @param pred Predicate to test each element.
 *
 * @return The number of matching elements.
 */
export function count_if<
  InputIterator extends Readonly<
    IForwardIterator<IPointer.ValueType<InputIterator>, InputIterator>
  >,
>(
  first: InputIterator,
  last: InputIterator,
  pred: UnaryPredicator<IPointer.ValueType<InputIterator>>,
): number {
  let ret: number = 0;

  for (let it = first; !it.equals(last); it = it.next())
    if (pred(it.value)) ++ret;

  return ret;
}
