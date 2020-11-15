/**
 * @packageDocumentation
 * @module std
 */
import { IForwardIterator } from "../iterator/IForwardIterator";
import { IPointer } from "../functional/IPointer";
import { Pair } from "../utility/Pair";
import { Comparator } from "../internal/functional/Comparator";
/**
 * Get iterator to lower bound.
 *
 * @param first Input iterator of the first position.
 * @param last Input iterator of the last position.
 * @param val Value to search for.
 * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Default is {@link less}.
 *
 * @return Iterator to the first element equal or after the val.
 */
export declare function lower_bound<ForwardIterator extends Readonly<IForwardIterator<IPointer.ValueType<ForwardIterator>, ForwardIterator>>>(first: ForwardIterator, last: ForwardIterator, val: IPointer.ValueType<ForwardIterator>, comp?: Comparator<IPointer.ValueType<ForwardIterator>>): ForwardIterator;
/**
 * Get iterator to upper bound.
 *
 * @param first Input iterator of the first position.
 * @param last Input iterator of the last position.
 * @param val Value to search for.
 * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Default is {@link less}.
 *
 * @return Iterator to the first element after the key.
 */
export declare function upper_bound<ForwardIterator extends Readonly<IForwardIterator<IPointer.ValueType<ForwardIterator>, ForwardIterator>>>(first: ForwardIterator, last: ForwardIterator, val: IPointer.ValueType<ForwardIterator>, comp?: Comparator<IPointer.ValueType<ForwardIterator>>): ForwardIterator;
/**
 * Get range of equal elements.
 *
 * @param first Input iterator of the first position.
 * @param last Input iterator of the last position.
 * @param val Value to search for.
 * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Default is {@link less}.
 *
 * @return Pair of {@link lower_bound} and {@link upper_bound}.
 */
export declare function equal_range<ForwardIterator extends Readonly<IForwardIterator<IPointer.ValueType<ForwardIterator>, ForwardIterator>>>(first: ForwardIterator, last: ForwardIterator, val: IPointer.ValueType<ForwardIterator>, comp?: Comparator<IPointer.ValueType<ForwardIterator>>): Pair<ForwardIterator, ForwardIterator>;
/**
 * Test whether a value exists in sorted range.
 *
 * @param first Input iterator of the first position.
 * @param last Input iterator of the last position.
 * @param val Value to search for.
 * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Default is {@link less}.
 *
 * @return Whether the value exists or not.
 */
export declare function binary_search<ForwardIterator extends Readonly<IForwardIterator<IPointer.ValueType<ForwardIterator>, ForwardIterator>>>(first: ForwardIterator, last: ForwardIterator, val: IPointer.ValueType<ForwardIterator>, comp?: Comparator<IPointer.ValueType<ForwardIterator>>): boolean;
//# sourceMappingURL=binary_search.d.ts.map