//================================================================

/**
 * @packageDocumentation
 * @module std.experimental
 */
//================================================================
import { lower_bound, upper_bound } from "../../algorithm/binary_search";
import { ITreeContainer } from "../../internal/container/associative/ITreeContainer";
import { MapElementVector } from "../../internal/container/associative/MapElementVector";
import { MultiTreeMap } from "../../internal/container/associative/MultiTreeMap";
import { Comparator } from "../../internal/functional/Comparator";
import { Temporary } from "../../internal/functional/Temporary";
import { IForwardIterator } from "../../iterator/IForwardIterator";
import { Entry } from "../../utility/Entry";
import { IPair } from "../../utility/IPair";

/**
 * Ordered map stored in a sorted array, with multiple entries permitted per
 * equivalent key.
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export class FlatMultiMap<Key, T> extends MultiTreeMap<
  Key,
  T,
  FlatMultiMap<Key, T>,
  FlatMultiMap.Iterator<Key, T>,
  FlatMultiMap.ReverseIterator<Key, T>
> {
  private key_comp_!: Comparator<Key>;

  /* ---------------------------------------------------------
        CONSTURCTORS
    --------------------------------------------------------- */
  /**
   * Create an empty FlatMultiMap.
   *
   * @param comp Strict ordering predicate. Return `true` when the first
   * argument precedes the second. Defaults to {@link less} .
   */
  public constructor(comp?: Comparator<Key>);

  /**
   * Create a FlatMultiMap from the supplied elements using the given ordering.
   *
   * @param items Initial elements in traversal order.
   * @param comp Strict ordering predicate. Return `true` when the first
   * argument precedes the second. Defaults to {@link less} .
   */
  public constructor(items: IPair<Key, T>[], comp?: Comparator<Key>);

  /**
   * Create a FlatMultiMap from an existing instance.
   *
   * @param obj Source object to copy.
   */
  public constructor(obj: FlatMultiMap<Key, T>);

  /**
   * Create a FlatMultiMap from the elements in `[first, last)` .
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
    super((thisArg) => new MapElementVector(thisArg));

    // OVERLOADINGS
    ITreeContainer.construct<
      Key,
      Entry<Key, T>,
      FlatMultiMap<Key, T>,
      FlatMultiMap.Iterator<Key, T>,
      FlatMultiMap.ReverseIterator<Key, T>,
      IPair<Key, T>
    >(
      this,
      FlatMultiMap,
      (comp) => {
        this.key_comp_ = comp;
      },
      ...args,
    );
  }

  /**
   * @inheritDoc
   */
  public swap(obj: FlatMultiMap<Key, T>): void {
    // SWAP CONTENTS
    [this.data_, obj.data_] = [obj.data_, this.data_];
    MapElementVector._Swap_associative(
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
  public nth(index: number): FlatMultiMap.Iterator<Key, T> {
    return (
      this.data_ as MapElementVector<Key, T, false, FlatMultiMap<Key, T>>
    ).nth(index);
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
  public lower_bound(key: Key): FlatMultiMap.Iterator<Key, T> {
    return lower_bound(
      this.begin(),
      this.end(),
      this._Capsule_key(key),
      this.value_comp(),
    );
  }

  /**
   * @inheritDoc
   */
  public upper_bound(key: Key): FlatMultiMap.Iterator<Key, T> {
    return upper_bound(
      this.begin(),
      this.end(),
      this._Capsule_key(key),
      this.value_comp(),
    );
  }

  private _Capsule_key(key: Key): Entry<Key, T> {
    return { first: key } as Entry<Key, T>;
  }

  /* ---------------------------------------------------------
        POST-PROCESS
    --------------------------------------------------------- */
  protected _Handle_insert({}, {}): void {}

  protected _Handle_erase({}, {}): void {}
}

/**
 * Iterator types for FlatMultiMap.
 */
export namespace FlatMultiMap {
  // HEAD
  export type Iterator<Key, T> = MapElementVector.Iterator<
    Key,
    T,
    false,
    FlatMultiMap<Key, T>
  >;
  export type ReverseIterator<Key, T> = MapElementVector.ReverseIterator<
    Key,
    T,
    false,
    FlatMultiMap<Key, T>
  >;

  // BODY
  export const Iterator = MapElementVector.Iterator;
  export const ReverseIterator = MapElementVector.ReverseIterator;

  export const __MODULE = "experimental";
}
