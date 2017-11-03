namespace std
{
	export interface IForwardIterator<T>
	{
		readonly value: T;

		next(): IForwardIterator<T>;
		advance(n: number): IForwardIterator<T>;
		
		equals(obj: IForwardIterator<T>): boolean;
	}
}
