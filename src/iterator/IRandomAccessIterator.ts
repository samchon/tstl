//================================================================ 
/** @module std */
//================================================================
import { IBidirectionalIterator } from "./IBidirectionalIterator";

/**
 * Random access iterator.
 * 
 * @author Jeongho Nam <http://samchon.org>
 */
export interface IRandomAccessIterator<T, Iterator extends IRandomAccessIterator<T, Iterator> = IRandomAccessIterator<T, any>>
    extends IBidirectionalIterator<T, Iterator>
{
    /**
     * Get index.
     * 
     * @return The index.
     */
    index(): number;

    /**
     * Advance iterator.
     * 
     * @param n Step to advance.
     * @return The advanced iterator.
     */
    advance(n: number): Iterator;
}