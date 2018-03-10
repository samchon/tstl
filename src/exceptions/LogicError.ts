import { Exception } from "./Exception";

export class LogicError
	extends Exception
{
	public constructor(message: string)
	{
		super(message);
	}
}

export class DomainError
	extends LogicError
{
	public constructor(message: string)
	{
		super(message);
	}
}

export class InvalidArgument
	extends LogicError
{
	public constructor(message: string)
	{
		super(message);
	}
}

export class LengthError
	extends LogicError
{
	public constructor(message: string)
	{
		super(message);
	}
}

export class OutOfRange
	extends LogicError
{
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