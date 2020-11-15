/**
 * @packageDocumentation
 * @module std.internal
 */
import { IAssociativeContainer } from "./IAssociativeContainer";
import { IContainer } from "../../../base/container/IContainer";
import { Comparator } from "../../functional/Comparator";
import { Pair } from "../../../utility/Pair";
/**
 * Common interface for tree containers.
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export interface ITreeContainer<Key, T extends Elem, SourceT extends ITreeContainer<Key, T, SourceT, IteratorT, ReverseIteratorT, Elem>, IteratorT extends IContainer.Iterator<T, SourceT, IteratorT, ReverseIteratorT, Elem>, ReverseIteratorT extends IContainer.ReverseIterator<T, SourceT, IteratorT, ReverseIteratorT, Elem>, Elem> extends IAssociativeContainer<Key, T, SourceT, IteratorT, ReverseIteratorT, Elem> {
    /**
     * Get key comparison function.
     *
     * @return The key comparison function.
     */
    key_comp(): Comparator<Key>;
    /**
     * Get value comparison function.
     *
     * @return The value comparison function.
     */
    value_comp(): Comparator<Elem>;
    /**
     * Get iterator to lower bound.
     *
     * @param key Key to search for.
     * @return Iterator to the first element equal or after to the key.
     */
    lower_bound(key: Key): IteratorT;
    /**
     * Get iterator to upper bound.
     *
     * @param key Key to search for.
     * @return Iterator to the first element after the key.
     */
    upper_bound(key: Key): IteratorT;
    /**
     * Get range of equal elements.
     *
     * @param key Key to search for.
     * @return Pair of {@link lower_bound} and {@link upper_bound}.
     */
    equal_range(key: Key): Pair<IteratorT, IteratorT>;
}
export declare namespace ITreeContainer {
}
//# sourceMappingURL=ITreeContainer.d.ts.map