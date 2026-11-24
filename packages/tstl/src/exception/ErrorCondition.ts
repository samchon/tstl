//================================================================

/**
 * @packageDocumentation
 * @module std
 */
//================================================================
import { ErrorInstance } from "../internal/exception/ErrorInstance";
import { ErrorCategory } from "./ErrorCategory";

/**
 * Combines a numeric condition with the category that defines its meaning.
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export class ErrorCondition extends ErrorInstance {
  /**
   * Create an error condition with value `0` and no assigned category.
   */
  public constructor();

  /**
   * Create an instance from a numeric value and its category.
   *
   * @param val Numeric error condition.
   * @param category Category that defines the numeric value.
   */
  public constructor(val: number, category: ErrorCategory);

  public constructor(val: number = 0, category: ErrorCategory | null = null) {
    super(val, category!);
  }
}
