/**
 * @packageDocumentation
 * @module std
 */
import { IForwardIterator } from "../iterator/IForwardIterator";
import { General } from "../internal/functional/General";
import { Writeonly } from "../internal/functional/Writeonly";
import { IPointer } from "../functional/IPointer";
/**
 * Greatest Common Divider.
 */
export declare function gcd(x: number, y: number): number;
/**
 * Least Common Multiple.
 */
export declare function lcm(x: number, y: number): number;
export declare function iota<ForwardIterator extends General<IForwardIterator<number, ForwardIterator>>>(first: ForwardIterator, last: ForwardIterator, value: number): void;
export declare function accumulate<InputIterator extends General<IForwardIterator<IPointer.ValueType<InputIterator>, InputIterator>>>(first: InputIterator, last: InputIterator, init: IPointer.ValueType<InputIterator>, op?: Operator<InputIterator, InputIterator>): IPointer.ValueType<InputIterator>;
export declare function inner_product<InputIterator1 extends General<IForwardIterator<IPointer.ValueType<InputIterator1>, InputIterator1>>, InputIterator2 extends General<IForwardIterator<IPointer.ValueType<InputIterator2>, InputIterator2>>>(first1: InputIterator1, last1: InputIterator1, first2: InputIterator2, value: IPointer.ValueType<InputIterator1>, adder?: Operator<InputIterator1, InputIterator1>, multiplier?: Operator<InputIterator1, InputIterator2>): IPointer.ValueType<InputIterator1>;
export declare function adjacent_difference<InputIterator extends Readonly<IForwardIterator<IPointer.ValueType<InputIterator>, InputIterator>>, OutputIterator extends Writeonly<IForwardIterator<IPointer.ValueType<InputIterator>, OutputIterator>>>(first: InputIterator, last: InputIterator, output: OutputIterator, subtracter?: Operator<InputIterator, InputIterator>): OutputIterator;
export declare function partial_sum<InputIterator extends Readonly<IForwardIterator<IPointer.ValueType<InputIterator>, InputIterator>>, OutputIterator extends Writeonly<IForwardIterator<IPointer.ValueType<InputIterator>, OutputIterator>>>(first: InputIterator, last: InputIterator, output: OutputIterator, adder?: Operator<InputIterator, InputIterator>): OutputIterator;
export declare function inclusive_scan<InputIterator extends Readonly<IForwardIterator<IPointer.ValueType<InputIterator>, InputIterator>>, OutputIterator extends Writeonly<IForwardIterator<IPointer.ValueType<InputIterator>, OutputIterator>>>(first: InputIterator, last: InputIterator, output: OutputIterator, adder?: Operator<InputIterator, InputIterator>, init?: IPointer.ValueType<InputIterator>): OutputIterator;
export declare function exclusive_scan<InputIterator extends Readonly<IForwardIterator<IPointer.ValueType<InputIterator>, InputIterator>>, OutputIterator extends Writeonly<IForwardIterator<IPointer.ValueType<InputIterator>, OutputIterator>>>(first: InputIterator, last: InputIterator, output: OutputIterator, init: IPointer.ValueType<InputIterator>, op?: Operator<InputIterator, InputIterator>): OutputIterator;
export declare function transform_inclusive_scan<InputIterator extends Readonly<IForwardIterator<IPointer.ValueType<InputIterator>, InputIterator>>, OutputIterator extends Writeonly<IForwardIterator<IPointer.ValueType<OutputIterator>, OutputIterator>>>(first: InputIterator, last: InputIterator, output: OutputIterator, binary: Operator<OutputIterator, OutputIterator>, unary: Transformer<InputIterator, OutputIterator>, init?: IPointer.ValueType<InputIterator>): OutputIterator;
export declare function transform_exclusive_scan<InputIterator extends Readonly<IForwardIterator<IPointer.ValueType<InputIterator>, InputIterator>>, OutputIterator extends Writeonly<IForwardIterator<IPointer.ValueType<OutputIterator>, OutputIterator>>>(first: InputIterator, last: InputIterator, output: OutputIterator, init: IPointer.ValueType<InputIterator>, binary: Operator<OutputIterator, OutputIterator>, unary: Transformer<InputIterator, OutputIterator>): OutputIterator;
declare type Operator<Iterator1 extends Readonly<IForwardIterator<IPointer.ValueType<Iterator1>, Iterator1>>, Iterator2 extends Readonly<IForwardIterator<IPointer.ValueType<Iterator2>, Iterator2>>> = (x: IPointer.ValueType<Iterator1>, y: IPointer.ValueType<Iterator2>) => IPointer.ValueType<Iterator1>;
declare type Transformer<InputIterator extends Readonly<IForwardIterator<IPointer.ValueType<InputIterator>, InputIterator>>, OutputIterator extends Writeonly<IForwardIterator<IPointer.ValueType<OutputIterator>, OutputIterator>>> = (val: IPointer.ValueType<InputIterator>) => IPointer.ValueType<OutputIterator>;
export {};
//# sourceMappingURL=operations.d.ts.map