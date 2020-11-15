/**
 * @packageDocumentation
 * @module std.base
 */
import { IAssociativeContainer } from "../../internal/container/associative/IAssociativeContainer";
import { IContainer } from "./IContainer";
import { Container } from "./Container";
import { IForwardIterator } from "../../iterator/IForwardIterator";
import { ILinearContainerBase } from "../../internal/container/linear/ILinearContainerBase";
import { IPair } from "../../utility/IPair";
import { Entry } from "../../utility/Entry";
import { Pair } from "../../utility/Pair";
/**
 * Basic map container.
 *
 * @template Key Key type
 * @template T Mapped type
 * @template Unique Whether duplicated key is blocked or not
 * @template Source Derived type extending this {@link MapContainer}
 * @template IteratorT Iterator type
 * @template ReverseT Reverse iterator type
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export declare abstract class MapContainer<Key, T, Unique extends boolean, Source extends MapContainer<Key, T, Unique, Source, IteratorT, ReverseT>, IteratorT extends MapContainer.Iterator<Key, T, Unique, Source, IteratorT, ReverseT>, ReverseT extends MapContainer.ReverseIterator<Key, T, Unique, Source, IteratorT, ReverseT>> extends Container<Entry<Key, T>, Source, IteratorT, ReverseT, IPair<Key, T>> implements IAssociativeContainer<Key, Entry<Key, T>, Source, IteratorT, ReverseT, IPair<Key, T>> {
    protected data_: ILinearContainerBase<Entry<Key, T>, Source, IteratorT, ReverseT>;
    /**
     * Default Constructor.
     */
    protected constructor(factory: (thisArg: Source) => ILinearContainerBase<Entry<Key, T>, Source, IteratorT, ReverseT>);
    /**
     * @inheritDoc
     */
    assign<InputIterator extends Readonly<IForwardIterator<IPair<Key, T>, InputIterator>>>(first: InputIterator, last: InputIterator): void;
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
    push(...items: IPair<Key, T>[]): number;
    abstract emplace(key: Key, val: T): MapContainer.InsertRet<Key, T, Unique, Source, IteratorT, ReverseT>;
    abstract emplace_hint(hint: IteratorT, key: Key, val: T): IteratorT;
    insert(pair: IPair<Key, T>): MapContainer.InsertRet<Key, T, Unique, Source, IteratorT, ReverseT>;
    insert(hint: IteratorT, pair: IPair<Key, T>): IteratorT;
    insert<InputIterator extends Readonly<IForwardIterator<IPair<Key, T>, InputIterator>>>(first: InputIterator, last: InputIterator): void;
    protected abstract _Insert_by_range<InputIterator extends Readonly<IForwardIterator<IPair<Key, T>, InputIterator>>>(first: InputIterator, last: InputIterator): void;
    /**
     * @inheritDoc
     */
    erase(key: Key): number;
    /**
     * @inheritDoc
     */
    erase(it: IteratorT): IteratorT;
    /**
     * @inheritDoc
     */
    erase(begin: IteratorT, end: IteratorT): IteratorT;
    protected abstract _Erase_by_key(key: Key): number;
    protected _Erase_by_range(first: IteratorT, last?: IteratorT): IteratorT;
    /**
     * @inheritDoc
     */
    abstract swap(obj: Source): void;
    /**
     * Merge two containers.
     *
     * @param source Source container to transfer.
     */
    abstract merge(source: Source): void;
    protected abstract _Handle_insert(first: IteratorT, last: IteratorT): void;
    protected abstract _Handle_erase(first: IteratorT, last: IteratorT): void;
}
/**
 *
 */
export declare namespace MapContainer {
    /**
     * Return type of {@link MapContainer.insert}
     */
    export type InsertRet<Key, T, Unique extends boolean, SourceT extends MapContainer<Key, T, Unique, SourceT, IteratorT, Reverse>, IteratorT extends Iterator<Key, T, Unique, SourceT, IteratorT, Reverse>, Reverse extends ReverseIterator<Key, T, Unique, SourceT, IteratorT, Reverse>> = Unique extends true ? Pair<IteratorT, boolean> : IteratorT;
    /**
     * Iterator of {@link MapContainer}
     *
     * @author Jenogho Nam <http://samchon.org>
     */
    export type Iterator<Key, T, Unique extends boolean, SourceT extends MapContainer<Key, T, Unique, SourceT, IteratorT, ReverseT>, IteratorT extends Iterator<Key, T, Unique, SourceT, IteratorT, ReverseT>, ReverseT extends ReverseIterator<Key, T, Unique, SourceT, IteratorT, ReverseT>> = IteratorBase<Key, T> & Readonly<IContainer.Iterator<Entry<Key, T>, SourceT, IteratorT, ReverseT, IPair<Key, T>>>;
    /**
     * Reverse iterator of {@link MapContainer}
     *
     * @author Jenogho Nam <http://samchon.org>
     */
    export type ReverseIterator<Key, T, Unique extends boolean, SourceT extends MapContainer<Key, T, Unique, SourceT, IteratorT, ReverseT>, IteratorT extends Iterator<Key, T, Unique, SourceT, IteratorT, ReverseT>, ReverseT extends ReverseIterator<Key, T, Unique, SourceT, IteratorT, ReverseT>> = IteratorBase<Key, T> & Readonly<IContainer.ReverseIterator<Entry<Key, T>, SourceT, IteratorT, ReverseT, IPair<Key, T>>>;
    interface IteratorBase<Key, T> {
        /**
         * The first, key element.
         */
        readonly first: Key;
        /**
         * The second, stored element.
         */
        second: T;
    }
    export {};
}
//# sourceMappingURL=MapContainer.d.ts.map