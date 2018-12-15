//================================================================ 
/** @module std */
//================================================================
import { IBidirectionalIterator } from "./IBidirectionalIterator";

/**
 * Reversable iterator.
 * 
 * @author Jeongho Nam <http://samchon.org>
 */
export interface IReversableIterator<T,
		IteratorT extends IReversableIterator<T, IteratorT, ReverseT>,
		ReverseT extends IReverseIterator<T, IteratorT, ReverseT>>
	extends IBidirectionalIterator<T, IteratorT>
{
	/**
	 * Construct reverse iterator.
	 * 
	 * @return The reverse iterator.
	 */
	reverse(): ReverseT;
}

/**
 * Reverse iterator.
 * 
 * @author Jeongho Nam <http://samchon.org>
 */
export interface IReverseIterator<T,
		Base extends IReversableIterator<T, Base, This>,
		This extends IReverseIterator<T, Base, This>>
	extends IBidirectionalIterator<T, This>
{
	/**
	 * Get base iterator.
	 * 
	 * @return The base iterator.
	 */
	base(): Base;
}
