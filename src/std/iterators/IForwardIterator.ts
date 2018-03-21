namespace std
{
	/**
	 * Forward iterator.
	 * 
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export interface IForwardIterator<T, Iterator extends IForwardIterator<T, Iterator> = IForwardIterator<T, any>>
		extends IPointer<T>
	{
		/**
		 * Get next iterator.
		 * 
		 * @return The next iterator.
		 */
		next(): Iterator;

		/**
		 * Test whether equal to other iterator.
		 * 
		 * @param obj The iterator to compare.
		 * @return Whether equal or not.
		 */
		equals(obj: Iterator): boolean;
	}
}
