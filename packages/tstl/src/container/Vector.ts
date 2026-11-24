//================================================================

/**
 * @packageDocumentation
 * @module std
 */
//================================================================
import { IArrayContainer } from "../base/container/IArrayContainer";
import { VectorContainer } from "../internal/container/linear/VectorContainer";
import { ArrayIterator } from "../internal/iterator/ArrayIterator";
import { ArrayReverseIterator } from "../internal/iterator/ArrayReverseIterator";
import { IForwardIterator } from "../iterator/IForwardIterator";

/**
 * Growable sequence backed by a JavaScript array, with random-access
 * iterators.
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export class Vector<T>
  extends VectorContainer<
    T,
    Vector<T>,
    Vector<T>,
    Vector.Iterator<T>,
    Vector.ReverseIterator<T>
  >
  implements
    IArrayContainer<
      T,
      Vector<T>,
      Vector.Iterator<T>,
      Vector.ReverseIterator<T>
    >
{
  /* ---------------------------------------------------------
        CONSTURCTORS
    --------------------------------------------------------- */
  /**
   * Create an empty Vector.
   */
  public constructor();

  /**
   * Initialize a Vector from the supplied arguments.
   *
   * @param items Initial elements in traversal order.
   */
  public constructor(items: Array<T>);

  /**
   * @internal
   */
  public constructor(items: Array<T>, move: true);

  /**
   * Create a Vector from an existing instance.
   *
   * @param obj Source object to copy.
   */
  public constructor(obj: Vector<T>);

  /**
   * Create a Vector with `n` copies of `val`.
   *
   * @param n Number of initial elements.
   * @param val Value assigned to each element.
   */
  public constructor(n: number, val: T);

  /**
   * Create a Vector from the elements in `[first, last)`.
   *
   * @param first Start of the input range.
   * @param last Exclusive end of the input range.
   */
  public constructor(
    first: Readonly<IForwardIterator<T>>,
    last: Readonly<IForwardIterator<T>>,
  );

  public constructor(...args: any[]) {
    super();

    // CONSTRUCTORS BRANCH
    if (args.length === 0) {
      // DEFAULT CONSTRUCTOR
      this.data_ = [];
    } else if (args[0] instanceof Array) {
      // INITIALIZER CONSTRUCTOR
      const array: Array<T> = args[0];
      this.data_ = args[1] === true ? array : array.slice();
    } else if (args.length === 1 && args[0] instanceof Vector) {
      // COPY CONSTRUCTOR
      const v: Vector<T> = args[0];
      this.data_ = v.data_.slice();
    } else if (args.length === 2) {
      // ASSIGN CONSTRUCTOR
      this.data_ = [];
      this.assign(args[0], args[1]);
    }
  }

  /* ---------------------------------------------------------
        ACCESSORS
    --------------------------------------------------------- */
  /**
   * Use an existing JavaScript array as the vector's backing storage. Writes
   * through either reference affect the same array.
   *
   * @param data Array to use directly as storage.
   * @return A vector backed by `data`.
   */
  public static wrap<T>(data: Array<T>): Vector<T> {
    return new Vector(data, true);
  }

  /**
   * @inheritDoc
   */
  public nth(index: number): Vector.Iterator<T> {
    return new Vector.Iterator(this as Vector<T>, index);
  }

  protected source(): Vector<T> {
    return this;
  }
}

/**
 * Iterator types for Vector.
 */
export namespace Vector {
  // HEAD
  /**
   * Iterator over the elements of `Vector`.
   */
  export type Iterator<T> = ArrayIterator<T, Vector<T>>;

  /**
   * Iterator for reverse traversal of `Vector`.
   */
  export type ReverseIterator<T> = ArrayReverseIterator<T, Vector<T>>;

  // BODY
  export const Iterator = ArrayIterator;
  export const ReverseIterator = ArrayReverseIterator;
}
