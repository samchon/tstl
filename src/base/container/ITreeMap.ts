//================================================================ 
/** @module std.base */
//================================================================
import { MapContainer } from "./MapContainer";
import { ITreeContainer } from "../../internal/container/associative/ITreeContainer";

import { IPair } from "../../utility/IPair";
import { Entry } from "../../utility/Entry";

/**
 * Common interface for Tree Maps.
 * 
 * @author Jeongho Nam <http://samchon.org>
 */
export interface ITreeMap<Key, T, 
        Unique extends boolean, 
        Source extends ITreeMap<Key, T, Unique, Source, IteratorT, ReverseT>,
        IteratorT extends ITreeMap.Iterator<Key, T, Unique, Source, IteratorT, ReverseT>,
        ReverseT extends ITreeMap.ReverseIterator<Key, T, Unique, Source, IteratorT, ReverseT>>
    extends MapContainer<Key, T, Unique, Source, IteratorT, ReverseT>, 
        ITreeContainer<Key, Entry<Key, T>, Source, IteratorT, ReverseT, IPair<Key, T>>
{
}

export namespace ITreeMap
{
    export type Iterator<Key, T, 
            Unique extends boolean, 
            Source extends ITreeMap<Key, T, Unique, Source, IteratorT, ReverseT>,
            IteratorT extends Iterator<Key, T, Unique, Source, IteratorT, ReverseT>,
            ReverseT extends ReverseIterator<Key, T, Unique, Source, IteratorT, ReverseT>>
        = MapContainer.Iterator<Key, T, Unique, Source, IteratorT, ReverseT>;

    export type ReverseIterator<Key, T, 
            Unique extends boolean, 
            Source extends ITreeMap<Key, T, Unique, Source, IteratorT, ReverseT>,
            IteratorT extends Iterator<Key, T, Unique, Source, IteratorT, ReverseT>,
            ReverseT extends ReverseIterator<Key, T, Unique, Source, IteratorT, ReverseT>>
        = MapContainer.ReverseIterator<Key, T, Unique, Source, IteratorT, ReverseT>;
}