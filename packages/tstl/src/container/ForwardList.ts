//================================================================

/**
 * @packageDocumentation
 * @module std
 */
//================================================================
import { stable_sort } from "../algorithm/sorting";
import { IPointer } from "../functional/IPointer";
import { equal_to, less } from "../functional/comparators";
import { IListAlgorithm } from "../internal/container/linear/IListAlgorithm";
import { IClear } from "../internal/container/partial/IClear";
import { IDeque } from "../internal/container/partial/IDeque";
import { IEmpty } from "../internal/container/partial/IEmpty";
import { IFront } from "../internal/container/partial/IFront";
import { ISize } from "../internal/container/partial/ISize";
import { ErrorGenerator } from "../internal/exception/ErrorGenerator";
import { BinaryPredicator } from "../internal/functional/BinaryPredicator";
import { Comparator } from "../internal/functional/Comparator";
import { UnaryPredicator } from "../internal/functional/UnaryPredicator";
import { ForOfAdaptor } from "../internal/iterator/disposable/ForOfAdaptor";
import { Repeater } from "../internal/iterator/disposable/Repeater";
import { IForwardIterator } from "../iterator/IForwardIterator";
import { advance, distance } from "../iterator/global";
import { IForwardContainer } from "../ranges/container/IForwardContainer";
import { Vector } from "./Vector";

/**
 * Singly linked sequence with a before-begin sentinel for operations that act
 * after a position.
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export class ForwardList<T>
  implements
    IForwardContainer<ForwardList.Iterator<T>>,
    IClear,
    IEmpty,
    ISize,
    IDeque<T>,
    IFront<T>,
    Iterable<T>,
    IListAlgorithm<T, ForwardList<T>>
{
  private ptr_: IPointer<ForwardList<T>>;
  private size_: number;

  private before_begin_: ForwardList.Iterator<T>;
  private end_: ForwardList.Iterator<T>;

  /* ===============================================================
        CONSTRUCTORS & SEMI-CONSTRUCTORS
            - CONSTRUCTORS
            - ASSIGN & CLEAR
    ==================================================================
        CONSTURCTORS
    --------------------------------------------------------------- */
  /**
   * Create an empty ForwardList.
   */
  public constructor();

  /**
   * Create a ForwardList containing the supplied elements.
   *
   * @param items Initial elements in traversal order.
   */
  public constructor(items: T[]);

  /**
   * Create a ForwardList from an existing instance.
   *
   * @param obj Source object to copy.
   */
  public constructor(obj: ForwardList<T>);

  /**
   * Create a ForwardList with `n` copies of `val`.
   *
   * @param n Number of initial elements.
   * @param val Value assigned to each element.
   */
  public constructor(n: number, val: T);

  /**
   * Create a ForwardList from the elements in `[first, last)`.
   *
   * @param first Start of the input range.
   * @param last Exclusive end of the input range.
   */
  public constructor(
    first: Readonly<IForwardIterator<T>>,
    last: Readonly<IForwardIterator<T>>,
  );

  public constructor(...args: any[]) {
    this.ptr_ = { value: this };

    this.end_ = ForwardList.Iterator.create(this.ptr_, null!);
    this.before_begin_ = ForwardList.Iterator.create(this.ptr_, this.end_);
    this.size_ = 0;

    if (args.length === 1 && args[0] instanceof Array) {
      const array: Array<T> = args[0];
      let it = this.before_begin();

      for (const val of array) it = this.insert_after(it, val);
    } else if (args.length === 1 && args[0] instanceof ForwardList) {
      this.assign(args[0].begin(), args[0].end());
    } else if (args.length === 2) this.assign(args[0], args[1]);
  }

  /* ---------------------------------------------------------------
        ASSIGN & CLEAR
    --------------------------------------------------------------- */
  /**
   * Replace the contents with `n` copies of the supplied value.
   *
   * @param n Number of initial elements.
   * @param val Value assigned to each element.
   */
  public assign(n: number, val: T): void;

  /**
   * Replace the contents with the elements in the half-open input range.
   *
   * @param first Start of the input range.
   * @param last Exclusive end of the input range.
   */
  public assign<
    T,
    InputIterator extends Readonly<IForwardIterator<T, InputIterator>>,
  >(first: InputIterator, last: InputIterator): void;

  public assign(first: any, last: any): void {
    this.clear();
    this.insert_after(this.before_begin_, first, last);
  }

  /**
   * @inheritDoc
   */
  public clear(): void {
    ForwardList.Iterator._Set_next(this.before_begin_, this.end_);
    this.size_ = 0;
  }

  /* ===============================================================
        ACCESSORS
    =============================================================== */
  /**
   * @inheritDoc
   */
  public size(): number {
    return this.size_;
  }

  /**
   * @inheritDoc
   */
  public empty(): boolean {
    return this.size_ === 0;
  }

  /**
   * @inheritDoc
   */
  public front(): T;

  /**
   * @inheritDoc
   */
  public front(val: T): void;

  public front(val?: T): T | void {
    const it: ForwardList.Iterator<T> = this.begin();

    if (arguments.length === 0) return it.value;
    else it.value = val!;
  }

  /**
   * Get the sentinel immediately before the first element. It can be used with
   * operations such as `insert_after`.
   *
   * @return The before-begin sentinel. Its value cannot be read.
   */
  public before_begin(): ForwardList.Iterator<T> {
    return this.before_begin_;
  }

  /**
   * @inheritDoc
   */
  public begin(): ForwardList.Iterator<T> {
    return this.before_begin_.next();
  }

  /**
   * @inheritDoc
   */
  public end(): ForwardList.Iterator<T> {
    return this.end_;
  }

  /**
   * @inheritDoc
   */
  public [Symbol.iterator](): IterableIterator<T> {
    return new ForOfAdaptor(this.begin(), this.end());
  }

  /* ===============================================================
        ELEMENTS I/O
            - INSERT
            - ERASE
    ==================================================================
        INSERT
    --------------------------------------------------------------- */
  /**
   * @inheritDoc
   */
  public push_front(val: T): void {
    this.insert_after(this.before_begin_, val);
  }

  /**
   * Insert a value after `pos`.
   *
   * @param pos Position after which to insert.
   * @param val Value to insert.
   * @return An iterator to the inserted element.
   */
  public insert_after(
    pos: ForwardList.Iterator<T>,
    val: T,
  ): ForwardList.Iterator<T>;

  /**
   * Insert `n` copies of a value after `pos`.
   *
   * @param pos Position after which to insert.
   * @param n Number of elements to insert.
   * @param val Value to insert repeatedly.
   * @return An iterator to the last inserted element.
   */
  public insert_after(
    pos: ForwardList.Iterator<T>,
    n: number,
    val: T,
  ): ForwardList.Iterator<T>;

  /**
   * Insert the elements in `[first, last)` after `pos`.
   *
   * @param pos Position after which to insert.
   * @param first Start of the input range.
   * @param last Exclusive end of the input range.
   * @return An iterator to the last inserted element.
   */
  public insert_after<
    T,
    InputIterator extends Readonly<IForwardIterator<T, InputIterator>>,
  >(
    pos: ForwardList.Iterator<T>,
    first: InputIterator,
    last: InputIterator,
  ): ForwardList.Iterator<T>;

  public insert_after(
    pos: ForwardList.Iterator<T>,
    ...args: any[]
  ): ForwardList.Iterator<T> {
    let ret: ForwardList.Iterator<T>;

    // BRANCHES
    if (args.length === 1) ret = this._Insert_by_repeating_val(pos, 1, args[0]);
    else if (typeof args[0] === "number")
      ret = this._Insert_by_repeating_val(pos, args[0], args[1]);
    else ret = this._Insert_by_range(pos, args[0], args[1]);

    // RETURNS
    return ret;
  }

  private _Insert_by_repeating_val(
    pos: ForwardList.Iterator<T>,
    n: number,
    val: T,
  ): ForwardList.Iterator<T> {
    const first: Repeater<T> = new Repeater(0, val);
    const last: Repeater<T> = new Repeater(n);

    return this._Insert_by_range(pos, first, last);
  }

  private _Insert_by_range<
    InputIterator extends Readonly<IForwardIterator<T, InputIterator>>,
  >(
    pos: ForwardList.Iterator<T>,
    first: InputIterator,
    last: InputIterator,
  ): ForwardList.Iterator<T> {
    const nodes: ForwardList.Iterator<T>[] = [];
    let count: number = 0;

    for (; !first.equals(last); first = first.next()) {
      const node = ForwardList.Iterator.create(this.ptr_, null!, first.value);
      nodes.push(node);

      ++count;
    }
    if (count === 0) return pos;

    for (let i: number = 0; i < count - 1; ++i)
      ForwardList.Iterator._Set_next(nodes[i], nodes[i + 1]);
    ForwardList.Iterator._Set_next(nodes[nodes.length - 1], pos.next());
    ForwardList.Iterator._Set_next(pos, nodes[0]);

    this.size_ += count;
    return nodes[nodes.length - 1];
  }

  /* ---------------------------------------------------------------
        ERASE
    --------------------------------------------------------------- */
  /**
   * @inheritDoc
   */
  public pop_front(): void {
    this.erase_after(this.before_begin());
  }

  /**
   * Erase the element immediately after `it`. The following element must be
   * dereferenceable.
   *
   * @param it Position before the element to erase.
   * @return The iterator following the erased element.
   */
  public erase_after(it: ForwardList.Iterator<T>): ForwardList.Iterator<T>;

  /**
   * Erase the elements strictly after `first` and before `last`.
   *
   * @param first Position preceding the erased range.
   * @param last Exclusive end of the erased range.
   * @return The iterator `last`.
   */
  public erase_after(
    first: ForwardList.Iterator<T>,
    last: ForwardList.Iterator<T>,
  ): ForwardList.Iterator<T>;

  public erase_after(
    first: ForwardList.Iterator<T>,
    last: ForwardList.Iterator<T> = advance(first, 2),
  ): ForwardList.Iterator<T> {
    // SHRINK SIZE
    this.size_ -= Math.max(0, distance(first, last) - 1);

    // RE-CONNECT
    ForwardList.Iterator._Set_next(first, last);
    return last;
  }

  /* ===============================================================
        ALGORITHMS
            - UNIQUE & REMOVE(_IF)
            - MERGE & SPLICE
            - SORT
    ==================================================================
        UNIQUE & REMOVE(_IF)
    --------------------------------------------------------------- */
  /**
   * @inheritDoc
   */
  public unique(binary_pred: BinaryPredicator<T> = equal_to): void {
    let it = this.begin();
    while (!it.equals(this.end())) {
      const next_it = it.next();
      if (next_it.equals(this.end())) break;

      if (binary_pred(it.value, next_it.value)) this.erase_after(it);
      else it = next_it;
    }
  }

  /**
   * @inheritDoc
   */
  public remove(val: T): void {
    return this.remove_if((elem) => equal_to(elem, val));
  }

  /**
   * @inheritDoc
   */
  public remove_if(pred: UnaryPredicator<T>): void {
    let it = this.before_begin();
    let next = it.next();
    while (!next.equals(this.end())) {
      if (pred(next.value) === true) next = this.erase_after(it);
      else {
        it = next;
        next = it.next();
      }
    }
  }

  /* ---------------------------------------------------------------
        MERGE & SPLICE
    --------------------------------------------------------------- */
  /**
   * @inheritDoc
   */
  public merge(from: ForwardList<T>, comp: Comparator<T> = less): void {
    if (this === <ForwardList<T>>from) return;

    let it = this.before_begin();
    while (from.empty() === false) {
      const value = from.begin().value;
      while (!it.next().equals(this.end()) && !comp(value, it.next().value))
        it = it.next();

      this.splice_after(it, from, from.before_begin());
    }
  }

  /**
   * Move all nodes from a separate list after `pos`, emptying the source.
   * Moving from this same list has no effect. Iterators to moved nodes
   * follow their elements to this list. Work is linear in the moved count.
   *
   * @param pos A dereferenceable iterator into this list or `before_begin()`.
   * @param from Source list whose elements are moved.
   */
  public splice_after(pos: ForwardList.Iterator<T>, from: ForwardList<T>): void;

  /**
   * Move the node immediately after `before` to the position after `pos`,
   * preserving its iterator. When moving within this list, using `before`
   * or the moved node as `pos` leaves the order unchanged.
   *
   * @param pos A dereferenceable iterator into this list or `before_begin()`.
   * @param from Source list whose element is moved.
   * @param before An iterator in `from` whose next position is dereferenceable.
   */
  public splice_after(
    pos: ForwardList.Iterator<T>,
    from: ForwardList<T>,
    before: ForwardList.Iterator<T>,
  ): void;

  /**
   * Move `[first_before.next(), last)` to the position after `pos`, preserving
   * iterators to moved nodes. A destination inside the moved range or equal
   * to `first_before` leaves the order unchanged when moving within this list.
   *
   * @param pos A dereferenceable iterator into this list or `before_begin()`.
   * @param from Source list whose elements are moved.
   * @param first_before Iterator in `from` preceding the first node to move.
   * @param last Exclusive end of the range in `from`.
   */
  public splice_after(
    pos: ForwardList.Iterator<T>,
    from: ForwardList<T>,
    first_before: ForwardList.Iterator<T>,
    last: ForwardList.Iterator<T>,
  ): void;

  public splice_after(
    pos: ForwardList.Iterator<T>,
    from: ForwardList<T>,
    first_before: ForwardList.Iterator<T> | undefined = undefined,
    last?: ForwardList.Iterator<T>,
  ): void {
    if (pos.source() !== this)
      throw ErrorGenerator.not_my_iterator(this, "splice_after");
    if (pos.equals(this.end_)) throw ErrorGenerator.iterator_end_value(this);
    if (first_before === undefined) {
      first_before = from.before_begin();
      last = from.end();
    } else if (last === undefined) last = first_before.next().next();
    if (last === null) last = from.end();
    if (first_before.source() !== from || last.source() !== from)
      throw ErrorGenerator.not_my_iterator(from, "splice_after");

    const first = first_before.next();
    if (first.equals(last) || pos.equals(first_before)) return;

    let tail = first;
    let count = 1;
    while (!tail.equals(last)) {
      if (tail.equals(pos)) return;
      if (tail.equals(from.end_)) throw ErrorGenerator.iterator_end_value(from);
      if (tail.next().equals(last)) break;
      tail = tail.next();
      ++count;
    }

    const after = pos.next();
    ForwardList.Iterator._Set_next(first_before, last);
    ForwardList.Iterator._Set_next(pos, first);
    ForwardList.Iterator._Set_next(tail, after);
    if (from !== this) {
      for (let it = first; !it.equals(after); it = it.next())
        ForwardList.Iterator._Set_source_ptr(it, this.ptr_);
      this.size_ += count;
      from.size_ -= count;
    }
  }

  /* ---------------------------------------------------------------
        SORT
    --------------------------------------------------------------- */
  /**
   * @inheritDoc
   */
  public sort(comp: Comparator<T> = less): void {
    const nodes = new Vector<ForwardList.Iterator<T>>();
    for (let it = this.begin(); !it.equals(this.end_); it = it.next())
      nodes.push_back(it);
    if (nodes.size() < 2) return;
    stable_sort(nodes.begin(), nodes.end(), (a, b) => comp(a.value, b.value));

    let previous = this.before_begin_;
    for (const node of nodes) {
      ForwardList.Iterator._Set_next(previous, node);
      previous = node;
    }
    ForwardList.Iterator._Set_next(previous, this.end_);
  }

  /**
   * @inheritDoc
   */
  public reverse(): void {
    let previous = this.end_;
    for (let it = this.begin(); !it.equals(this.end_); ) {
      const next = it.next();
      ForwardList.Iterator._Set_next(it, previous);
      previous = it;
      it = next;
    }
    ForwardList.Iterator._Set_next(this.before_begin_, previous);
  }

  /* ---------------------------------------------------------------
        UTILITIES
    --------------------------------------------------------------- */
  /**
   * @inheritDoc
   */
  public swap(obj: ForwardList<T>): void {
    // SIZE AND NODES
    [this.size_, obj.size_] = [obj.size_, this.size_];
    [this.before_begin_, obj.before_begin_] = [
      obj.before_begin_,
      this.before_begin_,
    ];
    [this.end_, obj.end_] = [obj.end_, this.end_];

    // POINTER OF THE SOURCE
    [this.ptr_, obj.ptr_] = [obj.ptr_, this.ptr_];
    [this.ptr_.value, obj.ptr_.value] = [obj.ptr_.value, this.ptr_.value];
  }

  /**
   * Return the elements in traversal order for JSON serialization.
   *
   * @return An array of the elements in traversal order.
   */
  public toJSON(): Array<T> {
    const ret: T[] = [];
    for (const elem of this) ret.push(elem);

    return ret;
  }
}

/**
 * Iterator types for ForwardList.
 */
export namespace ForwardList {
  /**
   * Iterator over the elements of `ForwardList`.
   *
   * @author Jeongho Nam - https://github.com/samchon
   */
  export class Iterator<T> implements IForwardIterator<T, Iterator<T>> {
    private source_ptr_: IPointer<ForwardList<T>>;
    private next_: Iterator<T>;
    private value_: T | undefined;

    /* ---------------------------------------------------------------
            CONSTRUCTORS
        --------------------------------------------------------------- */
    private constructor(
      source: IPointer<ForwardList<T>>,
      next: Iterator<T>,
      value?: T,
    ) {
      this.source_ptr_ = source;
      this.next_ = next;

      this.value_ = value;
    }

    /**
     * @internal
     */
    public static create<T>(
      source: IPointer<ForwardList<T>>,
      next: Iterator<T>,
      value?: T,
    ) {
      return new Iterator(source, next, value);
    }

    /* ---------------------------------------------------------------
            ACCESSORS
        --------------------------------------------------------------- */
    /**
     * Get the container associated with this iterator.
     *
     * @return The source container.
     */
    public source(): ForwardList<T> {
      return this.source_ptr_.value;
    }

    /**
     * @inheritDoc
     */
    public get value(): T {
      this._Try_value();
      return this.value_!;
    }

    /**
     * @inheritDoc
     */
    public set value(val: T) {
      this._Try_value();
      this.value_ = val;
    }

    private _Try_value(): void {
      if (this.value_ === undefined) {
        const source: ForwardList<T> = this.source();

        if (this.equals(source.end()) === true)
          throw ErrorGenerator.iterator_end_value(source);
        else if (this.equals(source.before_begin()) === true)
          throw ErrorGenerator.iterator_end_value(source, "before_begin");
      }
    }

    /* ---------------------------------------------------------
            MOVERS
        --------------------------------------------------------- */
    /**
     * @inheritDoc
     */
    public next(): Iterator<T> {
      return this.next_;
    }

    /**
     * @inheritDoc
     */
    public equals(obj: Iterator<T>): boolean {
      return this === obj;
    }

    /**
     * @internal
     */
    public static _Set_next<T>(it: Iterator<T>, next: Iterator<T>): void {
      it.next_ = next;
    }

    /** @internal */
    public static _Set_source_ptr<T>(
      it: Iterator<T>,
      ptr: IPointer<ForwardList<T>>,
    ): void {
      it.source_ptr_ = ptr;
    }
  }
}
