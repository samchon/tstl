//================================================================
/**
 * @packageDocumentation
 * @module std.internal
 */
//================================================================
export interface IPushFront<T> {
  /**
   * Prepend one element to the front of the sequence.
   *
   * @param val Element to prepend.
   */
  push_front(val: T): void;
}
