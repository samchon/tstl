//================================================================ 
/** @module std */
//================================================================
import { LogicError } from "./LogicError";

/**
 * Domain Error.
 * 
 * @author Jeongho Nam <http://samchon.org>
 */
export class DomainError extends LogicError
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