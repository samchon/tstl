/**
 * @packageDocumentation
 * @module std
 */
import { InsertIteratorBase } from "../internal/iterator/InsertIteratorBase";
import { IPushFront } from "../internal/container/partial/IPushFront";
/**
 * Front insert iterator.
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export declare class FrontInsertIterator<Source extends IPushFront<FrontInsertIterator.ValueType<Source>>> extends InsertIteratorBase<FrontInsertIterator.ValueType<Source>, FrontInsertIterator<Source>> {
    private source_;
    /**
     * Initializer Constructor.
     *
     * @param source The source container.
     */
    constructor(source: Source);
    /**
     * @inheritDoc
     */
    set value(val: FrontInsertIterator.ValueType<Source>);
    /**
     * @inheritDoc
     */
    equals(obj: FrontInsertIterator<Source>): boolean;
}
export declare namespace FrontInsertIterator {
    /**
     * Deduct value type.
     */
    type ValueType<Source extends IPushFront<any>> = Source extends IPushFront<infer T> ? T : unknown;
}
//# sourceMappingURL=FrontInsertIterator.d.ts.map