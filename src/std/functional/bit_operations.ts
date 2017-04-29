/// <reference path="../API.ts" />

namespace std
{
	/**
	 * Logical AND function object class.
	 * 
	 * Binary function object class whose call returns the result of the <i>logical "and"</i> operation between its two 
	 * arguments (as returned by operator &&).
	 * 
	 * Generically, function objects are instances of a class with member function operator() defined. This member 
	 * function allows the object to be used with the same syntax as a function call.
	 * 
	 * @param x First element.
	 * @param y Second element.
	 * 
	 * @return Result of logical AND operation.
	 */
	export function logical_and<T>(x: T, y: T): boolean
	{
		return <any>x && <any>y;
	}

	/**
	 * Logical OR function object class.
	 * 
	 * Binary function object class whose call returns the result of the <i>logical "or"</i> operation between its two 
	 * arguments (as returned by operator ||).
	 * 
	 * Generically, function objects are instances of a class with member function operator() defined. This member 
	 * function allows the object to be used with the same syntax as a function call.
	 * 
	 * @param x First element.
	 * @param y Second element.
	 * 
	 * @return Result of logical OR operation.
	 */
	export function logical_or<T>(x: T, y: T): boolean
	{
		return <any>x || <any>y;
	}

	/**
	 * Logical NOT function object class.
	 * 
	 * Unary function object class whose call returns the result of the <i>logical "not"</i> operation on its argument 
	 * (as returned by operator !).
	 * 
	 * Generically, function objects are instances of a class with member function operator() defined. This member 
	 * function allows the object to be used with the same syntax as a function call.
	 * 
	 * @param x Target element.
	 *
	 * @return Result of logical NOT operation.
	 */
	export function logical_not<T>(x: T): boolean
	{
		return !<any>x;
	}

	/**
	 * Bitwise AND function object class.
	 * 
	 * Binary function object class whose call returns the result of applying the <i>bitwise "and"</i> operation between 
	 * its two arguments (as returned by operator &).
	 * 
	 * @param x First element.
	 * @param y Second element.
	 * 
	 * @return Result of bitwise AND operation.
	 */
	export function bit_and(x: number, y: number): number
	{
		return x & y;
	}

	/**
	 * Bitwise OR function object class.
	 * 
	 * Binary function object class whose call returns the result of applying the <i>bitwise "and"</i> operation between 
	 * its two arguments (as returned by operator &).
	 * 
	 * @param x First element.
	 * @param y Second element.
	 * 
	 * @return Result of bitwise OR operation.
	 */
	export function bit_or(x: number, y: number): number
	{
		return x | y;
	}

	/**
	 * Bitwise XOR function object class.
	 * 
	 * Binary function object class whose call returns the result of applying the <i>bitwise "exclusive or"</i> 
	 * operation between its two arguments (as returned by operator ^).
	 * 
	 * @param x First element.
	 * @param y Second element.
	 * 
	 * @return Result of bitwise XOR operation.
	 */
	export function bit_xor(x: number, y: number): number
	{
		return x ^ y;
	}
}