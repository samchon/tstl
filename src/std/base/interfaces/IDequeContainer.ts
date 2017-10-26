namespace std.base
{
	export interface IDequeContainer<T> 
		extends ILinearContainer<T>
	{
		push_front(val: T): void;

		pop_front(): void;
	}
}