//================================================================

/**
 * @packageDocumentation
 * @module std
 */
//================================================================
import { ErrorCategory } from "./ErrorCategory";
import { ErrorCode } from "./ErrorCode";
import { RuntimeError } from "./RuntimeError";

/**
 * Runtime error that carries an `ErrorCode` with its message.
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export class SystemError extends RuntimeError {
  protected code_: ErrorCode;

  /* ---------------------------------------------------------
        CONSTRUCTORS
    --------------------------------------------------------- */
  /**
   * Create the exception with the supplied error details.
   *
   * @param code An error code.
   * @param message A detailed error message.
   */
  public constructor(code: ErrorCode, message?: string);

  /**
   * Construct from references.
   *
   * @param val Identifier of an error code in *category*.
   * @param category An error category.
   * @param message A detailed error message.
   */
  public constructor(val: number, category: ErrorCategory, message?: string);

  public constructor(...args: any[]) {
    super("");

    if (args.length >= 2 && typeof args[0].valueOf() === "number") {
      const val: number = args[0];
      const category: ErrorCategory = args[1];

      this.code_ = new ErrorCode(val, category);
      this.message = args[2];
    } else {
      this.code_ = args[0];
      this.message = args[1];
    }
  }

  /* ---------------------------------------------------------
        ACCESSORS
    --------------------------------------------------------- */
  /**
   * Get the stored error code.
   *
   * @return The error code carried by the exception.
   */
  public code(): ErrorCode {
    return this.code_;
  }

  /**
   * @inheritDoc
   */
  public toJSON(): object {
    return {
      ...super.toJSON(),
      code: this.code_.toJSON(),
    };
  }
}
