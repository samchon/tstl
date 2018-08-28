import { Exception } from "./Exception";

/**
 * Logic Error.
 * 
 * @author Jeongho Nam <http://samchon.org>
 */
export class LogicError extends Exception
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

/**
 * Length Error.
 * 
 * @author Jeongho Nam <http://samchon.org>
 */
export class LengthError
	extends LogicError
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

export type logic_error = LogicError;
export type domain_error = DomainError;
export type invalid_argument = InvalidArgument;
export type length_error = LengthError;
export type out_of_range = OutOfRange;

export var logic_error = LogicError;
export var domain_error = DomainError;
export var invalid_argument = InvalidArgument;
export var length_error = LengthError;
export var out_of_range = OutOfRange;