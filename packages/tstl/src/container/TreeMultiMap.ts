//================================================================

/**
 * @packageDocumentation
 * @module std
 */
//================================================================
import { ITreeContainer } from "../internal/container/associative/ITreeContainer";
import { MapElementList } from "../internal/container/associative/MapElementList";
import { MultiTreeMap } from "../internal/container/associative/MultiTreeMap";
import { Comparator } from "../internal/functional/Comparator";
import { Temporary } from "../internal/functional/Temporary";
import { MultiMapTree } from "../internal/tree/MultiMapTree";
import { IForwardIterator } from "../iterator/IForwardIterator";
import { Entry } from "../utility/Entry";
import { IPair } from "../utility/IPair";

/**
 * Ordered map that permits equivalent keys. Iterators visit keys in comparator
 * order.
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export class TreeMultiMap<Key, T> extends MultiTreeMap<
  Key,
  T,
  TreeMultiMap<Key, T>,
  TreeMultiMap.Iterator<Key, T>,
  TreeMultiMap.ReverseIterator<Key, T>
> {
  private tree_!: MultiMapTree<Key, T, TreeMultiMap<Key, T>>;

  /* ---------------------------------------------------------
        CONSTURCTORS
    --------------------------------------------------------- */
  /**
   * Create an empty TreeMultiMap.
   *
   * @param comp Strict ordering predicate. Return `true` when the first
   * argument precedes the second. Defaults to {@link less}.
   */
  public constructor(comp?: Comparator<Key>);

  /**
   * Create a TreeMultiMap from the supplied elements using the given ordering.
   *
   * @param items Initial elements in traversal order.
   * @param comp Strict ordering predicate. Return `true` when the first
   * argument precedes the second. Defaults to {@link less}.
   */
  public constructor(items: IPair<Key, T>[], comp?: Comparator<Key>);

  /**
   * Create a TreeMultiMap from an existing instance.
   *
   * @param obj Source object to copy.
   */
  public constructor(obj: TreeMultiMap<Key, T>);

  /**
   * Create a TreeMultiMap from the elements in `[first, last)`.
   *
   * @param first Start of the input range.
   * @param last Exclusive end of the input range.
   * @param comp Strict ordering predicate. Return `true` when the first
   * argument precedes the second. Defaults to {@link less}.
   */
  public constructor(
    first: Readonly<IForwardIterator<IPair<Key, T>>>,
    last: Readonly<IForwardIterator<IPair<Key, T>>>,
    comp?: Comparator<Key>,
  );

  public constructor(...args: any[]) {
    super((thisArg) => new MapElementList(<Temporary>thisArg) as Temporary);

    ITreeContainer.construct<
      Key,
      Entry<Key, T>,
      TreeMultiMap<Key, T>,
      TreeMultiMap.Iterator<Key, T>,
      TreeMultiMap.ReverseIterator<Key, T>,
      IPair<Key, T>
    >(
      this,
      TreeMultiMap,
      (comp) => {
        this.tree_ = new MultiMapTree(this as TreeMultiMap<Key, T>, comp);
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
  public swap(obj: TreeMultiMap<Key, T>): void {
    // SWAP CONTENTS
    [this.data_, obj.data_] = [obj.data_, this.data_];
    MapElementList._Swap_associative(
      this.data_ as Temporary,
      obj.data_ as Temporary,
    );

    // SWAP RB-TREE
    MultiMapTree._Swap_source(this.tree_, obj.tree_);
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
  public lower_bound(key: Key): TreeMultiMap.Iterator<Key, T> {
    return this.tree_.lower_bound(key);
  }

  /**
   * @inheritDoc
   */
  public upper_bound(key: Key): TreeMultiMap.Iterator<Key, T> {
    return this.tree_.upper_bound(key);
  }

  /* ---------------------------------------------------------
        POST-PROCESS
    --------------------------------------------------------- */
  protected _Handle_insert(
    first: TreeMultiMap.Iterator<Key, T>,
    last: TreeMultiMap.Iterator<Key, T>,
  ): void {
    for (; !first.equals(last); first = first.next()) this.tree_.insert(first);
  }

  protected _Handle_erase(
    first: TreeMultiMap.Iterator<Key, T>,
    last: TreeMultiMap.Iterator<Key, T>,
  ): void {
    for (; !first.equals(last); first = first.next()) this.tree_.erase(first);
  }
}

/**
 * Iterator types for TreeMultiMap.
 */
export namespace TreeMultiMap {
  // HEAD
  /**
   * Iterator over the elements of `TreeMultiMap`.
   */
  export type Iterator<Key, T> = MapElementList.Iterator<
    Key,
    T,
    false,
    TreeMultiMap<Key, T>
  >;

  /**
   * Iterator for reverse traversal of `TreeMultiMap`.
   */
  export type ReverseIterator<Key, T> = MapElementList.ReverseIterator<
    Key,
    T,
    false,
    TreeMultiMap<Key, T>
  >;

  // BODY
  export const Iterator = MapElementList.Iterator;
  export const ReverseIterator = MapElementList.ReverseIterator;
}
