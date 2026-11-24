//================================================================

/**
 * @packageDocumentation
 * @module std.base
 */
//================================================================
import { IHashContainer } from "../../internal/container/associative/IHashContainer";
import { SetElementList } from "../../internal/container/associative/SetElementList";
import { SetContainer } from "./SetContainer";

/**
 * Set interface with hash buckets and a configurable hash and equality
 * predicate.
 *
 * @template Key Key type
 * @template Unique Whether duplicated key is blocked or not
 * @template Source Derived type extending this {@link IHashSet}
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export interface IHashSet<
  Key,
  Unique extends boolean,
  Source extends IHashSet<Key, Unique, Source>,
> extends SetContainer<
      Key,
      Unique,
      Source,
      IHashSet.Iterator<Key, Unique, Source>,
      IHashSet.ReverseIterator<Key, Unique, Source>
    >,
    IHashContainer<
      Key,
      Key,
      Source,
      IHashSet.Iterator<Key, Unique, Source>,
      IHashSet.ReverseIterator<Key, Unique, Source>,
      Key
    > {
  /* ---------------------------------------------------------
        ITERATORS
    --------------------------------------------------------- */
  /**
   * @inheritDoc
   */
  begin(): IHashSet.Iterator<Key, Unique, Source>;

  /**
   * Get the first element encountered in a valid, nonempty bucket.
   *
   * @param index Index of a nonempty bucket.
   * @return The iterator at the first stored element in that bucket.
   */
  begin(index: number): IHashSet.Iterator<Key, Unique, Source>;

  /**
   * @inheritDoc
   */
  end(): IHashSet.Iterator<Key, Unique, Source>;

  /**
   * Get the traversal position immediately after the last element in a valid,
   * nonempty bucket. The intervening traversal can visit elements from other
   * buckets.
   *
   * @param index Index of a nonempty bucket.
   * @return The successor of the bucket's last stored element.
   */
  end(index: number): IHashSet.Iterator<Key, Unique, Source>;
}

export namespace IHashSet {
  /**
   * Iterator over the elements of `IHashSet`.
   *
   * @author Jenogho Nam <http://samchon.org>
   */
  export type Iterator<
    Key,
    Unique extends boolean,
    Source extends IHashSet<Key, Unique, Source>,
  > = SetElementList.Iterator<Key, Unique, Source>;

  /**
   * Iterator for reverse traversal of `IHashSet`.
   *
   * @author Jenogho Nam <http://samchon.org>
   */
  export type ReverseIterator<
    Key,
    Unique extends boolean,
    Source extends IHashSet<Key, Unique, Source>,
  > = SetElementList.ReverseIterator<Key, Unique, Source>;
}
