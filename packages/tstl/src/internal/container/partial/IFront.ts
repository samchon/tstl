//================================================================
/**
 * @packageDocumentation
 * @module std.internal
 */
//================================================================
export interface IFront<T> {
  /**
   * Read the element at the front of the sequence.
   *
   * @return The first element.
   */
  front(): T;

  /**
   * Replace the first element of the sequence.
   *
   * @param val New value for the first element.
   */
  front(val: T): void;
}
