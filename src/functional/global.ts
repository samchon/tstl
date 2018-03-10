import { ISwappable } from "./ISwappable";

export function swap<T extends ISwappable<T>>(x: T, y: T)
{
	x.swap(y);
}