/**
 * @packageDocumentation
 * @module std
 */
import { ErrorCode } from "./ErrorCode";
import { ErrorCondition } from "./ErrorCondition";
/**
 * Error category.
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export declare abstract class ErrorCategory {
    /**
     * Default Constructor.
     */
    constructor();
    /**
     * Get category name.
     */
    abstract name(): string;
    /**
     * Get error message.
     *
     * @param val Identifier of an error condition.
     * @return The error message.
     */
    abstract message(val: number): string;
    /**
     * Get default error condition.
     *
     * @param val Identifier of an error condition.
     * @return The error condition.
     */
    default_error_condition(val: number): ErrorCondition;
    /**
     * Test equivalence.
     *
     * @param val_code Identifier of an error code.
     * @param cond An error condition.
     * @return Whether equivalent or not.
     */
    equivalent(val_code: number, cond: ErrorCondition): boolean;
    /**
     * Test equivalence.
     *
     * @param code An error code.
     * @param val_cond Identifier of an error condition.
     * @return Whether equivalent or not.
     */
    equivalent(code: ErrorCode, val_cond: number): boolean;
}
//# sourceMappingURL=ErrorCategory.d.ts.map