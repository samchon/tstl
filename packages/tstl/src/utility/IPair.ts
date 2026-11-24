//================================================================
/**
 * @packageDocumentation
 * @module std
 */
//================================================================
/**
 * An ordered pair with independently typed `first` and `second` members.
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export interface IPair<First, Second> {
  /**
   * The first value of the pair.
   */
  first: First;

  /**
   * The second value of the pair.
   */
  second: Second;
}
