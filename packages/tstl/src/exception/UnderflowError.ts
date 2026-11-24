//================================================================

/**
 * @packageDocumentation
 * @module std
 */
//================================================================
import { RuntimeError } from "./RuntimeError";

/**
 * Runtime error for a result too small in magnitude for its representation.
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export class UnderflowError extends RuntimeError {
  /**
   * Create the exception with the supplied error details.
   *
   * @param message The error message.
   */
  public constructor(message: string) {
    super(message);
  }
}
