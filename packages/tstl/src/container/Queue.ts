//================================================================

/**
 * @packageDocumentation
 * @module std
 */
//================================================================
import { AdaptorContainer } from "../internal/container/linear/AdaptorContainer";
import { List } from "./List";

/**
 * First-in, first-out adaptor. Push appends at the back and pop removes from
 * the front.
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export class Queue<T> extends AdaptorContainer<T, List<T>, Queue<T>> {
  /* ---------------------------------------------------------
        CONSTRUCTORS
    --------------------------------------------------------- */
  /**
   * Create an empty Queue.
   */
  public constructor();

  /**
   * Create a Queue from an existing instance.
   *
   * @param obj Source object to copy.
   */
  public constructor(obj: Queue<T>);

  public constructor(obj?: Queue<T>) {
    super(new List());

    if (obj !== undefined)
      this.source_.assign(obj.source_.begin(), obj.source_.end());
  }

  /* ---------------------------------------------------------
        ACCESSORS
    --------------------------------------------------------- */
  /**
   * Read the element that the next pop would remove.
   *
   * @return The first element in the nonempty queue.
   */
  public front(): T {
    return this.source_.front();
  }

  /**
   * Read the last element pushed into the nonempty queue.
   *
   * @return The element at the back of the queue.
   */
  public back(): T {
    return this.source_.back();
  }

  /**
   * @inheritDoc
   */
  public pop(): void {
    this.source_.pop_front();
  }
}
