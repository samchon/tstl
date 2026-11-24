//================================================================

/**
 * @packageDocumentation
 * @module std
 */
//================================================================
import { IPointer } from "../functional/IPointer";
import { equal_to } from "../functional/comparators";
import { BinaryPredicator } from "../internal/functional/BinaryPredicator";
import { General } from "../internal/functional/General";
import { UnaryPredicator } from "../internal/functional/UnaryPredicator";
import { Writeonly } from "../internal/functional/Writeonly";
import { IBidirectionalIterator } from "../iterator/IBidirectionalIterator";
import { IForwardIterator } from "../iterator/IForwardIterator";
import { IRandomAccessIterator } from "../iterator/IRandomAccessIterator";
import { advance, distance } from "../iterator/global";
import { randint } from "./random";

type UnaryOperatorInferrer<
  InputIterator extends Readonly<
    IForwardIterator<IPointer.ValueType<InputIterator>, InputIterator>
  >,
  OutputIterator extends Writeonly<
    IForwardIterator<IPointer.ValueType<OutputIterator>, OutputIterator>
  >,
> = (
  val: IPointer.ValueType<InputIterator>,
) => IPointer.ValueType<OutputIterator>;

type BinaryOperatorInferrer<
  InputIterator1 extends Readonly<
    IForwardIterator<IPointer.ValueType<InputIterator1>, InputIterator1>
  >,
  InputIterator2 extends Readonly<
    IForwardIterator<IPointer.ValueType<InputIterator2>, InputIterator2>
  >,
  OutputIterator extends Writeonly<
    IForwardIterator<IPointer.ValueType<OutputIterator>, OutputIterator>
  >,
> = (
  x: IPointer.ValueType<InputIterator1>,
  y: IPointer.ValueType<InputIterator2>,
) => IPointer.ValueType<OutputIterator>;

/* =========================================================
    MODIFIERS (MODIFYING SEQUENCE)
        - FILL
        - REMOVE
        - REPLACE & SWAP
        - RE-ARRANGEMENT
============================================================
    FILL
--------------------------------------------------------- */
/**
 * Copy elements in traversal order. The destination must have room for the
 * entire range, or accept inserted elements.
 *
 * @param first Start of the range.
 * @param last Exclusive end of the range.
 * @param output Iterator to the start of the destination.
 *
 * @return The iterator immediately after the last value written.
 */
export function copy<
  InputIterator extends Readonly<
    IForwardIterator<IPointer.ValueType<InputIterator>, InputIterator>
  >,
  OutputIterator extends Writeonly<
    IForwardIterator<IPointer.ValueType<InputIterator>, OutputIterator>
  >,
>(
  first: InputIterator,
  last: InputIterator,
  output: OutputIterator,
): OutputIterator {
  for (; !first.equals(last); first = first.next()) {
    output.value = first.value;
    output = output.next();
  }
  return output;
}

/**
 * Copy `n` consecutive elements from the start position. The input must
 * contain at least `n` elements.
 *
 * @param first Start of the range.
 * @param n Number of elements to copy.
 * @param output Iterator to the start of the destination.
 *
 * @return The iterator immediately after the last value written.
 */
export function copy_n<
  InputIterator extends Readonly<
    IForwardIterator<IPointer.ValueType<InputIterator>, InputIterator>
  >,
  OutputIterator extends Writeonly<
    IForwardIterator<IPointer.ValueType<InputIterator>, OutputIterator>
  >,
>(first: InputIterator, n: number, output: OutputIterator): OutputIterator {
  for (let i: number = 0; i < n; ++i) {
    output.value = first.value;

    first = first.next();
    output = output.next();
  }
  return output;
}

/**
 * Copy elements that satisfy `pred` , preserving their relative order.
 *
 * @param first Start of the range.
 * @param last Exclusive end of the range.
 * @param output Iterator to the start of the destination.
 * @param pred Predicate to test each element.
 *
 * @return The iterator immediately after the last value written.
 */
export function copy_if<
  InputIterator extends Readonly<
    IForwardIterator<IPointer.ValueType<InputIterator>, InputIterator>
  >,
  OutputIterator extends Writeonly<
    IForwardIterator<IPointer.ValueType<InputIterator>, OutputIterator>
  >,
>(
  first: InputIterator,
  last: InputIterator,
  output: OutputIterator,
  pred: UnaryPredicator<IPointer.ValueType<InputIterator>>,
): OutputIterator {
  for (; !first.equals(last); first = first.next()) {
    if (!pred(first.value)) continue;

    output.value = first.value;
    output = output.next();
  }
  return output;
}

/**
 * Copy the range into the destination by writing from the end toward the
 * beginning. The copied elements retain their order.
 *
 * @param first Start of the range.
 * @param last Exclusive end of the range.
 * @param output Exclusive end of the destination range.
 *
 * @return The beginning of the destination range.
 */
export function copy_backward<
  InputIterator extends Readonly<
    IBidirectionalIterator<IPointer.ValueType<InputIterator>, InputIterator>
  >,
  OutputIterator extends Writeonly<
    IBidirectionalIterator<IPointer.ValueType<InputIterator>, OutputIterator>
  >,
>(
  first: InputIterator,
  last: InputIterator,
  output: OutputIterator,
): OutputIterator {
  while (!last.equals(first)) {
    last = last.prev();
    output = output.prev();

    output.value = last.value;
  }
  return output;
}

/**
 * Assign the same value to every element in the range.
 *
 * @param first Start of the range.
 * @param last Exclusive end of the range.
 * @param val The value to fill.
 */
export function fill<
  ForwardIterator extends Writeonly<
    IForwardIterator<IPointer.ValueType<ForwardIterator>, ForwardIterator>
  >,
>(
  first: ForwardIterator,
  last: ForwardIterator,
  val: IPointer.ValueType<ForwardIterator>,
): void {
  for (; !first.equals(last); first = first.next()) first.value = val;
}

/**
 * Assign the same value to the first `n` positions.
 *
 * @param first Start of the range.
 * @param n Number of elements to fill.
 * @param val The value to fill.
 *
 * @return The iterator immediately after the last position filled.
 */
export function fill_n<
  OutputIterator extends Writeonly<
    IForwardIterator<IPointer.ValueType<OutputIterator>, OutputIterator>
  >,
>(
  first: OutputIterator,
  n: number,
  val: IPointer.ValueType<OutputIterator>,
): OutputIterator {
  for (let i: number = 0; i < n; ++i) {
    first.value = val;
    first = first.next();
  }
  return first;
}

/**
 * Apply a unary transformation to each input element and write the results in
 * traversal order.
 *
 * @param first Start of the range.
 * @param last Exclusive end of the range.
 * @param result Iterator to the start of the destination.
 * @param op Unary transformation.
 *
 * @return The iterator immediately after the last value written.
 */
export function transform<
  InputIterator extends Readonly<
    IForwardIterator<IPointer.ValueType<InputIterator>, InputIterator>
  >,
  OutputIterator extends Writeonly<
    IForwardIterator<IPointer.ValueType<OutputIterator>, OutputIterator>
  >,
>(
  first: InputIterator,
  last: InputIterator,
  result: OutputIterator,
  op: UnaryOperatorInferrer<InputIterator, OutputIterator>,
): OutputIterator;

/**
 * Apply a binary transformation to corresponding input pairs and write the
 * results in traversal order.
 *
 * @param first1 Start of the first range.
 * @param last1 Exclusive end of the first range.
 * @param first2 Start of the second range, which must contain at least as many
 * elements as the first.
 * @param result Iterator to the start of the destination.
 * @param op Binary transformation.
 *
 * @return The iterator immediately after the last value written.
 */
export function transform<
  InputIterator1 extends Readonly<
    IForwardIterator<IPointer.ValueType<InputIterator1>, InputIterator1>
  >,
  InputIterator2 extends Readonly<
    IForwardIterator<IPointer.ValueType<InputIterator2>, InputIterator2>
  >,
  OutputIterator extends Writeonly<
    IForwardIterator<IPointer.ValueType<OutputIterator>, OutputIterator>
  >,
>(
  first1: InputIterator1,
  last1: InputIterator1,
  first2: InputIterator2,
  result: OutputIterator,
  op: BinaryOperatorInferrer<InputIterator1, InputIterator2, OutputIterator>,
): OutputIterator;

export function transform(...args: any[]): any {
  if (args.length === 4) return (_Unary_transform as Function)(...args);
  // args: #5
  else return (_Binary_transform as Function)(...args);
}

function _Unary_transform<
  InputIterator extends Readonly<
    IForwardIterator<IPointer.ValueType<InputIterator>, InputIterator>
  >,
  OutputIterator extends Writeonly<
    IForwardIterator<IPointer.ValueType<OutputIterator>, OutputIterator>
  >,
>(
  first: InputIterator,
  last: InputIterator,
  result: OutputIterator,
  op: UnaryOperatorInferrer<InputIterator, OutputIterator>,
): OutputIterator {
  for (; !first.equals(last); first = first.next()) {
    result.value = op(first.value);
    result = result.next();
  }
  return result;
}

function _Binary_transform<
  InputIterator1 extends Readonly<
    IForwardIterator<IPointer.ValueType<InputIterator1>, InputIterator1>
  >,
  InputIterator2 extends Readonly<
    IForwardIterator<IPointer.ValueType<InputIterator2>, InputIterator2>
  >,
  OutputIterator extends Writeonly<
    IForwardIterator<IPointer.ValueType<OutputIterator>, OutputIterator>
  >,
>(
  first1: InputIterator1,
  last1: InputIterator1,
  first2: InputIterator2,
  result: OutputIterator,
  binary_op: BinaryOperatorInferrer<
    InputIterator1,
    InputIterator2,
    OutputIterator
  >,
): OutputIterator {
  while (!first1.equals(last1)) {
    result.value = binary_op(first1.value, first2.value);

    first1 = first1.next();
    first2 = first2.next();
    result = result.next();
  }
  return result;
}

/**
 * Assign successive results of `gen()` to the range in traversal order.
 *
 * @param first Start of the range.
 * @param last Exclusive end of the range.
 * @param gen Function invoked once for each assigned element.
 */
export function generate<
  ForwardIterator extends Writeonly<
    IForwardIterator<IPointer.ValueType<ForwardIterator>, ForwardIterator>
  >,
>(
  first: ForwardIterator,
  last: ForwardIterator,
  gen: () => IPointer.ValueType<ForwardIterator>,
): void {
  for (; !first.equals(last); first = first.next()) first.value = gen();
}

/**
 * Assign `n` successive results of `gen()` in traversal order.
 *
 * @param first Start of the range.
 * @param n Number of elements to generate.
 * @param gen Function invoked once for each assigned element.
 *
 * @return The iterator immediately after the last value written.
 */
export function generate_n<
  ForwardIterator extends Writeonly<
    IForwardIterator<IPointer.ValueType<ForwardIterator>, ForwardIterator>
  >,
>(
  first: ForwardIterator,
  n: number,
  gen: () => IPointer.ValueType<ForwardIterator>,
): ForwardIterator {
  while (n-- > 0) {
    first.value = gen();
    first = first.next();
  }
  return first;
}

/* ---------------------------------------------------------
    REMOVE
--------------------------------------------------------- */
/**
 * Test whether the range has no adjacent equivalent elements.
 *
 * @param first Start of the range.
 * @param last Exclusive end of the range.
 * @param pred Predicate for equivalence. Defaults to {@link equal_to} .
 *
 * @returns Whether there is no adjacent equivalent pair.
 */
export function is_unique<
  InputIterator extends General<
    IForwardIterator<IPointer.ValueType<InputIterator>, InputIterator>
  >,
>(
  first: InputIterator,
  last: InputIterator,
  pred: BinaryPredicator<IPointer.ValueType<InputIterator>> = equal_to,
): boolean {
  if (first.equals(last)) return true;

  let next: InputIterator = first.next();
  for (; !next.equals(last); next = next.next()) {
    if (pred(first.value, next.value) === true) return false;
    first = first.next();
  }
  return true;
}

/**
 * Compact consecutive equivalent elements in place, keeping the first element
 * of each run. Erase the trailing range separately if the container should
 * shrink.
 *
 * @param first Start of the range.
 * @param last Exclusive end of the range.
 * @param pred Predicate for equivalence. Defaults to {@link equal_to} .
 *
 * @return The new logical end of the compacted range.
 */
export function unique<
  InputIterator extends General<
    IForwardIterator<IPointer.ValueType<InputIterator>, InputIterator>
  >,
>(
  first: InputIterator,
  last: InputIterator,
  pred: BinaryPredicator<IPointer.ValueType<InputIterator>> = equal_to,
): InputIterator {
  if (first.equals(last)) return last;

  let ret: InputIterator = first;
  for (first = first.next(); !first.equals(last); first = first.next())
    if (!pred(ret.value, first.value)) {
      ret = ret.next();
      ret.value = first.value;
    }
  return ret.next();
}

/**
 * Copy only the first element of each consecutive run of equivalent elements.
 *
 * @param first Start of the range.
 * @param last Exclusive end of the range.
 * @param output Iterator to the start of the destination.
 * @param pred Predicate for equivalence. Defaults to {@link equal_to} .
 *
 * @return The iterator immediately after the last value written.
 */
export function unique_copy<
  InputIterator extends Readonly<
    IForwardIterator<IPointer.ValueType<InputIterator>, InputIterator>
  >,
  OutputIterator extends Writeonly<
    IForwardIterator<IPointer.ValueType<InputIterator>, OutputIterator>
  >,
>(
  first: InputIterator,
  last: InputIterator,
  output: OutputIterator,
  pred: BinaryPredicator<IPointer.ValueType<InputIterator>> = equal_to,
): OutputIterator {
  if (first.equals(last)) return output;

  output.value = first.value;
  first = first.next();

  for (; !first.equals(last); first = first.next())
    if (!pred(first.value, output.value)) {
      output = output.next();
      output.value = first.value;
    }
  return output.next();
}

/**
 * Compact elements that are unequal to `val` in place, preserving their order.
 * Erase the trailing range separately if the container should shrink.
 *
 * @param first Start of the range.
 * @param last Exclusive end of the range.
 * @param val Value to exclude.
 *
 * @return The new logical end of the retained elements.
 */
export function remove<
  InputIterator extends General<
    IForwardIterator<IPointer.ValueType<InputIterator>, InputIterator>
  >,
>(
  first: InputIterator,
  last: InputIterator,
  val: IPointer.ValueType<InputIterator>,
): InputIterator {
  return remove_if(first, last, (elem) => equal_to(elem, val));
}

/**
 * Compact elements that fail `pred` in place, preserving their order. Erase
 * the trailing range separately if the container should shrink.
 *
 * @param first Start of the range.
 * @param last Exclusive end of the range.
 * @param pred Predicate selecting elements to exclude.
 *
 * @return The new logical end of the retained elements.
 */
export function remove_if<
  InputIterator extends General<
    IForwardIterator<IPointer.ValueType<InputIterator>, InputIterator>
  >,
>(
  first: InputIterator,
  last: InputIterator,
  pred: UnaryPredicator<IPointer.ValueType<InputIterator>>,
): InputIterator {
  let ret: InputIterator = first;

  while (!first.equals(last)) {
    if (!pred(first.value)) {
      ret.value = first.value;
      ret = ret.next();
    }
    first = first.next();
  }
  return ret;
}

/**
 * Copy elements that are unequal to `val` , preserving their order.
 *
 * @param first Start of the range.
 * @param last Exclusive end of the range.
 * @param output Iterator to the start of the destination.
 * @param val Value to exclude.
 *
 * @return The iterator immediately after the last value written.
 */
export function remove_copy<
  InputIterator extends Readonly<
    IForwardIterator<IPointer.ValueType<InputIterator>, InputIterator>
  >,
  OutputIterator extends Writeonly<
    IForwardIterator<IPointer.ValueType<InputIterator>, OutputIterator>
  >,
>(
  first: InputIterator,
  last: InputIterator,
  output: OutputIterator,
  val: IPointer.ValueType<InputIterator>,
): OutputIterator {
  return remove_copy_if(first, last, output, (elem) => equal_to(elem, val));
}

/**
 * Copy elements that fail `pred` , preserving their order.
 *
 * @param first Start of the range.
 * @param last Exclusive end of the range.
 * @param output Iterator to the start of the destination.
 * @param pred Predicate selecting elements to exclude.
 *
 * @return The iterator immediately after the last value written.
 */
export function remove_copy_if<
  InputIterator extends Readonly<
    IForwardIterator<IPointer.ValueType<InputIterator>, InputIterator>
  >,
  OutputIterator extends Writeonly<
    IForwardIterator<IPointer.ValueType<InputIterator>, OutputIterator>
  >,
>(
  first: InputIterator,
  last: InputIterator,
  output: OutputIterator,
  pred: UnaryPredicator<IPointer.ValueType<InputIterator>>,
): OutputIterator {
  for (; !first.equals(last); first = first.next()) {
    if (pred(first.value)) continue;

    output.value = first.value;
    output = output.next();
  }

  return output;
}

/* ---------------------------------------------------------
    REPLACE & SWAP
--------------------------------------------------------- */
/**
 * Replace every element equal to `old_val` with `new_val` in place.
 *
 * @param first Start of the range.
 * @param last Exclusive end of the range.
 * @param old_val Value to replace.
 * @param new_val Replacement value.
 */
export function replace<
  InputIterator extends General<
    IForwardIterator<IPointer.ValueType<InputIterator>, InputIterator>
  >,
>(
  first: InputIterator,
  last: InputIterator,
  old_val: IPointer.ValueType<InputIterator>,
  new_val: IPointer.ValueType<InputIterator>,
): void {
  return replace_if(first, last, (elem) => equal_to(elem, old_val), new_val);
}

/**
 * Assign `new_val` to every element that satisfies `pred` .
 *
 * @param first Start of the range.
 * @param last Exclusive end of the range.
 * @param pred Predicate selecting elements to replace.
 * @param new_val Replacement value.
 */
export function replace_if<
  InputIterator extends General<
    IForwardIterator<IPointer.ValueType<InputIterator>, InputIterator>
  >,
>(
  first: InputIterator,
  last: InputIterator,
  pred: UnaryPredicator<IPointer.ValueType<InputIterator>>,
  new_val: IPointer.ValueType<InputIterator>,
): void {
  for (let it = first; !it.equals(last); it = it.next())
    if (pred(it.value) === true) it.value = new_val;
}

/**
 * Copy the range, substituting `new_val` for each element equal to `old_val` .
 *
 * @param first Start of the range.
 * @param last Exclusive end of the range.
 * @param output Iterator to the start of the destination.
 * @param old_val Value to replace.
 * @param new_val Replacement value.
 *
 * @return The iterator immediately after the last value written.
 */
export function replace_copy<
  InputIterator extends Readonly<
    IForwardIterator<IPointer.ValueType<InputIterator>, InputIterator>
  >,
  OutputIterator extends Writeonly<
    IForwardIterator<IPointer.ValueType<InputIterator>, OutputIterator>
  >,
>(
  first: InputIterator,
  last: InputIterator,
  output: OutputIterator,
  old_val: IPointer.ValueType<InputIterator>,
  new_val: IPointer.ValueType<InputIterator>,
): OutputIterator {
  return replace_copy_if(
    first,
    last,
    output,
    (elem) => equal_to(elem, old_val),
    new_val,
  );
}

/**
 * Copy the range, substituting `new_val` for every element that satisfies
 * `pred` .
 *
 * @param first Start of the range.
 * @param last Exclusive end of the range.
 * @param result Iterator to the start of the destination.
 * @param pred Predicate selecting elements to replace.
 * @param new_val Replacement value.
 *
 * @return The iterator immediately after the last value written.
 */
export function replace_copy_if<
  InputIterator extends Readonly<
    IForwardIterator<IPointer.ValueType<InputIterator>, InputIterator>
  >,
  OutputIterator extends Writeonly<
    IForwardIterator<IPointer.ValueType<InputIterator>, OutputIterator>
  >,
>(
  first: InputIterator,
  last: InputIterator,
  result: OutputIterator,
  pred: UnaryPredicator<IPointer.ValueType<InputIterator>>,
  new_val: IPointer.ValueType<InputIterator>,
): OutputIterator {
  for (; !first.equals(last); first = first.next()) {
    if (pred(first.value)) result.value = new_val;
    else result.value = first.value;

    result = result.next();
  }

  return result;
}

/**
 * Exchange the values referenced by the two iterators.
 *
 * @param x Forward iterator to swap its value.
 * @param y Forward iterator to swap its value.
 */
export function iter_swap<
  ForwardIterator1 extends General<
    IForwardIterator<IPointer.ValueType<ForwardIterator1>, ForwardIterator1>
  >,
  ForwardIterator2 extends General<
    IForwardIterator<IPointer.ValueType<ForwardIterator1>, ForwardIterator2>
  >,
>(x: ForwardIterator1, y: ForwardIterator2): void {
  [x.value, y.value] = [y.value, x.value];
}

/**
 * Exchange corresponding elements. The second range must contain at least as
 * many elements as the first.
 *
 * @param first1 Start of the first range.
 * @param last1 Exclusive end of the first range.
 * @param first2 Start of the second range, which must contain at least as many
 * elements as the first.
 *
 * @return The iterator immediately after the last element swapped in the
 * second range.
 */
export function swap_ranges<
  ForwardIterator1 extends General<
    IForwardIterator<IPointer.ValueType<ForwardIterator1>, ForwardIterator1>
  >,
  ForwardIterator2 extends General<
    IForwardIterator<IPointer.ValueType<ForwardIterator1>, ForwardIterator2>
  >,
>(
  first1: ForwardIterator1,
  last1: ForwardIterator1,
  first2: ForwardIterator2,
): ForwardIterator2 {
  for (; !first1.equals(last1); first1 = first1.next()) {
    iter_swap(first1, first2);
    first2 = first2.next();
  }
  return first2;
}

/* ---------------------------------------------------------
    RE-ARRANGEMENT
--------------------------------------------------------- */
/**
 * Reverse the order of the elements in place.
 *
 * @param first Start of the range.
 * @param last Exclusive end of the range.
 */
export function reverse<
  BidirectionalIterator extends General<
    IBidirectionalIterator<
      IPointer.ValueType<BidirectionalIterator>,
      BidirectionalIterator
    >
  >,
>(first: BidirectionalIterator, last: BidirectionalIterator): void {
  // first !== last && first !== --last
  while (
    first.equals(last) === false &&
    first.equals((last = last.prev())) === false
  ) {
    iter_swap(first, last);
    first = first.next();
  }
}

/**
 * Copy the range in reverse order.
 *
 * @param first Start of the range.
 * @param last Exclusive end of the range.
 * @param output Iterator to the start of the destination.
 *
 * @return The iterator immediately after the last value written.
 */
export function reverse_copy<
  BidirectionalIterator extends Readonly<
    IBidirectionalIterator<
      IPointer.ValueType<BidirectionalIterator>,
      BidirectionalIterator
    >
  >,
  OutputIterator extends Writeonly<
    IForwardIterator<IPointer.ValueType<BidirectionalIterator>, OutputIterator>
  >,
>(
  first: BidirectionalIterator,
  last: BidirectionalIterator,
  output: OutputIterator,
): OutputIterator {
  while (!last.equals(first)) {
    last = last.prev();

    output.value = last.value;
    output = output.next();
  }
  return output;
}

export function shift_left<
  ForwardIterator extends General<
    IForwardIterator<IPointer.ValueType<ForwardIterator>, ForwardIterator>
  >,
>(first: ForwardIterator, last: ForwardIterator, n: number): ForwardIterator {
  if (n === 0) return last;
  if (n >= distance(first, last)) return first;
  const mid = advance(first, n);
  return copy(mid, last, first);
}

export function shift_right<
  ForwardIterator extends General<
    IBidirectionalIterator<IPointer.ValueType<ForwardIterator>, ForwardIterator>
  >,
>(first: ForwardIterator, last: ForwardIterator, n: number): ForwardIterator {
  if (n === 0) return first;
  if (n >= distance(first, last)) return last;
  const mid = advance(last, -n);
  return copy_backward(first, mid, last);
}

/**
 * Rotate the range in place so that `middle` becomes its first position in the
 * resulting order.
 *
 * @param first Start of the range.
 * @param middle Original position of the element that will come first.
 * @param last Exclusive end of the range.
 *
 * @return The new position of the original first element. If the split is at
 * the start or end, the result is the opposite boundary.
 */
export function rotate<
  InputIterator extends General<
    IForwardIterator<IPointer.ValueType<InputIterator>, InputIterator>
  >,
>(
  first: InputIterator,
  middle: InputIterator,
  last: InputIterator,
): InputIterator {
  if (first.equals(middle)) return last;
  if (middle.equals(last)) return first;

  // Swap until the original right block has moved to the front.
  let right = middle;
  do {
    iter_swap(first, right);
    first = first.next();
    right = right.next();
    if (first.equals(middle)) middle = right;
  } while (!right.equals(last));

  const result = first;
  // Continue rotating the remaining suffix around its updated middle.
  right = middle;
  while (!right.equals(last)) {
    iter_swap(first, right);
    first = first.next();
    right = right.next();
    if (first.equals(middle)) middle = right;
    else if (right.equals(last)) right = middle;
  }
  return result;
}

/**
 * Copy the elements from `middle` to the end, then copy the elements before
 * `middle` .
 *
 * @param first Start of the range.
 * @param middle Original position of the element that will come first.
 * @param last Exclusive end of the range.
 * @param output Iterator to the start of the destination.
 *
 * @return The iterator immediately after the last value written.
 */
export function rotate_copy<
  ForwardIterator extends Readonly<
    IForwardIterator<IPointer.ValueType<ForwardIterator>, ForwardIterator>
  >,
  OutputIterator extends Writeonly<
    IForwardIterator<IPointer.ValueType<ForwardIterator>, OutputIterator>
  >,
>(
  first: ForwardIterator,
  middle: ForwardIterator,
  last: ForwardIterator,
  output: OutputIterator,
): OutputIterator {
  output = copy(middle, last, output);
  return copy(first, middle, output);
}

/**
 * Randomly permute the range in place using `Math.random` .
 *
 * @param first Start of the range.
 * @param last Exclusive end of the range.
 */
export function shuffle<
  RandomAccessIterator extends General<
    IRandomAccessIterator<
      IPointer.ValueType<RandomAccessIterator>,
      RandomAccessIterator
    >
  >,
>(first: RandomAccessIterator, last: RandomAccessIterator): void {
  for (let it = first; !it.equals(last); it = it.next()) {
    const rand_index: number = randint(first.index(), last.index() - 1);
    if (it.index() !== rand_index) iter_swap(it, first.advance(rand_index));
  }
}
