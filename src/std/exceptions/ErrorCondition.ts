/// <reference path="../API.ts" />

/// <reference path="../base/ErrorInstance.ts" />

namespace std
{
	/**
	 * Error condition.
	 * 
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export class ErrorCondition extends base.ErrorInstance
	{
		/**
		 * Default Constructor.
		 */
		public constructor();

		/**
		 * Initializer Constructor.
		 * 
		 * @param val Identifier of an error condition.
		 * @param category An error category instance.
		 */
		public constructor(val: number, category: ErrorCategory);

		public constructor(val: number = 0, category: ErrorCategory = null)
		{
			super(val, category);
		}
	}
}