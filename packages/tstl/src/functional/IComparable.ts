//================================================================
/**
 * @packageDocumentation
 * @module std
 */
//================================================================
/**
 * Optional comparison methods used by the library's default comparators.
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export interface IComparable<T> {
  /**
   * Test equivalence with another value.
   *
   * @param obj Other value to compare.
   * @return Whether this value is equivalent to `obj` .
   */
  equals(obj: T): boolean;

  /**
   * Test whether this value precedes another value.
   *
   * @param obj Other value to compare.
   * @return Whether this value precedes `obj` .
   */
  less(obj: T): boolean;

  /**
   * Compute the hash used by hash-based containers. Equivalent values must
   * produce the same code.
   *
   * @return The hash code for this value.
   */
  hashCode(): number;
}
