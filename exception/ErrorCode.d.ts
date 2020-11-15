/**
 * @packageDocumentation
 * @module std
 */
import { ErrorInstance } from "../internal/exception/ErrorInstance";
import { ErrorCategory } from "./ErrorCategory";
import { ErrorCondition } from "./ErrorCondition";
/**
 * Error code.
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export declare class ErrorCode extends ErrorInstance {
    /**
     * Default Constructor.
     */
    constructor();
    /**
     * Initializer Constructor.
     *
     * @param val Identifier of an error instance.
     * @param category An error category instance.
     */
    constructor(val: number, category: ErrorCategory);
    /**
     * Get default error condition.
     *
     * @return The default error condition object.
     */
    default_error_condition(): ErrorCondition;
}
//# sourceMappingURL=ErrorCode.d.ts.map