//================================================================

/**
 * @packageDocumentation
 * @module std
 */
//================================================================
import { ITreeContainer } from "../internal/container/associative/ITreeContainer";
import { MultiTreeSet } from "../internal/container/associative/MultiTreeSet";
import { SetElementList } from "../internal/container/associative/SetElementList";
import { Comparator } from "../internal/functional/Comparator";
import { Temporary } from "../internal/functional/Temporary";
import { MultiSetTree } from "../internal/tree/MultiSetTree";
import { IForwardIterator } from "../iterator/IForwardIterator";

/**
 * Ordered set that permits equivalent keys. Iterators visit keys in comparator
 * order.
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export class TreeMultiSet<Key> extends MultiTreeSet<
  Key,
  TreeMultiSet<Key>,
  TreeMultiSet.Iterator<Key>,
  TreeMultiSet.ReverseIterator<Key>
> {
  private tree_!: MultiSetTree<Key, TreeMultiSet<Key>>;

  /* ---------------------------------------------------------
        CONSTURCTORS
    --------------------------------------------------------- */
  /**
   * Create an empty TreeMultiSet.
   *
   * @param comp Strict ordering predicate. Return `true` when the first
   * argument precedes the second. Defaults to {@link less} .
   */
  public constructor(comp?: Comparator<Key>);

  /**
   * Create a TreeMultiSet from the supplied elements using the given ordering.
   *
   * @param items Initial elements in traversal order.
   * @param comp Strict ordering predicate. Return `true` when the first
   * argument precedes the second. Defaults to {@link less} .
   */
  public constructor(items: Key[], comp?: Comparator<Key>);

  /**
   * Create a TreeMultiSet from an existing instance.
   *
   * @param obj Source object to copy.
   */
  public constructor(obj: TreeMultiSet<Key>);

  /**
   * Create a TreeMultiSet from the elements in `[first, last)` .
   *
   * @param first Start of the input range.
   * @param last Exclusive end of the input range.
   * @param comp Strict ordering predicate. Return `true` when the first
   * argument precedes the second. Defaults to {@link less} .
   */
  public constructor(
    first: Readonly<IForwardIterator<Key>>,
    last: Readonly<IForwardIterator<Key>>,
    comp?: Comparator<Key>,
  );

  public constructor(...args: any[]) {
    super((thisArg) => new SetElementList(<Temporary>thisArg) as Temporary);

    ITreeContainer.construct<
      Key,
      Key,
      TreeMultiSet<Key>,
      TreeMultiSet.Iterator<Key>,
      TreeMultiSet.ReverseIterator<Key>,
      Key
    >(
      this,
      TreeMultiSet,
      (comp) => {
        this.tree_ = new MultiSetTree(this as TreeMultiSet<Key>, comp);
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
  public swap(obj: TreeMultiSet<Key>): void {
    // SWAP CONTENTS
    [this.data_, obj.data_] = [obj.data_, this.data_];
    SetElementList._Swap_associative(
      this.data_ as Temporary,
      obj.data_ as Temporary,
    );

    // SWAP RB-TREE
    MultiSetTree._Swap_source(this.tree_, obj.tree_);
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
  public lower_bound(key: Key): TreeMultiSet.Iterator<Key> {
    return this.tree_.lower_bound(key);
  }

  /**
   * @inheritDoc
   */
  public upper_bound(key: Key): TreeMultiSet.Iterator<Key> {
    return this.tree_.upper_bound(key);
  }

  /* ---------------------------------------------------------
        POST-PROCESS
    --------------------------------------------------------- */
  protected _Handle_insert(
    first: TreeMultiSet.Iterator<Key>,
    last: TreeMultiSet.Iterator<Key>,
  ): void {
    for (; !first.equals(last); first = first.next()) this.tree_.insert(first);
  }

  protected _Handle_erase(
    first: TreeMultiSet.Iterator<Key>,
    last: TreeMultiSet.Iterator<Key>,
  ): void {
    for (; !first.equals(last); first = first.next()) this.tree_.erase(first);
  }
}

/**
 * Iterator types for TreeMultiSet.
 */
export namespace TreeMultiSet {
  // HEAD
  /**
   * Iterator over the elements of `TreeMultiSet` .
   */
  export type Iterator<Key> = SetElementList.Iterator<
    Key,
    false,
    TreeMultiSet<Key>
  >;

  /**
   * Iterator for reverse traversal of `TreeMultiSet` .
   */
  export type ReverseIterator<Key> = SetElementList.ReverseIterator<
    Key,
    false,
    TreeMultiSet<Key>
  >;

  // BODY
  export const Iterator = SetElementList.Iterator;
  export const ReverseIterator = SetElementList.ReverseIterator;
}
