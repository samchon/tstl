/**
 * Test whether two arguments are equal.
 * 
 * @param x The first argument to compare.
 * @param y The second argument to compare.
 * @return Whether two arguments are equal or not.
 */
export function equal_to<T>(x: T, y: T): boolean
{
	if (x instanceof Object)
	{
		if ((x as any).equals)
			return (x as any).equals(y);
		else
			return x == y;
	}
	else
		return x == y;
}

/**
 * Test whether two arguments are not equal.
 * 
 * @param x The first argument to compare.
 * @param y The second argument to compare.
 * @return Returns `true`, if two arguments are not equal, otherwise `false`.
 */
export function not_equal_to<T>(x: T, y: T): boolean
{
	return !equal_to(x, y);
}

/**
 * Test whether *x* is less than *y*.
 * 
 * @param x The first argument to compare.
 * @param y The second argument to compare.
 * @return Whether *x* is less than *y*.
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
 * Test whether *x* is less than or equal to *y*.
 * 
 * @param x The first argument to compare.
 * @param y The second argument to compare.
 * @return Whether *x* is less than or equal to *y*.
 */
export function less_equal<T>(x: T, y: T): boolean
{
	return less(x, y) || equal_to(x, y);
}

/**
 * Test whether *x* is greater than *y*.
 * 
 * @param x The first argument to compare.
 * @param y The second argument to compare.
 * @return Whether *x* is greater than *y*.
 */
export function greater<T>(x: T, y: T): boolean
{
	return !less_equal(x, y);
}

/**
 * Test whether *x* is greater than or equal to *y*.
 * 
 * @param x The first argument to compare.
 * @param y The second argument to compare.
 * @return Whether *x* is greater than or equal to *y*.
 */
export function greater_equal<T>(x: T, y: T): boolean
{
	return !less(x, y);
}