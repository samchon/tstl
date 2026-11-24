//================================================================

/**
 * @packageDocumentation
 * @module std.internal
 */
//================================================================
import { IContainer } from "../../../base/container/IContainer";
import { equal_to } from "../../../functional/comparators";
import { hash } from "../../../functional/hash";
import { BinaryPredicator } from "../../functional/BinaryPredicator";
import { Hasher } from "../../functional/Hasher";
import { IAssociativeContainer } from "./IAssociativeContainer";

/**
 * Shared operations for hash-table capacity, buckets, hashing, and equality.
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export interface IHashContainer<
  Key,
  T extends Elem,
  SourceT extends IHashContainer<
    Key,
    T,
    SourceT,
    IteratorT,
    ReverseIteratorT,
    Elem
  >,
  IteratorT extends IContainer.Iterator<
    T,
    SourceT,
    IteratorT,
    ReverseIteratorT,
    Elem
  >,
  ReverseIteratorT extends IContainer.ReverseIterator<
    T,
    SourceT,
    IteratorT,
    ReverseIteratorT,
    Elem
  >,
  Elem,
> extends IAssociativeContainer<
    Key,
    T,
    SourceT,
    IteratorT,
    ReverseIteratorT,
    Elem
  > {
  /* ---------------------------------------------------------
        PREDICATORS
    --------------------------------------------------------- */
  /**
   * Get the function used to hash keys.
   *
   * @return The configured key hash function.
   */
  hash_function(): Hasher<Key>;

  /**
   * Get the predicate used to compare keys for equivalence.
   *
   * @return The configured key equivalence predicate.
   */
  key_eq(): BinaryPredicator<Key>;

  /* ---------------------------------------------------------
        GETTERS
    --------------------------------------------------------- */
  /**
   * Determine the bucket selected by the hash of `key`.
   *
   * @param key Target key.
   * @return The bucket index for the given key.
   */
  bucket(key: Key): number;

  /**
   * Get the number of buckets, including empty buckets.
   */
  bucket_count(): number;

  /**
   * Count the elements stored in a bucket.
   *
   * @param index Zero-based bucket index.
   * @return The number of elements in the selected bucket.
   */
  bucket_size(index: number): number;

  /**
   * Compute the current number of elements per bucket.
   *
   * @return The element count divided by the bucket count.
   */
  load_factor(): number;

  /**
   * Get the configured threshold used when growing the hash table.
   *
   * @return The current maximum load factor.
   */
  max_load_factor(): number;

  /* ---------------------------------------------------------
        SETTERS
    --------------------------------------------------------- */
  /**
   * Set the load-factor threshold used when growing the hash table.
   *
   * @param z New maximum load factor.
   */
  max_load_factor(z: number): void;

  /**
   * Request enough buckets for `n` elements at the current maximum load
   * factor.
   *
   * @param n Element count to accommodate.
   */
  reserve(n: number): void;

  /**
   * Rebuild the hash table using the requested bucket count, subject to the
   * library minimum.
   *
   * @param n Requested number of buckets.
   */
  rehash(n: number): void;
}

export namespace IHashContainer {
  /**
   * @internal
   */
  export function construct<
    Key,
    T extends Elem,
    SourceT extends IHashContainer<
      Key,
      T,
      SourceT,
      IteratorT,
      ReverseIteratorT,
      Elem
    >,
    IteratorT extends IContainer.Iterator<
      T,
      SourceT,
      IteratorT,
      ReverseIteratorT,
      Elem
    >,
    ReverseIteratorT extends IContainer.ReverseIterator<
      T,
      SourceT,
      IteratorT,
      ReverseIteratorT,
      Elem
    >,
    Elem,
  >(
    source: SourceT,
    Source: Factory<SourceT>,
    bucketFactory: (
      hasher: Hasher<Key>,
      predicator: BinaryPredicator<Key>,
    ) => void,
    ...args: any[]
  ) {
    // DECLARE MEMBERS
    let post_process: (() => void) | null = null;
    let hash_function: Hasher<Key> = hash;
    let key_eq: BinaryPredicator<Key> = equal_to;

    //----
    // INITIALIZE MEMBERS AND POST-PROCESS
    //----
    // BRANCH - METHOD OVERLOADINGS
    if (args.length === 1 && args[0] instanceof Source) {
      // PARAMETERS
      const container: SourceT = args[0];
      hash_function = container.hash_function();
      key_eq = container.key_eq();

      // COPY CONSTRUCTOR
      post_process = () => {
        const first = container.begin();
        const last = container.end();

        source.assign(first, last);
      };
    } else {
      const tuple = IAssociativeContainer.construct(source, ...args);

      post_process = tuple.ramda;
      if (tuple.tail.length >= 1) hash_function = tuple.tail[0];
      if (tuple.tail.length >= 2) key_eq = tuple.tail[1];
    }

    //----
    // DO PROCESS
    //----
    // CONSTRUCT BUCKET
    bucketFactory(hash_function, key_eq);

    // ACT POST-PROCESS
    if (post_process !== null) post_process();
  }

  /**
   * @internal
   */
  interface Factory<T, Arguments extends any[] = any[]> {
    new (...args: Arguments): T;
    prototype: T;
  }
}
