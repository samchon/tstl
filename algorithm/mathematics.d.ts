/**
 * @packageDocumentation
 * @module std
 */
import { IForwardIterator } from "../iterator/IForwardIterator";
import { IBidirectionalIterator } from "../iterator/IBidirectionalIterator";
import { IPointer } from "../functional/IPointer";
import { General } from "../internal/functional/General";
import { Pair } from "../utility/Pair";
import { Comparator } from "../internal/functional/Comparator";
/**
 * Get the minium value.
 *
 * @param items Items to search through.
 * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Default is {@link less}.
 *
 * @return The minimum value.
 */
export declare function min<T>(items: T[], comp?: Comparator<T>): T;
/**
 * Get the maximum value.
 *
 * @param items Items to search through.
 * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Default is {@link less}.
 *
 * @return The maximum value.
 */
export declare function max<T>(items: T[], comp?: Comparator<T>): T;
/**
 * Get the minimum & maximum values.
 *
 * @param items Items to search through.
 * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Default is {@link less}.
 *
 * @return A {@link Pair} of minimum & maximum values.
 */
export declare function minmax<T>(items: T[], comp: Comparator<T>): Pair<T, T>;
/**
 * Get the minimum element in range.
 *
 * @param first Forward iterator of the first position.
 * @param last Forward iterator of the last position.
 * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Default is {@link less}.
 *
 * @return Iterator to the minimum element.
 */
export declare function min_element<ForwardIterator extends Readonly<IForwardIterator<IPointer.ValueType<ForwardIterator>, ForwardIterator>>>(first: ForwardIterator, last: ForwardIterator, comp?: Comparator<IPointer.ValueType<ForwardIterator>>): ForwardIterator;
/**
 * Get the maximum element in range.
 *
 * @param first Forward iterator of the first position.
 * @param last Forward iterator of the last position.
 * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Default is {@link less}.
 *
 * @return Iterator to the maximum element.
 */
export declare function max_element<ForwardIterator extends Readonly<IForwardIterator<IPointer.ValueType<ForwardIterator>, ForwardIterator>>>(first: ForwardIterator, last: ForwardIterator, comp?: Comparator<IPointer.ValueType<ForwardIterator>>): ForwardIterator;
/**
 * Get the minimum & maximum elements in range.
 *
 * @param first Forward iterator of the first position.
 * @param last Forward iterator of the last position.
 * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Default is {@link less}.
 *
 * @return A {@link Pair} of iterators to the minimum & maximum elements.
 */
export declare function minmax_element<ForwardIterator extends Readonly<IForwardIterator<IPointer.ValueType<ForwardIterator>, ForwardIterator>>>(first: ForwardIterator, last: ForwardIterator, comp?: Comparator<IPointer.ValueType<ForwardIterator>>): Pair<ForwardIterator, ForwardIterator>;
/**
 * Get the clamp value.
 *
 * @param v The value to clamp.
 * @param lo Lower value than *hi*.
 * @param hi Higher value than *lo*.
 * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Default is {@link less}.
 *
 * @return The clamp value.
 */
export declare function clamp<T>(v: T, lo: T, hi: T, comp?: Comparator<T>): T;
/**
 * Test whether two ranges are in permutation relationship.
 *
 * @param first1 Forward iteartor of the first position of the 1st range.
 * @param last1 Forward iterator of the last position of the 1st range.
 * @param first2 Forward iterator of the first position of the 2nd range.
 * @param pred A binary function predicates two arguments are equal. Default is {@link equal_to}.
 *
 * @return Whether permutation or not.
 */
export declare function is_permutation<ForwardIterator1 extends Readonly<IForwardIterator<IPointer.ValueType<ForwardIterator1>, ForwardIterator1>>, ForwardIterator2 extends Readonly<IForwardIterator<IPointer.ValueType<ForwardIterator1>, ForwardIterator2>>>(first1: ForwardIterator1, last1: ForwardIterator1, first2: ForwardIterator2, pred?: Comparator<IPointer.ValueType<ForwardIterator1>>): boolean;
/**
 * Transform to the previous permutation.
 *
 * @param first Bidirectional iterator of the first position.
 * @param last Bidirectional iterator of the last position.
 * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Default is {@link less}.
 *
 * @return Whether the transformation was meaningful.
 */
export declare function prev_permutation<BidirectionalIterator extends General<IBidirectionalIterator<IPointer.ValueType<BidirectionalIterator>, BidirectionalIterator>>>(first: BidirectionalIterator, last: BidirectionalIterator, comp?: Comparator<IPointer.ValueType<BidirectionalIterator>>): boolean;
/**
 * Transform to the next permutation.
 *
 * @param first Bidirectional iterator of the first position.
 * @param last Bidirectional iterator of the last position.
 * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Default is {@link less}.
 *
 * @return Whether the transformation was meaningful.
 */
export declare function next_permutation<BidirectionalIterator extends General<IBidirectionalIterator<IPointer.ValueType<BidirectionalIterator>, BidirectionalIterator>>>(first: BidirectionalIterator, last: BidirectionalIterator, comp?: Comparator<IPointer.ValueType<BidirectionalIterator>>): boolean;
//# sourceMappingURL=mathematics.d.ts.map