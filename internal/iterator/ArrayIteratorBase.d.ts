/**
 * @packageDocumentation
 * @module std.internal
 */
import { IContainer } from "../../base/container/IContainer";
import { IRandomAccessIterator } from "../../iterator/IRandomAccessIterator";
import { ArrayContainer } from "../container/linear/ArrayContainer";
import { ArrayReverseIteratorBase } from "./ArrayReverseIteratorBase";
/**
 * Iterator of Array Containers.
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export declare abstract class ArrayIteratorBase<T extends ElemT, SourceT extends IContainer<T, SourceT, IteratorT, ReverseT, ElemT>, ArrayT extends ArrayContainer<T, SourceT, ArrayT, IteratorT, ReverseT, ElemT>, IteratorT extends ArrayIteratorBase<T, SourceT, ArrayT, IteratorT, ReverseT, ElemT>, ReverseT extends ArrayReverseIteratorBase<T, SourceT, ArrayT, IteratorT, ReverseT, ElemT>, ElemT> implements IContainer.Iterator<T, SourceT, IteratorT, ReverseT, ElemT>, IRandomAccessIterator<T, IteratorT> {
    private array_;
    private index_;
    /**
     * Initializer Constructor.
     *
     * @param source Source container.
     * @param index Index number.
     */
    constructor(array: ArrayT, index: number);
    /**
     * @inheritDoc
     */
    abstract reverse(): ReverseT;
    /**
     * @inheritDoc
     */
    abstract source(): SourceT;
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
    /**
     * @inheritDoc
     */
    prev(): IteratorT;
    /**
     * @inheritDoc
     */
    next(): IteratorT;
    /**
     * @inheritDoc
     */
    advance(n: number): IteratorT;
    /**
     * @inheritDoc
     */
    equals(obj: IteratorT): boolean;
}
//# sourceMappingURL=ArrayIteratorBase.d.ts.map