namespace std
{
	export interface IRandomAccessIterator<T> extends IBidirectionalIterator<T>
	{
		index(): number;
		advance(n: number): IRandomAccessIterator<T>;
	}
}
