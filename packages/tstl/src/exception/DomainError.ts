//================================================================

/**
 * @packageDocumentation
 * @module std
 */
//================================================================
import { LogicError } from "./LogicError";

/**
 * Logic error for an input outside an operation's domain.
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export class DomainError extends LogicError {
  /**
   * Create the exception with the supplied error details.
   *
   * @param message The error message.
   */
  public constructor(message: string) {
    super(message);
  }
}
