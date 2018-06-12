import { IForwardIterator } from "../iterators/IForwardIterator";
import { General, Writeonly } from "../iterators/IFake";

import { plus, minus, multiplies } from "./operators";

/* ---------------------------------------------------------
	COMMON ALGORITHMS
--------------------------------------------------------- */
export function iota<ForwardIterator extends General<IForwardIterator<number, ForwardIterator>>>
	(first: ForwardIterator, last: ForwardIterator, value: number): void
{
	for (; !first.equals(last); first = first.next())
		first.value = value++;
}

export function accumuate<T,
		InputIterator extends General<IForwardIterator<T, InputIterator>>>
	(
		first: InputIterator, last: InputIterator, 
		init: T,
		op: BinaryOperator<T> = plus
	): T
{
	for (; !first.equals(last); first = first.next())
		init = op(init, first.value);
		
	return init;
}

export function inner_product<T,
		InputIterator1 extends General<IForwardIterator<T, InputIterator1>>,
		InputIterator2 extends General<IForwardIterator<T, InputIterator2>>>
	(
		first1: InputIterator1, last1: InputIterator1, first2: InputIterator2,
		value: T,
		op1: BinaryOperator<T> = multiplies, 
		op2: BinaryOperator<T> = plus
	): T
{
	for (; !first1.equals(last1); first1 = first1.next())
	{
		value = op1(value, op2(first1.value, first2.value));
		first2 = first2.next();
	}
	return value;
}

export function adjacent_difference<T,
		InputIterator extends Readonly<IForwardIterator<T, InputIterator>>,
		OutputIterator extends General<IForwardIterator<T, OutputIterator>>>
	(
		first: InputIterator, last: InputIterator, output: OutputIterator,
		op: BinaryOperator<T> = minus
	): OutputIterator
{
	if (first.equals(last))
		return output;

	let before: T = _Initialize(first, output);
	for (; !first.equals(last); first = first.next())
	{
		output.value = op(first.value, before);

		before = first.value;
		output = output.next();
	}
	return output;
}

export function partial_sum<T,
		InputIterator extends Readonly<IForwardIterator<T, InputIterator>>,
		OutputIterator extends General<IForwardIterator<T, OutputIterator>>>
	(
		first: InputIterator, last: InputIterator, output: OutputIterator,
		op: BinaryOperator<T> = plus
	): OutputIterator
{
	if (first.equals(last))
		return output;

	let sum: T = _Initialize(first, output);
	for (; !first.equals(last); first = first.next())
	{
		sum = op(sum, first.value);

		output.value = sum;
		output = output.next();
	}
	return output;
}

/* ---------------------------------------------------------
	PREFIX SUMS
--------------------------------------------------------- */
export function inclusive_scan<T,
		InputIterator extends Readonly<IForwardIterator<T, InputIterator>>,
		OutputIterator extends General<IForwardIterator<T, OutputIterator>>>
	(
		first: InputIterator, last: InputIterator, output: OutputIterator,
		op: BinaryOperator<T> = plus,
		init: T = undefined
	): OutputIterator
{
	return transform_inclusive_scan(first, last, output, op, _Capsule, init);
}

export function exclusive_scan<T,
		InputIterator extends Readonly<IForwardIterator<T, InputIterator>>,
		OutputIterator extends General<IForwardIterator<T, OutputIterator>>>
	(
		first: InputIterator, last: InputIterator, output: OutputIterator,
		init: T,
		op: BinaryOperator<T> = plus
	): OutputIterator
{
	return transform_exclusive_scan(first, last, output, init, op, _Capsule);
}

export function transform_inclusive_scan<T, Ret,
		InputIterator extends Readonly<IForwardIterator<T, InputIterator>>,
		OutputIterator extends General<IForwardIterator<Ret, OutputIterator>>>
	(
		first: InputIterator, last: InputIterator, output: OutputIterator,
		binary: BinaryOperator<Ret> = plus,
		unary: (val: T) => Ret,
		init: T = undefined
	): OutputIterator
{
	if (first.equals(last))
		return output;

	let before: Ret = _Transform_initialize(first, output, unary, init);
	for (; !first.equals(last); first = first.next())
	{
		output.value = binary(before, unary(first.value));
		
		before = output.value;
		output = output.next();
	}
	return output;
}

export function transform_exclusive_scan<T, Ret,
		InputIterator extends Readonly<IForwardIterator<T, InputIterator>>,
		OutputIterator extends General<IForwardIterator<Ret, OutputIterator>>>
	(
		first: InputIterator, last: InputIterator, output: OutputIterator,
		init: T = undefined,
		binary: BinaryOperator<Ret> = plus,
		unary: (val: T) => Ret
	): OutputIterator
{
	if (first.equals(last))
		return output;

	let x: Ret = unary(first.value);
	let y: Ret = unary(init);

	for (; !first.equals(last); first = first.next())
	{
		output.value = binary(x, y);

		x = unary(first.value);
		y = output.value;
		output = output.next();
	}
	return output;
}

/* ---------------------------------------------------------
	BACK-GROUNDS
--------------------------------------------------------- */
/**
 * @hidden
 */
type BinaryOperator<T> = (x: T, y: T) => T;

/**
 * @hidden
 */
function _Capsule<T>(x: T): T
{
	return x;
}

/**
 * @hidden
 */
function _Initialize<T, 
		InputIterator extends Readonly<IForwardIterator<T, InputIterator>>,
		OutputIterator extends Writeonly<IForwardIterator<T, OutputIterator>>>
	(it: InputIterator, output: OutputIterator, init: T = undefined): T
{
	return _Transform_initialize<T, T, InputIterator, OutputIterator>(it, output, _Capsule, init);
}

/**
 * @hidden
 */
function _Transform_initialize<T, Ret,
		InputIterator extends Readonly<IForwardIterator<T, InputIterator>>,
		OutputIterator extends Writeonly<IForwardIterator<Ret, OutputIterator>>>
	(it: InputIterator, output: OutputIterator, unary: (val: T) => Ret, init: T = undefined): Ret
{
	return output.value = unary(init === undefined 
		? it.value
		: init);
}