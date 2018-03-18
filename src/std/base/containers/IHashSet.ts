namespace std.base
{
    export interface IHashSet<T, Source extends SetContainer<T, Source>>
        extends SetContainer<T, Source>, _IHashContainer<T>
	{
		/* ---------------------------------------------------------
			ITERATORS
		--------------------------------------------------------- */
		begin(): SetIterator<T, Source>;
		begin(index: number): SetIterator<T, Source>;

		end(): SetIterator<T, Source>;
		end(index: number): SetIterator<T, Source>;
	}
}