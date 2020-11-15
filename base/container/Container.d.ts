/**
 * @packageDocumentation
 * @module std.base
 */
import { IContainer } from "./IContainer";
import { IForwardIterator } from "../../iterator/IForwardIterator";
/**
 * Basic container.
 *
 * @template T Stored elements' type
 * @template SourceT Derived type extending this {@link Container}
 * @template IteratorT Iterator type
 * @template ReverseT Reverse iterator type
 * @template PElem Parent type of *T*, used for inserting elements through {@link assign} and {@link insert}.
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export declare abstract class Container<T extends PElem, SourceT extends Container<T, SourceT, IteratorT, ReverseT, PElem>, IteratorT extends IContainer.Iterator<T, SourceT, IteratorT, ReverseT, PElem>, ReverseT extends IContainer.ReverseIterator<T, SourceT, IteratorT, ReverseT, PElem>, PElem = T> implements IContainer<T, SourceT, IteratorT, ReverseT, PElem> {
    /**
     * @inheritDoc
     */
    abstract assign<InputIterator extends Readonly<IForwardIterator<PElem, InputIterator>>>(first: InputIterator, last: InputIterator): void;
    /**
     * @inheritDoc
     */
    abstract clear(): void;
    /**
     * @inheritDoc
     */
    abstract size(): number;
    /**
     * @inheritDoc
     */
    empty(): boolean;
    /**
     * @inheritDoc
     */
    abstract begin(): IteratorT;
    /**
     * @inheritDoc
     */
    abstract end(): IteratorT;
    /**
     * @inheritDoc
     */
    rbegin(): ReverseT;
    /**
     * @inheritDoc
     */
    rend(): ReverseT;
    /**
     * @inheritDoc
     */
    [Symbol.iterator](): IterableIterator<T>;
    /**
     * @inheritDoc
     */
    abstract push(...items: PElem[]): number;
    /**
     * @inheritDoc
     */
    abstract erase(pos: IteratorT): IteratorT;
    /**
     * @inheritDoc
     */
    abstract erase(first: IteratorT, last: IteratorT): IteratorT;
    /**
     * @inheritDoc
     */
    abstract swap(obj: SourceT): void;
    /**
     * @inheritDoc
     */
    toJSON(): Array<T>;
}
//# sourceMappingURL=Container.d.ts.map