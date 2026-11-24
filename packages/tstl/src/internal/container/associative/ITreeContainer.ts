//================================================================

/**
 * @packageDocumentation
 * @module std.internal
 */
//================================================================
import { IContainer } from "../../../base/container/IContainer";
import { less } from "../../../functional/comparators";
import { Pair } from "../../../utility/Pair";
import { Comparator } from "../../functional/Comparator";
import { IAssociativeContainer } from "./IAssociativeContainer";

/**
 * Shared operations for ordered lookup and comparator access.
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export interface ITreeContainer<
  Key,
  T extends Elem,
  SourceT extends ITreeContainer<
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
  /**
   * Get the ordering predicate used for keys.
   *
   * @return The key comparator.
   */
  key_comp(): Comparator<Key>;

  /**
   * Get the ordering predicate used for stored values.
   *
   * @return The value comparator.
   */
  value_comp(): Comparator<Elem>;

  /**
   * Find the first element whose key does not precede `key` .
   *
   * @param key Key to search for.
   * @return The lower bound, or the end iterator.
   */
  lower_bound(key: Key): IteratorT;

  /**
   * Find the first element whose key follows `key` .
   *
   * @param key Key to search for.
   * @return The upper bound, or the end iterator.
   */
  upper_bound(key: Key): IteratorT;

  /**
   * Find the half-open range of elements whose keys are equivalent to `key` .
   *
   * @param key Key to search for.
   * @return The lower and upper bounds. They coincide if the key is absent.
   */
  equal_range(key: Key): Pair<IteratorT, IteratorT>;
}

export namespace ITreeContainer {
  /**
   * @internal
   */
  export function construct<
    Key,
    T extends Elem,
    SourceT extends ITreeContainer<
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
    treeFactory: (comp: Comparator<Key>) => void,
    ...args: any[]
  ) {
    // DECLARE MEMBERS
    let post_process: (() => void) | null = null;
    let comp: Comparator<Key> = less;

    //----
    // INITIALIZE MEMBERS AND POST-PROCESS
    //----
    // BRANCH - METHOD OVERLOADINGS
    if (args.length === 1 && args[0] instanceof Source) {
      // PARAMETERS
      const container: SourceT = args[0];
      comp = container.key_comp();

      // COPY CONSTRUCTOR
      post_process = () => {
        const first = container.begin();
        const last = container.end();

        source.assign(first, last);
      };
    } else {
      const tuple = IAssociativeContainer.construct(source, ...args);

      post_process = tuple.ramda;
      if (tuple.tail.length >= 1) comp = tuple.tail[0];
    }

    //----
    // DO PROCESS
    //----
    // CONSTRUCT TREE
    treeFactory(comp);

    // ACT POST-PROCESS
    if (post_process !== null) post_process();
  }

  /**
   * @internal
   */
  export function emplacable<
    Key,
    T extends Elem,
    SourceT extends ITreeContainer<
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
  >(source: SourceT, hint: IteratorT, elem: T): boolean {
    const prev = hint.prev();
    let meet: boolean =
      prev.equals(source.end()) || source.value_comp()(prev.value, elem);
    meet =
      meet &&
      (hint.equals(source.end()) || source.value_comp()(elem, hint.value));

    return meet;
  }

  /**
   * @internal
   */
  interface Factory<T, Arguments extends any[] = any[]> {
    new (...args: Arguments): T;
    prototype: T;
  }
}
