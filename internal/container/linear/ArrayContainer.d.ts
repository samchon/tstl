/**
 * @packageDocumentation
 * @module std.internal
 */
import { ILinearContainerBase } from "./ILinearContainerBase";
import { Container } from "../../../base/container/Container";
import { IContainer } from "../../../base/container/IContainer";
import { IForwardIterator } from "../../../iterator/IForwardIterator";
import { ArrayIteratorBase } from "../../iterator/ArrayIteratorBase";
import { ArrayReverseIteratorBase } from "../../iterator/ArrayReverseIteratorBase";
/**
 * Base array container.
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export declare abstract class ArrayContainer<T extends ElemT, SourceT extends IContainer<T, SourceT, IteratorT, ReverseT, ElemT>, ArrayT extends ArrayContainer<T, SourceT, ArrayT, IteratorT, ReverseT, ElemT>, IteratorT extends ArrayIteratorBase<T, SourceT, ArrayT, IteratorT, ReverseT, ElemT>, ReverseT extends ArrayReverseIteratorBase<T, SourceT, ArrayT, IteratorT, ReverseT, ElemT>, ElemT> extends Container<T, SourceT, IteratorT, ReverseT, ElemT> implements ILinearContainerBase<T, SourceT, IteratorT, ReverseT, ElemT> {
    /**
     * @inheritDoc
     */
    abstract resize(n: number): void;
    protected abstract source(): SourceT;
    /**
     * @inheritDoc
     */
    begin(): IteratorT;
    /**
     * @inheritDoc
     */
    end(): IteratorT;
    abstract nth(index: number): IteratorT;
    /**
     * Get element at specific position.
     *
     * @param index Specific position.
     * @return The element at the *index*.
     */
    at(index: number): T;
    protected abstract _At(index: number): T;
    /**
     * Change element at specific position.
     *
     * @param index Specific position.
     * @param val The new value to change.
     */
    set(index: number, val: T): void;
    protected abstract _Set(index: number, val: T): void;
    /**
     * @inheritDoc
     */
    front(): T;
    /**
     * @inheritDoc
     */
    front(val: T): void;
    /**
     * @inheritDoc
     */
    back(): T;
    /**
     * @inheritDoc
     */
    back(val: T): void;
    /**
     * @inheritDoc
     */
    abstract push_back(val: T): void;
    /**
     * @inheritDoc
     */
    insert(pos: IteratorT, val: T): IteratorT;
    /**
     * @inheritDoc
     */
    insert(pos: IteratorT, n: number, val: T): IteratorT;
    /**
     * @inheritDoc
     */
    insert<InputIterator extends Readonly<IForwardIterator<T, InputIterator>>>(pos: IteratorT, first: InputIterator, last: InputIterator): IteratorT;
    protected _Insert_by_repeating_val(position: IteratorT, n: number, val: T): IteratorT;
    protected abstract _Insert_by_range<InputIterator extends Readonly<IForwardIterator<T, InputIterator>>>(pos: IteratorT, first: InputIterator, last: InputIterator): IteratorT;
    /**
     * @inheritDoc
     */
    pop_back(): void;
    protected abstract _Pop_back(): void;
    /**
     * @inheritDoc
     */
    erase(it: IteratorT): IteratorT;
    /**
     * @inheritDoc
     */
    erase(first: IteratorT, last: IteratorT): IteratorT;
    protected abstract _Erase_by_range(first: IteratorT, last: IteratorT): IteratorT;
}
//# sourceMappingURL=ArrayContainer.d.ts.map