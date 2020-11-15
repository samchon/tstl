/**
 * @packageDocumentation
 * @module std.internal
 */
import { ArrayContainer } from "./ArrayContainer";
import { IContainer } from "../../../base/container/IContainer";
import { IForwardIterator } from "../../../iterator/IForwardIterator";
import { ArrayIteratorBase } from "../../iterator/ArrayIteratorBase";
import { ArrayReverseIteratorBase } from "../../iterator/ArrayReverseIteratorBase";
export declare abstract class VectorContainer<T, SourceT extends IContainer<T, SourceT, IteratorT, ReverseT, T>, ArrayT extends VectorContainer<T, SourceT, ArrayT, IteratorT, ReverseT>, IteratorT extends ArrayIteratorBase<T, SourceT, ArrayT, IteratorT, ReverseT, T>, ReverseT extends ArrayReverseIteratorBase<T, SourceT, ArrayT, IteratorT, ReverseT, T>> extends ArrayContainer<T, SourceT, ArrayT, IteratorT, ReverseT, T> {
    protected data_: T[];
    /**
     * Default Constructor.
     */
    protected constructor();
    /**
     * @inheritDoc
     */
    assign(n: number, val: T): void;
    /**
     * @inheritDoc
     */
    assign<InputIterator extends Readonly<IForwardIterator<T, InputIterator>>>(begin: InputIterator, end: InputIterator): void;
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
    size(): number;
    protected _At(index: number): T;
    protected _Set(index: number, val: T): void;
    /**
     * Access data.
     *
     * @return An array capsuled by this {@link Vector}.
     */
    data(): Array<T>;
    /**
     * @inheritDoc
     */
    [Symbol.iterator](): IterableIterator<T>;
    /**
     * @inheritDoc
     */
    push(...items: T[]): number;
    /**
     * @inheritDoc
     */
    push_back(val: T): void;
    protected _Insert_by_range<InputIterator extends Readonly<IForwardIterator<T, InputIterator>>>(position: IteratorT, first: InputIterator, last: InputIterator): IteratorT;
    protected _Pop_back(): void;
    protected _Erase_by_range(first: IteratorT, last: IteratorT): IteratorT;
    /**
     * @inheritDoc
     */
    equals(obj: SourceT): boolean;
    /**
     * @inheritDoc
     */
    swap(obj: SourceT): void;
    /**
     * @inheritDoc
     */
    toJSON(): Array<T>;
}
//# sourceMappingURL=VectorContainer.d.ts.map