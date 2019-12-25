//================================================================ 
/** @module std.base */
//================================================================
import { MapContainer } from "./MapContainer";
import { IHashContainer } from "../../internal/container/associative/IHashContainer";

import { IPair } from "../../utility/IPair";
import { Entry } from "../../utility/Entry";
import { MapElementList } from "../../internal/container/associative/MapElementList";

/**
 * Common interface for Hash Maps.
 * 
 * @author Jeongho Nam <http://samchon.org>
 */
export interface IHashMap<Key, T, 
        Unique extends boolean, 
        Source extends IHashMap<Key, T, Unique, Source>>
    extends 
        MapContainer<Key, T, 
            Unique, 
            Source,
            MapElementList.Iterator<Key, T, Unique, Source>,
            MapElementList.ReverseIterator<Key, T, Unique, Source>>, 
        IHashContainer<Key, Entry<Key, T>, Source, 
            MapElementList.Iterator<Key, T, Unique, Source>, 
            MapElementList.ReverseIterator<Key, T, Unique, Source>,
            IPair<Key, T>>
{
    /* ---------------------------------------------------------
        ITERATORS
    --------------------------------------------------------- */
    /**
     * @inheritDoc
     */
    begin(): MapElementList.Iterator<Key, T, Unique, Source>;

    /**
     * Iterator to the first element in a specific bucket.
     * 
     * @param index Index number of the specific bucket.
     * @return Iterator from the specific bucket.
     */
    begin(index: number): MapElementList.Iterator<Key, T, Unique, Source>;

    /**
     * @inheritDoc
     */
    end(): MapElementList.Iterator<Key, T, Unique, Source>;

    /**
     * Iterator to the end in a specific bucket.
     * 
     * @param index Index number of the specific bucket.
     * @return Iterator from the specific bucket.
     */
    end(index: number): MapElementList.Iterator<Key, T, Unique, Source>;
}