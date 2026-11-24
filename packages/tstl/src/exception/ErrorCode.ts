//================================================================

/**
 * @packageDocumentation
 * @module std
 */
//================================================================
import { ErrorInstance } from "../internal/exception/ErrorInstance";
import { ErrorCategory } from "./ErrorCategory";
import { ErrorCondition } from "./ErrorCondition";

/**
 * Combines a numeric error code with its category.
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export class ErrorCode extends ErrorInstance {
  /**
   * Create an instance with the default numeric value and category.
   */
  public constructor();

  /**
   * Create an instance from a numeric value and its category.
   *
   * @param val Numeric error code.
   * @param category Category that defines the numeric value.
   */
  public constructor(val: number, category: ErrorCategory);

  public constructor(val: number = 0, category: ErrorCategory | null = null) {
    super(val, category!);
  }

  /**
   * Get the default condition defined by the code's category.
   *
   * @return The condition mapped from this error code.
   */
  public default_error_condition(): ErrorCondition {
    return this.category_.default_error_condition(this.value_);
  }
}
