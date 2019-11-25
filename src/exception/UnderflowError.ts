import { RuntimeError } from "./RuntimeError";

/**
 * Underflow Error.
 * 
 * @author Jeongho Nam <http://samchon.org>
 */
export class UnderflowError extends RuntimeError
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

export type underflow_error = UnderflowError;
export const underflow_error = UnderflowError;