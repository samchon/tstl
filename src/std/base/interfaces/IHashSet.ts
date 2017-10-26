namespace std.base
{
    export interface IHashSet<T, Source extends ISetContainer<T>>
        extends SetContainer<T, Source>
	{
		bucket_count(): number;

		bucket_size(n: number): number;

		max_load_factor(): number;

		max_load_factor(z: number): void;

		bucket(key: T): number;

		reserve(n: number): void;

		rehash(n: number): void;
	}
}