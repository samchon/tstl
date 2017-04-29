/// <reference path="../API.ts" />

namespace std
{
	/**
	 * Function object class for equality comparison.
	 *
	 * Binary function object class whose call returns whether its two arguments compare <i>equal</i> (as returned by 
	 * operator ==).
	 *
	 * Generically, function objects are instances of a class with member function {@link IComparable.equal_to equal_to}
	 * defined. This member function allows the object to be used with the same syntax as a function call.
	 *
	 * @param x First element to compare.
	 * @param y Second element to compare.
	 *
	 * @return Whether the arguments are equal.
	 */
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

	/**
	 * Function object class for non-equality comparison.
	 * 
	 * Binary function object class whose call returns whether its two arguments compare <i>not equal</i> (as returned 
	 * by operator operator!=).
	 * 
	 * Generically, function objects are instances of a class with member function {@link IComparable.equal_to equal_to} 
	 * defined. This member function allows the object to be used with the same syntax as a function call.
	 *
	 * @param x First element to compare.
	 * @param y Second element to compare.
	 *
	 * @return Whether the arguments are not equal.
	 */
	export function not_equal_to<T>(x: T, y: T): boolean
	{
		return !equal_to(x, y);
	}

	/**
	 * Function for less-than inequality comparison.
	 *
	 * Binary function returns whether the its first argument compares less than the second.
	 *
	 * Generically, function objects are instances of a class with member function {@link IComparable.less less} 
	 * defined. If an object doesn't have the method, then its own uid will be used to compare insteadly. 
	 * This member function allows the object to be used with the same syntax as a function call.
	 * 
	 * Objects of this class can be used on standard algorithms such as {@link sort sort()}</code>, 
	 * {@link merge merge()} or {@link TreeMap.lower_bound lower_bound()}.
	 *
	 * @param <T> Type of arguments to compare by the function call. The type shall supporrt the operation 
	 *			  <i>operator<()</i> or method {@link IComparable.less less}.
	 *
	 * @param x First element, the standard of comparison.
	 * @param y Second element compare with the first.
	 *
	 * @return Whether the first parameter is less than the second.
	 */
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

	/**
	 * Function object class for less-than-or-equal-to comparison.
	 * 
	 * Binary function object class whose call returns whether the its first argument compares {@link less less than} or 
	 * {@link equal_to equal to} the second (as returned by operator <=).
	 * 
	 * Generically, <i>function objects</i> are instances of a class with member function {@link IComparable.less less} 
	 * and {@link IComparable.equal_to equal_to} defined. This member function allows the object to be used with the same 
	 * syntax as a function call.
	 * 
	 * @param x First element, the standard of comparison.
	 * @param y Second element compare with the first.
	 * 
	 * @return Whether the <i>x</i> is {@link less less than} or {@link equal_to equal to} the <i>y</i>.
	 */
	export function less_equal<T>(x: T, y: T): boolean
	{
		return less(x, y) || equal_to(x, y);
	}

	/**
	 * Function for greater-than inequality comparison.
	 *
	 * Binary function returns whether the its first argument compares greater than the second.
	 *
	 * Generically, function objects are instances of a class with member function {@link less} and
	 * {@link equal_to equal_to()} defined. If an object doesn't have those methods, then its own uid will be used
	 * to compare insteadly. This member function allows the object to be used with the same syntax as a function 
	 * call.
	 * 
	 * Objects of this class can be used on standard algorithms such as {@link sort sort()}, 
	 * {@link merge merge()} or {@link TreeMap.lower_bound lower_bound()}.
	 *
	 * @param <T> Type of arguments to compare by the function call. The type shall supporrt the operation 
	 *			  <i>operator>()</i> or method {@link IComparable.greater greater}.
	 * 
	 * @return Whether the <i>x</i> is greater than the <i>y</i>.
	 */
	export function greater<T>(x: T, y: T): boolean
	{
		return !less_equal(x, y);
	}

	/**
	 * Function object class for greater-than-or-equal-to comparison.
	 * 
	 * Binary function object class whose call returns whether the its first argument compares 
	 * {@link greater greater than} or {@link equal_to equal to} the second (as returned by operator >=).
	 * 
	 * Generically, function objects are instances of a class with member function {@link IComparable.less less}
	 * defined. If an object doesn't have the method, then its own uid will be used to compare insteadly.
	 * This member function allows the object to be used with the same syntax as a function call.
	 * 
	 * @param x First element, the standard of comparison.
	 * @param y Second element compare with the first.
	 * 
	 * @return Whether the <i>x</i> is {@link greater greater than} or {@link equal_to equal to} the <i>y</i>.
	 */
	export function greater_equal<T>(x: T, y: T): boolean
	{
		return !less(x, y);
	}
}