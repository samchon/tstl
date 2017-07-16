namespace std
{
	export interface IForwardIterator<T>
	{
		readonly value: T;

		next(): IForwardIterator<T>;
		equals(obj: IForwardIterator<T>): boolean;
	}

	export interface IBidirectionalIterator<T>
	{
		prev(): IBidirectionalIterator<T>;
	}

	export interface IRandomAccessIterator<T>
	{
		index(): number;
	}
}
