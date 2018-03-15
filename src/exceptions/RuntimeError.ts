import { Exception } from "./Exception";

export class RuntimeError
	extends Exception
{
	public constructor(message: string)
	{
		super(message);
	}
}

export class OverflowError
	extends RuntimeError
{
	public constructor(message: string)
	{
		super(message);
	}
}

export class UnderflowError
	extends RuntimeError
{
	public constructor(message: string)
	{
		super(message);
	}
}

export class RangeError
	extends RuntimeError
{
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