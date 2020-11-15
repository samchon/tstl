/**
 * @packageDocumentation
 * @module std.internal
 */
import { UniqueMap } from "../../../base/container/UniqueMap";
import { ITreeContainer } from "./ITreeContainer";
import { IPair } from "../../../utility/IPair";
import { Entry } from "../../../utility/Entry";
import { Pair } from "../../../utility/Pair";
import { Comparator } from "../../functional/Comparator";
/**
 * Basic tree map blocking duplicated key.
 *
 * @template Key Key type
 * @template T Mapped type
 * @template Source Derived type extending this {@link UniqueTreeMap}
 * @template IteratorT Iterator type
 * @template ReverseT Reverse iterator type
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export declare abstract class UniqueTreeMap<Key, T, Source extends UniqueTreeMap<Key, T, Source, IteratorT, ReverseT>, IteratorT extends UniqueMap.Iterator<Key, T, Source, IteratorT, ReverseT>, ReverseT extends UniqueMap.ReverseIterator<Key, T, Source, IteratorT, ReverseT>> extends UniqueMap<Key, T, Source, IteratorT, ReverseT> implements ITreeContainer<Key, Entry<Key, T>, Source, IteratorT, ReverseT, IPair<Key, T>> {
    /**
     * @inheritDoc
     */
    find(key: Key): IteratorT;
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
    emplace(key: Key, val: T): Pair<IteratorT, boolean>;
    /**
     * @inheritDoc
     */
    emplace_hint(hint: IteratorT, key: Key, val: T): IteratorT;
}
//# sourceMappingURL=UniqueTreeMap.d.ts.map