namespace std.base
{
    export interface IHashMap<Key, T, Source extends IMapContainer<Key, T>>
        extends MapContainer<Key, T, Source>
	{
		hash_function(): (key: Key) => number;
		key_eq(): (x: Key, y: Key) => boolean;

		bucket(key: Key): number;
		bucket_count(): number;
		bucket_size(n: number): number;

		load_factor(): number;
		max_load_factor(): number;
		max_load_factor(z: number): void;

		reserve(n: number): void;
		rehash(n: number): void;
	}
}