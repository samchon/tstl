//================================================================

/**
 * @packageDocumentation
 * @module std.base
 */
//================================================================
import { ITreeContainer } from "../../internal/container/associative/ITreeContainer";
import { SetContainer } from "./SetContainer";

/**
 * Set interface whose keys are traversed in comparator order.
 *
 * @template Key Key type
 * @template Unique Whether duplicated key is blocked or not
 * @template Source Derived type extending this {@link ITreeSet}
 * @template IteratorT Iterator type
 * @template ReverseT Reverse iterator type
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export interface ITreeSet<
  Key,
  Unique extends boolean,
  Source extends ITreeSet<Key, Unique, Source, IteratorT, ReverseT>,
  IteratorT extends ITreeSet.Iterator<Key, Unique, Source, IteratorT, ReverseT>,
  ReverseT extends ITreeSet.ReverseIterator<
    Key,
    Unique,
    Source,
    IteratorT,
    ReverseT
  >,
> extends SetContainer<Key, Unique, Source, IteratorT, ReverseT>,
    ITreeContainer<Key, Key, Source, IteratorT, ReverseT, Key> {}

export namespace ITreeSet {
  /**
   * Iterator over the elements of `ITreeSet` .
   *
   * @author Jenogho Nam <http://samchon.org>
   */
  export type Iterator<
    Key,
    Unique extends boolean,
    SourceT extends ITreeSet<Key, Unique, SourceT, IteratorT, ReverseT>,
    IteratorT extends Iterator<Key, Unique, SourceT, IteratorT, ReverseT>,
    ReverseT extends ReverseIterator<Key, Unique, SourceT, IteratorT, ReverseT>,
  > = SetContainer.Iterator<Key, Unique, SourceT, IteratorT, ReverseT>;

  /**
   * Iterator for reverse traversal of `ITreeSet` .
   *
   * @author Jenogho Nam <http://samchon.org>
   */
  export type ReverseIterator<
    Key,
    Unique extends boolean,
    SourceT extends ITreeSet<Key, Unique, SourceT, IteratorT, ReverseT>,
    IteratorT extends Iterator<Key, Unique, SourceT, IteratorT, ReverseT>,
    ReverseT extends ReverseIterator<Key, Unique, SourceT, IteratorT, ReverseT>,
  > = SetContainer.ReverseIterator<Key, Unique, SourceT, IteratorT, ReverseT>;
}
