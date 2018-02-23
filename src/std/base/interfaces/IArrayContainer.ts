namespace std.base
{
	export interface IArrayContainer<T>
		extends ArrayContainer<T, IArrayContainer<T>>
	{
	}
}