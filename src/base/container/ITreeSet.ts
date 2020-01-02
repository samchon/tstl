//================================================================ 
/** @module std.base */
//================================================================
import { SetContainer } from "./SetContainer";
import { ITreeContainer } from "../../internal/container/associative/ITreeContainer";

/**
 * Common interface for Tree Sets.
 * 
 * @author Jeongho Nam <http://samchon.org>
 */
export interface ITreeSet<Key, 
        Unique extends boolean, 
        Source extends ITreeSet<Key, Unique, Source, IteratorT, ReverseT>,
        IteratorT extends ITreeSet.Iterator<Key, Unique, Source, IteratorT, ReverseT>,
        ReverseT extends ITreeSet.ReverseIterator<Key, Unique, Source, IteratorT, ReverseT>>
    extends SetContainer<Key, Unique, Source, IteratorT, ReverseT>, 
        ITreeContainer<Key, Key, Source, IteratorT, ReverseT, Key>
{
}

export namespace ITreeSet
{
    export type Iterator<Key,
            Unique extends boolean,
            SourceT extends ITreeSet<Key, Unique, SourceT, IteratorT, ReverseT>,
            IteratorT extends Iterator<Key, Unique, SourceT, IteratorT, ReverseT>,
            ReverseT extends ReverseIterator<Key, Unique, SourceT, IteratorT, ReverseT>>
        = SetContainer.Iterator<Key, Unique, SourceT, IteratorT, ReverseT>;

    export type ReverseIterator<Key, 
            Unique extends boolean,
            SourceT extends ITreeSet<Key, Unique, SourceT, IteratorT, ReverseT>,
            IteratorT extends Iterator<Key, Unique, SourceT, IteratorT, ReverseT>,
            ReverseT extends ReverseIterator<Key, Unique, SourceT, IteratorT, ReverseT>>
        = SetContainer.ReverseIterator<Key, Unique, SourceT, IteratorT, ReverseT>;
}