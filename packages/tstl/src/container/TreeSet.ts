//================================================================

/**
 * @packageDocumentation
 * @module std
 */
//================================================================
import { ITreeContainer } from "../internal/container/associative/ITreeContainer";
import { SetElementList } from "../internal/container/associative/SetElementList";
import { UniqueTreeSet } from "../internal/container/associative/UniqueTreeSet";
import { Comparator } from "../internal/functional/Comparator";
import { Temporary } from "../internal/functional/Temporary";
import { UniqueSetTree } from "../internal/tree/UniqueSetTree";
import { IForwardIterator } from "../iterator/IForwardIterator";

/**
 * Ordered set with unique keys. Iterators visit keys in comparator order.
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export class TreeSet<Key> extends UniqueTreeSet<
  Key,
  TreeSet<Key>,
  TreeSet.Iterator<Key>,
  TreeSet.ReverseIterator<Key>
> {
  private tree_!: UniqueSetTree<Key, TreeSet<Key>>;

  /* ---------------------------------------------------------
        CONSTURCTORS
    --------------------------------------------------------- */
  /**
   * Create an empty TreeSet.
   *
   * @param comp Strict ordering predicate. Return `true` when the first
   * argument precedes the second. Defaults to {@link less} .
   */
  public constructor(comp?: Comparator<Key>);

  /**
   * Create a TreeSet from the supplied elements using the given ordering.
   *
   * @param items Initial elements in traversal order.
   * @param comp Strict ordering predicate. Return `true` when the first
   * argument precedes the second. Defaults to {@link less} .
   */
  public constructor(items: Key[], comp?: Comparator<Key>);

  /**
   * Create a TreeSet from an existing instance.
   *
   * @param container Container to copy.
   */
  public constructor(container: TreeSet<Key>);

  /**
   * Create a TreeSet from the elements in `[first, last)` .
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
      TreeSet<Key>,
      TreeSet.Iterator<Key>,
      TreeSet.ReverseIterator<Key>,
      Key
    >(
      this,
      TreeSet,
      (comp) => {
        this.tree_ = new UniqueSetTree(this as TreeSet<Key>, comp);
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
  public swap(obj: TreeSet<Key>): void {
    // SWAP CONTENTS
    [this.data_, obj.data_] = [obj.data_, this.data_];
    SetElementList._Swap_associative(
      this.data_ as Temporary,
      obj.data_ as Temporary,
    );

    // SWAP RB-TREE
    UniqueSetTree._Swap_source(this.tree_, obj.tree_);
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
  public lower_bound(key: Key): TreeSet.Iterator<Key> {
    return this.tree_.lower_bound(key);
  }

  /**
   * @inheritDoc
   */
  public upper_bound(key: Key): TreeSet.Iterator<Key> {
    return this.tree_.upper_bound(key);
  }

  /* ---------------------------------------------------------
        POST-PROCESS
    --------------------------------------------------------- */
  protected _Handle_insert(
    first: TreeSet.Iterator<Key>,
    last: TreeSet.Iterator<Key>,
  ): void {
    for (; !first.equals(last); first = first.next()) this.tree_.insert(first);
  }

  protected _Handle_erase(
    first: TreeSet.Iterator<Key>,
    last: TreeSet.Iterator<Key>,
  ): void {
    for (; !first.equals(last); first = first.next()) this.tree_.erase(first);
  }
}

/**
 * Iterator types for TreeSet.
 */
export namespace TreeSet {
  // HEAD
  /**
   * Iterator over the elements of `TreeSet` .
   */
  export type Iterator<Key> = SetElementList.Iterator<Key, true, TreeSet<Key>>;

  /**
   * Iterator for reverse traversal of `TreeSet` .
   */
  export type ReverseIterator<Key> = SetElementList.ReverseIterator<
    Key,
    true,
    TreeSet<Key>
  >;

  // BODY
  export const Iterator = SetElementList.Iterator;
  export const ReverseIterator = SetElementList.ReverseIterator;
}
