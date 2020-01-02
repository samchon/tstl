//================================================================ 
/** @module std */
//================================================================
import { RuntimeError } from "./RuntimeError";

/**
 * Range Error.
 * 
 * @author Jeongho Nam <http://samchon.org>
 */
export class RangeError extends RuntimeError
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