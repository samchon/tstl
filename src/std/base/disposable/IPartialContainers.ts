namespace std.base
{
	/* ---------------------------------------------------------
		CAPACITY
	--------------------------------------------------------- */
	/**
	 * @hidden
	 */
	export interface _IEmpty
	{
		/**
		 * Test whether container is empty.
		 */
		empty(): boolean;
	}

	/**
	 * @hidden
	 */
	export interface _ISize
	{
		/**
		 * Number of elements in the container.
		 */
		size(): number;
	}

	/* ---------------------------------------------------------
		INSERTER
	--------------------------------------------------------- */
	/**
	 * @hidden
	 */
	export interface _IInsert<T, Iterator extends IForwardIterator<T, Iterator>>
	{
		insert(it: Iterator, value: T): Iterator;
	}

	/**
	 * @hidden
	 */
	export interface _IPush<T>
	{
		/**
		 * Insert items at the end.
		 * 
		 * @param items Items to insert.
		 * @return Number of elements in the container after insertion.
		 */
		push(...items: T[]): number;
	}

	/**
	 * @hidden
	 */
	export interface _IPushFront<T>
	{
		push_front(val: T): void;
	}

	/**
	 * @hidden
	 */
	export interface _IPushBack<T>
	{
		push_back(val: T): void;
	}
}
