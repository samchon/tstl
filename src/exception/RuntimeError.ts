//================================================================ 
/** @module std */
//================================================================
import { Exception } from "./Exception";

/**
 * Runtime Error.
 * 
 * @author Jeongho Nam <http://samchon.org>
 */
export class RuntimeError extends Exception
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