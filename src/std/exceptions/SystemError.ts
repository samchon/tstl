/// <reference path="../API.ts" />

/// <reference path="../base/ErrorInstance.ts" />
/// <reference path="RuntimeError.ts" />

namespace std
{
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
		}

		/* ---------------------------------------------------------
			ACCESSORS
		--------------------------------------------------------- */
		public code(): ErrorCode
		{
			return this.code_;
		}
	}
}

namespace std
{
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
}

namespace std
{
	export class ErrorCondition
		extends base.ErrorInstance
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
}

namespace std
{
	export class ErrorCode
		extends base.ErrorInstance
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
}
