namespace std
{
	export interface IForwardIterator<T>
	{
		value: T;

		next(): IForwardIterator<T>;
		equals(obj: IForwardIterator<T>): boolean;
	}
}
