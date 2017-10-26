namespace std.base
{
	export interface IArrayContainer<T>
		extends ILinearContainer<T>
	{
		/* ---------------------------------------------------------
			ACCESSORS
		--------------------------------------------------------- */
		at(index: number): T;

		set(index: number, val: T): void;
	}

	export interface IArrayIterator<T>
		extends ILinearIterator<T>
	{
		source(): IArrayContainer<T>;

		index(): number;

		prev(): IArrayIterator<T>;

		next(): IArrayIterator<T>;
	}
}