import { IBidirectionalContainer } from "../container/IBidirectionalContainer";
import { IForwardContainer } from "../container/IForwardContainer";
import { IForwardIterator } from "../../iterator/IForwardIterator";
import { Writeonly } from "../../internal/functional/Writeonly";
import { Comparator } from "../../internal/functional/Comparator";
/**
 * Merge two sorted ranges.
 *
 * @param range1 The 1st iterable ranged container.
 * @param range2 The 2nd iterable ranged container.
 * @param output Output iterator of the first position.
 * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Default is {@link less}.
 *
 * @return Output Iterator of the last position by advancing.
 */
export declare function merge<Range1 extends Array<any> | IForwardContainer<any>, Range2 extends IForwardContainer.SimilarType<Range1>, OutputIterator extends Writeonly<IForwardIterator<IForwardContainer.ValueType<Range1>, OutputIterator>>>(range1: Range1, range2: Range2, output: OutputIterator, comp?: Comparator<IForwardContainer.ValueType<Range1>>): OutputIterator;
/**
 * Merge two sorted & consecutive ranges.
 *
 * @param range An iterable ranged container.
 * @param middle Bidirectional iterator of the initial position of the 2nd range.
 * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Default is {@link less}.
 */
export declare function inplace_merge<Range extends Array<any> | IBidirectionalContainer<any, any>>(range: Range, middle: IBidirectionalContainer.IteratorType<Range>, comp?: Comparator<IForwardContainer.ValueType<Range>>): void;
/**
 * Test whether two sorted ranges are in inclusion relationship.
 *
 * @param range1 The 1st iterable ranged container.
 * @param range2 The 2nd iterable ranged container.
 * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Default is {@link less}.
 *
 * @return Whether [first, last1) includes [first2, last2).
 */
export declare function includes<Range1 extends Array<any> | IForwardContainer<any>, Range2 extends IForwardContainer.SimilarType<Range1>>(range1: Range1, range2: Range2, comp?: Comparator<IForwardContainer.ValueType<Range1>>): boolean;
/**
 * Combine two sorted ranges to union relationship.
 *
 * @param range1 The 1st iterable ranged container.
 * @param range2 The 2nd iterable ranged container.
 * @param output Output iterator of the first position.
 * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Default is {@link less}.
 *
 * @return Output Iterator of the last position by advancing.
 */
export declare function set_union<Range1 extends Array<any> | IForwardContainer<any>, Range2 extends IForwardContainer.SimilarType<Range1>, OutputIterator extends Writeonly<IForwardIterator<IForwardContainer.ValueType<Range1>, OutputIterator>>>(range1: Range1, range2: Range2, output: OutputIterator, comp?: Comparator<IForwardContainer.ValueType<Range1>>): OutputIterator;
/**
 * Combine two sorted ranges to intersection relationship.
 *
 * @param range1 The 1st iterable ranged container.
 * @param range2 The 2nd iterable ranged container.
 * @param output Output iterator of the first position.
 * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Default is {@link less}.
 *
 * @return Output Iterator of the last position by advancing.
 */
export declare function set_intersection<Range1 extends Array<any> | IForwardContainer<any>, Range2 extends IForwardContainer.SimilarType<Range1>, OutputIterator extends Writeonly<IForwardIterator<IForwardContainer.ValueType<Range1>, OutputIterator>>>(range1: Range1, range2: Range2, output: OutputIterator, comp?: Comparator<IForwardContainer.ValueType<Range1>>): OutputIterator;
/**
 * Combine two sorted ranges to difference relationship.
 *
 * @param range1 The 1st iterable ranged container.
 * @param range2 The 2nd iterable ranged container.
 * @param output Output iterator of the first position.
 * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Default is {@link less}.
 *
 * @return Output Iterator of the last position by advancing.
 */
export declare function set_difference<Range1 extends Array<any> | IForwardContainer<any>, Range2 extends IForwardContainer.SimilarType<Range1>, OutputIterator extends Writeonly<IForwardIterator<IForwardContainer.ValueType<Range1>, OutputIterator>>>(range1: Range1, range2: Range2, output: OutputIterator, comp?: Comparator<IForwardContainer.ValueType<Range1>>): OutputIterator;
/**
 * Combine two sorted ranges to symmetric difference relationship.
 *
 * @param range1 The 1st iterable ranged container.
 * @param range2 The 2nd iterable ranged container.
 * @param output Output iterator of the first position.
 * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Default is {@link less}.
 *
 * @return Output Iterator of the last position by advancing.
 */
export declare function set_symmetric_difference<Range1 extends Array<any> | IForwardContainer<any>, Range2 extends IForwardContainer.SimilarType<Range1>, OutputIterator extends Writeonly<IForwardIterator<IForwardContainer.ValueType<Range1>, OutputIterator>>>(range1: Range1, range2: Range2, output: OutputIterator, comp?: Comparator<IForwardContainer.ValueType<Range1>>): OutputIterator;
//# sourceMappingURL=merge.d.ts.map