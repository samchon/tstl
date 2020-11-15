import { IForwardContainer } from "../container/IForwardContainer";
import { Pair } from "../../utility/Pair";
import { UnaryPredicator } from "../../internal/functional/UnaryPredicator";
import { BinaryPredicator } from "../../internal/functional/BinaryPredicator";
import { Comparator } from "../../internal/functional/Comparator";
declare type BinaryPredicatorInferrer<Range1 extends Array<any> | IForwardContainer<any>, Range2 extends Array<any> | IForwardContainer<any>> = BinaryPredicator<IForwardContainer.ValueType<Range1>, IForwardContainer.ValueType<Range2>>;
/**
 * Apply a function to elements in range.
 *
 * @param range An iterable ranged container.
 * @param fn The function to apply.
 *
 * @return The function *fn* itself.
 */
export declare function for_each<Range extends Array<any> | IForwardContainer<any>, Func extends (val: IForwardContainer.ValueType<Range>) => any>(range: Range, fn: Func): Func;
/**
 * Apply a function to elements in steps.
 *
 * @param range An iterable ranged container.
 * @param n Steps to maximum advance.
 * @param fn The function to apply.
 *
 * @return Iterator advanced from *first* for *n* steps.
 */
export declare function for_each_n<Range extends Array<any> | IForwardContainer<any>, Func extends (val: IForwardContainer.ValueType<Range>) => any>(range: Range, n: number, fn: Func): IForwardContainer.IteratorType<Range>;
/**
 * Test whether all elements meet a specific condition.
 *
 * @param range An iterable ranged container.
 * @param pred A function predicates the specific condition.
 *
 * @return Whether the *pred* returns always `true` for all elements.
 */
export declare function all_of<Range extends Array<any> | IForwardContainer<any>>(range: Range, pred: UnaryPredicator<IForwardContainer.ValueType<Range>>): boolean;
/**
 * Test whether any element meets a specific condition.
 *
 * @param range An iterable ranged container.
 * @param pred A function predicates the specific condition.
 *
 * @return Whether the *pred* returns at least a `true` for all elements.
 */
export declare function any_of<Range extends Array<any> | IForwardContainer<any>>(range: Range, pred: UnaryPredicator<IForwardContainer.ValueType<Range>>): boolean;
/**
 * Test whether any element doesn't meet a specific condition.
 *
 * @param range An iterable ranged container.
 * @param pred A function predicates the specific condition.
 *
 * @return Whether the *pred* doesn't return `true` for all elements.
 */
export declare function none_of<Range extends Array<any> | IForwardContainer<any>>(range: Range, pred: UnaryPredicator<IForwardContainer.ValueType<Range>>): boolean;
/**
 * Test whether two ranges are equal.
 *
 * @param range1 The 1st iterable ranged container.
 * @param range2 The 2nd iterable ranged container.
 * @param pred A binary function predicates two arguments are equal.
 *
 * @return Whether two ranges are equal.
 */
export declare function equal<Range1 extends Array<any> | (IForwardContainer<any>), Range2 extends IForwardContainer.SimilarType<Range1>>(range1: Range1, range2: Range2): boolean;
/**
* Test whether two ranges are equal.
*
* @param range1 The 1st iterable ranged container.
* @param range2 The 2nd iterable ranged container.
* @param pred A binary function predicates two arguments are equal.
*
* @return Whether two ranges are equal.
*/
export declare function equal<Range1 extends Array<any> | IForwardContainer<any>, Range2 extends Array<any> | IForwardContainer<any>>(range1: Range1, range2: Range2, pred: BinaryPredicatorInferrer<Range1, Range2>): boolean;
/**
 * Compare lexicographically.
 *
 * @param range1 The 1st iterable ranged container.
 * @param range2 The 2nd iterable ranged container.
 * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Default is {@link less}.
 *
 * @return Whether the 1st range precedes the 2nd.
 */
export declare function lexicographical_compare<Range1 extends Array<any> | IForwardContainer<any>, Range2 extends IForwardContainer.SimilarType<Range1>>(range1: Range1, range2: Range2, comp?: BinaryPredicatorInferrer<Range1, Range1>): boolean;
/**
 * Find a value in range.
 *
 * @param range An iterable ranged container.
 * @param val The value to find.
 *
 * @return Iterator to the first element {@link equal to equal_to} the value.
 */
export declare function find<Range extends Array<any> | IForwardContainer<any>>(range: Range, val: IForwardContainer.ValueType<Range>): IForwardContainer.IteratorType<Range>;
/**
 * Find a matched condition in range.
 *
 * @param range An iterable ranged container.
 * @param pred A function predicates the specific condition.
 *
 * @return Iterator to the first element *pred* returns `true`.
 */
export declare function find_if<Range extends Array<any> | IForwardContainer<any>>(range: Range, pred: UnaryPredicator<IForwardContainer.ValueType<Range>>): IForwardContainer.IteratorType<Range>;
/**
 * Find a mismatched condition in range.
 *
 * @param range An iterable ranged container.
 * @param pred A function predicates the specific condition.
 *
 * @return Iterator to the first element *pred* returns `false`.
 */
export declare function find_if_not<Range extends Array<any> | IForwardContainer<any>>(range: Range, pred: UnaryPredicator<IForwardContainer.ValueType<Range>>): IForwardContainer.IteratorType<Range>;
/**
 * Find the last sub range.
 *
 * @param range1 The 1st iterable ranged container.
 * @param range2 The 2nd iterable ranged container.
 *
 * @return Iterator to the first element of the last sub range.
 */
export declare function find_end<Range1 extends Array<any> | IForwardContainer<any>, Range2 extends IForwardContainer.SimilarType<Range1>>(range1: Range1, range2: Range2): IForwardContainer.IteratorType<Range1>;
/**
 * Find the last sub range.
 *
 * @param range1 The 1st iterable ranged container.
 * @param range2 The 2nd iterable ranged container.
 * @param pred A binary function predicates two arguments are equal.
 *
 * @return Iterator to the first element of the last sub range.
 */
export declare function find_end<Range1 extends Array<any> | IForwardContainer<any>, Range2 extends Array<any> | IForwardContainer<any>>(range1: Range1, range2: Range2, pred: BinaryPredicatorInferrer<Range1, Range2>): IForwardContainer.IteratorType<Range1>;
/**
 * Find the first sub range.
 *
 * @param range1 The 1st iterable ranged container.
 * @param range2 The 2nd iterable ranged container.
 *
 * @return Iterator to the first element of the first sub range.
 */
export declare function find_first_of<Range1 extends Array<any> | IForwardContainer<any>, Range2 extends IForwardContainer.SimilarType<Range1>>(range1: Range1, range2: Range2): IForwardContainer.IteratorType<Range1>;
/**
 * Find the first sub range.
 *
 * @param range1 The 1st iterable ranged container.
 * @param range2 The 2nd iterable ranged container.
 * @param pred A binary function predicates two arguments are equal.
 *
 * @return Iterator to the first element of the first sub range.
 */
export declare function find_first_of<Range1 extends Array<any> | IForwardContainer<any>, Range2 extends Array<any> | IForwardContainer<any>>(range1: Range1, range2: Range2, pred: BinaryPredicatorInferrer<Range1, Range2>): IForwardContainer.IteratorType<Range1>;
/**
 * Find the first adjacent element.
 *
 * @param range An iterable ranged container.
 * @param pred A binary function predicates two arguments are equal. Default is {@link equal_to}.
 *
 * @return Iterator to the first element of adjacent find.
 */
export declare function adjacent_find<Range extends Array<any> | IForwardContainer<any>>(range: Range, pred?: Comparator<IForwardContainer.ValueType<Range>>): IForwardContainer.IteratorType<Range>;
/**
 * Search sub range.
 *
 * @param range1 The 1st iterable ranged container.
 * @param range2 The 2nd iterable ranged container.
 *
 * @return Iterator to the first element of the sub range.
 */
export declare function search<Range1 extends Array<any> | IForwardContainer<any>, Range2 extends Array<any> | IForwardContainer.SimilarType<Range1>>(range1: Range1, range2: Range2): IForwardContainer.IteratorType<Range1>;
/**
 * Search sub range.
 *
 * @param range1 The 1st iterable ranged container.
 * @param range2 The 2nd iterable ranged container.
 * @param pred A binary function predicates two arguments are equal.
 *
 * @return Iterator to the first element of the sub range.
 */
export declare function search<Range1 extends Array<any> | IForwardContainer<any>, Range2 extends Array<any> | IForwardContainer<any>>(range1: Range1, range2: Range2, pred: BinaryPredicatorInferrer<Range1, Range2>): IForwardContainer.IteratorType<Range1>;
/**
 * Search specific and repeated elements.
 *
 * @param range An iterable ranged container.
 * @param count Count to be repeated.
 * @param val Value to search.
 * @param pred A binary function predicates two arguments are equal. Default is {@link equal_to}.
 *
 * @return Iterator to the first element of the repetition.
 */
export declare function search_n<Range extends Array<any> | IForwardContainer<any>>(range: Range, count: number, val: IForwardContainer.ValueType<Range>, pred?: Comparator<IForwardContainer.ValueType<Range>>): IForwardContainer.IteratorType<Range>;
/**
 * Find the first mistmached position between two ranges.
 *
 * @param range1 The 1st iterable ranged container.
 * @param range2 The 2nd iterable ranged container.
 *
 * @return A {@link Pair} of mismatched positions.
 */
export declare function mismatch<Range1 extends Array<any> | IForwardContainer<any>, Range2 extends Array<any> | IForwardContainer.SimilarType<Range1>>(range1: Range1, range2: Range2): Pair<IForwardContainer.IteratorType<Range1>, IForwardContainer.IteratorType<Range2>>;
/**
 * Find the first mistmached position between two ranges.
 *
 * @param range1 The 1st iterable ranged container.
 * @param range2 The 2nd iterable ranged container.
 * @param pred A binary function predicates two arguments are equal.
 *
 * @return A {@link Pair} of mismatched positions.
 */
export declare function mismatch<Range1 extends Array<any> | IForwardContainer<any>, Range2 extends Array<any> | IForwardContainer<any>>(range1: Range1, range2: Range2, pred: BinaryPredicatorInferrer<Range1, Range2>): Pair<IForwardContainer.IteratorType<Range1>, IForwardContainer.IteratorType<Range2>>;
/**
 * Count matched value in range.
 *
 * @param range An iterable ranged container.
 * @param val The value to count.
 *
 * @return The matched count.
 */
export declare function count<Range extends Array<any> | IForwardContainer<any>>(range: Range, val: IForwardContainer.ValueType<Range>): number;
/**
 * Count matched condition in range.
 *
 * @param range An iterable ranged container.
 * @param pred A function predicates the specific condition.
 *
 * @return The matched count.
 */
export declare function count_if<Range extends Array<any> | IForwardContainer<any>>(range: Range, pred: UnaryPredicator<IForwardContainer.ValueType<Range>>): number;
export {};
//# sourceMappingURL=iterations.d.ts.map