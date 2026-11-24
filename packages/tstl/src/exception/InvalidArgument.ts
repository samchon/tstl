//================================================================

/**
 * @packageDocumentation
 * @module std
 */
//================================================================
import { LogicError } from "./LogicError";

/**
 * Logic error for an invalid argument.
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export class InvalidArgument extends LogicError {
  /**
   * Create the exception with the supplied error details.
   *
   * @param message The error message.
   */
  public constructor(message: string) {
    super(message);
  }
}
