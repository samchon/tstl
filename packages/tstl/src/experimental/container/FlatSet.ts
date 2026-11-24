//================================================================

/**
 * @packageDocumentation
 * @module std.experimental
 */
//================================================================
import { lower_bound, upper_bound } from "../../algorithm/binary_search";
import { ITreeContainer } from "../../internal/container/associative/ITreeContainer";
import { SetElementVector } from "../../internal/container/associative/SetElementVector";
import { UniqueTreeSet } from "../../internal/container/associative/UniqueTreeSet";
import { Comparator } from "../../internal/functional/Comparator";
import { Temporary } from "../../internal/functional/Temporary";
import { IForwardIterator } from "../../iterator/IForwardIterator";

/**
 * Ordered set with unique keys, stored in a sorted array.
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export class FlatSet<Key> extends UniqueTreeSet<
  Key,
  FlatSet<Key>,
  FlatSet.Iterator<Key>,
  FlatSet.ReverseIterator<Key>
> {
  private key_comp_!: Comparator<Key>;

  /* ---------------------------------------------------------
        CONSTURCTORS
    --------------------------------------------------------- */
  /**
   * Create an empty FlatSet.
   *
   * @param comp Strict ordering predicate. Return `true` when the first
   * argument precedes the second. Defaults to {@link less} .
   */
  public constructor(comp?: Comparator<Key>);

  /**
   * Create a FlatSet from the supplied elements using the given ordering.
   *
   * @param items Initial elements in traversal order.
   * @param comp Strict ordering predicate. Return `true` when the first
   * argument precedes the second. Defaults to {@link less} .
   */
  public constructor(items: Key[], comp?: Comparator<Key>);

  /**
   * Create a FlatSet from an existing instance.
   *
   * @param obj Source object to copy.
   */
  public constructor(obj: FlatSet<Key>);

  /**
   * Create a FlatSet from the elements in `[first, last)` .
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
    // INITIALIZATION
    super((thisArg) => new SetElementVector(thisArg));

    // OVERLOADINGS
    ITreeContainer.construct<
      Key,
      Key,
      FlatSet<Key>,
      FlatSet.Iterator<Key>,
      FlatSet.ReverseIterator<Key>,
      Key
    >(
      this,
      FlatSet,
      (comp) => {
        this.key_comp_ = comp;
      },
      ...args,
    );
  }

  /**
   * @inheritDoc
   */
  public swap(obj: FlatSet<Key>): void {
    // SWAP CONTENTS
    [this.data_, obj.data_] = [obj.data_, this.data_];
    SetElementVector._Swap_associative(
      this.data_ as Temporary,
      obj.data_ as Temporary,
    );

    // SWAP COMPARATORS
    [this.key_comp_, obj.key_comp_] = [obj.key_comp_, this.key_comp_];
  }

  /* ---------------------------------------------------------
        ACCESSORS
    --------------------------------------------------------- */
  /**
   * @inheritDoc
   */
  public nth(index: number): FlatSet.Iterator<Key> {
    return (this.data_ as SetElementVector<Key, true, FlatSet<Key>>).nth(index);
  }

  /**
   * @inheritDoc
   */
  public key_comp(): Comparator<Key> {
    return this.key_comp_;
  }

  /**
   * @inheritDoc
   */
  public lower_bound(key: Key): FlatSet.Iterator<Key> {
    return lower_bound(this.begin(), this.end(), key, this.value_comp());
  }

  /**
   * @inheritDoc
   */
  public upper_bound(key: Key): FlatSet.Iterator<Key> {
    return upper_bound(this.begin(), this.end(), key, this.value_comp());
  }

  /* ---------------------------------------------------------
        POST-PROCESS
    --------------------------------------------------------- */
  protected _Handle_insert({}, {}): void {}

  protected _Handle_erase({}, {}): void {}
}

/**
 * Iterator types for FlatSet.
 */
export namespace FlatSet {
  // HEAD
  export type Iterator<Key> = SetElementVector.Iterator<
    Key,
    true,
    FlatSet<Key>
  >;
  export type ReverseIterator<Key> = SetElementVector.ReverseIterator<
    Key,
    true,
    FlatSet<Key>
  >;

  // BODY
  export const Iterator = SetElementVector.Iterator;
  export const ReverseIterator = SetElementVector.ReverseIterator;

  export const __MODULE = "experimental";
}
