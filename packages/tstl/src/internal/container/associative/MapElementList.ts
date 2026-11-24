//================================================================

/**
 * @packageDocumentation
 * @module std.internal
 */
//================================================================
import { MapContainer } from "../../../base/container/MapContainer";
import { Entry } from "../../../utility/Entry";
import { IPair } from "../../../utility/IPair";
import { ListIterator } from "../../iterator/ListIterator";
import { ReverseIterator as _ReverseIterator } from "../../iterator/ReverseIterator";
import { ListContainer } from "../linear/ListContainer";

/**
 * Doubly linked storage for map entries.
 *
 * @template Key Key type
 * @template T Mapped type
 * @template Unique Whether duplicated key is blocked or not
 * @template Source Source type
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export class MapElementList<
  Key,
  T,
  Unique extends boolean,
  Source extends MapContainer<
    Key,
    T,
    Unique,
    Source,
    MapElementList.Iterator<Key, T, Unique, Source>,
    MapElementList.ReverseIterator<Key, T, Unique, Source>
  >,
> extends ListContainer<
  Entry<Key, T>,
  Source,
  MapElementList.Iterator<Key, T, Unique, Source>,
  MapElementList.ReverseIterator<Key, T, Unique, Source>
> {
  private associative_: Source;

  /* ---------------------------------------------------------
        CONSTRUCTORS
    --------------------------------------------------------- */
  public constructor(associative: Source) {
    super();

    this.associative_ = associative;
  }

  protected _Create_iterator(
    prev: MapElementList.Iterator<Key, T, Unique, Source>,
    next: MapElementList.Iterator<Key, T, Unique, Source>,
    val: Entry<Key, T>,
  ): MapElementList.Iterator<Key, T, Unique, Source> {
    return MapElementList.Iterator.create(this, prev, next, val);
  }

  /**
   * @internal
   */
  public static _Swap_associative<
    Key,
    T,
    Unique extends boolean,
    Source extends MapContainer<
      Key,
      T,
      Unique,
      Source,
      MapElementList.Iterator<Key, T, Unique, Source>,
      MapElementList.ReverseIterator<Key, T, Unique, Source>
    >,
  >(
    x: MapElementList<Key, T, Unique, Source>,
    y: MapElementList<Key, T, Unique, Source>,
  ): void {
    [x.associative_, y.associative_] = [y.associative_, x.associative_];
  }

  /* ---------------------------------------------------------
        ACCESSORS
    --------------------------------------------------------- */
  public associative(): Source {
    return this.associative_;
  }
}

/**
 * Iterator types for the element storage.
 */
export namespace MapElementList {
  /**
   * Iterator over the elements of `MapElementList` .
   *
   * @template Key Key type
   * @template T Mapped type
   * @template Unique Whether duplicated key is blocked or not
   * @template Source Source container type
   *
   * @author Jeongho Nam - https://github.com/samchon
   */
  export class Iterator<
      Key,
      T,
      Unique extends boolean,
      Source extends MapContainer<
        Key,
        T,
        Unique,
        Source,
        Iterator<Key, T, Unique, Source>,
        ReverseIterator<Key, T, Unique, Source>
      >,
    >
    extends ListIterator<
      Entry<Key, T>,
      Source,
      Iterator<Key, T, Unique, Source>,
      ReverseIterator<Key, T, Unique, Source>,
      IPair<Key, T>
    >
    implements
      MapContainer.Iterator<
        Key,
        T,
        Unique,
        Source,
        Iterator<Key, T, Unique, Source>,
        ReverseIterator<Key, T, Unique, Source>
      >
  {
    private list_: MapElementList<Key, T, Unique, Source>;

    /* ---------------------------------------------------------
            CONSTRUCTORS
        --------------------------------------------------------- */
    private constructor(
      list: MapElementList<Key, T, Unique, Source>,
      prev: Iterator<Key, T, Unique, Source>,
      next: Iterator<Key, T, Unique, Source>,
      val: Entry<Key, T>,
    ) {
      super(prev, next, val);
      this.list_ = list;
    }

    /**
     * @internal
     */
    public static create<
      Key,
      T,
      Unique extends boolean,
      Source extends MapContainer<
        Key,
        T,
        Unique,
        Source,
        Iterator<Key, T, Unique, Source>,
        ReverseIterator<Key, T, Unique, Source>
      >,
    >(
      list: MapElementList<Key, T, Unique, Source>,
      prev: Iterator<Key, T, Unique, Source>,
      next: Iterator<Key, T, Unique, Source>,
      val: Entry<Key, T>,
    ) {
      return new Iterator(list, prev, next, val);
    }

    /**
     * @inheritDoc
     */
    public reverse(): ReverseIterator<Key, T, Unique, Source> {
      return new ReverseIterator(this);
    }

    /* ---------------------------------------------------------
            ACCESSORS
        --------------------------------------------------------- */
    /**
     * @inheritDoc
     */
    public source(): Source {
      return this.list_.associative();
    }

    /**
     * @inheritDoc
     */
    public get first(): Key {
      return this.value.first;
    }

    /**
     * @inheritDoc
     */
    public get second(): T {
      return this.value.second;
    }

    /**
     * @inheritDoc
     */
    public set second(val: T) {
      this.value.second = val;
    }
  }

  /**
   * Iterator for reverse traversal of `MapElementList` .
   *
   * @template Key Key type
   * @template T Mapped type
   * @template Unique Whether duplicated key is blocked or not
   * @template Source Source container type
   *
   * @author Jeongho Nam - https://github.com/samchon
   */
  export class ReverseIterator<
      Key,
      T,
      Unique extends boolean,
      Source extends MapContainer<
        Key,
        T,
        Unique,
        Source,
        Iterator<Key, T, Unique, Source>,
        ReverseIterator<Key, T, Unique, Source>
      >,
    >
    extends _ReverseIterator<
      Entry<Key, T>,
      Source,
      Iterator<Key, T, Unique, Source>,
      ReverseIterator<Key, T, Unique, Source>,
      IPair<Key, T>
    >
    implements
      MapContainer.ReverseIterator<
        Key,
        T,
        Unique,
        Source,
        Iterator<Key, T, Unique, Source>,
        ReverseIterator<Key, T, Unique, Source>
      >
  {
    /* ---------------------------------------------------------
            CONSTRUCTORS
        --------------------------------------------------------- */
    protected _Create_neighbor(
      base: Iterator<Key, T, Unique, Source>,
    ): ReverseIterator<Key, T, Unique, Source> {
      return new ReverseIterator(base);
    }

    /* ---------------------------------------------------------
            ACCESSORS
        --------------------------------------------------------- */
    /**
     * Read the key of the entry at this reverse position.
     *
     * @return The entry's key.
     */
    public get first(): Key {
      return this.base_.first;
    }

    /**
     * Read the mapped value of the entry at this reverse position.
     *
     * @return The entry's mapped value.
     */
    public get second(): T {
      return this.base_.second;
    }

    /**
     * Replace the mapped value of the entry at this reverse position.
     *
     * @param val New mapped value.
     */
    public set second(val: T) {
      this.base_.second = val;
    }
  }
}
