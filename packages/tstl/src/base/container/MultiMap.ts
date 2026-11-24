//================================================================

/**
 * @packageDocumentation
 * @module std.base
 */
//================================================================
import { IForwardIterator } from "../../iterator/IForwardIterator";
import { IPair } from "../../utility/IPair";
import { MapContainer } from "./MapContainer";

/**
 * Base class for maps that allow multiple entries with equivalent keys.
 *
 * @template Key Key type
 * @template T Mapped type
 * @template Source Derived type extending this {@link MultiMap}
 * @template IteratorT Iterator type
 * @template ReverseT Reverse iterator type
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export abstract class MultiMap<
  Key,
  T,
  Source extends MultiMap<Key, T, Source, Iterator, Reverse>,
  Iterator extends MultiMap.Iterator<Key, T, Source, Iterator, Reverse>,
  Reverse extends MultiMap.ReverseIterator<Key, T, Source, Iterator, Reverse>,
> extends MapContainer<Key, T, false, Source, Iterator, Reverse> {
  /* ---------------------------------------------------------
        INSERT
    --------------------------------------------------------- */
  /**
   * Construct and insert an element.
   *
   * @param key Key to be mapped.
   * @param value Value to emplace.
   * @return An iterator to the inserted element.
   */
  public abstract emplace(key: Key, value: T): Iterator;

  /**
   * Construct an element using the supplied insertion hint.
   *
   * @param hint Suggested position for the insertion.
   * @param key Key of the new element.
   * @param val Value of the new element.
   * @return An iterator to the inserted element.
   */
  public abstract emplace_hint(hint: Iterator, key: Key, val: T): Iterator;

  /**
   * Insert the supplied element.
   *
   * @param pair Key and mapped value to insert.
   * @return An iterator to the inserted element.
   */
  public insert(pair: IPair<Key, T>): Iterator;

  /**
   * Insert an element using the supplied position as a hint.
   *
   * @param hint Suggested position for the insertion.
   * @param pair Key and mapped value to insert.
   * @return An iterator to the inserted element.
   */
  public insert(hint: Iterator, pair: IPair<Key, T>): Iterator;

  /**
   * Insert the elements in the half-open input range.
   *
   * @param first Start of the input range.
   * @param last Exclusive end of the input range.
   */
  public insert<
    InputIterator extends Readonly<
      IForwardIterator<IPair<Key, T>, InputIterator>
    >,
  >(first: InputIterator, last: InputIterator): void;

  public insert(...args: any[]): any {
    return (super.insert as Function)(...args);
  }

  /* ---------------------------------------------------------
        ERASE
    --------------------------------------------------------- */
  protected abstract _Key_eq(x: Key, y: Key): boolean;

  protected _Erase_by_key(key: Key): number {
    const first = this.find(key);
    if (first.equals(this.end()) === true) return 0;

    let last = first.next();
    let ret: number = 1;

    while (!last.equals(this.end()) && this._Key_eq(key, last.first)) {
      last = last.next();
      ++ret;
    }
    this._Erase_by_range(first, last);
    return ret;
  }

  /* ---------------------------------------------------------
        UTILITY
    --------------------------------------------------------- */
  /**
   * @inheritDoc
   */
  public merge(source: Source): void {
    this.insert(source.begin(), source.end());
    source.clear();
  }
}

/**
 * Type utilities for MultiMap.
 */
export namespace MultiMap {
  /**
   * Iterator over the elements of `MultiMap`.
   *
   * @author Jenogho Nam <http://samchon.org>
   */
  export type Iterator<
    Key,
    T,
    SourceT extends MultiMap<Key, T, SourceT, IteratorT, ReverseT>,
    IteratorT extends Iterator<Key, T, SourceT, IteratorT, ReverseT>,
    ReverseT extends ReverseIterator<Key, T, SourceT, IteratorT, ReverseT>,
  > = MapContainer.Iterator<Key, T, false, SourceT, IteratorT, ReverseT>;

  /**
   * Iterator for reverse traversal of `MultiMap`.
   *
   * @author Jenogho Nam <http://samchon.org>
   */
  export type ReverseIterator<
    Key,
    T,
    SourceT extends MultiMap<Key, T, SourceT, IteratorT, ReverseT>,
    IteratorT extends Iterator<Key, T, SourceT, IteratorT, ReverseT>,
    ReverseT extends ReverseIterator<Key, T, SourceT, IteratorT, ReverseT>,
  > = MapContainer.ReverseIterator<Key, T, false, SourceT, IteratorT, ReverseT>;
}
