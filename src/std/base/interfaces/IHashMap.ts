namespace std.base
{
    export interface IHashMap<Key, T, Source extends IMapContainer<Key, T>>
        extends MapContainer<Key, T, Source>
	{
		bucket_count(): number;

		bucket_size(n: number): number;

		max_load_factor(): number;

		max_load_factor(z: number): void;

		bucket(key: Key): number;

		reserve(n: number): void;

		rehash(n: number): void;
	}
}