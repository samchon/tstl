/// <reference path="../API.ts" />

namespace std
{
	export function logical_and<T>(x: T, y: T): boolean
	{
		return <any>x && <any>y;
	}

	export function logical_or<T>(x: T, y: T): boolean
	{
		return <any>x || <any>y;
	}

	export function logical_not<T>(x: T): boolean
	{
		return !<any>x;
	}

	export function bit_and(x: number, y: number): number
	{
		return x & y;
	}

	export function bit_or(x: number, y: number): number
	{
		return x | y;
	}

	export function bit_xor(x: number, y: number): number
	{
		return x ^ y;
	}
}