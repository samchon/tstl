//================================================================ 
/** @module std.base */
//================================================================
import { IForwardIterator } from "../../iterator/IForwardIterator";
import { IPointer } from "../../functional";

/**
 * @hidden
 */
export interface IForwardContainer<Iterator extends IForwardIterator<IPointer.ValueType<Iterator>, Iterator>>
{
    /**
     * Iterator to the first element.
     * 
     * @return Iterator to the first element.
     */
    begin(): Iterator;

    /**
     * Iterator to the end.
     * 
     * @return Iterator to the end.
     */
    end(): Iterator;
}
