namespace std
{
	/**
	 * <p> Return distance between {@link Iterator iterators}. </p>
	 * 
	 * <p> Calculates the number of elements between <i>first</i> and <i>last</i>. </p>
	 * 
	 * <p> If it is a {@link IArrayIterator random-access iterator}, the function uses operator- to calculate this. 
	 * Otherwise, the function uses the increase operator {@link Iterator.next next()} repeatedly. </p>
	 * 
	 * @param first Iterator pointing to the initial element.
	 * @param last Iterator pointing to the final element. This must be reachable from first.
	 *
	 * @return The number of elements between first and last.
	 */
	export function distance<T, Iterator extends base.Iterator<T>>
		(first: Iterator, last: Iterator): number
	{
		if (first instanceof VectorIterator || first instanceof DequeIterator)
			return (<any>last as VectorIterator<T>).index - (<any>first as VectorIterator<T>).index;
		
		let length: number = 0;
		for (; !first.equal_to(last); first = first.next() as Iterator)
			length++;

		return length;
	}
}