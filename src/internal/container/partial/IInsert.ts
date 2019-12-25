//================================================================ 
/** @module std.base */
//================================================================
import { IForwardIterator } from "../../../iterator/IForwardIterator";
import { IPointer } from "../../../functional/IPointer";

/**
 * @hidden
 */
export interface IInsert<Iterator extends IForwardIterator<IPointer.ValueType<Iterator>, Iterator>>
{
    insert(it: Iterator, value: IPointer.ValueType<Iterator>): Iterator;
}