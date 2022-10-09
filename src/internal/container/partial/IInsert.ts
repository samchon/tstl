//================================================================
/**
 * @packageDocumentation
 * @module std.internal
 */
//================================================================
import { IForwardIterator } from "../../../iterator/IForwardIterator";
import { IPointer } from "../../../functional/IPointer";

export interface IInsert<
    Iterator extends IForwardIterator<IPointer.ValueType<Iterator>, Iterator>,
> {
    insert(it: Iterator, value: IPointer.ValueType<Iterator>): Iterator;
}
