//================================================================

/**
 * @packageDocumentation
 * @module std.experimental
 */
//================================================================
import { lower_bound, upper_bound } from "../../algorithm/binary_search";
import { ITreeContainer } from "../../internal/container/associative/ITreeContainer";
import { MultiTreeSet } from "../../internal/container/associative/MultiTreeSet";
import { SetElementVector } from "../../internal/container/associative/SetElementVector";
import { Comparator } from "../../internal/functional/Comparator";
import { Temporary } from "../../internal/functional/Temporary";
import { IForwardIterator } from "../../iterator/IForwardIterator";

/**
 * Ordered set stored in a sorted array, with multiple equivalent keys
 * permitted.
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export class FlatMultiSet<Key> extends MultiTreeSet<
  Key,
  FlatMultiSet<Key>,
  FlatMultiSet.Iterator<Key>,
  FlatMultiSet.ReverseIterator<Key>
> {
  private key_comp_!: Comparator<Key>;

  /* ---------------------------------------------------------
        CONSTURCTORS
    --------------------------------------------------------- */
  /**
   * Create an empty FlatMultiSet.
   *
   * @param comp Strict ordering predicate. Return `true` when the first
   * argument precedes the second. Defaults to {@link less}.
   */
  public constructor(comp?: Comparator<Key>);

  /**
   * Create a FlatMultiSet from the supplied elements using the given ordering.
   *
   * @param items Initial elements in traversal order.
   * @param comp Strict ordering predicate. Return `true` when the first
   * argument precedes the second. Defaults to {@link less}.
   */
  public constructor(items: Key[], comp?: Comparator<Key>);

  /**
   * Create a FlatMultiSet from an existing instance.
   *
   * @param obj Source object to copy.
   */
  public constructor(obj: FlatMultiSet<Key>);

  /**
   * Create a FlatMultiSet from the elements in `[first, last)`.
   *
   * @param first Start of the input range.
   * @param last Exclusive end of the input range.
   * @param comp Strict ordering predicate. Return `true` when the first
   * argument precedes the second. Defaults to {@link less}.
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
      FlatMultiSet<Key>,
      FlatMultiSet.Iterator<Key>,
      FlatMultiSet.ReverseIterator<Key>,
      Key
    >(
      this,
      FlatMultiSet,
      (comp) => {
        this.key_comp_ = comp;
      },
      ...args,
    );
  }

  /**
   * @inheritDoc
   */
  public swap(obj: FlatMultiSet<Key>): void {
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
  public nth(index: number): FlatMultiSet.Iterator<Key> {
    return (this.data_ as SetElementVector<Key, false, FlatMultiSet<Key>>).nth(
      index,
    );
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
  public lower_bound(key: Key): FlatMultiSet.Iterator<Key> {
    return lower_bound(this.begin(), this.end(), key, this.value_comp());
  }

  /**
   * @inheritDoc
   */
  public upper_bound(key: Key): FlatMultiSet.Iterator<Key> {
    return upper_bound(this.begin(), this.end(), key, this.value_comp());
  }

  /* ---------------------------------------------------------
        POST-PROCESS
    --------------------------------------------------------- */
  protected _Handle_insert({}, {}): void {}

  protected _Handle_erase({}, {}): void {}
}

/**
 * Iterator types for FlatMultiSet.
 */
export namespace FlatMultiSet {
  // HEAD
  export type Iterator<Key> = SetElementVector.Iterator<
    Key,
    false,
    FlatMultiSet<Key>
  >;
  export type ReverseIterator<Key> = SetElementVector.ReverseIterator<
    Key,
    false,
    FlatMultiSet<Key>
  >;

  // BODY
  export const Iterator = SetElementVector.Iterator;
  export const ReverseIterator = SetElementVector.ReverseIterator;

  export const __MODULE = "experimental";
}
