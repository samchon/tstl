namespace std.base
{
	export interface IContainer<T> 
		extends Container<T, 
			IContainer<T>,
			IIterator<T>,
			IReverseIterator<T>>
	{
	}

	export interface IIterator<T> 
		extends Iterator<T, 
			IContainer<T>, 
			IIterator<T>> 
	{
	}

	export interface IReverseIterator<T>
		extends ReverseIterator<T, 
			IContainer<T>,
			IIterator<T>,
			IReverseIterator<T>>
	{
	}
}