//================================================================

/**
 * @packageDocumentation
 * @module std
 */
//================================================================
import { RuntimeError } from "./RuntimeError";

/**
 * Runtime error for a result outside its permitted range.
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export class RangeError extends RuntimeError {
  /**
   * Create the exception with the supplied error details.
   *
   * @param message The error message.
   */
  public constructor(message: string) {
    super(message);
  }
}
