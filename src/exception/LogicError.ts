//================================================================ 
/** @module std */
//================================================================
import { Exception } from "./Exception";

/**
 * Logic Error.
 * 
 * @author Jeongho Nam <http://samchon.org>
 */
export class LogicError extends Exception
{
    /**
     * Initializer Constructor.
     * 
     * @param message The error messgae.
     */
    public constructor(message: string)
    {
        super(message);
    }
}

export type logic_error = LogicError;
export const logic_error = LogicError;