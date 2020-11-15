import { IBidirectionalContainer } from "../container/IBidirectionalContainer";
import { IForwardContainer } from "../container/IForwardContainer";
import { IRandomAccessContainer } from "../container/IRandomAccessContainer";
import { IBidirectionalIterator } from "../../iterator/IBidirectionalIterator";
import { IForwardIterator } from "../../iterator/IForwardIterator";
import { IPointer } from "../../functional/IPointer";
import { BinaryPredicator } from "../../internal/functional/BinaryPredicator";
import { UnaryPredicator } from "../../internal/functional/UnaryPredicator";
import { Writeonly } from "../../internal/functional/Writeonly";
declare type UnaryOperatorInferrer<Range extends Array<any> | IForwardContainer<any>, OutputIterator extends Writeonly<IForwardIterator<IPointer.ValueType<OutputIterator>, OutputIterator>>> = (val: IForwardContainer.ValueType<Range>) => IPointer.ValueType<OutputIterator>;
declare type BinaryOperatorInferrer<Range1 extends Array<any> | IForwardContainer<any>, Range2 extends Array<any> | IForwardContainer<any>, OutputIterator extends Writeonly<IForwardIterator<IPointer.ValueType<OutputIterator>, OutputIterator>>> = (x: IForwardContainer.ValueType<Range1>, y: IForwardContainer.ValueType<Range2>) => IPointer.ValueType<OutputIterator>;
/**
 * Copy elements in range.
 *
 * @param range An iterable ranged container.
 * @param output Output iterator of the first position.
 *
 * @return Output Iterator of the last position by advancing.
 */
export declare function copy<Range extends Array<any> | IForwardContainer<any>, OutputIterator extends Writeonly<IForwardIterator<IForwardContainer.ValueType<Range>, OutputIterator>>>(range: Range, output: OutputIterator): OutputIterator;
/**
 * Copy *n* elements.
 *
 * @param range An iterable ranged container.
 * @param n Number of elements to copy.
 * @param output Output iterator of the first position.
 *
 * @return Output Iterator of the last position by advancing.
 */
export declare function copy_n<Range extends Array<any> | IForwardContainer<any>, OutputIterator extends Writeonly<IForwardIterator<IForwardContainer.ValueType<Range>, OutputIterator>>>(range: Range, n: number, output: OutputIterator): OutputIterator;
/**
 * Copy specific elements by a condition.
 *
 * @param range An iterable ranged container.
 * @param output Output iterator of the first position.
 * @param pred A function predicates the specific condition.
 *
 * @return Output Iterator of the last position by advancing.
 */
export declare function copy_if<Range extends Array<any> | IForwardContainer<any>, OutputIterator extends Writeonly<IForwardIterator<IForwardContainer.ValueType<Range>, OutputIterator>>>(range: Range, output: OutputIterator, pred: UnaryPredicator<IForwardContainer.ValueType<Range>>): OutputIterator;
/**
 * Copy elements reversely.
 *
 * @param range An iterable ranged container.
 * @param output Output iterator of the first position.
 *
 * @return Output Iterator of the last position by advancing.
 */
export declare function copy_backward<Range extends Array<any> | IBidirectionalContainer<any, any>, OutputIterator extends Writeonly<IBidirectionalIterator<IBidirectionalContainer.ValueType<Range>, OutputIterator>>>(range: Range, output: OutputIterator): OutputIterator;
/**
 * Fill range elements
 *
 * @param range An iterable ranged container.
 * @param val The value to fill.
 *
 * @return Output Iterator of the last position by advancing.
 */
export declare function fill<Range extends Array<any> | IForwardContainer<any>>(range: Range, value: IForwardContainer.ValueType<Range>): void;
/**
 * Fill *n* elements.
 *
 * @param range An iterable ranged container.
 * @param n Number of elements to fill.
 * @param val The value to fill.
 *
 * @return Output Iterator of the last position by advancing.
 */
export declare function fill_n<Range extends Array<any> | IForwardContainer<any>>(range: Range, n: number, value: IForwardContainer.ValueType<Range>): IForwardContainer.IteratorType<Range>;
/**
 * Transform elements.
 *
 * @param range An iterable ranged container.
 * @param output Output iterator of the first position.
 * @param op Unary function determines the transform.
 *
 * @return Output Iterator of the last position by advancing.
 */
export declare function transform<Range extends Array<any> | IForwardContainer<any>, OutputIterator extends Writeonly<IForwardIterator<IPointer.ValueType<OutputIterator>, OutputIterator>>>(range: Range, result: OutputIterator, op: UnaryOperatorInferrer<Range, OutputIterator>): OutputIterator;
/**
 * Transform elements.
 *
 * @param range1 The 1st iterable ranged container.
 * @param range2 The 2nd iterable ranged container.
 * @param output Output iterator of the first position.
 * @param op Binary function determines the transform.
 *
 * @return Output Iterator of the last position by advancing.
 */
export declare function transform<Range1 extends Array<any> | IForwardContainer<any>, Range2 extends Array<any> | IForwardContainer<any>, OutputIterator extends Writeonly<IForwardIterator<IPointer.ValueType<OutputIterator>, OutputIterator>>>(range: Range1, first: Range2, result: OutputIterator, op: BinaryOperatorInferrer<Range1, Range2, OutputIterator>): OutputIterator;
/**
 * Generate range elements.
 *
 * @param range An iterable ranged container.
 * @param gen The generator function.
 */
export declare function generate<Range extends Array<any> | IForwardContainer<any>>(range: Range, gen: () => IForwardContainer.ValueType<Range>): void;
/**
 * Generate *n* elements.
 *
 * @param range An iterable ranged container.
 * @param n Number of elements to generate.
 * @param gen The generator function.
 *
 * @return Forward Iterator to the last position by advancing.
 */
export declare function generate_n<Range extends Array<any> | IForwardContainer<any>>(range: Range, n: number, gen: () => IForwardContainer.ValueType<Range>): IForwardContainer.IteratorType<Range>;
/**
 * Remove duplicated elements in sorted range.
 *
 * @param range An iterable ranged container.
 * @param pred A binary function predicates two arguments are equal. Default is {@link equal_to}.
 *
 * @return Input iterator to the last element not removed.
 */
export declare function unique<Range extends Array<any> | IForwardContainer<any>>(range: Range, pred?: BinaryPredicator<IForwardContainer.ValueType<Range>>): IForwardContainer.IteratorType<Range>;
/**
 * Copy elements in range without duplicates.
 *
 * @param range An iterable ranged container.
 * @param output Output iterator of the last position.
 * @param pred A binary function predicates two arguments are equal. Default is {@link equal_to}.
 *
 * @return Output Iterator of the last position by advancing.
 */
export declare function unique_copy<Range extends Array<any> | IForwardContainer<any>, OutputIterator extends Writeonly<IForwardIterator<IForwardContainer.ValueType<Range>, OutputIterator>>>(range: Range, output: OutputIterator, pred?: BinaryPredicator<IForwardContainer.ValueType<Range>>): OutputIterator;
/**
 * Remove specific value in range.
 *
 * @param range An iterable ranged container.
 * @param val The specific value to remove.
 *
 * @return Iterator tho the last element not removed.
 */
export declare function remove<Range extends Array<any> | IForwardContainer<any>>(range: Range, val: IForwardContainer.ValueType<Range>): IForwardContainer.IteratorType<Range>;
/**
 * Remove elements in range by a condition.
 *
 * @param range An iterable ranged container.
 * @param pred An unary function predicates remove.
 *
 * @return Iterator tho the last element not removed.
 */
export declare function remove_if<Range extends Array<any> | IForwardContainer<any>>(range: Range, pred: UnaryPredicator<IForwardContainer.ValueType<Range>>): IForwardContainer.IteratorType<Range>;
/**
 * Copy range removing specific value.
 *
 * @param range An iterable ranged container.
 * @param output Output iterator of the last position.
 * @param val The condition predicates remove.
 *
 * @return Output Iterator of the last position by advancing.
 */
export declare function remove_copy<Range extends Array<any> | IForwardContainer<any>, OutputIterator extends Writeonly<IForwardIterator<IForwardContainer.ValueType<Range>, OutputIterator>>>(range: Range, output: OutputIterator, val: IForwardContainer.ValueType<Range>): OutputIterator;
/**
 * Copy range removing elements by a condition.
 *
 * @param range An iterable ranged container.
 * @param output Output iterator of the last position.
 * @param pred An unary function predicates remove.
 *
 * @return Output Iterator of the last position by advancing.
 */
export declare function remove_copy_if<Range extends Array<any> | IForwardContainer<any>, OutputIterator extends Writeonly<IForwardIterator<IForwardContainer.ValueType<Range>, OutputIterator>>>(range: Range, output: OutputIterator, pred: UnaryPredicator<IForwardContainer.ValueType<Range>>): OutputIterator;
/**
 * Replace specific value in range.
 *
 * @param range An iterable ranged container.
 * @param old_val Specific value to change
 * @param new_val Specific value to be changed.
 */
export declare function replace<Range extends Array<any> | IForwardContainer<any>>(range: Range, old_val: IForwardContainer.ValueType<Range>, new_val: IForwardContainer.ValueType<Range>): void;
/**
 * Replace specific condition in range.
 *
 * @param range An iterable ranged container.
 * @param pred An unary function predicates the change.
 * @param new_val Specific value to be changed.
 */
export declare function replace_if<Range extends Array<any> | IForwardContainer<any>>(range: Range, pred: UnaryPredicator<IForwardContainer.ValueType<Range>>, new_val: IForwardContainer.ValueType<Range>): void;
/**
 * Copy range replacing specific value.
 *
 * @param range An iterable ranged container.
 * @param output Output iterator of the first position.
 * @param old_val Specific value to change
 * @param new_val Specific value to be changed.
 *
 * @return Output Iterator of the last position by advancing.
 */
export declare function replace_copy<Range extends Array<any> | IForwardContainer<any>, OutputIterator extends Writeonly<IForwardIterator<IForwardContainer.ValueType<Range>, OutputIterator>>>(range: Range, output: OutputIterator, old_val: IForwardContainer.ValueType<Range>, new_val: IForwardContainer.ValueType<Range>): OutputIterator;
/**
 * Copy range replacing specfic condition.
 *
 * @param range An iterable ranged container.
 * @param output Output iterator of the first position.
 * @param pred An unary function predicates the change.
 * @param new_val Specific value to be changed.
 *
 * @return Output Iterator of the last position by advancing.
 */
export declare function replace_copy_if<Range extends Array<any> | IForwardContainer<any>, OutputIterator extends Writeonly<IForwardIterator<IForwardContainer.ValueType<Range>, OutputIterator>>>(range: Range, output: OutputIterator, pred: UnaryPredicator<IForwardContainer.ValueType<Range>>, new_val: IForwardContainer.ValueType<Range>): OutputIterator;
/**
 * Swap values of two ranges.
 *
 * @param range1 The 1st iterable ranged container.
 * @param range2 The 2nd iterable ranged container.
 *
 * @return Forward Iterator of the last position of the 2nd range by advancing.
 */
export declare function swap_ranges<Range1 extends Array<any> | IForwardContainer<any>, Range2 extends IForwardContainer.SimilarType<Range1>>(range1: Range1, range2: Range2): IForwardContainer.IteratorType<Range2>;
/**
 * Reverse elements in range.
 *
 * @param range An iterable ranged container.
 */
export declare function reverse<Range extends Array<any> | IBidirectionalContainer<any, any>>(range: Range): void;
/**
 * Copy reversed elements in range.
 *
 * @param range An iterable ranged container.
 * @param output Output iterator of the first position.
 *
 * @return Output Iterator of the last position by advancing.
 */
export declare function reverse_copy<Range extends Array<any> | IBidirectionalContainer<any, any>, OutputIterator extends Writeonly<IForwardIterator<IForwardContainer.ValueType<Range>, OutputIterator>>>(range: Range, output: OutputIterator): OutputIterator;
export declare function shift_left<Range extends Array<any> | IForwardContainer<any>>(range: Range, n: number): void;
export declare function shift_right<Range extends Array<any> | IBidirectionalContainer<any, any>>(range: Range, n: number): void;
/**
 * Rotate elements in range.
 *
 * @param range An iterable ranged container.
 * @param middle Input iteartor of the initial position of the right side.
 *
 * @return Input iterator of the final position in the left side; *middle*.
 */
export declare function rotate<Range extends Array<any> | IForwardContainer<any>>(range: Range, middle: IForwardContainer.IteratorType<Range>): IForwardContainer.IteratorType<Range>;
/**
 * Copy rotated elements in range.
 *
 * @param range An iterable ranged container.
 * @param middle Input iteartor of the initial position of the right side.
 * @param output Output iterator of the last position.
 *
 * @return Output Iterator of the last position by advancing.
 */
export declare function rotate_copy<Range extends Array<any> | IForwardContainer<any>, OutputIterator extends Writeonly<IForwardIterator<IForwardContainer.ValueType<Range>, OutputIterator>>>(range: Range, middle: IForwardContainer.IteratorType<Range>, output: OutputIterator): OutputIterator;
/**
 * Shuffle elements in range.
 *
 * @param range An iterable ranged container.
 */
export declare function shuffle<Range extends Array<any> | IRandomAccessContainer<any>>(range: Range): void;
export {};
//# sourceMappingURL=modifiers.d.ts.map