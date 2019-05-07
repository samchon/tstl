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

export type runtime_error = RuntimeError;
export type overflow_error = OverflowError;
export type underflow_error = UnderflowError;
export type range_error = RangeError;

export var runtime_error = RuntimeError;
export var overflow_error = OverflowError;
export var underflow_error = UnderflowError;
export var range_error = RangeError;