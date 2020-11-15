/**
 * @packageDocumentation
 * @module std
 */
import { IForwardIterator } from "../iterator/IForwardIterator";
import { IRandomAccessIterator } from "../iterator/IRandomAccessIterator";
import { IPointer } from "../functional/IPointer";
import { General } from "../internal/functional/General";
import { Comparator } from "../internal/functional/Comparator";
/**
 * Sort elements in range.
 *
 * @param first Random access iterator of the first position.
 * @param last Random access iterator of the last position.
 * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Default is {@link less}.
 */
export declare function sort<RandomAccessIterator extends General<IRandomAccessIterator<IPointer.ValueType<RandomAccessIterator>, RandomAccessIterator>>>(first: RandomAccessIterator, last: RandomAccessIterator, comp?: Comparator<IPointer.ValueType<RandomAccessIterator>>): void;
/**
 * Sort elements in range stably.
 *
 * @param first Random access iterator of the first position.
 * @param last Random access iterator of the last position.
 * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Default is {@link less}.
 */
export declare function stable_sort<RandomAccessIterator extends General<IRandomAccessIterator<IPointer.ValueType<RandomAccessIterator>, RandomAccessIterator>>>(first: RandomAccessIterator, last: RandomAccessIterator, comp?: Comparator<IPointer.ValueType<RandomAccessIterator>>): void;
/**
 * Sort elements in range partially.
 *
 * @param first Random access iterator of the first position.
 * @param middle Random access iterator of the middle position between [first, last). Elements only in [first, middle) are fully sorted.
 * @param last Random access iterator of the last position.
 * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Default is {@link less}.
 */
export declare function partial_sort<RandomAccessIterator extends General<IRandomAccessIterator<IPointer.ValueType<RandomAccessIterator>, RandomAccessIterator>>>(first: RandomAccessIterator, middle: RandomAccessIterator, last: RandomAccessIterator, comp?: Comparator<IPointer.ValueType<RandomAccessIterator>>): void;
/**
 * Copy elements in range with partial sort.
 *
 * @param first Input iteartor of the first position.
 * @param last Input iterator of the last position.
 * @param output_first Output iterator of the first position.
 * @param output_last Output iterator of the last position.
 * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Default is {@link less}.
 *
 * @return Output Iterator of the last position by advancing.
 */
export declare function partial_sort_copy<InputIterator extends Readonly<IForwardIterator<IPointer.ValueType<InputIterator>, InputIterator>>, OutputIterator extends General<IForwardIterator<IPointer.ValueType<InputIterator>, OutputIterator>>>(first: InputIterator, last: InputIterator, output_first: OutputIterator, output_last: OutputIterator, comp?: Comparator<IPointer.ValueType<InputIterator>>): OutputIterator;
/**
 * Rearrange for the n'th element.
 *
 * @param first Random access iterator of the first position.
 * @param nth Random access iterator the n'th position.
 * @param last Random access iterator of the last position.
 * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Default is {@link less}.
 */
export declare function nth_element<RandomAccessIterator extends General<IRandomAccessIterator<IPointer.ValueType<RandomAccessIterator>, RandomAccessIterator>>>(first: RandomAccessIterator, nth: RandomAccessIterator, last: RandomAccessIterator, comp?: Comparator<IPointer.ValueType<RandomAccessIterator>>): void;
/**
 * Test whether a range is sorted.
 *
 * @param first Input iterator of the first position.
 * @param last Input iterator of the last position.
 * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Default is {@link less}.
 *
 * @return Whether sorted or not.
 */
export declare function is_sorted<InputIterator extends Readonly<IForwardIterator<IPointer.ValueType<InputIterator>, InputIterator>>>(first: InputIterator, last: InputIterator, comp?: Comparator<IPointer.ValueType<InputIterator>>): boolean;
/**
 * Find the first unsorted element in range.
 *
 * @param first Input iterator of the first position.
 * @param last Input iterator of the last position.
 * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Default is {@link less}.
 *
 * @return Iterator to the first element who violates the order.
 */
export declare function is_sorted_until<InputIterator extends Readonly<IForwardIterator<IPointer.ValueType<InputIterator>, InputIterator>>>(first: InputIterator, last: InputIterator, comp?: Comparator<IPointer.ValueType<InputIterator>>): InputIterator;
//# sourceMappingURL=sorting.d.ts.map