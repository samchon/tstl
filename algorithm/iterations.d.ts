/**
 * @packageDocumentation
 * @module std
 */
import { IForwardIterator } from "../iterator/IForwardIterator";
import { IPointer } from "../functional/IPointer";
import { Pair } from "../utility/Pair";
import { BinaryPredicator } from "../internal/functional/BinaryPredicator";
import { UnaryPredicator } from "../internal/functional/UnaryPredicator";
/**
 * Apply a function to elements in range.
 *
 * @param first Input iteartor of the first position.
 * @param last Input iterator of the last position.
 * @param fn The function to apply.
 *
 * @return The function *fn* itself.
 */
export declare function for_each<InputIterator extends Readonly<IForwardIterator<IPointer.ValueType<InputIterator>, InputIterator>>, Func extends (val: IPointer.ValueType<InputIterator>) => any>(first: InputIterator, last: InputIterator, fn: Func): Func;
/**
 * Apply a function to elements in steps.
 *
 * @param first Input iteartor of the starting position.
 * @param n Steps to maximum advance.
 * @param fn The function to apply.
 *
 * @return Iterator advanced from *first* for *n* steps.
 */
export declare function for_each_n<InputIterator extends Readonly<IForwardIterator<IPointer.ValueType<InputIterator>, InputIterator>>, Func extends (val: IPointer.ValueType<InputIterator>) => any>(first: InputIterator, n: number, fn: Func): InputIterator;
/**
 * Test whether all elements meet a specific condition.
 *
 * @param first Input iteartor of the first position.
 * @param last Input iterator of the last position.
 * @param pred A function predicates the specific condition.
 *
 * @return Whether the *pred* returns always `true` for all elements.
 */
export declare function all_of<InputIterator extends Readonly<IForwardIterator<IPointer.ValueType<InputIterator>, InputIterator>>>(first: InputIterator, last: InputIterator, pred: UnaryPredicator<IPointer.ValueType<InputIterator>>): boolean;
/**
 * Test whether any element meets a specific condition.
 *
 * @param first Input iteartor of the first position.
 * @param last Input iterator of the last position.
 * @param pred A function predicates the specific condition.
 *
 * @return Whether the *pred* returns at least a `true` for all elements.
 */
export declare function any_of<InputIterator extends Readonly<IForwardIterator<IPointer.ValueType<InputIterator>, InputIterator>>>(first: InputIterator, last: InputIterator, pred: UnaryPredicator<IPointer.ValueType<InputIterator>>): boolean;
/**
 * Test whether any element doesn't meet a specific condition.
 *
 * @param first Input iteartor of the first position.
 * @param last Input iterator of the last position.
 * @param pred A function predicates the specific condition.
 *
 * @return Whether the *pred* doesn't return `true` for all elements.
 */
export declare function none_of<InputIterator extends Readonly<IForwardIterator<IPointer.ValueType<InputIterator>, InputIterator>>>(first: InputIterator, last: InputIterator, pred: UnaryPredicator<IPointer.ValueType<InputIterator>>): boolean;
/**
 * Test whether two ranges are equal.
 *
 * @param first1 Input iteartor of the first position of the 1st range.
 * @param last1 Input iterator of the last position of the 1st range.
 * @param first2 Input iterator of the first position of the 2nd range.
 * @param pred A binary function predicates two arguments are equal.
 *
 * @return Whether two ranges are equal.
 */
export declare function equal<InputIterator1 extends Readonly<IForwardIterator<IPointer.ValueType<InputIterator1>, InputIterator1>>, InputIterator2 extends Readonly<IForwardIterator<IPointer.ValueType<InputIterator1>, InputIterator2>>>(first1: InputIterator1, last1: InputIterator1, first2: InputIterator2): boolean;
/**
 * Test whether two ranges are equal.
 *
 * @param first1 Input iteartor of the first position of the 1st range.
 * @param last1 Input iterator of the last position of the 1st range.
 * @param first2 Input iterator of the first position of the 2nd range.
 * @param pred A binary function predicates two arguments are equal.
 *
 * @return Whether two ranges are equal.
 */
export declare function equal<InputIterator1 extends Readonly<IForwardIterator<IPointer.ValueType<InputIterator1>, InputIterator1>>, InputIterator2 extends Readonly<IForwardIterator<IPointer.ValueType<InputIterator2>, InputIterator2>>>(first1: InputIterator1, last1: InputIterator1, first2: InputIterator2, pred: BinaryPredicator<IPointer.ValueType<InputIterator1>, IPointer.ValueType<InputIterator2>>): boolean;
/**
 * Compare lexicographically.
 *
 * @param first1 Input iteartor of the first position of the 1st range.
 * @param last1 Input iterator of the last position of the 1st range.
 * @param first2 Input iterator of the first position of the 2nd range.
 * @param last2 Input iterator of the last position of the 2nd range.
 * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Default is {@link less}.
 *
 * @return Whether the 1st range precedes the 2nd.
 */
export declare function lexicographical_compare<Iterator1 extends Readonly<IForwardIterator<IPointer.ValueType<Iterator1>, Iterator1>>, Iterator2 extends Readonly<IForwardIterator<IPointer.ValueType<Iterator1>, Iterator2>>>(first1: Iterator1, last1: Iterator1, first2: Iterator2, last2: Iterator2, comp?: BinaryPredicator<IPointer.ValueType<Iterator1>>): boolean;
/**
 * Find a value in range.
 *
 * @param first Input iteartor of the first position.
 * @param last Input iterator of the last position.
 * @param val The value to find.
 *
 * @return Iterator to the first element {@link equal to equal_to} the value.
 */
export declare function find<InputIterator extends Readonly<IForwardIterator<IPointer.ValueType<InputIterator>, InputIterator>>>(first: InputIterator, last: InputIterator, val: IPointer.ValueType<InputIterator>): InputIterator;
/**
 * Find a matched condition in range.
 *
 * @param first Input iteartor of the first position.
 * @param last Input iterator of the last position.
 * @param pred A function predicates the specific condition.
 *
 * @return Iterator to the first element *pred* returns `true`.
 */
export declare function find_if<InputIterator extends Readonly<IForwardIterator<IPointer.ValueType<InputIterator>, InputIterator>>>(first: InputIterator, last: InputIterator, pred: UnaryPredicator<IPointer.ValueType<InputIterator>>): InputIterator;
/**
 * Find a mismatched condition in range.
 *
 * @param first Input iteartor of the first position.
 * @param last Input iterator of the last position.
 * @param pred A function predicates the specific condition.
 *
 * @return Iterator to the first element *pred* returns `false`.
 */
export declare function find_if_not<InputIterator extends Readonly<IForwardIterator<IPointer.ValueType<InputIterator>, InputIterator>>>(first: InputIterator, last: InputIterator, pred: UnaryPredicator<IPointer.ValueType<InputIterator>>): InputIterator;
/**
 * Find the last sub range.
 *
 * @param first1 Input iteartor of the first position of the 1st range.
 * @param last1 Input iterator of the last position of the 1st range.
 * @param first2 Input iterator of the first position of the 2nd range.
 * @param last2 Input iterator of the last position of the 2nd range.
 *
 * @return Iterator to the first element of the last sub range.
 */
export declare function find_end<Iterator1 extends Readonly<IForwardIterator<IPointer.ValueType<Iterator1>, Iterator1>>, Iterator2 extends Readonly<IForwardIterator<IPointer.ValueType<Iterator1>, Iterator2>>>(first1: Iterator1, last1: Iterator1, first2: Iterator2, last2: Iterator2): Iterator1;
/**
 * Find the last sub range.
 *
 * @param first1 Input iteartor of the first position of the 1st range.
 * @param last1 Input iterator of the last position of the 1st range.
 * @param first2 Input iterator of the first position of the 2nd range.
 * @param last2 Input iterator of the last position of the 2nd range.
 * @param pred A binary function predicates two arguments are equal.
 *
 * @return Iterator to the first element of the last sub range.
 */
export declare function find_end<Iterator1 extends Readonly<IForwardIterator<IPointer.ValueType<Iterator1>, Iterator1>>, Iterator2 extends Readonly<IForwardIterator<IPointer.ValueType<Iterator2>, Iterator2>>>(first1: Iterator1, last1: Iterator1, first2: Iterator2, last2: Iterator2, pred: BinaryPredicator<IPointer.ValueType<Iterator1>, IPointer.ValueType<Iterator2>>): Iterator1;
/**
 * Find the first sub range.
 *
 * @param first1 Input iteartor of the first position of the 1st range.
 * @param last1 Input iterator of the last position of the 1st range.
 * @param first2 Input iterator of the first position of the 2nd range.
 * @param last2 Input iterator of the last position of the 2nd range.
 *
 * @return Iterator to the first element of the first sub range.
 */
export declare function find_first_of<Iterator1 extends Readonly<IForwardIterator<IPointer.ValueType<Iterator1>, Iterator1>>, Iterator2 extends Readonly<IForwardIterator<IPointer.ValueType<Iterator1>, Iterator2>>>(first1: Iterator1, last1: Iterator1, first2: Iterator2, last2: Iterator2): Iterator1;
/**
 * Find the first sub range.
 *
 * @param first1 Input iteartor of the first position of the 1st range.
 * @param last1 Input iterator of the last position of the 1st range.
 * @param first2 Input iterator of the first position of the 2nd range.
 * @param last2 Input iterator of the last position of the 2nd range.
 * @param pred A binary function predicates two arguments are equal.
 *
 * @return Iterator to the first element of the first sub range.
 */
export declare function find_first_of<Iterator1 extends Readonly<IForwardIterator<IPointer.ValueType<Iterator1>, Iterator1>>, Iterator2 extends Readonly<IForwardIterator<IPointer.ValueType<Iterator2>, Iterator2>>>(first1: Iterator1, last1: Iterator1, first2: Iterator2, last2: Iterator2, pred: BinaryPredicator<IPointer.ValueType<Iterator1>, IPointer.ValueType<Iterator2>>): Iterator1;
/**
 * Find the first adjacent element.
 *
 * @param first Input iteartor of the first position.
 * @param last Input iterator of the last position.
 * @param pred A binary function predicates two arguments are equal. Default is {@link equal_to}.
 *
 * @return Iterator to the first element of adjacent find.
 */
export declare function adjacent_find<InputIterator extends Readonly<IForwardIterator<IPointer.ValueType<InputIterator>, InputIterator>>>(first: InputIterator, last: InputIterator, pred?: BinaryPredicator<IPointer.ValueType<InputIterator>>): InputIterator;
/**
 * Search sub range.
 *
 * @param first1 Forward iteartor of the first position of the 1st range.
 * @param last1 Forward iterator of the last position of the 1st range.
 * @param first2 Forward iterator of the first position of the 2nd range.
 * @param last2 Forward iterator of the last position of the 2nd range.
 *
 * @return Iterator to the first element of the sub range.
 */
export declare function search<ForwardIterator1 extends Readonly<IForwardIterator<IPointer.ValueType<ForwardIterator1>, ForwardIterator1>>, ForwardIterator2 extends Readonly<IForwardIterator<IPointer.ValueType<ForwardIterator1>, ForwardIterator2>>>(first1: ForwardIterator1, last1: ForwardIterator1, first2: ForwardIterator2, last2: ForwardIterator2): ForwardIterator1;
/**
 * Search sub range.
 *
 * @param first1 Forward iteartor of the first position of the 1st range.
 * @param last1 Forward iterator of the last position of the 1st range.
 * @param first2 Forward iterator of the first position of the 2nd range.
 * @param last2 Forward iterator of the last position of the 2nd range.
 * @param pred A binary function predicates two arguments are equal.
 *
 * @return Iterator to the first element of the sub range.
 */
export declare function search<ForwardIterator1 extends Readonly<IForwardIterator<IPointer.ValueType<ForwardIterator1>, ForwardIterator1>>, ForwardIterator2 extends Readonly<IForwardIterator<IPointer.ValueType<ForwardIterator2>, ForwardIterator2>>>(first1: ForwardIterator1, last1: ForwardIterator1, first2: ForwardIterator2, last2: ForwardIterator2, pred: BinaryPredicator<IPointer.ValueType<ForwardIterator1>, IPointer.ValueType<ForwardIterator2>>): ForwardIterator1;
/**
 * Search specific and repeated elements.
 *
 * @param first Forward iteartor of the first position.
 * @param last Forward iterator of the last position.
 * @param count Count to be repeated.
 * @param val Value to search.
 * @param pred A binary function predicates two arguments are equal. Default is {@link equal_to}.
 *
 * @return Iterator to the first element of the repetition.
 */
export declare function search_n<ForwardIterator extends Readonly<IForwardIterator<IPointer.ValueType<ForwardIterator>, ForwardIterator>>>(first: ForwardIterator, last: ForwardIterator, count: number, val: IPointer.ValueType<ForwardIterator>, pred?: BinaryPredicator<IPointer.ValueType<ForwardIterator>>): ForwardIterator;
/**
 * Find the first mistmached position between two ranges.
 *
 * @param first1 Input iteartor of the first position of the 1st range.
 * @param last1 Input iterator of the last position of the 1st range.
 * @param first2 Input iterator of the first position of the 2nd range.
 *
 * @return A {@link Pair} of mismatched positions.
 */
export declare function mismatch<Iterator1 extends Readonly<IForwardIterator<IPointer.ValueType<Iterator1>, Iterator1>>, Iterator2 extends Readonly<IForwardIterator<IPointer.ValueType<Iterator1>, Iterator2>>>(first1: Iterator1, last1: Iterator1, first2: Iterator2): Pair<Iterator1, Iterator2>;
/**
 * Find the first mistmached position between two ranges.
 *
 * @param first1 Input iteartor of the first position of the 1st range.
 * @param last1 Input iterator of the last position of the 1st range.
 * @param first2 Input iterator of the first position of the 2nd range.
 * @param pred A binary function predicates two arguments are equal.
 *
 * @return A {@link Pair} of mismatched positions.
 */
export declare function mismatch<Iterator1 extends Readonly<IForwardIterator<IPointer.ValueType<Iterator1>, Iterator1>>, Iterator2 extends Readonly<IForwardIterator<IPointer.ValueType<Iterator2>, Iterator2>>>(first1: Iterator1, last1: Iterator1, first2: Iterator2, pred: BinaryPredicator<IPointer.ValueType<Iterator1>, IPointer.ValueType<Iterator2>>): Pair<Iterator1, Iterator2>;
/**
 * Count matched value in range.
 *
 * @param first Input iteartor of the first position.
 * @param last Input iterator of the last position.
 * @param val The value to count.
 *
 * @return The matched count.
 */
export declare function count<InputIterator extends Readonly<IForwardIterator<IPointer.ValueType<InputIterator>, InputIterator>>>(first: InputIterator, last: InputIterator, val: IPointer.ValueType<InputIterator>): number;
/**
 * Count matched condition in range.
 *
 * @param first Input iteartor of the first position.
 * @param last Input iterator of the last position.
 * @param pred A function predicates the specific condition.
 *
 * @return The matched count.
 */
export declare function count_if<InputIterator extends Readonly<IForwardIterator<IPointer.ValueType<InputIterator>, InputIterator>>>(first: InputIterator, last: InputIterator, pred: UnaryPredicator<IPointer.ValueType<InputIterator>>): number;
//# sourceMappingURL=iterations.d.ts.map