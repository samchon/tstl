/**
 * @packageDocumentation
 * @module std
 */
import { IRandomAccessIterator } from "../iterator/IRandomAccessIterator";
import { IPointer } from "../functional/IPointer";
import { Comparator } from "../internal/functional/Comparator";
import { General } from "../internal/functional/General";
/**
 * Make a heap.
 *
 * @param first Random access iteartor of the first position.
 * @param last Random access iterator of the last position.
 * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Default is {@link less}.
 */
export declare function make_heap<RandomAccessIterator extends General<IRandomAccessIterator<IPointer.ValueType<RandomAccessIterator>, RandomAccessIterator>>>(first: RandomAccessIterator, last: RandomAccessIterator, comp?: Comparator<IPointer.ValueType<RandomAccessIterator>>): void;
/**
 * Push an element into heap.
 *
 * @param first Random access iteartor of the first position.
 * @param last Random access iterator of the last position.
 * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Default is {@link less}.
 */
export declare function push_heap<RandomAccessIterator extends General<IRandomAccessIterator<IPointer.ValueType<RandomAccessIterator>, RandomAccessIterator>>>(first: RandomAccessIterator, last: RandomAccessIterator, comp?: Comparator<IPointer.ValueType<RandomAccessIterator>>): void;
/**
 * Pop an element from heap.
 *
 * @param first Random access iteartor of the first position.
 * @param last Random access iterator of the last position.
 * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Default is {@link less}.
 */
export declare function pop_heap<RandomAccessIterator extends General<IRandomAccessIterator<IPointer.ValueType<RandomAccessIterator>, RandomAccessIterator>>>(first: RandomAccessIterator, last: RandomAccessIterator, comp?: Comparator<IPointer.ValueType<RandomAccessIterator>>): void;
/**
 * Test whether a range is heap.
 *
 * @param first Bi-directional iteartor of the first position.
 * @param last Bi-directional iterator of the last position.
 * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Default is {@link less}.
 *
 * @return Whether the range is heap.
 */
export declare function is_heap<RandomAccessIterator extends Readonly<IRandomAccessIterator<IPointer.ValueType<RandomAccessIterator>, RandomAccessIterator>>>(first: RandomAccessIterator, last: RandomAccessIterator, comp?: Comparator<IPointer.ValueType<RandomAccessIterator>>): boolean;
/**
 * Find the first element not in heap order.
 *
 * @param first Bi-directional iteartor of the first position.
 * @param last Bi-directional iterator of the last position.
 * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Default is {@link less}.
 *
 * @return Iterator to the first element not in heap order.
 */
export declare function is_heap_until<RandomAccessIterator extends Readonly<IRandomAccessIterator<IPointer.ValueType<RandomAccessIterator>, RandomAccessIterator>>>(first: RandomAccessIterator, last: RandomAccessIterator, comp?: Comparator<IPointer.ValueType<RandomAccessIterator>>): RandomAccessIterator;
/**
 * Sort elements of a heap.
 *
 * @param first Random access iteartor of the first position.
 * @param last Random access iterator of the last position.
 * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Default is {@link less}.
 */
export declare function sort_heap<RandomAccessIterator extends General<IRandomAccessIterator<IPointer.ValueType<RandomAccessIterator>, RandomAccessIterator>>>(first: RandomAccessIterator, last: RandomAccessIterator, comp?: Comparator<IPointer.ValueType<RandomAccessIterator>>): void;
//# sourceMappingURL=heap.d.ts.map