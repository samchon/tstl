//================================================================ 
/** @module std.base */
//================================================================
import { MapContainer } from "./MapContainer";
import { ITreeContainer } from "../../internal/container/associative/ITreeContainer";

import { IMapIterator, IMapReverseIterator } from "../iterator/IMapIterator";

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
        IteratorT extends IMapIterator<Key, T, Unique, Source, IteratorT, ReverseT>,
        ReverseT extends IMapReverseIterator<Key, T, Unique, Source, IteratorT, ReverseT>>
    extends MapContainer<Key, T, Unique, Source, IteratorT, ReverseT>, 
        ITreeContainer<Key, Entry<Key, T>, Source, IteratorT, ReverseT, IPair<Key, T>>
{
}