import { IForwardContainer } from "../container/IForwardContainer";
import { Pair } from "../../utility/Pair";
import { Comparator } from "../../internal/functional/Comparator";
/**
 * Get iterator to lower bound.
 *
 * @param range An iterable ranged container.
 * @param val Value to search for.
 * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Default is {@link less}.
 *
 * @return Iterator to the first element equal or after the val.
 */
export declare function lower_bound<Range extends Array<any> | IForwardContainer<any>>(range: Range, val: IForwardContainer.ValueType<Range>, comp?: Comparator<IForwardContainer.ValueType<Range>>): IForwardContainer.IteratorType<Range>;
/**
 * Get iterator to upper bound.
 *
 * @param range An iterable ranged container.
 * @param val Value to search for.
 * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Default is {@link less}.
 *
 * @return Iterator to the first element after the key.
 */
export declare function upper_bound<Range extends Array<any> | IForwardContainer<any>>(range: Range, val: IForwardContainer.ValueType<Range>, comp?: Comparator<IForwardContainer.ValueType<Range>>): IForwardContainer.IteratorType<Range>;
/**
 * Get range of equal elements.
 *
 * @param range An iterable ranged container.
 * @param val Value to search for.
 * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Default is {@link less}.
 *
 * @return Pair of {@link lower_bound} and {@link upper_bound}.
 */
export declare function equal_range<Range extends Array<any> | IForwardContainer<any>>(range: Range, val: IForwardContainer.ValueType<Range>, comp?: Comparator<IForwardContainer.ValueType<Range>>): Pair<IForwardContainer.IteratorType<Range>, IForwardContainer.IteratorType<Range>>;
/**
 * Test whether a value exists in sorted range.
 *
 * @param range An iterable ranged container.
 * @param val Value to search for.
 * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Default is {@link less}.
 *
 * @return Whether the value exists or not.
 */
export declare function binary_search<Range extends Array<any> | IForwardContainer<any>>(range: Range, val: IForwardContainer.ValueType<Range>, comp?: Comparator<IForwardContainer.ValueType<Range>>): boolean;
//# sourceMappingURL=binary_search.d.ts.map