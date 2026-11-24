//================================================================

/**
 * @packageDocumentation
 * @module std
 */
//================================================================
import { equal_to } from "../functional/comparators";
import { ErrorCode } from "./ErrorCode";
import { ErrorCondition } from "./ErrorCondition";

/**
 * Defines the messages and condition mappings for related error codes.
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export abstract class ErrorCategory {
  /* ---------------------------------------------------------
        CONSTRUCTORS
    --------------------------------------------------------- */
  /**
   * Initialize the base error category.
   */
  public constructor() {}

  /* ---------------------------------------------------------
        ACCESSORS
    --------------------------------------------------------- */
  /**
   * Get the category's identifying name.
   */
  public abstract name(): string;

  /**
   * Get the message for the given numeric error code.
   *
   * @param val Numeric error code in this category.
   * @return The message defined by this category.
   */
  public abstract message(val: number): string;

  /* ---------------------------------------------------------
        OPERATORS
    --------------------------------------------------------- */
  /**
   * Map an error code in this category to its default error condition.
   *
   * @param val Numeric error code in this category.
   * @return The condition associated with the given code.
   */
  public default_error_condition(val: number): ErrorCondition {
    return new ErrorCondition(val, this);
  }

  /**
   * Test whether an error code and condition represent the same error.
   *
   * @param val_code Identifier of an error code.
   * @param cond An error condition.
   * @return Whether this category considers the code and condition equivalent.
   */
  public equivalent(val_code: number, cond: ErrorCondition): boolean;

  /**
   * Test whether an error code and condition represent the same error.
   *
   * @param code An error code.
   * @param val_cond Numeric error condition.
   * @return Whether this category considers the code and condition equivalent.
   */
  public equivalent(code: ErrorCode, val_cond: number): boolean;

  public equivalent(...args: any[]): boolean {
    if (args[1] instanceof ErrorCondition) {
      const val_code: number = args[0];
      const cond: ErrorCondition = args[1];

      return equal_to(this.default_error_condition(val_code), cond);
    } else {
      const code: ErrorCode = args[0];
      const valcond: number = args[1];

      return equal_to(this, code.category()) && code.value() === valcond;
    }
  }
}
