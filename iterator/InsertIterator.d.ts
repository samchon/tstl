/**
 * @packageDocumentation
 * @module std
 */
import { InsertIteratorBase } from "../internal/iterator/InsertIteratorBase";
import { IForwardIterator } from "./IForwardIterator";
import { IPointer } from "../functional/IPointer";
import { IInsert } from "../internal/container/partial/IInsert";
/**
 * Insert iterator.
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export declare class InsertIterator<Container extends IInsert<Iterator>, Iterator extends IForwardIterator<IPointer.ValueType<Iterator>, Iterator>> extends InsertIteratorBase<IPointer.ValueType<Iterator>, InsertIterator<Container, Iterator>> {
    private container_;
    private it_;
    /**
     * Initializer Constructor.
     *
     * @param container Target container to insert.
     * @param it Iterator to the position to insert.
     */
    constructor(container: Container, it: Iterator);
    /**
     * @inheritDoc
     */
    set value(val: IPointer.ValueType<Iterator>);
    /**
     * @inheritDoc
     */
    equals(obj: InsertIterator<Container, Iterator>): boolean;
}
//# sourceMappingURL=InsertIterator.d.ts.map