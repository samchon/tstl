import { IBidirectionalContainer } from "../container/IBidirectionalContainer";
import { IForwardContainer } from "../container/IForwardContainer";
import { Pair } from "../../utility/Pair";
import { Comparator } from "../../internal/functional/Comparator";
/**
 * Get the minimum element in range.
 *
 * @param range An iterable ranged container.
 * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Default is {@link less}.
 *
 * @return Iterator to the minimum element.
 */
export declare function min_element<Range extends Array<any> | IForwardContainer<any>>(range: Range, comp?: Comparator<IForwardContainer.ValueType<Range>>): IForwardContainer.IteratorType<Range>;
/**
 * Get the maximum element in range.
 *
 * @param range An iterable ranged container.
 * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Default is {@link less}.
 *
 * @return Iterator to the maximum element.
 */
export declare function max_element<Range extends Array<any> | IForwardContainer<any>>(range: Range, comp?: Comparator<IForwardContainer.ValueType<Range>>): IForwardContainer.IteratorType<Range>;
/**
 * Get the minimum & maximum elements in range.
 *
 * @param range An iterable ranged container.
 * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Default is {@link less}.
 *
 * @return A {@link Pair} of iterators to the minimum & maximum elements.
 */
export declare function minmax_element<Range extends Array<any> | IForwardContainer<any>>(range: Range, comp?: Comparator<IForwardContainer.ValueType<Range>>): Pair<IForwardContainer.IteratorType<Range>, IForwardContainer.IteratorType<Range>>;
/**
 * Test whether two ranges are in permutation relationship.
 *
 * @param range1 The 1st iterable ranged container.
 * @param range2 The 2nd iterable ranged container.
 * @param pred A binary function predicates two arguments are equal. Default is {@link equal_to}.
 *
 * @return Whether permutation or not.
 */
export declare function is_permutation<Range1 extends Array<any> | IForwardContainer<any>, Range2 extends IForwardContainer.SimilarType<Range1>>(range1: Range1, range2: Range2, pred?: Comparator<IForwardContainer.ValueType<Range1>>): boolean;
/**
 * Transform to the previous permutation.
 *
 * @param range An iterable ranged container.
 * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Default is {@link less}.
 *
 * @return Whether the transformation was meaningful.
 */
export declare function prev_permutation<Range extends Array<any> | IBidirectionalContainer<any, any>>(range: Range, comp?: Comparator<IForwardContainer.ValueType<Range>>): boolean;
/**
 * Transform to the next permutation.
 *
 * @param range An iterable ranged container.
 * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Default is {@link less}.
 *
 * @return Whether the transformation was meaningful.
 */
export declare function next_permutation<Range extends Array<any> | IBidirectionalContainer<any, any>>(range: Range, comp?: Comparator<IForwardContainer.ValueType<Range>>): boolean;
//# sourceMappingURL=mathematics.d.ts.map