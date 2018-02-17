namespace std
{
	export interface IOutputIterator<T>
	{
		value: T;
		next(): IOutputIterator<T>;
	}
}