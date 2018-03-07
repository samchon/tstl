namespace std.base
{
	/** 
	 * @hidden
	 */
	export interface ISetContainer<T> extends SetContainer<T, ISetContainer<T>> {}

	/** 
	 * @hidden
	 */
	export interface IUniqueSet<T> extends UniqueSet<T, IUniqueSet<T>> {}

	/** 
	 * @hidden
	 */
	export interface IMultiSet<T> extends MultiSet<T, IMultiSet<T>> {}
}