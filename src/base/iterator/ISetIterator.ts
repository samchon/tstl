//================================================================ 
/** @module std.base */
//================================================================
import { Iterator } from "./Iterator";
import { IReverseIterator } from "./ReverseIterator";

import { SetContainer } from "../container/SetContainer";

export interface ISetIterator<Key,
        Unique extends boolean,
        Source extends SetContainer<Key, Unique, Source, IteratorT, ReverseT>,
        IteratorT extends ISetIterator<Key, Unique, Source, IteratorT, ReverseT>,
        ReverseT extends ISetReverseIterator<Key, Unique, Source, IteratorT, ReverseT>>
    extends Readonly<Iterator<Key, Source, IteratorT, ReverseT, Key>>
{
    
}

export interface ISetReverseIterator<Key,
        Unique extends boolean,
        Source extends SetContainer<Key, Unique, Source, IteratorT, ReverseT>,
        IteratorT extends ISetIterator<Key, Unique, Source, IteratorT, ReverseT>,
        ReverseT extends ISetReverseIterator<Key, Unique, Source, IteratorT, ReverseT>>
    extends Readonly<IReverseIterator<Key, Source, IteratorT, ReverseT, Key>>
{

}