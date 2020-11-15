/**
 * @packageDocumentation
 * @module std.internal
 */
import { UniqueSet } from "../../../base/container/UniqueSet";
import { ITreeContainer } from "./ITreeContainer";
import { Pair } from "../../../utility/Pair";
import { Comparator } from "../../functional/Comparator";
/**
 * Basic tree set blocking duplicated key.
 *
 * @template Key Key type
 * @template Source Derived type extending this {@link UniqueTreeSet}
 * @template IteratorT Iterator type
 * @template ReverseT Reverse iterator type
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export declare abstract class UniqueTreeSet<Key, Source extends UniqueTreeSet<Key, Source, IteratorT, ReverseT>, IteratorT extends UniqueSet.Iterator<Key, Source, IteratorT, ReverseT>, ReverseT extends UniqueSet.ReverseIterator<Key, Source, IteratorT, ReverseT>> extends UniqueSet<Key, Source, IteratorT, ReverseT> implements ITreeContainer<Key, Key, Source, IteratorT, ReverseT, Key> {
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
    value_comp(): Comparator<Key>;
    protected _Key_eq(x: Key, y: Key): boolean;
    protected _Insert_by_key(key: Key): Pair<IteratorT, boolean>;
    protected _Insert_by_hint(hint: IteratorT, key: Key): IteratorT;
}
//# sourceMappingURL=UniqueTreeSet.d.ts.map