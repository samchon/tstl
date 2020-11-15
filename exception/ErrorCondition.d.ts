/**
 * @packageDocumentation
 * @module std
 */
import { ErrorInstance } from "../internal/exception/ErrorInstance";
import { ErrorCategory } from "./ErrorCategory";
/**
 * Error condition.
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export declare class ErrorCondition extends ErrorInstance {
    /**
     * Default Constructor.
     */
    constructor();
    /**
     * Initializer Constructor.
     *
     * @param val Identifier of an error condition.
     * @param category An error category instance.
     */
    constructor(val: number, category: ErrorCategory);
}
//# sourceMappingURL=ErrorCondition.d.ts.map