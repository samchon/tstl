namespace std
{
	export interface IForwardIterator<T>
	{
		readonly value: T;

		next(): IForwardIterator<T>;
		advance(n: number): IForwardIterator<T>;

		equals(obj: IForwardIterator<T>): boolean;
	}

	export interface IBidirectionalIterator<T> extends IForwardIterator<T>
	{
		prev(): IBidirectionalIterator<T>;
	}

	export interface IRandomAccessIterator<T> extends IBidirectionalIterator<T>
	{
		index(): number;
	}
}
