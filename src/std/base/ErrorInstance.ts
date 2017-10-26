/// <reference path="../API.ts" />

namespace std.base
{
	export abstract class ErrorInstance
	{
		/**
		 * @hidden
		 */
		protected category_: ErrorCategory;

		/**
		 * @hidden
		 */
		protected value_: number;

		/* ---------------------------------------------------------
			CONSTRUCTORS
		--------------------------------------------------------- */
		public constructor();

		public constructor(val: number, category: ErrorCategory);

		public constructor(val: number = 0, category: ErrorCategory = null)
		{
			this.assign(val, category);
		}

		public assign(val: number, category: ErrorCategory): void
		{
			this.category_ = category;
			this.value_ = val;
		}

		public clear(): void
		{
			this.value_ = 0;
		}

		/* ---------------------------------------------------------
			ACCESSORS
		--------------------------------------------------------- */
		public category(): ErrorCategory
		{
			return this.category_;
		}

		public value(): number
		{
			return this.value_;
		}

		public message(): string
		{
			if (this.category_ == null || this.value_ == 0)
				return "";
			else
				return this.category_.message(this.value_);
		}

		public default_error_condition(): ErrorCondition
		{
			if (this.category_ == null || this.value_ == 0)
				return null;
			else
				return this.category_.default_error_condition(this.value_);
		}

		/* ---------------------------------------------------------
			OPERATORS
		--------------------------------------------------------- */
		public to_bool(): boolean
		{
			return this.value_ != 0;
		}
	}
}