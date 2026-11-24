//================================================================

/**
 * @packageDocumentation
 * @module std
 */
//================================================================
import { IPointer } from "../functional/IPointer";
import { General } from "../internal/functional/General";
import { UnaryPredicator } from "../internal/functional/UnaryPredicator";
import { Writeonly } from "../internal/functional/Writeonly";
import { IBidirectionalIterator } from "../iterator/IBidirectionalIterator";
import { IForwardIterator } from "../iterator/IForwardIterator";
import { advance, distance } from "../iterator/global";
import { Pair } from "../utility/Pair";
import { iter_swap } from "./modifiers";

/* =========================================================
    PARTITION
========================================================= */
/**
 * Test whether all elements satisfying `pred` precede all elements that fail
 * it.
 *
 * @param first Start of the range.
 * @param last Exclusive end of the range.
 * @param pred Predicate selecting the elements in the first partition.
 *
 * @return Whether the range is partitioned by the predicate.
 */
export function is_partitioned<
  ForwardIterator extends Readonly<
    IForwardIterator<IPointer.ValueType<ForwardIterator>, ForwardIterator>
  >,
>(
  first: ForwardIterator,
  last: ForwardIterator,
  pred: UnaryPredicator<IPointer.ValueType<ForwardIterator>>,
): boolean {
  while (!first.equals(last) && pred(first.value)) first = first.next();

  for (; !first.equals(last); first = first.next())
    if (pred(first.value)) return false;

  return true;
}

/**
 * Find where a range already partitioned by `pred` changes from matching to
 * nonmatching elements.
 *
 * @param first Start of the range.
 * @param last Exclusive end of the range.
 * @param pred Predicate selecting the elements in the first partition.
 *
 * @return The first nonmatching iterator, or the end of the range.
 */
export function partition_point<
  ForwardIterator extends Readonly<
    IForwardIterator<IPointer.ValueType<ForwardIterator>, ForwardIterator>
  >,
>(
  first: ForwardIterator,
  last: ForwardIterator,
  pred: UnaryPredicator<IPointer.ValueType<ForwardIterator>>,
): ForwardIterator {
  let n: number = distance(first, last);

  while (n > 0) {
    const step: number = Math.floor(n / 2);
    const it: ForwardIterator = advance(first, step);

    if (pred(it.value)) {
      first = it.next();
      n -= step + 1;
    } else n = step;
  }
  return first;
}

/**
 * Reorder the range so that elements satisfying `pred` precede the others.
 *
 * @param first Start of the range.
 * @param last Exclusive end of the range.
 * @param pred Predicate selecting the elements in the first partition.
 *
 * @return The beginning of the nonmatching group, or the end if all elements
 * match.
 */
export function partition<
  BidirectionalIterator extends General<
    IBidirectionalIterator<
      IPointer.ValueType<BidirectionalIterator>,
      BidirectionalIterator
    >
  >,
>(
  first: BidirectionalIterator,
  last: BidirectionalIterator,
  pred: UnaryPredicator<IPointer.ValueType<BidirectionalIterator>>,
): BidirectionalIterator {
  for (;;) {
    while (!first.equals(last) && pred(first.value)) first = first.next();
    if (first.equals(last)) return first;

    do {
      last = last.prev();
      if (first.equals(last)) return first;
    } while (!pred(last.value));

    iter_swap(first, last);
    first = first.next();
  }
}

/**
 * Group matching elements before nonmatching elements, preserving the order
 * within each group.
 *
 * @param first Start of the range.
 * @param last Exclusive end of the range.
 * @param pred Predicate selecting the elements in the first partition.
 *
 * @return The beginning of the nonmatching group, or the end if all elements
 * match.
 */
export function stable_partition<
  BidirectionalIterator extends General<
    IBidirectionalIterator<
      IPointer.ValueType<BidirectionalIterator>,
      BidirectionalIterator
    >
  >,
>(
  first: BidirectionalIterator,
  last: BidirectionalIterator,
  pred: UnaryPredicator<IPointer.ValueType<BidirectionalIterator>>,
): BidirectionalIterator {
  while (!first.equals(last) && pred(first.value)) first = first.next();
  if (first.equals(last)) return first;

  // Compact matching elements in place and save the rejected elements in order.
  const rejected = [first.value];
  for (let it = first.next(); !it.equals(last); it = it.next()) {
    const value = it.value;
    if (pred(value)) {
      first.value = value;
      first = first.next();
    } else rejected.push(value);
  }

  let output = first;
  for (const value of rejected) {
    output.value = value;
    output = output.next();
  }
  return first;
}

/**
 * Copy matching and nonmatching elements to separate destinations, preserving
 * their order within each destination.
 *
 * @param first Start of the range.
 * @param last Exclusive end of the range.
 * @param output_true Start of the output for matching elements.
 * @param output_false Start of the output for nonmatching elements.
 * @param pred Predicate selecting the elements in the first partition.
 *
 * @return A pair containing the end of the matching output and the end of the
 * nonmatching output.
 */
export function partition_copy<
  InputIterator extends Readonly<
    IForwardIterator<IPointer.ValueType<InputIterator>, InputIterator>
  >,
  OutputIterator1 extends Writeonly<
    IForwardIterator<IPointer.ValueType<InputIterator>, OutputIterator1>
  >,
  OutputIterator2 extends Writeonly<
    IForwardIterator<IPointer.ValueType<InputIterator>, OutputIterator2>
  >,
>(
  first: InputIterator,
  last: InputIterator,
  output_true: OutputIterator1,
  output_false: OutputIterator2,
  pred: UnaryPredicator<IPointer.ValueType<InputIterator>>,
): Pair<OutputIterator1, OutputIterator2> {
  for (; !first.equals(last); first = first.next())
    if (pred(first.value)) {
      output_true.value = first.value;
      output_true = output_true.next();
    } else {
      output_false.value = first.value;
      output_false = output_false.next();
    }
  return new Pair(output_true, output_false);
}
