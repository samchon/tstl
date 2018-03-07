namespace std.base
{
	export interface _IEmpty
	{
		empty(): boolean;
	}
	export interface _ISize
	{
		size(): number;
	}

	export interface _IInsert<T, Iterator extends IForwardIterator<T, Iterator>>
	{
		insert(it: Iterator, value: T): Iterator;
	}

	export interface _IPushFront<T>
	{
		push_front(val: T): void;
	}
	export interface _IPushBack<T>
	{
		push_back(val: T): void;
	}
}
