/**
 * @packageDocumentation
 * @module std.internal
 */
import { IContainer } from "../../../base/container/IContainer";
import { ILinearContainerBase } from "./ILinearContainerBase";
import { Container } from "../../../base/container/Container";
import { IForwardIterator } from "../../../iterator/IForwardIterator";
import { ReverseIterator } from "../../iterator/ReverseIterator";
import { ListIterator } from "../../iterator/ListIterator";
/**
 * Basic List Container.
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export declare abstract class ListContainer<T, SourceT extends IContainer<T, SourceT, IteratorT, ReverseIteratorT, T>, IteratorT extends ListIterator<T, SourceT, IteratorT, ReverseIteratorT, T>, ReverseIteratorT extends ReverseIterator<T, SourceT, IteratorT, ReverseIteratorT, T>> extends Container<T, SourceT, IteratorT, ReverseIteratorT, T> implements ILinearContainerBase<T, SourceT, IteratorT, ReverseIteratorT, T> {
    private size_;
    protected begin_: IteratorT;
    protected end_: IteratorT;
    /**
     * Default Constructor.
     */
    protected constructor();
    protected abstract _Create_iterator(prev: IteratorT, next: IteratorT, val?: T): IteratorT;
    /**
     * @inheritDoc
     */
    assign(n: number, val: T): void;
    /**
     * @inheritDoc
     */
    assign<InputIterator extends Readonly<IForwardIterator<T, InputIterator>>>(first: InputIterator, last: InputIterator): void;
    /**
     * @inheritDoc
     */
    clear(): void;
    /**
     * @inheritDoc
     */
    resize(n: number): void;
    /**
     * @inheritDoc
     */
    begin(): IteratorT;
    /**
     * @inheritDoc
     */
    end(): IteratorT;
    /**
     * @inheritDoc
     */
    size(): number;
    /**
     * @inheritDoc
     */
    push_front(val: T): void;
    /**
     * @inheritDoc
     */
    push_back(val: T): void;
    /**
     * @inheritDoc
     */
    pop_front(): void;
    /**
     * @inheritDoc
     */
    pop_back(): void;
    /**
     * @inheritDoc
     */
    push(...items: T[]): number;
    /**
     * @inheritDoc
     */
    insert(position: IteratorT, val: T): IteratorT;
    /**
     * @inheritDoc
     */
    insert(position: IteratorT, size: number, val: T): IteratorT;
    /**
     * @inheritDoc
     */
    insert<InputIterator extends Readonly<IForwardIterator<T, InputIterator>>>(position: IteratorT, begin: InputIterator, end: InputIterator): IteratorT;
    private _Insert_by_repeating_val;
    protected _Insert_by_range<InputIterator extends Readonly<IForwardIterator<T, InputIterator>>>(position: IteratorT, begin: InputIterator, end: InputIterator): IteratorT;
    /**
     * @inheritDoc
     */
    erase(position: IteratorT): IteratorT;
    /**
     * @inheritDoc
     */
    erase(first: IteratorT, last: IteratorT): IteratorT;
    protected _Erase_by_range(first: IteratorT, last: IteratorT): IteratorT;
    /**
     * @inheritDoc
     */
    swap(obj: SourceT): void;
}
//# sourceMappingURL=ListContainer.d.ts.map