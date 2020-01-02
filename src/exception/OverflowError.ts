//================================================================ 
/** @module std */
//================================================================
import { RuntimeError } from "./RuntimeError";

/**
 * Overflow Error.
 * 
 * @author Jeongho Nam <http://samchon.org>
 */
export class OverflowError extends RuntimeError
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