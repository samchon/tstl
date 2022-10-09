//================================================================
/**
 * @packageDocumentation
 * @module std.base
 */
//================================================================
import { MapContainer } from "./MapContainer";
import { IHashContainer } from "../../internal/container/associative/IHashContainer";

import { IPair } from "../../utility/IPair";
import { Entry } from "../../utility/Entry";
import { MapElementList } from "../../internal/container/associative/MapElementList";

/**
 * Common interface for hash maps.
 *
 * @template Key Key type
 * @template T Mapped type
 * @template Unique Whether duplicated key is blocked or not
 * @template Source Derived type extending this {@link IHashMap}
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export interface IHashMap<
    Key,
    T,
    Unique extends boolean,
    Source extends IHashMap<Key, T, Unique, Source>,
> extends MapContainer<
            Key,
            T,
            Unique,
            Source,
            IHashMap.Iterator<Key, T, Unique, Source>,
            IHashMap.ReverseIterator<Key, T, Unique, Source>
        >,
        IHashContainer<
            Key,
            Entry<Key, T>,
            Source,
            IHashMap.Iterator<Key, T, Unique, Source>,
            IHashMap.ReverseIterator<Key, T, Unique, Source>,
            IPair<Key, T>
        > {
    /* ---------------------------------------------------------
        ITERATORS
    --------------------------------------------------------- */
    /**
     * @inheritDoc
     */
    begin(): IHashMap.Iterator<Key, T, Unique, Source>;

    /**
     * Iterator to the first element in a specific bucket.
     *
     * @param index Index number of the specific bucket.
     * @return Iterator from the specific bucket.
     */
    begin(index: number): IHashMap.Iterator<Key, T, Unique, Source>;

    /**
     * @inheritDoc
     */
    end(): IHashMap.Iterator<Key, T, Unique, Source>;

    /**
     * Iterator to the end in a specific bucket.
     *
     * @param index Index number of the specific bucket.
     * @return Iterator from the specific bucket.
     */
    end(index: number): IHashMap.Iterator<Key, T, Unique, Source>;
}

export namespace IHashMap {
    /**
     * Iterator of {@link IHashMap}
     *
     * @author Jenogho Nam <http://samchon.org>
     */
    export type Iterator<
        Key,
        T,
        Unique extends boolean,
        Source extends IHashMap<Key, T, Unique, Source>,
    > = MapElementList.Iterator<Key, T, Unique, Source>;

    /**
     * Reverse iterator of {@link IHashMap}
     *
     * @author Jenogho Nam <http://samchon.org>
     */
    export type ReverseIterator<
        Key,
        T,
        Unique extends boolean,
        Source extends IHashMap<Key, T, Unique, Source>,
    > = MapElementList.ReverseIterator<Key, T, Unique, Source>;
}
