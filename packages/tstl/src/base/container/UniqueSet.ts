//================================================================

/**
 * @packageDocumentation
 * @module std.base
 */
//================================================================
import { ErrorGenerator } from "../../internal/exception/ErrorGenerator";
import { IForwardIterator } from "../../iterator/IForwardIterator";
import { Pair } from "../../utility/Pair";
import { SetContainer } from "./SetContainer";

/**
 * Base class for sets that keep at most one element per equivalent key.
 *
 * @template Key Key type
 * @template Source Derived type extending this {@link UniqueSet}
 * @template IteratorT Iterator type
 * @template ReverseT Reverse iterator type
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export abstract class UniqueSet<
  Key,
  Source extends UniqueSet<Key, Source, IteratorT, ReverseT>,
  IteratorT extends UniqueSet.Iterator<Key, Source, IteratorT, ReverseT>,
  ReverseT extends UniqueSet.ReverseIterator<Key, Source, IteratorT, ReverseT>,
> extends SetContainer<Key, true, Source, IteratorT, ReverseT> {
  /* ---------------------------------------------------------
        ACCESSOR
    --------------------------------------------------------- */
  /**
   * @inheritDoc
   */
  public count(key: Key): number {
    return this.find(key).equals(this.end()) ? 0 : 1;
  }

  /* ---------------------------------------------------------
        INSERT
    --------------------------------------------------------- */
  /**
   * Insert the supplied element.
   *
   * @param key Key to insert.
   * @return {@link Pair} of an iterator to the newly inserted element and `true`, if the specified *key* doesn't exist, otherwise {@link Pair} of iterator to ordinary element and `false`.
   */
  public insert(key: Key): Pair<IteratorT, boolean>;

  /**
   * Insert an element using the supplied position as a hint.
   *
   * @param hint Suggested position for the insertion.
   * @param key Element to insert.
   * @return An iterator to the inserted element or to the existing element
   * with an equivalent key.
   */
  public insert(hint: IteratorT, key: Key): IteratorT;

  /**
   * Insert the elements in the half-open input range.
   *
   * @param first Start of the input range.
   * @param last Exclusive end of the input range.
   */
  public insert<
    InputIterator extends Readonly<IForwardIterator<Key, InputIterator>>,
  >(first: InputIterator, last: InputIterator): void;

  public insert(...args: any[]): any {
    return (super.insert as Function)(...args);
  }

  protected _Insert_by_range<
    InputIterator extends Readonly<IForwardIterator<Key, InputIterator>>,
  >(first: InputIterator, last: InputIterator): void {
    for (; !first.equals(last); first = first.next())
      this._Insert_by_key(first.value);
  }

  /* ---------------------------------------------------------
        ERASE
    --------------------------------------------------------- */
  /**
   * Remove the element equivalent to the supplied key. A matching element must
   * exist.
   *
   * @param key Key to search for.
   * @return The supplied key.
   */
  public extract(key: Key): Key;

  /**
   * Remove the matching element at the iterator position.
   *
   * @param it Iterator to the element to remove.
   * @return The removed iterator, or the end iterator when there is no
   * matching element.
   */
  public extract(it: IteratorT): IteratorT;

  public extract(param: Key | IteratorT): any {
    if (param instanceof this.end().constructor)
      return this._Extract_by_iterator(param as IteratorT);
    else return this._Extract_by_val(param as Key);
  }

  private _Extract_by_val(key: Key): Key {
    const it = this.find(key);
    if (it.equals(this.end()) === true)
      throw ErrorGenerator.key_nout_found(this, "extract", key);

    this._Erase_by_range(it);
    return key;
  }

  private _Extract_by_iterator(it: IteratorT): IteratorT {
    if (it.equals(this.end()) === true || this.has(it.value) === false)
      return this.end();

    this._Erase_by_range(it);
    return it;
  }

  protected _Erase_by_val(key: Key): number {
    const it = this.find(key);
    if (it.equals(this.end()) === true) return 0;

    this._Erase_by_range(it);
    return 1;
  }

  /* ---------------------------------------------------------
        UTILITY
    --------------------------------------------------------- */
  /**
   * @inheritDoc
   */
  public merge(source: Source): void {
    for (let it = source.begin(); !it.equals(source.end()); ) {
      if (this.has(it.value) === false) {
        this.insert(it.value);
        it = source.erase(it);
      } else it = it.next();
    }
  }
}

/**
 * Type utilities for UniqueSet.
 */
export namespace UniqueSet {
  /**
   * Iterator over the elements of `UniqueSet`.
   *
   * @author Jenogho Nam <http://samchon.org>
   */
  export type Iterator<
    Key,
    SourceT extends UniqueSet<Key, SourceT, IteratorT, ReverseT>,
    IteratorT extends Iterator<Key, SourceT, IteratorT, ReverseT>,
    ReverseT extends ReverseIterator<Key, SourceT, IteratorT, ReverseT>,
  > = SetContainer.Iterator<Key, true, SourceT, IteratorT, ReverseT>;

  /**
   * Iterator for reverse traversal of `UniqueSet`.
   *
   * @author Jenogho Nam <http://samchon.org>
   */
  export type ReverseIterator<
    Key,
    SourceT extends UniqueSet<Key, SourceT, IteratorT, ReverseT>,
    IteratorT extends Iterator<Key, SourceT, IteratorT, ReverseT>,
    ReverseT extends ReverseIterator<Key, SourceT, IteratorT, ReverseT>,
  > = SetContainer.ReverseIterator<Key, true, SourceT, IteratorT, ReverseT>;
}
