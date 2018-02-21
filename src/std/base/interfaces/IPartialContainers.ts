namespace std.base
{
	export interface IEmpty
	{
		empty(): boolean;
	}
	export interface ISize
	{
		size(): number;
	}

	export interface IPushFront<T>
	{
		push_front(val: T): void;
	}
	export interface IPushBack<T>
	{
		push_back(val: T): void;
	}
}