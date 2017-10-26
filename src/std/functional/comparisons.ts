/// <reference path="../API.ts" />

namespace std
{
	export function equal_to<T>(x: T, y: T): boolean
	{
		if (x instanceof Object)
		{
			if ((x as any).equals)
				return (x as Object as IComparable<T>).equals(y);
			else
				return x == y;
		}
		else
			return x == y;
	}

	export function not_equal_to<T>(x: T, y: T): boolean
	{
		return !equal_to(x, y);
	}

	export function less<T>(x: T, y: T): boolean
	{
		if (x instanceof Object)
			if ((<any>x).less != undefined) // has less()
				return (<any>x).less(y);
			else
				return (<any>x).__get_m_iUID() < (<any>y).__get_m_iUID();
		else
			return x < y;
	}

	export function less_equal<T>(x: T, y: T): boolean
	{
		return less(x, y) || equal_to(x, y);
	}

	export function greater<T>(x: T, y: T): boolean
	{
		return !less_equal(x, y);
	}

	export function greater_equal<T>(x: T, y: T): boolean
	{
		return !less(x, y);
	}
}