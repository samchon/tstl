/// <reference path="../API.ts" />

/// <reference path="../base/ErrorInstance.ts" />

namespace std
{
	/**
	 * Error code.
	 * 
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export class ErrorCode extends base.ErrorInstance
	{
		/**
		 * Default Constructor.
		 */
		public constructor();

		/**
		 * Initializer Constructor.
		 * 
		 * @param val Identifier of an error instance.
		 * @param category An error category instance.
		 */
		public constructor(val: number, category: ErrorCategory);

		public constructor(val: number = 0, category: ErrorCategory = null)
		{
			super(val, category);
		}

		/**
		 * Get default error condition.
		 * 
		 * @return The default error condition object.
		 */
		public default_error_condition(): ErrorCondition
		{
			if (this.category_ == null || this.value_ == 0)
				return null;
			else
				return this.category_.default_error_condition(this.value_);
		}
	}
}
