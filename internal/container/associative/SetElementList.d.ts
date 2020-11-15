/**
 * @packageDocumentation
 * @module std.internal
 */
import { ListContainer } from "../linear/ListContainer";
import { ListIterator } from "../../iterator/ListIterator";
import { ReverseIterator as _ReverseIterator } from "../../iterator/ReverseIterator";
import { SetContainer } from "../../../base/container/SetContainer";
/**
 * Doubly Linked List storing set elements.
 *
 * @template Key Key type
 * @template Unique Whether duplicated key is blocked or not
 * @template Source Source container type
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export declare class SetElementList<Key, Unique extends boolean, Source extends SetContainer<Key, Unique, Source, SetElementList.Iterator<Key, Unique, Source>, SetElementList.ReverseIterator<Key, Unique, Source>>> extends ListContainer<Key, Source, SetElementList.Iterator<Key, Unique, Source>, SetElementList.ReverseIterator<Key, Unique, Source>> {
    private associative_;
    constructor(associative: Source);
    protected _Create_iterator(prev: SetElementList.Iterator<Key, Unique, Source>, next: SetElementList.Iterator<Key, Unique, Source>, val: Key): SetElementList.Iterator<Key, Unique, Source>;
    associative(): Source;
}
/**
 *
 */
export declare namespace SetElementList {
    /**
     * Iterator of set container storing elements in a list.
     *
     * @template Key Key type
     * @template Unique Whether duplicated key is blocked or not
     * @template Source Source container type
     *
     * @author Jeongho Nam - https://github.com/samchon
     */
    class Iterator<Key, Unique extends boolean, Source extends SetContainer<Key, Unique, Source, Iterator<Key, Unique, Source>, ReverseIterator<Key, Unique, Source>>> extends ListIterator<Key, Source, Iterator<Key, Unique, Source>, ReverseIterator<Key, Unique, Source>, Key> implements SetContainer.Iterator<Key, Unique, Source, Iterator<Key, Unique, Source>, ReverseIterator<Key, Unique, Source>> {
        private source_;
        private constructor();
        /**
         * @inheritDoc
         */
        reverse(): ReverseIterator<Key, Unique, Source>;
        /**
         * @inheritDoc
         */
        source(): Source;
    }
    /**
     * Reverser iterator of set container storing elements in a list.
     *
     * @template Key Key type
     * @template Unique Whether duplicated key is blocked or not
     * @template Source Source container type
     *
     * @author Jeongho Nam - https://github.com/samchon
     */
    class ReverseIterator<Key, Unique extends boolean, Source extends SetContainer<Key, Unique, Source, Iterator<Key, Unique, Source>, ReverseIterator<Key, Unique, Source>>> extends _ReverseIterator<Key, Source, Iterator<Key, Unique, Source>, ReverseIterator<Key, Unique, Source>, Key> implements SetContainer.ReverseIterator<Key, Unique, Source, Iterator<Key, Unique, Source>, ReverseIterator<Key, Unique, Source>> {
        protected _Create_neighbor(base: Iterator<Key, Unique, Source>): ReverseIterator<Key, Unique, Source>;
    }
}
//# sourceMappingURL=SetElementList.d.ts.map