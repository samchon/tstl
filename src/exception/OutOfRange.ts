import { LogicError } from "./LogicError";

/**
 * Out-of-range Exception.
 * 
 * @author Jeongho Nam <http://samchon.org>
 */
export class OutOfRange extends LogicError
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

export type out_of_range = OutOfRange;
export const out_of_range = OutOfRange;