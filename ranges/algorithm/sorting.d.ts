import { IForwardContainer } from "../container/IForwardContainer";
import { IRandomAccessContainer } from "../container/IRandomAccessContainer";
import { Comparator } from "../../internal/functional/Comparator";
/**
 * Sort elements in range.
 *
 * @param range An iterable ranged container.
 * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Default is {@link less}.
 */
export declare function sort<Range extends Array<any> | IRandomAccessContainer<any>>(range: Range, comp?: Comparator<IForwardContainer.ValueType<Range>>): void;
/**
 * Sort elements in range stably.
 *
 * @param range An iterable ranged container.
 * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Default is {@link less}.
 */
export declare function stable_sort<Range extends Array<any> | IRandomAccessContainer<any>>(range: Range, comp?: Comparator<IForwardContainer.ValueType<Range>>): void;
/**
 * Sort elements in range partially.
 *
 * @param range An iterable ranged container.
 * @param middle Random access iterator of the middle position between [first, last). Elements only in [first, middle) are fully sorted.
 * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Default is {@link less}.
 */
export declare function partial_sort<Range extends Array<any> | IRandomAccessContainer<any>>(range: Range, middle: IRandomAccessContainer.IteratorType<Range>, comp?: Comparator<IForwardContainer.ValueType<Range>>): void;
/**
 * Copy elements in range with partial sort.
 *
 * @param range An iterable ranged container of input.
 * @param output An iterable ranged container of output.
 *
 * @return Output Iterator of the last position by advancing.
 */
export declare function partial_sort_copy<Range extends Array<any> | IForwardContainer<any>, Output extends Array<any> | IForwardContainer<any>>(range: Range, output: Output, comp?: Comparator<IForwardContainer.ValueType<Range>>): IForwardContainer.IteratorType<Output>;
/**
 * Rearrange for the n'th element.
 *
 * @param range An iterable ranged container.
 * @param nth Random access iterator the n'th position.
 * @param last Random access iterator of the last position.
 * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Default is {@link less}.
 */
export declare function nth_element<Range extends Array<any> | IRandomAccessContainer<any>>(range: Range, nth: IRandomAccessContainer.IteratorType<Range>, comp?: Comparator<IForwardContainer.ValueType<Range>>): void;
/**
 * Test whether a range is sorted.
 *
 * @param range An iterable ranged container.
 * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Default is {@link less}.
 *
 * @return Whether sorted or not.
 */
export declare function is_sorted<Range extends Array<any> | IForwardContainer<any>>(range: Range, comp?: Comparator<IForwardContainer.ValueType<Range>>): boolean;
/**
 * Find the first unsorted element in range.
 *
 * @param range An iterable ranged container.
 * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Default is {@link less}.
 *
 * @return Iterator to the first element who violates the order.
 */
export declare function is_sorted_until<Range extends Array<any> | IForwardContainer<any>>(range: Range, comp?: Comparator<IForwardContainer.ValueType<Range>>): IForwardContainer.IteratorType<Range>;
//# sourceMappingURL=sorting.d.ts.map