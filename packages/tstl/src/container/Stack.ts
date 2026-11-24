//================================================================

/**
 * @packageDocumentation
 * @module std
 */
//================================================================
import { AdaptorContainer } from "../internal/container/linear/AdaptorContainer";
import { Vector } from "./Vector";

/**
 * Last-in, first-out adaptor. Push and pop operate at the top.
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export class Stack<T> extends AdaptorContainer<T, Vector<T>, Stack<T>> {
  /* ---------------------------------------------------------
        CONSTRUCTORS
    --------------------------------------------------------- */
  /**
   * Create an empty Stack.
   */
  public constructor();

  /**
   * Create a Stack from an existing instance.
   *
   * @param obj Source object to copy.
   */
  public constructor(obj: Stack<T>);

  public constructor(obj?: Stack<T>) {
    super(new Vector());

    if (obj !== undefined)
      this.source_.assign(obj.source_.begin(), obj.source_.end());
  }

  /* ---------------------------------------------------------
        ACCESSOR
    --------------------------------------------------------- */
  /**
   * Read the top of the nonempty stack.
   *
   * @return The most recently pushed element still in the stack.
   */
  public top(): T {
    return this.source_.back();
  }

  /**
   * @inheritDoc
   */
  public pop(): void {
    this.source_.pop_back();
  }
}
