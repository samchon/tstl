/**
 * @packageDocumentation
 * @module std.internal
 */
import { IArrayContainer } from "../../base/container/IArrayContainer";
import { ArrayIteratorBase } from "./ArrayIteratorBase";
import { ArrayContainer } from "../container/linear/ArrayContainer";
import { ArrayReverseIterator } from "./ArrayReverseIterator";
export declare class ArrayIterator<T, SourceT extends ArrayContainer<T, SourceT, SourceT, ArrayIterator<T, SourceT>, ArrayReverseIterator<T, SourceT>, T>> extends ArrayIteratorBase<T, SourceT, SourceT, ArrayIterator<T, SourceT>, ArrayReverseIterator<T, SourceT>, T> implements IArrayContainer.Iterator<T, SourceT, ArrayIterator<T, SourceT>, ArrayReverseIterator<T, SourceT>> {
    /**
     * @inheritDoc
     */
    reverse(): ArrayReverseIterator<T, SourceT>;
    /**
     * @inheritDoc
     */
    source(): SourceT;
}
//# sourceMappingURL=ArrayIterator.d.ts.map