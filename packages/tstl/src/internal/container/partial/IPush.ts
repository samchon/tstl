//================================================================
/**
 * @packageDocumentation
 * @module std.internal
 */
//================================================================
export interface IPush<T> {
  /**
   * Append the supplied elements in argument order.
   *
   * @param items Elements to append.
   * @return The size after appending.
   */
  push(...items: T[]): number;
}
