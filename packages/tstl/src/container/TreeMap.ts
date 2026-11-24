//================================================================

/**
 * @packageDocumentation
 * @module std
 */
//================================================================
import { ITreeContainer } from "../internal/container/associative/ITreeContainer";
import { MapElementList } from "../internal/container/associative/MapElementList";
import { UniqueTreeMap } from "../internal/container/associative/UniqueTreeMap";
import { Comparator } from "../internal/functional/Comparator";
import { Temporary } from "../internal/functional/Temporary";
import { UniqueMapTree } from "../internal/tree/UniqueMapTree";
import { IForwardIterator } from "../iterator/IForwardIterator";
import { Entry } from "../utility/Entry";
import { IPair } from "../utility/IPair";

/**
 * Ordered map with unique keys. Iterators visit keys in comparator order.
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export class TreeMap<Key, T> extends UniqueTreeMap<
  Key,
  T,
  TreeMap<Key, T>,
  TreeMap.Iterator<Key, T>,
  TreeMap.ReverseIterator<Key, T>
> {
  private tree_!: UniqueMapTree<Key, T, TreeMap<Key, T>>;

  /* ---------------------------------------------------------
        CONSTURCTORS
    --------------------------------------------------------- */
  /**
   * Create an empty TreeMap.
   *
   * @param comp Strict ordering predicate. Return `true` when the first
   * argument precedes the second. Defaults to {@link less} .
   */
  public constructor(comp?: Comparator<Key>);

  /**
   * Create a TreeMap from the supplied elements using the given ordering.
   *
   * @param items Initial elements in traversal order.
   * @param comp Strict ordering predicate. Return `true` when the first
   * argument precedes the second. Defaults to {@link less} .
   */
  public constructor(items: IPair<Key, T>[], comp?: Comparator<Key>);

  /**
   * Create a TreeMap from an existing instance.
   *
   * @param obj Source object to copy.
   */
  public constructor(obj: TreeMap<Key, T>);

  /**
   * Create a TreeMap from the elements in `[first, last)` .
   *
   * @param first Start of the input range.
   * @param last Exclusive end of the input range.
   * @param comp Strict ordering predicate. Return `true` when the first
   * argument precedes the second. Defaults to {@link less} .
   */
  public constructor(
    first: Readonly<IForwardIterator<IPair<Key, T>>>,
    last: Readonly<IForwardIterator<IPair<Key, T>>>,
    comp?: Comparator<Key>,
  );

  public constructor(...args: any[]) {
    // INITIALIZATION
    super((thisArg) => new MapElementList(<Temporary>thisArg) as Temporary);

    // OVERLOADINGS
    ITreeContainer.construct<
      Key,
      Entry<Key, T>,
      TreeMap<Key, T>,
      TreeMap.Iterator<Key, T>,
      TreeMap.ReverseIterator<Key, T>,
      IPair<Key, T>
    >(
      this,
      TreeMap,
      (comp) => {
        this.tree_ = new UniqueMapTree(this as TreeMap<Key, T>, comp);
      },
      ...args,
    );
  }

  /**
   * @inheritDoc
   */
  public clear(): void {
    super.clear();

    this.tree_.clear();
  }

  /**
   * @inheritDoc
   */
  public swap(obj: TreeMap<Key, T>): void {
    // SWAP CONTENTS
    [this.data_, obj.data_] = [obj.data_, this.data_];
    MapElementList._Swap_associative(
      this.data_ as Temporary,
      obj.data_ as Temporary,
    );

    // SWAP RB-TREE
    UniqueMapTree._Swap_source(this.tree_, obj.tree_);
    [this.tree_, obj.tree_] = [obj.tree_, this.tree_];
  }

  /* ---------------------------------------------------------
        ACCESSORS
    --------------------------------------------------------- */
  /**
   * @inheritDoc
   */
  public key_comp(): Comparator<Key> {
    return this.tree_.key_comp();
  }

  /**
   * @inheritDoc
   */
  public lower_bound(key: Key): TreeMap.Iterator<Key, T> {
    return this.tree_.lower_bound(key);
  }

  /**
   * @inheritDoc
   */
  public upper_bound(key: Key): TreeMap.Iterator<Key, T> {
    return this.tree_.upper_bound(key);
  }

  /* ---------------------------------------------------------
        POST-PROCESS
    --------------------------------------------------------- */
  protected _Handle_insert(
    first: TreeMap.Iterator<Key, T>,
    last: TreeMap.Iterator<Key, T>,
  ): void {
    for (; !first.equals(last); first = first.next()) this.tree_.insert(first);
  }

  protected _Handle_erase(
    first: TreeMap.Iterator<Key, T>,
    last: TreeMap.Iterator<Key, T>,
  ): void {
    for (; !first.equals(last); first = first.next()) this.tree_.erase(first);
  }
}

/**
 * Iterator types for TreeMap.
 */
export namespace TreeMap {
  // HEAD
  /**
   * Iterator over the elements of `TreeMap` .
   */
  export type Iterator<Key, T> = MapElementList.Iterator<
    Key,
    T,
    true,
    TreeMap<Key, T>
  >;

  /**
   * Iterator for reverse traversal of `TreeMap` .
   */
  export type ReverseIterator<Key, T> = MapElementList.ReverseIterator<
    Key,
    T,
    true,
    TreeMap<Key, T>
  >;

  // BODY
  export const Iterator = MapElementList.Iterator;
  export const ReverseIterator = MapElementList.ReverseIterator;
}
