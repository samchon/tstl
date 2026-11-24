//================================================================

/**
 * @packageDocumentation
 * @module std
 */
//================================================================
import { IPointer } from "../functional/IPointer";
import { less } from "../functional/comparators";
import { Comparator } from "../internal/functional/Comparator";
import { General } from "../internal/functional/General";
import { IRandomAccessIterator } from "../iterator/IRandomAccessIterator";
import { advance, distance } from "../iterator/global";

/* =========================================================
    EA-STL (https://github.com/electronicarts/EASTL/blob/master/include/EASTL/heap.h)
        - PUSH & POP
        - SORT
        - INTERNAL
============================================================
    PUSH & POP
--------------------------------------------------------- */
/**
 * Rearrange the range into a heap under `comp` .
 *
 * @param first Start of the range.
 * @param last Exclusive end of the range.
 * @param comp Strict ordering predicate. Return `true` when the first argument
 * precedes the second. Defaults to {@link less} .
 */
export function make_heap<
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
  const heapSize: number = distance(first, last);
  if (heapSize < 2) return;

  let parentPosition: number = ((heapSize - 2) >> 1) + 1;
  do {
    const temp: IPointer.ValueType<RandomAccessIterator> = first.advance(
      --parentPosition,
    ).value;
    _Adjust_heap(first, parentPosition, heapSize, parentPosition, temp, comp);
  } while (parentPosition !== 0);
}

/**
 * Restore heap order after appending the last element. The preceding elements
 * must already form a heap.
 *
 * @param first Start of the range.
 * @param last Exclusive end of the range.
 * @param comp Strict ordering predicate. Return `true` when the first argument
 * precedes the second. Defaults to {@link less} .
 */
export function push_heap<
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
  const temp: IPointer.ValueType<RandomAccessIterator> = last.prev().value;
  _Promote_heap(first, 0, distance(first, last) - 1, temp, comp);
}

/**
 * Move the root of a nonempty heap to the last position and restore heap order
 * in the remaining prefix.
 *
 * @param first Start of the range.
 * @param last Exclusive end of the range.
 * @param comp Strict ordering predicate. Return `true` when the first argument
 * precedes the second. Defaults to {@link less} .
 */
export function pop_heap<
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
  const bottom: RandomAccessIterator = last.prev();
  const temp: IPointer.ValueType<RandomAccessIterator> = bottom.value;

  bottom.value = first.value;
  _Adjust_heap(first, 0, distance(first, last) - 1, 0, temp, comp);
}

/* ---------------------------------------------------------
    SORT
--------------------------------------------------------- */
/**
 * Test whether the entire range satisfies heap order under `comp` .
 *
 * @param first Start of the range.
 * @param last Exclusive end of the range.
 * @param comp Strict ordering predicate. Return `true` when the first argument
 * precedes the second. Defaults to {@link less} .
 *
 * @return Whether the entire range is a heap.
 */
export function is_heap<
  RandomAccessIterator extends Readonly<
    IRandomAccessIterator<
      IPointer.ValueType<RandomAccessIterator>,
      RandomAccessIterator
    >
  >,
>(
  first: RandomAccessIterator,
  last: RandomAccessIterator,
  comp: Comparator<IPointer.ValueType<RandomAccessIterator>> = less,
): boolean {
  const it = is_heap_until(first, last, comp);
  return it.equals(last);
}

/**
 * Find the end of the longest prefix that is a heap under `comp` .
 *
 * @param first Start of the range.
 * @param last Exclusive end of the range.
 * @param comp Strict ordering predicate. Return `true` when the first argument
 * precedes the second. Defaults to {@link less} .
 *
 * @return The end of the heap prefix, or the end of the range when it is a
 * heap.
 */
export function is_heap_until<
  RandomAccessIterator extends Readonly<
    IRandomAccessIterator<
      IPointer.ValueType<RandomAccessIterator>,
      RandomAccessIterator
    >
  >,
>(
  first: RandomAccessIterator,
  last: RandomAccessIterator,
  comp: Comparator<IPointer.ValueType<RandomAccessIterator>> = less,
): RandomAccessIterator {
  let counter: number = 0;
  for (
    let child = first.next();
    _Comp_it(child, last.index());
    child = child.next(), counter ^= 1
  ) {
    if (comp(first.value, child.value)) return child;
    first = advance(first, counter);
  }
  return last;
}

/**
 * Sort an existing heap in place under the same ordering used to build it.
 *
 * @param first Start of the range.
 * @param last Exclusive end of the range.
 * @param comp Strict ordering predicate. Return `true` when the first argument
 * precedes the second. Defaults to {@link less} .
 */
export function sort_heap<
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
  for (; distance(first, last) > 1; last = last.prev())
    pop_heap(first, last, comp);
}

/* ---------------------------------------------------------
    INTERNAL
--------------------------------------------------------- */
function _Promote_heap<
  RandomAccessIterator extends General<
    IRandomAccessIterator<
      IPointer.ValueType<RandomAccessIterator>,
      RandomAccessIterator
    >
  >,
>(
  first: RandomAccessIterator,
  topPosition: number,
  position: number,
  value: IPointer.ValueType<RandomAccessIterator>,
  comp: Comparator<IPointer.ValueType<RandomAccessIterator>>,
): void {
  for (
    let parentPosition: number = (position - 1) >> 1;
    position > topPosition && comp(first.advance(parentPosition).value, value);
    parentPosition = (position - 1) >> 1
  ) {
    first.advance(position).value = first.advance(parentPosition).value;
    position = parentPosition;
  }
  first.advance(position).value = value;
}

function _Adjust_heap<
  RandomAccessIterator extends General<
    IRandomAccessIterator<
      IPointer.ValueType<RandomAccessIterator>,
      RandomAccessIterator
    >
  >,
>(
  first: RandomAccessIterator,
  topPosition: number,
  heapSize: number,
  position: number,
  value: IPointer.ValueType<RandomAccessIterator>,
  comp: Comparator<IPointer.ValueType<RandomAccessIterator>>,
): void {
  let childPosition: number = 2 * position + 2;
  for (; childPosition < heapSize; childPosition = 2 * childPosition + 2) {
    if (
      comp(
        first.advance(childPosition).value,
        first.advance(childPosition - 1).value,
      )
    )
      --childPosition;

    first.advance(position).value = first.advance(childPosition).value;
    position = childPosition;
  }

  if (childPosition === heapSize) {
    first.advance(position).value = first.advance(childPosition - 1).value;
    position = childPosition - 1;
  }
  _Promote_heap(first, topPosition, position, value, comp);
}

function _Comp_it(x: any, y: any): boolean {
  if (x.base instanceof Function) return y < x;
  else return x < y;
}
