//================================================================ 
/** @module std.base */
//================================================================
import { SetContainer } from "./SetContainer";
import { _ITreeContainer } from "./_ITreeContainer";

import { ISetIterator, ISetReverseIterator } from "../iterator/ISetIterator";


/**
 * Common interface for Tree Sets.
 * 
 * @author Jeongho Nam <http://samchon.org>
 */
export interface ITreeSet<Key, 
        Unique extends boolean, 
        Source extends ITreeSet<Key, Unique, Source, IteratorT, ReverseT>,
        IteratorT extends ISetIterator<Key, Unique, Source, IteratorT, ReverseT>,
        ReverseT extends ISetReverseIterator<Key, Unique, Source, IteratorT, ReverseT>>
    extends SetContainer<Key, Unique, Source, IteratorT, ReverseT>, 
        _ITreeContainer<Key, Key, Source, IteratorT, ReverseT, Key>
{
}