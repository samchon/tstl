/// <reference path="../API.ts" />

/** 
 * @hidden
 */
namespace std.JSArray
{
	export type Iterator<T> = Vector.Iterator<T>;
	export type ReverseIterator<T> = Vector.ReverseIterator<T>;

	export const Iterator = Vector.Iterator;
	export const ReverseIterator = Vector.ReverseIterator;
}
