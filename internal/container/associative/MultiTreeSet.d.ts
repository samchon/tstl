/**
 * @packageDocumentation
 * @module std.internal
 */
import { MultiSet } from "../../../base/container/MultiSet";
import { ITreeContainer } from "./ITreeContainer";
import { IForwardIterator } from "../../../iterator/IForwardIterator";
import { Pair } from "../../../utility/Pair";
import { Comparator } from "../../functional/Comparator";
/**
 * Basic tree set allowing duplicated keys.
 *
 * @template Key Key type
 * @template T Mapped type
 * @template Source Derived type extending this {@link MultiTreeSet}
 * @template IteratorT Iterator type
 * @template ReverseT Reverse iterator type
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export declare abstract class MultiTreeSet<Key, Source extends MultiTreeSet<Key, Source, IteratorT, ReverseT>, IteratorT extends MultiSet.Iterator<Key, Source, IteratorT, ReverseT>, ReverseT extends MultiSet.ReverseIterator<Key, Source, IteratorT, ReverseT>> extends MultiSet<Key, Source, IteratorT, ReverseT> implements ITreeContainer<Key, Key, Source, IteratorT, ReverseT, Key> {
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
    value_comp(): Comparator<Key>;
    protected _Key_eq(x: Key, y: Key): boolean;
    protected _Insert_by_key(key: Key): IteratorT;
    protected _Insert_by_hint(hint: IteratorT, key: Key): IteratorT;
    protected _Insert_by_range<InputIterator extends Readonly<IForwardIterator<Key, InputIterator>>>(first: InputIterator, last: InputIterator): void;
}
//# sourceMappingURL=MultiTreeSet.d.ts.map