/**
 * @packageDocumentation
 * @module std.internal
 */
import { ListContainer } from "../linear/ListContainer";
import { ListIterator } from "../../iterator/ListIterator";
import { ReverseIterator as _ReverseIterator } from "../../iterator/ReverseIterator";
import { MapContainer } from "../../../base/container/MapContainer";
import { IPair } from "../../../utility/IPair";
import { Entry } from "../../../utility/Entry";
/**
 * Doubly Linked List storing map elements.
 *
 * @template Key Key type
 * @template T Mapped type
 * @template Unique Whether duplicated key is blocked or not
 * @template Source Source type
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export declare class MapElementList<Key, T, Unique extends boolean, Source extends MapContainer<Key, T, Unique, Source, MapElementList.Iterator<Key, T, Unique, Source>, MapElementList.ReverseIterator<Key, T, Unique, Source>>> extends ListContainer<Entry<Key, T>, Source, MapElementList.Iterator<Key, T, Unique, Source>, MapElementList.ReverseIterator<Key, T, Unique, Source>> {
    private associative_;
    constructor(associative: Source);
    protected _Create_iterator(prev: MapElementList.Iterator<Key, T, Unique, Source>, next: MapElementList.Iterator<Key, T, Unique, Source>, val: Entry<Key, T>): MapElementList.Iterator<Key, T, Unique, Source>;
    associative(): Source;
}
/**
 *
 */
export declare namespace MapElementList {
    /**
     * Iterator of map container storing elements in a list.
     *
     * @template Key Key type
     * @template T Mapped type
     * @template Unique Whether duplicated key is blocked or not
     * @template Source Source container type
     *
     * @author Jeongho Nam - https://github.com/samchon
     */
    class Iterator<Key, T, Unique extends boolean, Source extends MapContainer<Key, T, Unique, Source, Iterator<Key, T, Unique, Source>, ReverseIterator<Key, T, Unique, Source>>> extends ListIterator<Entry<Key, T>, Source, Iterator<Key, T, Unique, Source>, ReverseIterator<Key, T, Unique, Source>, IPair<Key, T>> implements MapContainer.Iterator<Key, T, Unique, Source, Iterator<Key, T, Unique, Source>, ReverseIterator<Key, T, Unique, Source>> {
        private list_;
        private constructor();
        /**
         * @inheritDoc
         */
        reverse(): ReverseIterator<Key, T, Unique, Source>;
        /**
         * @inheritDoc
         */
        source(): Source;
        /**
         * @inheritDoc
         */
        get first(): Key;
        /**
         * @inheritDoc
         */
        get second(): T;
        /**
         * @inheritDoc
         */
        set second(val: T);
    }
    /**
     * Reverse iterator of map container storing elements a list.
     *
     * @template Key Key type
     * @template T Mapped type
     * @template Unique Whether duplicated key is blocked or not
     * @template Source Source container type
     *
     * @author Jeongho Nam - https://github.com/samchon
     */
    class ReverseIterator<Key, T, Unique extends boolean, Source extends MapContainer<Key, T, Unique, Source, Iterator<Key, T, Unique, Source>, ReverseIterator<Key, T, Unique, Source>>> extends _ReverseIterator<Entry<Key, T>, Source, Iterator<Key, T, Unique, Source>, ReverseIterator<Key, T, Unique, Source>, IPair<Key, T>> implements MapContainer.ReverseIterator<Key, T, Unique, Source, Iterator<Key, T, Unique, Source>, ReverseIterator<Key, T, Unique, Source>> {
        protected _Create_neighbor(base: Iterator<Key, T, Unique, Source>): ReverseIterator<Key, T, Unique, Source>;
        /**
         * Get the first, key element.
         *
         * @return The first element.
         */
        get first(): Key;
        /**
         * Get the second, stored element.
         *
         * @return The second element.
         */
        get second(): T;
        /**
         * Set the second, stored element.
         *
         * @param val The value to set.
         */
        set second(val: T);
    }
}
//# sourceMappingURL=MapElementList.d.ts.map