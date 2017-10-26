namespace std.base
{
	export interface ILinearContainer<T> 
		extends Container<T>
	{
		/* ---------------------------------------------------------
			CONSTRUCTORS
		--------------------------------------------------------- */
		assign<U extends T, InputIterator extends Iterator<U>>
			(begin: InputIterator, end: InputIterator): void;
		
		assign(n: number, val: T): void;

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

		insert(position: Iterator<T>, val: T): Iterator<T>;

		insert(position: Iterator<T>, n: number, val: T): Iterator<T>;

		insert<U extends T, InputIterator extends Iterator<U>>
			(position: Iterator<T>, first: InputIterator, last: InputIterator): Iterator<T>;
	}

	export interface ILinearIterator<T>
		extends Iterator<T>
	{
		source(): ILinearContainer<T>;

		value: T;

		prev(): ILinearIterator<T>;

		next(): ILinearIterator<T>;
	}
}