//================================================================
/**
 * @packageDocumentation
 * @module std
 */
//================================================================
/**
 * Base class for the library's errors, with a message and stack trace.
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export class Exception extends Error {
  /* ---------------------------------------------------------
        CONSTRUCTOR
    --------------------------------------------------------- */
  /**
   * Create the exception with the supplied error details.
   *
   * @param message The error message.
   */
  public constructor(message: string) {
    super(message);

    // INHERITANCE POLYFILL
    const proto = new.target.prototype;
    if (Object.setPrototypeOf) Object.setPrototypeOf(this, proto);
    else (this as any).__proto__ = proto;
  }

  /* ---------------------------------------------------------
        ACCESSORS
    --------------------------------------------------------- */
  /**
   * Get the concrete exception class name.
   */
  public get name(): string {
    return this.constructor.name;
  }

  /**
   * Get the stored error message.
   *
   * @return The error's message text.
   */
  public what(): string {
    return this.message;
  }

  /**
   * Return the error's name, message, and stack for JSON serialization.
   * Subclasses can override this method to include their own fields.
   *
   * @return A plain object with `name`, `message`, and `stack`.
   */
  public toJSON(): object {
    return {
      name: this.name,
      message: this.message,
      stack: this.stack,
    };
  }
}
