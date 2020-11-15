/**
 * @packageDocumentation
 * @module std
 */
import { RuntimeError } from "./RuntimeError";
import { ErrorCode } from "./ErrorCode";
import { ErrorCategory } from "./ErrorCategory";
/**
 * System Error.
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export declare class SystemError extends RuntimeError {
    protected code_: ErrorCode;
    /**
     * Initializer Constructor.
     *
     * @param code An error code.
     * @param message A detailed error message.
     */
    constructor(code: ErrorCode, message?: string);
    /**
     * Construct from references.
     *
     * @param val Identnfier of an error code in *category*.
     * @param category An error category.
     * @param message A detailed error message.
     */
    constructor(val: number, category: ErrorCategory, message?: string);
    /**
     * Get error code.
     *
     * @return The error code.
     */
    code(): ErrorCode;
    /**
     * @inheritDoc
     */
    toJSON(): object;
}
//# sourceMappingURL=SystemError.d.ts.map