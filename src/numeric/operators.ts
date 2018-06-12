export function plus<T>(x: T, y: T): T
{
	return <any>x + y;
}
export function minus<T>(x: T, y: T): T
{
	return <any>(<any>x - <any>y);
}
export function negate<T>(x: T): T
{
	return <any>-x;
}

export function multiplies<T>(x: T, y: T): T
{
	return <any>(<any>x * <any>y);
}
export function divides<T>(x: T, y: T): T
{
	return <any>(<any>x / <any>y);
}
export function modules<T>(x: T, y: T): T
{
	return <any>(<any>x % <any>y);
}