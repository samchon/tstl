/**
 * @packageDocumentation
 * @module std.base
 */
import { SetContainer } from "./SetContainer";
import { IForwardIterator } from "../../iterator/IForwardIterator";
import { Pair } from "../../utility/Pair";
/**
 * Basic set container blocking duplicated key.
 *
 * @template Key Key type
 * @template Source Derived type extending this {@link UniqueSet}
 * @template IteratorT Iterator type
 * @template ReverseT Reverse iterator type
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export declare abstract class UniqueSet<Key, Source extends UniqueSet<Key, Source, IteratorT, ReverseT>, IteratorT extends UniqueSet.Iterator<Key, Source, IteratorT, ReverseT>, ReverseT extends UniqueSet.ReverseIterator<Key, Source, IteratorT, ReverseT>> extends SetContainer<Key, true, Source, IteratorT, ReverseT> {
    /**
     * @inheritDoc
     */
    count(key: Key): number;
    /**
     * Insert an element.
     *
     * @param key Key to insert.
     * @return {@link Pair} of an iterator to the newly inserted element and `true`, if the specified *key* doesn't exist, otherwise {@link Pair} of iterator to ordinary element and `false`.
     */
    insert(key: Key): Pair<IteratorT, boolean>;
    /**
     * Insert an element with hint.
     *
     * @param hint Hint for the position where the element can be inserted.
     * @param pair A tuple to be referenced for the insert.
     * @return An iterator to the newly inserted element, if the specified key doesn't exist, otherwise an iterator to the ordinary element.
     */
    insert(hint: IteratorT, key: Key): IteratorT;
    /**
     * Insert range elements.
     *
     * @param first Input iterator of the first position.
     * @param last Input iteartor of the last position.
     */
    insert<InputIterator extends Readonly<IForwardIterator<Key, InputIterator>>>(first: InputIterator, last: InputIterator): void;
    protected _Insert_by_range<InputIterator extends Readonly<IForwardIterator<Key, InputIterator>>>(first: InputIterator, last: InputIterator): void;
    /**
     * Extract an element by key.
     *
     * @param key Key to search for.
     * @return The extracted element.
     */
    extract(key: Key): Key;
    /**
     * Extract an element by iterator.
     *
     * @param pos The iterator to the element for extraction.
     * @return Iterator following the *pos*, strained by the extraction.
     */
    extract(it: IteratorT): IteratorT;
    private _Extract_by_val;
    private _Extract_by_iterator;
    protected _Erase_by_val(key: Key): number;
    /**
     * @inheritDoc
     */
    merge(source: Source): void;
}
/**
 *
 */
export declare namespace UniqueSet {
    /**
     * Iterator of {@link UniqueSet}
     *
     * @author Jenogho Nam <http://samchon.org>
     */
    type Iterator<Key, SourceT extends UniqueSet<Key, SourceT, IteratorT, ReverseT>, IteratorT extends Iterator<Key, SourceT, IteratorT, ReverseT>, ReverseT extends ReverseIterator<Key, SourceT, IteratorT, ReverseT>> = SetContainer.Iterator<Key, true, SourceT, IteratorT, ReverseT>;
    /**
     * Reverse iterator of {@link UniqueSet}
     *
     * @author Jenogho Nam <http://samchon.org>
     */
    type ReverseIterator<Key, SourceT extends UniqueSet<Key, SourceT, IteratorT, ReverseT>, IteratorT extends Iterator<Key, SourceT, IteratorT, ReverseT>, ReverseT extends ReverseIterator<Key, SourceT, IteratorT, ReverseT>> = SetContainer.ReverseIterator<Key, true, SourceT, IteratorT, ReverseT>;
}
//# sourceMappingURL=UniqueSet.d.ts.map