/**
 * @packageDocumentation
 * @module std.internal
 */
import { IForwardIterator } from "../../iterator/IForwardIterator";
import { Writeonly } from "../functional/Writeonly";
export declare abstract class InsertIteratorBase<T, This extends InsertIteratorBase<T, This>> implements Writeonly<IForwardIterator<T, This>> {
    /**
     * Set value.
     *
     * @param val The value to set.
     */
    abstract set value(val: T);
    /**
     * @inheritDoc
     */
    next(): This;
    /**
     * @inheritDoc
     */
    abstract equals(obj: This): boolean;
}
//# sourceMappingURL=InsertIteratorBase.d.ts.map