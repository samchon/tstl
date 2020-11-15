/**
 * @packageDocumentation
 * @module std.internal
 */
import { ErrorCategory } from "../../exception/ErrorCategory";
/**
 * Base class for error instances.
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export declare abstract class ErrorInstance {
    protected category_: ErrorCategory;
    protected value_: number;
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
     * Assign content.
     *
     * @param val Identifier of an error condition.
     * @param category An error category instance.
     */
    assign(val: number, category: ErrorCategory): void;
    /**
     * Clear content.
     */
    clear(): void;
    /**
     * Get category.
     *
     * @return The category object.
     */
    category(): ErrorCategory;
    /**
     * Get value, the identifier.
     *
     * @return The value, identifier of this object.
     */
    value(): number;
    /**
     * Get message.
     *
     * @return The message.
     */
    message(): string;
    /**
     * Covert bo bool.
     *
     * @return Whether the {@link value} is not zero.
     */
    to_bool(): boolean;
    toJSON(): object;
}
//# sourceMappingURL=ErrorInstance.d.ts.map