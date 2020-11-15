/**
 * @packageDocumentation
 * @module std
 */
import { IForwardIterator } from "../iterator/IForwardIterator";
import { IBidirectionalIterator } from "../iterator/IBidirectionalIterator";
import { IPointer } from "../functional/IPointer";
import { General } from "../internal/functional/General";
import { Writeonly } from "../internal/functional/Writeonly";
import { Comparator } from "../internal/functional/Comparator";
/**
 * Merge two sorted ranges.
 *
 * @param first1 Input iteartor of the first position of the 1st range.
 * @param last1 Input iterator of the last position of the 1st range.
 * @param first2 Input iterator of the first position of the 2nd range.
 * @param last2 Input iterator of the last position of the 2nd range.
 * @param output Output iterator of the first position.
 * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Default is {@link less}.
 *
 * @return Output Iterator of the last position by advancing.
 */
export declare function merge<InputIterator1 extends Readonly<IForwardIterator<IPointer.ValueType<InputIterator1>, InputIterator1>>, InputIterator2 extends Readonly<IForwardIterator<IPointer.ValueType<InputIterator1>, InputIterator2>>, OutputIterator extends Writeonly<IForwardIterator<IPointer.ValueType<InputIterator1>, OutputIterator>>>(first1: InputIterator1, last1: InputIterator1, first2: InputIterator2, last2: InputIterator2, output: OutputIterator, comp?: Comparator<IPointer.ValueType<InputIterator1>>): OutputIterator;
/**
 * Merge two sorted & consecutive ranges.
 *
 * @param first Bidirectional iterator of the first position.
 * @param middle Bidirectional iterator of the initial position of the 2nd range.
 * @param last Bidirectional iterator of the last position.
 * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Default is {@link less}.
 */
export declare function inplace_merge<BidirectionalIterator extends General<IBidirectionalIterator<IPointer.ValueType<BidirectionalIterator>, BidirectionalIterator>>>(first: BidirectionalIterator, middle: BidirectionalIterator, last: BidirectionalIterator, comp?: Comparator<IPointer.ValueType<BidirectionalIterator>>): void;
/**
 * Test whether two sorted ranges are in inclusion relationship.
 *
 * @param first1 Input iteartor of the first position of the 1st range.
 * @param last1 Input iterator of the last position of the 1st range.
 * @param first2 Input iterator of the first position of the 2nd range.
 * @param last2 Input iterator of the last position of the 2nd range.
 * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Default is {@link less}.
 *
 * @return Whether [first, last1) includes [first2, last2).
 */
export declare function includes<InputIterator1 extends Readonly<IForwardIterator<IPointer.ValueType<InputIterator1>, InputIterator1>>, InputIterator2 extends Readonly<IForwardIterator<IPointer.ValueType<InputIterator1>, InputIterator2>>>(first1: InputIterator1, last1: InputIterator1, first2: InputIterator2, last2: InputIterator2, comp?: Comparator<IPointer.ValueType<InputIterator1>>): boolean;
/**
 * Combine two sorted ranges to union relationship.
 *
 * @param first1 Input iteartor of the first position of the 1st range.
 * @param last1 Input iterator of the last position of the 1st range.
 * @param first2 Input iterator of the first position of the 2nd range.
 * @param last2 Input iterator of the last position of the 2nd range.
 * @param output Output iterator of the first position.
 * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Default is {@link less}.
 *
 * @return Output Iterator of the last position by advancing.
 */
export declare function set_union<InputIterator1 extends Readonly<IForwardIterator<IPointer.ValueType<InputIterator1>, InputIterator1>>, InputIterator2 extends Readonly<IForwardIterator<IPointer.ValueType<InputIterator1>, InputIterator2>>, OutputIterator extends Writeonly<IForwardIterator<IPointer.ValueType<InputIterator1>, OutputIterator>>>(first1: InputIterator1, last1: InputIterator1, first2: InputIterator2, last2: InputIterator2, output: OutputIterator, comp?: Comparator<IPointer.ValueType<InputIterator1>>): OutputIterator;
/**
 * Combine two sorted ranges to intersection relationship.
 *
 * @param first1 Input iteartor of the first position of the 1st range.
 * @param last1 Input iterator of the last position of the 1st range.
 * @param first2 Input iterator of the first position of the 2nd range.
 * @param last2 Input iterator of the last position of the 2nd range.
 * @param output Output iterator of the first position.
 * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Default is {@link less}.
 *
 * @return Output Iterator of the last position by advancing.
 */
export declare function set_intersection<InputIterator1 extends Readonly<IForwardIterator<IPointer.ValueType<InputIterator1>, InputIterator1>>, InputIterator2 extends Readonly<IForwardIterator<IPointer.ValueType<InputIterator1>, InputIterator2>>, OutputIterator extends Writeonly<IForwardIterator<IPointer.ValueType<InputIterator1>, OutputIterator>>>(first1: InputIterator1, last1: InputIterator1, first2: InputIterator2, last2: InputIterator2, output: OutputIterator, comp?: Comparator<IPointer.ValueType<InputIterator1>>): OutputIterator;
/**
 * Combine two sorted ranges to difference relationship.
 *
 * @param first1 Input iteartor of the first position of the 1st range.
 * @param last1 Input iterator of the last position of the 1st range.
 * @param first2 Input iterator of the first position of the 2nd range.
 * @param last2 Input iterator of the last position of the 2nd range.
 * @param output Output iterator of the first position.
 * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Default is {@link less}.
 *
 * @return Output Iterator of the last position by advancing.
 */
export declare function set_difference<InputIterator1 extends Readonly<IForwardIterator<IPointer.ValueType<InputIterator1>, InputIterator1>>, InputIterator2 extends Readonly<IForwardIterator<IPointer.ValueType<InputIterator1>, InputIterator2>>, OutputIterator extends Writeonly<IForwardIterator<IPointer.ValueType<InputIterator1>, OutputIterator>>>(first1: InputIterator1, last1: InputIterator1, first2: InputIterator2, last2: InputIterator2, output: OutputIterator, comp?: Comparator<IPointer.ValueType<InputIterator1>>): OutputIterator;
/**
 * Combine two sorted ranges to symmetric difference relationship.
 *
 * @param first1 Input iteartor of the first position of the 1st range.
 * @param last1 Input iterator of the last position of the 1st range.
 * @param first2 Input iterator of the first position of the 2nd range.
 * @param last2 Input iterator of the last position of the 2nd range.
 * @param output Output iterator of the first position.
 * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Default is {@link less}.
 *
 * @return Output Iterator of the last position by advancing.
 */
export declare function set_symmetric_difference<InputIterator1 extends Readonly<IForwardIterator<IPointer.ValueType<InputIterator1>, InputIterator1>>, InputIterator2 extends Readonly<IForwardIterator<IPointer.ValueType<InputIterator1>, InputIterator2>>, OutputIterator extends Writeonly<IForwardIterator<IPointer.ValueType<InputIterator1>, OutputIterator>>>(first1: InputIterator1, last1: InputIterator1, first2: InputIterator2, last2: InputIterator2, output: OutputIterator, comp?: Comparator<IPointer.ValueType<InputIterator1>>): OutputIterator;
//# sourceMappingURL=merge.d.ts.map