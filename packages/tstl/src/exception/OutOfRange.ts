//================================================================

/**
 * @packageDocumentation
 * @module std
 */
//================================================================
import { LogicError } from "./LogicError";

/**
 * Logic error for a position or value outside its permitted range.
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export class OutOfRange extends LogicError {
  /**
   * Create the exception with the supplied error details.
   *
   * @param message The error message.
   */
  public constructor(message: string) {
    super(message);
  }
}
