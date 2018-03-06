namespace std.base
{
	/** 
	 * @hidden
	 */
	export interface IArrayContainer<T>
		extends ArrayContainer<T, IArrayContainer<T>>
	{
	}
}