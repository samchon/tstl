namespace std.base
{
    export interface ITreeSet<T, Source extends ISetContainer<T>>
        extends SetContainer<T, Source>
	{
		key_comp(): (x: T, y: T) => boolean;

		value_comp(): (x: T, y: T) => boolean;

		lower_bound(val: T): SetIterator<T, Source>;

		upper_bound(val: T): SetIterator<T, Source>;

		equal_range(val: T): Pair<SetIterator<T, Source>, SetIterator<T, Source>>;
	}
}