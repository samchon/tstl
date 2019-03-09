import { Iterator } from "./Iterator";
import { IReverseIterator } from "./ReverseIterator";

import { MapContainer } from "../container/MapContainer";
import { Entry } from "../../utility/Entry";
import { IPair } from "../../utility";

/**
 * @hidden
 */
interface IMapIteratorBase<Key, T>
{
    /**
     * The first, key element.
     */
    readonly first: Key;

    /**
     * The second, stored element.
     */
    second: T;
}

export interface IMapIterator<Key, T, 
        Unique extends boolean, 
        Source extends MapContainer<Key, T, Unique, Source, IteratorT, ReverseT>, 
        IteratorT extends IMapIterator<Key, T, Unique, Source, IteratorT, ReverseT>, 
        ReverseT extends IMapReverseIterator<Key, T, Unique, Source, IteratorT, ReverseT>>
    extends Readonly<Iterator<Entry<Key, T>, Source, IteratorT, ReverseT, IPair<Key, T>>>,
        IMapIteratorBase<Key, T>
{
}

export interface IMapReverseIterator<Key, T, 
        Unique extends boolean, 
        Source extends MapContainer<Key, T, Unique, Source, IteratorT, ReverseT>, 
        IteratorT extends IMapIterator<Key, T, Unique, Source, IteratorT, ReverseT>, 
        ReverseT extends IMapReverseIterator<Key, T, Unique, Source, IteratorT, ReverseT>>
    extends Readonly<IReverseIterator<Entry<Key, T>, Source, IteratorT, ReverseT, IPair<Key, T>>>,
    IMapIteratorBase<Key, T>
{
}