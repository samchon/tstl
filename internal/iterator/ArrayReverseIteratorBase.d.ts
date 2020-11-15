/**
 * @packageDocumentation
 * @module std.internal
 */
import { IRandomAccessIterator } from "../../iterator/IRandomAccessIterator";
import { ReverseIterator } from "./ReverseIterator";
import { IContainer } from "../../base/container/IContainer";
import { ArrayContainer } from "../container/linear/ArrayContainer";
import { ArrayIteratorBase } from "./ArrayIteratorBase";
/**
 * Reverse iterator of Array Containers.
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export declare abstract class ArrayReverseIteratorBase<T extends ElemT, SourceT extends IContainer<T, SourceT, IteratorT, ReverseT, ElemT>, ArrayT extends ArrayContainer<T, SourceT, ArrayT, IteratorT, ReverseT, ElemT>, IteratorT extends ArrayIteratorBase<T, SourceT, ArrayT, IteratorT, ReverseT, ElemT>, ReverseT extends ArrayReverseIteratorBase<T, SourceT, ArrayT, IteratorT, ReverseT, ElemT>, ElemT> extends ReverseIterator<T, SourceT, IteratorT, ReverseT, ElemT> implements IRandomAccessIterator<T, ReverseT> {
    /**
     * @inheritDoc
     */
    advance(n: number): ReverseT;
    /**
     * @inheritDoc
     */
    index(): number;
    /**
     * @inheritDoc
     */
    get value(): T;
    /**
     * @inheritDoc
     */
    set value(val: T);
}
//# sourceMappingURL=ArrayReverseIteratorBase.d.ts.map