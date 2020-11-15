/**
 * @packageDocumentation
 * @module std
 */
import { InsertIteratorBase } from "../internal/iterator/InsertIteratorBase";
import { IPushBack } from "../internal/container/partial/IPushBack";
import { Vector } from "../container/Vector";
/**
 * Back insert iterator.
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export declare class BackInsertIterator<Source extends IPushBack<BackInsertIterator.ValueType<Source>>> extends InsertIteratorBase<BackInsertIterator.ValueType<Source>, BackInsertIterator<Source>> {
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
    set value(val: BackInsertIterator.ValueType<Source>);
    /**
     * @inheritDoc
     */
    equals(obj: BackInsertIterator<Source>): boolean;
}
/**
 *
 */
export declare namespace BackInsertIterator {
    /**
     * Deduct value type.
     */
    type ValueType<Source extends IPushBack<any>> = Source extends IPushBack<infer T> ? T : unknown;
    /**
     * Deduct source type.
     */
    type SourceType<Source extends Array<any> | IPushBack<any>> = Source extends Array<infer T> ? Vector<T> : Source;
}
//# sourceMappingURL=BackInsertIterator.d.ts.map