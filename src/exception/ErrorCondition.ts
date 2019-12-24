//================================================================ 
/** @module std */
//================================================================
import { ErrorInstance } from "../base/exception/ErrorInstance";

import { ErrorCategory } from "./ErrorCategory";

/**
 * Error condition.
 * 
 * @author Jeongho Nam <http://samchon.org>
 */
export class ErrorCondition extends ErrorInstance
{
    /**
     * Default Constructor.
     */
    public constructor();

    /**
     * Initializer Constructor.
     * 
     * @param val Identifier of an error condition.
     * @param category An error category instance.
     */
    public constructor(val: number, category: ErrorCategory);

    public constructor(val: number = 0, category: ErrorCategory | null = null)
    {
        super(val, category!);
    }
}

export type error_condition = ErrorCondition;
export const error_condition = ErrorCondition;