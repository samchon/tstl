//================================================================ 
/** @module std.base */
//================================================================
import { IForwardContainer } from "./IForwardContainer";
import { IReversableIterator, IReverseIterator } from "../../iterator/IReverseIterator";
import { IPointer } from "../../functional/IPointer";

/**
 * @hidden
 */
export interface IBidirectionalContainer< 
        IteratorT extends IReversableIterator<IPointer.ValueType<IteratorT>, IteratorT, ReverseIteratorT>,
        ReverseIteratorT extends IReverseIterator<IPointer.ValueType<IteratorT>, IteratorT, ReverseIteratorT>>
    extends IForwardContainer<IteratorT>
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