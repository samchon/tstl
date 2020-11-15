/**
 * @packageDocumentation
 * @module std.base
 */
import { MapContainer } from "./MapContainer";
import { IForwardIterator } from "../../iterator/IForwardIterator";
import { IPair } from "../../utility/IPair";
import { Entry } from "../../utility/Entry";
import { Pair } from "../../utility/Pair";
/**
 * Basic map container blocking duplicated key.
 *
 * @template Key Key type
 * @template T Mapped type
 * @template Source Derived type extending this {@link UniqueMap}
 * @template IteratorT Iterator type
 * @template ReverseT Reverse iterator type
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export declare abstract class UniqueMap<Key, T, Source extends UniqueMap<Key, T, Source, Iterator, Reverse>, Iterator extends UniqueMap.Iterator<Key, T, Source, Iterator, Reverse>, Reverse extends UniqueMap.ReverseIterator<Key, T, Source, Iterator, Reverse>> extends MapContainer<Key, T, true, Source, Iterator, Reverse> {
    /**
     * @inheritDoc
     */
    count(key: Key): number;
    /**
     * Get a value.
     *
     * @param key Key to search for.
     * @return The value mapped by the key.
     */
    get(key: Key): T;
    /**
     * Set a value with key.
     *
     * @param key Key to be mapped or search for.
     * @param val Value to insert or assign.
     */
    set(key: Key, val: T): void;
    /**
     * Construct and insert element.
     *
     * @param key Key to be mapped or search for.
     * @param value Value to emplace.
     * @return {@link Pair} of an iterator to the newly inserted element and `true`, if the specified *key* doesn't exist, otherwise {@link Pair} of iterator to the ordinary element and `false`.
     */
    abstract emplace(key: Key, value: T): Pair<Iterator, boolean>;
    /**
     * Construct and insert element with hint.
     *
     * @param hint Hint for the position where the element can be inserted.
     * @param key Key of the new element.
     * @param val Value of the new element.
     * @return An iterator to the newly inserted element, if the specified key doesn't exist, otherwise an iterator to the ordinary element.
     */
    abstract emplace_hint(hint: Iterator, key: Key, val: T): Iterator;
    /**
     * Insert an element.
     *
     * @param pair A tuple to be referenced for the insert.
     * @return {@link Pair} of an iterator to the newly inserted element and `true`, if the specified *key* doesn't exist, otherwise {@link Pair} of iterator to the ordinary element and `false`.
     */
    insert(pair: IPair<Key, T>): Pair<Iterator, boolean>;
    /**
     * Insert an element with hint.
     *
     * @param hint Hint for the position where the element can be inserted.
     * @param pair A tuple to be referenced for the insert.
     * @return An iterator to the newly inserted element, if the specified key doesn't exist, otherwise an iterator to the ordinary element.
     */
    insert(hint: Iterator, pair: IPair<Key, T>): Iterator;
    /**
     * Insert range elements.
     *
     * @param first Input iterator of the first position.
     * @param last Input iteartor of the last position.
     */
    insert<InputIterator extends Readonly<IForwardIterator<IPair<Key, T>, InputIterator>>>(first: InputIterator, last: InputIterator): void;
    protected _Insert_by_range<InputIterator extends Readonly<IForwardIterator<IPair<Key, T>, InputIterator>>>(first: InputIterator, last: InputIterator): void;
    /**
     * Insert or assign an element.
     *
     * @param key Key to be mapped or search for.
     * @param value Value to insert or assign.
     * @return {@link Pair} of an iterator to the newly inserted element and `true`, if the specified *key* doesn't exist, otherwise {@link Pair} of iterator to the ordinary element and `false`.
     */
    insert_or_assign(key: Key, value: T): Pair<Iterator, boolean>;
    /**
     * Insert or assign an element with hint.
     *
     * @param hint Hint for the position where the element can be inserted.
     * @param key Key to be mapped or search for.
     * @param value Value to insert or assign.
     * @return An iterator to the newly inserted element, if the specified key doesn't exist, otherwise an iterator to the ordinary element.
     */
    insert_or_assign(hint: Iterator, key: Key, value: T): Iterator;
    private _Insert_or_assign_with_key_value;
    private _Insert_or_assign_with_hint;
    /**
     * Extract an element by key.
     *
     * @param key Key to search for.
     * @return The extracted element.
     */
    extract(key: Key): Entry<Key, T>;
    /**
     * Extract an element by iterator.
     *
     * @param pos The iterator to the element for extraction.
     * @return Iterator following the *pos*, strained by the extraction.
     */
    extract(pos: Iterator): Iterator;
    private _Extract_by_key;
    private _Extract_by_iterator;
    protected _Erase_by_key(key: Key): number;
    /**
     * @inheritDoc
     */
    merge(source: Source): void;
}
/**
 *
 */
export declare namespace UniqueMap {
    /**
     * Iterator of {@link UniqueMap}
     *
     * @author Jenogho Nam <http://samchon.org>
     */
    type Iterator<Key, T, SourceT extends UniqueMap<Key, T, SourceT, IteratorT, ReverseT>, IteratorT extends Iterator<Key, T, SourceT, IteratorT, ReverseT>, ReverseT extends ReverseIterator<Key, T, SourceT, IteratorT, ReverseT>> = MapContainer.Iterator<Key, T, true, SourceT, IteratorT, ReverseT>;
    /**
     * Reverse iterator of {@link UniqueMap}
     *
     * @author Jenogho Nam <http://samchon.org>
     */
    type ReverseIterator<Key, T, SourceT extends UniqueMap<Key, T, SourceT, IteratorT, ReverseT>, IteratorT extends Iterator<Key, T, SourceT, IteratorT, ReverseT>, ReverseT extends ReverseIterator<Key, T, SourceT, IteratorT, ReverseT>> = MapContainer.ReverseIterator<Key, T, true, SourceT, IteratorT, ReverseT>;
}
//# sourceMappingURL=UniqueMap.d.ts.map