/// <reference path="base/system/ErrorInstance.ts" />

namespace std
{
	/**
	 * <p> Error condition. </p>
	 *
	 * <p> Objects of this type hold a condition <code>value</code> associated with a <code>category</code>. </p>
	 *
	 * <p> Objects of this type describe errors in a generic way so that they may be portable across different 
	 * systems. This is in contrast with <code>ErrorCode</code> objects, that may contain system-specific 
	 * information. </p>
	 *
	 * <p> Because <code>ErrorCondition</code> objects can be compared with error_code objects directly by using 
	 * <code>relational operators</code>, <code>ErrorCondition</code> objects are generally used to check whether 
	 * a particular <code>ErrorCode</code> obtained from the system matches a specific error condition no matter 
	 * the system. </p>
	 *
	 * <p> The <code>categories</code> associated with the <code>ErrorCondition</code> and the <code>ErrorCode</code> 
	 * define the equivalences between them. </p>
	 *
	 * <ul>
	 *	<li> Reference: http://www.cplusplus.com/reference/system_error/error_condition/ </li>
	 * </ul>
	 *
	 * @author Jeongho Nam
	 */
	export class ErrorCondition
		extends base.system.ErrorInstance
	{
		/* ---------------------------------------------------------
			CONSTRUCTORS
		--------------------------------------------------------- */
		/**
		 * Default Constructor.
		 */
		public constructor();

		/**
		 * Construct from a numeric value and error category. 
		 *
		 * @param val A numerical value identifying an error condition.
		 * @param category A reference to an <code>ErrorCategory</code> object.
		 */
		public constructor(val: number, category: ErrorCategory);

		public constructor(val: number = 0, category: ErrorCategory = null)
		{
			super(val, category);
		}
	}
}