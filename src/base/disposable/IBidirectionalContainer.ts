import { IForwardContainer } from "./IForwardContainer";
import { IReversableIterator, IReverseIterator } from "../../iterators/IReverseIterator";

/**
 * @hidden
 */
export interface IBidirectionalContainer<T, 
		IteratorT extends IReversableIterator<T, IteratorT, ReverseIteratorT>,
		ReverseIteratorT extends IReverseIterator<T, IteratorT, ReverseIteratorT>>
	extends IForwardContainer<T, IteratorT>
{
	/**
	 * Reverse iterator to the first element in reverse.
	 * 
	 * @return Reverse iterator to the first.
	 */
	rbegin(): ReverseIteratorT;

	/**
	 * Reverse iterator to the reverse end.
	 * 
	 * @return Reverse iterator to the end.
	 */
	rend(): ReverseIteratorT;
}