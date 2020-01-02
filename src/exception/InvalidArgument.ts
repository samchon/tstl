//================================================================ 
/** @module std */
//================================================================
import { LogicError } from "./LogicError";

/**
 * Invalid Argument Exception.
 * 
 * @author Jeongho Nam <http://samchon.org>
 */
export class InvalidArgument extends LogicError
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