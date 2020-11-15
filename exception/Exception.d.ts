/**
 * @packageDocumentation
 * @module std
 */
/**
 * Base Exception.
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export declare class Exception extends Error {
    /**
     * Initializer Constructor.
     *
     * @param message The error messgae.
     */
    constructor(message: string);
    /**
     * The error name.
     */
    get name(): string;
    /**
     * Get error message.
     *
     * @return The error message.
     */
    what(): string;
    /**
     * Native function for `JSON.stringify()`.
     *
     * The {@link Exception.toJSON} function returns only three properties; ({@link name}, {@link message} and {@link stack}). If you want to define a new sub-class extending the {@link Exception} and const the class to export additional props (or remove some props), override this {@link Exception.toJSON} method.
     *
     * @return An object for `JSON.stringify()`.
     */
    toJSON(): object;
}
//# sourceMappingURL=Exception.d.ts.map