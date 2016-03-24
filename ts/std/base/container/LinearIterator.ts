namespace std.base.container
{
	export interface ILinearIterator<T>
		extends Iterator<T>
	{
		value: T;

		swap(obj: ILinearIterator<T>): void;

		prev(): ILinearIterator<T>;
		next(): ILinearIterator<T>;
	}
}