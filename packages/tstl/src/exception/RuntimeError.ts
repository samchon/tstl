//================================================================

/**
 * @packageDocumentation
 * @module std
 */
//================================================================
import { Exception } from "./Exception";

/**
 * Base error for failures detected during execution.
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export class RuntimeError extends Exception {
  /**
   * Create the exception with the supplied error details.
   *
   * @param message The error message.
   */
  public constructor(message: string) {
    super(message);
  }
}
