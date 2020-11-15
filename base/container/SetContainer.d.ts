/**
 * @packageDocumentation
 * @module std.base
 */
import { IAssociativeContainer } from "../../internal/container/associative/IAssociativeContainer";
import { IContainer } from "./IContainer";
import { Container } from "./Container";
import { IForwardIterator } from "../../iterator/IForwardIterator";
import { ILinearContainerBase } from "../../internal/container/linear/ILinearContainerBase";
import { Pair } from "../../utility/Pair";
/**
 * Basic set container.
 *
 * @template Key Key type
 * @template Unique Whether duplicated key is blocked or not
 * @template Source Derived type extending this {@link SetContainer}
 * @template IteratorT Iterator type
 * @template ReverseT Reverse iterator type
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export declare abstract class SetContainer<Key, Unique extends boolean, SourceT extends SetContainer<Key, Unique, SourceT, IteratorT, ReverseT>, IteratorT extends SetContainer.Iterator<Key, Unique, SourceT, IteratorT, ReverseT>, ReverseT extends SetContainer.ReverseIterator<Key, Unique, SourceT, IteratorT, ReverseT>> extends Container<Key, SourceT, IteratorT, ReverseT, Key> implements IAssociativeContainer<Key, Key, SourceT, IteratorT, ReverseT, Key> {
    protected data_: ILinearContainerBase<Key, SourceT, IteratorT, ReverseT>;
    /**
     * Default Constructor.
     */
    protected constructor(factory: (thisArg: SourceT) => ILinearContainerBase<Key, SourceT, IteratorT, ReverseT>);
    /**
     * @inheritDoc
     */
    assign<InputIterator extends Readonly<IForwardIterator<Key, InputIterator>>>(first: InputIterator, last: InputIterator): void;
    /**
     * @inheritDoc
     */
    clear(): void;
    /**
     * @inheritDoc
     */
    abstract find(key: Key): IteratorT;
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
    has(key: Key): boolean;
    /**
     * @inheritDoc
     */
    abstract count(key: Key): number;
    /**
     * @inheritDoc
     */
    size(): number;
    /**
     * @inheritDoc
     */
    push(...items: Key[]): number;
    insert(key: Key): SetContainer.InsertRet<Key, Unique, SourceT, IteratorT, ReverseT>;
    insert(hint: IteratorT, key: Key): IteratorT;
    insert<InputIterator extends Readonly<IForwardIterator<Key, InputIterator>>>(first: InputIterator, last: InputIterator): void;
    protected abstract _Insert_by_key(key: Key): SetContainer.InsertRet<Key, Unique, SourceT, IteratorT, ReverseT>;
    protected abstract _Insert_by_hint(hint: IteratorT, key: Key): IteratorT;
    protected abstract _Insert_by_range<InputIterator extends Readonly<IForwardIterator<Key, InputIterator>>>(begin: InputIterator, end: InputIterator): void;
    /**
     * @inheritDoc
     */
    erase(key: Key): number;
    /**
     * @inheritDoc
     */
    erase(pos: IteratorT): IteratorT;
    /**
     * @inheritDoc
     */
    erase(first: IteratorT, last: IteratorT): IteratorT;
    protected abstract _Erase_by_val(key: Key): number;
    protected _Erase_by_range(first: IteratorT, last?: IteratorT): IteratorT;
    /**
     * @inheritDoc
     */
    abstract swap(obj: SourceT): void;
    /**
     * @inheritDoc
     */
    abstract merge(source: SourceT): void;
    protected abstract _Handle_insert(first: IteratorT, last: IteratorT): void;
    protected abstract _Handle_erase(first: IteratorT, last: IteratorT): void;
}
/**
 *
 */
export declare namespace SetContainer {
    /**
     * Return type of {@link SetContainer.insert}
     */
    type InsertRet<Key, Unique extends boolean, Source extends SetContainer<Key, Unique, Source, IteratorT, ReverseT>, IteratorT extends Iterator<Key, Unique, Source, IteratorT, ReverseT>, ReverseT extends ReverseIterator<Key, Unique, Source, IteratorT, ReverseT>> = Unique extends true ? Pair<IteratorT, boolean> : IteratorT;
    /**
     * Iterator of {@link SetContainer}
     *
     * @author Jenogho Nam <http://samchon.org>
     */
    type Iterator<Key, Unique extends boolean, SourceT extends SetContainer<Key, Unique, SourceT, IteratorT, ReverseT>, IteratorT extends Iterator<Key, Unique, SourceT, IteratorT, ReverseT>, ReverseT extends ReverseIterator<Key, Unique, SourceT, IteratorT, ReverseT>> = Readonly<IContainer.Iterator<Key, SourceT, IteratorT, ReverseT, Key>>;
    /**
     * Reverse iterator of {@link SetContainer}
     *
     * @author Jenogho Nam <http://samchon.org>
     */
    type ReverseIterator<Key, Unique extends boolean, SourceT extends SetContainer<Key, Unique, SourceT, IteratorT, ReverseT>, IteratorT extends Iterator<Key, Unique, SourceT, IteratorT, ReverseT>, ReverseT extends ReverseIterator<Key, Unique, SourceT, IteratorT, ReverseT>> = Readonly<IContainer.ReverseIterator<Key, SourceT, IteratorT, ReverseT, Key>>;
}
//# sourceMappingURL=SetContainer.d.ts.map