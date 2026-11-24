//================================================================

/**
 * @packageDocumentation
 * @module std.base
 */
//================================================================
import { IHashContainer } from "../../internal/container/associative/IHashContainer";
import { MapElementList } from "../../internal/container/associative/MapElementList";
import { Entry } from "../../utility/Entry";
import { IPair } from "../../utility/IPair";
import { MapContainer } from "./MapContainer";

/**
 * Map interface with hash buckets and a configurable hash and equality
 * predicate.
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
   * Get the first element encountered in a valid, nonempty bucket.
   *
   * @param index Index of a nonempty bucket.
   * @return The iterator at the first stored element in that bucket.
   */
  begin(index: number): IHashMap.Iterator<Key, T, Unique, Source>;

  /**
   * @inheritDoc
   */
  end(): IHashMap.Iterator<Key, T, Unique, Source>;

  /**
   * Get the traversal position immediately after the last element in a valid,
   * nonempty bucket. The intervening traversal can visit elements from other
   * buckets.
   *
   * @param index Index of a nonempty bucket.
   * @return The successor of the bucket's last stored element.
   */
  end(index: number): IHashMap.Iterator<Key, T, Unique, Source>;
}

export namespace IHashMap {
  /**
   * Iterator over the elements of `IHashMap`.
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
   * Iterator for reverse traversal of `IHashMap`.
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
