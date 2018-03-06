namespace std.base
{
	/** 
	 * @hidden
	 */
	export interface IContainer<T> 
		extends Container<T, 
			IContainer<T>,
			IIterator<T>,
			IReverseIterator<T>>
	{
	}

	/** 
	 * @hidden
	 */
	export interface IIterator<T> 
		extends Iterator<T, 
			IContainer<T>, 
			IIterator<T>,
			IReverseIterator<T>> 
	{
	}

	/** 
	 * @hidden
	 */
	export interface IReverseIterator<T>
		extends ReverseIterator<T, 
			IContainer<T>,
			IIterator<T>,
			IReverseIterator<T>>
	{
	}
}