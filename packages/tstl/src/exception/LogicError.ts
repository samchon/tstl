//================================================================

/**
 * @packageDocumentation
 * @module std
 */
//================================================================
import { Exception } from "./Exception";

/**
 * Base error for an invalid operation or input that can be diagnosed before it
 * succeeds.
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export class LogicError extends Exception {
  /**
   * Create the exception with the supplied error details.
   *
   * @param message The error message.
   */
  public constructor(message: string) {
    super(message);
  }
}
