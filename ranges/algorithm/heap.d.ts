import { IRandomAccessContainer } from "../container/IRandomAccessContainer";
import { Comparator } from "../../internal/functional/Comparator";
/**
 * Make a heap.
 *
 * @param range An iterable ranged container.
 * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Default is {@link less}.
 */
export declare function make_heap<Range extends Array<any> | IRandomAccessContainer<any>>(range: Range, comp?: Comparator<IRandomAccessContainer.ValueType<Range>>): void;
/**
 * Push an element into heap.
 *
 * @param range An iterable ranged container.
 * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Default is {@link less}.
 */
export declare function push_heap<Range extends Array<any> | IRandomAccessContainer<any>>(range: Range, comp?: Comparator<IRandomAccessContainer.ValueType<Range>>): void;
/**
 * Pop an element from heap.
 *
 * @param range An iterable ranged container.
 * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Default is {@link less}.
 */
export declare function pop_heap<Range extends Array<any> | IRandomAccessContainer<any>>(range: Range, comp?: Comparator<IRandomAccessContainer.ValueType<Range>>): void;
/**
 * Test whether a range is heap.
 *
 * @param range An iterable ranged container.
 * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Default is {@link less}.
 *
 * @return Whether the range is heap.
 */
export declare function is_heap<Range extends Array<any> | IRandomAccessContainer<any>>(range: Range, comp?: Comparator<IRandomAccessContainer.ValueType<Range>>): boolean;
/**
 * Find the first element not in heap order.
 *
 * @param range An iterable ranged container.
 * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Default is {@link less}.
 *
 * @return Iterator to the first element not in heap order.
 */
export declare function is_heap_until<Range extends Array<any> | IRandomAccessContainer<any>>(range: Range, comp?: Comparator<IRandomAccessContainer.ValueType<Range>>): IRandomAccessContainer.IteratorType<Range>;
/**
 * Sort elements of a heap.
 *
 * @param range An iterable ranged container.
 * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Default is {@link less}.
 */
export declare function sort_heap<Range extends Array<any> | IRandomAccessContainer<any>>(range: Range, comp?: Comparator<IRandomAccessContainer.ValueType<Range>>): void;
//# sourceMappingURL=heap.d.ts.map