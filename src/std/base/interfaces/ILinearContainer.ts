namespace std.base
{
	export interface ILinearContainer<T>
		extends Container<T,
			ILinearContainer<T>,
			ILinearIterator<T>,
			IReverseIterator<T>>
	{
		/* ---------------------------------------------------------
			CONSTRUCTORS
		--------------------------------------------------------- */
		assign(n: number, val: T): void;
		assign<U extends T, InputIterator extends Readonly<IForwardIterator<U>>>
			(begin: InputIterator, end: InputIterator): void;

		/* ---------------------------------------------------------
			ACCESSORS
		--------------------------------------------------------- */
		front(): T;
		front(val: T): void;

		back(): T;
		back(val: T): void;

		/* ---------------------------------------------------------
			ELEMENTS I/O
		--------------------------------------------------------- */
		push_back(val: T): void;
		pop_back(): void;

		insert(position: ILinearIterator<T>, val: T): ILinearIterator<T>;
		insert(position: ILinearIterator<T>, n: number, val: T): ILinearIterator<T>;
		insert<U extends T, InputIterator extends Readonly<IForwardIterator<U>>>
			(position: ILinearIterator<T>, first: InputIterator, last: InputIterator): ILinearIterator<T>;
	}

	export interface ILinearIterator<T>
		extends Iterator<T, 
			ILinearContainer<T>, 
			ILinearIterator<T>>
	{
		value: T;
	}

	export interface ILinearReverseIterator<T>
		extends ReverseIterator<T, 
			ILinearContainer<T>, 
			ILinearIterator<T>, 
			ILinearReverseIterator<T>>
	{
		value: T;
	}
}
