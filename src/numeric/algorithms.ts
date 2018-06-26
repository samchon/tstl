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

export function accumulate<T,
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

export function inner_product<X, Y,
		InputIterator1 extends General<IForwardIterator<X, InputIterator1>>,
		InputIterator2 extends General<IForwardIterator<Y, InputIterator2>>>
	(
		first1: InputIterator1, last1: InputIterator1, first2: InputIterator2,
		value: X,
		op1: BinaryOperator<X> = plus, 
		op2: BinaryOperator<X, Y> = multiplies
	): X
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
		OutputIterator extends Writeonly<IForwardIterator<T, OutputIterator>>>
	(
		first: InputIterator, last: InputIterator, output: OutputIterator,
		op: BinaryOperator<T> = minus
	): OutputIterator
{
	if (first.equals(last))
		return output;

	// INITIALIZE
	let before: T;
	[first, output, before] = _Initialize(first, output);

	// COMPUTE OPERATIONS
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
		OutputIterator extends Writeonly<IForwardIterator<T, OutputIterator>>>
	(
		first: InputIterator, last: InputIterator, output: OutputIterator,
		op: BinaryOperator<T> = plus
	): OutputIterator
{
	if (first.equals(last))
		return output;

	// INITIALIZE
	let sum: T; 
	[first, output, sum] = _Initialize(first, output);

	// COMPUTE OPERATIONS
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
		OutputIterator extends Writeonly<IForwardIterator<T, OutputIterator>>>
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
		OutputIterator extends Writeonly<IForwardIterator<T, OutputIterator>>>
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
		OutputIterator extends Writeonly<IForwardIterator<Ret, OutputIterator>>>
	(
		first: InputIterator, last: InputIterator, output: OutputIterator,
		binary: BinaryOperator<Ret>,
		unary: (val: T) => Ret,
		init: T = undefined
	): OutputIterator
{
	if (first.equals(last))
		return output;

	// INITIALIZE
	let before: Ret; 
	[first, output, before] = _Transform_initialize(first, output, unary, init);

	// COMPUTE OPERATIONS
	for (; !first.equals(last); first = first.next())
	{
		before = binary(before, unary(first.value));
		
		output.value = before;
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

	// INITIALIZE
	let x: Ret = unary(first.value);
	let y: Ret; 
	[first, output, y] = _Transform_initialize(first, output, unary, init);

	// COMPUTE OPERATIONS
	for (; !first.equals(last); first = first.next())
	{
		y = binary(x, y);
		x = unary(first.value);

		output.value = y;
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
type BinaryOperator<X, Y=X> = (x: X, y: Y) => X;

/**
 * @hidden
 */
function _Capsule<Param, Ret extends Param = Param>(x: Param): Ret
{
	return x as Ret;
}

/**
 * @hidden
 */
function _Initialize<T, 
		InputIterator extends Readonly<IForwardIterator<T, InputIterator>>,
		OutputIterator extends Writeonly<IForwardIterator<T, OutputIterator>>>
	(first: InputIterator, output: OutputIterator, init: T = undefined)
		: [InputIterator, OutputIterator, T]
{
	return _Transform_initialize<T, T, InputIterator, OutputIterator>(first, output, _Capsule, init);
}

/**
 * @hidden
 */
function _Transform_initialize<T, Ret,
		InputIterator extends Readonly<IForwardIterator<T, InputIterator>>,
		OutputIterator extends Writeonly<IForwardIterator<Ret, OutputIterator>>>
	(first: InputIterator, output: OutputIterator, unary: (val: T) => Ret, init: T = undefined)
		: [InputIterator, OutputIterator, Ret]
{
	// WRITE THE FIRST OR INITIAL VALUE
	let ret: Ret = unary(init === undefined 
		? first.value
		: init);
	output.value = ret;

	// RETURNS WITH ADVANCES
	return [first.next(), output.next(), ret];
}