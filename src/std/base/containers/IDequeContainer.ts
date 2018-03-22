namespace std.base
{
	/**
	 * @hidden
	 */
	export interface _IDeque<T> extends _IPushFront<T>
	{
		/**
		 * @inheritDoc
		 */
		push_front(val: T): void;

		/**
		 * Erase the first element.
		 */
		pop_front(): void;
	}

	/**
	 * Interface for deque containers.
	 * 
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export interface IDequeContainer<T,
			SourceT extends IContainer<T, SourceT, IteratorT, ReverseIteratorT>, 
			IteratorT extends Iterator<T, SourceT, IteratorT, ReverseIteratorT>, 
			ReverseIteratorT extends ReverseIterator<T, SourceT, IteratorT, ReverseIteratorT>>
		extends ILinearContainer<T, SourceT, IteratorT, ReverseIteratorT>, _IDeque<T>
	{
	}
}