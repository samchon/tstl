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

	/**
	 * @inheritDoc
	 */
	public get name(): string
	{
		return "runtime_error";
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

	/**
	 * @inheritDoc
	 */
	public get name(): string
	{
		return "overflow_error";
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

	/**
	 * @inheritDoc
	 */
	public get name(): string
	{
		return "underflow_error";
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

	/**
	 * @inheritDoc
	 */
	public get name(): string
	{
		return "range_error";
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