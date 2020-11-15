/**
 * @packageDocumentation
 * @module std.internal
 */
import { IContainer } from "../../../base/container/IContainer";
/**
 * Common interface for associative containers
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export interface IAssociativeContainer<Key, T extends Elem, SourceT extends IAssociativeContainer<Key, T, SourceT, IteratorT, ReverseIteratorT, Elem>, IteratorT extends IContainer.Iterator<T, SourceT, IteratorT, ReverseIteratorT, Elem>, ReverseIteratorT extends IContainer.ReverseIterator<T, SourceT, IteratorT, ReverseIteratorT, Elem>, Elem> extends IContainer<T, SourceT, IteratorT, ReverseIteratorT, Elem> {
    /**
     * Get iterator to element.
     *
     * @param key Key to search for.
     * @return An iterator to the element, if the specified key is found, otherwise `this.end()`.
     */
    find(key: Key): IteratorT;
    /**
     * Test whether a key exists.
     *
     * @param key Key to search for.
     * @return Whether the specified key exists.
     */
    has(key: Key): boolean;
    /**
     * Count elements with a specified key.
     *
     * @param key Key to search for.
     * @return Number of elements with the specified key.
     */
    count(key: Key): number;
    /**
     * Erase elements with a specified key.
     *
     * @param key Key to search for.
     * @return Number of erased elements.
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
}
export declare namespace IAssociativeContainer {
}
//# sourceMappingURL=IAssociativeContainer.d.ts.map