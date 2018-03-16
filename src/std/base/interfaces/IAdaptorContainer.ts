namespace std.base
{
	export interface IAdaptorContainer<T, Source extends IAdaptorContainer<T, Source>>
	{
		size(): number;
		empty(): boolean;

		push(...elems: T[]): void;
		pop(): void;

		swap(obj: Source): void;
	}
}