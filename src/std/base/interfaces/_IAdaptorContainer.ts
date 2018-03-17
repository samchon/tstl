namespace std.base
{
	export interface _IAdaptorContainer<T, Source extends _IAdaptorContainer<T, Source>>
	{
		size(): number;
		empty(): boolean;

		push(...elems: T[]): void;
		pop(): void;

		swap(obj: Source): void;
	}
}