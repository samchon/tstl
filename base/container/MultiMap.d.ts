/**
 * @packageDocumentation
 * @module std.base
 */
import { MapContainer } from "./MapContainer";
import { IForwardIterator } from "../../iterator/IForwardIterator";
import { IPair } from "../../utility/IPair";
/**
 * Basic map container allowing duplicated keys.
 *
 * @template Key Key type
 * @template T Mapped type
 * @template Source Derived type extending this {@link MultiMap}
 * @template IteratorT Iterator type
 * @template ReverseT Reverse iterator type
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export declare abstract class MultiMap<Key, T, Source extends MultiMap<Key, T, Source, Iterator, Reverse>, Iterator extends MultiMap.Iterator<Key, T, Source, Iterator, Reverse>, Reverse extends MultiMap.ReverseIterator<Key, T, Source, Iterator, Reverse>> extends MapContainer<Key, T, false, Source, Iterator, Reverse> {
    /**
     * Construct and insert an element.
     *
     * @param key Key to be mapped.
     * @param value Value to emplace.
     * @return An iterator to the newly inserted element.
     */
    abstract emplace(key: Key, value: T): Iterator;
    /**
     * Construct and insert element with hint.
     *
     * @param hint Hint for the position where the element can be inserted.
     * @param key Key of the new element.
     * @param val Value of the new element.
     * @return An iterator to the newly inserted element.
     */
    abstract emplace_hint(hint: Iterator, key: Key, val: T): Iterator;
    /**
     * Insert an element.
     *
     * @param pair A tuple to be referenced for the insert.
     * @return An iterator to the newly inserted element.
     */
    insert(pair: IPair<Key, T>): Iterator;
    /**
     * Insert an element with hint.
     *
     * @param hint Hint for the position where the element can be inserted.
     * @param pair A tuple to be referenced for the insert.
     * @return An iterator to the newly inserted element.
     */
    insert(hint: Iterator, pair: IPair<Key, T>): Iterator;
    /**
     * Insert range elements.
     *
     * @param first Input iterator of the first position.
     * @param last Input iteartor of the last position.
     */
    insert<InputIterator extends Readonly<IForwardIterator<IPair<Key, T>, InputIterator>>>(first: InputIterator, last: InputIterator): void;
    protected abstract _Key_eq(x: Key, y: Key): boolean;
    protected _Erase_by_key(key: Key): number;
    /**
     * @inheritDoc
     */
    merge(source: Source): void;
}
/**
 *
 */
export declare namespace MultiMap {
    /**
     * Iterator of {@link MultiMap}
     *
     * @author Jenogho Nam <http://samchon.org>
     */
    type Iterator<Key, T, SourceT extends MultiMap<Key, T, SourceT, IteratorT, ReverseT>, IteratorT extends Iterator<Key, T, SourceT, IteratorT, ReverseT>, ReverseT extends ReverseIterator<Key, T, SourceT, IteratorT, ReverseT>> = MapContainer.Iterator<Key, T, false, SourceT, IteratorT, ReverseT>;
    /**
     * Reverse iterator of {@link MultiMap}
     *
     * @author Jenogho Nam <http://samchon.org>
     */
    type ReverseIterator<Key, T, SourceT extends MultiMap<Key, T, SourceT, IteratorT, ReverseT>, IteratorT extends Iterator<Key, T, SourceT, IteratorT, ReverseT>, ReverseT extends ReverseIterator<Key, T, SourceT, IteratorT, ReverseT>> = MapContainer.ReverseIterator<Key, T, false, SourceT, IteratorT, ReverseT>;
}
//# sourceMappingURL=MultiMap.d.ts.map