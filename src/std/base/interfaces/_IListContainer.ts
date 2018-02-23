namespace std.base
{
	export interface _IListContainer<T>
		extends _ListContainer<T, 
			IContainer<T>, // source
			_IListIterator<T>, // iterator
			IReverseIterator<T>> // reverse-iterator
	{
	}

	export interface _IListIterator<T>
		extends _ListIterator<T, IContainer<T>, _IListIterator<T>>
	{
	}
}