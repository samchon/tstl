import { RuntimeError } from "./RuntimeError";
import { ErrorInstance } from "../../base/ErrorInstance";

import { equal_to } from "../functional/comparisons";

export class SystemError
	extends RuntimeError
{
	/**
	 * @hidden
	 */
	protected code_: ErrorCode;
	
	/* ---------------------------------------------------------
		CONSTRUCTORS
	--------------------------------------------------------- */
	public constructor(code: ErrorCode);
	public constructor(code: ErrorCode, message: string);
	public constructor(val: number, category: ErrorCategory);
	public constructor(val: number, category: ErrorCategory, message: string);

	public constructor(...args: any[])
	{
		super("");

		if (args.length >= 2 && typeof args[0] == "number")
		{
			let val: number = args[0];
			let category: ErrorCategory = args[1];

			this.code_ = new ErrorCode(val, category);
		}
		else
		{
			this.code_ = args[0];
		}
	}

	/* ---------------------------------------------------------
		ACCESSORS
	--------------------------------------------------------- */
	public code(): ErrorCode
	{
		return this.code_;
	}
}

export abstract class ErrorCategory
{
	/* ---------------------------------------------------------
		CONSTRUCTORS
	--------------------------------------------------------- */
	public constructor()
	{
	}

	/* ---------------------------------------------------------
		ACCESSORS
	--------------------------------------------------------- */
	public abstract name(): string;

	public abstract message(val: number): string;

	/* ---------------------------------------------------------
		OPERATORS
	--------------------------------------------------------- */
	public default_error_condition(val: number): ErrorCondition
	{
		return new ErrorCondition(val, this);
	}

	public equivalent(val_code: number, cond: ErrorCondition): boolean;

	public equivalent(code: ErrorCode, val_cond: number): boolean;

	public equivalent(...args: any[]): boolean
	{
		if (args[1] instanceof ErrorCondition)
		{
			let val_code: number = args[0];
			let cond: ErrorCondition = args[1];

			return equal_to(this.default_error_condition(val_code), cond);
		}
		else
		{
			let code: ErrorCode = args[0];
			let valcond: number = args[1];

			return equal_to(this, code.category()) && code.value() == valcond;
		}
	}
}

export class ErrorCondition
	extends ErrorInstance
{
	/* ---------------------------------------------------------
		CONSTRUCTORS
	--------------------------------------------------------- */
	public constructor();

	public constructor(val: number, category: ErrorCategory);

	public constructor(val: number = 0, category: ErrorCategory = null)
	{
		super(val, category);
	}
}

export class ErrorCode
	extends ErrorInstance
{
	/* ---------------------------------------------------------
		CONSTRUCTORS
	--------------------------------------------------------- */
	public constructor();

	public constructor(val: number, category: ErrorCategory);

	public constructor(val: number = 0, category: ErrorCategory = null)
	{
		super(val, category);
	}
}

export type system_error = SystemError;
export type error_category = ErrorCategory;
export type error_condition = ErrorCondition;
export type error_code = ErrorCode;

export var system_error = SystemError;
export var error_category = ErrorCategory;
export var error_condition = ErrorCondition;
export var error_code = ErrorCode;