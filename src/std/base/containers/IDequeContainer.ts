namespace std.base
{
	export interface IDequeContainer<T,
			SourceT extends IContainer<T, SourceT, IteratorT, ReverseIteratorT>, 
			IteratorT extends Iterator<T, SourceT, IteratorT, ReverseIteratorT>, 
			ReverseIteratorT extends ReverseIterator<T, SourceT, IteratorT, ReverseIteratorT>>
		extends ILinearContainer<T, SourceT, IteratorT, ReverseIteratorT>
	{
		/**
		 * Insert an element at the first.
		 * 
		 * @param val Value to insert.
		 */
		push_front(val: T): void;

		/**
		 * Erase the first element.
		 */
		pop_front(): void;
	}
}