/**
 * @packageDocumentation
 * @module std
 */
import { IForwardIterator } from "../iterator/IForwardIterator";
import { IBidirectionalIterator } from "../iterator/IBidirectionalIterator";
import { IRandomAccessIterator } from "../iterator/IRandomAccessIterator";
import { IPointer } from "../functional/IPointer";
import { UnaryPredicator } from "../internal/functional/UnaryPredicator";
import { BinaryPredicator } from "../internal/functional/BinaryPredicator";
import { General } from "../internal/functional/General";
import { Writeonly } from "../internal/functional/Writeonly";
declare type UnaryOperatorInferrer<InputIterator extends Readonly<IForwardIterator<IPointer.ValueType<InputIterator>, InputIterator>>, OutputIterator extends Writeonly<IForwardIterator<IPointer.ValueType<OutputIterator>, OutputIterator>>> = (val: IPointer.ValueType<InputIterator>) => IPointer.ValueType<OutputIterator>;
declare type BinaryOperatorInferrer<InputIterator1 extends Readonly<IForwardIterator<IPointer.ValueType<InputIterator1>, InputIterator1>>, InputIterator2 extends Readonly<IForwardIterator<IPointer.ValueType<InputIterator2>, InputIterator2>>, OutputIterator extends Writeonly<IForwardIterator<IPointer.ValueType<OutputIterator>, OutputIterator>>> = (x: IPointer.ValueType<InputIterator1>, y: IPointer.ValueType<InputIterator2>) => IPointer.ValueType<OutputIterator>;
/**
 * Copy elements in range.
 *
 * @param first Input iteartor of the first position.
 * @param last Input iterator of the last position.
 * @param output Output iterator of the first position.
 *
 * @return Output Iterator of the last position by advancing.
 */
export declare function copy<InputIterator extends Readonly<IForwardIterator<IPointer.ValueType<InputIterator>, InputIterator>>, OutputIterator extends Writeonly<IForwardIterator<IPointer.ValueType<InputIterator>, OutputIterator>>>(first: InputIterator, last: InputIterator, output: OutputIterator): OutputIterator;
/**
 * Copy *n* elements.
 *
 * @param first Input iteartor of the first position.
 * @param n Number of elements to copy.
 * @param output Output iterator of the first position.
 *
 * @return Output Iterator of the last position by advancing.
 */
export declare function copy_n<InputIterator extends Readonly<IForwardIterator<IPointer.ValueType<InputIterator>, InputIterator>>, OutputIterator extends Writeonly<IForwardIterator<IPointer.ValueType<InputIterator>, OutputIterator>>>(first: InputIterator, n: number, output: OutputIterator): OutputIterator;
/**
 * Copy specific elements by a condition.
 *
 * @param first Input iteartor of the first position.
 * @param last Input iterator of the last position.
 * @param output Output iterator of the first position.
 * @param pred A function predicates the specific condition.
 *
 * @return Output Iterator of the last position by advancing.
 */
export declare function copy_if<InputIterator extends Readonly<IForwardIterator<IPointer.ValueType<InputIterator>, InputIterator>>, OutputIterator extends Writeonly<IForwardIterator<IPointer.ValueType<InputIterator>, OutputIterator>>>(first: InputIterator, last: InputIterator, output: OutputIterator, pred: UnaryPredicator<IPointer.ValueType<InputIterator>>): OutputIterator;
/**
 * Copy elements reversely.
 *
 * @param first Input iteartor of the first position.
 * @param last Input iterator of the last position.
 * @param output Output iterator of the first position.
 *
 * @return Output Iterator of the last position by advancing.
 */
export declare function copy_backward<InputIterator extends Readonly<IBidirectionalIterator<IPointer.ValueType<InputIterator>, InputIterator>>, OutputIterator extends Writeonly<IBidirectionalIterator<IPointer.ValueType<InputIterator>, OutputIterator>>>(first: InputIterator, last: InputIterator, output: OutputIterator): OutputIterator;
/**
 * Fill range elements
 *
 * @param first Input iteartor of the first position.
 * @param last Input iterator of the last position.
 * @param val The value to fill.
 *
 * @return Output Iterator of the last position by advancing.
 */
export declare function fill<ForwardIterator extends Writeonly<IForwardIterator<IPointer.ValueType<ForwardIterator>, ForwardIterator>>>(first: ForwardIterator, last: ForwardIterator, val: IPointer.ValueType<ForwardIterator>): void;
/**
 * Fill *n* elements.
 *
 * @param first Input iteartor of the first position.
 * @param n Number of elements to fill.
 * @param val The value to fill.
 *
 * @return Output Iterator of the last position by advancing.
 */
export declare function fill_n<OutputIterator extends Writeonly<IForwardIterator<IPointer.ValueType<OutputIterator>, OutputIterator>>>(first: OutputIterator, n: number, val: IPointer.ValueType<OutputIterator>): OutputIterator;
/**
 * Transform elements.
 *
 * @param first Input iteartor of the first position.
 * @param last Input iterator of the last position.
 * @param output Output iterator of the first position.
 * @param op Unary function determines the transform.
 *
 * @return Output Iterator of the last position by advancing.
 */
export declare function transform<InputIterator extends Readonly<IForwardIterator<IPointer.ValueType<InputIterator>, InputIterator>>, OutputIterator extends Writeonly<IForwardIterator<IPointer.ValueType<OutputIterator>, OutputIterator>>>(first: InputIterator, last: InputIterator, result: OutputIterator, op: UnaryOperatorInferrer<InputIterator, OutputIterator>): OutputIterator;
/**
 * Transform elements.
 *
 * @param first1 Input iteartor of the first position of the 1st range.
 * @param last1 Input iterator of the last position of the 1st range.
 * @param first2 Input iterator of the first position of the 2nd range.
 * @param output Output iterator of the first position.
 * @param op Binary function determines the transform.
 *
 * @return Output Iterator of the last position by advancing.
 */
export declare function transform<InputIterator1 extends Readonly<IForwardIterator<IPointer.ValueType<InputIterator1>, InputIterator1>>, InputIterator2 extends Readonly<IForwardIterator<IPointer.ValueType<InputIterator2>, InputIterator2>>, OutputIterator extends Writeonly<IForwardIterator<IPointer.ValueType<OutputIterator>, OutputIterator>>>(first1: InputIterator1, last1: InputIterator1, first2: InputIterator2, result: OutputIterator, op: BinaryOperatorInferrer<InputIterator1, InputIterator2, OutputIterator>): OutputIterator;
/**
 * Generate range elements.
 *
 * @param first Forward iteartor of the first position.
 * @param last Forward iterator of the last position.
 * @param gen The generator function.
 */
export declare function generate<ForwardIterator extends Writeonly<IForwardIterator<IPointer.ValueType<ForwardIterator>, ForwardIterator>>>(first: ForwardIterator, last: ForwardIterator, gen: () => IPointer.ValueType<ForwardIterator>): void;
/**
 * Generate *n* elements.
 *
 * @param first Forward iteartor of the first position.
 * @param n Number of elements to generate.
 * @param gen The generator function.
 *
 * @return Forward Iterator to the last position by advancing.
 */
export declare function generate_n<ForwardIterator extends Writeonly<IForwardIterator<IPointer.ValueType<ForwardIterator>, ForwardIterator>>>(first: ForwardIterator, n: number, gen: () => IPointer.ValueType<ForwardIterator>): ForwardIterator;
/**
 * Remove duplicated elements in sorted range.
 *
 * @param first Input iteartor of the first position.
 * @param last Input iterator of the last position.
 * @param pred A binary function predicates two arguments are equal. Default is {@link equal_to}.
 *
 * @return Input iterator to the last element not removed.
 */
export declare function unique<InputIterator extends General<IForwardIterator<IPointer.ValueType<InputIterator>, InputIterator>>>(first: InputIterator, last: InputIterator, pred?: BinaryPredicator<IPointer.ValueType<InputIterator>>): InputIterator;
/**
 * Copy elements in range without duplicates.
 *
 * @param first Input iteartor of the first position.
 * @param last Input iterator of the last position.
 * @param output Output iterator of the last position.
 * @param pred A binary function predicates two arguments are equal. Default is {@link equal_to}.
 *
 * @return Output Iterator of the last position by advancing.
 */
export declare function unique_copy<InputIterator extends Readonly<IForwardIterator<IPointer.ValueType<InputIterator>, InputIterator>>, OutputIterator extends Writeonly<IForwardIterator<IPointer.ValueType<InputIterator>, OutputIterator>>>(first: InputIterator, last: InputIterator, output: OutputIterator, pred?: BinaryPredicator<IPointer.ValueType<InputIterator>>): OutputIterator;
/**
 * Remove specific value in range.
 *
 * @param first Input iteartor of the first position.
 * @param last Input iterator of the last position.
 * @param val The specific value to remove.
 *
 * @return Iterator tho the last element not removed.
 */
export declare function remove<InputIterator extends General<IForwardIterator<IPointer.ValueType<InputIterator>, InputIterator>>>(first: InputIterator, last: InputIterator, val: IPointer.ValueType<InputIterator>): InputIterator;
/**
 * Remove elements in range by a condition.
 *
 * @param first Input iteartor of the first position.
 * @param last Input iterator of the last position.
 * @param pred An unary function predicates remove.
 *
 * @return Iterator tho the last element not removed.
 */
export declare function remove_if<InputIterator extends General<IForwardIterator<IPointer.ValueType<InputIterator>, InputIterator>>>(first: InputIterator, last: InputIterator, pred: UnaryPredicator<IPointer.ValueType<InputIterator>>): InputIterator;
/**
 * Copy range removing specific value.
 *
 * @param first Input iteartor of the first position.
 * @param last Input iterator of the last position.
 * @param output Output iterator of the last position.
 * @param val The condition predicates remove.
 *
 * @return Output Iterator of the last position by advancing.
 */
export declare function remove_copy<InputIterator extends Readonly<IForwardIterator<IPointer.ValueType<InputIterator>, InputIterator>>, OutputIterator extends Writeonly<IForwardIterator<IPointer.ValueType<InputIterator>, OutputIterator>>>(first: InputIterator, last: InputIterator, output: OutputIterator, val: IPointer.ValueType<InputIterator>): OutputIterator;
/**
 * Copy range removing elements by a condition.
 *
 * @param first Input iteartor of the first position.
 * @param last Input iterator of the last position.
 * @param output Output iterator of the last position.
 * @param pred An unary function predicates remove.
 *
 * @return Output Iterator of the last position by advancing.
 */
export declare function remove_copy_if<InputIterator extends Readonly<IForwardIterator<IPointer.ValueType<InputIterator>, InputIterator>>, OutputIterator extends Writeonly<IForwardIterator<IPointer.ValueType<InputIterator>, OutputIterator>>>(first: InputIterator, last: InputIterator, output: OutputIterator, pred: UnaryPredicator<IPointer.ValueType<InputIterator>>): OutputIterator;
/**
 * Replace specific value in range.
 *
 * @param first Input iteartor of the first position.
 * @param last Input iterator of the last position.
 * @param old_val Specific value to change
 * @param new_val Specific value to be changed.
 */
export declare function replace<InputIterator extends General<IForwardIterator<IPointer.ValueType<InputIterator>, InputIterator>>>(first: InputIterator, last: InputIterator, old_val: IPointer.ValueType<InputIterator>, new_val: IPointer.ValueType<InputIterator>): void;
/**
 * Replace specific condition in range.
 *
 * @param first Input iteartor of the first position.
 * @param last Input iterator of the last position.
 * @param pred An unary function predicates the change.
 * @param new_val Specific value to be changed.
 */
export declare function replace_if<InputIterator extends General<IForwardIterator<IPointer.ValueType<InputIterator>, InputIterator>>>(first: InputIterator, last: InputIterator, pred: UnaryPredicator<IPointer.ValueType<InputIterator>>, new_val: IPointer.ValueType<InputIterator>): void;
/**
 * Copy range replacing specific value.
 *
 * @param first Input iteartor of the first position.
 * @param last Input iterator of the last position.
 * @param output Output iterator of the first position.
 * @param old_val Specific value to change
 * @param new_val Specific value to be changed.
 *
 * @return Output Iterator of the last position by advancing.
 */
export declare function replace_copy<InputIterator extends Readonly<IForwardIterator<IPointer.ValueType<InputIterator>, InputIterator>>, OutputIterator extends Writeonly<IForwardIterator<IPointer.ValueType<InputIterator>, OutputIterator>>>(first: InputIterator, last: InputIterator, output: OutputIterator, old_val: IPointer.ValueType<InputIterator>, new_val: IPointer.ValueType<InputIterator>): OutputIterator;
/**
 * Copy range replacing specfic condition.
 *
 * @param first Input iteartor of the first position.
 * @param last Input iterator of the last position.
 * @param output Output iterator of the first position.
 * @param pred An unary function predicates the change.
 * @param new_val Specific value to be changed.
 *
 * @return Output Iterator of the last position by advancing.
 */
export declare function replace_copy_if<InputIterator extends Readonly<IForwardIterator<IPointer.ValueType<InputIterator>, InputIterator>>, OutputIterator extends Writeonly<IForwardIterator<IPointer.ValueType<InputIterator>, OutputIterator>>>(first: InputIterator, last: InputIterator, result: OutputIterator, pred: UnaryPredicator<IPointer.ValueType<InputIterator>>, new_val: IPointer.ValueType<InputIterator>): OutputIterator;
/**
 * Swap values of two iterators.
 *
 * @param x Forward iterator to swap its value.
 * @param y Forward iterator to swap its value.
 */
export declare function iter_swap<ForwardIterator1 extends General<IForwardIterator<IPointer.ValueType<ForwardIterator1>, ForwardIterator1>>, ForwardIterator2 extends General<IForwardIterator<IPointer.ValueType<ForwardIterator1>, ForwardIterator2>>>(x: ForwardIterator1, y: ForwardIterator2): void;
/**
 * Swap values of two ranges.
 *
 * @param first1 Forward iteartor of the first position of the 1st range.
 * @param last1 Forward iterator of the last position of the 1st range.
 * @param first2 Forward iterator of the first position of the 2nd range.
 *
 * @return Forward Iterator of the last position of the 2nd range by advancing.
 */
export declare function swap_ranges<ForwardIterator1 extends General<IForwardIterator<IPointer.ValueType<ForwardIterator1>, ForwardIterator1>>, ForwardIterator2 extends General<IForwardIterator<IPointer.ValueType<ForwardIterator1>, ForwardIterator2>>>(first1: ForwardIterator1, last1: ForwardIterator1, first2: ForwardIterator2): ForwardIterator2;
/**
 * Reverse elements in range.
 *
 * @param first Bidirectional iterator of the first position.
 * @param last Bidirectional iterator of the last position.
 */
export declare function reverse<BidirectionalIterator extends General<IBidirectionalIterator<IPointer.ValueType<BidirectionalIterator>, BidirectionalIterator>>>(first: BidirectionalIterator, last: BidirectionalIterator): void;
/**
 * Copy reversed elements in range.
 *
 * @param first Bidirectional iterator of the first position.
 * @param last Bidirectional iterator of the last position.
 * @param output Output iterator of the first position.
 *
 * @return Output Iterator of the last position by advancing.
 */
export declare function reverse_copy<BidirectionalIterator extends Readonly<IBidirectionalIterator<IPointer.ValueType<BidirectionalIterator>, BidirectionalIterator>>, OutputIterator extends Writeonly<IForwardIterator<IPointer.ValueType<BidirectionalIterator>, OutputIterator>>>(first: BidirectionalIterator, last: BidirectionalIterator, output: OutputIterator): OutputIterator;
export declare function shift_left<ForwardIterator extends General<IForwardIterator<IPointer.ValueType<ForwardIterator>, ForwardIterator>>>(first: ForwardIterator, last: ForwardIterator, n: number): ForwardIterator;
export declare function shift_right<ForwardIterator extends General<IBidirectionalIterator<IPointer.ValueType<ForwardIterator>, ForwardIterator>>>(first: ForwardIterator, last: ForwardIterator, n: number): ForwardIterator;
/**
 * Rotate elements in range.
 *
 * @param first Input iteartor of the first position.
 * @param middle Input iteartor of the initial position of the right side.
 * @param last Input iteartor of the last position.
 *
 * @return Input iterator of the final position in the left side; *middle*.
 */
export declare function rotate<InputIterator extends General<IForwardIterator<IPointer.ValueType<InputIterator>, InputIterator>>>(first: InputIterator, middle: InputIterator, last: InputIterator): InputIterator;
/**
 * Copy rotated elements in range.
 *
 * @param first Input iteartor of the first position.
 * @param middle Input iteartor of the initial position of the right side.
 * @param last Input iteartor of the last position.
 * @param output Output iterator of the last position.
 *
 * @return Output Iterator of the last position by advancing.
 */
export declare function rotate_copy<ForwardIterator extends Readonly<IForwardIterator<IPointer.ValueType<ForwardIterator>, ForwardIterator>>, OutputIterator extends Writeonly<IForwardIterator<IPointer.ValueType<ForwardIterator>, OutputIterator>>>(first: ForwardIterator, middle: ForwardIterator, last: ForwardIterator, output: OutputIterator): OutputIterator;
/**
 * Shuffle elements in range.
 *
 * @param first Random access iteartor of the first position.
 * @param last Random access iteartor of the last position.
 */
export declare function shuffle<RandomAccessIterator extends General<IRandomAccessIterator<IPointer.ValueType<RandomAccessIterator>, RandomAccessIterator>>>(first: RandomAccessIterator, last: RandomAccessIterator): void;
export {};
//# sourceMappingURL=modifiers.d.ts.map