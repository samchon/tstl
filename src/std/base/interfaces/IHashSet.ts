namespace std.base
{
    export interface IHashSet<T, Source extends SetContainer<T, Source>>
        extends SetContainer<T, Source>
	{
		hash_function(): (key:T) => number;
		key_eq(): (x: T, y: T) => boolean;

		bucket(key: T): number;
		bucket_count(): number;
		bucket_size(n: number): number;

		load_factor(): number;
		max_load_factor(): number;
		max_load_factor(z: number): void;

		reserve(n: number): void;
		rehash(n: number): void;
	}
}