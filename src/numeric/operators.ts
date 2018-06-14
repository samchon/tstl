import { IComputable } from "./IComputable";

export function plus<X, Y = X, Ret = X>(x: X, y: Y): Ret
{
	if ((<any>x as IComputable<Y, Ret>).plus instanceof Function)
		return (<any>x as IComputable<Y, Ret>).plus(y);
	else
		return <any>x + y;
}
export function minus<X, Y = X, Ret = X>(x: X, y: Y): Ret
{
	if ((<any>x as IComputable<Y, Ret>).minus instanceof Function)
		return (<any>x as IComputable<Y, Ret>).minus(y);
	else
		return <any>(<any>x - <any>y);
}
export function negate<X>(x: X): X
{
	if ((<any>x as IComputable<X>).negate instanceof Function)
		return (<any>x as IComputable<X>).negate();
	else
		return <any>-x;
}

export function multiplies<X, Y = X, Ret = X>(x: X, y: Y): Ret
{
	if ((<any>x as IComputable<Y, Ret>).multiplies instanceof Function)
		return (<any>x as IComputable<Y, Ret>).multiplies(y);
	else
		return <any>(<any>x * <any>y);
}
export function divides<X, Y = X, Ret = X>(x: X, y: Y): Ret
{
	if ((<any>x as IComputable<Y, Ret>).divides instanceof Function)
		return (<any>x as IComputable<Y, Ret>).divides(y);
	else
		return <any>(<any>x / <any>y);
}
export function modules<X, Y = X, Ret = X>(x: X, y: Y): Ret
{
	if ((<any>x as IComputable<Y, Ret>).modules instanceof Function)
		return (<any>x as IComputable<Y, Ret>).modules(y);
	else
		return <any>(<any>x % <any>y);
}