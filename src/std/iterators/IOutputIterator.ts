namespace std
{
	export interface IOutputIterator<T>
	{
		value: T;

		next(): IOutputIterator<T>;
		equals(obj: IOutputIterator<T>): boolean;
	}

	export interface IOutputBidirectionalIterator<T> extends IOutputIterator<T>
	{
		prev(): IOutputBidirectionalIterator<T>;
	}
}