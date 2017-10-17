namespace std.base
{
	export interface ISetContainer<T> extends SetContainer<T, ISetContainer<T>> {}
	export interface IUniqueSet<T> extends UniqueSet<T, IUniqueSet<T>> {}
	export interface IMultiSet<T> extends MultiSet<T, IMultiSet<T>> {}
}