//================================================================
/**
 * @packageDocumentation
 * @module std.internal
 */
//================================================================
export interface IPushBack<T> {
  /**
   * Append one element to the back of the sequence.
   *
   * @param val Element to append.
   */
  push_back(val: T): void;
}
export namespace IPushBack {
  export type ContainerType<Range extends IPushBack<any>> =
    Range extends IPushBack<any> ? Range : unknown;

  export type IteratorType<Range extends IPushBack<any>> =
    Range extends IPushBack<infer Iterator> ? Iterator : unknown;
}
