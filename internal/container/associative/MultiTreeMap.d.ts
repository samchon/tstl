/**
 * @packageDocumentation
 * @module std.internal
 */
import { MultiMap } from "../../../base/container/MultiMap";
import { ITreeContainer } from "./ITreeContainer";
import { IForwardIterator } from "../../../iterator/IForwardIterator";
import { IPair } from "../../../utility/IPair";
import { Entry } from "../../../utility/Entry";
import { Pair } from "../../../utility/Pair";
import { Comparator } from "../../functional/Comparator";
/**
 * Basic tree map allowing duplicated keys.
 *
 * @template Key Key type
 * @template T Mapped type
 * @template Source Derived type extending this {@link MultiTreeMap}
 * @template IteratorT Iterator type
 * @template ReverseT Reverse iterator type
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export declare abstract class MultiTreeMap<Key, T, Source extends MultiTreeMap<Key, T, Source, IteratorT, ReverseT>, IteratorT extends MultiMap.Iterator<Key, T, Source, IteratorT, ReverseT>, ReverseT extends MultiMap.ReverseIterator<Key, T, Source, IteratorT, ReverseT>> extends MultiMap<Key, T, Source, IteratorT, ReverseT> implements ITreeContainer<Key, Entry<Key, T>, Source, IteratorT, ReverseT, IPair<Key, T>> {
    /**
     * @inheritDoc
     */
    find(key: Key): IteratorT;
    /**
     * @inheritDoc
     */
    count(key: Key): number;
    /**
     * @inheritDoc
     */
    abstract lower_bound(key: Key): IteratorT;
    /**
     * @inheritDoc
     */
    abstract upper_bound(key: Key): IteratorT;
    /**
     * @inheritDoc
     */
    equal_range(key: Key): Pair<IteratorT, IteratorT>;
    /**
     * @inheritDoc
     */
    abstract key_comp(): Comparator<Key>;
    /**
     * @inheritDoc
     */
    value_comp(): Comparator<IPair<Key, T>>;
    protected _Key_eq(x: Key, y: Key): boolean;
    /**
     * @inheritDoc
     */
    emplace(key: Key, val: T): IteratorT;
    /**
     * @inheritDoc
     */
    emplace_hint(hint: IteratorT, key: Key, val: T): IteratorT;
    protected _Insert_by_range<InputIterator extends Readonly<IForwardIterator<IPair<Key, T>, InputIterator>>>(first: InputIterator, last: InputIterator): void;
}
//# sourceMappingURL=MultiTreeMap.d.ts.map