//================================================================

/**
 * @packageDocumentation
 * @module std.internal
 */
//================================================================
import { ErrorCategory } from "../../exception/ErrorCategory";

/**
 * Shared storage and conversion behavior for error codes and conditions.
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export abstract class ErrorInstance {
  protected category_!: ErrorCategory;
  protected value_!: number;

  /* ---------------------------------------------------------
        CONSTRUCTORS
    --------------------------------------------------------- */
  /**
   * Create an empty ErrorInstance.
   */
  public constructor();

  /**
   * Initialize a ErrorInstance from the supplied arguments.
   *
   * @param val Numeric error code.
   * @param category Category that defines the numeric value.
   */
  public constructor(val: number, category: ErrorCategory);

  public constructor(val: number = 0, category: ErrorCategory | null = null) {
    this.assign(val, category!);
  }

  /**
   * Replace the numeric value and its category.
   *
   * @param val Numeric error condition.
   * @param category Category that defines the numeric value.
   */
  public assign(val: number, category: ErrorCategory): void {
    this.category_ = category;
    this.value_ = val;
  }

  /**
   * Reset the stored error value and category.
   */
  public clear(): void {
    this.value_ = 0;
  }

  /* ---------------------------------------------------------
        ACCESSORS
    --------------------------------------------------------- */
  /**
   * Get the stored category.
   *
   * @return The category associated with the stored value.
   */
  public category(): ErrorCategory {
    return this.category_!;
  }

  /**
   * Get the stored numeric identifier.
   *
   * @return The stored error code or condition value.
   */
  public value(): number {
    return this.value_;
  }

  /**
   * Get the message for the stored value.
   *
   * @return The message supplied by the current category, if one is set.
   */
  public message(): string {
    return this.category_!.message(this.value_);
  }

  /* ---------------------------------------------------------
        OPERATORS
    --------------------------------------------------------- */
  /**
   * Test whether the stored numeric identifier is nonzero.
   *
   * @return Whether the stored value is nonzero.
   */
  public to_bool(): boolean {
    return this.value_ !== 0;
  }

  public toJSON(): object {
    if (this.category_ === null) return {};
    else
      return {
        cateogory: this.category_.name(),
        value: this.value(),
        message: this.message(),
      };
  }
}
