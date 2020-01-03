import { IBidirectionalIterator } from "./IBidirectionalIterator";

import { IReverseIterator } from "./IReverseIterator";

/**
 * Reversable iterator
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