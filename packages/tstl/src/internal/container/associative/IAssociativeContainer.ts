//================================================================

/**
 * @packageDocumentation
 * @module std.internal
 */
//================================================================
import { IContainer } from "../../../base/container/IContainer";

/**
 * Shared interface for containers addressed by keys.
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export interface IAssociativeContainer<
  Key,
  T extends Elem,
  SourceT extends IAssociativeContainer<
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
> extends IContainer<T, SourceT, IteratorT, ReverseIteratorT, Elem> {
  /**
   * Find an element with an equivalent key.
   *
   * @param key Key to search for.
   * @return An iterator to a matching element, or the end iterator when the
   * key is absent.
   */
  find(key: Key): IteratorT;

  /**
   * Test whether the container has an equivalent key.
   *
   * @param key Key to search for.
   * @return Whether a matching key exists.
   */
  has(key: Key): boolean;

  /**
   * Count the elements with an equivalent key.
   *
   * @param key Key to search for.
   * @return The number of elements with an equivalent key.
   */
  count(key: Key): number;

  /**
   * Erase the elements with an equivalent key.
   *
   * @param key Key to search for.
   * @return The number of erased elements.
   */
  erase(key: Key): number;

  /**
   * @inheritDoc
   */
  erase(pos: IteratorT): IteratorT;

  /**
   * @inheritDoc
   */
  erase(first: IteratorT, last: IteratorT): IteratorT;
}

export namespace IAssociativeContainer {
  /**
   * @internal
   */
  export function construct<
    Key,
    T extends Elem,
    SourceT extends IAssociativeContainer<
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
  >(source: SourceT, ...args: any[]) {
    let ramda: (() => void) | null;
    let tail: any[];

    if (args.length >= 1 && args[0] instanceof Array) {
      // INITIALIZER LIST CONSTRUCTOR
      ramda = () => {
        const items: Elem[] = args[0];
        source.push(...items);
      };
      tail = args.slice(1);
    } else if (
      args.length >= 2 &&
      args[0].next instanceof Function &&
      args[1].next instanceof Function
    ) {
      // RANGE CONSTRUCTOR
      ramda = () => {
        const first: IteratorT = args[0];
        const last: IteratorT = args[1];

        source.assign(first, last);
      };
      tail = args.slice(2);
    } else {
      // DEFAULT CONSTRUCTOR
      ramda = null;
      tail = args;
    }

    return { ramda: ramda, tail: tail };
  }
}
