//================================================================

/**
 * @packageDocumentation
 * @module std
 */
//================================================================
import { LogicError } from "./LogicError";

/**
 * Logic error for a requested length outside the supported limits.
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export class LengthError extends LogicError {
  /**
   * Create the exception with the supplied error details.
   *
   * @param message The error message.
   */
  public constructor(message: string) {
    super(message);
  }
}
