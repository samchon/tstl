namespace std
{
	export interface IBidirectionalIterator<T> extends IForwardIterator<T>
	{
		prev(): IBidirectionalIterator<T>;
	}
}
