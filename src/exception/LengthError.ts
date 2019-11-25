import { LogicError } from "./LogicError";

/**
 * Length Error.
 * 
 * @author Jeongho Nam <http://samchon.org>
 */
export class LengthError extends LogicError
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

export type length_error = LengthError;
export const length_error = LengthError;